const db = require('../db');

// GET - sva radna mesta
exports.getAll = (req, res) => {
  db.query('SELECT * FROM radna_mesta', (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju radnih mesta:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// GET - jedno radno mesto po ID-u
exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM radna_mesta WHERE radno_mesto_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Greška pri dohvatanju radnog mesta:', err);
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Radno mesto nije pronađeno.' });
    } else {
      res.json(result[0]);
    }
  });
};

// POST - dodavanje radnog mesta
exports.create = (req, res) => {
  const { radno_mesto_naziv, odeljenje_id } = req.body;
  const sql = 'INSERT INTO radna_mesta (radno_mesto_naziv, odeljenje_id) VALUES (?, ?)';
  db.query(sql, [radno_mesto_naziv, odeljenje_id], (err, result) => {
    if (err) {
      console.error('Greška pri dodavanju radnog mesta:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Radno mesto uspešno dodato!' });
    }
  });
};

// PUT - izmena radnog mesta
exports.update = (req, res) => {
  const id = req.params.id;
  const { radno_mesto_naziv, odeljenje_id } = req.body;
  const sql = 'UPDATE radna_mesta SET radno_mesto_naziv=?, odeljenje_id=? WHERE radno_mesto_id=?';
  db.query(sql, [radno_mesto_naziv, odeljenje_id, id], (err, result) => {
    if (err) {
      console.error('Greška pri izmeni radnog mesta:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Radno mesto uspešno izmenjeno!' });
    }
  });
};

// DELETE - brisanje radnog mesta
exports.delete = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM radna_mesta WHERE radno_mesto_id=?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Greška pri brisanju radnog mesta:', err);

      // ako postoje zaposleni koji koriste ovo radno mesto
      if (
        err.code === 'ER_ROW_IS_REFERENCED_2' ||
        err.code === 'ER_ROW_IS_REFERENCED'
      ) {
        return res.status(400).json({
          message:
            'Ne možete obrisati radno mesto jer postoje zaposleni kojima je dodeljeno.',
        });
      }

      return res.status(500).send(err);
    }

    res.json({ message: 'Radno mesto uspešno obrisano!' });
  });
};
