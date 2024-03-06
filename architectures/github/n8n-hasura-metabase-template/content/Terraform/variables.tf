variable "postgres_db_name" {
  description = "The name of your postgres database"
  type        = string
  default     = "postgres"
}

variable "postgres_user_name" {
  description = "Postgres DB User Name"
  type        = string
  default     = "postgres"
}

variable "postgres_password" {
  description = "Postgres DB Password"
  type        = string
  default     = "secret"
}

variable "hasura_graph_ql_admin_password" {
  description = "Hasura GraphQL Admin Password"
  type        = string
  default     = "secret"
}

variable "generic_time_zone" {
  description = "Time Zone"
  type        = string
  default     = "Asia/Colombo"
}

variable "app_name" {
  description = "Application Name"
  type        = string
  default     = "product-central-app"
}

variable "aws_access_key" {
  type        = string
  description = "AWS access key"
}

variable "aws_secret_key" {
  type        = string
  description = "AWS secret key"
}

variable "aws_region" {
  type        = string
  description = "AWS secret key"
  default     = "ap-southeast-1"
}
