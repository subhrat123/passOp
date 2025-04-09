const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passwordRoutes = require('./routes/passwordRoutes.js');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
