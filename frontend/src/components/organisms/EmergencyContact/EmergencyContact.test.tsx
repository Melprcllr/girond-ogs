
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmergencyContact from "./EmergencyContact";

describe("EmergencyContact", () => {
    it("affiche le titre de l'encadré d'urgence", () => {
        render(<EmergencyContact />);

        expect(
            screen.getByRole("heading", {
                name: "Besoin d'un vétérinaire en urgence ?",
            })
        ).toBeInTheDocument();
    });

    it("rappelle qu'il faut appeler avant de se déplacer", () => {
        render(<EmergencyContact />);

        expect(
            screen.getByText(/Appelez toujours avant de vous déplacer/)
        ).toBeInTheDocument();
    });

    it("affiche les trois établissements vétérinaires", () => {
        render(<EmergencyContact />);

        expect(screen.getByText("CHV AniCura Aquivet")).toBeInTheDocument();
        expect(
            screen.getByText("Maison des Urgences Vétérinaires")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Établissement Vétérinaire Bordeaux Sud")
        ).toBeInTheDocument();
    });

    it("propose des liens téléphoniques cliquables", () => {
        render(<EmergencyContact />);

        expect(
            screen.getByRole("link", {
                name: /appeler CHV AniCura Aquivet/i,
            })
        ).toHaveAttribute("href", "tel:0556950101");

        expect(
            screen.getByRole("link", {
                name: /appeler Maison des Urgences Vétérinaires/i,
            })
        ).toHaveAttribute("href", "tel:0533822020");

        expect(
            screen.getByRole("link", {
                name: /appeler Établissement Vétérinaire Bordeaux Sud/i,
            })
        ).toHaveAttribute("href", "tel:0564376660");
    });

    it("propose un lien vers l'itinéraire de chaque établissement", () => {
        render(<EmergencyContact />);

        const addressLinks = screen.getAllByRole("link").filter((link) =>
            link.getAttribute("href")?.includes("google.com/maps")
        );

        expect(addressLinks).toHaveLength(3);

        addressLinks.forEach((link) => {
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });
});
