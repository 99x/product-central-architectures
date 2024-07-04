---
parent: Decisions
nav_order: 0
status: accepted
date: 2024-07-01
consulted: 99x Tech Leads
informed: Adri, Rishard, Sachith
---

# Microfrontend (MFE) and pipeline setups

![mfe-pipeline-setups](https://raw.githubusercontent.com/99x/product-central-architectures/main/docs/decisions/nextjs-mfe/0000-mfe-pipeline-setups.png
)

### Development Kits

* **ESLint, Prettier, and Husky:** Enforce consistent code style and prevent common errors. This promotes maintainable and readable code across our microfrontends.
* **SonarQube/SonarCloud:** Provides automated code quality analysis, catching potential bugs, security issues, and maintainability problems early in the development cycle. Integration with pull requests ensures that code changes meet quality standards.
* **Testing Tools (Cypress, Playwright):** Robust end-to-end and integration testing is essential for complex architectures like MFEs. These  frameworks help ensure the functionality and interoperability of our remote and host applications.

### MFEs

* **Pipeline Similarities:** Emphasize similar CI/CD pipelines for host and remote MFEs, streamlining development and deployment processes. Differences in  `next.config`  handle specific behaviors for each.
* **Pages Directory:** Wise decision to use the `pages` directory for Next.js compatibility with the current state of Module Federation as `app` router is not [supported](https://github.com/module-federation/core/pull/2002).


### Plugins and Libraries

* **Module Federation for Next.js:**  The core enabler of our MFE architecture. Provides mechanisms to share components, code, and dependencies between Next.js applications.
  - Code Sharing: Module Federation allows developers to share code between multiple projects in a decentralized way, making it easier to manage complex applications.
  - Modularization: Applications can be split into smaller, self-contained modules that can be independently developed, tested, and deployed.
  - Flexibility: Module federation offers developers the freedom to choose and implement the architecture that best suits their needs.
  - Rspack: Supports Rspack and Webpack builds, accelerating your application builds.
  - Development Experience: Module federation supports dynamic type hints and chrome devtool to enhance the development experience.
  - Plugin System: Hooks allow you to quickly define your own plugins to control the behavior of module loading.

* **Nx: Smart Monorepos:**  Since we are ultilizing Monorepo strategy, [Nx](https://www.youtube.com/watch?v=-_4WMl-Fn0w) offers efficient monorepo management, tooling, and CI/CD capabilities. It's a good choice for structuring and scaling complex MFE setups:
  - speed up our existing project's builds and tests, locally and on CI (whether that's a monorepo or standalone application)
  - quickly scaffold a new project (using Nx plugins) without having to configure any lower-level build tools.
  - easily integrate new tooling (e.g., Storybook, Tailwind etc), into our project.
  - ensure consistency and code quality with custom generators and lint rules.
update our frameworks and tools and keep our workspace evergreen using the automated code migration feature.  


### Configuration Examples on (`next.config.js`) with MF and NX

* **Host:** Demonstrates Module Federation setup for loading `header`, and `button` remotes dynamically. Highlights sharing of common dependencies for efficiency. 

```js
const { withNx } = require("@nrwl/next/plugins/with-nx");
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const { dependencies } = require("../../package.json");

const HEADER_APP_URL =
  process.env.NEXT_PUBLIC_HEADER_APP_URL || "http://localhost:3002";

const BUTTON_APP_URL =
  process.env.NEXT_PUBLIC_BUTTON_APP_URL || "http://localhost:3003";

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";

  return {
    header: `header@${HEADER_APP_URL}/_next/static/${location}/remoteEntry.js`,
    button: `button@${BUTTON_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  images: {
    domains: ["dummyjson.com", "i.dummyjson.com"],
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(isServer),
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {},
        shared: {
          "@tanstack/react-query": {
            requiredVersion: false,
            singleton: true,
          },
          "@tanstack/query-core": {
            requiredVersion: false,
            singleton: true,
          },
          "styled-components": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["styled-components"],
          },
        },
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
```


* **Remote:**  Provides Module Federation configuration for the `button` remote. Emphasizes the `./Button` component exposure and shared dependencies.

```js
const { withNx } = require("@nrwl/next/plugins/with-nx");
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const { dependencies } = require("../../package.json");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "button",
        filename: "static/chunks/remoteEntry.js",
        remotes: {},
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {
          "./Button": "./components/Button/index.tsx",
        },
        shared: {
          "styled-components": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["styled-components"],
          },
        },
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
```

### DevOps Pipelines

* **Pipeline Flow:** Clearly define steps:
    1. **Code Quality:** Initial SonarQube analysis for quality and security checks.
    2. **Automation Testing:** Execution of end-to-end tests with stringent success criteria.
    3. **Build:**  Creation of deployment-ready artifacts for our host and remote MFEs.
    4. **Deployment:** Push  artifacts to an S3 bucket or other chosen deployment target.

* **Deployment Criteria:** Explicitly define passing criteria for tests, code quality, and potentially manual approvals to establish safeguards. 
* **Versioning:** Adopt [SemVer](https://semver.org/) for logical versioning of MFEs to communicate changes and facilitate updates and dependency management.
* **Dependency Updates:**  Proactive dependency maintenance. Emphasize thorough testing to catch breaking changes before they reach production.

**Concerns**
There are few concerns was raised before deciding to use `Nextjs` as our core/host FE framework: 

* **Vercel Vendor Lock-in Components:**
     * **Approach:** Can disregard the usage of their own components like `<Image>` and use `<img>` instead but modified it to be as close as what they [offering](https://nextjs.org/docs/app/building-your-application/optimizing/images).
     * **Trade-offs:**  Acknowledge that leveraging unique Vercel offerings might offer advantages, so weigh these against the risk of vendor lock-in before deciding.
* **Micro-Frontend Injections**
     * **Feasibility:** Next.js, with the `Module Federation` plugin and `NX`, is a proven and viable option for  MFE architectures.
     * **Success Factors:** Careful design, configuration, and communication patterns between components are essential for a well-functioning MFE ecosystem.
