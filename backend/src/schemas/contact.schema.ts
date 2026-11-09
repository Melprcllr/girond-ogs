import { z } from "zod";

const optionalText = z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined);

const contactSchema = z
    .object({
        reason: z.enum([
            "question",
            "suggestion",
            "new-place",
            "partnership",
            "report",
            "other",
        ]),
        firstName: z.string().trim().min(2).max(100),
        email: z.string().trim().email().max(254),
        message: z.string().trim().min(10).max(5000),

        proposedPlace: optionalText,
        commune: optionalText,
        selectedPlaceId: optionalText,
        reportType: optionalText,
    })
    .superRefine((data, context) => {
        if (data.reason === "new-place" && !data.proposedPlace) {
            context.addIssue({
                code: "custom",
                path: ["proposedPlace"],
                message: "Le nom du lieu proposé est obligatoire.",
            });
        }

        if (data.reason === "report") {
            if (!data.commune) {
                context.addIssue({
                    code: "custom",
                    path: ["commune"],
                    message: "La commune est obligatoire.",
                });
            }

            if (!data.selectedPlaceId) {
                context.addIssue({
                    code: "custom",
                    path: ["selectedPlaceId"],
                    message: "Le lieu à signaler est obligatoire.",
                });
            }

            if (!data.reportType) {
                context.addIssue({
                    code: "custom",
                    path: ["reportType"],
                    message: "Le type de signalement est obligatoire.",
                });
            } else if (
                ![
                    "access",
                    "regulations",
                    "danger",
                    "information",
                    "parking",
                    "other",
                ].includes(data.reportType)
            ) {
                context.addIssue({
                    code: "custom",
                    path: ["reportType"],
                    message: "Le type de signalement est invalide.",
                });
            }
        }
    });

// Type TypeScript déduit automatiquement du schéma Zod.
export type ContactFormData = z.infer<typeof contactSchema>;

export default contactSchema;
