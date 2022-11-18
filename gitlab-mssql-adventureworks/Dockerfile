FROM  mcr.microsoft.com/mssql/server:2022-latest
USER root
WORKDIR /
COPY . /
ARG MSSQL_SA_PASSWORD
ENV MSSQL_SA_PASSWORD=${MSSQL_SA_PASSWORD}
EXPOSE 1433
RUN /opt/mssql/bin/mssql-conf set sqlagent.enabled true
ENTRYPOINT  [ "bash","startup.sh" ]