locals {
  service_name = "${var.project}-${var.environment}-service"
}

resource "aws_ecs_cluster" "this" {
  name = "${var.project}-${var.environment}-cluster"
  tags = merge(var.tags, {
    "Project"     = var.project
    "Environment" = var.environment
  })

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_capacity_provider" "this" {
  name = "${var.project}-${var.environment}-capacity-provider-fh"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = var.autoscaling_group_arn
    managed_termination_protection = "ENABLED"

    managed_scaling {
      maximum_scaling_step_size = 1000 # TODO: Change this value
      minimum_scaling_step_size = 1    # TODO: Change this value
      status                    = "ENABLED"
      target_capacity           = 3 # TODO: Change this value
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "this" {
  cluster_name       = aws_ecs_cluster.this.name
  capacity_providers = [aws_ecs_capacity_provider.this.name]
}

resource "aws_appautoscaling_target" "this" {
  max_capacity       = 10 # TODO: Change this value
  min_capacity       = 2  # TODO: Change this value
  resource_id        = "service/${aws_ecs_cluster.this.name}/${aws_ecs_service.this.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

## Policy for CPU tracking
resource "aws_appautoscaling_policy" "this" {
  name               = "${var.project}-${var.environment}-scaling-policy"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.this.resource_id
  scalable_dimension = aws_appautoscaling_target.this.scalable_dimension
  service_namespace  = aws_appautoscaling_target.this.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value = var.cpu_target_tracking_desired_value

    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}

## Policy for memory tracking
resource "aws_appautoscaling_policy" "ecs_memory_policy" {
  name               = "${var.project}-${var.environment}-memory-scaling-policy"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.this.resource_id
  scalable_dimension = aws_appautoscaling_target.this.scalable_dimension
  service_namespace  = aws_appautoscaling_target.this.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value = var.memory_target_tracking_desired_value

    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
  }
}

## ECS Task Definition with CloudWatch Logs
resource "aws_cloudwatch_log_group" "this" {
  name              = "/ecs/${var.project}-${var.environment}"
  retention_in_days = var.logs_retention_days
}

resource "aws_ecs_task_definition" "this" {
  family             = "${var.project}-${var.environment}-task-definition"
  execution_role_arn = var.execution_role_arn
  task_role_arn      = var.task_role_arn
  network_mode       = "awsvpc"

  container_definitions = jsonencode([
    {
      name      = "${var.project}-${var.environment}-service"
      image     = var.container_image
      cpu       = var.cpu
      memory    = var.memory
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          # hostPort      = var.container_port
          hostPort = 0
          protocol = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.this.name,
          "awslogs-region"        = var.region,
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment
  })
}

# ECS Service
resource "aws_ecs_service" "this" {
  name = local.service_name
  # iam_role             = var.service_role_arn
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  # launch_type          = "EC2"
  desired_count        = var.desired_count
  force_new_deployment = true


  network_configuration {
    subnets         = var.subnet_ids
    security_groups = var.security_groups
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = local.service_name
    container_port   = var.container_port
  }

  ordered_placement_strategy {
    type  = "spread"
    field = "attribute:ecs.availability-zone"
  }
  ordered_placement_strategy {
    type  = "binpack"
    field = "memory"
  }
  triggers = {
    redeployment = timestamp()
  }

  lifecycle {
    ignore_changes = [desired_count]
  }
}
