variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "security_groups" {
  description = "The security groups associated with the ALB"
  type        = list(string)
}

variable "subnet_ids" {
  description = "The subnets associated with the ALB"
  type        = list(string)
}

variable "target_group_port" {
  description = "The port for the target group"
  type        = number
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "health_check_path" {
  description = "The path for the health check"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the ALB and target group"
  type        = map(string)
  default     = {}
}
