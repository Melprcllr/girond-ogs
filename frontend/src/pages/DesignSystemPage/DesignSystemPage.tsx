import { useState } from "react";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";
import Select from "../../components/atoms/Select/Select";
import Badge from "../../components/atoms/Badge/Badge";
import Radio from "../../components/atoms/Radio/Radio";
import RadioGroup from "../../components/molecules/RadioGroup/RadioGroup";
import Textarea from "../../components/atoms/Textarea/Textarea";
import CheckboxGroup from "../../components/molecules/CheckboxGroup/CheckboxGroup";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";
import type { Commune } from "../../components/molecules/SearchBar/SearchBar";

import "./DesignSystemPage.scss";

function DesignSystemPage() {
    const options = [
        { label: "Forêt", value: "forest" },
        { label: "Plage", value: "beach" },
        { label: "Prairie", value: "meadow" },
        { label: "Lac", value: "lake" },
    ];
    const [difficulty, setDifficulty] = useState("moderate");

    const difficultyOptions = [
        { label: "Facile", value: "easy" },
        { label: "Modéré", value: "moderate" },
        { label: "Difficile", value: "difficult" },
    ];
    const [selectedEnvironments, setSelectedEnvironments] = useState([
        "forest",
        "river",
    ]);
    const environmentOptions = [
        { label: "Forêt", value: "forest" },
        { label: "Prairie", value: "meadow" },
        { label: "Plage", value: "beach" },
        { label: "Vignoble", value: "vineyard" },
        { label: "Rivière", value: "river" },
        { label: "Lac ou étang", value: "lake" },
    ];
    const demoCommunes: Commune[] = [
        { id: "canejan", name: "Canéjan", postalCodes: ["33610"] },
        { id: "merignac", name: "Mérignac", postalCodes: ["33700"] },
        { id: "pessac", name: "Pessac", postalCodes: ["33600"] },
        { id: "talence", name: "Talence", postalCodes: ["33400"] },
        { id: "gradignan", name: "Gradignan", postalCodes: ["33170"] },
    ];
    const [selectedCommune, setSelectedCommune] =
        useState<Commune | null>(null);
    return (
        <main className="design-system-page">
            <header className="design-system-page__header">
                <p className="design-system-page__brand">Girond'ogs</p>
                <h1>Design System</h1>
                <p className="design-system-page__description">
                    Bibliothèque des composants de l'interface Girond'ogs.
                </p>
            </header>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Button</h2>
                    <p>Composant permettant de déclencher une action.</p>
                </div>

                <div className="design-system-section__content">
                    <h3>Variantes</h3>

                    <div className="design-system-section__examples">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="tertiary">Tertiary</Button>
                        <Button variant="danger">Danger</Button>
                    </div>

                    <h3>Tailles</h3>

                    <div className="design-system-section__examples">
                        <Button size="small">Small</Button>
                        <Button size="medium">Medium</Button>
                        <Button size="large">Large</Button>
                    </div>

                    <h3>États</h3>

                    <div className="design-system-section__examples">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button fullWidth>Full width</Button>
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Input</h2>
                    <p>
                        Champ de saisie permettant à l'utilisateur de renseigner une information.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <div className="design-system-section__input-example">
                        <h3>État normal</h3>

                        <Input
                            label="Ville"
                            placeholder="Ex : Bordeaux"
                            hint="Saisis une ville ou une adresse."
                        />
                    </div>

                    <div className="design-system-section__input-example">
                        <h3>Champ obligatoire</h3>

                        <Input
                            label="Adresse e-mail"
                            type="email"
                            placeholder="exemple@email.fr"
                            required
                        />
                    </div>

                    <div className="design-system-section__input-example">
                        <h3>État d'erreur</h3>

                        <Input
                            label="Recherche"
                            placeholder="Rechercher une balade..."
                            error="Une erreur est survenue."
                        />
                    </div>

                    <div className="design-system-section__input-example">
                        <h3>État désactivé</h3>

                        <Input
                            label="Champ désactivé"
                            placeholder="Indisponible"
                            disabled
                        />
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Checkbox</h2>
                    <p>
                        Case à cocher permettant de sélectionner une ou plusieurs options.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>États</h3>

                    <div className="design-system-section__examples">
                        <Checkbox label="Forêt" />
                        <Checkbox label="Plage" defaultChecked />
                        <Checkbox label="Prairie" disabled />
                        <Checkbox label="Lac" defaultChecked disabled />
                    </div>

                    <h3>Avec indication</h3>

                    <div className="design-system-section__examples">
                        <Checkbox
                            label="Présence d'eau"
                            hint="Ruisseau, rivière, lac ou étang."
                        />
                    </div>

                    <h3>Avec erreur</h3>

                    <div className="design-system-section__examples">
                        <Checkbox
                            label="Acceptation des conditions"
                            error="Tu dois accepter les conditions."
                        />
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Select</h2>
                    <p>
                        Menu déroulant permettant de sélectionner une option parmi plusieurs choix.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <div className="design-system-section__input-example">
                        <h3>État normal</h3>

                        <Select
                            label="Environnement"
                            options={[
                                { label: "Forêt", value: "forest" },
                                { label: "Plage", value: "beach" },
                                { label: "Prairie", value: "meadow" },
                                { label: "Lac", value: "lake" },
                            ]}
                            hint="Sélectionne un environnement."
                        />
                    </div>

                    <div className="design-system-section__input-example">
                        <h3>Champ obligatoire</h3>

                        <Select
                            label="Difficulté"
                            required
                            placeholder="Choisir une difficulté"
                            options={[
                                { label: "Facile", value: "easy" },
                                { label: "Modérée", value: "moderate" },
                                { label: "Difficile", value: "hard" },
                            ]}
                        />
                    </div>

                    <div className="design-system-section__input-example">
                        <h3>État d'erreur</h3>

                        <Select
                            label="Rayon de recherche"
                            options={[
                                { label: "5 km", value: "5" },
                                { label: "10 km", value: "10" },
                                { label: "20 km", value: "20" },
                            ]}
                            error="Veuillez sélectionner un rayon."
                        />
                    </div>

                    <div className="design-system-section__input-example">
                        <h3>État désactivé</h3>

                        <Select
                            label="Environnement indisponible"
                            options={options}
                            disabled
                        />
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Badge</h2>
                    <p>
                        Élément visuel permettant de présenter une information courte
                        ou un statut.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>Variantes</h3>

                    <div className="design-system-section__examples">
                        <Badge variant="neutral">Information</Badge>
                        <Badge variant="success">Chiens autorisés</Badge>
                        <Badge variant="warning">Laisse obligatoire</Badge>
                        <Badge variant="danger">Baignade déconseillée</Badge>
                        <Badge variant="info">Zone ombragée</Badge>
                    </div>

                    <h3>Tailles</h3>

                    <div className="design-system-section__examples">
                        <Badge size="small">Small</Badge>
                        <Badge size="medium">Medium</Badge>
                        <Badge size="large">Large</Badge>
                    </div>

                    <h3>Avec icône</h3>

                    <div className="design-system-section__examples">
                        <Badge variant="success" icon="🐾">
                            Balade canine
                        </Badge>

                        <Badge variant="warning" icon="⚠️">
                            Vigilance
                        </Badge>
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Radio</h2>
                    <p>
                        Élément permettant de sélectionner une seule option parmi plusieurs
                        possibilités.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>États</h3>

                    <div className="design-system-section__examples">
                        <Radio
                            name="difficulty-example"
                            value="easy"
                            label="Facile"
                        />

                        <Radio
                            name="difficulty-example"
                            value="moderate"
                            label="Modéré"
                            defaultChecked
                        />

                        <Radio
                            name="difficulty-example"
                            value="difficult"
                            label="Difficile"
                        />

                        <Radio
                            name="difficulty-disabled"
                            value="disabled"
                            label="Option indisponible"
                            disabled
                        />
                    </div>

                    <h3>Avec indication</h3>

                    <div className="design-system-section__examples">
                        <Radio
                            name="difficulty-hint"
                            value="easy"
                            label="Facile"
                            hint="Parcours accessible à tous"
                        />
                    </div>

                    <h3>Avec erreur</h3>

                    <div className="design-system-section__examples">
                        <Radio
                            name="difficulty-error"
                            value="easy"
                            label="Facile"
                            error="Veuillez sélectionner une difficulté"
                        />
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>RadioGroup</h2>
                    <p>
                        Groupe de boutons radio permettant de sélectionner une seule
                        option parmi plusieurs possibilités.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>Groupe interactif</h3>

                    <div className="design-system-section__examples">
                        <RadioGroup
                            label="Difficulté du parcours"
                            name="design-difficulty"
                            options={difficultyOptions}
                            value={difficulty}
                            onChange={setDifficulty}
                            hint="Sélectionne le niveau qui te convient."
                        />

                        <p>
                            Valeur sélectionnée : <strong>{difficulty}</strong>
                        </p>
                    </div>

                    <h3>État désactivé</h3>

                    <div className="design-system-section__examples">
                        <RadioGroup
                            label="Disponibilité"
                            name="design-availability"
                            options={[
                                { label: "Disponible", value: "available" },
                                { label: "Indisponible", value: "unavailable" },
                            ]}
                            value="available"
                            onChange={() => { }}
                            disabled
                        />
                    </div>

                    <h3>Avec erreur</h3>

                    <div className="design-system-section__examples">
                        <RadioGroup
                            label="Type de parcours"
                            name="design-route"
                            options={[
                                { label: "Boucle", value: "loop" },
                                { label: "Aller-retour", value: "return" },
                            ]}
                            value=""
                            onChange={() => { }}
                            error="Veuillez sélectionner un type de parcours."
                        />
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>Textarea</h2>
                    <p>
                        Zone de saisie multiligne permettant aux visiteurs
                        de rédiger un message dans le formulaire de contact.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>États</h3>

                    <div className="design-system-section__examples">
                        <Textarea
                            label="Votre message"
                            placeholder="Écrivez votre message ici..."
                        />

                        <Textarea
                            label="Votre message"
                            defaultValue="Bonjour, je souhaiterais obtenir davantage d'informations sur un lieu."
                        />

                        <Textarea
                            label="Votre message"
                            placeholder="Saisie indisponible"
                            disabled
                        />
                    </div>

                    <h3>Avec indication</h3>

                    <div className="design-system-section__examples">
                        <Textarea
                            label="Votre message"
                            hint="Décrivez votre demande afin que nous puissions vous répondre au mieux."
                            placeholder="Écrivez votre message..."
                        />
                    </div>

                    <h3>Avec erreur</h3>

                    <div className="design-system-section__examples">
                        <Textarea
                            label="Votre message"
                            error="Veuillez renseigner votre message."
                        />
                    </div>
                </div>
            </section>


            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>CheckboxGroup</h2>
                    <p>
                        Groupe de cases à cocher permettant de sélectionner
                        plusieurs caractéristiques d'un même lieu.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>Groupe interactif</h3>

                    <div className="design-system-section__examples">
                        <CheckboxGroup
                            label="Environnements présents"
                            name="design-environments"
                            options={environmentOptions}
                            value={selectedEnvironments}
                            onChange={setSelectedEnvironments}
                            hint="Plusieurs environnements peuvent être sélectionnés."
                        />

                        <p>
                            Caractéristiques sélectionnées :{" "}
                            <strong>{selectedEnvironments.length}</strong>
                        </p>
                    </div>

                    <h3>État désactivé</h3>

                    <div className="design-system-section__examples">
                        <CheckboxGroup
                            label="Équipements disponibles"
                            name="design-equipment"
                            options={[
                                { label: "Parking", value: "parking" },
                                { label: "Point d'eau potable", value: "water" },
                                { label: "Aire de pique-nique", value: "picnic" },
                            ]}
                            value={["parking"]}
                            onChange={() => { }}
                            disabled
                        />
                    </div>

                    <h3>Avec erreur</h3>

                    <div className="design-system-section__examples">
                        <CheckboxGroup
                            label="Caractéristiques du lieu"
                            name="design-characteristics"
                            options={[
                                { label: "Ombragé", value: "shaded" },
                                { label: "Présence d'eau", value: "water" },
                            ]}
                            value={[]}
                            onChange={() => { }}
                            error="Veuillez renseigner au moins une caractéristique."
                        />
                    </div>
                </div>
            </section>

            <section className="design-system-section">
                <div className="design-system-section__header">
                    <h2>SearchBar</h2>
                    <p>
                        Recherche géographique permettant de trouver une commune
                        de Gironde par son nom ou son code postal.
                    </p>
                </div>

                <div className="design-system-section__content">
                    <h3>Recherche interactive</h3>

                    <div className="design-system-section__examples">
                        <SearchBar
                            communes={demoCommunes}
                            selectedCommune={selectedCommune}
                            onSelect={setSelectedCommune}
                            onClear={() => setSelectedCommune(null)}
                        />
                    </div>

                    <h3>État désactivé</h3>

                    <div className="design-system-section__examples">
                        <SearchBar
                            communes={demoCommunes}
                            selectedCommune={null}
                            onSelect={() => { }}
                            onClear={() => { }}
                            disabled
                        />
                    </div>
                </div>
            </section>

        </main>
    );
}

export default DesignSystemPage;