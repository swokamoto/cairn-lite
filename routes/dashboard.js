import db from '../db.js';

export function dashBoard(req, res) {
    //builds the html for the dashboard page, for the user to see their stats and other information
    // only for the player that is logged in, not for the admin or other users
    const query = `SELECT * FROM users WHERE id = ?`;
    const user = db.prepare(query).get(req.session.userId);
    res.json({user: user});
}