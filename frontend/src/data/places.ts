
import type { Place } from "../types/Place";

/*
TEMPLATE TO COPY WHEN ADDING A NEW LOCATION:

{
    id: "identifiant-du-lieu",
    name: "Nom du lieu",
    commune: "Commune",
    postalCode: "Code postal",

    // Short and personalized description of the location
    description: "Description du lieu.",

    // Main image (optional)
    imageUrl: "/images/places/nom-image.jpg",

    // GPS COORDINATES:
    // 1. Open Google Maps and find the location.
    // 2. Right-click on the exact spot on the map.
    // 3. Click on the latitude and longitude coordinates displayed.
    // 4. Copy them and paste them below.
    latitude: 44.75,
    longitude: -0.65,

    // Specific features: entrances, facilities, paths, points of interest...
    specificities: [
        "3 pedestrian entrances",
        "Several walking paths",
    ],

    // Parking information
    parking: {
        available: true,
        address: "Parking address",
        details: "Additional parking information",
    },

    // Environmental characteristics
    characteristics: {
        vineyards: false,
        forest: true,
        beach: false,
        shadedAreas: true,
        water: null,
        pineTrees: true,
    },

    // Dog regulations
    regulations: {
        dogsOnLeash: true,
        dogsProhibited: false,
    },

    // Risks and points of attention
    risks: {
        processionaryCaterpillars: true,
        farmAnimals: false,
        cyanobacteria: null,
    },

    // Information sources
    sources: [
        {
            name: "Official website",
            url: "https://www.example.com",
        },
    ],

    // Date of the last verification
    lastVerifiedAt: "2026-11-05",
},
*/

