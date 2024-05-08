output "cloud_vpc_id" {
  value = google_compute_network.sonarqube_vpc.id
}

output "cloud_vpc_name" {
  value = google_compute_network.sonarqube_vpc.name
}
