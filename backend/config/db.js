import mongoose from 'mongoose';
import dns from 'node:dns';

const configureDns = () => {
    const servers = (process.env.DNS_SERVERS || '8.8.8.8,1.1.1.1')
        .split(',')
        .map((server) => server.trim())
        .filter(Boolean);

    if (servers.length > 0) {
        dns.setServers(servers);
    }
};

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in your .env file');
        }
        if (process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
            configureDns();
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
