locals {
  subnets         = ["public_subnet_a", "public_subnet_b"]
  private_subnets = ["private_subnet_a", "private_subnet_b"]
}

resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  instance_tenancy     = "default"
  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment,
    "Name"        = "${var.project}-${var.environment}-vpc"
  })
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = merge(var.tags, {
    "Name" = "${var.project}-${var.environment}-igw"
  })
}

resource "aws_subnet" "public" {
  count = length(var.public_subnets)

  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnets[count.index]
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = true

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment,
    "Name"        = "${var.project}-${var.environment}-public-subnet-${count.index + 1}"
  })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment,
    "Name"        = "${var.project}-${var.environment}-public-route-table"
  })
}

resource "aws_route_table_association" "public" {
  count          = length(var.public_subnets)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_subnet" "private" {
  count = length(var.private_subnets)

  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = element(var.availability_zones, count.index)

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment,
    "Name"        = "${var.project}-${var.environment}-private-subnet-${count.index + 1}"
  })
}
