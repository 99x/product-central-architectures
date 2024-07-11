variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The environment in which the resources are deployed"
  type        = string
}

# TEST: Adri 99x's public key machine for fh-aws
variable "public_ec2_key" {
  description = "The public key to use for the EC2 instances"
  type        = string
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDjph4Ed8bKm2gVTrexIyHqbWhqjFg+iXyCdLQrpvG0cfgRphWhXA1y+J7V27Zid+C0NVxdze2AHY1t0Z/Afcjo2CiWm5enn6tKmLMWz3SK7bnKonHDn/qrCfjNmfBED7OcU9efflWVmp5lzvXntBdJztZjUi8K6zwfVgHlF/6LN6otmKfDwSevozLEbwv1eab/R0e3g0ocVQ0sFr1LwOeHZxcl97mH81Y5WgtEPj1btpA66JndTRsZbbru+Gk3S+tMDPUc6S1JPHo5aVD5m3yu0N/iuMQaqWM/tnMfb9ixMpwhDigpfYQE6IiwGjXgqdmrmlgg+pbkpuVExXOGfuc9 adrib@99x-MY-H1WL2PVXCV.local"
}

variable "instance_type" {
  description = "The instance type to use for the ECS instances"
  type        = string
}

variable "ec2_instance_profile_arn" {
  description = "The ARN of the instance profile to use for the ECS instances"
  type        = string
}

variable "security_groups" {
  description = "A list of security group IDs to associate with the ECS instances"
  type        = list(string)
}

variable "subnet_ids" {
  description = "A list of subnet IDs to launch the ECS instances in"
  type        = list(string)
}

variable "min_size" {
  description = "The minimum number of ECS instances"
  type        = number
}

variable "max_size" {
  description = "The maximum number of ECS instances"
  type        = number
}

variable "desired_capacity" {
  description = "The desired number of ECS instances"
  type        = number
}

variable "tags" {
  type = map(string)
}
