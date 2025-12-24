import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import savedRouteRoutes from './routes/savedRouteRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/saved-routes', savedRouteRoutes);

app.get('/', (req, res) => {
    res.send('TripSync Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
