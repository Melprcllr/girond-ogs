
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlaceBottomSheet from "./PlaceBottomSheet";
import type { Place } from "../../../types/Place";

const mockPlace: Place = {
    id: "lac-lacanau",
    name: "Lac de Lacanau",
    commune: "Lacanau",
    postalCode: "33680",
    description: "Un joli lac entouré de nature.",
    imageUrl: "/images/demo-lac.jpg",
    latitude: 44.988,
    longitude: -1.085,
    characteristics: {
        vineyards: false,
        forest: true,
        beach: false,
        shadedAreas: true,
        water: true,
        pineTrees: true,
    },
    regulations: {
        dogsOnLeash: true,
        dogsProhibited: false,
    },
    risks: {
        processionaryCaterpillars: true,
        farmAnimals: false,
        cyanobacteria: false,
    },
};

describe("PlaceBottomSheet", () => {
    it("affiche les informations principales du lieu à l'ouverture", () => {
        render(
            <PlaceBottomSheet place={mockPlace} onClose={vi.fn()} />
        );

        expect(screen.getByText("Lac de Lacanau")).toBeInTheDocument();
        expect(screen.getByText("Lacanau · 33680")).toBeInTheDocument();
        expect(
            screen.getByRole("img", {
                name: "Vue du lieu Lac de Lacanau",
            })
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Un joli lac entouré de nature.")
        ).not.toBeInTheDocument();
    });

    it("passe de l'état réduit à l'état intermédiaire", () => {
        render(
            <PlaceBottomSheet place={mockPlace} onClose={vi.fn()} />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            screen.getByText("Un joli lac entouré de nature.")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Forêt")
        ).toBeInTheDocument();
    });

    it("passe de l'état intermédiaire à l'état déployé", () => {
        const { container } = render(
            <PlaceBottomSheet place={mockPlace} onClose={vi.fn()} />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            container.querySelector(".place-bottom-sheet--expanded")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Réduire la fiche" })
        ).toBeInTheDocument();
    });

    it("revient à l'état réduit après un troisième clic", () => {
        const { container } = render(
            <PlaceBottomSheet place={mockPlace} onClose={vi.fn()} />
        );

        const expandButton = () =>
            screen.getByRole("button", { name: "Agrandir la fiche" });

        fireEvent.click(expandButton());
        fireEvent.click(expandButton());

        fireEvent.click(
            screen.getByRole("button", { name: "Réduire la fiche" })
        );

        expect(
            container.querySelector(".place-bottom-sheet--collapsed")
        ).toBeInTheDocument();
    });

    it("affiche les réglementations et les risques identifiés", () => {
        render(
            <PlaceBottomSheet place={mockPlace} onClose={vi.fn()} />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(screen.getByText("Chiens attachés")).toBeInTheDocument();
        expect(
            screen.getByText("Chenilles processionnaires")
        ).toBeInTheDocument();
    });

    it("appelle onClose lorsque l'utilisateur ferme la fiche", () => {
        const onClose = vi.fn();

        render(
            <PlaceBottomSheet place={mockPlace} onClose={onClose} />
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Fermer la fiche" })
        );

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
