#/bin/bash
echo "Get and Import DB"
if [ ! -f /sample-db/AdventureWorks2019.bak ]; then
mkdir /sample-db
cd /sample-db
wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak
cd /
fi
/opt/mssql/bin/sqlservr & /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -d master -i db_install.sql  
sleep 1d