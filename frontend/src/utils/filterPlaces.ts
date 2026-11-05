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
        const matchesEnvironment = filters.environments.every(
            (environment) => place.characteristics[environment]
        );

        const avoidsPineTrees =
            !filters.avoidPineTrees || !place.characteristics.pineTrees;

        const avoidsRisks = filters.risks.every((risk) => {
            const hasRisk = place.risks[risk];

            const hasPineTrees =
                risk === "processionaryCaterpillars" &&
                place.characteristics.pineTrees;

            return !hasRisk && !hasPineTrees;
        });

        const matchesRegulations = filters.regulations.every(
            (regulation) => place.regulations[regulation]
        );

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