
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
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
                <img
                    className="place-bottom-sheet__thumbnail"
                    src={place.imageUrl}
                    alt={`Vue du lieu ${place.name}`}
                />

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

                    {activeCharacteristics.length > 0 && (
                        <div className="place-bottom-sheet__badges">
                            {activeCharacteristics.map(({ key, label }) => (
                                <Badge key={key} variant="success" size="small">
                                    {label}
                                </Badge>
                            ))}
                        </div>
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
                                <Badge key={key} variant="warning" size="small">
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export default PlaceBottomSheet;
