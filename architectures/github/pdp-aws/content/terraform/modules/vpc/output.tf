output vpc_id {
  value = aws_vpc.productcentral_vpc.id
}

output security_group_id {
  value = aws_vpc.productcentral_vpc.default_security_group_id
}

output public_subnets {
  value = {
    for subnet in aws_subnet.public_subnets:
      subnet.availability_zone => subnet.id
  }
}
