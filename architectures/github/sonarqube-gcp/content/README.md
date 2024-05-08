## Deploy SonarQube to GCP Cloud

### Modules

1. VPC network
2. Cloud Run
3. Cloud SQL - Postgres15
4. IAM


### Running Terraform Script Locally

**Prerequisites**

1. Install terraform: Terraform is used to automate the creation and management of infrastructure. You can download it from the official website and follow the instructions for your operating system.
2. Install jq: jq is a lightweight and flexible command-line JSON processor. It's used in this project to parse JSON data. You can download it from the official website and follow the instructions for your operating system.

**Steps**

1. Create `env.json` file: Create a new file named env.json in the root of the project. This file should contain all the environment variables needed for the script. You can use the `env-example.json` file as a template and rename it to `env.json`. Make sure to replace the placeholder values with your actual data.

2. Run the script: You can now run the apply.sh [script](./apply.sh) to create the infrastructure:

```sh
./apply.sh "$(cat env.json)"
```

This command reads the contents of the env.json file and passes it as an argument to the apply.sh script. The script then parses the JSON data and uses it to set the environment variables.

3. Destroy the infrastructure: Once you're done testing, you can destroy the infrastructure to avoid unnecessary charges:
This command works the same way as the apply.sh [script](./destroy.sh), but it destroys the infrastructure instead of creating it.

```sh
./destroy.sh "$(cat env.json)"
```

### Persisting Terraform State on CICD pipeline

1. uses terraform cloud + configure terraform cloud
2. edit `Set up Terraform` job on both `deploy` and `destroy` github workflow deploy script

```yaml
      - name: Set up Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.1.7"
          cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
```