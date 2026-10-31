import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxGroup from "./CheckboxGroup";

const options = [
    { label: "Forêt", value: "forest" },
    { label: "Prairie", value: "meadow" },
    { label: "Plage", value: "beach" },
];

describe("CheckboxGroup", () => {
    it("affiche son libellé", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={[]}
                onChange={() => { }}
            />
        );

        expect(
            screen.getByRole("group", { name: "Environnements" })
        ).toBeInTheDocument();
    });

    it("affiche toutes les options", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={[]}
                onChange={() => { }}
            />
        );

        expect(screen.getAllByRole("checkbox")).toHaveLength(3);
        expect(screen.getByLabelText("Forêt")).toBeInTheDocument();
        expect(screen.getByLabelText("Prairie")).toBeInTheDocument();
        expect(screen.getByLabelText("Plage")).toBeInTheDocument();
    });

    it("coche les options correspondant aux valeurs transmises", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={["forest", "beach"]}
                onChange={() => { }}
            />
        );

        expect(screen.getByLabelText("Forêt")).toBeChecked();
        expect(screen.getByLabelText("Plage")).toBeChecked();
        expect(screen.getByLabelText("Prairie")).not.toBeChecked();
    });

    it("ajoute une option à la sélection", () => {
        const handleChange = vi.fn();

        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={["forest"]}
                onChange={handleChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Prairie"));

        expect(handleChange).toHaveBeenCalledWith(["forest", "meadow"]);
    });

    it("retire une option de la sélection sans modifier les autres", () => {
        const handleChange = vi.fn();

        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={["forest", "meadow", "beach"]}
                onChange={handleChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Prairie"));

        expect(handleChange).toHaveBeenCalledWith(["forest", "beach"]);
    });

    it("affiche une indication complémentaire", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={[]}
                onChange={() => { }}
                hint="Plusieurs choix sont possibles."
            />
        );

        expect(screen.getByText("Plusieurs choix sont possibles."))
            .toBeInTheDocument();
    });

    it("affiche une erreur et indique un état invalide", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={[]}
                onChange={() => { }}
                error="Sélectionne au moins un environnement."
            />
        );

        expect(
            screen.getByRole("group", { name: "Environnements" })
        ).toHaveAttribute("aria-invalid", "true");

        expect(screen.getByText("Sélectionne au moins un environnement."))
            .toBeInTheDocument();
    });

    it("désactive toutes les options lorsque le groupe est désactivé", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={[]}
                onChange={() => { }}
                disabled
            />
        );

        screen.getAllByRole("checkbox").forEach((checkbox) => {
            expect(checkbox).toBeDisabled();
        });
    });

    it("permet de désactiver une seule option", () => {
        const customOptions = [
            ...options,
            { label: "Vignoble", value: "vineyard", disabled: true },
        ];

        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={customOptions}
                value={[]}
                onChange={() => { }}
            />
        );

        expect(screen.getByLabelText("Vignoble")).toBeDisabled();
        expect(screen.getByLabelText("Forêt")).toBeEnabled();
    });

    it("affiche un astérisque lorsque le groupe est obligatoire", () => {
        render(
            <CheckboxGroup
                label="Environnements"
                name="environment"
                options={options}
                value={[]}
                onChange={() => { }}
                required
            />
        );

        expect(screen.getByText("*")).toBeInTheDocument();
    });
});