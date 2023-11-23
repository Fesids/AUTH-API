import mysql2 from 'mysql2'

export const dbConfig = {
  host: process.env.host || '<your_host>',
  database: process.env.database || '<your_db>',
  user: process.env.user || '<your_user>',
  password: process.env.password || '<your_pass>'
}

const DB = mysql2.createConnection(
  dbConfig
)

const DBPool = mysql2.createPool(
  dbConfig
).promise()

export const MysqlDB = DB
export const MysqlPool = DBPool
