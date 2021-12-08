DATABASE=./database

build:
	echo ">>> Building DATABASE in ${DATABASE} dir."
	make -C ${DATABASE} build

init:
	mkdir -p ./data/database

db-backup:
	mkdir -p backups && docker exec -t destore-database pg_dumpall -c -U destore > ./backups/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql

dev:
	COMPOSE_HTTP_TIMEOUT=200 docker-compose --file docker-compose.yml up

prod: network
	COMPOSE_HTTP_TIMEOUT=200 docker-compose up -d

down:
	docker-compose down --remove-orphans

network:
	docker network create destore-network 2> /dev/null || echo "network destore-network already exists"
