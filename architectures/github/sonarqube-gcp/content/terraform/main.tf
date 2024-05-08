### VPC Network
module "gcp_vpc" {
  source = "./modules/vpc"
}

### Cloud SQL
module "gcp_cloud_sql" {
  source                = "./modules/cloud_sql"
  project_id            = var.project_id
  region                = var.region
  cloud_vpc_id          = module.gcp_vpc.cloud_vpc_id
  postgres_version      = var.postgres_version
  sonarqube_db_password = var.sonarqube_db_password
  sonarqube_db_user     = var.sonarqube_db_user
}

### Cloud Run
module "gcp_cloud_run" {
  source                       = "./modules/cloud_run"
  project_id                   = var.project_id
  region                       = var.region
  sonarqube_version            = var.sonarqube_version
  sonarqube_db_user            = module.gcp_cloud_sql.cloud_sql_user_name
  sonarqube_db_password        = var.sonarqube_db_password
  cloud_vpc_name               = module.gcp_vpc.cloud_vpc_name
  cloud_sql_db_name            = module.gcp_cloud_sql.cloud_sql_db_name
  cloud_sql_db_connection_name = module.gcp_cloud_sql.cloud_sql_db_connection_name
  cloud_sql_private_ip_address = module.gcp_cloud_sql.cloud_sql_private_ip_address

  depends_on = [module.gcp_cloud_sql]
}

### IAM - COMMENT AFTER ADDING VPC
# module "gcp_iam" {
#   source                     = "./modules/iam"
#   cloud_run_service_location = module.gcp_cloud_run.cloud_run_service_location
#   cloud_run_service_name     = module.gcp_cloud_run.cloud_run_service_name
#   cloud_run_service_project  = module.gcp_cloud_run.cloud_run_service_project

#   depends_on = [module.gcp_cloud_run]
# }
