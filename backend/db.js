const mysql = require("mysql2");

const url = process.env.MYSQL_PUBLIC_URL; // <-- PUBLIC, ne MYSQL_URL

const connection = mysql.createConnection(url);

connection.connect((err) => {
  if (err) {
    console.error("Greška pri povezivanju sa bazom:", err);
  } else {
    console.log("Uspešno povezano sa Railway bazom!");
  }
});

module.exports = connection;

