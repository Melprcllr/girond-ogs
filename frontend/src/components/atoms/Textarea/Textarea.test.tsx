import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "./Textarea";

describe("Textarea", () => {
    it("affiche son libellé", () => {
        render(<Textarea label="Description" />);

        expect(screen.getByLabelText("Description")).toBeInTheDocument();
    });

    it("affiche un placeholder", () => {
        render(
            <Textarea
                label="Description"
                placeholder="Décris ce lieu..."
            />
        );

        expect(screen.getByPlaceholderText("Décris ce lieu..."))
            .toBeInTheDocument();
    });

    it("affiche une indication complémentaire", () => {
        render(
            <Textarea
                label="Description"
                hint="Décris les caractéristiques du lieu."
            />
        );

        expect(screen.getByText("Décris les caractéristiques du lieu."))
            .toBeInTheDocument();
    });

    it("affiche une erreur et indique un état invalide", () => {
        render(
            <Textarea
                label="Description"
                error="Ce champ est obligatoire."
            />
        );

        expect(screen.getByLabelText("Description"))
            .toHaveAttribute("aria-invalid", "true");

        expect(screen.getByText("Ce champ est obligatoire."))
            .toBeInTheDocument();
    });

    it("peut être désactivé", () => {
        render(<Textarea label="Description" disabled />);

        expect(screen.getByLabelText("Description")).toBeDisabled();
    });

    it("transmet les changements de saisie", () => {
        const handleChange = vi.fn();

        render(
            <Textarea
                label="Description"
                onChange={handleChange}
            />
        );

        fireEvent.change(screen.getByLabelText("Description"), {
            target: { value: "Forêt ombragée avec rivière." },
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("affiche une valeur initiale", () => {
        render(
            <Textarea
                label="Description"
                defaultValue="Présence de nombreux arbres."
            />
        );

        expect(screen.getByLabelText("Description"))
            .toHaveValue("Présence de nombreux arbres.");
    });

    it("transmet les attributs HTML", () => {
        render(
            <Textarea
                label="Description"
                maxLength={500}
            />
        );

        expect(screen.getByLabelText("Description"))
            .toHaveAttribute("maxLength", "500");
    });
});