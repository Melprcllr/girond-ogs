import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
    it("affiche son label", () => {
        render(<Checkbox label="Forêt" />);

        expect(screen.getByLabelText("Forêt")).toBeInTheDocument();
    });

    it("est décoché par défaut", () => {
        render(<Checkbox label="Plage" />);

        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("peut être coché par défaut", () => {
        render(<Checkbox label="Lac" defaultChecked />);

        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("affiche une indication complémentaire", () => {
        render(
            <Checkbox label="Forêt" hint="Présence de sentiers forestiers." />
        );

        expect(
            screen.getByText("Présence de sentiers forestiers.")
        ).toBeInTheDocument();
    });

    it("peut être désactivé", () => {
        render(<Checkbox label="Plage" disabled />);

        expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("affiche une erreur et signale le champ comme invalide", () => {
        render(<Checkbox label="Forêt" error="Ce choix est obligatoire." />);

        expect(
            screen.getByText("Ce choix est obligatoire.")
        ).toBeInTheDocument();

        expect(screen.getByRole("checkbox")).toHaveAttribute(
            "aria-invalid",
            "true"
        );
    });

    it("déclenche onChange lorsque la case change d'état", () => {
        const handleChange = vi.fn();

        render(<Checkbox label="Prairie" onChange={handleChange} />);

        fireEvent.click(screen.getByRole("checkbox"));

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});