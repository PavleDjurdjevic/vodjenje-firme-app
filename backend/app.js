require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const zaposleniRoutes = require('./routes/zaposleniRoutes');
const radnaMestaRoutes = require('./routes/radnaMestaRoutes');
const odeljenjaRoutes = require('./routes/odeljenjaRoutes');
const odsustvaRoutes = require('./routes/odsustvaRoutes');
const korisniciRoutes = require('./routes/korisniciRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://vodjenje-firme-app.onrender.com"
  ],
  credentials: true
}));
app.use(bodyParser.json());

// Rute
app.use('/api/zaposleni', zaposleniRoutes);
app.use('/api/radnaMesta', radnaMestaRoutes);
app.use('/api/odeljenja', odeljenjaRoutes);
app.use('/api/odsustva', odsustvaRoutes);
app.use('/api/korisnici', korisniciRoutes);

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
