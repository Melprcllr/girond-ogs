
import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    X,
    MapPin,
    ParkingSquare,
    Images,
} from "lucide-react";
import type { Place } from "../../../types/Place";
import Badge from "../../atoms/Badge/Badge";

import "./PlaceBottomSheet.scss";

interface PlaceBottomSheetProps {
    place: Place;
    onClose: () => void;
}

type SheetState = "collapsed" | "intermediate" | "expanded";

function PlaceBottomSheet({
    place,
    onClose,
}: PlaceBottomSheetProps) {
    const [sheetState, setSheetState] =
        useState<SheetState>("collapsed");

    const [activePhotoIndex, setActivePhotoIndex] =
        useState<number | null>(null);

    // Main image first, followed by additional gallery images.
    const galleryImages = [
        place.imageUrl,
        ...(place.gallery ?? []),
    ].filter((image): image is string => Boolean(image));

    const showPreviousPhoto = () => {
        setActivePhotoIndex((current) =>
            current === null
                ? 0
                : (current - 1 + galleryImages.length) %
                galleryImages.length
        );
    };

    const showNextPhoto = () => {
        setActivePhotoIndex((current) =>
            current === null
                ? 0
                : (current + 1) % galleryImages.length
        );
    };

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

    const identifiedRisks = [
        {
            key: "processionaryCaterpillars",
            label: "Chenilles processionnaires",
        },
        { key: "farmAnimals", label: "Animaux d'élevage" },
        { key: "cyanobacteria", label: "Cyanobactéries" },
    ].filter(({ key }) => place.risks[key as keyof Place["risks"]]);

    const handleExpand = () => {
        setSheetState((current) => {
            if (current === "collapsed") return "intermediate";
            if (current === "intermediate") return "expanded";
            return "collapsed";
        });
    };

    return (
        <>
            <section
                className={`place-bottom-sheet place-bottom-sheet--${sheetState}`}
                aria-label={`Fiche du lieu ${place.name}`}
            >
                <div className="place-bottom-sheet__handle-area">
                    <button
                        type="button"
                        className="place-bottom-sheet__handle"
                        onClick={handleExpand}
                        aria-label={
                            sheetState === "expanded"
                                ? "Réduire la fiche"
                                : "Agrandir la fiche"
                        }
                    >
                        {sheetState === "expanded" ? (
                            <ChevronDown size={22} />
                        ) : (
                            <ChevronUp size={22} />
                        )}
                    </button>

                    <button
                        type="button"
                        className="place-bottom-sheet__close"
                        onClick={onClose}
                        aria-label="Fermer la fiche"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="place-bottom-sheet__summary">
                    {place.imageUrl && (
                        <img
                            className="place-bottom-sheet__thumbnail"
                            src={place.imageUrl}
                            alt={`Vue du lieu ${place.name}`}
                        />
                    )}

                    <div className="place-bottom-sheet__heading">
                        <h2 className="place-bottom-sheet__title">
                            {place.name}
                        </h2>

                        <p className="place-bottom-sheet__location">
                            {place.commune} · {place.postalCode}
                        </p>
                    </div>
                </div>

                {sheetState !== "collapsed" && (
                    <div className="place-bottom-sheet__content">
                        <p className="place-bottom-sheet__description">
                            {place.description}
                        </p>

                        {galleryImages.length > 1 && (
                            <button
                                type="button"
                                className="place-bottom-sheet__gallery-trigger"
                                onClick={() => setActivePhotoIndex(0)}
                            >
                                <Images size={18} aria-hidden="true" />
                                <span>
                                    Voir toutes les photos ({galleryImages.length})
                                </span>
                            </button>
                        )}

                        {activeCharacteristics.length > 0 && (
                            <div className="place-bottom-sheet__badges">
                                {activeCharacteristics.map(({ key, label }) => (
                                    <Badge
                                        key={key}
                                        variant="success"
                                        size="small"
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {place.parking.available !== null && (
                            <section
                                className="place-bottom-sheet__parking"
                                aria-label="Stationnement"
                            >
                                <h3 className="place-bottom-sheet__section-title">
                                    Stationnement
                                </h3>

                                <div className="place-bottom-sheet__parking-status">
                                    <ParkingSquare
                                        size={20}
                                        aria-hidden="true"
                                    />

                                    <span>
                                        {place.parking.available
                                            ? "Parking disponible"
                                            : "Aucun parking disponible"}
                                    </span>
                                </div>

                                {place.parking.available &&
                                    place.parking.address && (
                                        <p className="place-bottom-sheet__parking-info">
                                            <MapPin
                                                size={16}
                                                aria-hidden="true"
                                            />
                                            <span>
                                                {place.parking.address}
                                            </span>
                                        </p>
                                    )}

                                {place.parking.available &&
                                    place.parking.details && (
                                        <p className="place-bottom-sheet__parking-details">
                                            {place.parking.details}
                                        </p>
                                    )}
                            </section>
                        )}

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

                        {identifiedRisks.length > 0 && (
                            <div className="place-bottom-sheet__badges">
                                {identifiedRisks.map(({ key, label }) => (
                                    <Badge
                                        key={key}
                                        variant="warning"
                                        size="small"
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>

            {activePhotoIndex !== null && (
                <div
                    className="place-gallery"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Galerie photos de ${place.name}`}
                >
                    <button
                        type="button"
                        className="place-gallery__close"
                        onClick={() => setActivePhotoIndex(null)}
                        aria-label="Fermer la galerie"
                    >
                        <X size={26} />
                    </button>

                    <button
                        type="button"
                        className="place-gallery__navigation place-gallery__navigation--previous"
                        onClick={showPreviousPhoto}
                        aria-label="Photo précédente"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <img
                        className="place-gallery__image"
                        src={galleryImages[activePhotoIndex]}
                        alt={`${place.name} - photo ${activePhotoIndex + 1}`}
                    />

                    <button
                        type="button"
                        className="place-gallery__navigation place-gallery__navigation--next"
                        onClick={showNextPhoto}
                        aria-label="Photo suivante"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <p className="place-gallery__counter">
                        {activePhotoIndex + 1} / {galleryImages.length}
                    </p>
                </div>
            )}
        </>
    );
}

export default PlaceBottomSheet;
