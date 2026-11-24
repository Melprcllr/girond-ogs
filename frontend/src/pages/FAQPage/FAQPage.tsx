
import { useState, type ReactNode } from "react";
import {
    CircleHelp,
    Map,
    MapPin,
    MessageCircle,
    ShieldCheck,
    Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

import FAQAccordion from "../../components/molecules/FAQAccordion/FAQAccordion";
import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";

import "./FAQPage.scss";

interface FAQQuestion {
    id: string;
    question: string;
    answer: ReactNode;
}

interface FAQCategory {
    id: string;
    title: string;
    icon: typeof CircleHelp;
    questions: FAQQuestion[];
}

function InstallationInstructions() {
    const [platform, setPlatform] = useState<"ios" | "android">("ios");

    return (
        <div className="faq-installation">
            <p>
                Choisissez votre appareil pour afficher les étapes
                d'installation correspondantes.
            </p>

            <div
                className="faq-installation__selector"
                aria-label="Choisir son appareil"
            >
                <button
                    type="button"
                    className={
                        platform === "ios"
                            ? "faq-installation__platform faq-installation__platform--active"
                            : "faq-installation__platform"
                    }
                    aria-pressed={platform === "ios"}
                    onClick={() => setPlatform("ios")}
                >
                    <Smartphone size={18} aria-hidden="true" />
                    iPhone / iPad
                </button>

                <button
                    type="button"
                    className={
                        platform === "android"
                            ? "faq-installation__platform faq-installation__platform--active"
                            : "faq-installation__platform"
                    }
                    aria-pressed={platform === "android"}
                    onClick={() => setPlatform("android")}
                >
                    <Smartphone size={18} aria-hidden="true" />
                    Android
                </button>
            </div>

            {platform === "ios" ? (
                <div className="faq-installation__steps">
                    <ol>
                        <li>
                            Ouvrez <strong>Girond'ogs dans Safari</strong>.
                        </li>
                        <li>
                            Appuyez sur le bouton <strong>Partager </strong>
                            (le carré avec une flèche vers le haut).
                        </li>
                        <li>
                            Faites défiler les options et choisissez
                            <strong> Sur l'écran d'accueil</strong>.
                        </li>
                        <li>
                            Appuyez sur <strong>Ajouter</strong> pour
                            retrouver Girond'ogs directement sur votre écran
                            d'accueil.
                        </li>
                    </ol>
                    <p className="faq-installation__note">
                        Sur iPhone et iPad, l'ajout à l'écran d'accueil
                        s'effectue depuis Safari.
                    </p>
                </div>
            ) : (
                <div className="faq-installation__steps">
                    <ol>
                        <li>
                            Ouvrez <strong>Girond'ogs dans votre navigateur</strong>
                            (par exemple Chrome).
                        </li>
                        <li>
                            Si une proposition d'installation apparaît,
                            appuyez sur <strong>Installer</strong>.
                        </li>
                        <li>
                            Si aucune proposition n'apparaît, ouvrez le menu
                            du navigateur (souvent représenté par trois points
                            verticaux).
                        </li>
                        <li>
                            Choisissez <strong>Installer l'application</strong>
                            ou <strong>Ajouter à l'écran d'accueil</strong>,
                            selon les options proposées par votre navigateur.
                        </li>
                        <li>
                            Confirmez l'installation si nécessaire.
                        </li>
                    </ol>
                    <p className="faq-installation__note">
                        Les intitulés et les étapes peuvent légèrement varier
                        selon le navigateur et le modèle de votre appareil.
                    </p>
                </div>
            )}
        </div>
    );
}

const faqCategories: FAQCategory[] = [
    {
        id: "installation",
        title: "Application et installation",
        icon: Smartphone,
        questions: [
            {
                id: "presentation",
                question: "Qu'est-ce que Girond'ogs ?",
                answer: (
                    <p>
                        Girond'ogs est une application qui permet de découvrir
                        des lieux de balade où promener son chien en Gironde.
                        Grâce à une carte interactive et à différents filtres,
                        vous pouvez rechercher des endroits adaptés à vos
                        envies et aux besoins de votre compagnon.
                    </p>
                ),
            },
            {
                id: "installer",
                question: "Comment installer Girond'ogs sur mon téléphone ou ma tablette ?",
                answer: <InstallationInstructions />,
            },
            {
                id: "interet-installation",
                question: "Pourquoi installer Girond'ogs sur mon écran d'accueil ?",
                answer: (
                    <p>
                        L'installation permet d'accéder plus facilement à
                        Girond'ogs, directement depuis l'écran d'accueil de
                        votre appareil, comme avec une application classique.
                        Vous n'avez plus besoin de rechercher le site dans
                        votre navigateur à chaque utilisation.
                    </p>
                ),
            },
            {
                id: "compte",
                question: "Dois-je créer un compte pour utiliser l'application ?",
                answer: (
                    <p>
                        Non ! Aucun compte ni inscription ne sont nécessaires.
                        Vous pouvez utiliser librement les fonctionnalités de
                        Girond'ogs.
                    </p>
                ),
            },
        ],
    },
    {
        id: "recherche",
        title: "Recherche et carte",
        icon: Map,
        questions: [
            {
                id: "commune",
                question: "Comment rechercher une commune ?",
                answer: (
                    <p>
                        Utilisez la barre de recherche sur la carte et saisissez
                        le nom de la commune ou son code postal. Des
                        suggestions apparaissent au fur et à mesure de votre
                        saisie : sélectionnez la commune souhaitée pour
                        l'utiliser comme point de recherche.
                    </p>
                ),
            },
            {
                id: "rayon",
                question: "Comment fonctionne le rayon de recherche ?",
                answer: (
                    <p>
                        Après avoir sélectionné une commune, vous pouvez
                        définir un rayon de recherche autour de celle-ci,
                        de 5 à 50 km, par paliers de 5 km. Cela permet
                        d'afficher les lieux situés dans le périmètre choisi.
                    </p>
                ),
            },
            {
                id: "filtres",
                question: "À quoi correspondent les filtres de recherche ?",
                answer: (
                    <>
                        <p>
                            Les filtres permettent d'affiner les résultats
                            selon plusieurs critères :
                        </p>
                        <ul>
                            <li>
                                <strong>Environnement :</strong> Vignes,
                                Forêt, Plage, Zones ombragées et Point d'eau.
                            </li>
                            <li>
                                <strong>Points de vigilance : </strong>
                                Chenilles processionnaires, Animaux d'élevage,
                                Risque de cyanobactéries et Présence de pins.
                            </li>
                            <li>
                                <strong>Réglementation :</strong> Chiens
                                attachés et Chiens interdits.
                            </li>
                        </ul>
                        <p>
                            Ces filtres sont amenés à évoluer et à s'enrichir
                            au fil du développement de Girond'ogs.
                        </p>
                    </>
                ),
            },
            {
                id: "combiner",
                question: "Puis-je combiner plusieurs filtres ?",
                answer: (
                    <p>
                        Oui ! Vous pouvez sélectionner plusieurs critères,
                        dans une même catégorie ou dans des catégories
                        différentes. Les résultats affichés correspondent
                        aux lieux qui respectent l'ensemble des critères
                        sélectionnés.
                    </p>
                ),
            },
            {
                id: "reinitialiser",
                question: "Comment retirer ou réinitialiser mes filtres ?",
                answer: (
                    <p>
                        Vous pouvez désélectionner individuellement les
                        critères qui ne vous intéressent plus ou utiliser
                        le bouton de réinitialisation disponible dans chaque
                        catégorie de filtres.
                    </p>
                ),
            },
        ],
    },
    {
        id: "lieux",
        title: "Lieux de balade",
        icon: MapPin,
        questions: [
            {
                id: "fiche",
                question: "Quelles informations trouve-t-on sur une fiche lieu ?",
                answer: (
                    <p>
                        Chaque fiche présente les informations disponibles
                        sur le lieu : environnement, caractéristiques,
                        présence de points d'eau ou de zones ombragées,
                        stationnement, réglementation et éventuels points
                        de vigilance. Des photos peuvent également être
                        proposées lorsqu'elles sont disponibles.
                    </p>
                ),
            },
            {
                id: "acces-chien",
                question: "Comment savoir si mon chien peut accéder à un lieu ?",
                answer: (
                    <p>
                        Consultez la rubrique consacrée à la réglementation
                        sur la fiche du lieu. Certains espaces imposent
                        de tenir son chien en laisse ou interdisent
                        complètement leur accès aux chiens. Pensez également
                        à vérifier la signalisation présente sur place.
                    </p>
                ),
            },
            {
                id: "laisse",
                question: "Comment connaître les règles concernant la laisse ?",
                answer: (
                    <p>
                        Lorsque cette information est connue, la
                        réglementation concernant la laisse est indiquée
                        sur la fiche du lieu. En cas de doute, référez-vous
                        toujours aux panneaux et arrêtés affichés sur place.
                    </p>
                ),
            },
            {
                id: "actualisation",
                question: "Les informations des lieux sont-elles régulièrement vérifiées ?",
                answer: (
                    <>
                        <p>
                            Girond'ogs s'efforce de maintenir les informations
                            à jour aussi fréquemment que possible. Cependant,
                            les conditions d'accès, les réglementations et
                            les caractéristiques des lieux peuvent évoluer.
                        </p>
                        <p>
                            Vos contributions sont donc précieuses ! N'hésitez
                            pas à nous signaler un danger sur un lieu référencé,
                            une nouvelle réglementation ou toute information
                            qui aurait changé. Elles nous aident à maintenir
                            des fiches toujours plus fiables et actualisées.
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        id: "securite",
        title: "Sécurité et bien-être des chiens",
        icon: ShieldCheck,
        questions: [
            {
                id: "alertes",
                question: "À quoi sert la page « Les alertes » ?",
                answer: (
                    <p>
                        La page{" "}
                        <Link to="/alertes">Les alertes</Link> rassemble
                        des informations de prévention sur différents risques
                        rencontrés lors des balades en Gironde : chenilles
                        processionnaires, cyanobactéries, épillets et périodes
                        de chasse. Vous y trouverez des explications sur ces
                        dangers, les précautions à prendre et les bons réflexes
                        pour rester vigilant lors de vos sorties.
                    </p>
                ),
            },
        ],
    },
    {
        id: "contact",
        title: "À propos de Girond'ogs",
        icon: MessageCircle,
        questions: [
            {
                id: "proposer-lieu",
                question: "Comment proposer un nouveau lieu de balade ?",
                answer: (
                    <p>
                        Rendez-vous sur la page{" "}
                        <Link to="/contact">Contact</Link> et sélectionnez
                        le motif « Proposer un nouveau lieu de balade ».
                        Décrivez le lieu et partagez les informations dont
                        vous disposez afin que nous puissions étudier
                        votre proposition.
                    </p>
                ),
            },
            {
                id: "signaler-erreur",
                question: "Comment signaler une erreur ou une information qui a changé ?",
                answer: (
                    <p>
                        Depuis la page <Link to="/contact">Contact</Link>,
                        sélectionnez le motif « Signalement pour un lieu de
                        balade ». Vous pourrez rechercher la commune et le
                        lieu concernés, choisir le type de signalement et
                        préciser les informations à corriger.
                    </p>
                ),
            },
            {
                id: "types-signalement",
                question: "Quels types de problèmes puis-je signaler ?",
                answer: (
                    <>
                        <p>Vous pouvez notamment signaler :</p>
                        <ul>
                            <li>Un accès fermé ou devenu inaccessible.</li>
                            <li>Une réglementation incorrecte ou modifiée.</li>
                            <li>Un danger ou un risque pour les chiens.</li>
                            <li>Une information erronée.</li>
                            <li>Un problème de stationnement ou d'accès.</li>
                            <li>Tout autre problème concernant un lieu.</li>
                        </ul>
                    </>
                ),
            },
            {
                id: "question-suggestion",
                question: "Comment poser une question ou faire une suggestion ?",
                answer: (
                    <p>
                        Utilisez le formulaire de la page{" "}
                        <Link to="/contact">Contact</Link> et sélectionnez
                        le motif correspondant à votre demande : question,
                        suggestion ou amélioration, ou autre demande.
                    </p>
                ),
            },
            {
                id: "partenariat",
                question: "Puis-je proposer un partenariat avec Girond'ogs ?",
                answer: (
                    <p>
                        Bien sûr ! Rendez-vous sur la page{" "}
                        <Link to="/contact">Contact</Link>, sélectionnez
                        « Un partenariat » et décrivez votre proposition.
                    </p>
                ),
            },
        ],
    },
];

function FAQPage() {
    const [openQuestions, setOpenQuestions] = useState<
        Record<string, string | null>
    >({});

    const handleToggle = (categoryId: string, questionId: string) => {
        setOpenQuestions((current) => ({
            ...current,
            [categoryId]:
                current[categoryId] === questionId ? null : questionId,
        }));
    };

    return (
        <div className="faq-page">
            <SiteNavigation />

            <main className="faq-page__main">
                <header className="faq-page__header">
                    <span className="faq-page__eyebrow">
                        <CircleHelp size={16} aria-hidden="true" />
                        Besoin d'aide ?
                    </span>
                    <h1>Foire aux questions</h1>
                    <p>
                        Retrouvez les réponses aux questions les plus
                        fréquentes sur Girond'ogs, son fonctionnement et
                        les balades avec votre chien.
                    </p>
                </header>

                <nav
                    className="faq-page__navigation"
                    aria-label="Catégories de la foire aux questions"
                >
                    <h2>Parcourir les thèmes</h2>

                    <div className="faq-page__categories">
                        {faqCategories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <a
                                    key={category.id}
                                    href={`#${category.id}`}
                                    className="faq-page__category-link"
                                >
                                    <Icon size={19} aria-hidden="true" />
                                    <span>{category.title}</span>
                                </a>
                            );
                        })}
                    </div>
                </nav>

                <div className="faq-page__content">
                    {faqCategories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <section
                                key={category.id}
                                id={category.id}
                                className="faq-page__section"
                                aria-labelledby={`${category.id}-title`}
                            >
                                <div className="faq-page__section-heading">
                                    <Icon size={23} aria-hidden="true" />
                                    <h2 id={`${category.id}-title`}>
                                        {category.title}
                                    </h2>
                                </div>

                                <div className="faq-page__questions">
                                    {category.questions.map((question) => (
                                        <FAQAccordion
                                            key={question.id}
                                            id={`${category.id}-${question.id}`}
                                            question={question.question}
                                            isOpen={
                                                openQuestions[category.id] ===
                                                question.id
                                            }
                                            onToggle={() =>
                                                handleToggle(
                                                    category.id,
                                                    question.id
                                                )
                                            }
                                        >
                                            {question.answer}
                                        </FAQAccordion>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <footer className="faq-page__footer">
                    <h2>Vous n'avez pas trouvé votre réponse ?</h2>
                    <p>
                        Une question, une suggestion ou une information à
                        partager ? N'hésitez pas à nous contacter.
                    </p>
                    <Link to="/contact" className="faq-page__contact-link">
                        Nous contacter
                    </Link>
                </footer>
            </main>
        </div>
    );
}

export default FAQPage;
