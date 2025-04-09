const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'passOP';

let dbInstance;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

module.exports = connectToDatabase;
