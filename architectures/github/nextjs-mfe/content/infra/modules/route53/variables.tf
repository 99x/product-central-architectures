variable "zone_id" {
  description = "The ID of the Route 53 hosted zone"
  type        = string
}

variable "domain_name" {
  description = "The domain name to create the Route 53 record for"
  type        = string
}

variable "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution"
  type        = string
}

variable "cloudfront_hosted_zone_id" {
  description = "The hosted zone ID for CloudFront"
  type        = string
}
