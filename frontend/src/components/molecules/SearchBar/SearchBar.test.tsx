
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchBar from "./SearchBar";
import type { Town } from "../../../data/towns";

const towns: Town[] = [
    {
        id: "canejan",
        name: "Canéjan",
        postalCodes: ["33610"],
        latitude: 44.763,
        longitude: -0.653,
    },
    {
        id: "merignac",
        name: "Mérignac",
        postalCodes: ["33700"],
        latitude: 44.842,
        longitude: -0.645,
    },
    {
        id: "pessac",
        name: "Pessac",
        postalCodes: ["33600"],
        latitude: 44.806,
        longitude: -0.631,
    },
    {
        id: "commune-1",
        name: "Commune A",
        postalCodes: ["33610"],
        latitude: 44.75,
        longitude: -0.65,
    },
];

const renderSearchBar = (
    selectedTown: Town | null = null,
    disabled = false
) => {
    const onSelect = vi.fn();
    const onClear = vi.fn();

    render(
        <SearchBar
            towns={towns}
            selectedTown={selectedTown}
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

    it("finds a town by name", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "Mérignac" } }
        );

        expect(
            screen.getByRole("option", { name: /Mérignac/ })
        ).toBeInTheDocument();
    });

    it("finds a town without accent", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "Canejan" } }
        );

        expect(
            screen.getByRole("option", { name: /Canéjan/ })
        ).toBeInTheDocument();
    });

    it("finds towns by postal code", () => {
        renderSearchBar();

        fireEvent.change(
            screen.getByLabelText("Commune ou code postal"),
            { target: { value: "33610" } }
        );

        expect(
            screen.getByRole("option", { name: /Canéjan/ })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: /Commune A/ })
        ).toBeInTheDocument();
    });

    it("displays a message when no town matches", () => {
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
        fireEvent.click(
            screen.getByRole("option", { name: /Canéjan/ })
        );

        expect(onSelect).toHaveBeenCalledWith(towns[0]);
        expect(input).toHaveValue("");
    });

    it("selects the first suggestion when Enter is pressed", () => {
        const { onSelect } = renderSearchBar();

        const input = screen.getByLabelText("Commune ou code postal");

        fireEvent.change(input, { target: { value: "33610" } });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(onSelect).toHaveBeenCalledWith(towns[0]);
    });

    it("displays the selected town as a badge", () => {
        renderSearchBar(towns[0]);

        expect(
            screen.getByText("Canéjan (33610)")
        ).toBeInTheDocument();
    });

    it("calls onClear when the selected town is removed", () => {
        const { onClear } = renderSearchBar(towns[0]);

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