

// const query = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name STRING NOT NULL,
//     username STRING NOT NULL UNIQUE
//   )
// `;

// db.exec(query);



// const data = [
//     {name: 'John', username: 'john_doe'},
//     {name: "Scott", username: 'scott_smith'},
//     {name: 'Jane', username: 'jane_doe'}
// ];

// const insertData = db.prepare("INSERT INTO users (name, username) VALUES (?, ?)");

// data.forEach(user => {
//     insertData.run(user.name, user.username);
// });



// const query = `SELECT * FROM users`;
// const users = db.prepare(query).all();
// console.log(users);


const user = db.prepare("SELECT * FROM users WHERE id = ?").get(1);
console.log (user);

db.close();