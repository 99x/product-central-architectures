output "ecs_task_execution_role_arn" {
  description = "The ARN of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "ecs_service_role_arn" {
  description = "The ARN of the ECS service role"
  value       = aws_iam_role.ecs_service_role.arn
}

output "ecs_task_role_arn" {
  description = "The ARN of the ECS task role"
  value       = aws_iam_role.ecs_task_iam_role.arn
}

output "ec2_instance_profile_arn" {
  description = "The JSON representation of the instance profile"
  value       = aws_iam_instance_profile.ec2_instance_role_profile.arn

}
