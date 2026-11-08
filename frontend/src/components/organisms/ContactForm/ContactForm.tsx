
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Input from "../../atoms/Input/Input";
import Select from "../../atoms/Select/Select";
import Textarea from "../../atoms/Textarea/Textarea";

import { places } from "../../../data/places";

import "./ContactForm.scss";

const contactReasons = [
    { label: "Une question", value: "question" },
    { label: "Une suggestion ou une amélioration", value: "suggestion" },
    { label: "Proposer un nouveau lieu de balade", value: "new-place" },
    { label: "Un partenariat", value: "partnership" },
    { label: "Signalement pour un lieu de balade", value: "report" },
    { label: "Autre demande", value: "other" },
];

const reportTypes = [
    { label: "Accès fermé ou inaccessible", value: "access" },
    { label: "Réglementation incorrecte ou modifiée", value: "regulations" },
    { label: "Danger ou risque pour les chiens", value: "danger" },
    { label: "Information erronée", value: "information" },
    { label: "Stationnement ou accès compliqué", value: "parking" },
    { label: "Autre problème", value: "other" },
];

type ContactReason =
    | "question"
    | "suggestion"
    | "new-place"
    | "partnership"
    | "report"
    | "other";

interface AvailableCommune {
    name: string;
    postalCodes: string[];
}

interface ContactNavigationState {
    reason?: ContactReason;
    commune?: string;
    placeId?: string;
}

