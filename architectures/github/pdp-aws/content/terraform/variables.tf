variable "default_region" {
  type        = string
  default     = "ap-southeast-1"
  description = "Default region"
}

variable "project" {
  type        = string
  default     = "product-central"
  description = "Project name"
}

variable "env" {
  type        = string
  default     = "dev"
  description = "Environment"
}

variable "postgresql_user" {
  type        = string
  default     = "postgres"
  description = "PostgreSQL username"
}

variable "postgresql_password" {
  type        = string
  default     = "H@Sh1CoR!333py"
  description = "PostgreSQL password"
}

variable "app_title" {
  type        = string
  default     = "Product Central"
  description = "App title"
}

variable "organization_name" {
  type        = string
  default     = "99x"
  description = "Organization name"
}

variable "container_image" {
  type        = string
  description = "Container image"
  default     = "public.ecr.aws/q6x6r0m5/product-central:tutorial.aws-1.0.0"
}

variable "public_subnets" {
  type        = map(string)
  description = "Map of public subnets"
  default = {
    "ap-southeast-1a" = "172.31.0.0/20"
    "ap-southeast-1b" = "172.31.16.0/20"
  }
}

variable "vpc_cidr_block" {
  type    = string
  default = "172.31.0.0/16"
}

variable "postgres_user" {
  type    = string
  default = "psqlAdmin"
}

variable "postgres_password" {
  type    = string
  default = "c2VjcmV0Cg=="
}

variable "github_token" {
  type        = string
  description = "Github Personal Access Token"

}

variable "github_client_id" {
  type        = string
  description = "Github client ID"
}

variable "github_client_secret" {
  type        = string
  description = "Github client secret"
}

variable "access_key_id" {
  type        = string
  description = "AWS Access Key ID"
}

variable "secret_access_key" {
  type        = string
  description = "AWS Secret Access Key"
}

