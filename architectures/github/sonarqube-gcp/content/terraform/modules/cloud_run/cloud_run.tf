# Cloud Run Service for SonarQube
resource "google_cloud_run_service" "sonarqube" {
  provider = google-beta

  name     = "${var.project_id}-sonarqube"
  location = var.region

  metadata {
    annotations = {
      "run.googleapis.com/launch-stage" = "BETA"
      "run.googleapis.com/client-name" = "${var.project_id}-cloud-sql"
      # "run.googleapis.com/cloudsql-instances" = var.cloud_sql_db_connection_name
      # "run.googleapis.com/vpc-access-connector" = var.cloud_vpc_name
      # "run.googleapis.com/vpc-access-egress" = "private-ranges-only"  
    }
  }

  template {
    spec {
      containers {
        image = "sonarqube:${var.sonarqube_version}"

        env {
          name = "SONAR_JDBC_URL"
          value = format("jdbc:postgresql://%s/%s",
            var.cloud_sql_private_ip_address,
          var.cloud_sql_db_name)
        }
        env {
          name  = "SONAR_JDBC_USERNAME"
          value = var.sonarqube_db_user
        }
        env {
          name  = "SONAR_JDBC_PASSWORD"
          value = var.sonarqube_db_password
        }

        ports {
          container_port = 9000
        }

        resources {
          limits = {
            cpu    = "2"
            memory = "4Gi"
          }
          requests = {
            cpu    = "2"
            memory = "4Gi"
          }
        }

        volume_mounts {
          name       = "sonarqube-data"
          mount_path = "/opt/sonarqube/data"
        }

        volume_mounts {
          name       = "sonarqube-extensions"
          mount_path = "/opt/sonarqube/extensions"
        }

        volume_mounts {
          name       = "sonarqube-logs"
          mount_path = "/opt/sonarqube/logs"
        }
      }

      volumes {
        name = "sonarqube-data"
        empty_dir {
          medium     = "Memory"
          size_limit = "1Gi"
        }

      }

      volumes {
        name = "sonarqube-extensions"
        empty_dir {
          medium     = "Memory"
          size_limit = "1Gi"
        }
      }

      volumes {
        name = "sonarqube-logs"
        empty_dir {
          medium     = "Memory"
          size_limit = "1Gi"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}



