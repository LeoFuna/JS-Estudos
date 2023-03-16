docker run \
  --name postgress \
  -e POSTGRES_USER=leofuna \
  -e POSTGRES_PASSWORD="secret" \
  -e POSTGRES_DB=heroes \
  -p 3002:3002 \
  -d \
  postgres

docker logs postgres
docker exec -it postgress psql --username leofuna --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

## mongodb

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=leofuna \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 \
  -d \
  mongo:4
