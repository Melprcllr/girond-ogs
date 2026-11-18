
import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import "./../LegalNoticePage/LegalNoticePage.scss";

function PrivacyPolicyPage() {
    return (
        <>
            <SiteNavigation />

            <main className="legal-page">
                <header className="legal-page__header">
                    <p className="legal-page__eyebrow">Girond'ogs</p>
                    <h1>Politique de confidentialité</h1>
                    <p>
                        Cette page explique quelles données sont
                        susceptibles d'être collectées lorsque vous
                        utilisez Girond'ogs et comment elles sont
                        traitées.
                    </p>
                </header>

                <section className="legal-page__section">
                    <h2>1. Responsable du traitement</h2>
                    <p>
                        Le traitement des données personnelles
                        collectées sur Girond'ogs est effectué sous
                        la responsabilité de l'éditeur du site.
                    </p>
                    <p>
                        Pour toute question ou demande relative à
                        vos données personnelles, vous pouvez
                        contacter l'éditeur à l'adresse :
                        {" "}
                        <a href="mailto:tests@girondogs.fr">
                            tests@girondogs.fr
                        </a>.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>2. Données collectées</h2>
                    <p>
                        La consultation du site ne nécessite pas
                        la création d'un compte et aucun profil
                        utilisateur n'est créé.
                    </p>
                    <p>
                        Lorsque vous utilisez le formulaire de
                        contact, les informations suivantes peuvent
                        être collectées :
                    </p>
                    <ul>
                        <li>Votre prénom ;</li>
                        <li>Votre adresse e-mail ;</li>
                        <li>Le motif de votre demande ;</li>
                        <li>Le contenu de votre message ;</li>
                        <li>
                            Selon votre demande, le nom d'un lieu
                            proposé, une commune, l'identifiant
                            d'un lieu ou le type de signalement.
                        </li>
                    </ul>
                    <p>
                        Certains champs sont facultatifs et ne sont
                        demandés que selon le motif sélectionné
                        dans le formulaire.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>3. Finalités et bases légales</h2>
                    <p>Les données du formulaire sont utilisées pour :</p>
                    <ul>
                        <li>
                            Répondre à vos questions et demandes ;
                        </li>
                        <li>
                            Étudier vos suggestions et propositions
                            d'ajout de lieux ;
                        </li>
                        <li>
                            Examiner les signalements concernant
                            les lieux référencés ;
                        </li>
                        <li>
                            Améliorer les informations et le
                            fonctionnement du site.
                        </li>
                    </ul>
                    <p>
                        Ces traitements reposent sur l'intérêt
                        légitime de l'éditeur à administrer le site,
                        répondre aux sollicitations reçues et
                        améliorer les informations proposées.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>4. Destinataires des données</h2>
                    <p>
                        Les informations transmises par le formulaire
                        sont accessibles à l'éditeur du site afin
                        de traiter votre demande.
                    </p>
                    <p>
                        Elles sont également transmises aux
                        prestataires techniques nécessaires au
                        fonctionnement du service :
                    </p>
                    <ul>
                        <li>
                            <strong>o2switch</strong>, pour
                            l'hébergement du site et de son API ;
                        </li>
                        <li>
                            <strong>Resend</strong>, pour
                            l'acheminement des e-mails de notification
                            et de confirmation.
                        </li>
                    </ul>
                    <p>
                        Les données ne sont ni vendues ni utilisées
                        à des fins publicitaires.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>5. Envoi des e-mails et transferts de données</h2>
                    <p>
                        Le formulaire de contact utilise le service
                        Resend pour envoyer les messages à leur
                        destinataire et transmettre un e-mail de
                        confirmation.
                    </p>
                    <p>
                        Resend indique que certaines données,
                        notamment le contenu des e-mails et les
                        journaux de livraison, sont stockées aux
                        États-Unis. Des mécanismes contractuels
                        encadrent les transferts de données depuis
                        l'Espace économique européen, notamment
                        les clauses contractuelles types.
                    </p>
                    <p>
                        Pour en savoir plus :
                        {" "}
                        <a
                            href="https://resend.com/security/gdpr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Informations RGPD de Resend
                        </a>.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>6. Carte et service OpenStreetMap</h2>
                    <p>
                        La carte de Girond'ogs utilise les fonds
                        cartographiques OpenStreetMap. Pour afficher
                        la carte, le navigateur de votre appareil
                        télécharge des images de tuiles depuis les
                        serveurs d'OpenStreetMap.
                    </p>
                    <p>
                        Cette connexion peut transmettre à
                        OpenStreetMap certaines informations
                        techniques, telles que votre adresse IP,
                        les informations de votre navigateur et
                        les tuiles cartographiques demandées.
                    </p>
                    <p>
                        L'utilisation de ces services est soumise
                        à la politique de confidentialité et aux
                        conditions d'utilisation d'OpenStreetMap :
                    </p>
                    <ul>
                        <li>
                            <a
                                href="https://wiki.osmfoundation.org/wiki/Privacy_Policy"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Politique de confidentialité
                                d'OpenStreetMap
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://operations.osmfoundation.org/policies/tiles/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Politique d'utilisation des tuiles
                                cartographiques
                            </a>
                        </li>
                    </ul>
                </section>

                <section className="legal-page__section">
                    <h2>7. Cookies et stockage local</h2>
                    <p>
                        À la date de mise à jour de cette politique,
                        Girond'ogs n'utilise pas de cookies
                        publicitaires ou de mesure d'audience et
                        aucun outil tel que Google Analytics n'est
                        installé.
                    </p>
                    <p>
                        L'application web progressive (PWA) peut
                        utiliser les mécanismes de cache du navigateur
                        pour permettre le chargement de ses ressources
                        et améliorer son fonctionnement. Ces mécanismes
                        ne sont pas utilisés pour créer un profil
                        publicitaire ou suivre votre navigation.
                    </p>
                    <p>
                        Si de nouveaux outils de mesure d'audience
                        ou services nécessitant des traceurs sont
                        ajoutés, cette politique sera mise à jour
                        et les dispositifs d'information et de
                        consentement nécessaires seront mis en place.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>8. Durée de conservation</h2>
                    <p>
                        Les messages reçus via le formulaire de
                        contact sont conservés dans la messagerie
                        de l'éditeur afin d'assurer le suivi des
                        échanges et de garder un historique des
                        suggestions et signalements.
                    </p>
                    <p>
                        Ils sont conservés pendant la durée
                        nécessaire à ces finalités, puis supprimés
                        lorsqu'ils ne sont plus utiles, sous réserve
                        des obligations légales ou de la nécessité
                        de conserver certains éléments pour la
                        gestion d'un éventuel litige.
                    </p>
                    <p>
                        Les prestataires techniques peuvent appliquer
                        leurs propres durées de conservation aux
                        données qu'ils traitent, conformément à
                        leurs politiques et engagements contractuels.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>9. Sécurité</h2>
                    <p>
                        Des mesures techniques et organisationnelles
                        sont mises en œuvre afin de protéger les
                        données transmises contre les accès non
                        autorisés, la perte, l'altération ou la
                        divulgation.
                    </p>
                    <p>
                        Les échanges avec le site sont protégés par
                        une connexion HTTPS.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>10. Vos droits</h2>
                    <p>
                        Conformément à la réglementation applicable
                        en matière de protection des données
                        personnelles, vous disposez notamment des
                        droits suivants, selon les conditions
                        prévues par les textes :
                    </p>
                    <ul>
                        <li>Droit d'accès à vos données ;</li>
                        <li>Droit de rectification ;</li>
                        <li>Droit à l'effacement ;</li>
                        <li>Droit à la limitation du traitement ;</li>
                        <li>
                            Droit d'opposition au traitement fondé
                            sur l'intérêt légitime.
                        </li>
                    </ul>
                    <p>
                        Pour exercer vos droits, vous pouvez
                        adresser votre demande à :
                        {" "}
                        <a href="mailto:tests@girondogs.fr">
                            tests@girondogs.fr
                        </a>.
                    </p>
                    <p>
                        Vous pouvez également introduire une
                        réclamation auprès de la Commission nationale
                        de l'informatique et des libertés (CNIL) :
                        {" "}
                        <a
                            href="https://www.cnil.fr/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            www.cnil.fr
                        </a>.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>11. Mise à jour de la politique</h2>
                    <p>
                        Cette politique de confidentialité peut
                        être modifiée afin de tenir compte des
                        évolutions du site, de ses fonctionnalités
                        ou de la réglementation applicable.
                    </p>
                    <p>
                        La date de dernière mise à jour est indiquée
                        ci-dessous.
                    </p>
                </section>
                <p className="legal-page__updated">
                    Dernière mise à jour : 18 novembre 2026
                </p>
            </main>
        </>
    );
}

export default PrivacyPolicyPage;