// REAL PLACES CATALOGUE
export const places: Place[] = [
    // Parc du Vigean, Eysines
    {
        id: "parc-du-vigean",
        name: "Parc du Vigean",
        commune: "Eysines",
        postalCode: "33320",
        description:
            "\nPetit parc arboré et paisible, composé de plusieurs chemins de promenade et de zones ombragées.\n\n",
        imageUrl: "/images/places/parc-du-vigean.webp",

        gallery: [
            "/images/places/parc-du-vigean-gallery-01.jpg",
            "/images/places/parc-du-vigean-gallery-02.jpg",
            "/images/places/parc-du-vigean-gallery-03.jpg",
            "/images/places/parc-du-vigean-gallery-04.jpg",
            "/images/places/parc-du-vigean-gallery-05.jpg",
            "/images/places/parc-du-vigean-gallery-06.jpg",
        ],

        latitude: 44.88759679861753,
        longitude: -0.6306551156848857,

        specificities: [
            "3 entrées piétonnes",
            "Plusieurs chemins de promenade",
            "Nombreuses zones ombragées",
        ],

        parking: {
            available: true,
            address: "13 rue Jean Macé, 33320 Eysines",
            details: "Le parking donne directement sur une entrée. Ce parking dispose d'environ 10 places.",
        },

        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: false,
            pineTrees: false,
        },

        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: false,
            farmAnimals: false,
            cyanobacteria: false,
        },

        sources: [],
        lastVerifiedAt: "2026-11-05",
    },

    // Domaine du Pinsan, Eysines
    {
        id: "domaine-du-pinsan",
        name: "Domaine du Pinsan",
        commune: "Eysines",
        postalCode: "33320",
        description:
            "50 hectares d'espace naturel en plein cœur d'Eysines, dont 22 hectares de boisements. Le domaine offre de nombreux sentiers pédestres traversant les espaces boisés, des pelouses, des aires de pique-nique et des espaces de loisirs.\n\nEntre promenade à l'ombre des arbres et activités sportives, c'est un lieu agréable pour profiter d'un grand espace de verdure en ville. \n\n⚠️ Depuis le 22 janvier 2026, un arrêté municipal de la Ville d’Eysines impose de tenir les chiens en laisse sur l'ensemble du Domaine du Pinsan.\n\n",
        imageUrl: "/images/places/domaine-du-pinsan.jpeg",

        gallery: [
            "/images/places/domaine-du-pinsan-gallery-00.jpeg",
            "/images/places/domaine-du-pinsan-gallery-01.jpg",
            "/images/places/domaine-du-pinsan-gallery-02.jpg",
            "/images/places/domaine-du-pinsan-gallery-03.jpg",
            "/images/places/domaine-du-pinsan-gallery-04.jpg",
            "/images/places/domaine-du-pinsan-gallery-05.jpg",
            "/images/places/domaine-du-pinsan-gallery-06.jpg",
            "/images/places/domaine-du-pinsan-gallery-07.jpg",
            "/images/places/domaine-du-pinsan-gallery-08.jpeg",
            "/images/places/domaine-du-pinsan-gallery-09.jpeg",
            "/images/places/domaine-du-pinsan-gallery-10.jpeg",
            "/images/places/domaine-du-pinsan-gallery-11.jpeg",
            "/images/places/domaine-du-pinsan-gallery-12.jpeg",
            "/images/places/domaine-du-pinsan-gallery-13.jpg",
            "/images/places/domaine-du-pinsan-gallery-14.jpeg",
        ],

        latitude: 44.86991979131604,
        longitude: -0.6505061309795329,

        specificities: [
            "Une multitude de chemins de balades",
            "Beaucoup de possibilités : forêt, grands espaces ouverts, plaine",
            "Nombreux croismeents humains, chiens, joggeurs, cyclistes...",
        ],

        parking: {
            available: true,
            address: "Avenue René Antoune, 33320 Eysines",
            details: "Grand parking principal proche forêt. Plusieurs parkings dans cette même avenue, parkings Rue du Pinsan (Salle Omnisport, Piscine) et aussi Rue de la Lande Blanche.",
        },

        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: false,
            pineTrees: true,
        },

        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: true,
            farmAnimals: false,
            cyanobacteria: false,
        },

        sources: [],
        lastVerifiedAt: "2026-11-05",
    },
    // Gravière de Saint-Jean-d'Illac
    {
        id: "graviere-saint-jean-d-illac",
        name: "Gravière de Saint-Jean-d'Illac",
        commune: "Saint-Jean-d'Illac",
        postalCode: "33127",
        description:
            "Un espace en pleine nature agréable pour se promener au milieu des paysages boisés entre la gravière et la Jalle. \n\nLes chemins serpentent à travers la forêt et offrent une belle variété de terrains : larges pistes forestières, sentiers plus étroits, chemins sablonneux et pare-feux. Le parcours présente quelques variations de relief, avec des passages en hauteur qui permettent de prendre du recul et de profiter de jolis points de vue sur la gravière. \n\nIl est possible de faire le tour du plan d'eau, de privilégier les chemins forestiers ou de varier les parcours en alternant entre sous-bois et grands chemins dégagés. Un lieu agréable pour varier les sorties et profiter d'un environnement naturel.",
        imageUrl: "/images/places/graviere-saint-jean-d-illac.jpg",

        gallery: [
            "/images/places/graviere-saint-jean-d-illac-gallery-01.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-02.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-03.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-05.jpeg",
            "/images/places/graviere-saint-jean-d-illac-gallery-06.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-07.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-08.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-09.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-10.jpg",
            "/images/places/graviere-saint-jean-d-illac-gallery-11.jpg",
        ],

        latitude: 44.822387305352876,
        longitude: -0.7736134532378431,

        specificities: [
            "Dénivelé et quelques passages en hauteur",
            "Points de vue dégagés sur la gravière",
            "Possibilité de composer des boucles de différentes longueurs",
        ],

        parking: {
            available: true,
            address: "Parking au niveau de la D211, 33127 Saint-Jean-d'Illac",
            details: "Parking donnant sur un chemin forestier qui conduit à la gravière. Plusieurs possibilités pour se garer et accéder au lieu par des chemins forestiers, la forêt ou au plus proche de la gravière.",
        },

        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: true,
        },

        regulations: {
            dogsOnLeash: false,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: true,
            farmAnimals: false,
            cyanobacteria: true,
        },

        sources: [],
        lastVerifiedAt: "2026-11-05",
    },

    // Bois de Tanaïs
    {
        id: "bois-de-tanais",
        name: "Bois de Tanaïs",
        commune: "Blanquefort",
        postalCode: "33290",
        description:
            "Le Bois de Tanaïs offre un bel espace de promenade composé d'une partie aménagée en parc et de nombreux chemins qui se prolongent dans les bois et les espaces environnants. \n\nAvec ses différents itinéraires et ses paysages variés, chacun peut profiter d'une balade à son rythme.\n\nSitué à proximité d'un centre équestre et de plusieurs pâtures, le bois permet également de croiser des chevaux au cours de la promenade. \n\nLe lieu est particulièrement fréquenté le week-end, avec de nombreuses familles et des propriétaires de chiens.",
        imageUrl: "/images/places/bois-de-tanais.jpg",

        gallery: [
            "/images/places/bois-de-tanais-gallery-01.jpg",
            "/images/places/bois-de-tanais-gallery-02.webp",
            "/images/places/bois-de-tanais-gallery-03.webp",
            "/images/places/bois-de-tanais-gallery-04.jpeg",
            "/images/places/bois-de-tanais-gallery-05.JPG",
            "/images/places/bois-de-tanais-gallery-06.jpg",
            "/images/places/bois-de-tanais-gallery-07.webp",
            "/images/places/bois-de-tanais-gallery-08.jpeg",
        ],

        latitude: 44.92933889217298,
        longitude: -0.6560676459570883,

        specificities: [
            "Plusieurs possibilités de boucles et de chemins pour varier les promenades",
            "Possibilité de croiser des chevaux sur les chemins ou à proximité des pâtures",
            "Forte affluence certains week-ends, avec de nombreux chiens et enfants",
        ],

        parking: {
            available: true,
            address: "Avenue de Tanaïs, 33290 Blanquefort",
            details: "Parking principal situé à proximité de la salle de réception de Tanaïs.",
        },

        characteristics: {
            vineyards: true,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: true,
        },

        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: true,
            farmAnimals: true,
            cyanobacteria: true,
        },

        sources: [],
        lastVerifiedAt: "2026-11-05",
    },

    // La forêt de Migelane, Martillac
    {
        id: "foret-de-migelane",
        name: "Foret Départementale de Migelane",
        commune: "Martillac",
        postalCode: "33650",
        description:
            "La forêt de Migelane est un vaste espace naturel de 268 hectares entre chemins forestiers et clairières, ses différents sentiers traversent des paysages variés. Avec quatre boucles de 1,4km à 6,5km, elle offre plusieurs possibilités de promenades, pour une sortie tranquille ou une balade plus longue avec son chien. Ce cadre naturel permet de profiter d'une balade au calme, entre sous-bois espaces plus ouverts, un des itinéraires mène aussi à une petite gravière.",
        imageUrl: "/images/places/foret-de-migelane.jpg",

        gallery: [
            "/images/places/foret-de-migelane-gallery-00.jpeg",
            "/images/places/foret-de-migelane-gallery-01.webp",
            "/images/places/foret-de-migelane-gallery-02.webp",
            "/images/places/foret-de-migelane-gallery-03.webp",
            "/images/places/foret-de-migelane-gallery-04.webp",
            "/images/places/foret-de-migelane-gallery-05.webp",
            "/images/places/foret-de-migelane-gallery-06.webp",
            "/images/places/foret-de-migelane-gallery-07.webp",
            "/images/places/foret-de-migelane-gallery-08.webp",
            "/images/places/foret-de-migelane-gallery-09.webp",
            "/images/places/foret-de-migelane-gallery-10.webp",
            "/images/places/foret-de-migelane-gallery-11.webp",
            "/images/places/foret-de-migelane-gallery-12.webp",
            "/images/places/foret-de-migelane-gallery-13.webp",
            "/images/places/foret-de-migelane-gallery-14.webp",
            "/images/places/foret-de-migelane-gallery-15.webp",
            "/images/places/foret-de-migelane-gallery-16.webp",
            "/images/places/foret-de-migelane-gallery-17.webp",
            "/images/places/foret-de-migelane-gallery-18.webp",
            "/images/places/foret-de-migelane-gallery-19.jpeg",
        ],

        latitude: 44.700735494262524,
        longitude: -0.5781310342481588,

        specificities: [
            "Présence d'une gravière accessible depuis l'un des itinéraires",
            "Site fréquenté par des promeneurs et des familles, particulièrement le week-end",
        ],

        parking: {
            available: true,
            address: "Au bord de la D111, 33650 Martillac",
            details: "Parking principal situé au bord de la Départementale, entrée directe de la forêt.",
        },

        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: true,
        },

        regulations: {
            dogsOnLeash: false,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: true,
            farmAnimals: false,
            cyanobacteria: true,
        },

        sources: [],
        lastVerifiedAt: "2026-11-05",
    },

    // Le Bourgailh, Pessac
    {
        id: "le-bourgailh",
        name: "Le Bourgailh",
        commune: "Pessac",
        postalCode: "33600",
        description:
            "La forêt du Bourgailh est un vaste espace naturel de 110 hectares situé à Pessac, qui offre un cadre agréable pour les promenades au cœur de la nature. \nComposée de différents espaces paysagers, elle propose une belle diversité de décors entre chemins forestiers, allées aménagées et zones plus ouvertes. \nIl y a plusieurs chemins permettant de varier les itinéraires. Au fil de la balade, on découvre différents aménagements en bois, des passerelles et plusieurs belvédères qui offrent des points de vue sur la forêt et ses paysages. \nTrès fréquentée par les familles, les promeneurs et les sportifs, notamment le week-end, la forêt du Bourgailh permet de profiter d'une grande diversité d'activités dans un environnement boisé, à proximité de la ville.",
        imageUrl: "/images/places/foret-du-bourgailh.webp",

        gallery: [
            "/images/places/foret-du-bourgailh-gallery-00.jpeg",
            "/images/places/foret-du-bourgailh-gallery-01.webp",
            "/images/places/foret-du-bourgailh-gallery-02.webp",
            "/images/places/foret-du-bourgailh-gallery-03.webp",
            "/images/places/foret-du-bourgailh-gallery-04.webp",
            "/images/places/foret-du-bourgailh-gallery-05.webp",
            "/images/places/foret-du-bourgailh-gallery-06.webp",
            "/images/places/foret-du-bourgailh-gallery-07.webp",
            "/images/places/foret-du-bourgailh-gallery-08.webp",
            "/images/places/foret-du-bourgailh-gallery-09.webp",
            "/images/places/foret-du-bourgailh-gallery-10.webp",
            "/images/places/foret-du-bourgailh-gallery-11.webp",
            "/images/places/foret-du-bourgailh-gallery-12.webp",
            "/images/places/foret-du-bourgailh-gallery-13.jpg",
            "/images/places/foret-du-bourgailh-gallery-14.jpeg",
            "/images/places/foret-du-bourgailh-gallery-15.jpg",
            "/images/places/foret-du-bourgailh-gallery-16.jpg",
            "/images/places/foret-du-bourgailh-gallery-17.webp",
            "/images/places/foret-du-bourgailh-gallery-18.webp",
            "/images/places/foret-du-bourgailh-gallery-19.webp",
            "/images/places/foret-du-bourgailh-gallery-20.webp",
            "/images/places/foret-du-bourgailh-gallery-21.jpg",
            "/images/places/foret-du-bourgailh-gallery-22.jpg",
            "/images/places/foret-du-bourgailh-gallery-23.jpg",
            "/images/places/foret-du-bourgailh-gallery-24.jpg",

        ],

        latitude: 44.802499053248134,
        longitude: -0.6886524770721357,

        specificities: [
            "Plusieurs belvédères tout au long du parcours",
            "Parc canin au niveau de la rue Lino Ventura",
            "Présence d'un skate parc, d'aires de jeux pour enfants, d'un pumtrack, et d'un bassin de rétention des eaux",
            "Site fréquenté par des joggeurs, cyclistes, et des familles, particulièrement le week-end",
        ],

        parking: {
            available: true,
            address: "Avenue de Beutre, 33600 Pessac",
            details: "Parking principal donnant accès au grand belvédère. Il y a beaucoup d'entrées tout le long du parc. \nUn autre départ connu se fait au niveau du bassin de rétention des eaux au 3 Rue du Château du Bourgailh.",
        },

        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: true,
        },

        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: true,
            farmAnimals: false,
            cyanobacteria: false,
        },

        sources: [],
        lastVerifiedAt: "2026-11-22",
    },

    // Mussonville, Bègles
    {
        id: "mussonville",
        name: "Mussonville",
        commune: "Bègles",
        postalCode: "33130",
        description:
            "Le parc de Mussonville est un vaste espace naturel situé à Bègles, facilement accessible en tram. \nIl offre un cadre agréable pour les promenades, entre espaces boisés, plaines et cours d'eau. \nC'est un parc fréquenté, en fonction de l'horaire, on peut y croiser de nombreux congénères. La partie située du côté de l'entrée tram est davantage aménagée et les chiens doivent être attachés. Dans la partie forêt, les chiens sont tolérés détachés toujours en partageant l'espace avec les autres usagers.",
        imageUrl: "/images/places/mussonville.webp",

        gallery: [
            "/images/places/mussonville-gallery-01.webp",
            "/images/places/mussonville-gallery-02.webp",
            "/images/places/mussonville-gallery-03.webp",
            "/images/places/mussonville-gallery-04.webp",
            "/images/places/mussonville-gallery-05.JPG",
            "/images/places/mussonville-gallery-06.webp",
            "/images/places/mussonville-gallery-07.webp",
            "/images/places/mussonville-gallery-08.webp",
            "/images/places/mussonville-gallery-09.webp",
            "/images/places/mussonville-gallery-10.webp",
            "/images/places/mussonville-gallery-11.webp",
            "/images/places/mussonville-gallery-12.webp",
            "/images/places/mussonville-gallery-13.webp",
            "/images/places/mussonville-gallery-14.webp",
            "/images/places/mussonville-gallery-15.webp",
            "/images/places/mussonville-gallery-16.webp",
            "/images/places/mussonville-gallery-17.webp",
            "/images/places/mussonville-gallery-18.webp",
            "/images/places/mussonville-gallery-19.webp",
            "/images/places/mussonville-gallery-20.webp",
            "/images/places/mussonville-gallery-21.webp",
            "/images/places/mussonville-gallery-22.webp",
            "/images/places/mussonville-gallery-23.webp",
            "/images/places/mussonville-gallery-24.jpeg",
        ],

        latitude: 44.79305657456625,
        longitude: -0.5603066463739168,

        specificities: [
            "Plusieurs sentiers forestiers pour varier les promenades",
            "Possibilité de longer l'Eau Bourde sur la majeure partie du parc",
            "Espace de jeux pour enfants clôturé dans la partie proche du tram",
            "Plusieurs accès piétons au parc",
        ],

        parking: {
            available: true,
            address: "106 Rue Alexis Labro, 33130 Bègles",
            details: "Plusieurs accès permettent de rejoindre le parc, notamment au niveau du tram, ou de l'impasse de la rue Dilly Prolongée et aussi au bout de la rue des Deux Esteys."

        },

        characteristics: {
            vineyards: false,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: false,
        },

        regulations: {
            dogsOnLeash: true,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: false,
            farmAnimals: false,
            cyanobacteria: true,
        },

        sources: [],
        lastVerifiedAt: "2026-11-22",
    },

    // Gravières bleues, Arsac
    {
        id: "gravieres-bleues-arsac",
        name: "Gravières bleues, Arsac",
        commune: "Arsac",
        postalCode: "33460",
        description:
            "Les Gravières bleues d'Arsac offrent un cadre agréable de divers chemins forestiers, sous-bois et plans d'eau. \n\n Une multitude d'itinéraires permet de varier les promenades, en alternant passages ombragés en forêt et chemins ouverts avec une vue dégagée. Les sentiers sablonneux sont agréables à parcourir et permettent de profiter d'une sortie au calme, au cœur des paysages du Médoc.",
        imageUrl: "/images/places/gravieres-bleues-arsac.webp",

        gallery: [
            "/images/places/gravieres-bleues-arsac-gallery-01.webp",
            "/images/places/gravieres-bleues-arsac-gallery-02.webp",
            "/images/places/gravieres-bleues-arsac-gallery-03.jpeg",
            "/images/places/gravieres-bleues-arsac-gallery-04.jpg",
            "/images/places/gravieres-bleues-arsac-gallery-05.webp",
            "/images/places/gravieres-bleues-arsac-gallery-06.webp",
            "/images/places/gravieres-bleues-arsac-gallery-07.jpeg",
            "/images/places/gravieres-bleues-arsac-gallery-08.jpg",
            "/images/places/gravieres-bleues-arsac-gallery-09.jpeg",
            "/images/places/gravieres-bleues-arsac-gallery-10.jpg",
            "/images/places/gravieres-bleues-arsac-gallery-11.jpg",
            "/images/places/gravieres-bleues-arsac-gallery-12.jpeg",
            "/images/places/gravieres-bleues-arsac-gallery-13.webp",
            "/images/places/gravieres-bleues-arsac-gallery-14.webp",
            "/images/places/gravieres-bleues-arsac-gallery-15.jpeg",
            "/images/places/gravieres-bleues-arsac-gallery-16.jpg",
            "/images/places/gravieres-bleues-arsac-gallery-17.jpg",
        ],

        latitude: 45.00585955330243,
        longitude: -0.7051969263276138,

        specificities: [
            "Plusieurs chemins forestiers pour varier les promenades autour des plans d'eau",
            "Plusieurs accès possibles au site, avec des entrées à respecter selon la signalisation",
            "Présence de plans d'eau : baignade des chiens non confirmée",
        ],

        parking: {
            available: false,
            address: "Allée du Luquet au niveau du chemin du Pin, 33460 Arsac",
            details: "Plusieurs accès possibles, attention à bien respecter les panneaux. Au niveau du 38 allée de la Dame Blanche, ou encore du côté de Margaux-Cantenac en partant de la forêt. \n✖ entrée interdite du côté de ma D208"

        },

        characteristics: {
            vineyards: true,
            forest: true,
            beach: false,
            shadedAreas: true,
            water: true,
            pineTrees: true,
        },

        regulations: {
            dogsOnLeash: false,
            dogsProhibited: false,
        },

        risks: {
            processionaryCaterpillars: true,
            farmAnimals: false,
            cyanobacteria: true,
        },

        sources: [],
        lastVerifiedAt: "2026-11-22",
    },

];
