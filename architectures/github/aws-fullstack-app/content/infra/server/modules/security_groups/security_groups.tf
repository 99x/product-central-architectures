resource "aws_security_group" "alb_sg" {
  name        = "${var.project}-${var.environment}-alb-sg"
  description = "Security group for the ALB"
  vpc_id      = var.vpc_id

  # ingress {
  #   from_port   = 80
  #   to_port     = 80
  #   protocol    = "tcp"
  #   cidr_blocks = var.allowed_cidr_blocks
  # }

  # ingress {
  #   from_port   = 443
  #   to_port     = 443
  #   protocol    = "tcp"
  #   cidr_blocks = var.allowed_cidr_blocks
  # }

  egress {
    description = "Allow all egress traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, {
    "Name" = "${var.project}-${var.environment}-alb-sg"
  })
}

# TODO: enhance this so only the devs/PO able to ssh to the EC2 instances based on environments (IP whitelists)
# Restricting the IP range for the bastion host to specific CIDR blocks, although access control via AWS EC2 Instance Connect in the AWS Console is the preferred way to go here due to better access control.
resource "aws_security_group" "ec2_sg" {
  name        = "${var.project}-${var.environment}-ec2-sg"
  description = "Security group for EC2 instances"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow ingress traffic from ALB on HTTP on ephemeral ports"
    from_port       = 1024
    to_port         = 65535
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  # ingress {
  #   from_port       = var.container_port
  #   to_port         = var.container_port
  #   protocol        = "tcp"
  #   security_groups = [aws_security_group.alb_sg.id]
  # }

  # ingress {
  #   description = "Allow SSH access from the bastion host"
  #   from_port = 22
  #   to_port   = 22
  #   protocol  = "tcp"
  #   security_groups = [aws_security_group.bastion_host.id]
  # }

  egress {
    description = "Allow all egress traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, {
    "Name" = "${var.project}-${var.environment}-ec2-sg"
  })
}

resource "aws_security_group" "ecs_sg" {
  name        = "${var.project}-${var.environment}-ecs-sg"
  description = "Security group for ECS tasks"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id] # Allow traffic from EC2 instances
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, {
    "Name" = "${var.project}-${var.environment}-ecs-sg"
  })
}

resource "aws_security_group" "elasticache_sg" {
  name        = "${var.project}-${var.environment}-elasticache-sg"
  description = "Security group for ElastiCache"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = var.elasticache_port
    to_port         = var.elasticache_port
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id] # Allow traffic from EC2 instances
  }

  ingress {
    from_port       = var.elasticache_port
    to_port         = var.elasticache_port
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs_sg.id] # Allow traffic from ECS tasks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, {
    "Name" = "${var.project}-${var.environment}-elasticache-sg"
  })
}

data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}

## We only allow incoming traffic on HTTP and HTTPS from known CloudFront CIDR blocks
resource "aws_security_group_rule" "alb_cloudfront_https_ingress_only" {
  security_group_id = aws_security_group.alb_sg.id
  description       = "Allow HTTPS access only from CloudFront CIDR blocks"
  from_port         = 443
  protocol          = "tcp"
  prefix_list_ids   = [data.aws_ec2_managed_prefix_list.cloudfront.id]
  to_port           = 443
  type              = "ingress"
}
