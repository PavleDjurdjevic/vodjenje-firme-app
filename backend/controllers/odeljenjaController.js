const db = require('../db');

// GET - sva odeljenja
exports.getAll = (req, res) => {
  db.query('SELECT * FROM odeljenja', (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju odeljenja:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// GET - jedno odeljenje po ID-u
exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM odeljenja WHERE odeljenje_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Greška pri dohvatanju odeljenja:', err);
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Odeljenje nije pronađeno.' });
    } else {
      res.json(result[0]);
    }
  });
};

// POST - dodavanje odeljenja
exports.create = (req, res) => {
  const { odeljenje_naziv, odeljenje_opis } = req.body;
  const sql = 'INSERT INTO odeljenja (odeljenje_naziv, odeljenje_opis) VALUES (?, ?)';
  db.query(sql, [odeljenje_naziv, odeljenje_opis], (err, result) => {
    if (err) {
      console.error('Greška pri dodavanju odeljenja:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Odeljenje uspešno dodato!' });
    }
  });
};

// PUT - izmena odeljenja
exports.update = (req, res) => {
  const id = req.params.id;
  const { odeljenje_naziv, odeljenje_opis } = req.body;
  const sql = 'UPDATE odeljenja SET odeljenje_naziv=?, odeljenje_opis=? WHERE odeljenje_id=?';
  db.query(sql, [odeljenje_naziv, odeljenje_opis, id], (err, result) => {
    if (err) {
      console.error('Greška pri izmeni odeljenja:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Odeljenje uspešno izmenjeno!' });
    }
  });
};

// DELETE - brisanje odeljenja
exports.delete = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM odeljenja WHERE odeljenje_id=?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Greška pri brisanju odeljenja:', err);

      // ako postoje radna mesta u ovom odeljenju
      if (
        err.code === 'ER_ROW_IS_REFERENCED_2' ||
        err.code === 'ER_ROW_IS_REFERENCED'
      ) {
        return res.status(400).json({
          message:
            'Ne možete obrisati odeljenje jer postoje radna mesta koja ga koriste.',
        });
      }

      return res.status(500).send(err);
    }

    res.json({ message: 'Odeljenje uspešno obrisano!' });
  });
};
