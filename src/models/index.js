import mysql from "mysql";
import dotenv from 'dotenv'
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  multipleStatements: true
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB!!!")
});
export default connection;
