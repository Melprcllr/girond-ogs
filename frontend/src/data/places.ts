
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
        imageUrl: "/images/places/domaine-du-pinsan-gallery-07.jpg",

        gallery: [
            "/images/places/domaine-du-pinsan-gallery-01.jpg",
            "/images/places/domaine-du-pinsan-gallery-02.jpg",
            "/images/places/domaine-du-pinsan-gallery-03.jpg",
            "/images/places/domaine-du-pinsan-gallery-04.jpg",
            "/images/places/domaine-du-pinsan-gallery-05.jpg",
            "/images/places/domaine-du-pinsan-gallery-06.jpg",
            "/images/places/domaine-du-pinsan-gallery-07.jpg",
            "/images/places/domaine-du-pinsan-gallery-08.jpg",
            "/images/places/domaine-du-pinsan-gallery-09.jpg",
            "/images/places/domaine-du-pinsan-gallery-10.jpg",
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

    // 

];
