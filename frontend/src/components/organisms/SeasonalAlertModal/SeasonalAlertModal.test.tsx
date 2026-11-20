
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import SeasonalAlertModal from "./SeasonalAlertModal";

describe("SeasonalAlertModal", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-11-20T12:00:00"));
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    function renderModal() {
        return render(
            <MemoryRouter>
                <SeasonalAlertModal />
            </MemoryRouter>,
        );
    }

    it("affiche une alerte active à l'ouverture", () => {
        renderModal();

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("La chasse")).toBeInTheDocument();
    });

    it("ferme la popup lorsque l'utilisateur clique sur le bouton de fermeture", () => {
        renderModal();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Fermer la fenêtre",
            }),
        );

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("mémorise une alerte lorsque la case est cochée", () => {
        renderModal();

        fireEvent.click(
            screen.getByRole("checkbox", {
                name: "Ne plus me rappeler cette alerte",
            }),
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Enregistrer et fermer",
            }),
        );

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(
            localStorage.getItem(
                "girondogs-dismissed-alert-chasse-2026-09-13-2027-02-28",
            ),
        ).toBe("true");
    });

    it("ne réaffiche pas une alerte déjà masquée", () => {
        vi.setSystemTime(new Date("2026-12-20T12:00:00"));

        localStorage.setItem(
            "girondogs-dismissed-alert-chasse-2026-09-13-2027-02-28",
            "true",
        );

        renderModal();

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.queryByText("La chasse")).not.toBeInTheDocument();
    });

    it("permet de passer à l'alerte suivante", () => {
        vi.setSystemTime(new Date("2026-12-20T12:00:00"));

        renderModal();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Alerte suivante",
            }),
        );

        expect(
            screen.getByText("Les chenilles processionnaires du pin"),
        ).toBeInTheDocument();
    });
});
