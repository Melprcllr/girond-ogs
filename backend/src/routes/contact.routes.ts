
import { Router } from "express";
import contactSchema from "../schemas/contact.schema.js";

const router = Router();

router.post("/", (req, res) => {
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

    // L'envoi d'email sera ajouté dans une prochaine étape.
    // Pour le moment, les données sont uniquement validées.

    return res.status(200).json({
        success: true,
        message:
            "Votre demande a été reçue et validée. L'envoi des emails n'est pas encore activé.",
    });
});

export default router;
