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

export function showCharacter(req, res) {
    const userId = req.session.userId;
    try {
        const query = `SELECT * FROM characters WHERE user_id = ?`;
        const result = db.prepare(query).all(userId);
        console.log("result:", result);
        res.render('partials/character', { ...result[0] });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}

export function showInventory(req, res) {
    const userId = req.session.userId;
    try {
        // First, fetch the character_id from the characters table using the userId
        const characterQuery = `SELECT id FROM characters WHERE user_id = ?`;
        const characterResult = db.prepare(characterQuery).get(userId);

        if (characterResult) {
            // Now, query the character_inventory table using the character_id
            const query = `
                SELECT i.id, i.name, i.type, i.damage_range, i.armor_value, i.effect, i.weight
                FROM character_inventory ci
                JOIN items i ON ci.item_id = i.id
                WHERE ci.character_id = ?
                `;
            const result = db.prepare(query).all(userId);
            console.log(result);
            

            // Send the generated HTML back
            res.render('partials/Inventory', { items: result });
        } else {
            // If no character found for this user
            res.render('inventory', { inventory: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
}

export function showQuests(req, res) {
    const userId = req.session.userId;
    try {
        const query = `SELECT * FROM quests WHERE user_id = ?`;
        const result = db.prepare(query).all(userId);
        res.render('quests', { quests: result });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}

export function showClan(req, res) {
    const userId = req.session.userId;
    
}