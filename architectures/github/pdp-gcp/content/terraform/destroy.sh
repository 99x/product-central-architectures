#!/bin/bash

set -eo pipefail

PARAMETERS_JSON=$1

GCP_PROJECT_ID=$(echo $PARAMETERS_JSON | jq -r '.project')
ORG_NAME=$(echo $PARAMETERS_JSON | jq -r '.orgName')
APP_TITLE=$(echo $PARAMETERS_JSON | jq -r '.appTitle')
GITHUB_TOKEN=$(echo $PARAMETERS_JSON | jq -r '.githubToken')
GITHUB_CLIENT_ID=$(echo $PARAMETERS_JSON | jq -r '.githubClientId')
GITHUB_CLIENT_SECRET=$(echo $PARAMETERS_JSON | jq -r '.githubClientSecret')
GCP_CREDENTIALS=$(echo $PARAMETERS_JSON | jq -r '.gcpCredentials')
ENV=$(echo $PARAMETERS_JSON | jq -r '.env')
REGION=$(echo $PARAMETERS_JSON | jq -r '.region')

for var in GCP_PROJECT_ID ORG_NAME APP_TITLE GITHUB_TOKEN GITHUB_CLIENT_ID GITHUB_CLIENT_SECRET GCP_CREDENTIALS ENV REGION; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

terraform destroy -auto-approve \
  -var "project=$GCP_PROJECT_ID" \
  -var "organization_name=$ORG_NAME" \
  -var "app_title=$APP_TITLE" \
  -var "github_token=$GITHUB_TOKEN" \
  -var "github_client_id=$GITHUB_CLIENT_ID" \
  -var "github_client_secret=$GITHUB_CLIENT_SECRET" \
  -var "gcp_credentials_base64=$GCP_CREDENTIALS" \
  -var "env=$ENV" \
  -var "region=$REGION"

echo "Terraform destroy completed!"