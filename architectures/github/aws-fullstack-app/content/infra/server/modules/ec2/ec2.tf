data "aws_ami" "amazon_linux_2" {
  most_recent = true

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm-*-x86_64-ebs"]
  }

  owners = ["amazon"]
}

data "template_file" "user_data" {
  template = file("user_data.sh") # file from root project directory

  vars = {
    ecs_cluster_name = "${var.project}-${var.environment}-cluster"
  }
}


## Create a public and private key pair for login to the EC2 Instances
resource "aws_key_pair" "this" {
  key_name   = "${var.project}-${var.environment}-keypair"
  public_key = var.public_ec2_key
}

resource "aws_launch_template" "this" {
  name_prefix   = "${var.project}-${var.environment}-ecs-lt"
  image_id      = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type

  key_name               = aws_key_pair.this.key_name
  user_data              = base64encode(data.template_file.user_data.rendered)
  vpc_security_group_ids = var.security_groups

  iam_instance_profile {
    arn = var.ec2_instance_profile_arn
  }

  monitoring {
    enabled = true
  }
}

resource "aws_autoscaling_group" "this" {
  min_size                  = var.min_size
  max_size                  = var.max_size
  desired_capacity          = var.desired_capacity
  vpc_zone_identifier       = var.subnet_ids
  health_check_type         = "EC2"
  protect_from_scale_in     = true

  enabled_metrics = [
    "GroupMinSize",
    "GroupMaxSize",
    "GroupDesiredCapacity",
    "GroupInServiceInstances",
    "GroupPendingInstances",
    "GroupStandbyInstances",
    "GroupTerminatingInstances",
    "GroupTotalInstances"
  ]

  launch_template {
    id      = aws_launch_template.this.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"
  }

  lifecycle {
    create_before_destroy = true
  }

  tag {
    key                 = "Name"
    value               = "${var.project}-${var.environment}-ec2"
    propagate_at_launch = true
  }
}

