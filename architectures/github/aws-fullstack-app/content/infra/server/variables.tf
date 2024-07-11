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
  default     = "99x-aws-fullstack-app"
}

variable "environment" {
  description = "The environment in which the resources are deployed"
  type        = string
}
variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "The CIDR blocks for the public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "The CIDR blocks for the private subnets"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "availability_zones" {
  description = "The availability zones"
  type        = list(string)
  default     = ["ap-southeast-1a", "ap-southeast-1b"]
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}

variable "elasticache_engine" {
  description = "The cache engine to be used"
  type        = string
  default     = "redis"
}

variable "elasticache_node_type" {
  description = "The compute and memory capacity of the nodes"
  type        = string
  default     = "cache.m4.large"
}

variable "elasticache_num_cache_nodes" {
  description = "The number of cache nodes in the cluster"
  type        = number
  default     = 1
}

variable "elasticache_port" {
  description = "The port number for the cache"
  type        = number
  default     = 6379
}

variable "target_group_port" {
  description = "The port for the target group"
  type        = number
  default     = 80
}

variable "health_check_path" {
  description = "The path for the health check"
  type        = string
  default     = "/"
}

variable "container_image" {
  description = "The container image to use"
  type        = string
}

variable "ecs_task_cpu" {
  description = "The number of CPU units used by the task"
  type        = number
  default     = 1024
}

variable "ecs_task_memory" {
  description = "The amount of memory (in MiB) used by the task"
  type        = number
  default     = 1024
}

variable "ecs_service_desired_count" {
  description = "The desired number of tasks"
  type        = number
  default     = 1
}

variable "container_port" {
  description = "The port on which the container is listening"
  type        = number
  default     = 3000
}

variable "ec2_instance_type" {
  description = "The instance type to use for the ECS instances"
  type        = string
  default     = "t3.micro"
}

variable "ec2_min_size" {
  description = "The minimum number of instances in the ECS cluster"
  type        = number
  default     = 1
}

variable "ec2_max_size" {
  description = "The maximum number of instances in the ECS cluster"
  type        = number
  default     = 5
}

variable "ec2_desired_capacity" {
  description = "The desired number of instances in the ECS cluster"
  type        = number
  default     = 3
}

variable "logs_retention_days" {
  description = "The number of days to retain logs"
  type        = number
  default     = 14
}

variable "cpu_target_tracking_desired_value" {
  description = "The desired CPU utilization percentage"
  type        = number
  default     = 75
}

variable "memory_target_tracking_desired_value" {
  description = "The desired memory utilization percentage"
  type        = number
  default     = 75
}

variable "route53_zone_id" {
  description = "The ID of the Route 53 hosted zone"
  type        = string
  default    = "Z1234567890"
}

variable "domain_name" {
  description = "The domain name to create the Route 53 record for"
  type        = string
  default    = "example.com"
}
