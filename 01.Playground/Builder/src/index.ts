import MysqlBuilder from "./builder/MysqlBuilder";
import PostgresBuilder from "./builder/PostgresBuilder";


const mysqlBuilder = new MysqlBuilder();
const postgresBuilder = new PostgresBuilder();

mysqlBuilder.build()
postgresBuilder.build()