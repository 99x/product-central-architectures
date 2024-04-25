# output "cf_dns_name" {
#   value = "https://${module.aws_cloudfrount.cf_distribution_domain_name}"
# }

output "alb_dns_name" {
  value = "http://${module.aws_alb.alb_dns_name}"
}