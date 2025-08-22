import express from "express";
import { query } from "./db/db.js";

export const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
    try {
        await query("select 1");
        res.json({ ok: true, db: "up"});
    } catch (e) {
        res.status(500).json({ ok: false, db: "down" });
    }
});