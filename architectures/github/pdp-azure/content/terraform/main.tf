resource "azurerm_resource_group" "example" {
  name     = "${var.project}-${var.env}-rg"
  location = var.region
}

resource "azurerm_postgresql_flexible_server" "example" {
  name                   = "${var.project}-${var.env}-psql"
  resource_group_name    = azurerm_resource_group.example.name
  location               = azurerm_resource_group.example.location
  version                = "16"
  administrator_login    = var.postgresql_user
  administrator_password = var.postgresql_password
  zone                   = "1"


  storage_mb   = 32768
  storage_tier = "P30"

  sku_name = "GP_Standard_D4s_v3"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "azure" {
  count            = 1
  name             = "allow-access-from-azure-services"
  server_id        = azurerm_postgresql_flexible_server.example.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "all" {
  count            = 1
  name             = "allow-all-ips"
  server_id        = azurerm_postgresql_flexible_server.example.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}

resource "azurerm_postgresql_flexible_server_configuration" "example" {
  name      = "require_secure_transport"
  server_id = azurerm_postgresql_flexible_server.example.id
  value     = "off"
}


resource "azurerm_log_analytics_workspace" "example" {
  name                = "${var.project}-${var.env}-log"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "example" {
  name                       = "${var.project}-${var.env}-azure"
  location                   = azurerm_resource_group.example.location
  resource_group_name        = azurerm_resource_group.example.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.example.id
}

resource "azurerm_container_app" "example" {
  name                         = "${var.project}-${var.env}-app"
  container_app_environment_id = azurerm_container_app_environment.example.id
  resource_group_name          = azurerm_resource_group.example.name
  revision_mode                = "Single"


  ingress {
    external_enabled = true
    target_port      = 7007

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  template {
    container {
      name   = "${var.project}-${var.env}-container"
      image  = var.container_image
      cpu    = 1
      memory = "1Gi"

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
        value = azurerm_postgresql_flexible_server.example.fqdn
      }

      env {
        name  = "POSTGRES_PORT"
        value = "5432"
      }

      env {
        name  = "POSTGRES_USER"
        value = azurerm_postgresql_flexible_server.example.administrator_login
      }

      env {
        name  = "POSTGRES_PASSWORD"
        value = azurerm_postgresql_flexible_server.example.administrator_password
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

    }

    min_replicas = 0
  }

  depends_on = [azurerm_postgresql_flexible_server.example]
}

resource "null_resource" "update_trigger" {
  triggers = {
    type = "external"
    fqdn = azurerm_container_app.example.ingress[0].fqdn
  }

  provisioner "local-exec" {
    command = <<EOF
      az login --service-principal --username ${var.client_id} --password ${var.client_secret} --tenant ${var.tenant_id}
      az containerapp update \
        --name ${azurerm_container_app.example.name} \
        --resource-group ${azurerm_container_app.example.resource_group_name} \
        --set-env-vars APP_URL="https://${azurerm_container_app.example.ingress[0].fqdn}"
    EOF

    interpreter = ["bash", "-c"]
  }
}

