variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}
variable "index_document" {
  description = "The index document for the S3 bucket website"
  type        = string
  default     = "index.html"
}

variable "error_document" {
  description = "The error document for the S3 bucket website"
  type        = string
  default     = "error.html"
}

variable "tags" {
  description = "Tags to apply to the bucket"
  type        = map(string)
  default     = {}
}
