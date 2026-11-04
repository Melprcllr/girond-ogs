
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DistanceFilter from "./DistanceFilter";

describe("DistanceFilter", () => {
    it("affiche la distance actuelle", () => {
        render(
            <DistanceFilter
                distance={5}
                onChange={vi.fn()}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        expect(screen.getByText("5 km")).toBeInTheDocument();
    });

    it("augmente la distance de 5 km", () => {
        const onChange = vi.fn();

        render(
            <DistanceFilter
                distance={5}
                onChange={onChange}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Augmenter la distance" })
        );

        expect(onChange).toHaveBeenCalledWith(10);
    });

    it("diminue la distance de 5 km", () => {
        const onChange = vi.fn();

        render(
            <DistanceFilter
                distance={15}
                onChange={onChange}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Diminuer la distance" })
        );

        expect(onChange).toHaveBeenCalledWith(10);
    });

    it("désactive le bouton diminuer à 5 km", () => {
        render(
            <DistanceFilter
                distance={5}
                onChange={vi.fn()}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: "Diminuer la distance" })
        ).toBeDisabled();
    });

    it("désactive le bouton augmenter à 50 km", () => {
        render(
            <DistanceFilter
                distance={50}
                onChange={vi.fn()}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: "Augmenter la distance" })
        ).toBeDisabled();
    });

    it("ne dépasse pas 50 km", () => {
        const onChange = vi.fn();

        render(
            <DistanceFilter
                distance={50}
                onChange={onChange}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Augmenter la distance" })
        );

        expect(onChange).not.toHaveBeenCalled();
    });

    it("ne descend pas sous 5 km", () => {
        const onChange = vi.fn();

        render(
            <DistanceFilter
                distance={5}
                onChange={onChange}
                hasSelectedCommune={true}
                onSearchCommune={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Diminuer la distance" })
        );

        expect(onChange).not.toHaveBeenCalled();
    });

    it("désactive les boutons lorsqu'aucune commune n'est sélectionnée", () => {
        render(
            <DistanceFilter
                distance={5}
                onChange={vi.fn()}
                hasSelectedCommune={false}
                onSearchCommune={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Diminuer la distance")).toBeDisabled();
        expect(screen.getByLabelText("Augmenter la distance")).toBeDisabled();
    });

    it("appelle onSearchCommune au clic sur le bouton de recherche", () => {
        const onSearchCommune = vi.fn();

        render(
            <DistanceFilter
                distance={5}
                onChange={vi.fn()}
                hasSelectedCommune={false}
                onSearchCommune={onSearchCommune}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: /rechercher une commune/i })
        );

        expect(onSearchCommune).toHaveBeenCalledTimes(1);
    });
});
