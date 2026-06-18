import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async() => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_db';
    try {
        const conn = await mongoose.connect(uri);
        isConnected = true;
        console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        isConnected = false;
        console.log(`[Database] MongoDB connection failed: ${error.message}`);
        console.log(`[Database] Running in DEMO MODE - using in-memory data`);
        console.log(`[Database] To use MongoDB Atlas, check your network connection and IP whitelist`);
        // Don't throw - allow app to run in demo mode
        return null;
    }
};

export const getDBStatus = () => isConnected;