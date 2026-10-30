import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
    it("affiche son contenu", () => {
        render(<Button>Découvrir les balades</Button>);

        expect(
            screen.getByRole("button", { name: "Découvrir les balades" })
        ).toBeInTheDocument();
    });

    it("utilise la variante primary par défaut", () => {
        render(<Button>Rechercher</Button>);

        expect(screen.getByRole("button")).toHaveClass("button--primary");
    });

    it("applique la variante demandée", () => {
        render(<Button variant="secondary">Annuler</Button>);

        expect(screen.getByRole("button")).toHaveClass("button--secondary");
    });

    it("peut être désactivé", () => {
        render(<Button disabled>Indisponible</Button>);

        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("est de type button par défaut", () => {
        render(<Button>Valider</Button>);

        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("déclenche la fonction au clic", () => {
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Cliquer</Button>);

        fireEvent.click(screen.getByRole("button"));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});