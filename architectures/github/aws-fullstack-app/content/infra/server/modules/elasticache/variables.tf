variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment (e.g. `development`, `staging`, `production`)"
  type        = string
}

variable "logs_retention_days" {
  description = "The number of days to retain logs"
  type        = number
}

variable "subnet_ids" {
  description = "List of VPC subnet IDs for the cache subnet group"
  type        = list(string)
}

variable "engine" {
  description = "Name of the cache engine to be used for this cache cluster."
  type        = string
}

variable "node_type" {
  description = "The compute and memory capacity of the nodes in the node group."
  type        = string
}

variable "num_cache_nodes" {
  description = "The number of cache nodes that the cache cluster should have."
  type        = number
}

variable "port" {
  description = "The port number on which each of the cache nodes will accept connections."
  type        = number
}

variable "security_group_ids" {
  description = "One or more VPC security groups associated with the cache cluster."
  type        = list(string)
}

variable "tags" {
  description = "Tags to apply to the resources"
  type        = map(string)
}
