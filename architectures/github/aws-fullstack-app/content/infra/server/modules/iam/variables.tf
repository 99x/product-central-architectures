variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the IAM roles and policies"
  type        = map(string)
  default     = {}
}
