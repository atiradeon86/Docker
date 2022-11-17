#/bin/bash
echo "Get and Import DB"
if [ ! -f /sample-db/AdventureWorks2019.bak ]; then
mkdir /sample-db
cd /sample-db
wget https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak
cd /
fi
echo ***Starting Server***
/opt/mssql/bin/sqlservr & sleep 30s
echo ***Importing AdventureWorks2019***  
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -d master -i db_install.sql
echo ***Importing AdventureWorks2019 Finished ... :\)***
sleep infinity