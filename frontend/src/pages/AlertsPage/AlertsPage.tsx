import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import EmergencyContact from "../../components/organisms/EmergencyContact/EmergencyContact";
import AlertCard, {
    type AlertCardProps,
} from "../../components/organisms/AlertCard/AlertCard";

import "./AlertsPage.scss";

const alerts: AlertCardProps[] = [
    {
        id: "chasse",
        title: "La chasse",
        period: "13 septembre 2026 au 28 février 2027",
        riskLevel: "high",
        introduction:
            "Pendant la saison de chasse, les promenades en forêt, dans les vignes et à proximité des zones rurales demandent une vigilance particulière. Les battues et les tirs peuvent présenter un danger pour les promeneurs et leurs chiens.",
        mainImage: {
            src: "/images/alerts/chasse.jpg",
            alt: "Panneau signalant une zone de chasse en forêt",
        },
        gallery: [
            {
                src: "/images/alerts/chasse-panneau.jpg",
                alt: "Panneau signalant une battue de chasse",
                caption:
                    "Soyez attentif aux panneaux annonçant une battue ou une zone de chasse.",
                fit: "contain",
            },
            {
                src: "/images/alerts/chasse-chien.jpg",
                alt: "Chien portant un équipement orange fluorescent",
                caption:
                    "Un équipement orange fluorescent permet de rendre votre chien plus visible.",
            },
        ],
        sections: [
            {
                title: "Quand et où être vigilant ?",
                content:
                    "En Gironde, la période générale de chasse 2026-2027 s'étend du 13 septembre 2026 au 28 février 2027. Certaines espèces peuvent toutefois faire l'objet de périodes particulières. Les activités de chasse peuvent aussi varier selon les communes et les secteurs.",
                items: [
                    "Forêts, bois et chemins ruraux.",
                    "Lisières forestières et parcelles agricoles.",
                    "Secteurs signalés par des panneaux de chasse ou de battue.",
                ],
            },
            {
                title: "Les bons réflexes",
                content:
                    "Adaptez vos sorties lorsque vous savez qu'une chasse est en cours ou qu'une battue est organisée à proximité.",
                items: [
                    "Privilégiez les chemins fréquentés et les zones dégagées.",
                    "Gardez votre chien près de vous et en laisse.",
                    "Équipez-vous de vêtements visibles, idéalement orange fluorescent. Faites de même pour votre chien.",
                    "Respectez les panneaux et les consignes affichées.",
                    "En cas de doute, changez d'itinéraire.",
                ],
            },
            {
                title: "Les signes qui doivent alerter",
                content:
                    "Le principal danger est l'exposition à une zone de tir ou à une battue. Soyez attentif à votre environnement.",
                items: [
                    "Détonations ou coups de feu à proximité.",
                    "Présence de chasseurs, de chiens de chasse ou de véhicules regroupés.",
                    "Panneaux temporaires signalant une battue.",
                ],
            },
            {
                title: "En cas d'incident",
                content:
                    "En cas de blessure par arme à feu, éloignez-vous de la zone dangereuse et contactez immédiatement les secours. Pour toute blessure de votre chien, contactez un vétérinaire en urgence.",
                items: [
                    "Ne vous approchez pas d'une zone de tir.",
                    "Mettez-vous à l'abri et éloignez-vous calmement.",
                    "Prévenez les secours si une personne est blessée.",
                    "Appelez un vétérinaire si votre chien est blessé.",
                ],
            },
        ],
    },
    {
        id: "chenilles-processionnaires",
        title: "Les chenilles processionnaires",
        period: "Automne au printemps — vigilance renforcée en hiver et au printemps",
        riskLevel: "critical",
        introduction:
            "Les chenilles processionnaires du pin et du chêne possèdent des poils extrêmement urticants. Chez le chien, un simple contact avec une chenille, un nid ou des poils dispersés peut provoquer des lésions graves, notamment au niveau de la langue et de la bouche.",
        mainImage: {
            src: "/images/alerts/chenilles.jpg",
            alt: "Chenilles processionnaires se déplaçant en file",
        },
        gallery: [
            {
                src: "/images/alerts/chenilles-nid.jpg",
                alt: "Nid de chenilles processionnaires dans un pin",
                caption:
                    "Les nids de processionnaires du pin sont souvent visibles dans les branches.",
            },
            {
                src: "/images/alerts/chenilles-sol.jpg",
                alt: "Procession de chenilles au sol",
                caption:
                    "Les chenilles peuvent descendre des arbres et se déplacer en file sur le sol.",
            },
        ],
        sections: [
            {
                title: "Quand et où les trouver ?",
                content:
                    "La période dépend de l'espèce et des conditions météorologiques. Les processionnaires du pin sont principalement à surveiller de l'automne au printemps, avec une forte vigilance lors des descentes au sol en fin d'hiver et au printemps. Celles du chêne sont davantage présentes au printemps et en été.",
                items: [
                    "Pins : nids dans les branches et processions au sol.",
                    "Chênes : chenilles et nids sur les arbres.",
                    "Parcs, jardins, forêts et espaces boisés.",
                ],
            },
            {
                title: "Les bons réflexes",
                content:
                    "Évitez tout contact avec les chenilles et les nids, même lorsqu'ils semblent abandonnés. Les poils urticants peuvent rester présents dans l'environnement.",
                items: [
                    "Évitez les zones où des chenilles ou des nids sont repérés.",
                    "Gardez votre chien en laisse à proximité des pins et des chênes infestés.",
                    "Ne laissez jamais votre chien renifler ou lécher une chenille.",
                    "Ne touchez jamais les chenilles ou les nids à mains nues.",
                ],
            },
            {
                title: "Les symptômes qui doivent alerter",
                content:
                    "Les symptômes peuvent apparaître rapidement après le contact. Une atteinte de la langue peut évoluer vers une nécrose.",
                items: [
                    "Salivation soudaine et abondante.",
                    "Langue ou babines gonflées, rouges ou douloureuses.",
                    "Vomissements ou difficultés à déglutir.",
                    "Chien qui se frotte le museau ou se gratte la bouche.",
                    "Difficultés respiratoires ou atteinte des yeux.",
                ],
            },
            {
                title: "En cas de contact : urgence vétérinaire",
                content:
                    "N'attendez pas l'apparition des symptômes : un contact suspect doit être considéré comme une urgence vétérinaire.",
                items: [
                    "Éloignez immédiatement votre chien de la zone.",
                    "Protégez vos mains avec des gants avant toute manipulation.",
                    "En cas de contact avec la bouche, rincez abondamment à l'eau froide, sans frotter.",
                    "Ne faites pas vomir votre chien et ne lui donnez pas de médicament sans avis vétérinaire.",
                    "Appelez immédiatement un vétérinaire et suivez ses consignes.",
                ],
            },
        ],
    },
    {
        id: "cyanobacteries",
        title: "Les cyanobactéries",
        period: "Été et début d'automne — vigilance accrue par fortes chaleurs",
        riskLevel: "critical",
        introduction:
            "Certaines cyanobactéries présentes dans les cours d'eau produisent des toxines dangereuses pour les chiens. En Gironde, des décès de chiens ont été signalés après fréquentation de points d'eau contaminés. L'ingestion d'eau, de dépôts ou de débris contaminés peut provoquer une intoxication grave, parfois mortelle.",
        mainImage: {
            src: "/images/alerts/cyanobacteries.jpg",
            alt: "Dépôts verdâtres à la surface d'un cours d'eau",
        },
        gallery: [
            {
                src: "/images/alerts/cyanobacteries-berge.jpg",
                alt: "Amas verdâtres accumulés au bord de l'eau",
                caption:
                    "Des dépôts ou amas verdâtres peuvent s'accumuler sur les berges.",
            },
            {
                src: "/images/alerts/cyanobacteries-eau.jpg",
                alt: "Eau stagnante présentant une coloration inhabituelle",
                caption:
                    "Une eau calme, trouble ou présentant des dépôts inhabituels doit inciter à la prudence.",
            },
        ],
        sections: [
            {
                title: "Quand et où les trouver ?",
                content:
                    "Les cyanobactéries se développent notamment dans les eaux calmes, lorsque les températures sont favorables. En Gironde, le risque est particulièrement important en été et au début de l'automne.",
                items: [
                    "Rivières et cours d'eau à faible courant.",
                    "Zones d'eau stagnante ou peu renouvelée.",
                    "Bords de rivière, rochers et dépôts présents sur les berges.",
                ],
            },
            {
                title: "Comment les repérer et prévenir le risque ?",
                content:
                    "Elles peuvent former des plaques, des mousses ou des dépôts de couleur verte ou brune. Leur présence n'est pas toujours facile à identifier : en cas de doute, mieux vaut éviter tout contact.",
                items: [
                    "Ne laissez pas votre chien se baigner dans une eau suspecte.",
                    "Ne le laissez jamais boire dans les cours d'eau.",
                    "Évitez les bâtons, galets et objets ayant séjourné dans l'eau.",
                    "Respectez les panneaux et interdictions locales.",
                    "Privilégiez les points d'eau dont la qualité est surveillée.",
                ],
            },
            {
                title: "Les symptômes qui doivent alerter",
                content:
                    "Les signes varient selon les toxines et la quantité absorbée. Une intoxication peut évoluer très rapidement.",
                items: [
                    "Vomissements et diarrhées.",
                    "Salivation excessive.",
                    "Tremblements ou convulsions.",
                    "Perte d'équilibre et comportement inhabituel.",
                    "Difficultés respiratoires ou grande faiblesse.",
                ],
            },
            {
                title: "En cas d'exposition : urgence vétérinaire",
                content:
                    "Si votre chien a bu une eau suspecte ou présente des symptômes après une baignade, contactez immédiatement un vétérinaire. N'attendez pas que son état se dégrade.",
                items: [
                    "Éloignez votre chien du point d'eau.",
                    "Empêchez-le de se lécher s'il a des dépôts sur le pelage.",
                    "Rincez son pelage à l'eau claire si nécessaire, en évitant qu'il avale l'eau de rinçage.",
                    "Ne le faites pas vomir et ne lui donnez aucun traitement sans avis vétérinaire.",
                    "Consultez sans délai un vétérinaire, même en l'absence de symptômes.",
                ],
            },
        ],
    },
    {
        id: "epillets",
        title: "Les épillets",
        period: "Printemps à automne — parfois dès mars",
        riskLevel: "high",
        introduction:
            "Les épillets sont de petits épis secs issus de graminées sauvages. Leur forme pointue et leur structure en harpon leur permettent de s'accrocher au pelage et de progresser dans la peau ou les orifices du chien. Ils peuvent provoquer des infections et nécessiter une intervention vétérinaire.",
        mainImage: {
            src: "/images/alerts/epillets.jpg",
            alt: "Épillets secs dans une herbe haute",
        },
        gallery: [
            {
                src: "/images/alerts/epillets-patte.jpg",
                alt: "Épillet accroché entre les doigts d'un chien",
                caption:
                    "Entre les doigts, un épillet peut pénétrer sous la peau et provoquer un abcès.",
            },
            {
                src: "/images/alerts/epillets-oreille.jpg",
                alt: "Épillets dans des herbes hautes",
                caption:
                    "Les oreilles sont particulièrement exposées, notamment chez les chiens aux oreilles tombantes.",
            },
        ],
        sections: [
            {
                title: "Quand et où les trouver ?",
                content:
                    "Les épillets apparaissent avec la croissance et le dessèchement des graminées. En Gironde, la vigilance peut commencer dès le mois de mars lors des années chaudes et se poursuivre jusqu'à l'automne.",
                items: [
                    "Bords de chemins et sentiers.",
                    "Hautes herbes et prairies.",
                    "Terrains en friche et bas-côtés.",
                    "Espaces verts peu entretenus.",
                ],
            },
            {
                title: "Les bons réflexes",
                content:
                    "Après chaque promenade, inspectez votre chien, particulièrement s'il a traversé des herbes hautes ou sèches.",
                items: [
                    "Privilégiez les chemins entretenus.",
                    "Évitez les herbes hautes et les zones récemment fauchées.",
                    "Inspectez les oreilles, les yeux, le nez, les pattes et le pelage.",
                    "Retirez uniquement les épillets superficiels et facilement accessibles.",
                    "Ne tentez pas de retirer un épillet enfoncé dans la peau ou un orifice.",
                ],
            },
            {
                title: "Les symptômes selon la zone touchée",
                content:
                    "Les signes dépendent de l'endroit où l'épillet s'est logé. Une gêne apparemment légère peut cacher une pénétration plus profonde.",
                items: [
                    "Pattes : léchage répété, boiterie, gonflement ou petite plaie entre les doigts.",
                    "Oreilles : secouements de tête, oreille douloureuse, tête penchée.",
                    "Yeux : œil fermé, rougeur, larmoiement ou frottements.",
                    "Nez : éternuements violents et répétés, parfois avec du sang.",
                    "Peau : petite plaie, boule ou écoulement.",
                ],
            },
            {
                title: "En cas de suspicion",
                content:
                    "Un épillet peut continuer à progresser dans les tissus. Ne cherchez pas à l'extraire vous-même s'il est enfoncé ou difficile à atteindre.",
                items: [
                    "Empêchez votre chien de se lécher ou de se gratter.",
                    "Ne mettez aucun objet dans son oreille ou sa narine.",
                    "Ne tentez pas d'extraire un épillet profondément logé.",
                    "Contactez rapidement un vétérinaire pour un examen.",
                    "En cas d'atteinte de l'œil, de douleur importante ou de gêne respiratoire, consultez en urgence.",
                ],
            },
        ],
    },
];

function AlertsPage() {
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
                                        {Array.from({ length: 7 }, (_, dotIndex) => (
                                            <span key={dotIndex} />
                                        ))}
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