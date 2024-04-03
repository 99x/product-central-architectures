resource "google_sql_database_instance" "instance" {
  name                = "${var.project}-${var.env}-instance"
  region              = var.region
  deletion_protection = false

  database_version = "POSTGRES_15"
  settings {
    tier = "db-g1-small"

    ip_configuration {
      authorized_networks {
        value = "0.0.0.0/0"
        name  = "all-test-before-vpc"
      }
    }
  }
}

resource "google_sql_database" "database" {
  name     = "${var.project}-${var.env}-db"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "user" {
  name            = var.postgresql_user
  instance        = google_sql_database_instance.instance.name
  password        = var.postgresql_password
  deletion_policy = "ABANDON"
}

resource "google_cloud_run_service" "service" {
  name     = "${var.project}-${var.env}-service"
  location = var.region

  template {
    metadata {
      annotations = {
        "run.googleapis.com/client-name"        = "${var.project}-${var.env}-cloud-sql"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.instance.connection_name
      }
    }

    spec {
      containers {
        image = var.container_image

        env {
          name  = "APP_URL"
          value = "http://localhost:7007"
        }

        env {
          name  = "APP_TITLE"
          value = var.app_title
        }

        env {
          name  = "ORG_NAME"
          value = var.organization_name
        }

        env {
          name  = "POSTGRES_HOST"
          value = google_sql_database_instance.instance.public_ip_address
        }

        env {
          name  = "POSTGRES_PORT"
          value = "5432"
        }

        env {
          name  = "POSTGRES_USER"
          value = google_sql_user.user.name
        }

        env {
          name  = "POSTGRES_PASSWORD"
          value = google_sql_user.user.password
        }

        env {
          name  = "GITHUB_TOKEN"
          value = var.github_token
        }

        env {
          name  = "AUTH_GITHUB_CLIENT_ID"
          value = var.github_client_id
        }

        env {
          name  = "AUTH_GITHUB_CLIENT_SECRET"
          value = var.github_client_secret
        }

        ports {
          container_port = 7007
        }

        resources {
          limits = {
            cpu    = "1"
            memory = "1Gi"
          }
          requests = {
            cpu    = "1"
            memory = "1Gi"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  lifecycle {
    ignore_changes = [template[0].spec[0].containers[0].env]
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.service.location
  project     = google_cloud_run_service.service.project
  service     = google_cloud_run_service.service.name
  policy_data = data.google_iam_policy.noauth.policy_data
}


resource "null_resource" "update_app_url" {
  triggers = {
    type        = "external"
    service_url = google_cloud_run_service.service.status.0.url
  }

  provisioner "local-exec" {
    command = <<EOF
      gcloud auth activate-service-account --key-file=<(echo "${var.gcp_credentials_base64}" | base64 -d) --project ${var.project}
      gcloud run services update ${google_cloud_run_service.service.name} --platform managed --region ${var.region} \
      --update-env-vars=APP_URL="${google_cloud_run_service.service.status.0.url}" --quiet
    EOF

    interpreter = ["bash", "-c"]
  }

  depends_on = [google_cloud_run_service.service]
}
