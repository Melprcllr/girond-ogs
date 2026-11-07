
import { useEffect, useMemo, useRef, useState } from "react";
import PlacesMap from "../../components/organisms/PlacesMap/PlacesMap";
import MapFilterPanel from "../../components/molecules/MapFilterPanel/MapFilterPanel";
import DistanceFilter from "../../components/molecules/DistanceFilter/DistanceFilter";
import PlaceBottomSheet from "../../components/organisms/PlaceBottomSheet/PlaceBottomSheet";

import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import { towns } from "../../data/towns";
import type { Town } from "../../data/towns";

import { places } from "../../data/places";
import {
    MapPin,
    Trees,
    ShieldAlert,
    ClipboardList
} from "lucide-react";

import type { Place } from "../../types/Place";
import { filterPlaces } from "../../utils/filterPlaces";
import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";

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
    {
        label: "Présence de pins",
        value: "pineTrees",
    },
];

const regulationOptions = [
    {
        label: "Chiens attachés",
        value: "dogsOnLeash",
    },
    {
        label: "Chiens interdits",
        value: "dogsProhibited",
    },
];

function HomePage() {
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
        null
    );

    const [selectedTown, setSelectedTown] = useState<Town | null>(null);

    const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

    const [distance, setDistance] = useState(5);

    const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(
        []
    );

    const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

    const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);

    const filteredPlaces = useMemo(() => {
        return filterPlaces(places, {
            environments: selectedEnvironments as (keyof Place["characteristics"])[],
            risks: selectedRisks.filter(
                (risk): risk is keyof Place["risks"] => risk !== "pineTrees",
            ),
            regulations: selectedRegulations as (keyof Place["regulations"])[],
            avoidPineTrees: selectedRisks.includes("pineTrees"),

            center: selectedTown
                ? {
                    latitude: selectedTown.latitude,
                    longitude: selectedTown.longitude,
                }
                : undefined,

            maxDistanceKm: distance,
        });
    }, [
        selectedEnvironments,
        selectedRisks,
        selectedRegulations,
        selectedTown,
        distance,
    ]);

    const filterAreaRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const handlePlaceClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

    const handleFilterToggle = (filter: FilterType) => {
        setActiveFilter((currentFilter) =>
            currentFilter === filter ? null : filter
        );
    };

    const handleSearchCommune = () => {
        setActiveFilter(null);

        searchRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        searchRef.current?.querySelector("input")?.focus();
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

    const selectedPlace = filteredPlaces.find(
        (place) => place.id === selectedPlaceId
    );

    useEffect(() => {
        if (
            selectedPlaceId &&
            !filteredPlaces.some((place) => place.id === selectedPlaceId)
        ) {
            setSelectedPlaceId(null);
        }
    }, [filteredPlaces, selectedPlaceId]);

    return (
        <main className="home-page">
            <header className="home-page__header">
                <div
                    ref={searchRef}
                    className="home-page__search"
                >
                    <SearchBar
                        towns={towns}
                        selectedTown={selectedTown}
                        onSelect={(town) => {
                            setSelectedTown(town);
                            setDistance(5);
                            setSelectedPlaceId(null);
                            setActiveFilter(null);
                        }}
                        onClear={() => setSelectedTown(null)}
                    />
                </div>

                <SiteNavigation />
            </header>

            <section className="home-page__map">
                <PlacesMap
                    places={filteredPlaces}
                    onPlaceClick={handlePlaceClick}
                    selectedPlaceId={selectedPlaceId}
                    selectedTown={selectedTown}
                    distance={distance}
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
                                hasSelectedCommune={selectedTown !== null}
                                onSearchCommune={handleSearchCommune}
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

                    {activeFilter === "regulations" && (
                        <div
                            id="regulations-filter-panel"
                            className="home-page__filter-panel"
                        >
                            <MapFilterPanel
                                title="Réglementation"
                                name="regulations"
                                options={regulationOptions}
                                value={selectedRegulations}
                                onChange={setSelectedRegulations}
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

                {selectedPlace && (
                    <PlaceBottomSheet
                        place={selectedPlace}
                        onClose={() => setSelectedPlaceId(null)}
                    />
                )}
            </section>
        </main>
    );
}

export default HomePage;
