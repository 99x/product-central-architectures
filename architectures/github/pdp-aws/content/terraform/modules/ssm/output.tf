output "app_url_arn" {
  value = aws_ssm_parameter.app_url.arn
}

output "app_title_arn" {
  value = aws_ssm_parameter.app_title.arn
}

output "org_name_arn" {
  value = aws_ssm_parameter.org_name.arn
}

output "postgres_host_arn" {
  value = aws_ssm_parameter.postgres_host.arn
}

output "postgres_port_arn" {
  value = aws_ssm_parameter.postgres_port.arn
}

output "postgres_user_arn" {
  value = aws_ssm_parameter.postgres_user.arn
}

output "postgres_password_arn" {
  value = aws_ssm_parameter.postgres_password.arn
}

output "github_token_arn" {
  value = aws_ssm_parameter.github_token.arn
}

output "github_client_id_arn" {
  value = aws_ssm_parameter.github_client_id.arn
}

output "github_client_secret_arn" {
  value = aws_ssm_parameter.github_client_secret.arn
}
