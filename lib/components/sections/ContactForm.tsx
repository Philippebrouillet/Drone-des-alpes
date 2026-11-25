"use client";

import { useState, useEffect } from "react";
import { APP_NAME, Services, phoneContact, emailContact } from "@/lib/constant";
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Loader2,
  CircleCheck,
  CircleAlert,
} from "lucide-react";
import MultiSelect from "@/lib/components/MultiSelect";
import { revealOnScroll } from "../../customGsap";

type ClientType = "particulier" | "pro";
const sectionId = "#contact";

export default function ContactForm() {
  const [clientType, setClientType] = useState<ClientType>("particulier");
  const [selectedPrestations, setSelectedPrestations] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const services = Object.values(Services);

  useEffect(() => {
    const tween = revealOnScroll(`${sectionId} .reveal`, sectionId);
    return () => {
      tween.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);

    const data = {
      clientType,
      nom: formData.get("nom") as string,
      prenom: formData.get("prenom") as string,
      societe: formData.get("societe") as string,
      contact: formData.get("contact") as string,
      adresse: formData.get("adresse") as string,
      prestations: selectedPrestations,
      telephone: formData.get("telephone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset du formulaire
        // (e?.target as any)?.reset();
        // setSelectedPrestations([]);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={sectionId.replace("#", "")} className="section bg-white">
      <div className="flex justify-center">
        <div className="customContainer">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="sectionTitle reveal">Demander un devis</h2>
              <p className="sectionLead reveal">
                Décrivez votre bâtiment, nous répondons sous 48 heures dans la
                mesure du possible
              </p>

              <ul className="reveal mt-10 divide-y divide-line border-y border-line">
                <li>
                  <a
                    href={`tel:${phoneContact.replace(/\s/g, "")}`}
                    className="flex items-center justify-between gap-4 py-4 group"
                  >
                    <span className="flex items-center gap-3 text-ink-3">
                      <Phone size={18} strokeWidth={1.5} />
                      Téléphone
                    </span>
                    <span className="text-ink tabular-nums group-hover:text-primary transition-colors duration-150">
                      {phoneContact}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${emailContact}`}
                    className="flex items-center justify-between gap-4 py-4 group"
                  >
                    <span className="flex items-center gap-3 text-ink-3">
                      <Mail size={18} strokeWidth={1.5} />
                      Email
                    </span>
                    <span className="text-ink group-hover:text-primary transition-colors duration-150 break-all text-right">
                      {emailContact}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

          {/* Formulaire */}
          <div>
            <div className="form-container bg-white rounded-2xl border border-line overflow-hidden reveal">
              {/* Switch Particulier / Pro */}
              <div className="m-2 p-1 flex gap-1 rounded-xl bg-surface-2">
                <button
                  type="button"
                  onClick={() => setClientType("particulier")}
                  aria-pressed={clientType === "particulier"}
                  className={`flex-1 h-10 px-4 rounded-lg font-medium transition-colors duration-150 ${
                    clientType === "particulier"
                      ? "bg-white text-ink shadow-[0_1px_2px_rgba(15,26,46,0.08)]"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User size={16} strokeWidth={1.75} />
                    <span>Particulier</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setClientType("pro")}
                  aria-pressed={clientType === "pro"}
                  className={`flex-1 h-10 px-4 rounded-lg font-medium transition-colors duration-150 ${
                    clientType === "pro"
                      ? "bg-white text-ink shadow-[0_1px_2px_rgba(15,26,46,0.08)]"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Building2 size={16} strokeWidth={1.75} />
                    <span>Professionnel</span>
                  </div>
                </button>
              </div>

              {/* Formulaire dynamique */}
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Formulaire Particulier */}
                  {clientType === "particulier" && (
                    <>
                      {/* Nom */}
                      <div className="form-field">
                        <label
                          htmlFor="nom"
                          className="block text-sm font-medium text-ink mb-2"
                        >
                          Nom <span className="text-ink-3">*</span>
                        </label>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          required
                          className="w-full px-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                          placeholder="Votre nom"
                        />
                      </div>

                      {/* Prénom */}
                      <div className="form-field">
                        <label
                          htmlFor="prenom"
                          className="block text-sm font-medium text-ink mb-2"
                        >
                          Prénom <span className="text-ink-3">*</span>
                        </label>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          required
                          className="w-full px-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </>
                  )}

                  {/* Formulaire Pro */}
                  {clientType === "pro" && (
                    <>
                      {/* Nom de société */}
                      <div className="form-field">
                        <label
                          htmlFor="societe"
                          className="block text-sm font-medium text-ink mb-2"
                        >
                          Nom de société{" "}
                          <span className="text-ink-3">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="h-4 w-4 text-ink-3" />
                          </div>
                          <input
                            type="text"
                            id="societe"
                            name="societe"
                            required
                            className="w-full pl-10 pr-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                            placeholder="Nom de votre société"
                          />
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="form-field">
                        <label
                          htmlFor="contact"
                          className="block text-sm font-medium text-ink mb-2"
                        >
                          Contact <span className="text-ink-3">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-ink-3" />
                          </div>
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            required
                            className="w-full pl-10 pr-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                            placeholder="Nom du contact"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Adresse postale (commun) */}
                  <div className="form-field">
                    <label
                      htmlFor="adresse"
                      className="block text-sm font-medium text-ink mb-2"
                    >
                      Adresse postale <span className="text-ink-3">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-ink-3" />
                      </div>
                      <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        required
                        className="w-full pl-10 pr-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                        placeholder="Adresse complète"
                      />
                    </div>
                  </div>

                  {/* Prestations souhaitées (commun) */}
                  <div className="form-field relative z-100">
                    <div className="block text-sm font-medium text-ink mb-2">
                      <div className="flex items-center gap-2">
                        Prestations souhaitées{" "}
                        <span className="text-ink-3">*</span>
                      </div>
                    </div>
                    <MultiSelect
                      options={services}
                      value={selectedPrestations}
                      onChange={setSelectedPrestations}
                      placeholder="Sélectionnez vos prestations"
                      required
                    />
                  </div>

                  {/* Téléphone (commun) */}
                  <div className="form-field">
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-medium text-ink mb-2"
                    >
                      Téléphone <span className="text-ink-3">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-ink-3" />
                      </div>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        required
                        className="w-full pl-10 pr-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  {/* Email (commun) */}
                  <div className="form-field">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-ink mb-2"
                    >
                      Email <span className="text-ink-3">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-ink-3" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        name="email"
                        required
                        className="w-full pl-10 pr-4 h-11 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150"
                        placeholder="votre@email.fr"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-ink mb-2"
                    >
                      Message <span className="text-ink-3">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-ink/15 rounded-[10px] text-ink placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-[border-color,box-shadow] duration-150 resize-none"
                      placeholder="Décrivez votre projet"
                    ></textarea>
                  </div>

                  {/* Messages de statut */}
                  {submitStatus === "success" && (
                    <div className="flex gap-3 p-4 bg-green-50 border border-green-600/15 rounded-[10px] text-green-800">
                      <CircleCheck size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      <p>
                        Votre demande a bien été envoyée. Nous vous
                        recontactons rapidement.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex gap-3 p-4 bg-red-50 border border-red-600/15 rounded-[10px] text-red-800">
                      <CircleAlert size={18} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                      <p>
                        L&apos;envoi a échoué. Réessayez, ou appelez-nous au{" "}
                        {phoneContact}.
                      </p>
                    </div>
                  )}

                  {/* Bouton submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting || selectedPrestations.length === 0
                      }
                      className="w-full h-12 px-6 bg-primary text-white font-medium rounded-[10px] hover:bg-primary-600 active:scale-[0.98] transition-[background-color,transform] duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      {isSubmitting
                        ? "Envoi en cours"
                        : "Envoyer ma demande"}
                    </button>
                    <p className="text-xs text-ink-3 text-center mt-4">
                      En soumettant ce formulaire, vous acceptez d&apos;être
                      contacté par {APP_NAME} concernant votre demande.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
