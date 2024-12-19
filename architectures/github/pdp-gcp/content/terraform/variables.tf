variable "project" {
  type        = string
  default     = "product-central"
  description = "GCP project id"
}

variable "region" {
  type        = string
  default     = "asia-southeast1"
  description = "Region"
}

variable "env" {
  type        = string
  default     = "dev"
  description = "Environment"
}

variable "gcp_credentials_base64" {
  type        = string
  description = "GCP credentials in base64"
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
  default     = "public.ecr.aws/q6x6r0m5/product-central:latest"
  description = "Container image"
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
