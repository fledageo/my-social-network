import Database from 'better-sqlite3'
const db = new Database("social.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        login TEXT,
        password TEXT,
        isPrivate INTEGER DEFAULT 0,
        cover TEXT,
        picture TEXT    
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS SESSION(
        id TEXT PRIMARY KEY,
        userId INTEGER,
        expires INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id)
    )    
`)


db.exec(`
    CREATE TABLE IF NOT EXISTS POSTS(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        picture TEXT,
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS comments(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        postId INTEGER,
        userId INTEGER,
        FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
`)
db.exec(`
    CREATE TABLE IF NOT EXISTS likes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        userId INTEGER,
        FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS follows(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        follows INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
        FOREIGN KEY(follows) REFERENCES users(id) ON DELETE CASCADE
    )    
`)
db.exec(`
    CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        requests INTEGER,
        accepted INTEGER DEFAULT 0,
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
        FOREIGN KEY(requests) REFERENCES users(id) ON DELETE CASCADE
    )    
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS blocks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user INTEGER,
        blocked INTEGER,
        FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE
        FOREIGN KEY(blocked) REFERENCES users(id) ON DELETE CASCADE
    )
`)
export default db