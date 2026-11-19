import { useEffect, useState } from "react";
import { Plus, Share2, X } from "lucide-react";

import "./PWAInstallPrompt.scss";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

type InstallPlatform = "android" | "ios-safari" | "ios-other" | null;

const DISMISS_STORAGE_KEY = "girondogs-pwa-install-dismissed-until";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;
const DISPLAY_DELAY = 10_000;

function isAppInstalled() {
    const isStandalone = window.matchMedia(
        "(display-mode: standalone)",
    ).matches;

    const isIOSStandalone = (
        navigator as Navigator & { standalone?: boolean }
    ).standalone === true;

    return isStandalone || isIOSStandalone;
}

function getInstallPlatform(): InstallPlatform {
    const userAgent = navigator.userAgent;
    const isIPadOS =
        navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

    const isIOS =
        /iPhone|iPad|iPod/i.test(userAgent) || isIPadOS;

    if (isIOS) {
        const isSafari =
            /Safari/i.test(userAgent) &&
            !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);

        return isSafari ? "ios-safari" : "ios-other";
    }

    if (/Android/i.test(userAgent)) {
        return "android";
    }

    return null;
}

function wasPromptDismissed() {
    try {
        const dismissedUntil = Number(
            localStorage.getItem(DISMISS_STORAGE_KEY),
        );

        if (!dismissedUntil) {
            return false;
        }

        if (Date.now() < dismissedUntil) {
            return true;
        }

        localStorage.removeItem(DISMISS_STORAGE_KEY);
    } catch {
        // Le composant reste utilisable si le stockage est indisponible.
    }

    return false;
}

function PWAInstallPrompt() {
    const [platform] = useState<InstallPlatform>(() =>
        typeof window !== "undefined" ? getInstallPlatform() : null,
    );

    const [isInstalled, setIsInstalled] = useState(() =>
        typeof window !== "undefined" ? isAppInstalled() : false,
    );

    const [isDismissed, setIsDismissed] = useState(() =>
        typeof window !== "undefined" ? wasPromptDismissed() : false,
    );
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {

        const displayTimer = window.setTimeout(() => {
            setIsReady(true);
        }, DISPLAY_DELAY);

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
        };

        const displayMode = window.matchMedia(
            "(display-mode: standalone)",
        );

        const handleDisplayModeChange = () => {
            if (isAppInstalled()) {
                setIsInstalled(true);
            }
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt,
        );
        window.addEventListener("appinstalled", handleAppInstalled);
        displayMode.addEventListener("change", handleDisplayModeChange);

        return () => {
            window.clearTimeout(displayTimer);
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
            );
            window.removeEventListener("appinstalled", handleAppInstalled);
            displayMode.removeEventListener(
                "change",
                handleDisplayModeChange,
            );
        };
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);

        try {
            localStorage.setItem(
                DISMISS_STORAGE_KEY,
                String(Date.now() + DISMISS_DURATION),
            );
        } catch {
            // La fermeture fonctionne même si le stockage est indisponible.
        }
    };

    const handleInstall = async () => {
        if (!deferredPrompt) {
            return;
        }

        await deferredPrompt.prompt();

        const choice = await deferredPrompt.userChoice;

        setDeferredPrompt(null);

        if (choice.outcome === "accepted") {
            setIsInstalled(true);
        }
    };

    const shouldDisplay =
        isReady &&
        !isInstalled &&
        !isDismissed &&
        (platform === "ios-safari" ||
            platform === "ios-other" ||
            (platform === "android" && deferredPrompt !== null));

    if (!shouldDisplay) {
        return null;
    }

    return (
        <aside
            className="pwa-install-prompt"
            aria-label="Installer Girond'ogs"
        >
            <button
                className="pwa-install-prompt__close"
                type="button"
                aria-label="Fermer la proposition d'installation"
                onClick={handleDismiss}
            >
                <X size={18} />
            </button>

            <div className="pwa-install-prompt__icon">
                <img
                    src="/favicon.svg"
                    alt="Logo Girond'ogs"
                    className="pwa-install-prompt__logo"
                />
            </div>

                <div className="pwa-install-prompt__text">
                    <p className="pwa-install-prompt__title">
                        Emportez Girond'ogs partout !
                    </p>

                    {platform === "android" && (
                        <>
                            <p className="pwa-install-prompt__description">
                                Ajoutez l'application à votre écran d'accueil
                                pour retrouver facilement vos balades.
                            </p>

                            <button
                                className="pwa-install-prompt__install"
                                type="button"
                                onClick={handleInstall}
                            >
                                Installer l'application
                            </button>
                        </>
                    )}

                    {platform === "ios-safari" && (
                        <div className="pwa-install-prompt__instructions">
                            <p>
                                Pour installer l'application :
                            </p>

                            <ol>
                                <li>
                                    Appuyez sur <Share2 size={15} />{" "}
                                    <strong>Partager</strong> dans Safari.
                                </li>
                                <li>
                                    Choisissez <Plus size={15} />{" "}
                                    <strong>Sur l'écran d'accueil</strong>.
                                </li>
                                <li>
                                    Validez avec <strong>Ajouter</strong>.
                                </li>
                            </ol>
                        </div>
                    )}

                    {platform === "ios-other" && (
                        <p className="pwa-install-prompt__description">
                            Pour ajouter Girond'ogs à votre écran d'accueil,
                            ouvrez cette page dans Safari, puis utilisez
                            « Partager » et « Sur l'écran d'accueil ».
                        </p>
                    )}
                </div>
        </aside>
    );
}

export default PWAInstallPrompt;