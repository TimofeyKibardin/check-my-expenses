import { app } from "./app.js";
import { closePool, query } from "./db/db.js";

const PORT = Number(process.env.PORT || 5000);

async function bootstrap() {
    // ping
    await query("select 1");

    // server
    const server = app.listen(PORT, () => {
        console.log(`API LISTENING ON PORT: ${PORT}`);
    });

    // shutdown
    const shutdown = async (signal) => {
        console.log(`\n${signal} received, shutting down...`);
        server.close(async () => {
            await closePool();
            process.exit(0);
        })
    }

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
})