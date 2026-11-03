
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
    return (
        <section
        id="environment-filter-panel"
        className="map-filter-panel"
        aria-label={title}
        >
            <CheckboxGroup
                label={title}
                name={name}
                options={options}
                value={value}
                onChange={onChange}
            />
        </section>
    );
}

export default MapFilterPanel;
