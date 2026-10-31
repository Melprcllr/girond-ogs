
import type { Place } from "../../../types/Place";
import Badge from "../../atoms/Badge/Badge";
import Button from "../../atoms/Button/Button";
import "./PlaceCard.scss";

interface PlaceCardProps {
    place: Place;
    isFavorite: boolean;
    onToggleFavorite: (placeId: string) => void;
    onClick: (placeId: string) => void;
    className?: string;
}

function PlaceCard({
    place,
    isFavorite,
    onToggleFavorite,
    onClick,
    className = "",
}: PlaceCardProps) {
    const classes = ["place-card", className]
        .filter(Boolean)
        .join(" ");

    const characteristics = [
        { key: "vineyards", label: "Vignes" },
        { key: "forest", label: "Forêt" },
        { key: "beach", label: "Plage" },
        { key: "shadedAreas", label: "Ombragé" },
        { key: "water", label: "Point d'eau" },
    ] as const;

    const activeCharacteristics = characteristics.filter(
        ({ key }) => place.characteristics[key]
    );

    const activeRisks = [
        {
            key: "processionaryCaterpillars",
            label: "Chenilles processionnaires",
        },
        { key: "farmAnimals", label: "Animaux d'élevage" },
        { key: "cyanobacteria", label: "Cyanobactéries" },
    ] as const;

    const identifiedRisks = activeRisks.filter(
        ({ key }) => place.risks[key]
    );

    return (
        <article className={classes}>
            <div className="place-card__image-container">
                <img
                    className="place-card__image"
                    src={place.imageUrl}
                    alt={`Vue du lieu ${place.name}`}
                    loading="lazy"
                />

                <Button
                    variant="secondary"
                    size="small"
                    className="place-card__favorite"
                    onClick={() => onToggleFavorite(place.id)}
                    aria-label={
                        isFavorite
                            ? `Retirer ${place.name} des favoris`
                            : `Ajouter ${place.name} aux favoris`
                    }
                    aria-pressed={isFavorite}
                >
                    <span aria-hidden="true">
                        {isFavorite ? "♥" : "♡"}
                    </span>
                </Button>
            </div>

            <button
                type="button"
                className="place-card__content"
                onClick={() => onClick(place.id)}
                aria-label={`Voir les détails de ${place.name}`}
            >
                <div className="place-card__heading">
                    <h3 className="place-card__title">
                        {place.name}
                    </h3>

                    <p className="place-card__location">
                        {place.commune} · {place.postalCode}
                    </p>
                </div>

                <p className="place-card__description">
                    {place.description}
                </p>

                {activeCharacteristics.length > 0 && (
                    <div className="place-card__badges">
                        {activeCharacteristics.map(({ key, label }) => (
                            <Badge key={key} variant="success" size="small">
                                {label}
                            </Badge>
                        ))}
                    </div>
                )}

                {(place.regulations.dogsOnLeash ||
                    place.regulations.dogsProhibited) && (
                    <div className="place-card__badges">
                        {place.regulations.dogsOnLeash && (
                            <Badge variant="warning" size="small">
                                Chiens attachés
                            </Badge>
                        )}

                        {place.regulations.dogsProhibited && (
                            <Badge variant="danger" size="small">
                                Chiens interdits
                            </Badge>
                        )}
                    </div>
                )}

                {identifiedRisks.length > 0 && (
                    <div className="place-card__badges">
                        {identifiedRisks.map(({ key, label }) => (
                            <Badge key={key} variant="warning" size="small">
                                {label}
                            </Badge>
                        ))}
                    </div>
                )}

                <span className="place-card__details">
                    Voir le lieu
                    <span aria-hidden="true"> →</span>
                </span>
            </button>
        </article>
    );
}

export default PlaceCard;
