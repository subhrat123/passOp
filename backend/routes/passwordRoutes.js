const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllPasswords,
    savePassword,
    deletePassword
} = require('../controllers/passwordController');

router.get('/', authMiddleware, getAllPasswords);
router.post('/', authMiddleware, savePassword);
router.delete('/', authMiddleware, deletePassword);

module.exports = router;
