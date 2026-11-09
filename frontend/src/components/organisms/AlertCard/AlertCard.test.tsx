
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AlertCard from "./AlertCard";

const alertProps = {
    id: "epillets",
    title: "Les épillets",
    period: "Printemps à automne",
    introduction: "Les épillets peuvent pénétrer dans la peau du chien.",
    mainImage: {
        src: "/images/alerts/epillets.jpg",
        alt: "Épillets dans une herbe sèche",
    },
    gallery: [
        {
            src: "/images/alerts/epillets-patte.jpg",
            alt: "Épillet dans une patte",
            caption: "Un épillet peut se loger entre les doigts.",
        },
    ],
    sections: [
        {
            title: "Les symptômes",
            content: "Certains signes doivent alerter.",
            items: ["Léchage excessif", "Boiterie"],
        },
    ],
    riskLevel: "high" as const,
};

describe("AlertCard", () => {
    it("affiche le titre et la période de vigilance", () => {
        render(<AlertCard {...alertProps} />);

        expect(
            screen.getByRole("heading", { name: "Les épillets" })
        ).toBeInTheDocument();

        expect(
            screen.getByText("Printemps à automne")
        ).toBeInTheDocument();
    });

    it("affiche l'image principale et les images complémentaires", () => {
        render(<AlertCard {...alertProps} />);

        expect(
            screen.getByAltText("Épillets dans une herbe sèche")
        ).toBeInTheDocument();

        expect(
            screen.getByAltText("Épillet dans une patte")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Un épillet peut se loger entre les doigts.")
        ).toBeInTheDocument();
    });

    it("affiche les sections et leurs conseils", () => {
        render(<AlertCard {...alertProps} />);

        expect(
            screen.getByRole("heading", { name: "Les symptômes" })
        ).toBeInTheDocument();

        expect(screen.getByText("Léchage excessif")).toBeInTheDocument();
        expect(screen.getByText("Boiterie")).toBeInTheDocument();
    });

    it("affiche le niveau de risque", () => {
        render(<AlertCard {...alertProps} />);

        expect(screen.getByText("Risque important")).toBeInTheDocument();
    });

    it("permet d'afficher une fiche sans galerie", () => {
        render(
            <AlertCard
                {...alertProps}
                gallery={[]}
            />
        );

        expect(
            screen.queryByAltText("Épillet dans une patte")
        ).not.toBeInTheDocument();
    });
});
