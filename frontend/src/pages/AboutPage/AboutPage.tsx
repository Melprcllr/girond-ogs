import { Link } from "react-router-dom";
import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import "./AboutPage.scss";

function AboutPage() {
    return (
        <main className="about-page">
            <SiteNavigation />

            <div className="about-page__content">
                {/* Introduction */}
                <header className="about-hero">
                    <div className="about-hero__image-wrapper">
                        <img
                            className="about-hero__image"
                            src="/images/aboutPage/balade-parc.jpeg"
                            alt="Une personne qui profite d'une balade avec ses chiens"
                        />
                    </div>

                    <div className="about-hero__content-wrapper">
                        <div className="about-hero__content">
                            <span className="about-hero__eyebrow">
                                À PROPOS DE GIROND'OGS
                            </span>

                            <h1>
                                Et si on allait se promener ailleurs aujourd'hui ?
                            </h1>

                            <p>
                                À l'origine de Girond'ogs, une envie toute simple :
                                découvrir de nouveaux endroits et partager de belles
                                balades avec nos chiens.
                            </p>
                        </div>
                    </div>
                </header>

                {/* L'envie de départ */}
                <section className="about-section about-section--split">
                    <div className="about-section__text">
                        <span className="about-section__eyebrow">
                            D'OÙ VIENT L'IDÉE ?
                        </span>

                        <h2>Une envie de découverte</h2>

                        <p>
                            Tout est parti d'une envie assez simple : découvrir
                            toujours plus de lieux de balade à partager avec mes
                            chiens.
                        </p>

                        <p>
                            Parce qu'une balade, ce n'est pas seulement sortir
                            prendre l'air. C'est leur offrir de nouvelles odeurs
                            à découvrir, des environnements à explorer, des
                            espaces pour courir en liberté ou se promener
                            tranquillement en longe.
                        </p>

                        <p>
                            C'est aussi leur permettre de rencontrer des
                            congénères, de profiter du calme, de découvrir de
                            nouveaux paysages ou simplement de changer de décor.
                        </p>

                        <p>
                            J'avais envie de leur proposer cette diversité, de
                            ne pas toujours retourner au parc au bout de la rue
                            ou emprunter les mêmes chemins.
                        </p>
                    </div>

                    <img
                        className="about-section__image"
                        src="/images/aboutPage/kaido-plage.jpg"
                        alt="Un chien sur la plage qui court vers l'océan"
                    />
                </section>

                {/* La recherche du lieu idéal */}
                <section className="about-section about-section--questions">
                    <div className="about-section__intro">
                        <span className="about-section__eyebrow">
                            LA GRANDE QUESTION
                        </span>

                        <h2>Mais alors… on va où ?</h2>

                        <p>
                            C'est souvent la première question quand on prévoit
                            une sortie. Et trouver le bon endroit n'est pas
                            toujours évident !
                        </p>
                    </div>

                    <div className="about-questions__quotes">
                        <span>« On va où aujourd'hui ? »</span>
                        <span>« Tu as une idée de balade ? »</span>
                        <span>« On pourrait aller promener où ? »</span>
                    </div>

                    <p>
                        On pense avoir déniché un joli coin, on fait quelques
                        kilomètres… pour finalement tomber sur une propriété
                        privée, un chemin qui se termine au bout de 300 mètres
                        par un grillage ou un accès qui n'est pas autorisé aux
                        chiens. Parfois, la découverte est un peu décevante !
                    </p>

                    <p>
                        Et même lorsqu'on pense avoir trouvé le lieu idéal,
                        d'autres questions arrivent :
                    </p>

                    <div className="about-questions__grid">
                        <div className="about-question">
                            <span className="about-question__icon">☀</span>
                            <span>Est-ce qu'il y aura suffisamment d'ombre ?</span>
                        </div>

                        <div className="about-question">
                            <span className="about-question__icon">≈</span>
                            <span>Est-ce qu'ils pourront se baigner ?</span>
                        </div>

                        <div className="about-question">
                            <span className="about-question__icon">!</span>
                            <span>
                                Y a-t-il des risques liés aux chenilles processionnaires ?
                            </span>
                        </div>

                        <div className="about-question">
                            <span className="about-question__icon">⌁</span>
                            <span>Est-ce qu'ils doivent être tenus en laisse ?</span>
                        </div>
                    </div>

                    <p className="about-section__closing">
                        Autant de petits détails qui peuvent complètement
                        changer le choix d'une balade.
                    </p>
                </section>

                {/* La naissance de Girond'ogs */}
                <section className="about-section about-section--split about-section--reverse">
                    <img
                        className="about-section__image"
                        src="/images/aboutPage/chiens-foret.jpeg"
                        alt="Deux chiens en promenade dans une foret de pins"
                    />

                    <div className="about-section__text">
                        <span className="about-section__eyebrow">
                            LE PROJET
                        </span>

                        <h2>C'est comme ça qu'est né Girond'ogs !</h2>

                        <p>
                            J'ai eu envie de créer un espace qui rassemble des
                            idées de balades en Gironde, avec des informations
                            utiles pour préparer ses sorties et choisir des
                            lieux adaptés à ses envies et aux besoins de son
                            chien.
                        </p>

                        <p>
                            L'objectif ? <strong>Découvrir, explorer et varier
                                les plaisirs</strong>, tout en ayant accès à des
                            informations aussi fiables et à jour que possible
                            sur les lieux proposés.
                        </p>

                        <p>
                            Environnement, présence d'eau, zones ombragées,
                            réglementation, stationnement, points de vigilance…
                            Autant d'informations pour partir plus sereinement,
                            éviter certaines mauvaises surprises et profiter
                            pleinement de ces moments partagés.
                        </p>

                        <p>
                            Parce que chaque chien est différent, chaque balade
                            aussi. Certains jours, on recherche un grand espace
                            pour se dépenser ; d'autres fois, une promenade
                            tranquille à l'ombre, un coin d'eau ou simplement
                            un nouvel endroit à renifler.
                        </p>
                    </div>
                </section>

                {/* Le partage */}
                <section className="about-community">
                    <span className="about-community__eyebrow">
                        ENSEMBLE
                    </span>

                    <h2>Un projet qui se construit ensemble</h2>

                    <p>
                        Girond'ogs a à cœur de partager les informations les
                        plus justes et vérifiées possibles. Mais un lieu peut
                        évoluer, un accès peut fermer, une réglementation
                        changer ou un nouveau risque apparaître.
                    </p>

                    <p>
                        C'est pourquoi le partage et l'entraide ont toute leur
                        place ici. Vos découvertes, vos remarques et vos
                        signalements sont précieux pour enrichir les fiches et
                        maintenir les informations à jour.
                    </p>

                    <p>
                        L'idée est simple : <strong>s'entraider pour multiplier
                            les possibilités de belles balades</strong>, et permettre
                        à chacun de profiter de moments privilégiés avec son ou
                        ses chiens.
                    </p>

                    <p>
                        Et puis, rassurez-vous : on a tous nos petits endroits
                        secrets, ces coins qu'on ne partage qu'avec les copains
                        les plus proches. Ceux-là peuvent bien rester secrets !
                        Ils font aussi partie de la magie de nos explorations.
                    </p>

                    <p className="about-community__signature">
                        Alors, prêts à découvrir de nouveaux horizons avec vos
                        chiens ?
                    </p>

                    <Link to="/" className="about-community__button">
                        Trouver maintenant la balade idéale
                    </Link>

                </section>
            </div>
        </main>
    );
}

export default AboutPage;
