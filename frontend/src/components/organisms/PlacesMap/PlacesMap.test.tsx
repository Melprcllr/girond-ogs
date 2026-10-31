import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PlacesMap from './PlacesMap';
import type { Place } from '../../../types/Place';

vi.mock('react-leaflet', () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="map-container">{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    CircleMarker: ({
        children,
        eventHandlers,
    }: {
        children: React.ReactNode;
        eventHandlers?: { click?: () => void };
    }) => (
        <div
            data-testid="map-marker"
            onClick={eventHandlers?.click}
        >
            {children}
        </div>
    ),
    Popup: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}));

const mockPlaces: Place[] = [
    {
        id: 'lac-lacanau',
        name: 'Lac de Lacanau',
        commune: 'Lacanau',
        postalCode: '33680',
        description: 'Un espace naturel autour du lac.',
        imageUrl: '/images/places/lac-lacanau.jpg',
        latitude: 44.988,
        longitude: -1.085,
        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
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

describe('PlacesMap', () => {
    it('should display the map', () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        expect(screen.getByTestId('map-container')).toBeInTheDocument();
        expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    });

    it('should display a marker for each place', () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        expect(screen.getAllByTestId('map-marker')).toHaveLength(1);
    });

    it('should display the place name and commune in the popup', () => {
        render(
            <PlacesMap places={mockPlaces} onPlaceClick={vi.fn()} />,
        );

        expect(screen.getByText('Lac de Lacanau')).toBeInTheDocument();
        expect(screen.getByText('Lacanau')).toBeInTheDocument();
    });

    it('should call onPlaceClick when a marker is clicked', () => {
        const onPlaceClick = vi.fn();

        render(
            <PlacesMap places={mockPlaces} onPlaceClick={onPlaceClick} />,
        );

        fireEvent.click(screen.getByTestId('map-marker'));

        expect(onPlaceClick).toHaveBeenCalledWith('lac-lacanau');
    });

    it('should display no markers when there are no places', () => {
        render(
            <PlacesMap places={[]} onPlaceClick={vi.fn()} />,
        );

        expect(screen.queryByTestId('map-marker')).not.toBeInTheDocument();
    });
});