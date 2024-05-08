output "cloud_run_service_url" {
  value = google_cloud_run_service.sonarqube.status.0.url
}

output "cloud_run_service_location" {
  value = google_cloud_run_service.sonarqube.location
}

output "cloud_run_service_project" {
  value = google_cloud_run_service.sonarqube.project
}

output "cloud_run_service_name" {
  value = google_cloud_run_service.sonarqube.name
}
