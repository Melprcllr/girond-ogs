import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";

import SiteNavigation from "./SiteNavigation";

function LocationDisplay() {
    const location = useLocation();

    return <span data-testid="current-location">{location.pathname}</span>;
}

function renderSiteNavigation() {
    return render(
        <MemoryRouter initialEntries={["/"]}>
            <SiteNavigation />
            <LocationDisplay />
        </MemoryRouter>
    );
}

describe("SiteNavigation", () => {
    it("affiche le bouton pour ouvrir le menu", () => {
        renderSiteNavigation();

        expect(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        ).toBeInTheDocument();
    });

    it("ouvre le menu au clic sur le bouton burger", () => {
        renderSiteNavigation();

        fireEvent.click(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        );

        expect(
            screen.getByRole("navigation", { name: "Menu principal" })
        ).toBeVisible();

        expect(
            screen.getAllByRole("button", { name: "Fermer le menu" })
        ).toHaveLength(2);
    });

    it("ferme le menu avec la touche Échap", () => {
        renderSiteNavigation();

        fireEvent.click(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        );

        fireEvent.keyDown(document, { key: "Escape" });

        expect(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        ).toBeInTheDocument();
    });

    it("ferme le menu lors d'un clic extérieur", () => {
        renderSiteNavigation();

        fireEvent.click(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        );

        fireEvent.pointerDown(document.body);

        expect(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        ).toBeInTheDocument();
    });

    it("ferme le menu avec son bouton de fermeture", () => {
        renderSiteNavigation();

        fireEvent.click(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        );

        const closeButtons = screen.getAllByRole("button", {
            name: "Fermer le menu",
        });

        fireEvent.click(closeButtons[1]);

        expect(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        ).toBeInTheDocument();
    });

    it("redirige vers la page À propos après avoir fermé le menu", async () => {
        renderSiteNavigation();

        fireEvent.click(
            screen.getByRole("button", { name: "Ouvrir le menu" })
        );

        fireEvent.click(
            screen.getByRole("link", { name: "À propos de Girond'ogs" })
        );

        await waitFor(() => {
            expect(screen.getByTestId("current-location")).toHaveTextContent(
                "/a-propos"
            );
        });
    });
});