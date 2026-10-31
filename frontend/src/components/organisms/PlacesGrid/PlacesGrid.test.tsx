
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlacesGrid from "./PlacesGrid";
import type { Place } from "../../../types/Place";

const mockPlaces: Place[] = [
    {
        id: "1",
        name: "Lac de Lacanau",
        commune: "Lacanau",
        postalCode: "33680",
        description: "Un espace naturel avec un point d'eau.",
        imageUrl: "/images/lacanau.jpg",
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
    },
    {
        id: "2",
        name: "Plage du Porge",
        commune: "Le Porge",
        postalCode: "33680",
        description: "Une plage au cœur de la nature.",
        imageUrl: "/images/porge.jpg",
        characteristics: {
            vineyards: false,
            forest: true,
            beach: true,
            shadedAreas: false,
            water: true,
        },
        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },
        risks: {
            processionaryCaterpillars: false,
            farmAnimals: false,
            cyanobacteria: false,
        },
    },
];

describe("PlacesGrid", () => {
    it("affiche toutes les cartes de lieux", () => {
        render(
            <PlacesGrid
                places={mockPlaces}
                favoriteIds={[]}
                onToggleFavorite={vi.fn()}
                onPlaceClick={vi.fn()}
            />
        );

        expect(screen.getByText("Lac de Lacanau")).toBeInTheDocument();
        expect(screen.getByText("Plage du Porge")).toBeInTheDocument();
    });

    it("affiche les informations de chaque lieu", () => {
        render(
            <PlacesGrid
                places={mockPlaces}
                favoriteIds={[]}
                onToggleFavorite={vi.fn()}
                onPlaceClick={vi.fn()}
            />
        );

        expect(screen.getByText("Lacanau · 33680")).toBeInTheDocument();
        expect(screen.getByText("Le Porge · 33680")).toBeInTheDocument();
    });

    it("transmet le clic sur une carte au parent", () => {
        const onPlaceClick = vi.fn();

        render(
            <PlacesGrid
                places={mockPlaces}
                favoriteIds={[]}
                onToggleFavorite={vi.fn()}
                onPlaceClick={onPlaceClick}
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Voir les détails de Lac de Lacanau",
            })
        );

        expect(onPlaceClick).toHaveBeenCalledWith("1");
    });

    it("transmet le clic sur les favoris au parent", () => {
        const onToggleFavorite = vi.fn();

        render(
            <PlacesGrid
                places={mockPlaces}
                favoriteIds={[]}
                onToggleFavorite={onToggleFavorite}
                onPlaceClick={vi.fn()}
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Ajouter Lac de Lacanau aux favoris",
            })
        );

        expect(onToggleFavorite).toHaveBeenCalledWith("1");
    });

    it("identifie correctement les lieux favoris", () => {
        render(
            <PlacesGrid
                places={mockPlaces}
                favoriteIds={["1"]}
                onToggleFavorite={vi.fn()}
                onPlaceClick={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: "Retirer Lac de Lacanau des favoris",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Ajouter Plage du Porge aux favoris",
            })
        ).toBeInTheDocument();
    });

    it("affiche un message si aucun lieu n'est disponible", () => {
        render(
            <PlacesGrid
                places={[]}
                favoriteIds={[]}
                onToggleFavorite={vi.fn()}
                onPlaceClick={vi.fn()}
            />
        );

        expect(
            screen.getByRole("status")
        ).toHaveTextContent(
            "Aucun lieu ne correspond à votre recherche."
        );
    });

    it("permet de personnaliser le message vide", () => {
        render(
            <PlacesGrid
                places={[]}
                favoriteIds={[]}
                onToggleFavorite={vi.fn()}
                onPlaceClick={vi.fn()}
                emptyMessage="Aucun lieu trouvé dans cette commune."
            />
        );

        expect(
            screen.getByRole("status")
        ).toHaveTextContent(
            "Aucun lieu trouvé dans cette commune."
        );
    });
});
