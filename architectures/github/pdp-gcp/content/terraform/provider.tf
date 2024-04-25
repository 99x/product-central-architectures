terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.20.0"
    }
  }
}

provider "google" {
  project     = var.project
  region      = var.region
  credentials = base64decode(var.gcp_credentials_base64)
}
