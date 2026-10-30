import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroup from "./RadioGroup";

const options = [
    { label: "Facile", value: "easy" },
    { label: "Modéré", value: "moderate" },
    { label: "Difficile", value: "difficult" },
];

describe("RadioGroup", () => {
    it("affiche son libellé", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value=""
                onChange={() => { }}
            />
        );

        expect(screen.getByRole("group", { name: "Difficulté" }))
            .toBeInTheDocument();
    });

    it("affiche toutes les options", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value=""
                onChange={() => { }}
            />
        );

        expect(screen.getAllByRole("radio")).toHaveLength(3);
        expect(screen.getByLabelText("Facile")).toBeInTheDocument();
        expect(screen.getByLabelText("Modéré")).toBeInTheDocument();
        expect(screen.getByLabelText("Difficile")).toBeInTheDocument();
    });

    it("sélectionne la valeur transmise en prop", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value="moderate"
                onChange={() => { }}
            />
        );

        expect(screen.getByLabelText("Modéré")).toBeChecked();
        expect(screen.getByLabelText("Facile")).not.toBeChecked();
    });

    it("transmet la nouvelle valeur lors d'une sélection", () => {
        const handleChange = vi.fn();

        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value="easy"
                onChange={handleChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Modéré"));

        expect(handleChange).toHaveBeenCalledWith("moderate");
    });

    it("met à jour la sélection lorsque la valeur change", () => {
        const handleChange = vi.fn();

        const { rerender } = render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value="easy"
                onChange={handleChange}
            />
        );

        rerender(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value="difficult"
                onChange={handleChange}
            />
        );

        expect(screen.getByLabelText("Difficile")).toBeChecked();
        expect(screen.getByLabelText("Facile")).not.toBeChecked();
    });

    it("affiche une indication complémentaire", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value=""
                onChange={() => { }}
                hint="Choisis selon ton niveau."
            />
        );

        expect(screen.getByText("Choisis selon ton niveau."))
            .toBeInTheDocument();
    });

    it("affiche une erreur et indique un état invalide", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value=""
                onChange={() => { }}
                error="Veuillez choisir une difficulté."
            />
        );

        expect(screen.getByRole("group", { name: "Difficulté" }))
            .toHaveAttribute("aria-invalid", "true");

        expect(screen.getByText("Veuillez choisir une difficulté."))
            .toBeInTheDocument();
    });

    it("désactive toutes les options lorsque le groupe est désactivé", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value=""
                onChange={() => { }}
                disabled
            />
        );

        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });

    it("permet de désactiver une seule option", () => {
        const customOptions = [
            ...options,
            { label: "Expert", value: "expert", disabled: true },
        ];

        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={customOptions}
                value=""
                onChange={() => { }}
            />
        );

        expect(screen.getByLabelText("Expert")).toBeDisabled();
        expect(screen.getByLabelText("Facile")).toBeEnabled();
    });

    it("transmet le caractère obligatoire aux options", () => {
        render(
            <RadioGroup
                label="Difficulté"
                name="difficulty"
                options={options}
                value=""
                onChange={() => { }}
                required
            />
        );

        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).toBeRequired();
        });
    });
});