import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
    it("affiche son contenu", () => {
        render(<Badge>Chiens autorisés</Badge>);

        expect(screen.getByText("Chiens autorisés")).toBeInTheDocument();
    });

    it("utilise la variante neutral par défaut", () => {
        const { container } = render(<Badge>Information</Badge>);
    
        expect(container.querySelector(".badge"))
            .toHaveClass("badge--neutral");
    });
    
    it("applique la variante demandée", () => {
        const { container } = render(
            <Badge variant="success">Autorisé</Badge>
        );
    
        expect(container.querySelector(".badge"))
            .toHaveClass("badge--success");
    });
    
    it("applique la taille demandée", () => {
        const { container } = render(
            <Badge size="large">Grand badge</Badge>
        );
    
        expect(container.querySelector(".badge"))
            .toHaveClass("badge--large");
    });

    it("affiche une icône lorsqu'elle est fournie", () => {
        render(<Badge icon={<span>🐾</span>}>Balade canine</Badge>);

        expect(screen.getByText("🐾")).toBeInTheDocument();
    });

    it("masque l'icône décorative aux technologies d'assistance", () => {
        render(<Badge icon={<span>🐾</span>}>Balade canine</Badge>);

        expect(screen.getByText("🐾").parentElement).toHaveAttribute(
            "aria-hidden",
            "true"
        );
    });

    it("transmet les attributs HTML", () => {
        render(<Badge title="Information complémentaire">Information</Badge>);

        expect(screen.getByText("Information").parentElement).toHaveAttribute(
            "title",
            "Information complémentaire"
        );
    });

    it("permet d'ajouter une classe CSS personnalisée", () => {
        render(<Badge className="custom-badge">Personnalisé</Badge>);

        expect(screen.getByText("Personnalisé").parentElement).toHaveClass(
            "custom-badge"
        );
    });
});