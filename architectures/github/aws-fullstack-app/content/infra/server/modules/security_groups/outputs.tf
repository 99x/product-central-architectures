output "alb_sg_id" {
  value = aws_security_group.alb_sg.id
}

output "ec2_sg_id" {
  value = aws_security_group.ec2_sg.id
}

output "ecs_sg_id" {
  value = aws_security_group.ecs_sg.id
}

output "elasticache_sg_id" {
  value = aws_security_group.elasticache_sg.id
}
