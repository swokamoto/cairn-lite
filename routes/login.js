import db from '../db.js';

export function createUser(req, res) {
    const { username } = req.body;
    console.log(username);
    if (!username) { return res.status(400).send('Username required.'); }

    const query = `SELECT * FROM users WHERE username = ?`;
    const existingUser = db.prepare(query).get(username);
    if (existingUser) { return res.status(400).send('Username already exists.');}
    
    const insertQuery = `INSERT INTO users (username) VALUES (?)`;
    const stmt = db.prepare(insertQuery);
    stmt.run(username);

    res.status(201).send('User created successfully');
}

export function loginUser(req, res) {
    const { username } = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;
    const user = db.prepare(query).get(username);
    if (user) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } else {
        res.json({ message: 'Login failed' });
    }
}

export function createCharacter(req, res) {
    const { characterName, job } = req.body;
    const userId = req.session.userId;
    console.log("Create Character -- userId: ", userId, " characterName: ", characterName, " job: ", job);
        
    const insertQuery = `INSERT INTO characters (name, job, user_id) VALUES (?, ?, ?)`;
    const stmt = db.prepare(insertQuery);
    stmt.run(characterName, job, userId);

    res.redirect('/dashboard');
}
