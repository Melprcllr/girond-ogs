
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import FAQPage from "./FAQPage";

describe("FAQPage", () => {
    const renderFAQPage = () =>
        render(
            <MemoryRouter>
                <FAQPage />
            </MemoryRouter>
        );

    it("affiche le titre principal", () => {
        renderFAQPage();

        expect(
            screen.getByRole("heading", {
                name: "Foire aux questions",
            })
        ).toBeInTheDocument();
    });

    it("affiche le texte d'introduction", () => {
        renderFAQPage();

        expect(
            screen.getByText(
                /Retrouvez les réponses aux questions les plus fréquentes/
            )
        ).toBeInTheDocument();
    });

    it("affiche les cinq catégories de questions", () => {
        renderFAQPage();

        expect(
            screen.getByRole("heading", {
                name: "Application et installation",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Recherche et carte",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Lieux de balade",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Sécurité et bien-être des chiens",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "À propos de Girond'ogs",
            })
        ).toBeInTheDocument();
    });

    it("affiche les liens d'accès rapide aux catégories", () => {
        renderFAQPage();

        expect(
            screen.getByRole("link", {
                name: "Application et installation",
            })
        ).toHaveAttribute("href", "#installation");

        expect(
            screen.getByRole("link", {
                name: "Recherche et carte",
            })
        ).toHaveAttribute("href", "#recherche");

        expect(
            screen.getByRole("link", {
                name: "Lieux de balade",
            })
        ).toHaveAttribute("href", "#lieux");

        expect(
            screen.getByRole("link", {
                name: "Sécurité et bien-être des chiens",
            })
        ).toHaveAttribute("href", "#securite");

        expect(
            screen.getByRole("link", {
                name: "À propos de Girond'ogs",
            })
        ).toHaveAttribute("href", "#contact");
    });

    it("affiche les questions des différentes catégories", () => {
        renderFAQPage();

        expect(
            screen.getByRole("button", {
                name: "Qu'est-ce que Girond'ogs ?",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Comment rechercher une commune ?",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Quelles informations trouve-t-on sur une fiche lieu ?",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "À quoi sert la page « Les alertes » ?",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Comment proposer un nouveau lieu de balade ?",
            })
        ).toBeInTheDocument();
    });

    it("ouvre une réponse au clic sur une question", () => {
        renderFAQPage();

        const question = screen.getByRole("button", {
            name: "Qu'est-ce que Girond'ogs ?",
        });

        expect(question).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(question);

        expect(question).toHaveAttribute("aria-expanded", "true");

        expect(
            screen.getByText(/application qui permet de découvrir/)
        ).toBeVisible();
    });

    it("ne laisse qu'une seule question ouverte par catégorie", () => {
        renderFAQPage();

        const firstQuestion = screen.getByRole("button", {
            name: "Qu'est-ce que Girond'ogs ?",
        });

        const secondQuestion = screen.getByRole("button", {
            name: "Pourquoi installer Girond'ogs sur mon écran d'accueil ?",
        });

        fireEvent.click(firstQuestion);
        fireEvent.click(secondQuestion);

        expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
        expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    });


it("permet de choisir les instructions d'installation Android", () => {
    renderFAQPage();

    fireEvent.click(
        screen.getByRole("button", {
            name: "Comment installer Girond'ogs sur mon téléphone ou ma tablette ?",
        })
    );

    expect(
        screen.getByText("Girond'ogs dans Safari")
    ).toBeVisible();

    fireEvent.click(
        screen.getByRole("button", {
            name: "Android",
        })
    );

    expect(
        screen.getByText("Girond'ogs dans votre navigateur")
    ).toBeVisible();

    expect(
        screen.getByRole("button", {
            name: "Android",
        })
    ).toHaveAttribute("aria-pressed", "true");
});


    it("propose un lien vers la page des alertes", () => {
        renderFAQPage();

        fireEvent.click(
            screen.getByRole("button", {
                name: "À quoi sert la page « Les alertes » ?",
            })
        );

        expect(
            screen.getByRole("link", {
                name: "Les alertes",
            })
        ).toHaveAttribute("href", "/alertes");
    });

    it("propose un accès à la page Contact", () => {
        renderFAQPage();

        expect(
            screen.getByRole("link", {
                name: "Nous contacter",
            })
        ).toHaveAttribute("href", "/contact");
    });
});
