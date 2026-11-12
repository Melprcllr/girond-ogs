
import { Resend } from "resend";
import type { ContactFormData } from "../schemas/contact.schema.js";

const reasonLabels: Record<ContactFormData["reason"], string> = {
    question: "Question",
    suggestion: "Suggestion",
    "new-place": "Proposition d'un nouveau lieu",
    partnership: "Partenariat",
    report: "Signalement",
    other: "Autre demande",
};

const reportTypeLabels: Record<string, string> = {
    access: "Problème d'accès",
    regulations: "Réglementation",
    danger: "Danger",
    information: "Information",
    parking: "Stationnement",
    other: "Autre",
};

// Évite l'injection de HTML dans le contenu des e-mails.
const escapeHtml = (value: string): string =>
    value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };

        return entities[character];
    });

export const sendContactEmail = async (
    data: ContactFormData
): Promise<void> => {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const emailMode = process.env.EMAIL_MODE;
    const contactRecipient = process.env.CONTACT_RECIPIENT_EMAIL;
    const testRecipient = process.env.EMAIL_TEST_RECIPIENT;

    if (!apiKey || !from) {
        throw new Error("La configuration de Resend est incomplète.");
    }

    if (emailMode !== "redirect" && emailMode !== "live") {
        throw new Error("Le mode d'envoi des emails est invalide ou manquant.");
    }

    if (emailMode === "redirect" && !testRecipient) {
        throw new Error("L'adresse de réception des emails de test est manquante.");
    }

    if (emailMode === "live" && !contactRecipient) {
        throw new Error("L'adresse de réception des emails est manquante.");
    }

    const isRedirectMode = emailMode === "redirect";

    // En préproduction, les deux emails sont redirigés vers la boîte de test.
    const adminRecipient = isRedirectMode
        ? testRecipient!
        : contactRecipient!;

    const confirmationRecipient = isRedirectMode
        ? testRecipient!
        : data.email;

    const resend = new Resend(apiKey);

    const details: { label: string; value: string }[] = [
        { label: "Type de demande", value: reasonLabels[data.reason] },
        { label: "Prénom", value: data.firstName },
        { label: "Adresse email", value: data.email },
    ];

    if (data.proposedPlace) {
        details.push({
            label: "Lieu proposé",
            value: data.proposedPlace,
        });
    }

    if (data.commune) {
        details.push({
            label: "Commune",
            value: data.commune,
        });
    }

    if (data.selectedPlaceId) {
        details.push({
            label: "Identifiant du lieu",
            value: data.selectedPlaceId,
        });
    }

    if (data.reportType) {
        details.push({
            label: "Type de signalement",
            value: reportTypeLabels[data.reportType] ?? data.reportType,
        });
    }

    const htmlDetails = details
        .map(
            ({ label, value }) => `
                <tr>
                    <td style="padding: 10px; font-weight: bold; vertical-align: top;">
                        ${escapeHtml(label)}
                    </td>
                    <td style="padding: 10px;">
                        ${escapeHtml(value)}
                    </td>
                </tr>
            `
        )
        .join("");

    const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br>");

    // E-mail de notification destiné à l'administrateur.
    const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #333;">
            <h2 style="color: #52745c;">Nouvelle demande – Girond'ogs</h2>

            <p>Une nouvelle demande a été envoyée depuis le formulaire de contact.</p>

            <table style="width: 100%; border-collapse: collapse; background: #f7f8f5;">
                ${htmlDetails}
            </table>

            <h3 style="margin-top: 28px;">Message</h3>

            <div style="padding: 16px; background: #f7f8f5; border-radius: 8px; line-height: 1.6;">
                ${messageHtml}
            </div>
        </div>
    `;

    const textDetails = details
        .map(({ label, value }) => `${label} : ${value}`)
        .join("\n");

    const adminText = `
Nouvelle demande – Girond'ogs

${textDetails}

Message :
${data.message}
    `.trim();

    // E-mail de confirmation destiné à la personne qui nous a contactés.
    const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #333; line-height: 1.6;">
            <h2 style="color: #52745c;">Merci pour votre message !</h2>

            <p>Bonjour ${escapeHtml(data.firstName)},</p>

            <p>
                Nous avons bien reçu votre demande envoyée depuis
                le formulaire de contact de <strong>Girond'ogs</strong>.
            </p>

            <p>
                Votre message a bien été transmis. Nous vous répondrons
                dès que possible si une réponse est nécessaire.
            </p>

            <div style="margin-top: 24px; padding: 18px; background: #f7f8f5; border-radius: 8px;">
                <p style="margin-top: 0; font-weight: bold;">Récapitulatif de votre demande</p>
                <p><strong>Motif :</strong> ${escapeHtml(reasonLabels[data.reason])}</p>
                <p style="margin-bottom: 8px;"><strong>Votre message :</strong></p>
                <div>${messageHtml}</div>
            </div>

            <p style="margin-top: 28px;">
                Merci de contribuer à faire vivre Girond'ogs !
            </p>

            <p style="color: #52745c; font-weight: bold;">
                À bientôt sur Girond'ogs
            </p>
        </div>
    `;

    const confirmationText = `
Bonjour ${data.firstName},

Nous avons bien reçu votre demande envoyée depuis le formulaire de contact de Girond'ogs.

Votre message a bien été transmis. Nous vous répondrons dès que possible si une réponse est nécessaire.

Récapitulatif :
Motif : ${reasonLabels[data.reason]}

Votre message :
${data.message}

Merci de contribuer à faire vivre Girond'ogs !

À bientôt sur Girond'ogs.
    `.trim();

    // Les deux emails sont envoyés indépendamment l'un de l'autre.
    const [adminResult, confirmationResult] = await Promise.all([
        resend.emails.send({
            from,
            to: adminRecipient,
            ...(isRedirectMode ? {} : { replyTo: data.email }),
            subject: `Girond'ogs – ${reasonLabels[data.reason]} de ${data.firstName}`,
            html: adminHtml,
            text: adminText,
        }),
        resend.emails.send({
            from,
            to: confirmationRecipient,
            subject: "Girond'ogs – Confirmation de votre demande",
            html: confirmationHtml,
            text: confirmationText,
        }),
    ]);

    if (adminResult.error) {
        throw new Error(
            `Échec de l'envoi de la notification : ${adminResult.error.message}`
        );
    }

    if (confirmationResult.error) {
        throw new Error(
            `Échec de l'envoi de la confirmation : ${confirmationResult.error.message}`
        );
    }
};
