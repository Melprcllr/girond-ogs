
import { describe, it, expect } from "vitest";
import { filterPlaces } from "./filterPlaces";
import type { Place } from "../types/Place";

const mockPlaces: Place[] = [
    {
        id: "1",
        name: "Lac de Lacanau",
        commune: "Lacanau",
        postalCode: "33680",
        description: "Un espace naturel avec un point d'eau.",
        imageUrl: "/images/demoPlaces/lac-lacanau.jpg",
        sources: [],
        lastVerifiedAt: null,
        latitude: 44.988,
        longitude: -1.085,
        parking: {
            available: null,
        },
        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: true,
        },
        regulations: {
            dogsOnLeash: false,
            dogsProhibited: false,
        },
        risks: {
            processionaryCaterpillars: true,
            farmAnimals: false,
            cyanobacteria: false,
        },
    },
    {
        id: "2",
        name: "Plage du Porge",
        commune: "Le Porge",
        postalCode: "33680",
        description: "Une plage au cœur de la nature.",
        imageUrl: "/images/demoPlaces/plage-porge.jpg",
        sources: [],
        lastVerifiedAt: null,
        latitude: 44.872,
        longitude: -1.175,
        parking: {
            available: null,
        },
        characteristics: {
            vineyards: false,
            forest: true,
            beach: true,
            shadedAreas: false,
            water: true,
            pineTrees: false,
        },
        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },
        risks: {
            processionaryCaterpillars: false,
            farmAnimals: false,
            cyanobacteria: false,
        },
    },
];

const unknownPlace: Place = {
    ...mockPlaces[1],
    id: "3",
    name: "Lieu avec informations inconnues",
    characteristics: {
        ...mockPlaces[1].characteristics,
        forest: null,
        pineTrees: null,
    },
    regulations: {
        ...mockPlaces[1].regulations,
        dogsOnLeash: null,
    },
    risks: {
        ...mockPlaces[1].risks,
        cyanobacteria: null,
    },
};

describe("filterPlaces", () => {
    it("conserve tous les lieux lorsqu'aucun filtre n'est sélectionné", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(2);
    });

    it("exclut les lieux dont une caractéristique environnementale est inconnue", () => {
        const result = filterPlaces([...mockPlaces, unknownPlace], {
            environments: ["forest"],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(2);
        expect(result.map((place) => place.id)).not.toContain("3");
    });

    it("exclut les lieux dont un risque est inconnu", () => {
        const result = filterPlaces([...mockPlaces, unknownPlace], {
            environments: [],
            risks: ["cyanobacteria"],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(2);
        expect(result.map((place) => place.id)).not.toContain("3");
    });

    it("exclut les lieux dont la présence de pins est inconnue lorsque le filtre est activé", () => {
        const result = filterPlaces([...mockPlaces, unknownPlace], {
            environments: [],
            risks: [],
            regulations: [],
            avoidPineTrees: true,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("exclut les lieux dont la réglementation demandée est inconnue", () => {
        const result = filterPlaces([...mockPlaces, unknownPlace], {
            environments: [],
            risks: [],
            regulations: ["dogsOnLeash"],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("filtre les lieux selon une caractéristique environnementale", () => {
        const result = filterPlaces(mockPlaces, {
            environments: ["beach"],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("exige toutes les caractéristiques environnementales sélectionnées", () => {
        const result = filterPlaces(mockPlaces, {
            environments: ["forest", "beach"],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("exclut les lieux présentant un risque sélectionné", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            risks: ["processionaryCaterpillars"],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("exclut les lieux présentant au moins un des risques sélectionnés", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            risks: ["processionaryCaterpillars", "cyanobacteria"],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("filtre les lieux selon la réglementation sélectionnée", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            risks: [],
            regulations: ["dogsOnLeash"],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("combine les différentes catégories de filtres", () => {
        const result = filterPlaces(mockPlaces, {
            environments: ["forest", "beach"],
            risks: ["processionaryCaterpillars"],
            regulations: ["dogsOnLeash"],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("retourne une liste vide lorsqu'aucun lieu ne correspond", () => {
        const result = filterPlaces(mockPlaces, {
            environments: ["vineyards"],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
        });

        expect(result).toHaveLength(0);
    });

    it("exclut les lieux présentant des pins lorsque le filtre est activé", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            avoidPineTrees: true,
            risks: [],
            regulations: [],
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Plage du Porge");
    });

    it("filtre les lieux selon la distance autour d'une commune", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
            center: {
                latitude: 44.988,
                longitude: -1.085,
            },
            maxDistanceKm: 5,
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Lac de Lacanau");
    });

    it("conserve les lieux situés dans un rayon plus large", () => {
        const result = filterPlaces(mockPlaces, {
            environments: [],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
            center: {
                latitude: 44.988,
                longitude: -1.085,
            },
            maxDistanceKm: 20,
        });

        expect(result).toHaveLength(2);
    });

    it("combine le filtre de distance avec les autres filtres", () => {
        const result = filterPlaces(mockPlaces, {
            environments: ["beach"],
            risks: [],
            regulations: [],
            avoidPineTrees: false,
            center: {
                latitude: 44.988,
                longitude: -1.085,
            },
            maxDistanceKm: 5,
        });

        expect(result).toHaveLength(0);
    });
});
