#!/bin/bash

set -eo pipefail

PARAMETERS_JSON=$1

PROJECT_NAME=$(echo $PARAMETERS_JSON | jq -r '.project')
ORG_NAME=$(echo $PARAMETERS_JSON | jq -r '.orgName')
APP_TITLE=$(echo $PARAMETERS_JSON | jq -r '.appTitle')
GITHUB_TOKEN=$(echo $PARAMETERS_JSON | jq -r '.githubToken')
GITHUB_CLIENT_ID=$(echo $PARAMETERS_JSON | jq -r '.githubClientId')
GITHUB_CLIENT_SECRET=$(echo $PARAMETERS_JSON | jq -r '.githubClientSecret')
AZURE_SUBSCRIPTION_ID=$(echo $PARAMETERS_JSON | jq -r '.azureSubscriptionId')
AZURE_TENANT_ID=$(echo $PARAMETERS_JSON | jq -r '.azureTenantId')
AZURE_CLIENT_ID=$(echo $PARAMETERS_JSON | jq -r '.azureClientId')
AZURE_CLIENT_SECRET=$(echo $PARAMETERS_JSON | jq -r '.azureClientSecret')
ENV=$(echo $PARAMETERS_JSON | jq -r '.env')
REGION=$(echo $PARAMETERS_JSON | jq -r '.region')

for var in PROJECT_NAME ORG_NAME APP_TITLE GITHUB_TOKEN GITHUB_CLIENT_ID GITHUB_CLIENT_SECRET AZURE_SUBSCRIPTION_ID AZURE_TENANT_ID AZURE_CLIENT_ID AZURE_CLIENT_SECRET ENV REGION; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

terraform init
terraform fmt
terraform validate

execute () {
  if [ "$1" = "apply" ]; then
  terraform $1 -auto-approve \
    -var "project=$PROJECT_NAME" \
    -var "organization_name=$ORG_NAME" \
    -var "app_title=$APP_TITLE" \
    -var "github_token=$GITHUB_TOKEN" \
    -var "github_client_id=$GITHUB_CLIENT_ID" \
    -var "github_client_secret=$GITHUB_CLIENT_SECRET" \
    -var "subscription_id=$AZURE_SUBSCRIPTION_ID" \
    -var "tenant_id=$AZURE_TENANT_ID" \
    -var "client_id=$AZURE_CLIENT_ID" \
    -var "client_secret=$AZURE_CLIENT_SECRET" \
    -var "env=$ENV" \
    -var "region=$REGION"
  else
  terraform $1 \
    -var "project=$PROJECT_NAME" \
    -var "organization_name=$ORG_NAME" \
    -var "app_title=$APP_TITLE" \
    -var "github_token=$GITHUB_TOKEN" \
    -var "github_client_id=$GITHUB_CLIENT_ID" \
    -var "github_client_secret=$GITHUB_CLIENT_SECRET" \
    -var "subscription_id=$AZURE_SUBSCRIPTION_ID" \
    -var "tenant_id=$AZURE_TENANT_ID" \
    -var "client_id=$AZURE_CLIENT_ID" \
    -var "client_secret=$AZURE_CLIENT_SECRET" \
    -var "env=$ENV" \
    -var "region=$REGION"
  fi
}

execute plan
execute apply

echo "Terraform apply completed!"
