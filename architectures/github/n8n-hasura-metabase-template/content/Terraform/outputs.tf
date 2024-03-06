output "cluster_name" {
  description = "EC2 endpoint DNS"
  value       = aws_instance.web.public_dns
}