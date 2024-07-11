# Client Application

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

## AWS Resource Utilization

1. **Route 53**
   - Connects with **CloudFront** to route user requests to the appropriate resources with low latency.
   - Provides DNS services, ensuring users are directed to the closest CloudFront edge location.

2. **CloudFront**
   - Acts as a Content Delivery Network (CDN), caching and serving content closer to the user's location.
   - Distributes requests to **S3** as we build our MFEs as `static` application.

3. **S3 (Simple Storage Service)**
   - Stores static assets (e.g., images, CSS, JavaScript) that are served by CloudFront.
   - Also used for storing deployment artifacts.

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
