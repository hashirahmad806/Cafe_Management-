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

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://cafe-management-do4l.vercel.app/',
    'http://localhost:5174',
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

// Per-request DB connection (serverless-safe, uses cached connection)
app.use(async (req, res, next) => {
    await connectDB();
    next();
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

// Local development server
if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(PORT, async () => {
        console.log(`[Server] Express server running on port ${PORT}`);
        // Connect to DB at startup so the message shows immediately
        const conn = await connectDB();
        if (conn) {
            try {
                const adminExists = await Admin.findOne({ email: 'admin@brewmanager.com' });
                if (!adminExists) {
                    await Admin.create({
                        name: 'Super Admin',
                        email: 'admin@brewmanager.com',
                        password: 'password123'
                    });
                    console.log('[Database] Default admin created (admin@brewmanager.com / password123)');
                } else {
                    console.log('[Database] Admin user already exists');
                }
            } catch (err) {
                // ignore seed errors
            }
        }
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`[Server] Port ${PORT} is already in use. Please close the other terminal running the backend and try again.`);
        } else {
            console.error('[Server] Error:', err.message);
        }
        process.exit(1);
    });
}

export default app;