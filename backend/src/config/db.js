import mongoose from 'mongoose';

// Cache the connection across serverless invocations
let cachedConnection = null;

export const connectDB = async () => {
    // If already connected, reuse the existing connection
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_db';
    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        cachedConnection = conn;
        console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        cachedConnection = null;
        console.log(`[Database] MongoDB connection failed: ${error.message}`);
        console.log(`[Database] Running in DEMO MODE - using in-memory data`);
        console.log(`[Database] To use MongoDB Atlas, check your network connection and IP whitelist`);
        return null;
    }
};

export const getDBStatus = () => mongoose.connection.readyState === 1;