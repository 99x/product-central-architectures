variable "sonarqube_version" {
  type        = string
  description = "SonarQube version"
  default     = "community"
}

# TODO: remove default after test
variable "gcp_credentials_base64" {
  type        = string
  description = "GCP credentials in base64"
}

# TODO: remove default after test
variable "project_id" {
  type        = string
  description = "Project ID"
}

variable "region" {
  type        = string
  description = "Region"
  default     = "asia-southeast1"
}

variable "postgres_version" {
  type        = string
  description = "PostgreSQL version"
  default     = "POSTGRES_15"
}

variable "sonarqube_db_password" {
  type        = string
  description = "SonarQube database password"
  default     = "sonarqube"
}

variable "sonarqube_db_user" {
  type        = string
  description = "SonarQube database user"
  default     = "sonarqube"
}
variable "sonarqube_db_name" {
  type        = string
  description = "SonarQube database name"
  default     = "sonarqube"
}

