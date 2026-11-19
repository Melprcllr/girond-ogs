
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import FAQAccordion from "./FAQAccordion";

describe("FAQAccordion", () => {
    it("affiche la question", () => {
        render(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Suivez les étapes d'installation.</p>
            </FAQAccordion>
        );

        expect(
            screen.getByRole("button", {
                name: "Comment installer Girond'ogs ?",
            })
        ).toBeInTheDocument();
    });

    it("masque la réponse lorsque l'accordéon est fermé", () => {
        render(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Suivez les étapes d'installation.</p>
            </FAQAccordion>
        );

        expect(
            screen.getByText("Suivez les étapes d'installation.")
        ).not.toBeVisible();
    });

    it("affiche la réponse lorsque l'accordéon est ouvert", () => {
        render(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen
                onToggle={vi.fn()}
            >
                <p>Suivez les étapes d'installation.</p>
            </FAQAccordion>
        );

        expect(
            screen.getByText("Suivez les étapes d'installation.")
        ).toBeVisible();
    });

    it("indique l'état ouvert ou fermé avec aria-expanded", () => {
        const { rerender } = render(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Réponse.</p>
            </FAQAccordion>
        );

        const button = screen.getByRole("button");

        expect(button).toHaveAttribute("aria-expanded", "false");

        rerender(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen
                onToggle={vi.fn()}
            >
                <p>Réponse.</p>
            </FAQAccordion>
        );

        expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("appelle onToggle au clic", () => {
        const onToggle = vi.fn();

        render(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen={false}
                onToggle={onToggle}
            >
                <p>Réponse.</p>
            </FAQAccordion>
        );

        fireEvent.click(screen.getByRole("button"));

        expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it("associe le bouton à sa réponse avec aria-controls", () => {
        render(
            <FAQAccordion
                id="faq-install"
                question="Comment installer Girond'ogs ?"
                isOpen={false}
                onToggle={vi.fn()}
            >
                <p>Réponse.</p>
            </FAQAccordion>
        );

        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-controls",
            "faq-install-content"
        );

        expect(document.getElementById("faq-install-content")).toBeInTheDocument();
    });
});
