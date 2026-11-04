
import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import type { Town } from "../../../data/towns";

import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";

import "./SearchBar.scss";

interface SearchBarProps {
    towns: Town[];
    selectedTown: Town | null;
    onSelect: (town: Town) => void;
    onClear: () => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

function normalizeText(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function SearchBar({
    towns,
    selectedTown,
    onSelect,
    onClear,
    disabled = false,
    placeholder = "Rechercher une commune ou un code postal...",
    className = "",
}: SearchBarProps) {
    const [query, setQuery] = useState("");

    const suggestions = useMemo(() => {
        const normalizedQuery = normalizeText(query);

        if (!normalizedQuery) {
            return [];
        }

        return towns.filter((town) => {
            const matchesName = normalizeText(town.name)
                .includes(normalizedQuery);

            const matchesPostalCode = town.postalCodes.some((code) =>
                code.includes(normalizedQuery)
            );

            return matchesName || matchesPostalCode;
        });
    }, [towns, query]);

    const handleSelect = (town: Town) => {
        onSelect(town);
        setQuery("");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            setQuery("");
        }

        if (event.key === "Enter" && suggestions.length > 0) {
            event.preventDefault();
            handleSelect(suggestions[0]);
        }
    };

    const classes = ["search-bar", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes}>
            <div className="search-bar__input-wrapper">
                <Input
                    label="Commune ou code postal"
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded={query.trim().length > 0}
                    aria-controls="town-suggestions"
                />

                {query && (
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => setQuery("")}
                        disabled={disabled}
                        aria-label="Effacer la recherche"
                    >
                        Effacer
                    </Button>
                )}
            </div>

            {query.trim() && (
                <ul
                    id="town-suggestions"
                    className="search-bar__suggestions"
                    role="listbox"
                    aria-label="Communes proposées"
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((town) => (
                            <li key={town.id} role="none">
                                <Button
                                    variant="tertiary"
                                    fullWidth
                                    role="option"
                                    aria-selected={false}
                                    onClick={() => handleSelect(town)}
                                    disabled={disabled}
                                >
                                    <span className="search-bar__suggestion">
                                        <span>{town.name}</span>
                                        <span className="search-bar__postal-code">
                                            {town.postalCodes.join(", ")}
                                        </span>
                                    </span>
                                </Button>
                            </li>
                        ))
                    ) : (
                        <li className="search-bar__empty" role="status">
                            Aucune commune trouvée en Gironde.
                        </li>
                    )}
                </ul>
            )}

            {selectedTown && (
                <div className="search-bar__selection">
                    <Badge variant="success" size="medium">
                        {selectedTown.name} ({selectedTown.postalCodes.join(", ")})
                    </Badge>

                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={onClear}
                        disabled={disabled}
                        aria-label={`Supprimer la commune ${selectedTown.name}`}
                    >
                        ×
                    </Button>
                </div>
            )}
        </div>
    );
}

export default SearchBar;