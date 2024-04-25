terraform {
  required_version = "~> 1.5.7"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.41.0"
    }
  }
}

provider "aws" {
  region     = var.default_region
  access_key = var.access_key_id
  secret_key = var.secret_access_key
}
