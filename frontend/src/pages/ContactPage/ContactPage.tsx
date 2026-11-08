import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import ContactForm from "../../components/organisms/ContactForm/ContactForm";

import "./ContactPage.scss";

function ContactPage() {
    return (
        <main className="contact-page">
            <SiteNavigation />

            <div className="contact-page__content">
                <header className="contact-page__header">
                    <span className="contact-page__eyebrow">
                        Restons en contact
                    </span>

                    <h1>Contact et signalement</h1>

                    <p>
                        Une question, une idée ou une information à partager ?
                    </p>

                    <p>
                        Girond'ogs évolue grâce aux personnes qui utilisent le
                        site et partagent leurs découvertes.
                        <br />
                        Une question, une suggestion ou une information à
                        corriger ?
                        <br />
                        Nous serons ravis de vous lire.
                    </p>
                </header>

                <section className="contact-page__section">
                    <div className="contact-page__section-header">
                        <h2>Écrivez-nous</h2>

                        <p>
                            Choisissez le motif de votre message pour accéder
                            au formulaire adapté.
                        </p>
                    </div>

                    <ContactForm />
                </section>

                <footer className="contact-page__footer">
                    <p>
                        Merci de contribuer à faire vivre Girond'ogs et à
                        partager de belles balades avec la communauté !
                    </p>
                </footer>
            </div>
        </main>
    );
}

export default ContactPage;