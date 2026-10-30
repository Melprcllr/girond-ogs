import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

const options = [
    { label: "Forêt", value: "forest" },
    { label: "Plage", value: "beach" },
    { label: "Prairie", value: "meadow" },
];

describe("Select", () => {
    it("affiche le champ avec son label", () => {
        render(<Select label="Environnement" options={options} />);

        expect(screen.getByLabelText("Environnement")).toBeInTheDocument();
    });

    it("affiche les options disponibles", () => {
        render(<Select label="Environnement" options={options} />);

        expect(screen.getByRole("option", { name: "Forêt" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Plage" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Prairie" })).toBeInTheDocument();
    });

    it("affiche le placeholder par défaut", () => {
        render(<Select label="Environnement" options={options} />);

        expect(
            screen.getByRole("option", { name: "Sélectionner une option" })
        ).toBeInTheDocument();
    });

    it("affiche une indication complémentaire", () => {
        render(
            <Select
                label="Environnement"
                options={options}
                hint="Choisis ton environnement préféré."
            />
        );

        expect(
            screen.getByText("Choisis ton environnement préféré.")
        ).toBeInTheDocument();
    });

    it("affiche une erreur et signale le champ comme invalide", () => {
        render(
            <Select
                label="Environnement"
                options={options}
                error="Ce champ est obligatoire."
            />
        );

        expect(screen.getByText("Ce champ est obligatoire.")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    });

    it("peut être désactivé", () => {
        render(<Select label="Environnement" options={options} disabled />);

        expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("déclenche onChange lorsque la sélection change", () => {
        const handleChange = vi.fn();

        render(
            <Select
                label="Environnement"
                options={options}
                onChange={handleChange}
            />
        );

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "forest" },
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("permet de définir une valeur par défaut", () => {
        render(
            <Select
                label="Environnement"
                options={options}
                defaultValue="beach"
            />
        );

        expect(screen.getByRole("combobox")).toHaveValue("beach");
    });
});