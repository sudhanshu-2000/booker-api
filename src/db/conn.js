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
    const con1 = connection || con;
    con1.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const con3 = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "booker-games",
  multipleStatements: true
});
con3.getConnection((err) => {
  if (err) throw err;
  console.log("Database(booker-games) Connected");
});
const queryAsync3 = (sql, params, connection3) => {
  return new Promise((resolve, reject) => {
    const conn = connection3 || con3;
    conn.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
module.exports = { con, queryAsync, con3, queryAsync3 };


// var mysql = require("mysql");
// const con = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   port: 3306,
//   user: "kmaobharat_booker",
//   password: "a~9HYo[p4Q^m",
//   database: "kmaobharat_booker",
//   multipleStatements: true,
//   timezone: 'utc'
// });
// con.getConnection((err) => {
//   if (err) throw err;
//   console.log("Database(Booker-Website) Connected");
// });
// const queryAsync = (sql, params, connection) => {
//   return new Promise((resolve, reject) => {
//     const con1 = connection || con;
//     con1.query(sql, params, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// const con3 = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   port: 3306,
//   user: "kmaobharat_booker_games",
//   password: "Z]RP~fu)^nRA",
//   database: "kmaobharat_booker_games",
//   multipleStatements: true
// });
// con3.getConnection((err) => {
//   if (err) throw err;
//   console.log("Database(booker-games) Connected");
// });
// const queryAsync3 = (sql, params, connection3) => {
//   return new Promise((resolve, reject) => {
//     const conn = connection3 || con3;
//     conn.query(sql, params, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };
// module.exports = { con, queryAsync, con3, queryAsync3 };