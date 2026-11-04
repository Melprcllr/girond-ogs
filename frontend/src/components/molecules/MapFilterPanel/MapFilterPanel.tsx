
import { RotateCcw } from "lucide-react";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import type { CheckboxGroupOption } from "../CheckboxGroup/CheckboxGroup";
import "./MapFilterPanel.scss";

interface MapFilterPanelProps {
    title: string;
    name: string;
    options: CheckboxGroupOption[];
    value: string[];
    onChange: (value: string[]) => void;
}

function MapFilterPanel({
    title,
    name,
    options,
    value,
    onChange,
}: MapFilterPanelProps) {
    const handleReset = () => {
        onChange([]);
    };

    return (
        <section
            className="map-filter-panel"
            aria-label={title}
        >
            <div className="map-filter-panel__header">
                <h2 className="map-filter-panel__title">
                    {title}
                </h2>

                {value.length > 0 && (
                    <button
                        className="map-filter-panel__reset"
                        type="button"
                        onClick={handleReset}
                        aria-label={`Réinitialiser les filtres : ${title}`}
                        title="Réinitialiser les filtres"
                    >
                        <RotateCcw size={18} />
                    </button>
                )}
            </div>

            <CheckboxGroup
                label={title}
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                className="map-filter-panel__checkbox-group"
            />
        </section>
    );
}

export default MapFilterPanel;
