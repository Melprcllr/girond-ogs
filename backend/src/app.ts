
import express from "express";
import cors from "cors";

import contactRouter from "./routes/contact.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Girond'ogs API is running",
    });
});

app.use("/api/contact", contactRouter);

export default app;
