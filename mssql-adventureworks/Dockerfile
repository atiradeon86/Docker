FROM  mcr.microsoft.com/mssql/server:2019-CU18-ubuntu-20.04
USER root
WORKDIR /
COPY . /
ARG SA_PASSWORD
ENV SA_PASSWORD=${SA_PASSWORD}
EXPOSE 1433
ENTRYPOINT  [ "bash","startup.sh" ]