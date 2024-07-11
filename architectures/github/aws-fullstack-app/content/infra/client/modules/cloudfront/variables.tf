variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "s3_bucket_domain_name" {
  description = "The domain name of the S3 bucket"
  type        = string
}

variable "s3_origin_id" {
  description = "The origin ID for the S3 bucket"
  type        = string
}

variable "default_root_object" {
  description = "The default root object for the CloudFront distribution"
  type        = string
  default     = "index.html"
}

variable "tags" {
  description = "Tags to apply to the CloudFront distribution"
  type        = map(string)
  default     = {}
}
