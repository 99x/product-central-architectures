variable project {
  type = string
}

variable default_region {
  type = string
}

variable container_image {
  type = string
}

variable vpc_id {
  type = string
}

variable security_group_ids {
  type = list(string)
}

variable subnet_ids {
  type = list(string)
}

variable execution_role_arn {
  type = string
}

variable app_url_arn {
  type = string
}

variable app_name_arn {
  type = string
}

variable organization_name_arn {
  type = string
}

variable postgres_host_arn {
  type = string
}

variable postgres_port_arn {
  type = string
}

variable postgres_user_arn {
  type = string
}

variable postgres_password_arn {
  type = string
}

variable github_token_arn {
  type = string
}

variable github_client_id_arn {
  type = string
}

variable github_client_secret_arn {
  type = string
}

variable target_group_arn {
  type = string
}

