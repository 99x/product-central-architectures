APP_NAME = ${{values.serverAppName}}

docker.network.create:
	docker network inspect dev-network >/dev/null 2>&1 || \
    docker network create -d bridge dev-network

docker.start.mongo: docker.network.create
	docker run --rm -d \
	--name mongo \
	-p 27017:27017 \
	--network dev-network \
	-v $(PWD)/.data:/data/db \
	mongo

docker.build.dev:
	docker build -t $(APP_NAME) -f .dockerfiles/Dockerfile.development .

docker.build.staging:
	docker build -t $(APP_NAME) -f .dockerfiles/Dockerfile.staging .

docker.build.prod:
	docker build -t $(APP_NAME) -f .dockerfiles/Dockerfile.production .

docker.server.dev: docker.build.dev
	CONTAINER_NAME=$(APP_NAME)-dev ENV_FILE=.env.development docker-compose -f docker-compose.yml up -d

docker.stop.server.dev:
	CONTAINER_NAME=$(APP_NAME)-dev ENV_FILE=.env.development docker-compose -f docker-compose.yml down

docker.logs.dev:
	docker logs -f $(APP_NAME)-dev

docker.server.staging: docker.build.staging
	CONTAINER_NAME=$(APP_NAME)-staging ENV_FILE=.env.staging docker-compose -f docker-compose.yml up -d

docker.stop.server.staging:
	CONTAINER_NAME=$(APP_NAME)-staging ENV_FILE=.env.staging docker-compose -f docker-compose.yml down

docker.logs.staging:
	docker logs -f $(APP_NAME)-staging

docker.server.prod: docker.build.prod
	CONTAINER_NAME=$(APP_NAME)-prod ENV_FILE=.env.production docker-compose -f docker-compose.yml up -d

docker.stop.server.prod:
	CONTAINER_NAME=$(APP_NAME)-prod ENV_FILE=.env.production docker-compose -f docker-compose.yml down

docker.logs.prod:
	docker logs -f $(APP_NAME)-prod

docker.stop.mongo:
	docker stop mongo