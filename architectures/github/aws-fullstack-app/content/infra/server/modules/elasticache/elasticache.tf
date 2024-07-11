resource "aws_elasticache_subnet_group" "this" {
  name       = "${var.project}-${var.environment}-elasticache-subnet-group"
  subnet_ids = var.subnet_ids

  tags = merge(var.tags, {
    "Project"     = var.project
    "Environment" = var.environment
  })
}

resource "aws_cloudwatch_log_group" "this" {
  name              = "/elasticache/${var.project}-${var.environment}"
  retention_in_days = var.logs_retention_days
}

resource "aws_elasticache_cluster" "this" {
  cluster_id         = "${var.project}-${var.environment}-elasticache-cluster"
  engine             = var.engine
  node_type          = var.node_type
  num_cache_nodes    = var.num_cache_nodes
  port               = var.port
  subnet_group_name  = aws_elasticache_subnet_group.this.name
  security_group_ids = var.security_group_ids
  apply_immediately  = true
  log_delivery_configuration {
    destination      = aws_cloudwatch_log_group.this.name
    destination_type = "cloudwatch-logs"
    log_type         = "slow-log"
    log_format       = "text"
  }

  tags = merge(var.tags, {
    "Project"     = var.project
    "Environment" = var.environment
  })
}
