
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Bell,
    CircleHelp,
    Info,
    Mail,
    Map,
    Menu,
    X,
} from "lucide-react";

import "./SiteNavigation.scss";

function SiteNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navigationRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === "/";
    const showCompactHeader = !isHomePage && isScrolled;

    // Affichage du bandeau après 100 px de défilement
    // Uniquement sur les pages intérieures
    useEffect(() => {
        if (isHomePage) {
            setIsScrolled(false);
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHomePage]);

    // Fermeture avec un clic extérieur ou la touche Échap
    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handleClickOutside = (event: PointerEvent) => {
            if (
                navigationRef.current &&
                !navigationRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    // Fermeture du menu
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Fermeture du menu avant de changer de page
    const closeMenuAndNavigate = (path: string) => {
        setIsMenuOpen(false);

        setTimeout(() => {
            navigate(path);
        }, 300);
    };

    return (
        <div
            className={`site-navigation ${!isHomePage ? "site-navigation--inner-page" : ""
                } ${showCompactHeader ? "site-navigation--scrolled" : ""}`}
            ref={navigationRef}
        >
            {(!isHomePage || showCompactHeader) && (
                <Link
                    to="/"
                    className="site-navigation__logo"
                    aria-label="Girond'ogs - Retour à l'accueil"
                >
                    <img
                        src="/logo/logo-girondogs.svg"
                        alt="Girond'ogs"
                    />
                </Link>
            )}

            <button
                className="site-navigation__menu-button"
                type="button"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMenuOpen}
                aria-controls="site-navigation-menu"
                onClick={() => setIsMenuOpen((current) => !current)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div
                className={`site-navigation__menu-overlay ${isMenuOpen ? "site-navigation__menu-overlay--open" : ""
                    }`}
                aria-hidden={!isMenuOpen}
                onClick={closeMenu}
            >
                <nav
                    id="site-navigation-menu"
                    className={`site-navigation__menu ${isMenuOpen ? "site-navigation__menu--open" : ""
                        }`}
                    aria-label="Menu principal"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="site-navigation__menu-header">
                        <span className="site-navigation__menu-title">
                            Girond'ogs
                        </span>

                        <button
                            className="site-navigation__menu-close"
                            type="button"
                            aria-label="Fermer le menu"
                            onClick={closeMenu}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="site-navigation__menu-links">
                        <Link
                            to="/"
                            aria-current={location.pathname === "/" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/");
                            }}
                        >
                            <Map size={20} aria-hidden="true" />
                            <span>Carte</span>
                        </Link>

                        <Link
                            to="/alertes"
                            aria-current={location.pathname === "/alertes" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/alertes");
                            }}
                        >
                            <Bell size={20} aria-hidden="true" />
                            <span>Alertes</span>
                        </Link>

                        <Link
                            to="/a-propos"
                            aria-current={location.pathname === "/a-propos" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/a-propos");
                            }}
                        >
                            <Info size={20} aria-hidden="true" />
                            <span>À propos de Girond'ogs</span>
                        </Link>

                        <Link
                            to="/faq"
                            aria-current={location.pathname === "/faq" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/faq");
                            }}
                        >
                            <CircleHelp size={20} aria-hidden="true" />
                            <span>FAQ</span>
                        </Link>

                        <Link
                            to="/contact"
                            aria-current={location.pathname === "/contact" ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/contact");
                            }}
                        >
                            <Mail size={20} aria-hidden="true" />
                            <span>Contact</span>
                        </Link>
                    </div>

                    <div className="site-navigation__menu-footer">
                        <div className="site-navigation__menu-footer-links">
                            <Link
                                to="/mentions-legales"
                                onClick={(event) => {
                                    event.preventDefault();
                                    closeMenuAndNavigate("/mentions-legales");
                                }}
                            >
                                Mentions légales
                            </Link>

                            <Link
                                to="/politique-confidentialite"
                                onClick={(event) => {
                                    event.preventDefault();
                                    closeMenuAndNavigate("/politique-confidentialite");
                                }}
                            >
                                Politique de confidentialité
                            </Link>
                        </div>

                        <p className="site-navigation__menu-signature">
                            Imaginé et développé par Mel-webdev ♡
                        </p>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default SiteNavigation;
