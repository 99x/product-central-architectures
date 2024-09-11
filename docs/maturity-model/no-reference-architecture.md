---
title: No Reference Architecture
layout: default
parent: RA Maturity Model
nav_order: 3
---

# No Reference Architecture

At this level of maturity, the platform is architected enough to build and run applications, but no Reference Architecture exists. This level is significant since the ability to build and run applications is a prerequisite for creating Reference Architectures.

## Key Capabilities

- **Onboarding Teams and Applications**: A method for onboarding teams and applications with minimal additional processes (preferably one form to submit).
- **CI Pipeline Creation**: A tool for creating and running CI pipelines, empowering developers to write and run their own.
- **Application Deployment (CD)**: Ideally, a GitOps-based approach that allows developers to create their own manifests with the platform consuming and reconciling them.
- **Provisioning Credentials**: A way to provision credentials for integrations like version control systems, image registries, static code analysis tools, vulnerability scanning tools, databases, messaging, caches, and remote service invocations.

At this level, every development team must figure out how to write the pipeline and deployment manifests, leading to duplication of efforts and inconsistencies. However, this helps establish patterns for later use.