variable "aws_region" {
  description = "The AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "aws_access_key_id" {
  description = "AWS access key ID"
  type        = string
}

variable "aws_secret_access_key" {
  description = "AWS secret access key"
  type        = string
}

variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment in which the resources are deployed"
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "index_document" {
  description = "The index document for the S3 bucket"
  type        = string
  default     = "index.html"
}

variable "error_document" {
  description = "The error document for the S3 bucket"
  type        = string
  default     = "error.html"
}

# variable "route53_zone_id" {
#   description = "The ID of the Route 53 hosted zone"
#   type        = string
#   default     = "ap-southeast-1"
# }

# variable "domain_name" {
#   description = "The domain name to create the Route 53 record for"
#   type        = string
# }

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
