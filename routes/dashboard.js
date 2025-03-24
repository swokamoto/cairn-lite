import db from '../db.js';

export function dashBoard(req, res) {
    const userId = req.session.userId;

    try {
        const query = `SELECT * FROM characters WHERE user_id = ?`;
        const result = db.prepare(query).all(userId);

        if (result.length === 0) {
            console.log(req.session);
            res.render('createCharacter');
        } else {
            // get characterName and job from result
            const { name, job } = result[0];
            console.log("dashboard:", name, job);
            res.render('dashboard', { characterName: name , job });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}