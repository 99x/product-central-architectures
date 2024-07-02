resource "aws_iam_role" "github_actions_role" {
  name = "${var.project}-${var.environment}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      },
      {
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment
  })
}

resource "aws_iam_role_policy" "github_actions_policy" {
  name = "${var.project}-${var.environment}-github-actions-policy"
  role = aws_iam_role.github_actions_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket",
          "cloudfront:CreateInvalidation",
          "ecs:UpdateService",
          "ecs:RegisterTaskDefinition",
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetAuthorizationToken",
          "ecr:BatchGetImage",
          "ec2:DescribeInstances",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:DescribeVpcs",
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath"
        ],
        Resource = "*"
      }
    ]
  })
}

data "aws_iam_policy_document" "this" {
  version = "2012-10-17"

  statement {
    sid       = "1"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${var.bucket_arn}/*"]
    principals {
      type        = "AWS"
      identifiers = [var.cloudfront_oai_iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = var.bucket_id
  policy = data.aws_iam_policy_document.this.json
}

