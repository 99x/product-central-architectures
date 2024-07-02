# Next.js Micro-Frontend Application with NX and Module Federation

### Prerequisites

To ensure a smooth development experience, please verify you have the following software installed on your machine:

-   **Node.js (>= 18.0.0):** The JavaScript runtime environment used to execute the client-side application.
-   **Yarn (>= 3.0.0):** The package manager used for dependency management within the project.

### Getting Started

Before running the app locally,, set app environment to `local`, private local webpack to `true` and export AWS access key and secret key to fetch the environments variables from AWS SSM parameter store:

```bash
export APP_ENV=local
export NEXT_PRIVATE_LOCAL_WEBPACK=true
```

1. **Initial Setup:**

    - **Install Dependencies:** Execute the following command to install all the project dependencies listed in the `package.json` file:

        ```bash
        yarn install
        ```
    - **Install Pre Hook Commit:** Execute the following command to install husky:

        ```bash
        yarn prepare
        ```
2. **Start Development Server:**

    - **Start Development Server for All Projects:**

        ```bash
        yarn dev
        ```

        This command utilizes NX to initiate development servers for all client-side applications within the monorepo, allowing you to work on them simultaneously.

    - **(optional) Start Development Server for Specific Project:**

        If you want to focus on a particular client-side project, you can use dedicated development server commands. For example, to start the development server for the
        `${{values.remoteAppName}}` project:

        ```bash
        yarn dev:${{values.remoteAppName}}
        ```

        Replace `${{values.remoteAppName}}` with the name of the specific project you want to develop.

Here's the completed outline of the `package.json` scripts section with an enhanced explanation of the Graphing Scripts:

### Outline of `package.json` Scripts

-   **Development Server Commands:**

    -   `dev`: Starts the development server for the entire client application, leveraging NX to run development servers for all client-side projects simultaneously.
    -   `dev:${{values.coreAppName}}`: Runs the development server specifically for the `${{values.coreAppName}}` client-side project.
    -   `dev:${{values.remoteAppName}}`: Runs the development server specifically for the `${{values.remoteAppName}}` client-side project (optional).

-   **Build Scripts:**

    -   `build:${{values.coreAppName}}`: Creates an optimized production build of the `${{values.coreAppName}}` client-side project.
    -   `build:${{values.remoteAppName}}`: Creates an optimized production build of the `${{values.remoteAppName}}` client-side project (if applicable).
    -   `build:all`: Generates optimized production builds for all client-side projects within the monorepo using NX.

-   **Graphing Scripts:**

    -   `graph:overview` (`nx graph`): Generates a general overview of the dependency graph for all projects in the monorepo.
    -   `graph:out` (`nx graph --file=output.json`): Creates a JSON file named `output.json` (customizable) containing a detailed representation of the dependency graph, useful for
        further analysis or integration with other tools.
    -   `graph:<project>` (`nx build <project> --graph`): Targets a specific project (replace `<project>` with the project name, e.g., `graph:${{values.coreAppName}}`). This builds the project and
        displays its dependency graph, highlighting how other projects depend on it.
    -   `graph:build:all` (`nx run-many --target=build --graph`): Executes optimized builds for all client-side projects while simultaneously generating the dependency graph.
    -   `graph:build:affected` (`nx affected --target=build --graph`): Identifies projects impacted by code changes using `nx affected`. It then builds only those affected projects
        and generates a dependency graph reflecting their relationships.

-   **Linting Scripts:**

    -   `lint:${{values.coreAppName}}`, `lint:${{values.remoteAppName}}`, and `lint:all` run ESLint to identify and fix potential code style and quality issues within the respective client-side projects or all
        projects at once.

-   **Testing Scripts:**

    -   Scripts like `test:${{values.coreAppName}}` and `test:all` leverage Jest to execute unit and integration tests for the client-side application. Similar to build scripts, they can target
        specific projects or run tests across all projects.

-   **End-to-End (e2e) Testing Scripts:**

    -   Scripts like `e2e:${{values.coreAppName}}` and `e2e:all` execute end-to-end tests for the client-side application with playwright.

-   **Other Scripts:**
    -   `affected:<target>`: This dynamic script utilizes NX to identify projects impacted by code changes and executes relevant commands (build, test, lint) only for those
        affected projects. This optimizes development workflows.
    -   `generate`: Executes a custom script located at `./tools/scripts/generate.sh` for potential code generation tasks.
    -   `clear:nx:cache` and `repair:nx`: These scripts manage the NX cache and can be used to reset or repair the cache if necessary.
    -   `postinstall` and `prepare`: These scripts handle post-installation tasks and Husky setup for managing Git hooks.
    -   `prettier:<check|fix>`: Scripts to check or automatically fix code formatting based on Prettier configuration.

