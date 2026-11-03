
import { useEffect, useRef, useState } from "react";
import PlacesMap from "../../components/organisms/PlacesMap/PlacesMap";
import MapFilterPanel from "../../components/molecules/MapFilterPanel/MapFilterPanel";
import DistanceFilter from "../../components/molecules/DistanceFilter/DistanceFilter";
import { demoPlaces } from "../../data/demoPlaces";
import {
    MapPin,
    Trees,
    ShieldAlert,
    ClipboardList,
} from "lucide-react";

import "./HomePage.scss";

type FilterType = "distance" | "environment" | "risks" | "regulations";

const environmentOptions = [
    { label: "Vignes", value: "vineyards" },
    { label: "Forêt", value: "forest" },
    { label: "Plage", value: "beach" },
    { label: "Zones ombragées", value: "shadedAreas" },
    { label: "Point d'eau", value: "water" },
];

const riskOptions = [
    {
        label: "Chenilles processionnaires",
        value: "processionaryCaterpillars",
    },
    {
        label: "Animaux d'élevage",
        value: "farmAnimals",
    },
    {
        label: "Risque de cyanobactéries",
        value: "cyanobacteria",
    },
];

function HomePage() {
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
        null
    );

    const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

    const [distance, setDistance] = useState(5);

    const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(
        []
    );

    const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

    const filterAreaRef = useRef<HTMLDivElement>(null);

    const handlePlaceClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

    const handleFilterToggle = (filter: FilterType) => {
        setActiveFilter((currentFilter) =>
            currentFilter === filter ? null : filter
        );
    };

    useEffect(() => {
        if (!activeFilter) {
            return;
        }

        const handleClickOutside = (event: PointerEvent) => {
            if (
                filterAreaRef.current &&
                !filterAreaRef.current.contains(event.target as Node)
            ) {
                setActiveFilter(null);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [activeFilter]);

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
                    {activeFilter === "distance" && (
                        <div
                            id="distance-filter-panel"
                            className="home-page__filter-panel"
                        >
                            <DistanceFilter
                                distance={distance}
                                onChange={setDistance}
                            />
                        </div>
                    )}

                    {activeFilter === "environment" && (
                        <div
                            id="environment-filter-panel"
                            className="home-page__filter-panel"
                        >
                            <MapFilterPanel
                                title="Environnement"
                                name="environment"
                                options={environmentOptions}
                                value={selectedEnvironments}
                                onChange={setSelectedEnvironments}
                            />
                        </div>
                    )}

                    {activeFilter === "risks" && (
                        <div
                            id="risks-filter-panel"
                            className="home-page__filter-panel"
                        >
                            <MapFilterPanel
                                title="À éviter"
                                name="risks"
                                options={riskOptions}
                                value={selectedRisks}
                                onChange={setSelectedRisks}
                            />
                        </div>
                    )}

                    <div className="home-page__filters">
                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer par distance"
                            title="Distance"
                            aria-expanded={activeFilter === "distance"}
                            aria-controls="distance-filter-panel"
                            onClick={() => handleFilterToggle("distance")}
                        >
                            <MapPin size={22} strokeWidth={1.8} />
                        </button>

                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer par environnement"
                            title="Environnement"
                            aria-expanded={activeFilter === "environment"}
                            aria-controls="environment-filter-panel"
                            onClick={() => handleFilterToggle("environment")}
                        >
                            <Trees size={22} strokeWidth={1.8} />
                        </button>

                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer les risques à éviter"
                            title="À éviter"
                            aria-expanded={activeFilter === "risks"}
                            aria-controls="risks-filter-panel"
                            onClick={() => handleFilterToggle("risks")}
                        >
                            <ShieldAlert size={22} strokeWidth={1.8} />
                        </button>

                        <button
                            className="home-page__filter-button"
                            type="button"
                            aria-label="Filtrer par réglementation"
                            title="Réglementation"
                            aria-expanded={activeFilter === "regulations"}
                            aria-controls="regulations-filter-panel"
                            onClick={() => handleFilterToggle("regulations")}
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
