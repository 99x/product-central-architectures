# TODO: Remove this after adding VPC
data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

# TODO: Remove this after adding VPC
resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = var.cloud_run_service_location
  project     = var.cloud_run_service_project
  service     = var.cloud_run_service_name
  policy_data = data.google_iam_policy.noauth.policy_data
}
