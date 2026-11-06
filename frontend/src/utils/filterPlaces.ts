
import type { Place } from "../types/Place";
import { calculateDistance } from "./calculateDistance";
import type { Coordinates } from "./calculateDistance";

interface FilterPlacesOptions {
    environments: (keyof Place["characteristics"])[];
    avoidPineTrees: boolean;
    risks: (keyof Place["risks"])[];
    regulations: (keyof Place["regulations"])[];
    center?: Coordinates;
    maxDistanceKm?: number;
}

export function filterPlaces(
    places: Place[],
    filters: FilterPlacesOptions
): Place[] {
    return places.filter((place) => {
        // Les caractéristiques demandées doivent être confirmées.
        const matchesEnvironment = filters.environments.every(
            (environment) =>
                place.characteristics[environment] === true
        );

        // Les lieux avec des pins confirmés sont exclus.
        const avoidsPineTrees =
            !filters.avoidPineTrees ||
            place.characteristics.pineTrees === false;

        // Les risques doivent être confirmés absents.
        const avoidsRisks = filters.risks.every((risk) => {
            const hasRisk = place.risks[risk];

            const hasPineTrees =
                risk === "processionaryCaterpillars" &&
                place.characteristics.pineTrees !== false;

            return hasRisk === false && !hasPineTrees;
        });

        // La réglementation demandée doit être confirmée.
        const matchesRegulations = filters.regulations.every(
            (regulation) =>
                place.regulations[regulation] === true
        );

        // Le lieu doit se trouver dans le rayon sélectionné.
        const matchesDistance =
            !filters.center ||
            filters.maxDistanceKm === undefined ||
            calculateDistance(filters.center, {
                latitude: place.latitude,
                longitude: place.longitude,
            }) <= filters.maxDistanceKm;

        return (
            matchesEnvironment &&
            avoidsPineTrees &&
            avoidsRisks &&
            matchesRegulations &&
            matchesDistance
        );
    });
}
