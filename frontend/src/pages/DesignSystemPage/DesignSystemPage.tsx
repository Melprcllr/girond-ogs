import Button from "../../components/atoms/Button/Button";
import "./DesignSystemPage.scss";

function DesignSystemPage() {
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
        </main>
    );
}

export default DesignSystemPage;