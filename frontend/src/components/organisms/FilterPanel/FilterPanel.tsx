
import { useState } from "react";
import CheckboxGroup from "../../molecules/CheckboxGroup/CheckboxGroup";
import FilterAccordion from "../../molecules/FilterAccordion/FilterAccordion";
import Badge from "../../atoms/Badge/Badge";
import type { CheckboxGroupOption } from "../../molecules/CheckboxGroup/CheckboxGroup";
import "./FilterPanel.scss";

export interface FilterSelection {
    included: string[];
    excluded: string[];
}

interface FilterCategory {
    id: string;
    title: string;
    options: CheckboxGroupOption[];
}

interface FilterPanelProps {
    value: FilterSelection;
    onChange: (selection: FilterSelection) => void;
    disabled?: boolean;
    className?: string;
}

const filterCategories: FilterCategory[] = [
    {
        id: "environment",
        title: "Environnement",
        options: [
            { label: "Vignes", value: "vineyards" },
            { label: "Forêt", value: "forest" },
            { label: "Plage", value: "beach" },
            { label: "Zones ombragées", value: "shaded-areas" },
            { label: "Point d'eau", value: "water" },
        ],
    },
    {
        id: "regulations",
        title: "Chiens et réglementation",
        options: [
            { label: "Chiens attachés", value: "dogs-on-leash" },
            { label: "Chiens interdits", value: "dogs-prohibited" },
        ],
    },
    {
        id: "risks",
        title: "Risques et vigilance",
        options: [
            { label: "Chenilles processionnaires", value: "processionary-caterpillars" },
            { label: "Animaux d'élevage", value: "farm-animals" },
            { label: "Cyanobactéries", value: "cyanobacteria" },
        ],
    },
];

function FilterPanel({
    value,
    onChange,
    disabled = false,
    className = "",
}: FilterPanelProps) {
    const [openCategories, setOpenCategories] = useState<string[]>([
        "environment",
    ]);

    const classes = ["filter-panel", className]
        .filter(Boolean)
        .join(" ");

    const toggleCategory = (categoryId: string) => {
        setOpenCategories((current) =>
            current.includes(categoryId)
                ? current.filter((id) => id !== categoryId)
                : [...current, categoryId]
        );
    };

    
const updateSelection = (
    category: FilterCategory,
    type: "included" | "excluded",
    selectedValues: string[]
) => {
    const categoryValues = category.options.map((option) => option.value);

    if (type === "included") {
        onChange({
            included: [
                ...value.included.filter(
                    (item) => !categoryValues.includes(item)
                ),
                ...selectedValues,
            ],
            excluded: value.excluded.filter(
                (item) => !selectedValues.includes(item)
            ),
        });
    } else {
        onChange({
            included: value.included.filter(
                (item) => !selectedValues.includes(item)
            ),
            excluded: [
                ...value.excluded.filter(
                    (item) => !categoryValues.includes(item)
                ),
                ...selectedValues,
            ],
        });
    }
};

    const getOptionLabel = (valueToFind: string) => {
        return filterCategories
            .flatMap((category) => category.options)
            .find((option) => option.value === valueToFind)?.label
            ?? valueToFind;
    };

    const removeFilter = (
        filterValue: string,
        type: "included" | "excluded"
    ) => {
        onChange({
            ...value,
            [type]: value[type].filter((item) => item !== filterValue),
        });
    };

    const activeCount = value.included.length + value.excluded.length;

    return (
        <div className={classes}>
            <div className="filter-panel__selected">
                <h3 className="filter-panel__selected-title">
                    Filtres sélectionnés
                </h3>

                {activeCount === 0 ? (
                    <p className="filter-panel__empty">
                        Aucun filtre sélectionné.
                    </p>
                ) : (
                    <div className="filter-panel__badges">
                        {value.included.map((filterValue) => (
                            <button
                                key={`included-${filterValue}`}
                                type="button"
                                className="filter-panel__badge-button"
                                onClick={() => removeFilter(filterValue, "included")}
                                disabled={disabled}
                                aria-label={`Retirer le filtre recherché : ${getOptionLabel(filterValue)}`}
                            >
                                <Badge variant="success" size="medium">
                                    {getOptionLabel(filterValue)} ×
                                </Badge>
                            </button>
                        ))}

                        {value.excluded.map((filterValue) => (
                            <button
                                key={`excluded-${filterValue}`}
                                type="button"
                                className="filter-panel__badge-button"
                                onClick={() => removeFilter(filterValue, "excluded")}
                                disabled={disabled}
                                aria-label={`Retirer le filtre à éviter : ${getOptionLabel(filterValue)}`}
                            >
                                <Badge variant="warning" size="medium">
                                    À éviter : {getOptionLabel(filterValue)} ×
                                </Badge>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="filter-panel__group">
                <h3 className="filter-panel__group-title">
                    Ce que je recherche
                </h3>
                <p className="filter-panel__description">
                    Les lieux doivent présenter toutes les caractéristiques
                    sélectionnées.
                </p>

                {filterCategories.map((category) => (
                    <FilterAccordion
                        key={category.id}
                        title={category.title}
                        isOpen={openCategories.includes(category.id)}
                        onToggle={() => toggleCategory(category.id)}
                        activeCount={value.included.filter((item) =>
                            category.options.some((option) => option.value === item)
                        ).length}
                    >
                        <CheckboxGroup
                            label={category.title}
                            name={`included-${category.id}`}
                            options={category.options}
                            value={value.included.filter((item) =>
                                category.options.some((option) => option.value === item)
                            )}
                            onChange={(selectedValues) =>
                                updateSelection(category, "included", selectedValues)
                            }
                            disabled={disabled}
                        />
                    </FilterAccordion>
                ))}
            </div>

            <div className="filter-panel__group">
                <h3 className="filter-panel__group-title">
                    Ce que je souhaite éviter
                </h3>
                <p className="filter-panel__description">
                    Les lieux ne doivent présenter aucune des caractéristiques
                    sélectionnées.
                </p>

                {filterCategories.map((category) => (
                    <FilterAccordion
                        key={`excluded-${category.id}`}
                        title={category.title}
                        isOpen={openCategories.includes(`excluded-${category.id}`)}
                        onToggle={() => toggleCategory(`excluded-${category.id}`)}
                        activeCount={value.excluded.filter((item) =>
                            category.options.some((option) => option.value === item)
                        ).length}
                    >
                        <CheckboxGroup
                            label={category.title}
                            name={`excluded-${category.id}`}
                            options={category.options}
                            value={value.excluded.filter((item) =>
                                category.options.some((option) => option.value === item)
                            )}
                            onChange={(selectedValues) =>
                                updateSelection(category, "excluded", selectedValues)
                            }
                            disabled={disabled}
                        />
                    </FilterAccordion>
                ))}
            </div>
        </div>
    );
}

export default FilterPanel;
