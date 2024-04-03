resource "aws_ecs_cluster" "default_cluster" {
  name = "${var.project}-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_cloudwatch_log_group" "default_log_group" {
  name = "/ecs/${var.project}"
}

resource "aws_ecs_task_definition" "default_task" {
  family                   = "${var.project}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = var.execution_role_arn
  container_definitions = jsonencode([{
    name  = "${var.project}-container"
    image = var.container_image

    essential = true
    secrets : [
      { "name" : "APP_URL", "valueFrom" : var.app_url_arn },
      { "name" : "APP_TITLE", "valueFrom" : var.app_name_arn },
      { "name" : "ORG_NAME", "valueFrom" : var.organization_name_arn },
      { "name" : "POSTGRES_PORT", "valueFrom" : var.postgres_port_arn },
      { "name" : "POSTGRES_HOST", "valueFrom" : var.postgres_host_arn },
      { "name" : "POSTGRES_USER", "valueFrom" : var.postgres_user_arn },
      { "name" : "POSTGRES_PASSWORD", "valueFrom" : var.postgres_password_arn },
      { "name" : "GITHUB_TOKEN", "valueFrom" : var.github_token_arn },
      { "name" : "AUTH_GITHUB_CLIENT_ID", "valueFrom" : var.github_client_id_arn },
      { "name" : "AUTH_GITHUB_CLIENT_SECRET", "valueFrom" : var.github_client_secret_arn },
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options : {
        "awslogs-group" : "/ecs/${var.project}",
        "awslogs-region" : var.default_region,
        "awslogs-stream-prefix" : "ecs"
      }
    }
    portMappings = [{
      protocol      = "tcp"
      containerPort = 7007
      hostPort      = 7007
    }]
  }])
  tags = {
    Name = "${var.project}-task"
  }
}

resource "aws_ecs_service" "default_service" {
  name                               = "${var.project}-service"
  cluster                            = aws_ecs_cluster.default_cluster.id
  task_definition                    = aws_ecs_task_definition.default_task.arn
  launch_type                        = "FARGATE"
  platform_version                   = "1.4.0"
  desired_count                      = 1
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  scheduling_strategy                = "REPLICA"
  depends_on                         = [aws_ecs_task_definition.default_task]

  network_configuration {
    security_groups  = var.security_group_ids
    subnets          = var.subnet_ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "${var.project}-container"
    container_port   = 7007
  }
}
