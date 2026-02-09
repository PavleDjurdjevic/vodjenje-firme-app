const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'vodjenje_firme'
});

connection.connect((err) => {
  if (err) {
    console.error('Greška pri povezivanju sa bazom:', err);
  } else {
    console.log('Uspesna konekcija sa bazom vodjenje_firme');
  }
});

module.exports = connection;
