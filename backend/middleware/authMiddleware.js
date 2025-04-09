const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'subhrat';

const authMiddleware = (req, res, next) => {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'help' });
    }
};

module.exports = authMiddleware;
