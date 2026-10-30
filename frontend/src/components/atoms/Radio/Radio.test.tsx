import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Radio from "./Radio";

describe("Radio", () => {
    it("affiche son libellé", () => {
        render(<Radio label="Facile" name="difficulty" value="easy" />);

        expect(screen.getByLabelText("Facile")).toBeInTheDocument();
    });

    it("possède le type radio", () => {
        render(<Radio label="Facile" name="difficulty" value="easy" />);

        expect(screen.getByRole("radio")).toHaveAttribute("type", "radio");
    });

    it("peut être sélectionné par défaut", () => {
        render(
            <Radio
                label="Facile"
                name="difficulty"
                value="easy"
                defaultChecked
            />
        );

        expect(screen.getByRole("radio")).toBeChecked();
    });

    it("affiche une indication complémentaire", () => {
        render(
            <Radio
                label="Facile"
                name="difficulty"
                value="easy"
                hint="Parcours accessible à tous"
            />
        );

        expect(screen.getByText("Parcours accessible à tous"))
            .toBeInTheDocument();
    });

    it("affiche une erreur et indique un état invalide", () => {
        render(
            <Radio
                label="Facile"
                name="difficulty"
                value="easy"
                error="Veuillez choisir une difficulté"
            />
        );

        expect(screen.getByRole("radio")).toHaveAttribute(
            "aria-invalid",
            "true"
        );
        expect(screen.getByText("Veuillez choisir une difficulté"))
            .toBeInTheDocument();
    });

    it("peut être désactivé", () => {
        render(
            <Radio
                label="Facile"
                name="difficulty"
                value="easy"
                disabled
            />
        );

        expect(screen.getByRole("radio")).toBeDisabled();
    });

    it("transmet les changements de sélection", () => {
        const handleChange = vi.fn();

        render(
            <Radio
                label="Facile"
                name="difficulty"
                value="easy"
                onChange={handleChange}
            />
        );

        fireEvent.click(screen.getByRole("radio"));

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("transmet les attributs HTML", () => {
        render(
            <Radio
                label="Facile"
                name="difficulty"
                value="easy"
                data-testid="difficulty-radio"
            />
        );

        expect(screen.getByTestId("difficulty-radio")).toBeInTheDocument();
    });
});