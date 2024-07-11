output "autoscaling_group_arn" {
  description = "ECS Autoscaling Group ARN"
  value       = aws_autoscaling_group.this.arn
}
