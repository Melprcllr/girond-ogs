
import type { Place } from "../types/Place";

export const demoPlaces: Place[] = [
    {
        id: "lac-lacanau",
        name: "Lac de Lacanau",
        commune: "Lacanau",
        postalCode: "33680",
        description: "Un espace naturel avec forêt ombragée et point d'eau.",
        imageUrl: "/images/demo-lacanau.jpg",
        latitude: 44.988,
        longitude: -1.085,
        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
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
        id: "plage-porge",
        name: "Plage du Porge",
        commune: "Le Porge",
        postalCode: "33680",
        description: "Un environnement naturel entre océan et forêt.",
        imageUrl: "/images/demo-porge.jpg",
        latitude: 44.988,
        longitude: -1.085,
        characteristics: {
            vineyards: false,
            forest: true,
            beach: true,
            shadedAreas: false,
            water: true,
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
    {
        id: "vignobles-medoc",
        name: "Vignobles du Médoc",
        commune: "Pauillac",
        postalCode: "33250",
        description: "Un paysage viticole ouvert au cœur du Médoc.",
        imageUrl: "/images/demo-medoc.jpg",
        latitude: 44.988,
        longitude: -1.085,
        characteristics: {
            vineyards: true,
            forest: false,
            beach: false,
            shadedAreas: false,
            water: false,
        },
        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },
        risks: {
            processionaryCaterpillars: false,
            farmAnimals: true,
            cyanobacteria: false,
        },
    },
    {
        id: "foret-pilat",
        name: "Forêt du Pilat",
        commune: "La Teste-de-Buch",
        postalCode: "33260",
        description: "Un environnement forestier avec de nombreuses zones ombragées.",
        imageUrl: "/images/demo-foret.jpg",
        latitude: 44.988,
        longitude: -1.085,
        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: false,
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
];
