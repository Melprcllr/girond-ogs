
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// On isole les composants enfants pour tester le comportement de HomePage.
vi.mock("../../components/organisms/PlacesMap/PlacesMap", () => ({
    default: () => <div data-testid="places-map" />,
}));

vi.mock("../../components/molecules/MapFilterPanel/MapFilterPanel", () => ({
    default: ({ title }: { title: string }) => (
        <div data-testid="map-filter-panel">{title}</div>
    ),
}));

vi.mock("../../components/molecules/DistanceFilter/DistanceFilter", () => ({
    default: () => <div data-testid="distance-filter" />,
}));

vi.mock("../../components/organisms/PlaceBottomSheet/PlaceBottomSheet", () => ({
    default: () => <div data-testid="place-bottom-sheet" />,
}));

vi.mock("../../components/molecules/SearchBar/SearchBar", () => ({
    default: () => <div data-testid="search-bar" />,
}));

vi.mock("../../components/organisms/SiteNavigation/SiteNavigation", () => ({
    default: () => <nav data-testid="site-navigation" />,
}));

describe("HomePage", () => {
    const renderHomePage = () =>
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );

    it("affiche la page d'accueil", () => {
        renderHomePage();

        expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("affiche la barre de recherche", () => {
        renderHomePage();

        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    });

    it("affiche la carte des lieux de balade", () => {
        renderHomePage();

        expect(screen.getByTestId("places-map")).toBeInTheDocument();
    });

    it("affiche la navigation du site", () => {
        renderHomePage();

        expect(screen.getByTestId("site-navigation")).toBeInTheDocument();
    });

    it("affiche les quatre boutons de filtres", () => {
        renderHomePage();

        expect(
            screen.getByRole("button", {
                name: "Filtrer par distance",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Filtrer par environnement",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Filtrer les risques à éviter",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Filtrer par réglementation",
            })
        ).toBeInTheDocument();
    });

    it("ouvre le filtre par environnement au clic", () => {
        renderHomePage();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Filtrer par environnement",
            })
        );

        expect(screen.getByText("Environnement")).toBeInTheDocument();
    });

    it("ferme un filtre lorsqu'on clique une deuxième fois sur son bouton", () => {
        renderHomePage();

        const environmentButton = screen.getByRole("button", {
            name: "Filtrer par environnement",
        });

        fireEvent.click(environmentButton);

        expect(screen.getByText("Environnement")).toBeInTheDocument();

        fireEvent.click(environmentButton);

        expect(
            screen.queryByText("Environnement")
        ).not.toBeInTheDocument();
    });

    it("permet d'ouvrir un autre filtre à la place du précédent", () => {
        renderHomePage();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Filtrer par environnement",
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Filtrer les risques à éviter",
            })
        );

        expect(screen.getByText("À éviter")).toBeInTheDocument();
        expect(
            screen.queryByText("Environnement")
        ).not.toBeInTheDocument();
    });

    it("ouvre le filtre de distance", () => {
        renderHomePage();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Filtrer par distance",
            })
        );

        expect(screen.getByTestId("distance-filter")).toBeInTheDocument();
    });
});
