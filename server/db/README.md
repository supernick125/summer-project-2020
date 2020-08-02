## How to set up local database

1. Install postgreSQL from [its website](https://www.postgresql.org/download/)
2. Add its /bin directory to environment variable PATH
3. Run the following sets of commands to login and create database
4. Run the other files in this folder to create and test tables

## Useful psql commands

[postgres-cheatsheet](https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546)
\! - run normal terminal command
\q - quit psql
\l - list databases
\c - switch database
\du - list users
\dt - list tables
\d <table_name> - show table definition including triggers and constraints
\df - list functions
\dx - list extensions

## PSQL SETUP COMMANDS

psql -U postgres
<password you chose during install>
CREATE DATABASE alumni_connector;
\q
psql -U postgres -d alumni_connector -f <file path of db-schema.sql>
(DB schema is now created)

For all future logins:
psql -U postgres -d alumni_connector
<password>

## Some helpful sample links

[picter-app](https://github.com/AkshayAlenchery/picter-app)
[PERN-Advanced-Starter](https://github.com/tg970/PERN-Advanced-Starter)
[postgresDBSamples](https://github.com/morenoh149/postgresDBSamples)
