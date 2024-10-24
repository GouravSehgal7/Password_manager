const express = require('express');
const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const errorHandler = require('./utils/errorHandler');
const sequelize = require('./config/database');
const user = require('./models/user')
const password = require('./models/password')
require('dotenv').config();
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
// app.use(express.json())
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/passwords', passwordRoutes);
app.use(errorHandler);
const startServer = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to sync the database:', err);
    }
};
startServer();

