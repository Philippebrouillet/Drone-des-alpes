"use client";
import gsap from "../../customGsap";
import { APP_NAME } from "@/lib/constant";
import { Clock, Building, Zap } from "lucide-react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyChooseUs() {
  useEffect(() => {
    ScrollTrigger.refresh();
    // Animation pour le titre et sous-titre
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#why-us h2",
        start: "top 80%",
        once: true,
      },
    });

    headerTl
      .fromTo(
        "#why-us h2",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(
        "#why-us-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );

    // Animation Carte 1 - Fade + Scale + Slide depuis le bas
    gsap.fromTo(
      "#why-us #card1",
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#why-us #card1",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Animation Carte 2 - Fade + Scale + Slide depuis le bas (avec délai)
    gsap.fromTo(
      "#why-us #card2",
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#why-us #card2",
          start: "top 90%",
          once: true,
        },
      }
    );

    // Animation Carte 3 - Fade + Scale + Slide depuis le bas (avec délai)
    gsap.fromTo(
      "#why-us #card3",
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#why-us #card3",
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);
  return (
    <section id="why-us" className="section">
      <div className="flex justify-center">
        <div className="customContainer">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Pourquoi choisir{" "}
              <span className="text-secondary">{APP_NAME}</span> ?
            </h2>
            <p
              id="why-us-subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Notre engagement : un service de qualité, flexible et réactif
              adapté à vos besoins
            </p>
          </div>

          {/* Liste des avantages */}
          <div className="space-y-8  mx-auto">
            {/* Plage horaire étendue */}
            <div
              id="card1"
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Plage horaire étendue
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Afin de ne pas perturber le cours de votre vie ou de vos
                    activités, nous avons la possibilité d&apos;effectuer nos
                    prestations{" "}
                    <span className="font-semibold text-primary">
                      sans besoin de votre présence à votre domicile
                    </span>
                    , ainsi que{" "}
                    <span className="font-semibold text-primary">
                      le samedi et le dimanche
                    </span>{" "}
                    pour les professionnels avec des sites à forte affluence
                    salariale.
                  </p>
                </div>
              </div>
            </div>

            {/* Prestations flexibles */}
            <div
              id="card2"
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center">
                    <Building className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Prestations flexibles
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Nous intervenons sur tous types de bâtiments et surfaces :{" "}
                    <span className="font-semibold text-primary">
                      Maison individuelle, Entreprise, Collectivités, Monuments,
                      Ponts…
                    </span>
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Notre drone est en capacité d&apos;intervenir n&apos;importe
                    où !
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Nous travaillons pour le compte de clients de toutes tailles
                    et avons pour vocation à continuer ainsi. C&apos;est
                    pourquoi nous essayons de trouver{" "}
                    <span className="font-semibold text-primary">
                      une solution et un budget adapté à chacune des demandes
                    </span>{" "}
                    qui nous est faite.
                  </p>
                </div>
              </div>
            </div>

            {/* Réponse rapide et sur mesure */}
            <div
              id="card3"
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Réponse rapide et sur mesure
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Dans la mesure du possible, nous nous engageons à répondre à
                    toute demande de devis dans un délai de{" "}
                    <span className="font-semibold text-primary">
                      48 heures maximum
                    </span>
                    .
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Nous nous employons à appliquer la même réactivité pour nos
                    interventions pour toutes les{" "}
                    <span className="font-semibold text-primary">
                      demandes urgentes
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
