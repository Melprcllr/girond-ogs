
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlaceCard from "./PlaceCard";
import type { Place } from "../../../types/Place";

const mockPlace: Place = {
    id: "place-1",
    name: "Lac de Lacanau",
    commune: "Lacanau",
    postalCode: "33680",
    description: "Un espace naturel ombragé avec un point d'eau.",
    imageUrl: "/images/lac-lacanau.jpg",
    latitude: 44.988,
    longitude: -1.085,

    characteristics: {
        vineyards: false,
        forest: true,
        beach: false,
        shadedAreas: true,
        water: true,
    },

    regulations: {
        dogsOnLeash: false,
        dogsProhibited: false,
    },

    risks: {
        processionaryCaterpillars: true,
        farmAnimals: false,
        cyanobacteria: false,
    },
};

describe("PlaceCard", () => {
    it("displays the place name", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Lac de Lacanau")).toBeInTheDocument();
    });

    it("displays the commune and postal code", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Lacanau · 33680")).toBeInTheDocument();
    });

    it("displays the place description", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(
            screen.getByText(mockPlace.description)
        ).toBeInTheDocument();
    });

    it("displays only present environmental characteristics", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Forêt")).toBeInTheDocument();
        expect(screen.getByText("Ombragé")).toBeInTheDocument();
        expect(screen.getByText("Point d'eau")).toBeInTheDocument();

        expect(screen.queryByText("Vignes")).not.toBeInTheDocument();
        expect(screen.queryByText("Plage")).not.toBeInTheDocument();
    });

    it("displays dog restrictions only when they apply", () => {
        const placeWithRestrictions: Place = {
            ...mockPlace,
            regulations: {
                dogsOnLeash: true,
                dogsProhibited: false,
            },
        };

        const { rerender } = render(
            <PlaceCard
                place={placeWithRestrictions}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Chiens attachés")).toBeInTheDocument();
        expect(screen.queryByText("Chiens interdits")).not.toBeInTheDocument();

        rerender(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(screen.queryByText("Chiens attachés")).not.toBeInTheDocument();
        expect(screen.queryByText("Chiens interdits")).not.toBeInTheDocument();
    });

    it("displays only identified risks", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(
            screen.getByText("Chenilles processionnaires")
        ).toBeInTheDocument();

        expect(screen.queryByText("Animaux d'élevage")).not.toBeInTheDocument();
        expect(screen.queryByText("Cyanobactéries")).not.toBeInTheDocument();
    });

    it("displays the favorite button with the correct label", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: "Ajouter Lac de Lacanau aux favoris",
            })
        ).toBeInTheDocument();
    });

    it("displays the correct label when the place is a favorite", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: "Retirer Lac de Lacanau des favoris",
            })
        ).toBeInTheDocument();
    });

    it("calls onToggleFavorite when the favorite button is clicked", () => {
        const onToggleFavorite = vi.fn();
        const onClick = vi.fn();

        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={onToggleFavorite}
                onClick={onClick}
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Ajouter Lac de Lacanau aux favoris",
            })
        );

        expect(onToggleFavorite).toHaveBeenCalledWith("place-1");
        expect(onClick).not.toHaveBeenCalled();
    });

    it("calls onClick when the card content is clicked", () => {
        const onClick = vi.fn();

        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={onClick}
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Voir les détails de Lac de Lacanau",
            })
        );

        expect(onClick).toHaveBeenCalledWith("place-1");
    });

    it("displays the place image with an accessible description", () => {
        render(
            <PlaceCard
                place={mockPlace}
                isFavorite={false}
                onToggleFavorite={vi.fn()}
                onClick={vi.fn()}
            />
        );

        expect(
            screen.getByAltText("Vue du lieu Lac de Lacanau")
        ).toBeInTheDocument();
    });
});
