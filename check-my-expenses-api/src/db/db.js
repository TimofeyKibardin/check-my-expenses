import { config as loadEnv } from "dotenv";
import { Pool } from "pg";


loadEnv();

const isProd = process.env.NODE_ENV === "production";

// Connection config
export const pool = new Pool(
    {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        database: process.env.PGDATABASE || "postgres",
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "",
        ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    }
);

// Helper
export async function query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV !== "test") {
        console.log("db", { text, duration, rows: res.rowCount });
    }
    return res;
}

// Logging
pool.on("connect", () => console.log("PG: client connected"));
pool.on("error", (err) => console.error("PG: idle client error", err));

// Close connection
export async function closePool() {
  await pool.end();
}