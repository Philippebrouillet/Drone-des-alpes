"use client";

import { useState, useEffect } from "react";
import { APP_NAME, Services, phoneContact, emailContact } from "@/lib/constant";
import { User, Building2, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import MultiSelect from "@/lib/components/MultiSelect";
import gsap from "../../customGsap";

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

  // Animation lors du changement de type de client
  useEffect(() => {
    const formFields = document.querySelectorAll(`${sectionId} .form-field`);

    if (formFields.length > 0) {
      gsap.fromTo(
        formFields,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }
  }, [clientType]);

  useEffect(() => {
    // Animation du header (titre + paragraphe)
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionId,
        start: "top 80%",
        once: true,
      },
    });

    headerTl
      .fromTo(
        `${sectionId} .contact-title`,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
      )
      .fromTo(
        `${sectionId} .contact-subtitle`,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4",
      );

    // Animation des cartes de contact (téléphone + email)
    gsap.fromTo(
      `${sectionId} .contact-card`,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.08, // cascade plus serrée = plus fluide
        ease: "back.out(1.05)", // overshoot très léger (plus pro)
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: `${sectionId} .contact-cards-container`,
          start: "top 85%",
          once: true,
        },
      },
    );
    // Animation du container de formulaire
    gsap.fromTo(
      `${sectionId} .form-container`,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `${sectionId} .form-container`,
          start: "top 85%",
          once: true,
        },
      },
    );

    // Animation des boutons de switch (Particulier/Pro)
    gsap.fromTo(
      `${sectionId} .client-type-btn`,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: `${sectionId} .form-container`,
          start: "top 80%",
          once: true,
        },
      },
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(`${sectionId} .contact-title`);
      gsap.killTweensOf(`${sectionId} .contact-subtitle`);
      gsap.killTweensOf(`${sectionId} .contact-card`);
      gsap.killTweensOf(`${sectionId} .form-container`);
      gsap.killTweensOf(`${sectionId} .client-type-btn`);
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
          {/* En-tête */}
          <div className="text-center mb-12">
            <h2 className="contact-title text-4xl md:text-5xl font-bold text-primary mb-4 opacity-0">
              Contactez-nous
            </h2>
            <p className="contact-subtitle text-lg text-gray-600 max-w-2xl mx-auto opacity-0">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions
            </p>
          </div>

          {/* Cartes d'informations de contact */}
          <div className="contact-cards-container grid grid-cols-1 md:grid-cols-2 gap-4 mb-12  mx-auto">
            {/* Téléphone */}
            <a
              href={`tel:${phoneContact.replace(/\s/g, "")}`}
              className="contact-card flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group opacity-0"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Téléphone</p>
                <p className="text-sm font-bold text-gray-900">
                  {phoneContact}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${emailContact}`}
              className="contact-card flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group opacity-0"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm font-bold text-gray-900">
                  {emailContact}
                </p>
              </div>
            </a>
          </div>

          {/* Formulaire */}
          <div className="max-w-4xl mx-auto">
            <div className="form-container bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden opacity-0">
              {/* Switch Particulier / Pro */}
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setClientType("particulier")}
                  className={`client-type-btn flex-1 py-4 px-6 font-semibold transition-colors duration-200 opacity-0 ${
                    clientType === "particulier"
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    <span>Particulier</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setClientType("pro")}
                  className={`client-type-btn flex-1 py-4 px-6 font-semibold transition-colors duration-200 opacity-0 ${
                    clientType === "pro"
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span>Professionnel</span>
                  </div>
                </button>
              </div>

              {/* Formulaire dynamique */}
              <form className="p-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Formulaire Particulier */}
                  {clientType === "particulier" && (
                    <>
                      {/* Nom */}
                      <div className="form-field">
                        <label
                          htmlFor="nom"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Nom <span className="text-secondary">*</span>
                        </label>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                          placeholder="Votre nom"
                        />
                      </div>

                      {/* Prénom */}
                      <div className="form-field">
                        <label
                          htmlFor="prenom"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Prénom <span className="text-secondary">*</span>
                        </label>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
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
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Nom de société{" "}
                          <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="societe"
                            name="societe"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            placeholder="Nom de votre société"
                          />
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="form-field">
                        <label
                          htmlFor="contact"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Contact <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="contact"
                            name="contact"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
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
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Adresse postale <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Adresse complète"
                      />
                    </div>
                  </div>

                  {/* Prestations souhaitées (commun) */}
                  <div className="form-field relative z-100">
                    <div className="block text-sm font-semibold text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        Prestations souhaitées{" "}
                        <span className="text-secondary">*</span>
                      </div>
                    </div>
                    <MultiSelect
                      options={services}
                      value={selectedPrestations}
                      onChange={setSelectedPrestations}
                      placeholder="Recherchez et sélectionnez vos prestations..."
                      required
                    />
                  </div>

                  {/* Téléphone (commun) */}
                  <div className="form-field">
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Téléphone <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  {/* Email (commun) */}
                  <div className="form-field">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        name="email"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="votre@email.fr"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Décrivez votre projet ou posez vos questions..."
                    ></textarea>
                  </div>

                  {/* Messages de statut */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        ✅ Votre demande a été envoyée avec succès ! Nous vous
                        recontacterons rapidement.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">
                        ❌ Une erreur s'est produite lors de l'envoi. Veuillez
                        réessayer.
                      </p>
                    </div>
                  )}

                  {/* Bouton submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting || selectedPrestations.length === 0
                      }
                      className="w-full  px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition-colors duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      {isSubmitting
                        ? "Envoi en cours..."
                        : "Envoyer ma demande"}
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-4">
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
    </section>
  );
}
