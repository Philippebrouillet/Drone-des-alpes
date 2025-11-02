"use client";

import { useState } from "react";
import { Services } from "@/lib/constant";
import { User, Building2, MapPin, Phone, Mail, Briefcase } from "lucide-react";

type ClientType = "particulier" | "pro";

export default function ContactForm() {
  const [clientType, setClientType] = useState<ClientType>("particulier");

  const services = Object.values(Services);

  return (
    <>
      <div id="contact" className="mb-6"></div>

      <section className="section bg-gray-50">
        <div className="flex justify-center">
          <div className="customContainer">
            {/* En-tête */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Demander un devis gratuit
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Remplissez le formulaire ci-dessous et nous vous recontacterons
                dans les plus brefs délais
              </p>
            </div>

            {/* Formulaire */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Switch Particulier / Pro */}
                <div className="flex border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setClientType("particulier")}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors duration-200 ${
                      clientType === "particulier"
                        ? "bg-blue-600 text-white"
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
                    className={`flex-1 py-4 px-6 font-semibold transition-colors duration-200 ${
                      clientType === "pro"
                        ? "bg-blue-600 text-white"
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
                <form className="p-8">
                  <div className="space-y-6">
                    {/* Formulaire Particulier */}
                    {clientType === "particulier" && (
                      <>
                        {/* Nom */}
                        <div>
                          <label
                            htmlFor="nom"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Nom <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="nom"
                            name="nom"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Votre nom"
                          />
                        </div>

                        {/* Prénom */}
                        <div>
                          <label
                            htmlFor="prenom"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Prénom <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Votre prénom"
                          />
                        </div>
                      </>
                    )}

                    {/* Formulaire Pro */}
                    {clientType === "pro" && (
                      <>
                        {/* Nom de société */}
                        <div>
                          <label
                            htmlFor="societe"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Nom de société{" "}
                            <span className="text-red-500">*</span>
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
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Nom de votre société"
                            />
                          </div>
                        </div>

                        {/* Contact */}
                        <div>
                          <label
                            htmlFor="contact"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Contact <span className="text-red-500">*</span>
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
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="Nom du contact"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Adresse postale (commun) */}
                    <div>
                      <label
                        htmlFor="adresse"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Adresse postale <span className="text-red-500">*</span>
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Adresse complète"
                        />
                      </div>
                    </div>

                    {/* Prestation souhaitée (commun) */}
                    <div>
                      <label
                        htmlFor="prestation"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Prestation souhaitée{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="prestation"
                          name="prestation"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                        >
                          <option value="">Sélectionnez une prestation</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Téléphone (commun) */}
                    <div>
                      <label
                        htmlFor="telephone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Téléphone <span className="text-red-500">*</span>
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    {/* Email (commun) */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="votre@email.fr"
                        />
                      </div>
                    </div>

                    {/* Message optionnel */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Message (optionnel)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Décrivez votre projet ou posez vos questions..."
                      ></textarea>
                    </div>

                    {/* Bouton submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                      >
                        Envoyer ma demande
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-4">
                        En soumettant ce formulaire, vous acceptez d&apos;être
                        contacté par Drone des Alpes concernant votre demande.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
