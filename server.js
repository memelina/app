import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Malina13.',
  database: 'memory_game_db'
};

app.post('/api/players', async (req, res) => {
  try {
    const { nume, prenume, email, telefon } = req.body;

    if (!nume || !prenume || !email || !telefon) {
      return res.status(400).json({ success: false, message: 'Toate câmpurile sunt obligatorii' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Email-ul nu este valid' });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [existingUser] = await connection.execute(
      'SELECT id FROM players WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      await connection.end();
      return res.status(409).json({ success: false, message: 'Acest email este deja înregistrat' });
    }

    const [result] = await connection.execute(
      'INSERT INTO players (nume, prenume, email, telefon, created_at) VALUES (?, ?, ?, ?, NOW())',
      [nume, prenume, email, telefon]
    );

    await connection.end();

    res.status(201).json({ success: true, message: 'Datele au fost salvate cu succes', playerId: result.insertId });

  } catch (error) {
    console.error('Eroare la salvarea în baza de date:', error);
    res.status(500).json({ success: false, message: 'Eroare internă a serverului' });
  }
});
app.get('/api/players', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM players');
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// În loc de app.listen(3001)
app.listen(3001, '0.0.0.0', () => {
  console.log('Serverul rulează pe http://0.0.0.0:3001');
});

