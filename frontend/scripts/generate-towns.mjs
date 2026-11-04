
import { writeFile } from "node:fs/promises";

const API_URL =
    "https://geo.api.gouv.fr/departements/33/communes?fields=nom,code,codesPostaux,centre&format=json";

async function generateTowns() {
    console.log("Récupération des communes de Gironde...");

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`);
    }

    const communes = await response.json();

    const towns = communes
        .filter((commune) =>
            commune.centre?.coordinates &&
            commune.codesPostaux?.length
        )
        .map((commune) => ({
            id: commune.code,
            name: commune.nom,
            postalCodes: commune.codesPostaux,
            latitude: commune.centre.coordinates[1],
            longitude: commune.centre.coordinates[0],
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "fr"));

    const fileContent = `// Données générées depuis geo.api.gouv.fr
// Département : Gironde (33)
// Ne pas modifier manuellement ce fichier.

export interface Town {
    id: string;
    name: string;
    postalCodes: string[];
    latitude: number;
    longitude: number;
}

export const towns: Town[] = ${JSON.stringify(towns, null, 4)};
`;

    await writeFile(
        "src/data/towns.ts",
        fileContent,
        "utf-8"
    );

    console.log(`${towns.length} communes récupérées.`);
    console.log("Fichier src/data/towns.ts généré avec succès.");
}

generateTowns().catch((error) => {
    console.error("Impossible de récupérer les communes :", error);
    process.exitCode = 1;
});
