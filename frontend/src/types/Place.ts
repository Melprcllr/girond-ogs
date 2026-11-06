
export type PlaceAttribute = boolean | null;

export interface PlaceSource {
    name: string;
    url?: string;
}

export interface Place {
    id: string;
    name: string;
    commune: string;
    postalCode: string;
    description: string;
    imageUrl?: string;
    gallery?: string[];

    // Coordonnées GPS
    latitude: number;
    longitude: number;

    // Particularités propres au lieu
    specificities?: string[];

    // Informations sur le stationnement
    parking: {
        available: PlaceAttribute;
        address?: string;
        details?: string;
    };

    // Caractéristiques environnementales
    characteristics: {
        vineyards: PlaceAttribute;
        forest: PlaceAttribute;
        beach: PlaceAttribute;
        shadedAreas: PlaceAttribute;
        water: PlaceAttribute;
        pineTrees: PlaceAttribute;
    };

    // Réglementation canine
    regulations: {
        dogsOnLeash: PlaceAttribute;
        dogsProhibited: PlaceAttribute;
    };

    // Risques et points de vigilance
    risks: {
        processionaryCaterpillars: PlaceAttribute;
        farmAnimals: PlaceAttribute;
        cyanobacteria: PlaceAttribute;
    };

    // Sources et suivi des informations
    sources: PlaceSource[];
    lastVerifiedAt: string | null;
}
