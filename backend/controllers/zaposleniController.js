const db = require('../db');

// GET - svi zaposleni
exports.getAll = (req, res) => {
  db.query('SELECT * FROM zaposleni', (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju zaposlenih:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

// GET - jedan zaposleni po ID-u
exports.getById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM zaposleni WHERE zap_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Greška pri dohvatanju zaposlenog:', err);
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Zaposleni nije pronađen.' });
    } else {
      res.json(result[0]); // vraćamo samo jednog zaposlenog
    }
  });
};

// POST - dodavanje zaposlenog
exports.create = (req, res) => {
  const {
    zap_ime,
    zap_prezime,
    zap_email,
    zap_plata,
    zap_datum_zaposlenja,
    radno_mesto_id,
  } = req.body;

  //  Provera da li postoji korisnik sa istim email-om
  const sqlProvera = `SELECT 1 FROM korisnici_sistema WHERE korisnik_email = ?`;

  db.query(sqlProvera, [zap_email], (err, rows) => {
    if (err) {
      console.error("Greška pri proveri email-a:", err);
      return res.status(500).send(err);
    }

    if (rows.length > 0) {
      return res.status(400).json({
        message: "Korisnik sa tim email-om već postoji.",
      });
    }

    // Ako email NIJE zauzet → nastavljamo sa unosom zaposlenog
    const sqlZaposleni =
      "INSERT INTO zaposleni (zap_ime, zap_prezime, zap_email, zap_plata, zap_datum_zaposlenja, radno_mesto_id) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      sqlZaposleni,
      [
        zap_ime,
        zap_prezime,
        zap_email,
        zap_plata,
        zap_datum_zaposlenja,
        radno_mesto_id,
      ],
      (err2, result) => {
        if (err2) {
          console.error("Greška pri dodavanju zaposlenog:", err2);
          return res.status(500).send(err2);
        }

        // Automatsko kreiranje korisnika sistema
        const punoIme = `${zap_ime} ${zap_prezime}`;
        const defaultLozinka = "lozinka123";

        const sqlKorisnik = `
          INSERT INTO korisnici_sistema (korisnik_ime, korisnik_email, korisnik_lozinka, korisnik_uloga)
          VALUES (?, ?, ?, 'ulogovan')
        `;

        db.query(
          sqlKorisnik,
          [punoIme, zap_email, defaultLozinka],
          (err3) => {
            if (err3) {
              console.error("Greška pri kreiranju korisnika:", err3);
              return res.status(500).send(err3);
            }

            return res.json({
              message:
                "Zaposleni uspešno dodat! Kreiran je i nalog za prijavu.",
            });
          }
        );
      }
    );
  });
};


// PUT - izmena zaposlenog
exports.update = (req, res) => {
  const id = req.params.id;
  const { zap_ime, zap_prezime, zap_email, zap_plata, zap_datum_zaposlenja, radno_mesto_id } = req.body;
  const sql = 'UPDATE zaposleni SET zap_ime=?, zap_prezime=?, zap_email=?, zap_plata=?, zap_datum_zaposlenja=?, radno_mesto_id=? WHERE zap_id=?';
  db.query(sql, [zap_ime, zap_prezime, zap_email, zap_plata, zap_datum_zaposlenja, radno_mesto_id, id], (err, result) => {
    if (err) {
      console.error('Greška pri izmeni zaposlenog:', err);
      res.status(500).send(err);
    } else {
      res.json({ message: 'Zaposleni uspešno izmenjen!' });
    }
  });
};

// DELETE - brisanje zaposlenog + brisanje korisnika_sistema
exports.delete = (req, res) => {
  const id = req.params.id;

  // 1. prvo dohvatamo email zaposlenog (potreban za brisanje korisnika)
  const sqlEmail = 'SELECT zap_email FROM zaposleni WHERE zap_id = ?';

  db.query(sqlEmail, [id], (errEmail, result) => {
    if (errEmail) {
      console.error('Greška pri dohvatanju email-a zaposlenog:', errEmail);
      return res.status(500).send(errEmail);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Zaposleni ne postoji.' });
    }

    const email = result[0].zap_email;

    // 2. brisanje zaposlenog iz tabele zaposleni
    const sqlDeleteZaposleni = 'DELETE FROM zaposleni WHERE zap_id = ?';

    db.query(sqlDeleteZaposleni, [id], (errDel, resultDel) => {
      if (errDel) {
        console.error('Greška pri brisanju zaposlenog:', errDel);

        if (
          errDel.code === 'ER_ROW_IS_REFERENCED_2' ||
          errDel.code === 'ER_ROW_IS_REFERENCED'
        ) {
          return res.status(400).json({
            message:
              'Ne možete obrisati zaposlenog jer ima evidentirana odsustva ili je povezan sa drugim podacima.',
          });
        }

        return res.status(500).send(errDel);
      }

      // 3. brisanje korisnika iz korisnici_sistema po email-u (ako postoji)
      const sqlDeleteKorisnik =
        'DELETE FROM korisnici_sistema WHERE korisnik_email = ?';

      db.query(sqlDeleteKorisnik, [email], (errKor) => {
        if (errKor) {
          console.error('Greška pri brisanju korisnika sistema:', errKor);
          // ne vraćamo grešku — zaposleni je uspešno obrisan
        }

        res.json({
          message: 'Zaposleni i povezani korisnički nalog uspešno obrisani!',
        });
      });
    });
  });
};
