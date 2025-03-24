import db from '../db.js';

export function createUser(req, res) {
    const { name, username, password } = req.body;
    console.log(name, username, password);
    if (!username || !password || !name) { return res.status(400).send('Username and password are required.'); }

    const passwordError = validatePassword(password);
    console.log(passwordError);
    if (passwordError) {
        return res.status(400).send(passwordError);
    } 
    
    const query = `SELECT * FROM users WHERE username = ?`;
    const existingUser = db.prepare(query).get(username);
    if (existingUser) { return res.status(400).send('Username already exists.');}
    

    const insertQuery = `INSERT INTO users (name, username, password) VALUES (?, ?, ?)`;
    const stmt = db.prepare(insertQuery);
    stmt.run(name, username, password);

    res.status(201).send('User created successfully');
}

export function loginUser(req, res) {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const user = db.prepare(query).get(username, password);
    if (user) {
        req.session.userId = user.id; // Assuming you are using express-session

        res.redirect('/dashboard');
    } else {
        res.json({ message: 'Login failed' });
    }
}

function validatePassword(password) {
    const minLength = 8;
    const maxLength = 64;
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (password.length < minLength || password.length > maxLength) {
        return "Password must be between 8 and 64 characters.";
    }
    if (!regex.test(password)) {
        console.log(regex.test(password));
        return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null; // No errors
}