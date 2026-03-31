FROM postgres:15

ENV POSTGRES_DB=docker_db
ENV POSTGRES_USER=docker_user
ENV POSTGRES_PASSWORD=docker_password

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
