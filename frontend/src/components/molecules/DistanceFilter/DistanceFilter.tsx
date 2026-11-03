
import { Minus, Plus } from "lucide-react";
import "./DistanceFilter.scss";

interface DistanceFilterProps {
    distance: number;
    onChange: (distance: number) => void;
}

function DistanceFilter({ distance, onChange }: DistanceFilterProps) {
    const handleDecrease = () => {
        onChange(Math.max(5, distance - 5));
    };

    const handleIncrease = () => {
        onChange(Math.min(50, distance + 5));
    };

    return (
        <section
            className="distance-filter"
            aria-label="Filtre de distance"
        >
            <h2 className="distance-filter__title">
                Distance autour de la commune
            </h2>

            <div className="distance-filter__controls">
                <button
                    className="distance-filter__button"
                    type="button"
                    onClick={handleDecrease}
                    disabled={distance <= 5}
                    aria-label="Diminuer la distance"
                >
                    <Minus size={20} />
                </button>

                <output
                    className="distance-filter__value"
                    aria-live="polite"
                >
                    {distance} km
                </output>

                <button
                    className="distance-filter__button"
                    type="button"
                    onClick={handleIncrease}
                    disabled={distance >= 50}
                    aria-label="Augmenter la distance"
                >
                    <Plus size={20} />
                </button>
            </div>

            <p className="distance-filter__hint">
                Ajustez le rayon de recherche par paliers de 5 km.
            </p>
        </section>
    );
}

export default DistanceFilter;
