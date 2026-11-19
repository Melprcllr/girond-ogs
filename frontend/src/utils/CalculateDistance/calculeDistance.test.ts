import { describe, it, expect } from "vitest";
import { calculateDistance } from "./calculateDistance";

describe("calculateDistance", () => {
    it("retourne 0 lorsque les deux points sont identiques", () => {
        const point = {
            latitude: 44.988,
            longitude: -1.085,
        };

        expect(calculateDistance(point, point)).toBe(0);
    });

    it("calcule la distance entre deux points géographiques", () => {
        const lacanau = {
            latitude: 44.988,
            longitude: -1.085,
        };

        const lePorge = {
            latitude: 44.872,
            longitude: -1.175,
        };

        const distance = calculateDistance(lacanau, lePorge);

        // La distance à vol d'oiseau est d'environ 15 km.
        expect(distance).toBeGreaterThan(14);
        expect(distance).toBeLessThan(16);
    });

    it("retourne la même distance dans les deux sens", () => {
        const pointA = {
            latitude: 44.988,
            longitude: -1.085,
        };

        const pointB = {
            latitude: 44.872,
            longitude: -1.175,
        };

        expect(calculateDistance(pointA, pointB)).toBeCloseTo(
            calculateDistance(pointB, pointA)
        );
    });
});