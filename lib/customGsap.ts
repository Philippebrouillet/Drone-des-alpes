import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  nullTargetWarn: false,
});
export default gsap;

/**
 * Apparition unique pour tout le site : fondu + montée de 12px, sans rebond.
 * Les cibles sont révélées quand `trigger` entre dans l'écran.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  stagger = 0.05,
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
      stagger,
      scrollTrigger: { trigger: trigger as Element, start: "top 85%", once: true },
    },
  );
}
