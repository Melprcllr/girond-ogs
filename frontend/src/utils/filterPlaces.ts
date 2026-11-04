import type { Place } from "../types/Place";

interface FilterPlacesOptions {
    environments: (keyof Place["characteristics"])[];
    avoidPineTrees: boolean;
    risks: (keyof Place["risks"])[];
    regulations: (keyof Place["regulations"])[];
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
                risk === "processionaryCaterpillars" && place.characteristics.pineTrees;

            return !hasRisk && !hasPineTrees;
        });

        const matchesRegulations = filters.regulations.every(
            (regulation) => place.regulations[regulation]
        );

        return (
            matchesEnvironment && avoidsPineTrees && avoidsRisks && matchesRegulations
        );
    });
}
