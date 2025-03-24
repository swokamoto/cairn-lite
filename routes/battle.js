import db from '../db.js';

export function startBattle(req, res) {
    const query = `SELECT * FROM users`;
    const users = db.prepare(query).all();
    res.json({users: users});
}