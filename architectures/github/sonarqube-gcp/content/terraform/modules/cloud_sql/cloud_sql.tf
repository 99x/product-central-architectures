# Cloud SQL Postgres Instance
resource "google_sql_database_instance" "sonarqube_db" {
  name             = "${var.project_id}-instance"
  region           = var.region
  database_version = var.postgres_version
  deletion_protection = false

  settings {
    tier = "db-f1-micro"
    availability_type = "REGIONAL"
    disk_size = 10 # 10 GB - smallest

    ip_configuration {
      ipv4_enabled = false
      private_network = var.cloud_vpc_id
    }
  }
}

# Cloud SQL User Account
resource "google_sql_user" "sonarqube_user" {
  name            = var.sonarqube_db_user
  instance        = google_sql_database_instance.sonarqube_db.name
  password        = var.sonarqube_db_password
  deletion_policy = "ABANDON"
}