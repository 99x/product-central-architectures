---
title: Quick Start
layout: home
nav_order: 4
description: "Quick Start"
parent: Home
---

# Quick Start

This guide will walk you through the process of setting up and running the application. Product Central is designed to streamline your development workflow by integrating with GitHub and providing a powerful interface for managing your projects. Follow these steps to get up and running quickly.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Docker (v20.10.0 or later)
- Docker Compose (v2.10.0 or later)
- PostgreSQL (v14.0 or later)
- Node.js (v18.12.0 or later)
- npm (v6.14.13 or later)

### Running the Application

**1. Run the container**

```yaml
docker run -it -p 7007:7007 \
  -e APP_URL=<app_url> \
  -e POSTGRES_HOST=<pg_host> \
  -e POSTGRES_PORT=<pg_port> \ 
  -e POSTGRES_USER=<pg_user> \
  -e POSTGRES_PASSWORD=<pg_secret> \
  -e GITHUB_TOKEN=<github_PAT> \
  -e AUTH_GITHUB_CLIENT_ID=<github_client_id> \
  -e AUTH_GITHUB_CLIENT_SECRET=<github_client_secret> \
  99xproductcentral/product-central:<version>
```

<br/>

**2. Environment Variables Explained**

* `APP_URL`: The URL of your application. For instance, `http://localhost:7007`. 
* `POSTGRES_HOST`: The hostname of the PostgreSQL database.
* `POSTGRES_PORT`: The port of the PostgreSQL database (default: 5432).
* `POSTGRES_USER`: The username for the PostgreSQL database.
* `POSTGRES_PASSWORD`: The password for the PostgreSQL database.
* `GITHUB_TOKEN`: A GitHub Personal Access Token.
* `AUTH_GITHUB_CLIENT_ID`: The GitHub client ID for authentication.
* `AUTH_GITHUB_CLIENT_SECRET`: The GitHub client secret for authentication.

<br/>

### Authentication and Integration

**1. Integration With Github:**

* **Personal Access Token (PAT):**
    * Go to your GitHub settings ([https://github.com/settings/tokens](https://github.com/settings/tokens)).
    * Click on "Generate new token" and select "Generate new token (classic)".
    * Give your token a descriptive name and select these scopes:
        * `repo`
        * `read:org`
        * `user`
    * Click "Generate token".

**2. Authentication:**

* **GitHub Client ID and Client Secret:**
    * Go to your Github OAuth Apps settings ([https://github.com/settings/developers](https://github.com/settings/developers)). 
    * Click on "New OAuth App".
    * During creation, specify the necessary permissions and callback URLs.
        * Application name: The name of your application.
        * Homepage URL: The URL of your application. For instance, `http://localhost:3000`.
        * Application description: A brief description of your application.
        * Authorization callback URL: The URL to redirect to after the user authorizes the app. For instance, `http://localhost:3000/api/auth/callback/github`.
    * Once created, find the client ID and `generate new` client secret from the app settings.
