variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "alb_name" {
  description = "The name of the ALB"
  type        = string
}

variable "alb_dns_name"{
  description = "The DNS name of the ALB"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the ECS service and task definition"
  type        = map(string)
  default     = {}
}
