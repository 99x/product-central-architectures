# VPC
resource "google_compute_network" "sonarqube_vpc" {
  name                    = "sonarqube-vpc"
  routing_mode            = "GLOBAL"
  auto_create_subnetworks = true
}

# Allocate a block of private IP addresses for the VPC
resource "google_compute_global_address" "private_ip_block" {
  name          = "private-ip-block"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  ip_version    = "IPV4"
  prefix_length = 20
  network       = google_compute_network.sonarqube_vpc.id

  depends_on = [google_compute_network.sonarqube_vpc]
}

# Create a VPC peering connection with the shared VPC
resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.sonarqube_vpc.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_block.name]
  deletion_policy         = "ABANDON"

  depends_on = [google_compute_global_address.private_ip_block]
}

# Firewall rule to allow cloud run to connect to the Cloud SQL instance
resource "google_compute_firewall" "allow_cloud_run_to_cloud_sql" {
  name      = "allow-cloud-run-to-cloud-sql"
  network   = google_compute_network.sonarqube_vpc.name
  direction = "INGRESS"

  allow {
    protocol = "tcp"
    ports    = ["5432"]
  }

  source_tags = ["cloud-run"]
  target_tags = ["cloud-sql"]

  depends_on = [google_compute_network.sonarqube_vpc]
}
