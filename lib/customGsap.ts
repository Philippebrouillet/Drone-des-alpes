import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
gsap.config({
  nullTargetWarn: false,
});
export default gsap;
