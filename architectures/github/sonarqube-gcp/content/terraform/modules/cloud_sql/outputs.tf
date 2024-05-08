output "cloud_sql_private_ip_address" {
  value = google_sql_database_instance.sonarqube_db.private_ip_address
}

output "cloud_sql_db_name" {
  value = google_sql_database_instance.sonarqube_db.name

}

output "cloud_sql_db_connection_name" {
  value = google_sql_database_instance.sonarqube_db.connection_name

}
output "cloud_sql_user_name" {
  value = google_sql_user.sonarqube_user.name
}