# TODO: Configuration of AWS Web Application Firewalls (WAF) Rules for CloudFront.
resource "aws_cloudfront_distribution" "this" {
  comment         = "${var.project}-${var.environment}-cloudfront-distribution-server"
  enabled         = true
  is_ipv6_enabled = true
  #   aliases         = ["${var.environment}.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = var.alb_name
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = true
      headers      = ["*"]

      cookies {
        forward = "all"
      }
    }
  }

  origin {
    # domain_name = aws_alb.alb.dns_name
    domain_name = var.alb_dns_name
    origin_id   = var.alb_name

    custom_origin_config {
      origin_read_timeout      = 60
      origin_keepalive_timeout = 60
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    # TODO: use this once the ACM certificate + route53 DNS is setup
    # acm_certificate_arn      = aws_acm_certificate.cloudfront_certificate.arn
    # minimum_protocol_version = "TLSv1.1_2016"
    # ssl_support_method       = "sni-only"
  }

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment
  })
}
