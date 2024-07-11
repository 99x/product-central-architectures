resource "aws_ecr_repository" "this" {
  name         = "${var.project}-${var.environment}-repository"
  force_delete = "${var.environment != "prod" ? true : false}"
  image_scanning_configuration {
    scan_on_push = true
  }

  tags = merge(var.tags, {
    "Project"     = var.project
    "Environment" = var.environment
  })
}
