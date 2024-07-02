output "s3_bucket_url" {
  description = "The URL of the S3 bucket"
  value       = module.s3_bucket.bucket_url
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = module.cloudfront.cloudfront_domain_name
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = module.cloudfront.cloudfront_distribution_id
}

output "github_actions_role_arn" {
  description = "The ARN of the GitHub Actions role"
  value       = module.iam.github_actions_role_arn
}

# output "route53_record_fqdn" {
#   description = "The fully qualified domain name of the Route 53 record"
#   value       = module.route53.route53_record_fqdn
# }
