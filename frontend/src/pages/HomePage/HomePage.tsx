
import { useState } from "react";
import PlacesMap from "../../components/organisms/PlacesMap/PlacesMap";
import { demoPlaces } from "../../data/demoPlaces";
import {
    MapPin,
    Trees,
    ShieldAlert,
    ClipboardList,
} from "lucide-react";

import "./HomePage.scss";

function HomePage() {
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
        null
    );

    const handlePlaceClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

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

                <div className="home-page__place-sheet">
                    Fiche de lieu
                </div>
            </section>
        </main>
    );
}

export default HomePage;
