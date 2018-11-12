ifndef version
	version=latest
endif

DOCKER_IMAGE = hulk89/rl_demo:$(version)

all:
	@echo DOCKER_IMAGE = $(DOCKER_IMAGE))

build:
	docker build --rm -t $(DOCKER_IMAGE) .
push:
	docker push $(DOCKER_IMAGE)
