import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
    it("affiche le champ avec son label", () => {
        render(<Input label="Ville" />);

        expect(screen.getByLabelText("Ville")).toBeInTheDocument();
    });

    it("affiche le placeholder", () => {
        render(<Input label="Ville" placeholder="Ex : Bordeaux" />);

        expect(screen.getByPlaceholderText("Ex : Bordeaux")).toBeInTheDocument();
    });

    it("affiche une indication complémentaire", () => {
        render(<Input label="Adresse" hint="Saisis une ville ou une adresse." />);

        expect(
            screen.getByText("Saisis une ville ou une adresse.")
        ).toBeInTheDocument();
    });

    it("affiche une erreur et signale le champ comme invalide", () => {
        render(<Input label="Ville" error="Ce champ est obligatoire." />);

        expect(screen.getByText("Ce champ est obligatoire.")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("peut être désactivé", () => {
        render(<Input label="Ville" disabled />);

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("déclenche onChange lorsque sa valeur change", () => {
        const handleChange = vi.fn();

        render(<Input label="Ville" onChange={handleChange} />);

        fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "Bordeaux" },
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("permet de définir un type différent", () => {
        render(<Input label="Mot de passe" type="password" />);

        expect(screen.getByLabelText("Mot de passe")).toHaveAttribute(
            "type",
            "password"
        );
    });
});
