
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import EmergencyContact from "../../components/organisms/EmergencyContact/EmergencyContact";
import AlertCard from "../../components/organisms/AlertCard/AlertCard";
import { alerts } from "../../data/alerts";

import "./AlertsPage.scss";

function AlertsPage() {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) return;

        const frameId = window.requestAnimationFrame(() => {
            const target = document.getElementById(
                location.hash.slice(1),
            );

            target?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [location.hash]);

    return (
        <main className="alerts-page">
            <SiteNavigation />

            <div className="alerts-page__content">
                <header className="alerts-page__header">
                    <span className="alerts-page__eyebrow">
                        Prévention & sécurité
                    </span>

                    <h1>Les alertes à connaître</h1>

                    <p>
                        Parce que chaque promenade doit rester un plaisir,
                        retrouvez les risques à connaître en Gironde,
                        les périodes de vigilance et les bons réflexes
                        pour protéger votre chien.
                    </p>
                </header>

                <EmergencyContact />

                <section
                    className="alerts-page__list"
                    aria-labelledby="alerts-list-title"
                >
                    <nav
                        className="alerts-page__quick-nav"
                        aria-label="Accéder directement à une alerte"
                    >
                        <a
                            href="#chasse"
                            className="alerts-page__quick-link alerts-page__quick-link--chasse"
                        >
                            La chasse
                        </a>

                        <a
                            href="#chenilles-processionnaires"
                            className="alerts-page__quick-link alerts-page__quick-link--chenilles"
                        >
                            Les chenilles
                        </a>

                        <a
                            href="#epillets"
                            className="alerts-page__quick-link alerts-page__quick-link--epillets"
                        >
                            Les épillets
                        </a>

                        <a
                            href="#cyanobacteries"
                            className="alerts-page__quick-link alerts-page__quick-link--cyanobacteries"
                        >
                            Les cyanobactéries
                        </a>

                        <a
                            href="#chaleurs"
                            className="alerts-page__quick-link alerts-page__quick-link--chaleurs"
                        >
                            Fortes chaleurs
                        </a>
                    </nav>

                    <div className="alerts-page__section-heading">
                        <span>Les risques saisonniers</span>

                        <h2 id="alerts-list-title">
                            Les dangers à connaître
                        </h2>

                        <p>
                            Consultez les fiches pour savoir reconnaître
                            les dangers et réagir en cas de problème.
                        </p>
                    </div>

                    <div className="alerts-page__timeline">
                        {alerts.map((alert, index) => (
                            <div
                                className="alerts-page__timeline-entry"
                                key={alert.id}
                            >
                                <div
                                    className={`alerts-page__timeline-item alerts-page__timeline-item--${alert.id}`}
                                >
                                    <AlertCard {...alert} />
                                </div>

                                {index < alerts.length - 1 && (
                                    <div
                                        className="alerts-page__timeline-connector"
                                        aria-hidden="true"
                                    >
                                        {Array.from(
                                            { length: 7 },
                                            (_, dotIndex) => (
                                                <span key={dotIndex} />
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <p className="alerts-page__disclaimer">
                    Ces informations sont données à titre préventif et ne
                    remplacent pas l'avis d'un vétérinaire. En cas de doute
                    ou de symptômes inhabituels, contactez un professionnel
                    de santé animale.
                </p>
            </div>
        </main>
    );
}

export default AlertsPage;
