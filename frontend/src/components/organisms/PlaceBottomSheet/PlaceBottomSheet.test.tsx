
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";

import PlaceBottomSheet from "./PlaceBottomSheet";
import type { Place } from "../../../types/Place";

const mockPlace: Place = {
    id: "lac-lacanau",
    name: "Lac de Lacanau",
    commune: "Lacanau",
    postalCode: "33680",
    description: "Un joli lac entouré de nature.",
    imageUrl: "/images/demoPlaces/lac-lacanau.jpg",
    sources: [],
    lastVerifiedAt: null,
    latitude: 44.988,
    longitude: -1.085,
    parking: {
        available: null,
    },
    characteristics: {
        vineyards: false,
        forest: true,
        beach: false,
        shadedAreas: true,
        water: true,
        pineTrees: true,
    },
    regulations: {
        dogsOnLeash: true,
        dogsProhibited: false,
    },
    risks: {
        processionaryCaterpillars: true,
        farmAnimals: false,
        cyanobacteria: false,
    },
};

function renderPlaceBottomSheet(onClose = vi.fn()) {
    return render(
        <MemoryRouter>
            <PlaceBottomSheet
                place={mockPlace}
                onClose={onClose}
            />
        </MemoryRouter>
    );
}

// Permet de vérifier les informations transmises à la navigation.
function LocationDisplay() {
    const location = useLocation();

    return (
        <pre data-testid="navigation-state">
            {JSON.stringify(location.state)}
        </pre>
    );
}

describe("PlaceBottomSheet", () => {
    it("affiche les informations principales du lieu à l'ouverture", () => {
        renderPlaceBottomSheet();

        expect(screen.getByText("Lac de Lacanau")).toBeInTheDocument();
        expect(screen.getByText("Lacanau · 33680")).toBeInTheDocument();

        expect(
            screen.getByRole("img", {
                name: "Vue du lieu Lac de Lacanau",
            })
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Un joli lac entouré de nature.")
        ).not.toBeInTheDocument();
    });

    it("passe de l'état réduit à l'état intermédiaire", () => {
        renderPlaceBottomSheet();

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            screen.getByText("Un joli lac entouré de nature.")
        ).toBeInTheDocument();

        expect(screen.getByText("Forêt")).toBeInTheDocument();
    });

    it("passe de l'état intermédiaire à l'état déployé", () => {
        const { container } = renderPlaceBottomSheet();

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            container.querySelector(".place-bottom-sheet--expanded")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Réduire la fiche" })
        ).toBeInTheDocument();
    });

    it("revient à l'état réduit après un troisième clic", () => {
        const { container } = renderPlaceBottomSheet();

        const expandButton = () =>
            screen.getByRole("button", { name: "Agrandir la fiche" });

        fireEvent.click(expandButton());
        fireEvent.click(expandButton());

        fireEvent.click(
            screen.getByRole("button", { name: "Réduire la fiche" })
        );

        expect(
            container.querySelector(".place-bottom-sheet--collapsed")
        ).toBeInTheDocument();
    });

    it("affiche les réglementations et les risques identifiés", () => {
        renderPlaceBottomSheet();

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(screen.getByText("Chiens attachés")).toBeInTheDocument();

        expect(
            screen.getByText("Chenilles processionnaires")
        ).toBeInTheDocument();
    });

    it("appelle onClose lorsque l'utilisateur ferme la fiche", () => {
        const onClose = vi.fn();

        renderPlaceBottomSheet(onClose);

        fireEvent.click(
            screen.getByRole("button", { name: "Fermer la fiche" })
        );

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("affiche les informations du parking lorsqu'il est disponible", () => {
        const placeWithParking: Place = {
            ...mockPlace,
            parking: {
                available: true,
                address: "13 rue Jean Macé, 33320 Eysines",
                details: "Environ 10 places disponibles.",
            },
        };

        render(
            <MemoryRouter>
                <PlaceBottomSheet
                    place={placeWithParking}
                    onClose={vi.fn()}
                />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(screen.getByText("Stationnement")).toBeInTheDocument();
        expect(screen.getByText("Parking disponible")).toBeInTheDocument();

        expect(
            screen.getByText("13 rue Jean Macé, 33320 Eysines")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Environ 10 places disponibles.")
        ).toBeInTheDocument();
    });

    it("indique lorsqu'aucun parking n'est disponible", () => {
        const placeWithoutParking: Place = {
            ...mockPlace,
            parking: {
                available: false,
            },
        };

        render(
            <MemoryRouter>
                <PlaceBottomSheet
                    place={placeWithoutParking}
                    onClose={vi.fn()}
                />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            screen.getByText("Aucun parking disponible")
        ).toBeInTheDocument();
    });

    it("n'affiche pas la section stationnement lorsque l'information est inconnue", () => {
        renderPlaceBottomSheet();

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            screen.queryByText("Stationnement")
        ).not.toBeInTheDocument();
    });

    it("affiche le bouton de signalement lorsque la fiche est agrandie", () => {
        renderPlaceBottomSheet();

        expect(
            screen.queryByRole("button", {
                name: /Signaler une information sur ce lieu/,
            })
        ).not.toBeInTheDocument();

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        expect(
            screen.getByRole("button", {
                name: /Signaler une information sur ce lieu/,
            })
        ).toBeInTheDocument();
    });

    it("transmet le lieu à signaler lors du clic sur le bouton", () => {
        render(
            <MemoryRouter>
                <PlaceBottomSheet
                    place={mockPlace}
                    onClose={vi.fn()}
                />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Agrandir la fiche" })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Signaler une information sur ce lieu/,
            })
        );

        expect(
            screen.getByTestId("navigation-state")
        ).toHaveTextContent(
            JSON.stringify({
                reason: "report",
                commune: "Lacanau",
                placeId: "lac-lacanau",
            })
        );
    });
});
