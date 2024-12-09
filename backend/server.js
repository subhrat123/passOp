const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'passOP';

app.use(cors());
app.use(bodyParser.json());

async function connectToDatabase() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

//get all the passwords
app.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (err) {
        console.error("Error retrieving passwords:", err);
        res.status(500).send("Internal Server Error");
    }
});

//save a password
app.post('/', async (req, res) => {
    try {
        const password = req.body;
        const db = await connectToDatabase();
        const collection = db.collection('passwords');
        const insertResult = await collection.insertOne(password);
        res.json({ success: true, result: insertResult });
    } catch (err) {
        console.error("Error saving password:", err);
        res.status(500).send("Internal Server Error");
    }
});

//delete a password
app.delete('/', async (req, res) => {
    try {
        const passwordId = req.body.id;
        
        const db = await connectToDatabase();
        const collection = db.collection('passwords');
        const deleteResult = await collection.deleteOne({ id: passwordId });
        res.json({ success: true, result: deleteResult });
    } catch (err) {
        console.error("Error deleting password:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
