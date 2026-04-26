import mongoose from 'mongoose';
import dns from 'node:dns';

const configureDns = () => {
    // Only use custom DNS servers if explicitly provided in .env
    const dnsServers = process.env.DNS_SERVERS;
    if (!dnsServers) {
        return; // Use default system DNS
    }

    const servers = dnsServers
        .split(',')
        .map((server) => server.trim())
        .filter(Boolean);

    if (servers.length > 0) {
        try {
            dns.setServers(servers);
            console.log(`Using custom DNS servers: ${servers.join(', ')}`);
        } catch (error) {
            console.warn(`Failed to set DNS servers: ${error.message}. Falling back to default.`);
        }
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

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of default 30
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (error.message.includes('querySrv ETIMEOUT')) {
            console.error('Hint: This is often a DNS issue. Try checking your network or updating DNS_SERVERS in .env');
        }
        process.exit(1);
    }
};

export default connectDB;
