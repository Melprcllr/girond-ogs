
import { useEffect, useRef, useState } from "react";
import PlacesMap from "../../components/organisms/PlacesMap/PlacesMap";
import MapFilterPanel from "../../components/molecules/MapFilterPanel/MapFilterPanel";
import { demoPlaces } from "../../data/demoPlaces";
import {
    MapPin,
    Trees,
    ShieldAlert,
    ClipboardList,
} from "lucide-react";

import "./HomePage.scss";

const environmentOptions = [
    { label: "Vignes", value: "vineyards" },
    { label: "Forêt", value: "forest" },
    { label: "Plage", value: "beach" },
    { label: "Zones ombragées", value: "shadedAreas" },
    { label: "Point d'eau", value: "water" },
];

function HomePage() {
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
        null
    );

    const [isEnvironmentFilterOpen, setIsEnvironmentFilterOpen] =
        useState(false);

    const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(
        []
    );

    const filterAreaRef = useRef<HTMLDivElement>(null);

    const handlePlaceClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

    const handleEnvironmentFilterToggle = () => {
        setIsEnvironmentFilterOpen((previousState) => !previousState);
    };

    useEffect(() => {
        if (!isEnvironmentFilterOpen) {
            return;
        }

        const handleClickOutside = (event: PointerEvent) => {
            if (
                filterAreaRef.current &&
                !filterAreaRef.current.contains(event.target as Node)
            ) {
                setIsEnvironmentFilterOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isEnvironmentFilterOpen]);

    return (
        <main className="home-page">
            <header className="home-page__header">
                <div className="home-page__search">
                    Recherche
                </div>

                <button
                    className="home-page__menu-button"
                    type="button"
                    aria-label="Ouvrir le menu"
                >
                    ☰
                </button>
            </header>

            <section className="home-page__map">
                <PlacesMap
                    places={demoPlaces}
                    onPlaceClick={handlePlaceClick}
                    selectedPlaceId={selectedPlaceId}
                    fullScreen
                />

                <div
                    className="home-page__filter-area"
                    ref={filterAreaRef}
                >
                    {isEnvironmentFilterOpen && (
                        <div className="home-page__filter-panel">
                            <MapFilterPanel
                                title="Environnement"
                                name="environment"
                                options={environmentOptions}
                                value={selectedEnvironments}
                                onChange={setSelectedEnvironments}
                            />
                        </div>
                    )}

                    <div className="home-page__filters">
                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer par distance"
                            title="Distance"
                        >
                            <MapPin size={22} strokeWidth={1.8} />
                        </button>

                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer par environnement"
                            title="Environnement"
                            aria-expanded={isEnvironmentFilterOpen}
                            aria-controls="environment-filter-panel"
                            onClick={handleEnvironmentFilterToggle}
                        >
                            <Trees size={22} strokeWidth={1.8} />
                        </button>

                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer les risques à éviter"
                            title="À éviter"
                        >
                            <ShieldAlert size={22} strokeWidth={1.8} />
                        </button>

                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer par réglementation"
                            title="Réglementation"
                        >
                            <ClipboardList size={22} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>

                <div className="home-page__place-sheet">
                    Fiche de lieu
                </div>
            </section>
        </main>
    );
}

export default HomePage;
