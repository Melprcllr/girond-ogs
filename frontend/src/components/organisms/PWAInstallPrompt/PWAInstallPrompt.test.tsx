
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import PWAInstallPrompt from "./PWAInstallPrompt";

const DISMISS_STORAGE_KEY = "girondogs-pwa-install-dismissed-until";
const DISPLAY_DELAY = 10_000;
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;

let matchMediaListeners: Array<(event: MediaQueryListEvent) => void> = [];

function setUserAgent(userAgent: string) {
    Object.defineProperty(navigator, "userAgent", {
        configurable: true,
        value: userAgent,
    });
}

function setStandalone(isStandalone: boolean) {
    window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: isStandalone,
        media: "(display-mode: standalone)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event: string, callback: (event: MediaQueryListEvent) => void) => {
            if (event === "change") {
                matchMediaListeners.push(callback);
            }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

async function waitForDisplay() {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(DISPLAY_DELAY);
    });
}

function createBeforeInstallPromptEvent(
    outcome: "accepted" | "dismissed" = "accepted",
) {
    const event = new Event("beforeinstallprompt", {
        cancelable: true,
    });

    const prompt = vi.fn().mockResolvedValue(undefined);

    Object.defineProperties(event, {
        prompt: { value: prompt },
        userChoice: {
            value: Promise.resolve({
                outcome,
                platform: "web",
            }),
        },
    });

    return { event, prompt };
}

describe("PWAInstallPrompt", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.clear();
        matchMediaListeners = [];

        setStandalone(false);
        setUserAgent(
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
        );
    });

    afterEach(() => {
        cleanup();
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("n'affiche rien avant le délai de 10 secondes", () => {
        render(<PWAInstallPrompt />);

        expect(
            screen.queryByLabelText("Installer Girond'ogs"),
        ).not.toBeInTheDocument();
    });

    it("affiche les instructions d'installation sur iOS Safari après 10 secondes", async () => {
        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(
            screen.getByLabelText("Installer Girond'ogs"),
        ).toBeInTheDocument();

        expect(screen.getByText("Partager")).toBeInTheDocument();
        expect(
            screen.getByText("Sur l'écran d'accueil"),
        ).toBeInTheDocument();
        expect(screen.getByText("Ajouter")).toBeInTheDocument();
    });

    it("affiche un message adapté sur les autres navigateurs iOS", async () => {
        setUserAgent(
            "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 CriOS/130.0.0.0 Mobile/15E148 Safari/604.1",
        );

        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(
            screen.getByText(/ouvrez cette page dans Safari/i),
        ).toBeInTheDocument();
    });

    it("n'affiche rien sur ordinateur", async () => {
        setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15",
        );

        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(
            screen.queryByLabelText("Installer Girond'ogs"),
        ).not.toBeInTheDocument();
    });

    it("affiche le bouton d'installation sur Android lorsqu'un événement est disponible", async () => {
        setUserAgent(
            "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36",
        );

        const { event } = createBeforeInstallPromptEvent();

        render(<PWAInstallPrompt />);

        act(() => {
            window.dispatchEvent(event);
        });

        await waitForDisplay();

        expect(
            screen.getByRole("button", {
                name: "Installer l'application",
            }),
        ).toBeInTheDocument();
    });

    it("déclenche l'installation Android au clic", async () => {
        setUserAgent(
            "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36",
        );

        const { event, prompt } = createBeforeInstallPromptEvent();

        render(<PWAInstallPrompt />);

        act(() => {
            window.dispatchEvent(event);
        });

        await waitForDisplay();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Installer l'application",
            }),
        );

        await act(async () => {
            await Promise.resolve();
            await Promise.resolve();
        });

        expect(prompt).toHaveBeenCalledOnce();
    });

    it("masque la proposition après fermeture et mémorise la date pendant 7 jours", async () => {
        render(<PWAInstallPrompt />);

        await waitForDisplay();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Fermer la proposition d'installation",
            }),
        );

        expect(
            screen.queryByLabelText("Installer Girond'ogs"),
        ).not.toBeInTheDocument();

        expect(
            Number(localStorage.getItem(DISMISS_STORAGE_KEY)),
        ).toBe(Date.now() + DISMISS_DURATION);
    });

    it("ne réaffiche pas la proposition si elle a déjà été fermée", async () => {
        localStorage.setItem(
            DISMISS_STORAGE_KEY,
            String(Date.now() + DISMISS_DURATION),
        );

        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(
            screen.queryByLabelText("Installer Girond'ogs"),
        ).not.toBeInTheDocument();
    });

    it("supprime une ancienne date de fermeture expirée", async () => {
        localStorage.setItem(
            DISMISS_STORAGE_KEY,
            String(Date.now() - 1000),
        );

        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(localStorage.getItem(DISMISS_STORAGE_KEY)).toBeNull();

        expect(
            screen.getByLabelText("Installer Girond'ogs"),
        ).toBeInTheDocument();
    });

    it("n'affiche pas la proposition lorsque l'application est déjà installée", async () => {
        setStandalone(true);

        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(
            screen.queryByLabelText("Installer Girond'ogs"),
        ).not.toBeInTheDocument();
    });

    it("masque la proposition lorsque l'application est installée pendant la session", async () => {
        render(<PWAInstallPrompt />);

        await waitForDisplay();

        expect(
            screen.getByLabelText("Installer Girond'ogs"),
        ).toBeInTheDocument();

        act(() => {
            window.dispatchEvent(new Event("appinstalled"));
        });

        expect(
            screen.queryByLabelText("Installer Girond'ogs"),
        ).not.toBeInTheDocument();
    });
});
