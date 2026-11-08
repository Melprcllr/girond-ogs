
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";

describe("ContactPage", () => {
    it("affiche le titre principal", () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", {
                name: "Contact et signalement",
            })
        ).toBeInTheDocument();
    });

    it("affiche le texte d'introduction", () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(
            screen.getByText(
                "Une question, une idée ou une information à partager ?"
            )
        ).toBeInTheDocument();
    });

    it("affiche la section Écrivez-nous", () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("heading", {
                name: "Écrivez-nous",
            })
        ).toBeInTheDocument();
    });

    it("intègre le formulaire de contact", () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(
            screen.getByLabelText(/^Votre demande concerne/)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/^Prénom/)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/^Adresse e-mail/)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/^Votre message/)
        ).toBeInTheDocument();
    });

    it("affiche le message de remerciement en bas de page", () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        expect(
            screen.getByText(
                /Merci de contribuer à faire vivre Girond'ogs/
            )
        ).toBeInTheDocument();
    });
});
