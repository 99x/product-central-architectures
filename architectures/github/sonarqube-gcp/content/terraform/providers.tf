terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.20.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "5.20.0"
    }
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
  credentials = base64decode(var.gcp_credentials_base64)
}

provider "google-beta" {
  project     = var.project_id
  region      = var.region
  credentials = base64decode(var.gcp_credentials_base64)
}