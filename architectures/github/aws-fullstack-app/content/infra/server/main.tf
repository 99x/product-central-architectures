data "aws_caller_identity" "current" {}

module "iam" {
  source      = "./modules/iam"
  project     = var.project
  environment = var.environment
  tags        = var.tags
}

module "vpc" {
  source             = "./modules/vpc"
  project            = var.project
  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  public_subnets     = var.public_subnets
  private_subnets    = var.private_subnets
  availability_zones = var.availability_zones
  tags               = var.tags

  depends_on = [module.iam]
}

module "security_groups" {
  source              = "./modules/security_groups"
  project             = var.project
  environment         = var.environment
  container_port      = var.container_port
  vpc_id              = module.vpc.vpc_id
  elasticache_port    = var.elasticache_port
  allowed_cidr_blocks = [var.vpc_cidr]
  tags                = var.tags

  depends_on = [module.iam, module.vpc]
}

module "alb" {
  source            = "./modules/alb"
  project           = var.project
  environment       = var.environment
  security_groups   = [module.security_groups.alb_sg_id]
  subnet_ids        = module.vpc.public_subnet_ids
  target_group_port = var.target_group_port
  vpc_id            = module.vpc.vpc_id
  health_check_path = var.health_check_path
  tags              = var.tags

  depends_on = [module.iam, module.security_groups, module.vpc]
}

module "ecr" {
  source      = "./modules/ecr"
  project     = var.project
  environment = var.environment
  tags        = var.tags
}

module "elasticache" {
  source              = "./modules/elasticache"
  project             = var.project
  environment         = var.environment
  logs_retention_days = var.logs_retention_days
  subnet_ids          = module.vpc.private_subnet_ids
  engine              = var.elasticache_engine
  node_type           = var.elasticache_node_type
  num_cache_nodes     = var.elasticache_num_cache_nodes
  port                = var.elasticache_port
  security_group_ids  = [module.security_groups.elasticache_sg_id]
  tags                = var.tags

  depends_on = [module.iam, module.vpc]
}

module "ec2" {
  source                   = "./modules/ec2"
  project                  = var.project
  environment              = var.environment
  instance_type            = var.ec2_instance_type
  ec2_instance_profile_arn = module.iam.ec2_instance_profile_arn
  security_groups          = [module.security_groups.ec2_sg_id]
  subnet_ids               = module.vpc.private_subnet_ids
  min_size                 = var.ec2_min_size
  max_size                 = var.ec2_max_size
  desired_capacity         = var.ec2_desired_capacity
  tags                     = var.tags

  depends_on = [module.iam, module.vpc, module.security_groups]
}

module "ecs" {
  source                               = "./modules/ecs"
  project                              = var.project
  environment                          = var.environment
  container_image                      = var.container_image
  cpu                                  = var.ecs_task_cpu
  memory                               = var.ecs_task_memory
  logs_retention_days                  = var.logs_retention_days
  cpu_target_tracking_desired_value    = var.cpu_target_tracking_desired_value
  memory_target_tracking_desired_value = var.memory_target_tracking_desired_value
  service_role_arn                     = module.iam.ecs_service_role_arn
  autoscaling_group_arn                = module.ec2.autoscaling_group_arn
  execution_role_arn                   = module.iam.ecs_task_execution_role_arn
  task_role_arn                        = module.iam.ecs_task_role_arn
  desired_count                        = var.ecs_service_desired_count
  subnet_ids                           = module.vpc.private_subnet_ids
  security_groups                      = [module.security_groups.ecs_sg_id]
  target_group_arn                     = module.alb.target_group_arn
  container_port                       = var.container_port
  region                               = var.aws_region
  tags                                 = var.tags

  depends_on = [module.iam, module.vpc, module.alb, module.ecr, module.iam, module.security_groups, module.ec2]
}

module "cloudfront" {
  source       = "./modules/cloudfront"
  project      = var.project
  environment  = var.environment
  alb_name     = module.alb.alb_name
  alb_dns_name = module.alb.alb_dns_name
  tags         = var.tags

  depends_on = [module.iam, module.vpc, module.alb, module.ec2, module.ecs]
}

module "route53" {
  source                    = "./modules/route53"
  zone_id                   = var.route53_zone_id
  domain_name               = var.domain_name
  cloudfront_domain_name    = module.cloudfront.cloudfront_distribution_domain_name
  cloudfront_hosted_zone_id = module.cloudfront.cloudfront_distribution_hosted_zone_id

  depends_on = [module.alb, module.cloudfront]
}

