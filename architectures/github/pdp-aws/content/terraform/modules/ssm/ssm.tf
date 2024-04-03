resource "aws_ssm_parameter" "app_url" {
  name  = "/${var.project}/${var.env}/APP_URL"
  type  = "String"
  value = "http://${var.alb_dns_name}"
}

resource "aws_ssm_parameter" "app_title" {
  name  = "/${var.project}/${var.env}/APP_TITLE"
  type  = "String"
  value = var.app_title
}

resource "aws_ssm_parameter" "org_name" {
  name  = "/${var.project}/${var.env}/ORG_NAME"
  type  = "String"
  value = var.organization_name
}

resource "aws_ssm_parameter" "postgres_port" {
  name  = "/${var.project}/${var.env}/POSTGRES_PORT"
  type  = "String"
  value = "5432"
}

resource "aws_ssm_parameter" "postgres_host" {
  name  = "/${var.project}/${var.env}/POSTGRES_HOST"
  type  = "String"
  value = var.postgres_host
}

resource "aws_ssm_parameter" "postgres_user" {
  name  = "/${var.project}/${var.env}/POSTGRES_USER"
  type  = "String"
  value = var.postgres_user
}

resource "aws_ssm_parameter" "postgres_password" {
  name  = "/${var.project}/${var.env}/POSTGRES_PASSWORD"
  type  = "String"
  value = var.postgres_password
}

resource "aws_ssm_parameter" "github_token" {
  name  = "/${var.project}/${var.env}/GITHUB_TOKEN"
  type  = "String"
  value = var.github_token
}

resource "aws_ssm_parameter" "github_client_id" {
  name  = "/${var.project}/${var.env}/AUTH_GITHUB_CLIENT_ID"
  type  = "String"
  value = var.github_client_id
}

resource "aws_ssm_parameter" "github_client_secret" {
  name  = "/${var.project}/${var.env}/AUTH_GITHUB_CLIENT_SECRET"
  type  = "String"
  value = var.github_client_secret
}
