import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { Place } from '../../../types/Place';
import './PlacesMap.scss';

interface PlacesMapProps {
    places: Place[];
    onPlaceClick: (placeId: string) => void;
}

function PlacesMap({ places, onPlaceClick }: PlacesMapProps) {
    return (
        <div className="places-map">
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

                {places.map((place) => (
                    <CircleMarker
                        key={place.id}
                        center={[place.latitude, place.longitude]}
                        radius={8}
                        pathOptions={{
                            color: '#315C49',
                            fillColor: '#A9BDA5',
                            fillOpacity: 1,
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
                ))}
            </MapContainer>
        </div>
    );
}

export default PlacesMap;