
import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";

describe("GET /api/health", () => {
    it("should return the API health status", async () => {
        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "ok",
            message: "Girond'ogs API is running",
        });
    });
});

describe("POST /api/contact", () => {
    const commonFields = {
        firstName: "Melissa",
        email: "test@example.com",
        message: "Voici un message suffisamment long pour le test.",
    };

    it("should accept a valid question", async () => {
        const response = await request(app)
            .post("/api/contact")
            .send({
                ...commonFields,
                reason: "question",
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it("should reject a new place without a name", async () => {
        const response = await request(app)
            .post("/api/contact")
            .send({
                ...commonFields,
                reason: "new-place",
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should accept a valid new place proposal", async () => {
        const response = await request(app)
            .post("/api/contact")
            .send({
                ...commonFields,
                reason: "new-place",
                proposedPlace: "Bois de Tanaïs",
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it("should reject a report without a selected place", async () => {
        const response = await request(app)
            .post("/api/contact")
            .send({
                ...commonFields,
                reason: "report",
                commune: "Canéjan",
                reportType: "danger",
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("should accept a valid report", async () => {
        const response = await request(app)
            .post("/api/contact")
            .send({
                ...commonFields,
                reason: "report",
                commune: "Canéjan",
                selectedPlaceId: "place-123",
                reportType: "danger",
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it("should reject an invalid email", async () => {
        const response = await request(app)
            .post("/api/contact")
            .send({
                ...commonFields,
                email: "adresse-invalide",
                reason: "question",
            });

        expect(response.status).toBe(400);
    });
});
