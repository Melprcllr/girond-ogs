
import {
    AlertTriangle,
    MapPin,
    Phone,
    Clock,
} from "lucide-react";

import "./EmergencyContact.scss";

const emergencyServices = [
    {
        name: "CHV AniCura Aquivet",
        city: "Mérignac",
        address: "4-6 rue Léon Morane, 33700 Mérignac",
        phone: "05 56 95 01 01",
        phoneLink: "tel:0556950101",
        addressLink:
            "https://www.google.com/maps/search/?api=1&query=4-6+rue+Leon+Morane+33700+Merignac",
    },
    {
        name: "Maison des Urgences Vétérinaires",
        city: "Lormont",
        address: "4 rue Georges Jérôme Duret, 33310 Lormont",
        phone: "05 33 82 20 20",
        phoneLink: "tel:0533822020",
        addressLink:
            "https://www.google.com/maps/search/?api=1&query=4+rue+Georges+Jerome+Duret+33310+Lormont",
    },
    {
        name: "Établissement Vétérinaire Bordeaux Sud",
        city: "Villenave-d'Ornon",
        address: "2 avenue des Pyrénées, 33140 Villenave-d'Ornon",
        phone: "05 64 37 66 60",
        phoneLink: "tel:0564376660",
        addressLink:
            "https://www.google.com/maps/search/?api=1&query=2+avenue+des+Pyrenees+33140+Villenave-dOrnon",
    },
];

function EmergencyContact() {
    return (
        <section
            className="emergency-contact"
            aria-labelledby="emergency-contact-title"
        >
            <div className="emergency-contact__header">
                <div className="emergency-contact__icon">
                    <AlertTriangle size={26} strokeWidth={1.8} />
                </div>

                <div>
                    <span className="emergency-contact__eyebrow">
                        En cas d'urgence
                    </span>

                    <h2 id="emergency-contact-title">
                        Besoin d'un vétérinaire en urgence ?
                    </h2>
                </div>
            </div>

            <div className="emergency-contact__warning">
                <strong>
                    N'attendez pas que les symptômes s'aggravent.
                </strong>

                <p>
                    En cas d'intoxication, de blessure ou de comportement
                    inhabituel, contactez rapidement un service vétérinaire.
                </p>

                <p className="emergency-contact__warning-reminder">
                    <AlertTriangle size={18} />
                    Appelez toujours avant de vous déplacer.
                </p>
            </div>

            <div className="emergency-contact__services">
                {emergencyServices.map((service) => (
                    <article
                        className="emergency-contact__service"
                        key={service.name}
                    >
                        <div className="emergency-contact__service-heading">
                            <h3>{service.name}</h3>

                            <span className="emergency-contact__availability">
                                <Clock size={14} />
                                24h/24 – 7j/7
                            </span>
                        </div>

                        <span className="emergency-contact__city">
                            {service.city}
                        </span>

                        <a
                            className="emergency-contact__phone"
                            href={service.phoneLink}
                            aria-label={`Appeler ${service.name} au ${service.phone}`}
                        >
                            <Phone size={17} />
                            {service.phone}
                        </a>

                        <a
                            className="emergency-contact__address"
                            href={service.addressLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MapPin size={17} />
                            <span>{service.address}</span>
                        </a>
                    </article>
                ))}
            </div>

            <p className="emergency-contact__footer">
                Ces coordonnées sont fournies à titre informatif.
                En cas de doute, contactez un vétérinaire sans attendre.
            </p>
        </section>
    );
}

export default EmergencyContact;
