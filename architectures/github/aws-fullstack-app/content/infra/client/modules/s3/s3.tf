resource "aws_s3_bucket" "this" {
  bucket = "${var.project}-${var.environment}-${var.bucket_name}"

  tags = merge(var.tags, {
    "Project"     = var.project
    "Environment" = var.environment
  })
}
resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  index_document {
    suffix = var.index_document
  }

  error_document {
    key = var.error_document
  }
}
