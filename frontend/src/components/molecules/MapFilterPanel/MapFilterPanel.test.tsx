
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MapFilterPanel from "./MapFilterPanel";

const options = [
    { label: "Vignes", value: "vineyards" },
    { label: "Forêt", value: "forest" },
    { label: "Plage", value: "beach" },
    { label: "Zones ombragées", value: "shadedAreas" },
    { label: "Point d'eau", value: "water" },
];

describe("MapFilterPanel", () => {
    it("affiche le titre du panneau", () => {
        render(
            <MapFilterPanel
                title="Environnement"
                name="environment"
                options={options}
                value={[]}
                onChange={vi.fn()}
            />
        );

        expect(
            screen.getByRole("group", { name: "Environnement" })
        ).toBeInTheDocument();
    });

    it("affiche toutes les options", () => {
        render(
            <MapFilterPanel
                title="Environnement"
                name="environment"
                options={options}
                value={[]}
                onChange={vi.fn()}
            />
        );

        options.forEach((option) => {
            expect(
                screen.getByRole("checkbox", { name: option.label })
            ).toBeInTheDocument();
        });
    });

    it("coche les options déjà sélectionnées", () => {
        render(
            <MapFilterPanel
                title="Environnement"
                name="environment"
                options={options}
                value={["forest", "water"]}
                onChange={vi.fn()}
            />
        );

        expect(screen.getByRole("checkbox", { name: "Forêt" }))
            .toBeChecked();

        expect(screen.getByRole("checkbox", { name: "Point d'eau" }))
            .toBeChecked();

        expect(screen.getByRole("checkbox", { name: "Vignes" }))
            .not.toBeChecked();
    });

    it("transmet les nouvelles valeurs lorsque l'on coche une option", () => {
        const onChange = vi.fn();

        render(
            <MapFilterPanel
                title="Environnement"
                name="environment"
                options={options}
                value={["forest"]}
                onChange={onChange}
            />
        );

        fireEvent.click(screen.getByRole("checkbox", { name: "Vignes" }));

        expect(onChange).toHaveBeenCalledWith(["forest", "vineyards"]);
    });

    it("transmet les valeurs mises à jour lorsque l'on décoche une option", () => {
        const onChange = vi.fn();

        render(
            <MapFilterPanel
                title="Environnement"
                name="environment"
                options={options}
                value={["forest", "water"]}
                onChange={onChange}
            />
        );

        fireEvent.click(screen.getByRole("checkbox", { name: "Forêt" }));

        expect(onChange).toHaveBeenCalledWith(["water"]);
    });

    it("ne modifie pas les valeurs sélectionnées sans interaction", () => {
        const onChange = vi.fn();

        render(
            <MapFilterPanel
                title="Environnement"
                name="environment"
                options={options}
                value={["forest"]}
                onChange={onChange}
            />
        );

        expect(onChange).not.toHaveBeenCalled();
    });
});
