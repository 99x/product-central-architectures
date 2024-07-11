# AWS Fullstack Application

## Overview

This documentation provides a comprehensive overview of the AWS fullstack application, detailing both the client and server architecture, as well as the CI/CD pipeline and infrastructure management using Terraform. The application leverages various AWS services to ensure scalability, reliability, and security.

## Architecture Diagram
![architecture-diagram](https://raw.githubusercontent.com/99x/product-central-architectures/main/architectures/docs/decisions/aws-fullstack-app/0000-architecture-diagram.png
)

## AWS Resource Utilization

1. **VPC (Virtual Private Cloud)**
   - Provides a logically isolated network environment where the backend resources are deployed.
   - Contains multiple subnets across different Availability Zones for high availability.

2. **ECS (Elastic Container Service)**
   - Manages the deployment and orchestration of Docker containers on **EC2** instances.
   - Utilizes the container image from ECR (public.ecr.aws/aws-containers/hello-app-runner:latest).

3. **ECR (Elastic Container Registry)**
   - Stores Docker container images that are deployed to ECS.
   - Images are updated in the CD pipeline upon updating ECS tasks.

4. **EC2 Instances with AutoScaling**
   - Hosts the Docker containers managed by ECS.
   - AutoScaling ensures that the number of EC2 instances adjusts based on the application's demand, optimizing cost and performance.

5. **ElastiCache**
   - Provides in-memory data caching (e.g., Redis or Memcached) to improve application performance by reducing the load on the databases.

6. **IAM and Security Groups**
    - IAM roles and policies manage access to AWS services and resources.
    - Security Groups act as firewalls, controlling inbound and outbound traffic to the EC2 instances and other resources.

7. **CloudFront**
      - Acts as a Content Delivery Network (CDN), caching and serving content closer to the user's location.
      - Distributes requests to S3 or ALB based on the type of content (static or dynamic).

8. **S3 (Simple Storage Service)**
      - Stores static assets (e.g., images, CSS, JavaScript) that are served by CloudFront.
      - Also used for storing deployment artifacts.

9. **ALB (Application Load Balancer)**
      - Distributes incoming application traffic across multiple EC2 instances running containerized applications.
      - Ensures high availability and fault tolerance by distributing traffic across multiple Availability Zones (AZ1 and AZ2).

9. **Route 53**
    - Also connects with **CloudFront** to provide DNS services, directing traffic to CloudFront for content delivery.

### Connecting the Dots

1. **User Interaction**:
   - Users interact with the system through their browser, which sends requests to the CloudFront CDN via Route 53.
   - CloudFront serves static content from S3 and forwards dynamic content requests to the ALB.

2. **Request Handling**:
   - ALB distributes incoming requests to the appropriate EC2 instances running Docker containers managed by ECS.
   - ECS uses the Docker images stored in ECR to ensure the application is up-to-date.

3. **Data Management**:
   - Application instances interact with ElastiCache for fast data retrieval and with the MongoDB cluster for persistent storage.

4. **Monitoring and Scaling**:
   - DataDog monitors the entire infrastructure, providing insights for performance optimization.
   - AutoScaling adjusts the number of EC2 instances based on demand, ensuring efficient resource utilization.

5. **CI/CD Pipeline**:
   - Developers commit code changes to GitHub, triggering GitHub Actions to run the CI/CD workflows.
   - Terraform manages the infrastructure as code, ensuring consistent and repeatable deployments.

### Container Image
The system uses a sample container image from the ECR public gallery: `public.ecr.aws/aws-containers/hello-app-runner:latest`. This container image will be replaced during the Continuous Deployment (CD) pipeline when updating the ECS task.

## CI/CD Pipeline with GitHub Actions

The CI/CD pipeline automates the testing, building, and deployment processes, ensuring a smooth and efficient workflow.

### Workflows

#### 1. CI (Continuous Integration)
- Runs tests and builds the application upon creating a pull request targeting the specified branches.

#### 2. CD (Continuous Delivery)
- Deploys the application to designated environments upon merging a pull request to the specified branches.

### Required GitHub Secrets

- **AWS Credentials:**
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`

- **Additional Secrets:**
  - `ECR_REPOSITORY_URI_<STAGE>`
  - `ECS_CLUSTER_NAME_<STAGE>`
  - `ECS_SERVICE_NAME_<STAGE>`
  - `ECS_FAMILY_NAME_<STAGE>`

    where `<STAGE>` is either dev, demo or prod, and you can get these values once `init-infra.yaml` workflows - `Provisioning Server Infrastructure` step is done