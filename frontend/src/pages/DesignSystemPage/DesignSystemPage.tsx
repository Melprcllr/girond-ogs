import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";
import Select from "../../components/atoms/Select/Select";
import "./DesignSystemPage.scss";

function DesignSystemPage() {
    const options = [
        { label: "Forêt", value: "forest" },
        { label: "Plage", value: "beach" },
        { label: "Prairie", value: "meadow" },
        { label: "Lac", value: "lake" },
    ];
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

        </main>
    );
}

export default DesignSystemPage;