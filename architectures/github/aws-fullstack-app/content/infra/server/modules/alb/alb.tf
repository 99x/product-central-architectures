resource "aws_alb" "this" {
  name                       = "${var.project}-${var.environment}-alb"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = var.security_groups
  subnets                    = var.subnet_ids
  enable_deletion_protection = false

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment
  })
}

resource "aws_alb_target_group" "this" {
  name        = "${var.project}-${var.environment}-target-group"
  port        = var.target_group_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = var.health_check_path
    interval            = 300
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment
  })
}

resource "aws_alb_listener" "this" {
  load_balancer_arn = aws_alb.this.arn
  port              = var.target_group_port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.this.arn
  }
}
