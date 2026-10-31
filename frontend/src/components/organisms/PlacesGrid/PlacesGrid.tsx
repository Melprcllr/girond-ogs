
import type { Place } from "../../../types/Place";
import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlacesGrid.scss";

interface PlacesGridProps {
    places: Place[];
    favoriteIds: string[];
    onToggleFavorite: (placeId: string) => void;
    onPlaceClick: (placeId: string) => void;
    emptyMessage?: string;
}

function PlacesGrid({
    places,
    favoriteIds,
    onToggleFavorite,
    onPlaceClick,
    emptyMessage = "Aucun lieu ne correspond à votre recherche.",
}: PlacesGridProps) {
    if (places.length === 0) {
        return (
            <p className="places-grid__empty" role="status">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className="places-grid">
            {places.map((place) => (
                <PlaceCard
                    key={place.id}
                    place={place}
                    isFavorite={favoriteIds.includes(place.id)}
                    onToggleFavorite={onToggleFavorite}
                    onClick={onPlaceClick}
                />
            ))}
        </div>
    );
}

export default PlacesGrid;
