import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://cafe-management-omega-gray.vercel.app',
    'http://localhost:5173',
];
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

// Ensure DB is connected before every request (serverless-safe)
app.use(async (req, res, next) => {
    try {
        const conn = await connectDB();
        if (conn) {
            // Seed admin on first successful connection
            try {
                const adminExists = await Admin.findOne({ email: 'admin@brewmanager.com' });
                if (!adminExists) {
                    await Admin.create({
                        name: 'Super Admin',
                        email: 'admin@brewmanager.com',
                        password: 'password123'
                    });
                    console.log('[Database] Default admin seeded');
                }
            } catch (seedErr) {
                // silently ignore seed errors
            }
        }
        next();
    } catch (err) {
        next();
    }
});

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: 'healthy', message: 'Gusto Cafe API is online' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[Express Error]', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// For local development only
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`[Server] Express server running on port ${PORT}`);
    });
}

export default app;