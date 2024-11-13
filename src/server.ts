import express from 'express';
import { logger } from './middlewares/loggerMiddleware';
//import userRoutes from './routes/userRoutes';
/*import sequelize from './config/database';
import './models/SyncDB';*/

// express application
const app = express();
const PORT = 3000;

// Middlewares
app.use(logger); 
app.use(express.json());

// Routes
//app.use('/api/users', userRoutes);

// starting the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});