variable "project" {
  description = "The project name"
  type        = string
}

variable "environment" {
  description = "The environment name"
  type        = string
}

variable "container_port" {
  description = "Port on which the container listens"
  type        = number
}

variable "elasticache_port" {
  description = "Port on which the ElastiCache cluster listens"
  type        = number
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "allowed_cidr_blocks" {
  description = "Allowed CIDR blocks"
  type        = list(string)
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}