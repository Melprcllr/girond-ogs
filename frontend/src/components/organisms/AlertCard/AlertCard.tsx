
import "./AlertCard.scss";

export interface AlertCardImage {
    src: string;
    alt: string;
    caption?: string;
    position?: string;
    fit?: "cover" | "contain";
}

export interface AlertCardSection {
    title: string;
    content: string;
    items?: string[];
}

export interface AlertCardProps {
    id: string;
    title: string;
    period: string;
    introduction: string;
    mainImage: AlertCardImage;
    gallery?: AlertCardImage[];
    sections: AlertCardSection[];
    riskLevel?: "moderate" | "high" | "critical";
}

function AlertCard({
    id,
    title,
    period,
    introduction,
    mainImage,
    gallery = [],
    sections,
    riskLevel = "high",
}: AlertCardProps) {
    const riskLabels = {
        moderate: "Vigilance",
        high: "Risque important",
        critical: "Danger critique",
    };

    return (
        <article
            id={id}
            className={`alert-card alert-card--${riskLevel}`}
        >
            <header className="alert-card__header">
                <div className="alert-card__heading">
                    <span className="alert-card__period">
                        {period}
                    </span>

                    <h2 className="alert-card__title">
                        {title}
                    </h2>
                </div>

                <span className="alert-card__risk">
                    {riskLabels[riskLevel]}
                </span>
            </header>

            <div className="alert-card__overview">
                <div className="alert-card__introduction">
                    <span className="alert-card__eyebrow">
                        Comprendre le risque
                    </span>

                    <p>{introduction}</p>
                </div>

                <figure className="alert-card__main-image">
                    <img
                        src={mainImage.src}
                        alt={mainImage.alt}
                        loading="lazy"
                        style={{
                            objectPosition: mainImage.position ?? "center",
                            objectFit: mainImage.fit ?? "cover",
                        }}
                    />
                </figure>
            </div>

            {gallery.length > 0 && (
                <div className="alert-card__gallery">
                    {gallery.map((image, index) => (
                        <figure
                            className="alert-card__gallery-item"
                            key={`${image.src}-${index}`}
                        >
                            <div className="alert-card__gallery-image">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    loading="lazy"
                                    style={{
                                        objectPosition:
                                            image.position ?? "center",
                                        objectFit: image.fit ?? "cover",
                                    }}
                                />
                            </div>

                            {image.caption && (
                                <figcaption>
                                    {image.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            )}

            <div className="alert-card__divider" />

            <div className="alert-card__sections">
                {sections.map((section, index) => (
                    <section
                        className="alert-card__section"
                        key={`${section.title}-${index}`}
                    >
                        <span className="alert-card__section-number">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3>{section.title}</h3>

                        <p>{section.content}</p>

                        {section.items && (
                            <ul>
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </article>
    );
}

export default AlertCard;
