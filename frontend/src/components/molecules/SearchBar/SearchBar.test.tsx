
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchBar from "./SearchBar";
import type { Commune } from "./SearchBar";

const communes: Commune[] = [
    { id: "canejan", name: "Canéjan", postalCodes: ["33610"] },
    { id: "merignac", name: "Mérignac", postalCodes: ["33700"] },
    { id: "pessac", name: "Pessac", postalCodes: ["33600"] },
    { id: "commune-1", name: "Commune A", postalCodes: ["33610"] },
];

const renderSearchBar = (
    selectedCommune: Commune | null = null,
    disabled = false
) => {
    const onSelect = vi.fn();
    const onClear = vi.fn();

    render(
        <SearchBar
            communes={communes}
            selectedCommune={selectedCommune}
            onSelect={onSelect}
            onClear={onClear}
            disabled={disabled}
        />
    );

    return { onSelect, onClear };
};

describe("SearchBar", () => {
    it("displays the search input", () => {
        renderSearchBar();

        expect(
            screen.getByLabelText("Commune ou code postal")
        ).toBeInTheDocument();
    });

    it("finds a commune by name", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "Mérignac" } }
        );

        expect(screen.getByRole("option", { name: /Mérignac/ }))
            .toBeInTheDocument();
    });

    it("finds a commune without accent", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "Canejan" } }
        );

        expect(screen.getByRole("option", { name: /Canéjan/ }))
            .toBeInTheDocument();
    });

    it("finds communes by postal code", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "33610" } }
        );

        expect(screen.getByRole("option", { name: /Canéjan/ }))
            .toBeInTheDocument();

        expect(screen.getByRole("option", { name: /Commune A/ }))
            .toBeInTheDocument();
    });

    it("displays a message when no commune matches", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "99999" } }
        );

        expect(
            screen.getByText("Aucune commune trouvée en Gironde.")
        ).toBeInTheDocument();
    });

    it("calls onSelect and clears the input when a suggestion is selected", () => {
        const { onSelect } = renderSearchBar();

        const input = screen.getByLabelText("Commune ou code postal");

        fireEvent.change(input, { target: { value: "Canéjan" } });
        fireEvent.click(screen.getByRole("option", { name: /Canéjan/ }));

        expect(onSelect).toHaveBeenCalledWith(communes[0]);
        expect(input).toHaveValue("");
    });

    it("selects the first suggestion when Enter is pressed", () => {
        const { onSelect } = renderSearchBar();

        const input = screen.getByLabelText("Commune ou code postal");

        fireEvent.change(input, { target: { value: "33610" } });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(onSelect).toHaveBeenCalledWith(communes[0]);
    });

    it("displays the selected commune as a badge", () => {
        renderSearchBar(communes[0]);

        expect(
            screen.getByText("Canéjan (33610)")
        ).toBeInTheDocument();
    });

    it("calls onClear when the selected commune is removed", () => {
        const { onClear } = renderSearchBar(communes[0]);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Supprimer la commune Canéjan",
            })
        );

        expect(onClear).toHaveBeenCalledTimes(1);
    });

    it("clears the search input when Escape is pressed", () => {
        renderSearchBar();

        const input = screen.getByLabelText("Commune ou code postal");

        fireEvent.change(input, { target: { value: "Canéjan" } });
        fireEvent.keyDown(input, { key: "Escape" });

        expect(input).toHaveValue("");
    });

    it("disables the input when the component is disabled", () => {
        renderSearchBar(null, true);

        expect(
            screen.getByLabelText("Commune ou code postal")
        ).toBeDisabled();
    });
});
