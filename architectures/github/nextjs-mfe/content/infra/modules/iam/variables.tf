variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "bucket_id" {
  description = "The ID of the S3 bucket"
  type        = string
}

variable "bucket_arn" {
  description = "The ARN of the S3 bucket"
  type        = string
}

variable "cloudfront_oai_iam_arn" {
  description = "The ARN of the CloudFront Origin Access Identity"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the IAM roles and policies"
  type        = map(string)
  default     = {}
}
