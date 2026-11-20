
import type { AlertCardProps } from "../components/organisms/AlertCard/AlertCard";

export type SeasonalAlert = AlertCardProps & {
    /** Texte court affiché dans la popup */
    shortDescription: string;

    /** Icône associée à l'alerte (nom Lucide) */
    icon: string;

    /** Précautions synthétiques affichées dans la popup */
    precautions: string[];

    /** Date de début d'affichage au format YYYY-MM-DD */
    activeFrom?: string;

    /** Date de fin d'affichage au format YYYY-MM-DD */
    activeUntil?: string;

    /** Mois durant lesquels le risque mérite une vigilance particulière (1 à 12) */
    activeMonths?: number[];

    /** Conseil concernant les filtres de recherche */
    filterAdvice?: {
        description: string;
        filterLabel?: string;
    };

    /** Type de signalement proposé dans le formulaire */
    reportType?: "chenilles" | "cyanobacteries";
};

export const alerts: SeasonalAlert[] = [
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
        shortDescription:
            "La saison de chasse est ouverte en Gironde. Redoublez de vigilance lors de vos promenades.",
        icon: "crosshair",
        precautions: [
            "Gardez votre chien en longe.",
            "Privilégiez les chemins fréquentés et les zones dégagées.",
            "Portez des vêtements aux couleurs visibles.",
            "Évitez les secteurs de battue et prenez en compte les panneaux.",
        ],
        activeFrom: "2026-09-13",
        activeUntil: "2027-02-28",
    },
    {
        id: "chenilles-processionnaires",
        title: "Les chenilles processionnaires du pin",
        period: "Automne au printemps — vigilance renforcée en hiver et au printemps",
        riskLevel: "critical",
        introduction:
            "Les chenilles processionnaires du pin possèdent des poils extrêmement urticants. Chez le chien, un simple contact avec une chenille, un nid ou des poils dispersés peut provoquer des lésions graves, notamment au niveau de la langue et de la bouche. Il existe également des chenilles processionnaires du chêne, qui présentent elles aussi un risque pour les animaux. Cette fiche est consacrée exclusivement aux processionnaires du pin, particulièrement surveillées dans notre région.",
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
                    "Les chenilles processionnaires vivent principalement dans les pins et parfois dans les cèdres. Les nids sont généralement visibles dans les branches à l'automne et en hiver. Les chenilles descendent ensuite des arbres pour s'enfouir dans le sol, principalement entre la fin de l'hiver et le printemps. Les périodes peuvent varier selon les conditions météorologiques.",
                items: [
                    "Pins : nids blancs soyeux dans les branches.",
                    "Troncs : chenilles pouvant descendre en procession.",
                    "Sol : chenilles se déplaçant en file pour s'enfouir.",
                    "Forêts, parcs, jardins et espaces boisés comportant des pins.",
                ],
            },
            {
                title: "Les bons réflexes",
                content:
                    "Évitez tout contact avec les chenilles et les nids, même lorsqu'ils semblent abandonnés. Les poils urticants peuvent rester présents dans l'environnement.",
                items: [
                    "Évitez les zones où des chenilles ou des nids sont repérés.",
                    "Gardez votre chien en longe à proximité des pins infestés.",
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
        shortDescription:
            "Les chenilles processionnaires peuvent provoquer des lésions graves chez votre chien. Soyez particulièrement vigilant à proximité des pins.",
        icon: "bug",
        precautions: [
            "Évitez les zones où des chenilles ou des nids sont repérés.",
            "Gardez votre chien en longe à proximité des arbres infestés.",
            "Ne laissez jamais votre chien renifler ou lécher une chenille.",
        ],
        // la période à risque pour les chenilles processionnaires du pin s'étend principalement de janvier à mai (à vérifier)
        activeMonths: [12, 1, 2, 3, 4, 5],
        filterAdvice: {
            description:
                "Privilégiez les lieux sans pins pour limiter l'exposition aux chenilles processionnaires.",
            filterLabel: "Éviter les pins",
        },
        reportType: "chenilles",
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
        shortDescription:
            "Certaines eaux peuvent contenir des toxines dangereuses, voire mortelles pour votre chien.",
        icon: "droplets",
        precautions: [
            "Évitez les eaux présentant des dépôts ou une coloration suspecte.",
            "Ne laissez pas votre chien boire ou se baigner dans une eau suspecte.",
            "Empêchez-le de lécher les berges et les dépôts.",
        ],
        // les cyanobactéries prolifèrent principalement de mai à septembre
        activeMonths: [5, 6, 7, 8, 9],
        reportType: "cyanobacteries",
    },

    {
        id: "chaleurs",
        title: "Fortes chaleurs et canicules",
        period: "Été — vigilance renforcée lors des épisodes de fortes chaleurs",
        riskLevel: "critical",

        introduction:
            "Les fortes chaleurs peuvent rapidement mettre la santé de votre chien en danger. Les chiens régulent moins efficacement leur température corporelle que les humains et peuvent subir une déshydratation, un coup de chaleur ou des brûlures aux coussinets. Le risque augmente lors des épisodes de canicule, notamment pendant les activités physiques et les promenades aux heures les plus chaudes.", mainImage: {
                src: "/images/alerts/chaleurs.jpg",
                alt: "Chien à l'ombre pendant une journée ensoleillée",
            },
        sections: [
            {
                title: "Quand et où être vigilant ?",
                content:
                    "Le risque augmente lors des épisodes de fortes chaleurs et de canicule, particulièrement lorsque les températures restent élevées pendant plusieurs jours. Certains environnements accentuent l'exposition à la chaleur.",
                items: [
                    "Espaces sans ombre et chemins exposés au soleil.",
                    "Plages, routes et sols qui accumulent la chaleur.",
                    "Véhicules et espaces mal ventilés.",
                    "Promenades ou activités physiques aux heures les plus chaudes.",
                ],
            },
            {
                title: "Les bons réflexes",
                content:
                    "Adaptez les sorties et les activités de votre chien aux températures. En période de forte chaleur, mieux vaut privilégier le repos et la fraîcheur.",
                items: [
                    "Promenez votre chien tôt le matin ou tard le soir.",
                    "Privilégiez les endroits ombragés et les parcours courts.",
                    "Mettez toujours de l'eau fraîche à sa disposition.",
                    "Évitez les efforts physiques et les jeux intenses.",
                    "Vérifiez la température du sol avant de marcher.",
                    "Ne laissez jamais votre chien seul dans une voiture, même quelques minutes.",
                ],
            },
            {
                title: "Les signes du coup de chaleur",
                content:
                    "Un coup de chaleur est une urgence vétérinaire. Les symptômes peuvent évoluer rapidement et mettre la vie de votre chien en danger.",
                items: [
                    "Halètement intense et respiration rapide.",
                    "Salivation excessive.",
                    "Agitation, faiblesse ou abattement inhabituel.",
                    "Vomissements ou diarrhées.",
                    "Difficultés à se déplacer, perte d'équilibre ou malaise.",
                    "Convulsions ou perte de connaissance.",
                ],
            },
            {
                title: "En cas de coup de chaleur : urgence vétérinaire",
                content:
                    "Si vous suspectez un coup de chaleur, contactez immédiatement un vétérinaire. N'attendez pas que les symptômes s'aggravent.",
                items: [
                    "Placez votre chien dans un endroit frais et ombragé.",
                    "Mouillez progressivement son corps avec de l'eau fraîche, sans utiliser d'eau glacée.",
                    "Proposez-lui de petites quantités d'eau s'il est conscient et peut boire.",
                    "Ventilez-le si possible.",
                    "Contactez immédiatement un vétérinaire et suivez ses consignes.",
                    "Ne le forcez pas à boire et ne retardez pas la consultation.",
                ],
            },
        ],
        shortDescription:
            "Les fortes chaleurs peuvent provoquer une déshydratation ou un coup de chaleur. Adaptez les promenades et surveillez votre chien.",
        icon: "sun",
        precautions: [
            "Privilégiez les promenades tôt le matin ou tard le soir.",
            "Choisissez des endroits ombragés et évitez les efforts.",
            "Laissez toujours de l'eau fraîche à disposition.",
            "Ne laissez jamais votre chien dans une voiture.",
        ],
        // à mettre à jour en fonction des vraies périodes de fortes chaleurs/canicule
        //        activeFrom: "2027-07-15",
        //        activeUntil: "2027-07-20",
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
        shortDescription:
            "Les épillets peuvent pénétrer dans la peau et les orifices de votre chien et provoquer des infections.",
        icon: "wheat",
        precautions: [
            "Évitez les herbes hautes et sèches.",
            "Privilégiez les chemins entretenus.",
            "Inspectez les oreilles et les pattes après chaque balade.",
        ],
        // la période à risque pour les épillets s'étend de mai à septembre, avec un pic critique en juin et juillet (à vérifier)
        activeMonths: [5, 6, 7, 8, 9],
    },
];
