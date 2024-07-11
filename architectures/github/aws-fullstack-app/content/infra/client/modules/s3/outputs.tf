output "bucket_name" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.this.bucket_domain_name
}

output "bucket_id" {
  description = "The ID of the S3 bucket"
  value       = aws_s3_bucket.this.id
}

output "bucket_arn" {
  description = "The ARN of the S3 bucket"
  value       = aws_s3_bucket.this.arn
}

output "bucket_url" {
  description = "The URL of the S3 bucket"
  value       = "s3://${aws_s3_bucket.this.bucket}"
}
