# Server Application

### Prerequisites

To ensure a smooth development experience, please verify you have the following software installed on your machine:

-   **Node.js (>= 18.0.0):** The JavaScript runtime environment used to execute the client-side application.
-   **Yarn (>= 3.0.0):** The package manager used for dependency management within the project.

## Getting Started

### Installation

To install the project dependencies, run the following command:

```bash
yarn install
```

### Running the App

Before running the app, export AWS access key and secret key to fetch the environments variables from AWS SSM parameter store:

```bash
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
```

You can run the application in different modes using the following commands:

-   **Local Mode:**

    ```bash
    yarn start:local
    ```

-   **Development Mode:**

    ```bash
    yarn start:dev
    ```

-   **Production Mode:**

    ```bash
    yarn start:prod
    ```

### Testing

You can run various tests using the following commands:

-   **Unit Tests Local:**

    ```bash
    yarn test:local
    ```

-   **End-to-End (e2e) Tests Local:**

    ```bash
    yarn test:e2e:local
    ```

-   **Test Coverage Local:**

    ```bash
    yarn test:cov:local
    ```

## `package.json` Scripts Breakdown

### Development and Build Scripts

-   **Development:**

    -   `start`: Runs the application in development mode.
    -   `start:dev`: Runs the application in watch mode, useful for development.
    -   `start:debug`: Starts the application with debugging enabled.
    -   `start:local`: Runs the application in a local environment.
    -   `start:staging`: Runs the application in a staging environment.
    -   `start:prod`: Runs the application in production mode.

-   **Build:**
    -   `prebuild`: Cleans the `dist` directory.
    -   `build`: Compiles the application using NestJS.

### Linting and Formatting

-   **Linting:**
    -   `lint`: Runs ESLint to identify and fix potential code issues.
    -   `prettier:check`: Checks code formatting using Prettier.
    -   `prettier:fix`: Fixes code formatting issues using Prettier.

### Testing

-   **Unit and Integration Tests:**
    -   `test:local`: Runs the unit tests in local environment.
    -   `test:watch:local`: Runs the unit tests in watch mode (in local environment).
    -   `test:cov:local`: Generates a test coverage report in local environment..
    -   `test:debug:local`: Runs tests with debugging enabled in local environment..
    -   `test:e2e:local`: Runs end-to-end tests in local environment..

### Git Hooks and Other Scripts

-   **Git Hooks:**
    -   `postinstall`: Ensures Husky Git hooks are installed.
    -   `prepare`: Sets up Husky for Git hooks management.

### Dependencies

The project relies on several dependencies, including but not limited to:

-   **Core:**

    -   `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`: NestJS core packages.
    -   `@nestjs/swagger`: Swagger integration for API documentation.
    -   `@nestjs/typeorm`: TypeORM integration for NestJS.
    -   `mongodb`, `typeorm`: Database interaction libraries.
    -   `nest-winston`, `winston`: Logging libraries.
    -   `rxjs`: Reactive programming library.

-   **Development:**
    -   `@nestjs/cli`: NestJS CLI for development.
    -   `@nestjs/schematics`, `@nestjs/testing`: NestJS development tools.
    -   `@types/express`, `@types/jest`, `@types/node`, `@types/supertest`: TypeScript type definitions.
    -   `eslint`, `eslint-config-prettier`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`: Linting tools.
    -   `husky`: Git hooks management.
    -   `jest`, `ts-jest`, `supertest`: Testing libraries.
    -   `prettier`: Code formatter.
    -   `source-map-support`, `ts-node`, `ts-loader`, `tsconfig-paths`: TypeScript tools.
    -   `typescript`: TypeScript language support.

### Jest Configuration

The Jest configuration is set up to work with TypeScript and includes settings for file extensions, test regex, transformations, coverage collection, and test environment.

### Lint-Staged Configuration

Lint-staged runs ESLint and Prettier on staged files before committing, ensuring code quality and consistency.

## Notes

-   The server-side codebase uses NestJS, a framework for building efficient and scalable server-side applications.
-   The application relies on TypeORM for database interactions and integrates with MongoDB.
-   Husky is used to manage Git hooks, ensuring consistent code quality and style before commits.
