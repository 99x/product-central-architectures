data "aws_caller_identity" "current" {}

### VPC
module "aws_vpc" {
  source         = "./modules/vpc"
  project        = var.project
  vpc_cidr_block = var.vpc_cidr_block
  public_subnets = var.public_subnets
}

### ALB
module "aws_alb" {
  source     = "./modules/alb"
  project    = var.project
  vpc_id     = module.aws_vpc.vpc_id
  subnet_ids = values(module.aws_vpc.public_subnets)
  depends_on = [module.aws_vpc]
}

### RDS
module "aws_rds" {
  source                    = "./modules/rds"
  project                   = var.project
  region                    = var.default_region
  storage                   = 10
  username                  = var.postgres_user
  password                  = var.postgres_password
  subnet_ids                = values(module.aws_vpc.public_subnets)
  vpc_id                    = module.aws_vpc.vpc_id
  default_security_group_id = module.aws_alb.default_security_group_id
  depends_on                = [module.aws_vpc, module.aws_alb]
}

### SSM
module "aws_ssm" {
  source               = "./modules/ssm"
  project              = var.project
  env                  = var.env
  organization_name    = var.organization_name
  app_title            = var.app_title
  alb_dns_name         = module.aws_alb.alb_dns_name
  postgres_host        = module.aws_rds.rds_instance_endpoint
  postgres_user        = var.postgres_user
  postgres_password    = var.postgres_password
  github_token         = var.github_token
  github_client_id     = var.github_client_id
  github_client_secret = var.github_client_secret
  depends_on           = [module.aws_rds]
}

### IAM
module "aws_iam" {
  source  = "./modules/iam"
  project = var.project
}

### ECS
module "aws_ecs" {
  source                   = "./modules/ecs"
  project                  = var.project
  default_region           = var.default_region
  container_image          = var.container_image
  vpc_id                   = module.aws_vpc.vpc_id
  security_group_ids       = [module.aws_alb.default_security_group_id]
  subnet_ids               = values(module.aws_vpc.public_subnets)
  app_url_arn              = module.aws_ssm.app_url_arn
  app_name_arn             = module.aws_ssm.app_title_arn
  organization_name_arn    = module.aws_ssm.org_name_arn
  execution_role_arn       = module.aws_iam.ecs_role_arn
  postgres_host_arn        = module.aws_ssm.postgres_host_arn
  postgres_port_arn        = module.aws_ssm.postgres_port_arn
  postgres_user_arn        = module.aws_ssm.postgres_user_arn
  postgres_password_arn    = module.aws_ssm.postgres_password_arn
  github_token_arn         = module.aws_ssm.github_token_arn
  github_client_id_arn     = module.aws_ssm.github_client_id_arn
  github_client_secret_arn = module.aws_ssm.github_client_secret_arn
  target_group_arn         = module.aws_alb.target_group_arn

  depends_on = [module.aws_vpc, module.aws_alb, module.aws_ssm, module.aws_iam]
}

### Cloudfront
module "aws_cloudfrount" {
  source       = "./modules/cloudfront"
  project      = var.project
  env          = var.env
  alb_dns_name = module.aws_alb.alb_dns_name

  depends_on = [module.aws_ecs]
}
