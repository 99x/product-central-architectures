resource "aws_cloudfront_distribution" "this" {
  origin {
    domain_name = var.s3_bucket_domain_name
    origin_id   = "${var.project}-${var.environment}-${var.s3_origin_id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project}-${var.environment}-cloudfront-distribution-client"
  default_root_object = var.default_root_object

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.project}-${var.environment}-${var.s3_origin_id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = merge(var.tags, {
    "Project"     = var.project,
    "Environment" = var.environment
  })
}

resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "OAI for ${var.project}-${var.environment}-${var.s3_origin_id}"
}
