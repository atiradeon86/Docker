#/bin/bash
echo "Get and Import DB"
mkdir /sample-db
cd /sample-db
wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak
cd /
/opt/mssql/bin/sqlservr & /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i db_install.sql  
sleep 1d