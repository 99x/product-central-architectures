#!/bin/bash

set -eo pipefail

PARAMETERS_JSON=$1

PROJECT_NAME=$(echo $PARAMETERS_JSON | jq -r '.project')
ORG_NAME=$(echo $PARAMETERS_JSON | jq -r '.orgName')
APP_NAME=$(echo $PARAMETERS_JSON | jq -r '.appTitle')
GITHUB_TOKEN=$(echo $PARAMETERS_JSON | jq -r '.githubToken')
GITHUB_CLIENT_ID=$(echo $PARAMETERS_JSON | jq -r '.githubClientId')
GITHUB_CLIENT_SECRET=$(echo $PARAMETERS_JSON | jq -r '.githubClientSecret')
AWS_ACCESS_KEY_ID=$(echo $PARAMETERS_JSON | jq -r '.awsAccessKeyId')
AWS_SECRET_ACCESS_KEY=$(echo $PARAMETERS_JSON | jq -r '.awsSecretAccessKey')
ENV=$(echo $PARAMETERS_JSON | jq -r '.env')
REGION=$(echo $PARAMETERS_JSON | jq -r '.region')

for var in PROJECT_NAME ORG_NAME APP_NAME GITHUB_TOKEN GITHUB_CLIENT_ID GITHUB_CLIENT_SECRET AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ENV REGION; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

terraform destroy -auto-approve \
  -var "project=$PROJECT_NAME" \
  -var "organization_name=$ORG_NAME" \
  -var "app_title=$APP_NAME" \
  -var "github_token=$GITHUB_TOKEN" \
  -var "github_client_id=$GITHUB_CLIENT_ID" \
  -var "github_client_secret=$GITHUB_CLIENT_SECRET" \
  -var "access_key_id=$AWS_ACCESS_KEY_ID" \
  -var "secret_access_key=$AWS_SECRET_ACCESS_KEY" \
  -var "env=$ENV" \
  -var "default_region=$REGION"

echo "Terraform destroy completed!"