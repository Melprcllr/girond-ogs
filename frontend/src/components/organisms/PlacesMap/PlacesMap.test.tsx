
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlacesMap from "./PlacesMap";
import type { Place } from "../../../types/Place";

const mockSetView = vi.fn();

vi.mock("react-leaflet", () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="map-container">{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({
        children,
        eventHandlers,
        icon,
    }: {
        children: React.ReactNode;
        eventHandlers?: { click?: () => void };
        icon?: {
            options: {
                html?: string;
            };
        };
    }) => {
        const iconHtml =
            typeof icon?.options.html === "string"
                ? icon.options.html
                : "";

        const markerColor = iconHtml.match(/fill="([^"]+)"/)?.[1];

        return (
            <div
                data-testid="map-marker"
                data-color={markerColor}
                data-icon-html={iconHtml}
                onClick={eventHandlers?.click}
            >
                {children}
            </div>
        );
    },
    Popup: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    useMap: () => ({
        setView: mockSetView,
    }),
}));

const mockPlaces: Place[] = [
    {
        id: "lac-lacanau",
        name: "Lac de Lacanau",
        commune: "Lacanau",
        postalCode: "33680",
        description: "Un espace naturel autour du lac.",
        imageUrl: "/images/places/lac-lacanau.jpg",
        latitude: 44.988,
        longitude: -1.085,
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
    },
];

describe("PlacesMap", () => {
    beforeEach(() => {
        mockSetView.mockClear();
    });

    it("should display the map", () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        expect(screen.getByTestId("map-container")).toBeInTheDocument();
        expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
    });

    it("should display a marker for each place", () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        expect(screen.getAllByTestId("map-marker")).toHaveLength(1);
    });

    it("should display the place name and commune in the popup", () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        expect(screen.getByText("Lac de Lacanau")).toBeInTheDocument();
        expect(screen.getByText("Lacanau")).toBeInTheDocument();
    });

    it("should call onPlaceClick when a marker is clicked", () => {
        const onPlaceClick = vi.fn();

        render(
            <PlacesMap places={mockPlaces} onPlaceClick={onPlaceClick} />,
        );

        fireEvent.click(screen.getByTestId("map-marker"));

        expect(onPlaceClick).toHaveBeenCalledWith("lac-lacanau");
    });

    it("should display no markers when there are no places", () => {
        render(
            <PlacesMap places={[]} onPlaceClick={vi.fn()} />,
        );

        expect(screen.queryByTestId("map-marker")).not.toBeInTheDocument();
    });

    it("should center the map on the selected place", () => {
        render(
            <PlacesMap
                places={mockPlaces}
                onPlaceClick={vi.fn()}
                selectedPlaceId="lac-lacanau"
            />,
        );

        expect(mockSetView).toHaveBeenCalledWith(
            [44.988, -1.085],
            12,
            { animate: true },
        );
    });

    it("should highlight the selected marker", () => {
        render(
            <PlacesMap
                places={mockPlaces}
                onPlaceClick={vi.fn()}
                selectedPlaceId="lac-lacanau"
            />,
        );

        const marker = screen.getByTestId("map-marker");

        expect(marker).toHaveAttribute("data-color", "#D98758");
        expect(marker.getAttribute("data-icon-html")).toContain(
            'fill="#D98758"',
        );
    });

    it("should display a green marker when the place is not selected", () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        const marker = screen.getByTestId("map-marker");

        expect(marker).toHaveAttribute("data-color", "#315C49");
    });
});
