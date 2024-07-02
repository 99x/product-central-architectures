module "s3_bucket" {
  source         = "./modules/s3"
  project        = var.project
  environment    = var.environment
  bucket_name    = var.bucket_name
  index_document = var.index_document
  error_document = var.error_document

  tags = var.tags
}

module "cloudfront" {
  source                = "./modules/cloudfront"
  project               = var.project
  environment           = var.environment
  s3_bucket_domain_name = "${var.project}-${var.environment}-${var.bucket_name}.s3.amazonaws.com"
  s3_origin_id          = var.bucket_name
  default_root_object   = var.index_document
  tags                  = var.tags

  depends_on = [module.s3_bucket]
}

module "iam" {
  source                 = "./modules/iam"
  project                = var.project
  environment            = var.environment
  bucket_id              = module.s3_bucket.bucket_id
  bucket_arn             = module.s3_bucket.bucket_arn
  cloudfront_oai_iam_arn = module.cloudfront.cloudfront_origin_access_identity_iam_arn
  tags                   = var.tags
}

# module "route53" {
#   source                    = "./modules/route53"
#   zone_id                   = var.route53_zone_id
#   domain_name               = var.domain_name
#   cloudfront_domain_name    = module.cloudfront.cloudfront_domain_name
#   cloudfront_hosted_zone_id = module.cloudfront.cloudfront_hosted_zone_id

#   depends_on = [module.cloudfront]
# }
