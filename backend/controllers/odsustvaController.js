const db = require('../db');

// GET - sva odsustva
exports.getAll = (req, res) => {
  db.query('SELECT * FROM odsustva', (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju odsustava:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// GET - jedno odsustvo po ID-u
exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM odsustva WHERE odsustvo_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Greška pri dohvatanju odsustva:', err);
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Odsustvo nije pronađeno.' });
    } else {
      res.json(result[0]);
    }
  });
};

// POST - dodavanje odsustva
exports.create = (req, res) => {
  const { zap_id, odsustvo_datum_pocetka, odsustvo_datum_kraja, odsustvo_tip } = req.body;
  const sql = 'INSERT INTO odsustva (zap_id, odsustvo_datum_pocetka, odsustvo_datum_kraja, odsustvo_tip) VALUES (?, ?, ?, ?)';
  db.query(sql, [zap_id, odsustvo_datum_pocetka, odsustvo_datum_kraja, odsustvo_tip], (err, result) => {
    if (err) {
      console.error('Greška pri dodavanju odsustva:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Odsustvo uspešno dodato!' });
    }
  });
};

// PUT - izmena odsustva
exports.update = (req, res) => {
  const id = req.params.id;
  const { zap_id, odsustvo_datum_pocetka, odsustvo_datum_kraja, odsustvo_tip } = req.body;
  const sql = 'UPDATE odsustva SET zap_id=?, odsustvo_datum_pocetka=?, odsustvo_datum_kraja=?, odsustvo_tip=? WHERE odsustvo_id=?';
  db.query(sql, [zap_id, odsustvo_datum_pocetka, odsustvo_datum_kraja, odsustvo_tip, id], (err, result) => {
    if (err) {
      console.error('Greška pri izmeni odsustva:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Odsustvo uspešno izmenjeno!' });
    }
  });
};

// DELETE - brisanje odsustva
exports.delete = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM odsustva WHERE odsustvo_id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Greška pri brisanju odsustva:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Odsustvo uspešno obrisano!' });
    }
  });
};

// GET - odsustva za korisnika na osnovu email-a (preko query parametra ?email=)
exports.getByEmail = (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: 'Email je obavezan parametar.' });
  }

  const sql = `
    SELECT o.*
    FROM odsustva o
    JOIN zaposleni z ON o.zap_id = z.zap_id
    WHERE z.zap_email = ?
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju odsustava po email-u:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

