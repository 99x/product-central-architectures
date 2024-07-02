#!/bin/bash

# usage: ./generate.sh <framework> <type> <name>
FRAMEWORK=$1
TYPE=$2
NAME=$3

# Define valid frameworks and types
VALID_FRAMEWORKS=("angular" "react" "next" "vue" "js" "express" "node")
VALID_TYPES=("app" "library")

# Check if the necessary variables are set
for var in FRAMEWORK TYPE NAME; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

# Function to check if a value is in an array
function contains() {
  local value=$1
  shift
  for item; do [[ $item == $value ]] && return 0; done
  return 1
}

# Check if the framework is valid
if ! contains "$FRAMEWORK" "${VALID_FRAMEWORKS[@]}"; then
  echo "Error: $FRAMEWORK is not a valid framework"
  exit 1
fi

# Check if the type is valid
if ! contains "$TYPE" "${VALID_TYPES[@]}"; then
  echo "Error: $TYPE is not a valid type"
  exit 1
fi

# Generate folder name based on valid type
if [ "$TYPE" == "library" ]; then
  FOLDER_NAME="libs"
else
  FOLDER_NAME="apps"
fi

echo "Generating $FRAMEWORK $TYPE $NAME in $FOLDER_NAME"

nx generate @nx/$FRAMEWORK:$TYPE $FOLDER_NAME/$NAME
