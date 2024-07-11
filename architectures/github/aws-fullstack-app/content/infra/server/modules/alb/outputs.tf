output "alb_arn" {
  description = "The ARN of the ALB"
  value       = aws_alb.this.arn
}

output "alb_name" {
  description = "The name of the ALB"
  value       = aws_alb.this.name
}

output "alb_dns_name" {
  description = "The DNS name of the ALB"
  value       = aws_alb.this.dns_name
}

output "target_group_arn" {
  description = "The ARN of the target group"
  value = aws_alb_target_group.this.arn
}
