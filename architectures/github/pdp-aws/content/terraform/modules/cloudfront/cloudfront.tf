# Using existing CloudFront cache policy "Managed-CachingDisabled"
data "aws_cloudfront_cache_policy" "cf_cache_policy" {
  id = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
}

# Using existing CloudFront origin request policy "Managed-AllViewer"
data "aws_cloudfront_origin_request_policy" "cf_origin_request_policy" {
  id = "216adef6-5c7f-47e4-b989-5492eafa07d3"
}

resource "aws_cloudfront_distribution" "cf_distribution" {
  origin {
    domain_name = var.alb_dns_name
    origin_id   = var.project

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }


  enabled         = true
  is_ipv6_enabled = true

  default_cache_behavior {
    target_origin_id = var.project

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD"]

    cache_policy_id          = data.aws_cloudfront_cache_policy.cf_cache_policy.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.cf_origin_request_policy.id

  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# update ssm with cloudfront url
resource "aws_ssm_parameter" "cloudfront_url" {
  name      = "/${var.project}/${var.env}/APP_URL"
  type      = "String"
  value     = "https://${aws_cloudfront_distribution.cf_distribution.domain_name}"  

  overwrite = true
}
