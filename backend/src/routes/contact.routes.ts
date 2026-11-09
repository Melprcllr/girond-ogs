
import { Router } from "express";

import contactSchema from "../schemas/contact.schema.js";
import { sendContactEmail } from "../services/email.service.js";

const router = Router();

router.post("/", async (req, res) => {
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Certains champs sont invalides.",
            errors: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    try {
        await sendContactEmail(result.data);

        return res.status(200).json({
            success: true,
            message:
                "Votre demande a bien été envoyée. Merci pour votre message !",
        });
    } catch (error) {
        console.error(
            "Erreur lors de l'envoi de l'email de contact :",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ultérieurement.",
        });
    }
});

export default router;
