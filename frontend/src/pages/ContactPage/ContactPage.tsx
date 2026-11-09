
import { useState } from "react";
import { Link } from "react-router-dom";

import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import ContactForm from "../../components/organisms/ContactForm/ContactForm";

import "./ContactPage.scss";

function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

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
                    {isSubmitted ? (
                        <div
                            className="contact-page__confirmation"
                            role="status"
                            aria-live="polite"
                        >
                            <div className="contact-page__confirmation-icon">
                                <span aria-hidden="true">✓</span>
                            </div>

                            <h2>Votre message a bien été envoyé !</h2>

                            <p>
                                Merci d'avoir pris le temps de nous contacter.
                                Votre demande a bien été transmise.
                            </p>

                            <p>
                                Un e-mail de confirmation vient également de
                                vous être envoyé. Pensez à vérifier vos
                                courriers indésirables si vous ne le trouvez
                                pas dans votre boîte de réception.
                            </p>

                            <p className="contact-page__confirmation-thanks">
                                Merci de contribuer à faire vivre Girond'ogs
                                et à partager de belles balades avec la
                                communauté !
                            </p>

                            <Link
                                to="/"
                                className="contact-page__home-button"
                            >
                                Retour à l'accueil
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="contact-page__section-header">
                                <h2>Écrivez-nous</h2>

                                <p>
                                    Choisissez le motif de votre message pour
                                    accéder au formulaire adapté.
                                </p>
                            </div>

                            <ContactForm
                                onSuccess={() => setIsSubmitted(true)}
                            />
                        </>
                    )}
                </section>

                {!isSubmitted && (
                    <footer className="contact-page__footer">
                        <p>
                            Merci de contribuer à faire vivre Girond'ogs et à
                            partager de belles balades avec la communauté !
                        </p>
                    </footer>
                )}
            </div>
        </main>
    );
}

export default ContactPage;