### Code Generation Script: Streamlining Project Setup

This section explains the functionality and usage of the `generate.sh` script located within the client folder. This script serves as a convenient tool for generating new project
structures within the NX monorepo.

### Functionality

The `generate.sh` script automates the creation of new projects based on your specifications. It supports various frameworks and project types, allowing you to quickly set up new
functionalities within the codebase.

Here's what the script does:

1. **Accepts Arguments:** The script takes three arguments:
    - `FRAMEWORK`: Specifies the framework you want to use (e.g., Angular, React, Next.js, etc.)
    - `TYPE`: Defines the type of project to generate (e.g., `apps` for client applications or `library` for reusable components).
    - `NAME`: Provides the desired name for your new project.
2. **Validates Input:** The script verifies that the provided framework and type are valid options based on predefined lists.
3. **Generates Project Structure:** Once the input is validated, the script utilizes the NX CLI to generate the project structure using the specified framework and type. It
   constructs the appropriate folder name (`libs` for libraries and `apps` for applications) and executes the NX generation command.

### Usage

To use the `generate.sh` script, follow these steps:

1. **Open a Terminal:** Navigate to the root of your client folder using your terminal application.
2. **Execute the Script:** Run the following command, replacing the placeholders with your desired values:

```bash
./generate.sh <framework> <type> <name>
```

**Example:**

```bash
./generate.sh react app my-new-app
```

This command will generate a new React application named `my-new-app` within the `apps` folder using the NX CLI.

## CICD pipeline with Github Actions

The CICD pipeline consists of two workflows:

1. CI (Continuous Integration): Runs tests and builds the application upon creating a pull request targeting the specified branches.
2. CD (Continuous Delivery): Deploys the application to designated environments upon merging a pull request to the specified branches.

Here are the secrets you need to add to your GitHub repository settings for the provided CI/CD pipeline:

* **AWS Credentials:**
    * `AWS_ACCESS_KEY_ID`
    * `AWS_SECRET_ACCESS_KEY`
    * `AWS_REGION`
* **S3 Bucket Names (environment specific):**
    * `AWS_S3_BUCKET_DEVELOPMENT`
    * `AWS_S3_BUCKET_DEMO`
    * `AWS_S3_BUCKET_PRODUCTION`
* **CloudFront Distribution IDs (environment specific):**
    * `AWS_CLOUDFRONT_DISTRIBUTION_ID_DEVELOPMENT`
    * `AWS_CLOUDFRONT_DISTRIBUTION_ID_DEMO`
    * `AWS_CLOUDFRONT_DISTRIBUTION_ID_PRODUCTION`

## (Infra) Running Terraform Script Locally

**Prerequisites**

1. Install Terraform: Terraform is used to automate the creation and management of infrastructure. You can download it from the official website and follow the instructions for your operating system.
2. Install jq: jq is a lightweight and flexible command-line JSON processor. It's used in this project to parse JSON data. You can download it from the official website and follow the instructions for your operating system.

**Steps**

1. Create env.json file: Create a new file named env.json in the root of the project. This file should contain all the environment variables needed for the script. You can use the `env-example.json` file as a template. Make sure to replace the placeholder values with your actual data.

2. Run the script: You can now run the apply.sh script to create the infrastructure:

```sh
./apply.sh "$(cat env.json)"
```

This command reads the contents of the env.json file and passes it as an argument to the apply.sh script. The script then parses the JSON data and uses it to set the environment variables.

3. Destroy the infrastructure: Once you're done testing, you can destroy the infrastructure to avoid unnecessary charges:
This command works the same way as the apply.sh script, but it destroys the infrastructure instead of creating it.

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
          terraform_version: "~> 1.5.7"
          cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
```

### Additional Notes

-   The client-side codebase leverages NX ([https://nx.dev](https://nx.dev)) as a tool for managing the monorepo structure. This allows for efficient development, testing, and
    deployment of independent client-side features with the power of `nx affected`.
-   Webpack Module Federation ([https://www.npmjs.com/package/@module-federation/nextjs-mf](https://www.npmjs.com/package/@module-federation/nextjs-mf)) is integrated within the
    client-side application to enable dynamic loading of code from separate features at runtime, promoting a micro-frontends architecture.
