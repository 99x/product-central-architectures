variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "container_image" {
  description = "The Docker image to use for the task"
  type        = string
}

variable "cpu" {
  description = "The number of CPU units used by the task"
  type        = number
}

variable "memory" {
  description = "The amount of memory (in MiB) used by the task"
  type        = number
}

variable "logs_retention_days" {
  description = "The number of days to retain logs"
  type        = number
}

variable "cpu_target_tracking_desired_value" {
  description = "The desired CPU utilization percentage"
  type        = number
}

variable "memory_target_tracking_desired_value" {
  description = "The desired memory utilization percentage"
  type        = number
}

variable "service_role_arn" {
  description = "The ARN of the ECS service role"
  type        = string
}

variable "autoscaling_group_arn" {
  description = "The ARN of the autoscaling group"
  type        = string
}

variable "execution_role_arn" {
  description = "The ARN of the task execution role"
  type        = string
}

variable "task_role_arn" {
  description = "The ARN of the task role"
  type        = string
}

variable "desired_count" {
  description = "The desired number of tasks"
  type        = number
}

variable "subnet_ids" {
  description = "The subnets associated with the service"
  type        = list(string)
}

variable "security_groups" {
  description = "The security groups associated with the service"
  type        = list(string)
}

variable "target_group_arn" {
  description = "The ARN of the target group"
  type        = string
}

variable "container_port" {
  description = "The port on which the container is listening"
  type        = number
}

variable "region" {
  description = "The region in which the resources will be created"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the ECS service and task definition"
  type        = map(string)
  default     = {}
}
