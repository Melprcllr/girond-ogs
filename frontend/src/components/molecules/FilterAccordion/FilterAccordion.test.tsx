
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FilterAccordion from "./FilterAccordion";

describe("FilterAccordion", () => {
    it("displays the category title", () => {
        render(
            <FilterAccordion
                title="Environnement"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(screen.getByText("Environnement")).toBeInTheDocument();
    });

    it("displays its content when open", () => {
        render(
            <FilterAccordion
                title="Environnement"
                isOpen={true}
                onToggle={vi.fn()}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(screen.getByText("Forêt")).toBeInTheDocument();
    });

    it("hides its content when closed", () => {
        render(
            <FilterAccordion
                title="Environnement"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(screen.queryByText("Forêt")).not.toBeInTheDocument();
    });

    it("calls onToggle when the trigger is clicked", () => {
        const onToggle = vi.fn();

        render(
            <FilterAccordion
                title="Environnement"
                isOpen={false}
                onToggle={onToggle}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        fireEvent.click(
            screen.getByRole("button", { name: /Environnement/ })
        );

        expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it("displays the active filters count", () => {
        render(
            <FilterAccordion
                title="Environnement"
                isOpen={false}
                onToggle={vi.fn()}
                activeCount={2}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("does not display the count when it is zero", () => {
        render(
            <FilterAccordion
                title="Environnement"
                isOpen={false}
                onToggle={vi.fn()}
                activeCount={0}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("updates aria-expanded according to its state", () => {
        const { rerender } = render(
            <FilterAccordion
                title="Environnement"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(
            screen.getByRole("button", { name: /Environnement/ })
        ).toHaveAttribute("aria-expanded", "false");

        rerender(
            <FilterAccordion
                title="Environnement"
                isOpen={true}
                onToggle={vi.fn()}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(
            screen.getByRole("button", { name: /Environnement/ })
        ).toHaveAttribute("aria-expanded", "true");
    });

    it("applies the open class when expanded", () => {
        const { container } = render(
            <FilterAccordion
                title="Environnement"
                isOpen={true}
                onToggle={vi.fn()}
            >
                <p>Forêt</p>
            </FilterAccordion>
        );

        expect(container.firstChild).toHaveClass("filter-accordion--open");
    });
});
