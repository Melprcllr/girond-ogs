
import { useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";

import type { Place } from "../../../types/Place";
import type { Town } from "../../../data/towns";

import "./PlacesMap.scss";

interface PlacesMapProps {
    places: Place[];
    onPlaceClick: (placeId: string) => void;
    selectedPlaceId?: string | null;
    selectedTown?: Town | null;
    fullScreen?: boolean;
}

interface MapControllerProps {
    selectedPlace: Place | undefined;
    selectedTown: Town | null;
}

// Crée une épingle personnalisée selon l'état du lieu.
function createPlaceIcon(isSelected: boolean) {
    const color = isSelected ? "#D98758" : "#315C49";

    return L.divIcon({
        className: "places-map__marker-icon",
        html: `
            <svg
                width="40"
                height="48"
                viewBox="0 0 40 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M20 1C9.5 1 1 9.5 1 20C1 33 20 47 20 47C20 47 39 33 39 20C39 9.5 30.5 1 20 1Z"
                    fill="${color}"
                    stroke="#FFFFFF"
                    stroke-width="2"
                />
                <circle
                    cx="20"
                    cy="20"
                    r="6"
                    fill="#FFFFFF"
                />
            </svg>
        `,
        iconSize: [40, 48],
        iconAnchor: [20, 47],
        popupAnchor: [0, -44],
    });
}

// Gère le déplacement et le zoom de la carte.
// Gère le déplacement et le zoom de la carte.
function MapController({
    selectedPlace,
    selectedTown,
}: MapControllerProps) {
    const map = useMap();

    // Mémorise la dernière commune sélectionnée.
    const previousTownId = useRef<string | null>(
        selectedTown?.id ?? null
    );

    useEffect(() => {
        const currentTownId = selectedTown?.id ?? null;

        // Une nouvelle commune vient d'être sélectionnée.
        if (
            selectedTown &&
            previousTownId.current !== currentTownId
        ) {
            // Ferme les éventuels popups encore ouverts.
            map.closePopup();

            // Interrompt les anciens déplacements de la carte.
            map.stop();
        }

        previousTownId.current = currentTownId;

        // Si une fiche de lieu est ouverte, on centre sur ce lieu.
        if (selectedPlace) {
            map.setView(
                [selectedPlace.latitude, selectedPlace.longitude],
                12,
                { animate: true },
            );

            return;
        }

        // Sinon, on centre sur la commune sélectionnée.
        if (selectedTown) {
            map.setView(
                [selectedTown.latitude, selectedTown.longitude],
                12,
                { animate: true },
            );
        }
    }, [selectedPlace, selectedTown, map]);

    return null;
}

function PlacesMap({
    places,
    onPlaceClick,
    selectedPlaceId = null,
    selectedTown = null,
    fullScreen = false,
}: PlacesMapProps) {
    const selectedPlace = places.find(
        (place) => place.id === selectedPlaceId,
    );

    return (
        <div
            className={`places-map ${
                fullScreen ? "places-map--fullscreen" : ""
            }`}
        >
            <MapContainer
                center={[44.85, -0.57]}
                zoom={8}
                scrollWheelZoom={false}
                className="places-map__container"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController
                    selectedPlace={selectedPlace}
                    selectedTown={selectedTown}
                />

                {places.map((place) => {
                    const isSelected = place.id === selectedPlaceId;

                    return (
                        <Marker
                            key={place.id}
                            position={[place.latitude, place.longitude]}
                            icon={createPlaceIcon(isSelected)}
                            eventHandlers={{
                                click: () => onPlaceClick(place.id),
                            }}
                        >
                            <Popup>
                                <div className="places-map__popup">
                                    <strong>{place.name}</strong>
                                    <span>{place.commune}</span>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default PlacesMap;
