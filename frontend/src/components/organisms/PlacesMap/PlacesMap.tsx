import { useEffect } from 'react';
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
    useMap,
} from 'react-leaflet';
import type { Place } from '../../../types/Place';
import './PlacesMap.scss';

interface PlacesMapProps {
    places: Place[];
    onPlaceClick: (placeId: string) => void;
    selectedPlaceId?: string | null;
    fullScreen?: boolean;
}

interface MapControllerProps {
    selectedPlace: Place | undefined;
}

// Gère le déplacement et le zoom de la carte
function MapController({ selectedPlace }: MapControllerProps) {
    const map = useMap();

    useEffect(() => {
        if (selectedPlace) {
            map.setView(
                [selectedPlace.latitude, selectedPlace.longitude],
                12,
                { animate: true },
            );
        }
    }, [selectedPlace, map]);

    return null;
}

function PlacesMap({
    places,
    onPlaceClick,
    selectedPlaceId = null,
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
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController selectedPlace={selectedPlace} />

                {places.map((place) => {
                    const isSelected = place.id === selectedPlaceId;

                    return (
                        <CircleMarker
                            key={place.id}
                            center={[place.latitude, place.longitude]}
                            radius={isSelected ? 12 : 8}
                            pathOptions={{
                                color: isSelected ? '#D98758' : '#315C49',
                                fillColor: isSelected ? '#D98758' : '#A9BDA5',
                                fillOpacity: 1,
                                weight: isSelected ? 3 : 1,
                            }}
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
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default PlacesMap;