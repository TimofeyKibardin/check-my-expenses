import mongoose from "mongoose";
import { config as loadEnv } from "dotenv";

loadEnv();

const isProd = process.env.NODE_ENV === "production";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://localhost:27017";
const MONGODB_DB  = process.env.MONGODB_DB  || "check-my-expenses";
const USE_SSL = process.env.MONGODB_SSL === "true";

// Connection config
export async function connectMongo() {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        ssl: USE_SSL || undefined,
        autoIndex: !isProd  // indexes in dev
    });

    console.log(
        `Mongo: connected -> ${conn.connection.host}/${conn.connection.name}`
    );
    return conn;
}

// Ping
export async function pingMongo() {
    await mongoose.connection.db.admin().ping();
    return true;
}

// Close connection
export async function closeMongo() {
    await mongoose.connection.close(false);
    console.log("Mongo: connection closed");
}

// Logs
mongoose.connection.on("error", (err) => {
    console.error("Mongo error:", err);
});
mongoose.connection.on("disconnected", () => {
    console.log("Mongo: disconnected");
});