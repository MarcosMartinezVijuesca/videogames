start-dev-env:
	docker compose -f docker-compose.yaml up -d

stop-dev-env:
	docker compose -f docker-compose.yaml down

all-test: stop-dev-env start-dev-env
	sleep 6
	powershell -Command "cd backend; npm test" || true

.PHONY: all-test start-dev-env stop-dev-env