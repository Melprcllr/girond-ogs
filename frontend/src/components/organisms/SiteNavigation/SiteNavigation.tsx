
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
            className={`site-navigation ${
                !isHomePage ? "site-navigation--inner-page" : ""
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
                className={`site-navigation__menu-overlay ${
                    isMenuOpen ? "site-navigation__menu-overlay--open" : ""
                }`}
                aria-hidden={!isMenuOpen}
                onClick={closeMenu}
            >
                <nav
                    id="site-navigation-menu"
                    className={`site-navigation__menu ${
                        isMenuOpen ? "site-navigation__menu--open" : ""
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
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/");
                            }}
                        >
                            Accueil
                        </Link>

                        <Link
                            to="/alertes"
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/alertes");
                            }}
                        >
                            Les alertes
                        </Link>

                        <Link
                            to="/a-propos"
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/a-propos");
                            }}
                        >
                            À propos de Girond'ogs
                        </Link>

                        <Link
                            to="/contact"
                            onClick={(event) => {
                                event.preventDefault();
                                closeMenuAndNavigate("/contact");
                            }}
                        >
                            Contact et signalement
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default SiteNavigation;
