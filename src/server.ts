import express from 'express';
import { logger } from './middlewares/loggerMiddleware';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import postCategoryRoutes from './routes/postCategoryRoutes';
import sequelize from './config/database';
import './models/SyncDB';

// express application
const app = express();
const PORT = 3000;

// Middlewares
app.use(logger); 
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/posts', postCategoryRoutes);

// starting the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});