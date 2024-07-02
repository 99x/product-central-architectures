#!/bin/bash

set -eo pipefail

PARAMETERS_JSON=$1

PROJECT=$(echo $PARAMETERS_JSON | jq -r '.project')
AWS_REGION=$(echo $PARAMETERS_JSON | jq -r '.awsRegion')
AWS_ACCESS_KEY_ID=$(echo $PARAMETERS_JSON | jq -r '.awsAccessKeyId')
AWS_SECRET_ACCESS_KEY=$(echo $PARAMETERS_JSON | jq -r '.awsSecretAccessKey')
BUCKET_NAME=$(echo $PARAMETERS_JSON | jq -r '.bucketName')
ENV=$(echo $PARAMETERS_JSON | jq -r '.environment')

for var in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY BUCKET_NAME ENV; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

terraform init
terraform fmt
terraform validate

execute() {
  if [ "$1" = "apply" ]; then
  terraform $1 -auto-approve \
    -var "project=$PROJECT" \
    -var "aws_region=$AWS_REGION" \
    -var "aws_access_key_id=$AWS_ACCESS_KEY_ID" \
    -var "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" \
    -var "bucket_name=$BUCKET_NAME" \
    -var "environment=$ENV"
  else
  terraform $1 \
    -var "project=$PROJECT" \
    -var "aws_region=$AWS_REGION" \
    -var "aws_access_key_id=$AWS_ACCESS_KEY_ID" \
    -var "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" \
    -var "bucket_name=$BUCKET_NAME" \
    -var "environment=$ENV"
  fi
}

execute plan
execute apply

echo "Terraform apply completed!"
