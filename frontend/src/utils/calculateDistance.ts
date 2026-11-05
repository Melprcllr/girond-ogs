export interface Coordinates {
    latitude: number;
    longitude: number;
}

/**
 * Calcule la distance à vol d'oiseau entre deux coordonnées GPS.
 * Retourne une distance en kilomètres.
 */
export function calculateDistance(
    pointA: Coordinates,
    pointB: Coordinates
): number {
    const earthRadius = 6371;

    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const latitudeDifference = toRadians(
        pointB.latitude - pointA.latitude
    );

    const longitudeDifference = toRadians(
        pointB.longitude - pointA.longitude
    );

    const latitudeA = toRadians(pointA.latitude);
    const latitudeB = toRadians(pointB.latitude);

    const haversine =
        Math.sin(latitudeDifference / 2) ** 2 +
        Math.cos(latitudeA) *
            Math.cos(latitudeB) *
            Math.sin(longitudeDifference / 2) ** 2;

    const angularDistance =
        2 * Math.atan2(
            Math.sqrt(haversine),
            Math.sqrt(1 - haversine)
        );

    return earthRadius * angularDistance;
}