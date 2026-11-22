
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AlertsPage from "./AlertsPage";

describe("AlertsPage", () => {
    const renderAlertsPage = () =>
        render(
            <MemoryRouter>
                <AlertsPage />
            </MemoryRouter>
        );

            it("affiche le bouton retour en haut après avoir fait défiler la page", () => {
        renderAlertsPage();

        const button = screen.getByLabelText("Retourner en haut de la page");

        expect(button).toHaveAttribute("aria-hidden", "true");

        Object.defineProperty(window, "scrollY", {
            configurable: true,
            value: 400,
        });

        fireEvent.scroll(window);

        expect(button).toHaveAttribute("aria-hidden", "false");
    });

    it("remonte en haut de la page au clic sur le bouton", () => {
        const scrollToMock = vi
            .spyOn(window, "scrollTo")
            .mockImplementation(() => {});

        renderAlertsPage();

        Object.defineProperty(window, "scrollY", {
            configurable: true,
            value: 400,
        });

        fireEvent.scroll(window);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Retourner en haut de la page",
            })
        );

        expect(scrollToMock).toHaveBeenCalledWith({
            top: 0,
            behavior: "smooth",
        });

        scrollToMock.mockRestore();
    });

    it("affiche le titre principal", () => {
        renderAlertsPage();

        expect(
            screen.getByRole("heading", {
                name: "Les alertes à connaître",
            })
        ).toBeInTheDocument();
    });

    it("affiche le texte d'introduction", () => {
        renderAlertsPage();

        expect(
            screen.getByText(
                /Parce que chaque promenade doit rester un plaisir/
            )
        ).toBeInTheDocument();
    });

    it("affiche les quatre fiches de prévention", () => {
        renderAlertsPage();

        expect(
            screen.getByRole("heading", { name: "La chasse" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Les chenilles processionnaires du pin",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Les cyanobactéries",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", { name: "Les épillets" })
        ).toBeInTheDocument();
    });

    it("affiche les liens d'accès rapide aux alertes", () => {
        renderAlertsPage();

        expect(
            screen.getByRole("link", { name: "La chasse" })
        ).toHaveAttribute("href", "#chasse");

        expect(
            screen.getByRole("link", { name: "Les chenilles" })
        ).toHaveAttribute("href", "#chenilles-processionnaires");

        expect(
            screen.getByRole("link", { name: "Les épillets" })
        ).toHaveAttribute("href", "#epillets");

        expect(
            screen.getByRole("link", { name: "Les cyanobactéries" })
        ).toHaveAttribute("href", "#cyanobacteries");
    });

    it("affiche les informations de prévention", () => {
        renderAlertsPage();

        expect(
            screen.getByRole("heading", {
                name: "Les dangers à connaître",
            })
        ).toBeInTheDocument();

        expect(
            screen.getAllByText("Les bons réflexes").length
        ).toBeGreaterThan(0);
    });

    it("affiche le message de prévention vétérinaire en bas de page", () => {
        renderAlertsPage();

        expect(
            screen.getByText(
                /Ces informations sont données à titre préventif/
            )
        ).toBeInTheDocument();
    });
});
