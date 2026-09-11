/**
 * Génère le contour de la zone d'intervention affiché sur la carte.
 *
 * Le calcul est fait une fois pour toutes ici, et son résultat est écrit en dur
 * dans lib/services/zoneIntervention.ts : le site n'embarque donc ni ces
 * bibliothèques ni ces algorithmes, seulement des coordonnées.
 *
 * À relancer si la liste des communes desservies change :
 *   npm install --no-save concaveman polygon-clipping
 *   node --experimental-strip-types scripts/generate-zone.mjs
 */
import fs from "node:fs";
import concavemanMod from "concaveman";
import pc from "polygon-clipping";
import { cityCoordinates } from "../lib/services/interventionZone.ts";

const concaveman = concavemanMod.default ?? concavemanMod;
const RAYON_KM = 10; // marge autour de chaque commune desservie
const CONCAVITE = 2; // plus bas = contour plus près des communes
const TOLERANCE_KM = 1.5; // simplification finale

/**
 * Tracé approximatif de la frontière franco-suisse, refermé au large côté
 * suisse. Le bord ouest longe le canton de Genève — enclavé, ceinturé par des
 * communes que nous desservons — puis remonte le pays de Gex ; le bord sud suit
 * le milieu du lac Léman avant de rejoindre le Valais.
 */
const SUISSE = [
  [6.19, 46.3], [6.235, 46.285], [6.245, 46.225], [6.205, 46.2], [6.2, 46.172],
  [6.16, 46.155], [6.09, 46.152], [5.95, 46.15], [5.96, 46.225], [6.08, 46.245],
  [6.135, 46.262], [6.16, 46.282], [6.175, 46.33], [6.16, 46.39], [6.11, 46.44],
  [6.07, 46.52], [6.2, 46.65], [6.8, 47.1], [7.6, 47.1], [7.6, 45.85],
  [7.05, 46.05], [6.92, 46.25], [6.83, 46.4], [6.64, 46.45], [6.5, 46.43],
  [6.35, 46.4], [6.23, 46.3],
];

// Projection locale en kilomètres, pour que rayons et tolérances soient justes
const LAT0 = 45.9, KM_LAT = 111.32;
const kmLng = 111.32 * Math.cos((LAT0 * Math.PI) / 180);
const versKm = ([lng, lat]) => [lng * kmLng, lat * KM_LAT];
const versDeg = ([x, y]) => [+(x / kmLng).toFixed(4), +(y / KM_LAT).toFixed(4)];

// Un anneau de points autour de chaque commune : le contour épouse ensuite ces
// cercles, ce qui produit la marge sans calcul de buffer dédié.
const SOMMETS = 16;
const nuage = [];
for (const { lat, lng } of Object.values(cityCoordinates)) {
  const [cx, cy] = versKm([lng, lat]);
  for (let i = 0; i < SOMMETS; i++) {
    const a = (2 * Math.PI * i) / SOMMETS;
    nuage.push([cx + RAYON_KM * Math.cos(a), cy + RAYON_KM * Math.sin(a)]);
  }
}

const contourKm = concaveman(nuage, CONCAVITE, RAYON_KM * 0.8);

/** Simplification de Douglas-Peucker, pour alléger le tracé final. */
function simplifier(points, tolerance) {
  if (points.length < 3) return points;
  const distance = (p, a, b) => {
    const [x, y] = p, [x1, y1] = a, [x2, y2] = b;
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
  };
  const garder = (debut, fin, marques) => {
    let max = 0, index = -1;
    for (let i = debut + 1; i < fin; i++) {
      const d = distance(points[i], points[debut], points[fin]);
      if (d > max) { max = d; index = i; }
    }
    if (max > tolerance && index !== -1) {
      marques[index] = true;
      garder(debut, index, marques);
      garder(index, fin, marques);
    }
  };
  const marques = new Array(points.length).fill(false);
  marques[0] = marques[points.length - 1] = true;
  garder(0, points.length - 1, marques);
  return points.filter((_, i) => marques[i]);
}

const contour = simplifier(contourKm, TOLERANCE_KM).map(versDeg);

// Retrait du territoire suisse : différence booléenne, et non un simple anneau
// intérieur — la Suisse mord le bord de la zone, pas seulement son intérieur.
const resultat = pc.difference([contour], [SUISSE]);

const anneaux = resultat.flatMap((polygone) => polygone.map((anneau) => anneau));
const sortie = `// Fichier généré par scripts/generate-zone.mjs — ne pas modifier à la main.
// Contour de la zone d'intervention, territoire suisse retiré.

export type PointZone = { lat: number; lng: number };

/**
 * Anneaux du contour, au format attendu par google.maps.Polygon : le premier
 * est le contour extérieur, les suivants d'éventuelles découpes.
 */
export const zoneInterventionPaths: PointZone[][] = ${JSON.stringify(
  anneaux.map((anneau) => anneau.map(([lng, lat]) => ({ lat, lng }))),
)};
`;

fs.writeFileSync(new URL("../lib/services/zoneIntervention.ts", import.meta.url), sortie);
console.log(`contour : ${contour.length} sommets avant découpe`);
console.log(`résultat : ${resultat.length} polygone(s), ${anneaux.length} anneau(x)`);
anneaux.forEach((a, i) => console.log(`   anneau ${i} : ${a.length} sommets`));
console.log("écrit dans lib/services/zoneIntervention.ts");
