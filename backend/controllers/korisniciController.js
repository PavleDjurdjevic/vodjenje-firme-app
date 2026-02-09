const db = require('../db');

// GET - svi korisnici
exports.getAll = (req, res) => {
  db.query('SELECT * FROM korisnici_sistema', (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju korisnika:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// GET - jedan korisnik po ID-u
exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM korisnici_sistema WHERE korisnik_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Greška pri dohvatanju korisnika:', err);
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Korisnik nije pronađen.' });
    } else {
      res.json(result[0]);
    }
  });
};

// POST - dodavanje korisnika
exports.create = (req, res) => {
  const { korisnik_ime, korisnik_email, korisnik_lozinka, korisnik_uloga } = req.body;
  const sql = 'INSERT INTO korisnici_sistema (korisnik_ime, korisnik_email, korisnik_lozinka, korisnik_uloga) VALUES (?, ?, ?, ?)';
  db.query(sql, [korisnik_ime, korisnik_email, korisnik_lozinka, korisnik_uloga], (err, result) => {
    if (err) {
      console.error('Greška pri dodavanju korisnika:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Korisnik uspešno dodat!' });
    }
  });
};

// PUT - izmena korisnika
exports.update = (req, res) => {
  const id = req.params.id;
  const { korisnik_ime, korisnik_email, korisnik_lozinka, korisnik_uloga } = req.body;
  const sql = 'UPDATE korisnici_sistema SET korisnik_ime=?, korisnik_email=?, korisnik_lozinka=?, korisnik_uloga=? WHERE korisnik_id=?';
  db.query(sql, [korisnik_ime, korisnik_email, korisnik_lozinka, korisnik_uloga, id], (err, result) => {
    if (err) {
      console.error('Greška pri izmeni korisnika:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Korisnik uspešno izmenjen!' });
    }
  });
};

// DELETE - brisanje korisnika
exports.delete = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM korisnici_sistema WHERE korisnik_id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Greška pri brisanju korisnika:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Korisnik uspešno obrisan!' });
    }
  });
};

// POST - login korisnika
exports.login = (req, res) => {
    const { email, lozinka } = req.body;

    if (!email || !lozinka) {
        return res.status(400).json({ message: 'Email i lozinka su obavezni.' });
    }

    const sql = `
        SELECT korisnik_id, korisnik_ime, korisnik_email, korisnik_uloga
        FROM korisnici_sistema
        WHERE korisnik_email = ? AND korisnik_lozinka = ?
    `;

    db.query(sql, [email, lozinka], (err, result) => {
        if (err) {
            console.error('Greška pri loginu korisnika:', err);
            return res.status(500).send(err);
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Pogrešan email ili lozinka.' });
        }

        // uspešan login – vraćamo korisnika i ulogu
        const korisnik = result[0];
        res.json({
            message: 'Uspešna prijava!',
            korisnik: {
                id: korisnik.korisnik_id,
                ime: korisnik.korisnik_ime,
                email: korisnik.korisnik_email,
                uloga: korisnik.korisnik_uloga
            }
        });
    });
};

