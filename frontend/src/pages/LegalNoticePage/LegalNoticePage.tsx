
import SiteNavigation from "../../components/organisms/SiteNavigation/SiteNavigation";
import "./../LegalNoticePage/LegalNoticePage.scss";

function LegalNoticePage() {
    return (
        <>
            <SiteNavigation />

            <main className="legal-page">
                <header className="legal-page__header">
                    <p className="legal-page__eyebrow">Girond'ogs</p>
                    <h1>Mentions légales</h1>
                    <p>
                        Les informations légales relatives au site
                        Girond'ogs.
                    </p>
                </header>

                <section className="legal-page__section">
                    <h2>1. Édition du site</h2>
                    <p>
                        Le site Girond'ogs, accessible à l'adresse
                        https://test.girondogs.fr, est un projet personnel
                        non professionnel, édité à titre gratuit.
                    </p>
                    <p>
                        L'éditeur exerce cette activité à titre non
                        professionnel. Conformément à l'article 6, III, 2
                        de la loi n° 2004-575 du 21 juin 2004 pour la
                        confiance dans l'économie numérique (LCEN), ses
                        coordonnées personnelles ne sont pas rendues
                        publiques. Elles ont été communiquées à
                        l'hébergeur du site dans les conditions prévues
                        par la loi.
                    </p>
                    <p>
                        Pour toute demande concernant le site, vous pouvez
                        contacter l'éditeur à l'adresse :
                        {" "}
                        <a href="mailto:tests@girondogs.fr">
                            tests@girondogs.fr
                        </a>.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>2. Directeur de la publication</h2>
                    <p>
                        La responsabilité de la publication est assurée
                        par l'éditeur du site.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>3. Hébergement</h2>
                    <p>Le site est hébergé par :</p>
                    <address>
                        <strong>o2switch</strong>
                        <br />
                        Chemin des Pardiaux
                        <br />
                        63000 Clermont-Ferrand – France
                        <br />
                        Téléphone : 04 44 44 60 40
                        <br />
                        Site web :{" "}
                        <a
                            href="https://www.o2switch.fr/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            www.o2switch.fr
                        </a>
                    </address>
                </section>

                <section className="legal-page__section">
                    <h2>4. Propriété intellectuelle</h2>
                    <p>
                        Sauf mention contraire, les contenus originaux
                        présents sur Girond'ogs, notamment les textes,
                        éléments graphiques, éléments d'interface,
                        illustrations et développements, sont protégés
                        par les dispositions applicables en matière de
                        propriété intellectuelle.
                    </p>
                    <p>
                        Toute reproduction, représentation,
                        modification ou réutilisation substantielle de
                        ces contenus sans autorisation préalable de
                        l'éditeur est interdite, sous réserve des
                        exceptions prévues par la loi.
                    </p>
                    <p>
                        Les données cartographiques sont fournies par
                        OpenStreetMap et ses contributeurs, selon les
                        conditions de leur licence.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>5. Responsabilité</h2>
                    <p>
                        Girond'ogs met à disposition des informations
                        concernant des lieux de promenade accessibles
                        avec des chiens en Gironde. Ces informations
                        sont fournies à titre indicatif et peuvent
                        évoluer.
                    </p>
                    <p>
                        Malgré le soin apporté à leur collecte et à
                        leur mise à jour, l'éditeur ne garantit pas
                        leur exactitude, leur exhaustivité ni leur
                        actualité permanente.
                    </p>
                    <p>
                        Il appartient à chaque visiteur de vérifier
                        sur place les conditions d'accès, la
                        réglementation applicable et les éventuels
                        risques. Les consignes des autorités et la
                        signalisation présente sur les lieux doivent
                        toujours être respectées.
                    </p>
                    <p>
                        L'éditeur ne saurait être tenu responsable
                        d'une décision prise sur la seule base des
                        informations publiées sur le site.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>6. Données personnelles</h2>
                    <p>
                        Les modalités de collecte et de traitement
                        des données personnelles sont détaillées dans
                        la{" "}
                        <a href="/politique-confidentialite">
                            politique de confidentialité
                        </a>.
                    </p>
                </section>

                <section className="legal-page__section">
                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question concernant le site ou
                        son contenu, vous pouvez écrire à :
                        {" "}
                        <a href="mailto:tests@girondogs.fr">
                            tests@girondogs.fr
                        </a>.
                    </p>
                </section>

                <p className="legal-page__updated">
                    Dernière mise à jour : 18 novembre 2026
                </p>
            </main>
        </>
    );
}

export default LegalNoticePage;
