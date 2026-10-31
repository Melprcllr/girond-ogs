
import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Badge from "../../atoms/Badge/Badge";

import "./SearchBar.scss";

export interface Commune {
    id: string;
    name: string;
    postalCodes: string[];
}

interface SearchBarProps {
    communes: Commune[];
    selectedCommune: Commune | null;
    onSelect: (commune: Commune) => void;
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
    communes,
    selectedCommune,
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

        return communes.filter((commune) => {
            const matchesName = normalizeText(commune.name)
                .includes(normalizedQuery);

            const matchesPostalCode = commune.postalCodes.some((code) =>
                code.includes(normalizedQuery)
            );

            return matchesName || matchesPostalCode;
        });
    }, [communes, query]);

    const handleSelect = (commune: Commune) => {
        onSelect(commune);
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
                    aria-controls="commune-suggestions"
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
                    id="commune-suggestions"
                    className="search-bar__suggestions"
                    role="listbox"
                    aria-label="Communes proposées"
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((commune) => (
                            <li key={commune.id} role="none">
                                <Button
                                    variant="tertiary"
                                    fullWidth
                                    role="option"
                                    aria-selected={false}
                                    onClick={() => handleSelect(commune)}
                                    disabled={disabled}
                                >
                                    <span className="search-bar__suggestion">
                                        <span>{commune.name}</span>
                                        <span className="search-bar__postal-code">
                                            {commune.postalCodes.join(", ")}
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

            {selectedCommune && (
                <div className="search-bar__selection">
                    <Badge variant="success" size="medium">
                        {selectedCommune.name} ({selectedCommune.postalCodes.join(", ")})
                    </Badge>

                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={onClear}
                        disabled={disabled}
                        aria-label={`Supprimer la commune ${selectedCommune.name}`}
                    >
                        ×
                    </Button>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