// Normalise le texte pour permettre une recherche sans tenir compte des accents.
function normalizeSearch(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

// Construit la liste des communes présentes dans le catalogue.
const availableCommunes = places.reduce<AvailableCommune[]>(
    (communes, place) => {
        const existingCommune = communes.find(
            (commune) =>
                normalizeSearch(commune.name) ===
                normalizeSearch(place.commune)
        );

        if (existingCommune) {
            if (!existingCommune.postalCodes.includes(place.postalCode)) {
                existingCommune.postalCodes.push(place.postalCode);
            }
        } else {
            communes.push({
                name: place.commune,
                postalCodes: [place.postalCode],
            });
        }

        return communes;
    },
    []
);

function ContactForm() {
    const location = useLocation();

    const [reason, setReason] = useState<ContactReason | "">("");

    // Informations communes
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Proposition d'un nouveau lieu
    const [proposedPlace, setProposedPlace] = useState("");

    // Signalement d'un lieu existant
    const [communeQuery, setCommuneQuery] = useState("");
    const [selectedCommune, setSelectedCommune] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState("");
    const [reportType, setReportType] = useState("");

    const communeSuggestions =
        communeQuery.trim().length >= 2 && !selectedCommune
            ? availableCommunes.filter((commune) => {
                  const search = normalizeSearch(communeQuery);

                  return (
                      normalizeSearch(commune.name).includes(search) ||
                      commune.postalCodes.some((postalCode) =>
                          postalCode.includes(search)
                      )
                  );
              })
            : [];

    const placesInSelectedCommune = selectedCommune
        ? places.filter(
              (place) =>
                  normalizeSearch(place.commune) ===
                  normalizeSearch(selectedCommune)
          )
        : [];

    const handleReasonChange = (value: ContactReason | "") => {
        setReason(value);

        // Les informations communes sont conservées.
        // Les informations spécifiques sont réinitialisées.
        setProposedPlace("");
        setCommuneQuery("");
        setSelectedCommune("");
        setSelectedPlaceId("");
        setReportType("");
    };

    const handleCommuneSelect = (commune: AvailableCommune) => {
        setSelectedCommune(commune.name);
        setCommuneQuery(commune.name);
        setSelectedPlaceId("");
        setReportType("");
    };

    const handleCommuneReset = () => {
        setSelectedCommune("");
        setCommuneQuery("");
        setSelectedPlaceId("");
        setReportType("");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Le traitement et l'envoi seront ajoutés lors de la connexion au backend.
    };

    // Préremplit le formulaire lorsqu'on arrive depuis la fiche d'un lieu.
    useEffect(() => {
        const navigationState =
            location.state as ContactNavigationState | null;

        if (
            navigationState?.reason !== "report" ||
            !navigationState.placeId
        ) {
            return;
        }

        const placeToReport = places.find(
            (place) => place.id === navigationState.placeId
        );

        if (!placeToReport) {
            return;
        }

        setReason("report");
        setCommuneQuery(placeToReport.commune);
        setSelectedCommune(placeToReport.commune);
        setSelectedPlaceId(placeToReport.id);
        setReportType("");
    }, [location.key, location.state]);

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__field">
                <Select
                    label="Votre demande concerne..."
                    options={contactReasons}
                    value={reason}
                    onChange={(event) =>
                        handleReasonChange(
                            event.target.value as ContactReason | ""
                        )
                    }
                    required
                />
            </div>

            {reason === "new-place" && (
                <div className="contact-form__conditional">
                    <h3>Le lieu que vous souhaitez proposer</h3>

                    <Input
                        label="Nom du lieu"
                        placeholder="Ex : Bois de Tanaïs"
                        value={proposedPlace}
                        onChange={(event) =>
                            setProposedPlace(event.target.value)
                        }
                        required
                    />
                </div>
            )}

            {reason === "report" && (
                <div className="contact-form__conditional">
                    <h3>Le lieu concerné</h3>

                    <p>
                        Recherchez la commune ou le code postal du lieu que
                        vous souhaitez signaler.
                    </p>

                    <div className="contact-form__commune">
                        <Input
                            label="Commune ou code postal"
                            placeholder="Ex : Canéjan ou 33610"
                            value={communeQuery}
                            onChange={(event) => {
                                setCommuneQuery(event.target.value);
                                setSelectedCommune("");
                                setSelectedPlaceId("");
                                setReportType("");
                            }}
                            autoComplete="off"
                            required
                        />

                        {communeSuggestions.length > 0 && (
                            <ul className="contact-form__suggestions">
                                {communeSuggestions.map((commune) => (
                                    <li key={normalizeSearch(commune.name)}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCommuneSelect(commune)
                                            }
                                        >
                                            <span>{commune.name}</span>
                                            <span>
                                                {commune.postalCodes.join(", ")}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {communeQuery.trim().length >= 2 &&
                            !selectedCommune &&
                            communeSuggestions.length === 0 && (
                                <p className="contact-form__no-results">
                                    Aucune commune correspondante dans les
                                    lieux actuellement référencés.
                                </p>
                            )}
                    </div>

                    {selectedCommune && (
                        <div className="contact-form__selected-commune">
                            <span>
                                Commune sélectionnée :{" "}
                                <strong>{selectedCommune}</strong>
                            </span>

                            <button
                                type="button"
                                onClick={handleCommuneReset}
                            >
                                Modifier
                            </button>
                        </div>
                    )}

                    {selectedCommune && (
                        <>
                            <Select
                                label="Lieu à signaler"
                                placeholder="Sélectionner un lieu"
                                options={placesInSelectedCommune.map(
                                    (place) => ({
                                        label: place.name,
                                        value: place.id,
                                    })
                                )}
                                value={selectedPlaceId}
                                onChange={(event) => {
                                    setSelectedPlaceId(event.target.value);
                                    setReportType("");
                                }}
                                required
                            />

                            {selectedPlaceId && (
                                <Select
                                    label="Nature du signalement"
                                    placeholder="Choisir le type de problème"
                                    options={reportTypes}
                                    value={reportType}
                                    onChange={(event) =>
                                        setReportType(event.target.value)
                                    }
                                    required
                                />
                            )}
                        </>
                    )}
                </div>
            )}

            <div className="contact-form__fields">
                <Input
                    label="Prénom"
                    placeholder="Votre prénom"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    autoComplete="given-name"
                    required
                />

                <Input
                    label="Adresse e-mail"
                    type="email"
                    placeholder="exemple@email.fr"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                />

                <Textarea
                    label="Votre message"
                    placeholder="Écrivez votre message ici..."
                    hint="Plus votre message est précis, plus nous pourrons vous répondre efficacement."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={6}
                    required
                />
            </div>

            <div className="contact-form__actions">
                <button type="submit" className="contact-form__submit">
                    Envoyer mon message
                </button>
            </div>

            <p className="contact-form__required">
                * Champs obligatoires
            </p>
        </form>
    );
}

export default ContactForm;
