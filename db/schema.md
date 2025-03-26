// Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE
);

// Create the characters table with a foreign key to the users table
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    job VARCHAR(25) NOT NULL,
    strength INTEGER DEFAULT 0,
    dexterity INTEGER DEFAULT 0,
    willpower INTEGER DEFAULT 0,
    weapon VARCHAR(25),
    armor VARCHAR(25), 
    user_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('weapon', 'armor', 'consumable')),
    damage_range VARCHAR(10), -- Example: '1d6', '1d10' (for weapons)
    armor_value INT DEFAULT 0, -- Used for armor
    effect TEXT, -- Used for consumables (e.g., "Restores 10 HP")
    weight INT CHECK (weight IN (0, 1, 2)) DEFAULT 0, -- Ensures only 0, 1, or 2
    UNIQUE(name, type) -- Prevents duplicate item names
);


CREATE TABLE character_inventory (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES characters(id) ON DELETE CASCADE,
    item_id INT REFERENCES items(id) ON DELETE CASCADE,
    UNIQUE(character_id, item_id) -- Prevents duplicates
);