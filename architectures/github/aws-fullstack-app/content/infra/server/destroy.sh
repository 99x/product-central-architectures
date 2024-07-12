#!/bin/bash

set -eo pipefail

PARAMETERS_JSON=$1

AWS_ACCESS_KEY_ID=$(echo $PARAMETERS_JSON | jq -r '.awsAccessKeyId')
AWS_SECRET_ACCESS_KEY=$(echo $PARAMETERS_JSON | jq -r '.awsSecretAccessKey')
CONTAINER_IMAGE=$(echo $PARAMETERS_JSON | jq -r '.containerImage')
ENV=$(echo $PARAMETERS_JSON | jq -r '.environment')

for var in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ENV CONTAINER_IMAGE; do 
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

terraform destroy -auto-approve \
  -var "aws_access_key_id=$AWS_ACCESS_KEY_ID" \
  -var "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" \
  -var "container_image=$CONTAINER_IMAGE" \
  -var "environment=$ENV"

echo "Terraform destroy completed!"
