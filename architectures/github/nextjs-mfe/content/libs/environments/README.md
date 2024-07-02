## Environments

This directory contains logic for loading environment configuration based on the environment variable `APP_ENV`.

**Functionality:**

- Loads the appropriate environment configuration file (`dev`, `demo`, `prod`, or `local`) based on the value of `APP_ENV`.
- Expects environment configuration files to be in the `./envTypes` directory. Each file should be a JavaScript module exporting the desired configuration.

