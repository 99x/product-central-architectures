---
title: Creating Content
layout: default
parent: Contributing
nav_order: 3
---

# Creating Content

1. **Code Placement**: Place all code files within the `content` folder.
2. **Catalog Information**: Declare the Product Central (PC) component within the `catalog-info.yaml` file. Follow the template format provided below.
3. **Template Definition**: Define the scaffolder template in the `template.yaml` file using the example provided below.
4. **Updating Showcase Templates**: Update the RA's path in the `showcase-templates.yaml`.

### Example `template.yaml`
```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: aws-fullstack-app
  title: AWS Fullstack App
  description: Fullstack App deployed in AWS
  annotations:
    backstage.io/adr-location: https://github.com/99x/product-central-architectures/tree/main/architectures/docs/decisions/aws-fullstack-app
    backstage.io/techdocs-ref: url:https://github.com/99x/product-central-architectures/tree/main/architectures/docs/techdocs/aws-fullstack-app
  tags:
    - aws
    - full-stack
    - nextjs
    - nestjs
    - micro-frontend
    - nx
    - module-federation
    - server
    - infrastructure
    - reference-architecture
  links:
    - url: https://github.com/99x/product-central-architectures
      title: 99x Product Central Architectures
      icon: dashboard

spec:
  owner: user:99xadmin
  type: service

  parameters:
    - title: Provide information about the component
      required:
        - name
        - repoUrl
        - description
      properties:
        name:
          title: Name
          type: string
          description: Unique name of the component
          ui:autofocus: true
          maxLength: 50
          pattern: "^[a-zA-Z0-9-]*$"
          ui:help: "Hint: Name should only contain alphanumeric characters and hyphens"
          ui:options:
            rows: 5
        repoUrl:
          title: Repository Location
          type: string
          ui:field: RepoUrlPicker
          ui:options:
            allowedHosts:
              - github.com
        description:
          title: Description
          type: string
          description: A brief description of the component and its purpose
          ui:options:
            rows: 5

    - title: Provide information about applications
      required:
        - coreAppName
        - remoteAppName
        - serverAppName
      properties:
        coreAppName:
          title: What would you like to name the client core application?
          type: string
          description: The name of the client core application
          maxLength: 50
          pattern: "^[a-zA-Z0-9-]*$"
          ui:help: "Hint: Name should only contain alphanumeric characters and hyphens"
          default: core
        remoteAppName:
          title: What would you like to name the first client remote application? (You can always add more remote applications later)
          type: string
          description: The name of the genesis client remote application
          maxLength: 50
          pattern: "^[a-zA-Z0-9-]*$"
          ui:help: "Hint: Name should only contain alphanumeric characters and hyphens"
          default: remote
        serverAppName:
          title: What would you like to name the server application?
          type: string
          description: The name of the server application
          maxLength: 50
          pattern: "^[a-zA-Z0-9-]*$"
          ui:help: "Hint: Name should only contain alphanumeric characters and hyphens"
          default: server

    - title: Provide information about the deployment environment and credentials
      required:
        - project
        - environment
        - awsRegion
        - awsAccessKeyId
        - awsSecretAccessKey
        - bucketName
      properties:
        project:
          title: Project
          type: string
          description: Specify the project name for AWS resources
          maxLength: 50
          pattern: "^[a-zA-Z0-9-]*$"
          ui:help: "Hint: Name should only contain alphanumeric characters and hyphens"
        environment:
          title: Environment
          type: string
          description: Choose the environment to deploy to
          enum:
            - dev
            - demo
            - prod
          default: dev
        awsAccessKeyId:
          title: AWS Access Key ID
          type: string
          description: The AWS access key ID to access the AWS resources
          ui:field: Secret
        awsSecretAccessKey:
          title: AWS Secret Access Key
          type: string
          description: The AWS secret access key to access the AWS resources
          ui:field: Secret
        awsRegion:
          title: Default Region
          type: string
          description: The default region to deploy the application
          enum:
            - us-east-1
            - us-west-1
            - us-west-2
            - eu-west-1
            - eu-west-2
            - ap-southeast-1
            - ap-southeast-2
            - ap-northeast-1
            - ap-northeast-2
          default: ap-southeast-1
        bucketName:
          title: S3 Bucket Name
          type: string
          description: The name of the S3 bucket to store the Terraform state file
          default: client-bucket

  steps:
    - id: fetch-base
      name: Fetch Base
      action: fetch:template
      input:
        url: ./content
        copyWithoutTemplating:
          - "**/.github/**"
          - "./**/.github/**"
        values:
          name: ${{ parameters.name }}
          slug: ${{ parameters.repoUrl | projectSlug }}
          description: ${{ parameters.description }}
          coreAppName: ${{ parameters.coreAppName }}
          remoteAppName: ${{ parameters.remoteAppName }}
          serverAppName: ${{ parameters.serverAppName }}

    - id: publish
      name: Publish
      action: publish:github
      input:
        allowedHosts: ["github.com"]
        description: ${{ parameters.description }}
        repoUrl: ${{ parameters.repoUrl }}
        repoVisibility: private
        defaultBranch: main
        gitAuthorName: 99xproductcentral
        gitAuthorEmail: productcentral@99x.io
        secrets:
          AWS_ACCESS_KEY_ID: ${{ parameters.awsAccessKeyId }}
          AWS_SECRET_ACCESS_KEY: ${{ parameters.awsSecretAccessKey }}
          AWS_REGION: ${{ parameters.awsRegion }}

    - id: github-action
      name: Provision Infrastructure
      action: github:actions:dispatch
      input:
        workflowId: "init-infra.yaml"
        repoUrl: ${{ parameters.repoUrl }}
        branchOrTagName: "main"
        workflowInputs:
          parameters: ${{ parameters | dump }}

    - id: register
      name: Register
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps['publish'].output.repoContentsUrl }}
        catalogInfoPath: "/catalog-info.yaml"

  output:
    links:
      - title: Repository
        url: ${{ steps['publish'].output.remoteUrl }}
      - title: Open in catalog
        icon: catalog
        entityRef: ${{ steps['register'].output.entityRef }}
      - title: CloudFront Distribution ID
        url: ${{ steps['github-action'].output.cloudfront_distribution_id }}
```

