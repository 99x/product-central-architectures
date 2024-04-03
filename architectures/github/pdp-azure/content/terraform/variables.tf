
variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "client_id" {
  type        = string
  description = "Azure client ID"
}

variable "client_secret" {
  type        = string
  description = "Azure client secret"
}

variable "tenant_id" {
  type        = string
  description = "Azure tenant ID"
}

variable "env" {
  type        = string
  default     = "dev"
  description = "Environment"
}

variable "project" {
  type        = string
  default     = "product-central"
  description = "Project Name"
}

variable "region" {
  type        = string
  default     = "Southeast Asia"
  description = "Region"
}

variable "postgresql_user" {
  type        = string
  default     = "psqladmin"
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
  description = "Organization name"
}

variable "container_image" {
  type        = string
  default     = "99xproductcentral/product-central:latest"
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
