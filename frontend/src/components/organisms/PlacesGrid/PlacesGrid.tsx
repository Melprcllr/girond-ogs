import type { Place } from "../../../types/Place";
import PlaceCard from "../PlaceCard/PlaceCard";
import "./PlacesGrid.scss";

interface PlacesGridProps {
    places: Place[];
    favoriteIds: string[];
    onToggleFavorite: (placeId: string) => void;
    onPlaceClick: (placeId: string) => void;
    selectedPlaceId?: string | null;
    emptyMessage?: string;
}

function PlacesGrid({
    places,
    favoriteIds,
    onToggleFavorite,
    onPlaceClick,
    selectedPlaceId = null,
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
                <div
                    key={place.id}
                    className={`places-grid__item ${place.id === selectedPlaceId
                            ? "places-grid__item--selected"
                            : ""
                        }`}
                >
                    <PlaceCard
                        place={place}
                        isFavorite={favoriteIds.includes(place.id)}
                        onToggleFavorite={onToggleFavorite}
                        onClick={onPlaceClick}
                    />
                </div>
            ))}
        </div>
    );
}

export default PlacesGrid;