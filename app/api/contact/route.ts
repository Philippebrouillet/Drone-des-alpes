import { APP_NAME } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientType,
      nom,
      prenom,
      societe,
      contact,
      adresse,
      prestations,
      telephone,
      email,
      message,
    } = body;

    // Validation basique
    if (!email || !telephone || !prestations || prestations.length === 0) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

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
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["menguy.julespro@gmail.com"], // Remplacez par votre email
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

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
