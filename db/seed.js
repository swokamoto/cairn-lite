import Database from 'better-sqlite3';

// Open the database file (or create if it doesn’t exist)
const db = new Database('game.db');

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

// Create tables if they don’t exist
db.exec(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT CHECK (type IN ('weapon', 'armor', 'consumable')),
        damage_range TEXT, -- Example: '1d6', '1d10' (for weapons)
        armor_value INTEGER DEFAULT 0, -- Used for armor
        effect TEXT, -- Used for consumables (e.g., "Restores 10 HP")
        weight INTEGER CHECK (weight IN (0, 1, 2)) DEFAULT 0, -- Ensures only 0, 1, or 2
        UNIQUE(name, type) -- Prevents duplicate item names
    );

    CREATE TABLE IF NOT EXISTS character_inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        UNIQUE(character_id, item_id) -- Prevents duplicates
    );
`);

// Seed Items
const insertItem = db.prepare(`
    INSERT INTO items (name, type, damage_range, armor_value, effect, weight)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(name, type) DO NOTHING
`);

const items = [
    ['Short Sword', 'weapon', '1d6', 0, null, 1],
    ['Greatsword', 'weapon', '1d10', 0, null, 2],
    ['Dagger', 'weapon', '1d6', 0, null, 1],
    ['Buckler', 'armor', null, 1, null, 1],
    ['Chainmail', 'armor', null, 2, null, 2],
    ['Healing Potion', 'consumable', null, 0, 'Restores 10 HP', 0],
    ['Antidote', 'consumable', null, 0, 'Cures poison', 0]
];

const insertManyItems = db.transaction((items) => {
    for (const item of items) insertItem.run(...item);
});
insertManyItems(items);

// Seed Character Inventory
const insertCharacterInventory = db.prepare(`
    INSERT INTO character_inventory (character_id, item_id)
    VALUES (?, ?)
    ON CONFLICT(character_id, item_id) DO NOTHING
`);

const characterInventory = [
    // Aldric gets a Short Sword and Buckler
    [1, 1], // Aldric → Short Sword
    [1, 4], // Aldric → Buckler

    // Branwen gets a Dagger and Healing Potion
    [2, 3], // Branwen → Dagger
    [2, 6], // Branwen → Healing Potion

    // // Cedric gets a Greatsword
    // [3, 2] // Cedric → Greatsword
];

const insertManyCharacterInventory = db.transaction((characterInventory) => {
    for (const entry of characterInventory) insertCharacterInventory.run(...entry);
});
insertManyCharacterInventory(characterInventory);

console.log('Database seeded successfully.');
db.close();
