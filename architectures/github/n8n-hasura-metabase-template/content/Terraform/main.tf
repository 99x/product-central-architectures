terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure AWS provider
provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_default_vpc" "default_vpc" {
  tags = {
    Name = "Default VPC"
  }
}

resource "aws_security_group" "security_group" {
  name   = "ecs-security-group"
  vpc_id = aws_default_vpc.default_vpc.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    self        = "false"
    cidr_blocks = ["0.0.0.0/0"]
    description = "any"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.large"
  vpc_security_group_ids = [aws_security_group.security_group.id]
  user_data              = <<-EOL
    #!/bin/bash -xe

    sudo apt-get update
    sudo apt-get install docker.io -y
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -a -G docker $(whoami)
    newgrp docker
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    curl https://raw.githubusercontent.com/99x/product-central-architectures/main/architectures/github/n8n-hasura-metabase-template/content/docker-compose.yaml -o docker-compose.yml
    docker volume create n8n_data
    echo -e "GENERIC_TIMEZONE=${var.generic_time_zone}\nPOSTGRES_DB=${var.postgres_db_name}\nPOSTGRES_USER=${var.postgres_user_name}\nPOSTGRES_PASSWORD=${var.postgres_password}\nHASURA_GRAPHQL_ADMIN_SECRET=${var.hasura_graph_ql_admin_password}" > .env
    sudo docker-compose up -d
  EOL

  tags = {
    Name = var.app_name
  }
}
