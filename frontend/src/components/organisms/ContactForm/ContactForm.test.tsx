
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
    it("affiche le champ de sélection du motif", () => {
        render(<ContactForm />);

        expect(
            screen.getByLabelText(/^Votre demande concerne/)
        ).toBeInTheDocument();
    });

    it("propose les six motifs de contact", () => {
        render(<ContactForm />);

        expect(
            screen.getByRole("option", { name: "Une question" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", {
                name: "Une suggestion ou une amélioration",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", {
                name: "Proposer un nouveau lieu de balade",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Un partenariat" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", {
                name: "Signalement pour un lieu de balade",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Autre demande" })
        ).toBeInTheDocument();
    });

    it("affiche les champs communs", () => {
        render(<ContactForm />);

        expect(screen.getByLabelText(/^Prénom/)).toBeInTheDocument();
        expect(
            screen.getByLabelText(/^Adresse e-mail/)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/^Votre message/)
        ).toBeInTheDocument();
    });

    it("affiche le champ de proposition de lieu uniquement pour ce motif", () => {
        render(<ContactForm />);

        expect(
            screen.queryByLabelText(/^Nom du lieu/)
        ).not.toBeInTheDocument();

        fireEvent.change(
            screen.getByLabelText(/^Votre demande concerne/),
            { target: { value: "new-place" } }
        );

        expect(
            screen.getByLabelText(/^Nom du lieu/)
        ).toBeInTheDocument();
    });

    it("affiche la section de signalement uniquement pour ce motif", () => {
        render(<ContactForm />);

        expect(
            screen.queryByText("Le lieu concerné")
        ).not.toBeInTheDocument();

        fireEvent.change(
            screen.getByLabelText(/^Votre demande concerne/),
            { target: { value: "report" } }
        );

        expect(
            screen.getByText("Le lieu concerné")
        ).toBeInTheDocument();
    });

    it("conserve les champs communs lors d'un changement de motif", () => {
        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText(/^Prénom/), {
            target: { value: "Mélissa" },
        });

        fireEvent.change(screen.getByLabelText(/^Adresse e-mail/), {
            target: { value: "melissa@example.com" },
        });

        fireEvent.change(screen.getByLabelText(/^Votre message/), {
            target: { value: "Voici mon message." },
        });

        const reasonSelect = screen.getByLabelText(
            /^Votre demande concerne/
        );

        fireEvent.change(reasonSelect, {
            target: { value: "new-place" },
        });

        fireEvent.change(screen.getByLabelText(/^Nom du lieu/), {
            target: { value: "Bois de Tanaïs" },
        });

        fireEvent.change(reasonSelect, {
            target: { value: "question" },
        });

        expect(screen.getByLabelText(/^Prénom/)).toHaveValue("Mélissa");

        expect(
            screen.getByLabelText(/^Adresse e-mail/)
        ).toHaveValue("melissa@example.com");

        expect(
            screen.getByLabelText(/^Votre message/)
        ).toHaveValue("Voici mon message.");

        expect(
            screen.queryByLabelText(/^Nom du lieu/)
        ).not.toBeInTheDocument();
    });

    it("réinitialise les champs spécifiques lorsqu'on change de motif", () => {
        render(<ContactForm />);

        const reasonSelect = screen.getByLabelText(
            /^Votre demande concerne/
        );

        fireEvent.change(reasonSelect, {
            target: { value: "new-place" },
        });

        fireEvent.change(screen.getByLabelText(/^Nom du lieu/), {
            target: { value: "Bois de Tanaïs" },
        });

        fireEvent.change(reasonSelect, {
            target: { value: "question" },
        });

        fireEvent.change(reasonSelect, {
            target: { value: "new-place" },
        });

        expect(screen.getByLabelText(/^Nom du lieu/)).toHaveValue("");
    });

    it("affiche le bouton d'envoi", () => {
        render(<ContactForm />);

        expect(
            screen.getByRole("button", { name: "Envoyer mon message" })
        ).toBeInTheDocument();
    });
});
