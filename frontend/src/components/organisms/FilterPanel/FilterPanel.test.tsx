
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import FilterPanel from "./FilterPanel";
import type { FilterSelection } from "./FilterPanel";

function ControlledFilterPanel({
    initialValue = { included: [], excluded: [] },
}: {
    initialValue?: FilterSelection;
}) {
    const [value, setValue] = useState<FilterSelection>(initialValue);

    return <FilterPanel value={value} onChange={setValue} />;
}

describe("FilterPanel", () => {
    it("displays the two filter sections", () => {
        render(<ControlledFilterPanel />);

        expect(screen.getByText("Ce que je recherche")).toBeInTheDocument();
        expect(screen.getByText("Ce que je souhaite éviter")).toBeInTheDocument();
    });

    it("displays the filter categories", () => {
        render(<ControlledFilterPanel />);

        expect(screen.getAllByText("Environnement")).toHaveLength(3);
        expect(screen.getAllByText("Chiens et réglementation")).toHaveLength(2);
        expect(screen.getAllByText("Risques et vigilance")).toHaveLength(2);
    });

    it("displays the environment options when its accordion is open", () => {
        render(<ControlledFilterPanel />);

        expect(screen.getByLabelText("Point d'eau")).toBeInTheDocument();
        expect(screen.getByLabelText("Forêt")).toBeInTheDocument();
    });

    it("displays a message when no filter is selected", () => {
        render(<ControlledFilterPanel />);

        expect(screen.getByText("Aucun filtre sélectionné.")).toBeInTheDocument();
    });

    it("allows a filter to be selected", () => {
        render(<ControlledFilterPanel />);

        fireEvent.click(screen.getByLabelText("Point d'eau"));

        expect(screen.getByLabelText("Retirer le filtre recherché : Point d'eau"))
            .toBeInTheDocument();
    });

    it("allows a selected filter to be removed using its badge", () => {
        render(
            <ControlledFilterPanel
                initialValue={{ included: ["water"], excluded: [] }}
            />
        );

        fireEvent.click(
            screen.getByLabelText("Retirer le filtre recherché : Point d'eau")
        );

        expect(screen.getByText("Aucun filtre sélectionné.")).toBeInTheDocument();
    });

    
it("allows a filter to be moved from included to excluded", () => {
    render(
        <ControlledFilterPanel
            initialValue={{ included: ["water"], excluded: [] }}
        />
    );

    const environmentAccordions = screen.getAllByRole("button", {
        name: /Environnement/,
    });

    fireEvent.click(environmentAccordions[1]);

    const waterCheckboxes = screen.getAllByLabelText("Point d'eau");

    fireEvent.click(waterCheckboxes[1]);

    expect(
        screen.getByLabelText("Retirer le filtre à éviter : Point d'eau")
    ).toBeInTheDocument();

    expect(
        screen.queryByLabelText("Retirer le filtre recherché : Point d'eau")
    ).not.toBeInTheDocument();
});

    it("calls onChange when a filter is selected", () => {
        const onChange = vi.fn();

        render(
            <FilterPanel
                value={{ included: [], excluded: [] }}
                onChange={onChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Point d'eau"));

        expect(onChange).toHaveBeenCalledWith({
            included: ["water"],
            excluded: [],
        });
    });

    it("does not allow interactions when disabled", () => {
        const onChange = vi.fn();

        render(
            <FilterPanel
                value={{ included: [], excluded: [] }}
                onChange={onChange}
                disabled
            />
        );

        expect(screen.getByLabelText("Point d'eau")).toBeDisabled();
    });
});
