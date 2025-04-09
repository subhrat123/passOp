const connectToDatabase = require('../db/connect');

exports.getAllPasswords = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('passwords');
        const userId = req.user.userId;
        const findResult = await collection.find({ userId }).toArray();
        res.json(findResult);
    } catch (err) {
        console.error("Error retrieving passwords:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.savePassword = async (req, res) => {
    try {
        const password = req.body;
        password.userId = req.user.userId; // Attach userId to the password object
        const db = await connectToDatabase();
        const collection = db.collection('passwords');
        
        const insertResult = await collection.insertOne(password);
        if (!insertResult.acknowledged) {
            return res.status(500).json({ error: 'Failed to save password' });
        }
        res.json({ success: true, result: insertResult });
    } catch (err) {
        console.error("Error saving password:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deletePassword = async (req, res) => {
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
};

