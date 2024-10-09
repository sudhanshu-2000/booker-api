var mysql = require("mysql");
const con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "booker-website",
  multipleStatements: true,
  timezone: 'utc'
});
con.getConnection((err) => {
  if (err) throw err;
  console.log("Database(Booker-Website) Connected");
});
const queryAsync = (sql, params, connection) => {
  return new Promise((resolve, reject) => {
    const con3 = connection || con;
    con3.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const con2 = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "colorgame",
  multipleStatements: true,
  timezone: 'utc'
});
con2.getConnection((err) => {
  if (err) throw err;
  console.log("Database(Color-Prediction) Connected");
});
const queryAsync2 = (sql, params, connection2) => {
  return new Promise((resolve, reject) => {
    const conn = connection2 || con2;
    conn.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
module.exports = { con, queryAsync, con2, queryAsync2 };