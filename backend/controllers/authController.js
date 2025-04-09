const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db/connect');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const users = db.collection('users');

        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await users.insertOne({ email, password: hashedPassword });
        res.status(201).json({ success: true, userId: result.insertedId });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const users = db.collection('users');

        const user = await users.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Internal Server Error");
    }
};
