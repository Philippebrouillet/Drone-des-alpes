import { APP_NAME, emailContact } from "@/lib/constant";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Rate limiting (Upstash Redis — compatible Vercel serverless)
// ---------------------------------------------------------------------------
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "contact_form",
});

// ---------------------------------------------------------------------------
// Schéma Zod
// ---------------------------------------------------------------------------
const baseSchema = z.object({
  clientType: z.enum(["pro", "particulier"]),
  adresse: z.string().max(200).optional(),
  prestations: z
    .array(z.string().min(1))
    .min(1, "Au moins une prestation est requise"),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, "Numéro de téléphone invalide"),
  email: z.email("Adresse email invalide"),
  message: z.string().max(2000).optional(),
});

const particulierSchema = baseSchema.extend({
  clientType: z.literal("particulier"),
  nom: z.string().min(1, "Nom requis").max(100),
  prenom: z.string().min(1, "Prénom requis").max(100),
});

const proSchema = baseSchema.extend({
  clientType: z.literal("pro"),
  societe: z.string().min(1, "Nom de société requis").max(150),
  contact: z.string().min(1, "Nom du contact requis").max(100),
});

const contactSchema = z.discriminatedUnion("clientType", [
  particulierSchema,
  proSchema,
]);

// ---------------------------------------------------------------------------
// Route POST
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Trop de demandes. Veuillez réessayer dans une heure." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();

    // Validation Zod
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const formData = parsed.data;
    const { clientType, adresse, prestations, telephone, email, message } =
      formData;
    const nom = "nom" in formData ? formData.nom : undefined;
    const prenom = "prenom" in formData ? formData.prenom : undefined;
    const societe = "societe" in formData ? formData.societe : undefined;
    const contact = "contact" in formData ? formData.contact : undefined;

    // Construction du contenu de l'email
    const prestationsText = prestations.join(", ");
    const clientInfo =
      clientType === "pro"
        ? `Société: ${societe}\nContact: ${contact}`
        : `Nom: ${nom} ${prenom}`;

    const emailContent = `
Nouvelle demande de devis via le site web

Type de client: ${clientType === "pro" ? "Professionnel" : "Particulier"}
${clientInfo}

Coordonnées:
Email: ${email}
Téléphone: ${telephone}
Adresse: ${adresse}

Prestations souhaitées: ${prestationsText}

Message:
${message || "Aucun message spécifique"}

---
Email envoyé automatiquement depuis le site web ${APP_NAME}
    `.trim();

    // Envoi de l'email
    const sendResult = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [emailContact], // Remplacez par votre email
      subject: `Nouvelle demande de devis - ${
        clientType === "pro" ? societe : `${nom} ${prenom}`
      }`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0c2b6a;">Nouvelle demande de devis</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Informations client</h3>
            <p><strong>Type:</strong> ${
              clientType === "pro" ? "Professionnel" : "Particulier"
            }</p>
            ${
              clientType === "pro"
                ? `<p><strong>Société:</strong> ${societe}</p><p><strong>Contact:</strong> ${contact}</p>`
                : `<p><strong>Nom:</strong> ${nom} ${prenom}</p>`
            }
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Coordonnées</h3>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone:</strong> <a href="tel:${telephone}">${telephone}</a></p>
            <p><strong>Adresse:</strong> ${adresse}</p>
          </div>

          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0c2b6a;">Prestations souhaitées</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${prestations
                .map((prestation: string) => `<li>${prestation}</li>`)
                .join("")}
            </ul>
          </div>

          ${
            message
              ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          `
              : ""
          }

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 12px; text-align: center;">
            Email envoyé automatiquement depuis le site web ${APP_NAME}
          </p>
        </div>
      `,
    });

    if (sendResult.error) {
      throw new Error(sendResult.error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 },
    );
  }
}
