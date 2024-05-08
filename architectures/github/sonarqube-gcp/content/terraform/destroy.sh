#!/bin/bash

set -eo pipefail

PARAMETERS_JSON=$1

GCP_CREDENTIALS=$(echo $PARAMETERS_JSON | jq -r '.gcpCredentials')
GCP_PROJECT_ID=$(echo $PARAMETERS_JSON | jq -r '.gcpProjectID')
REGION=$(echo $PARAMETERS_JSON | jq -r '.region')
SONARQUBE_VERSION=$(echo $PARAMETERS_JSON | jq -r '.sonarqubeVersion')
SONARQUBE_DB_USER=$(echo $PARAMETERS_JSON | jq -r '.sonarqubeDBUser')
SONARQUBE_DB_PASSWORD=$(echo $PARAMETERS_JSON | jq -r '.sonarqubeDBPassword')
SONARQUBE_DB_NAME=$(echo $PARAMETERS_JSON | jq -r '.sonarqubeDBName')

for var in GCP_CREDENTIALS GCP_PROJECT_ID REGION SONARQUBE_VERSION SONARQUBE_DB_USER SONARQUBE_DB_PASSWORD SONARQUBE_DB_NAME; do    
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

terraform destroy -auto-approve \
  -var "gcp_credentials_base64=$GCP_CREDENTIALS" \
  -var "project_id=$GCP_PROJECT_ID" \
  -var "region=$REGION" \
  -var "sonarqube_version=$SONARQUBE_VERSION" \
  -var "sonarqube_db_user=$SONARQUBE_DB_USER" \
  -var "sonarqube_db_password=$SONARQUBE_DB_PASSWORD" \
  -var "sonarqube_db_name=$SONARQUBE_DB_NAME"

echo "Terraform destroy completed!"
