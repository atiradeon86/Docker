USE [master]
RESTORE DATABASE [AdventureWorks2019] 
    FROM DISK = '/sample-db/AdventureWorks2019.bak'
        WITH MOVE 'AdventureWorks2019' TO '/var/opt/mssql/data/AdventureWorks2019.mdf',
        MOVE 'AdventureWorks2019_log' TO '/var/opt/mssql/data/AdventureWorks2019_log.ldf'
GO