### Example `catalog-info.yaml`

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: ${{ values.name | dump }}
  annotations:
    github.com/project-slug: ${{ values.slug }}
    backstage.io/adr-location: https://github.com/99x/product-central-architectures/tree/main/architectures/docs/decisions/99x-design-system
    backstage.io/techdocs-ref: url:https://github.com/99x/product-central-architectures/tree/main/architectures/docs/techdocs/99x-design-system
  description: ${{ values.name }} is a design system that is used to build user interfaces for 99x products.
  tags:
    - storybook
    - design-system
    - reference-architecture
  links:
    - url: https://github.com/99x/product-central-architectures
      title: 99x Product Central Architectures
      icon: dashboard
spec:
  type: service
  owner: user:99xadmin
  lifecycle: production
  system: productcentral
```

### Annotations

Ensure to use the following annotations in your `template.yaml` and `catalog-info.yaml`:
- `backstage.io/techdocs-ref: url:https://github.com/99x/product-central-architectures/tree/main/architectures/docs/techdocs/<app_name>`
- `backstage.io/adr-location: https://github.com/99x/product-central-architectures/tree/main/architectures/docs/decisions/<app_name>`

Refer to the formats of the documentation from the following examples:
- TechDocs: [aws-fullstack-app](https://github.com/99x/product-central-architectures/tree/main/architectures/docs/techdocs/aws-fullstack-app)
- ADR: [aws-fullstack-app](https://github.com/99x/product-central-architectures/tree/main/architectures/docs/decisions/aws-fullstack-app)

