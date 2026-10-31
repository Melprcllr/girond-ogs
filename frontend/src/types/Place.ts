
export interface Place {
    id: string;
    name: string;
    commune: string;
    postalCode: string;
    description: string;
    imageUrl: string;

    // Caractéristiques environnementales
    characteristics: {
        vineyards: boolean;
        forest: boolean;
        beach: boolean;
        shadedAreas: boolean;
        water: boolean;
    };

    // Réglementation canine
    regulations: {
        dogsOnLeash: boolean;
        dogsProhibited: boolean;
    };

    // Risques et points de vigilance
    risks: {
        processionaryCaterpillars: boolean;
        farmAnimals: boolean;
        cyanobacteria: boolean;
    };
}
export interface Place {
    id: string;
    name: string;
    commune: string;
    postalCode: string;
    description: string;
    imageUrl: string;

    latitude: number;
    longitude: number;

    characteristics: {
        vineyards: boolean;
        forest: boolean;
        beach: boolean;
        shadedAreas: boolean;
        water: boolean;
    };

    regulations: {
        dogsOnLeash: boolean;
        dogsProhibited: boolean;
    };

    risks: {
        processionaryCaterpillars: boolean;
        farmAnimals: boolean;
        cyanobacteria: boolean;
    };
}