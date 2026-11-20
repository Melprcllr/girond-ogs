
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    AlertTriangle,
    Bug,
    Check,
    ChevronLeft,
    ChevronRight,
    Crosshair,
    Droplets,
    Sun,
    Wheat,
    X,
} from "lucide-react";

import { alerts, type SeasonalAlert } from "../../../data/alerts";

import "./SeasonalAlertModal.scss";

const STORAGE_KEY_PREFIX = "girondogs-dismissed-alert-";

const alertIcons = {
    crosshair: Crosshair,
    bug: Bug,
    droplets: Droplets,
    wheat: Wheat,
    sun: Sun,
};

function isAlertActive(alert: SeasonalAlert, date: Date): boolean {
    const today = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    if (alert.activeFrom || alert.activeUntil) {
        const start = alert.activeFrom
            ? new Date(`${alert.activeFrom}T00:00:00`)
            : null;

        const end = alert.activeUntil
            ? new Date(`${alert.activeUntil}T23:59:59`)
            : null;

        if (start && today < start) return false;
        if (end && today > end) return false;

        return true;
    }

    if (alert.activeMonths) {
        return alert.activeMonths.includes(date.getMonth() + 1);
    }

    return false;
}

function getStorageKey(alert: SeasonalAlert, date: Date): string {
    let period: string;

    if (alert.activeFrom && alert.activeUntil) {
        period = `${alert.activeFrom}-${alert.activeUntil}`;
    } else if (alert.activeMonths) {
        const months = alert.activeMonths;
        const wrapsAcrossYear =
            months.includes(12) && months.includes(1);

        let seasonYear = date.getFullYear();

        if (
            wrapsAcrossYear &&
            date.getMonth() + 1 < Math.min(...months)
        ) {
            seasonYear -= 1;
        }

        period = String(seasonYear);
    } else {
        period = String(date.getFullYear());
    }

    return `${STORAGE_KEY_PREFIX}${alert.id}-${period}`;
}

function SeasonalAlertModal() {
    const [activeAlerts, setActiveAlerts] = useState<SeasonalAlert[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [dontRemind, setDontRemind] = useState(false);

    useEffect(() => {
        const today = new Date();

        const currentAlerts = alerts.filter((alert) => {
            if (!isAlertActive(alert, today)) return false;

            try {
                return localStorage.getItem(
                    getStorageKey(alert, today),
                ) !== "true";
            } catch {
                return true;
            }
        });

        setActiveAlerts(currentAlerts);
        setIsOpen(currentAlerts.length > 0);
    }, []);

    const currentAlert = activeAlerts[currentIndex];

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen || !currentAlert) return null;

    const Icon =
        alertIcons[currentAlert.icon as keyof typeof alertIcons] ??
        AlertTriangle;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleNext = () => {
        setCurrentIndex((index) => (index + 1) % activeAlerts.length);
        setDontRemind(false);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (index) => (index - 1 + activeAlerts.length) % activeAlerts.length,
        );
        setDontRemind(false);
    };

    const handleDismiss = () => {
        if (!dontRemind) {
            handleClose();
            return;
        }

        try {
            localStorage.setItem(
                getStorageKey(currentAlert, new Date()),
                "true",
            );
        } catch {
            // La popup reste utilisable si le stockage est indisponible.
        }

        const remainingAlerts = activeAlerts.filter(
            (alert) => alert.id !== currentAlert.id,
        );

        setActiveAlerts(remainingAlerts);
        setCurrentIndex(0);
        setDontRemind(false);

        if (remainingAlerts.length === 0) {
            setIsOpen(false);
        }
    };

    return (
        <div
            className="seasonal-alert-modal"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    handleClose();
                }
            }}
        >
            <section
                className="seasonal-alert-modal__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="seasonal-alert-title"
                aria-describedby="seasonal-alert-description"
            >
                <button
                    className="seasonal-alert-modal__close"
                    type="button"
                    onClick={handleClose}
                    aria-label="Fermer la fenêtre"
                >
                    <X size={22} />
                </button>

                <div className="seasonal-alert-modal__icon">
                    <Icon size={30} aria-hidden="true" />
                </div>

                <span className="seasonal-alert-modal__eyebrow">
                    Prévention & sécurité en Gironde
                </span>

                <h2 id="seasonal-alert-title">
                    Les précautions actuelles à prendre en Gironde
                </h2>

                {activeAlerts.length > 1 && (
                    <div className="seasonal-alert-modal__counter">
                        Alerte {currentIndex + 1} sur {activeAlerts.length}
                    </div>
                )}

                <div className="seasonal-alert-modal__content">
                    <h3>{currentAlert.title}</h3>

                    <p
                        id="seasonal-alert-description"
                        className="seasonal-alert-modal__description"
                    >
                        {currentAlert.shortDescription}
                    </p>

                    <div className="seasonal-alert-modal__precautions">
                        <h4>Les bons réflexes</h4>

                        <ul>
                            {currentAlert.precautions.map((precaution) => (
                                <li key={precaution}>
                                    <Check size={17} aria-hidden="true" />
                                    <span>{precaution}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {currentAlert.filterAdvice && (
                        <div className="seasonal-alert-modal__advice">
                            <strong>
                                <Check size={17} aria-hidden="true" />
                                Conseil pour vos recherches
                            </strong>

                            <p>{currentAlert.filterAdvice.description}</p>

                            {currentAlert.filterAdvice.filterLabel && (
                                <p className="seasonal-alert-modal__filter-label">
                                    Filtre : {currentAlert.filterAdvice.filterLabel}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <label className="seasonal-alert-modal__remember">
                    <input
                        type="checkbox"
                        checked={dontRemind}
                        onChange={(event) =>
                            setDontRemind(event.target.checked)
                        }
                    />
                    <span>Ne plus me rappeler cette alerte</span>
                </label>

                <Link
                    to={`/alertes#${currentAlert.id}`}
                    className="seasonal-alert-modal__details"
                    onClick={handleClose}
                >
                    Consulter les précautions détaillées
                </Link>

                <div className="seasonal-alert-modal__actions">
                    {activeAlerts.length > 1 && (
                        <div className="seasonal-alert-modal__navigation">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                aria-label="Alerte précédente"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                aria-label="Alerte suivante"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    <button
                        type="button"
                        className="seasonal-alert-modal__confirm"
                        onClick={handleDismiss}
                    >
                        {dontRemind
                            ? "Enregistrer et fermer"
                            : "J'ai compris"}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default SeasonalAlertModal;
