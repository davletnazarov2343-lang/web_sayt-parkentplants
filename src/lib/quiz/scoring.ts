/**
 * Tavsiya algoritmi: 5 ta javob -> top 3 meva turi.
 *
 * Har meva uchun ball: 0-100 oralig'ida.
 * Ballar mantiqiy mezonlardan iborat (eksport potensiali, sho'r yer chidamliligi va h.k.)
 * Bu — Norchontol amaliy ekspertizasining algoritmik aksi. Raqobatchilar
 * statik kontent o'g'irlay olmaydi — bu logika.
 */

import { FRUITS } from "./data";
import type {
  FruitRecommendation,
  QuizAnswers,
  QuizResult,
} from "./types";

// Har bir kriteriya bo'yicha matchReason'ga qo'shiladigan i18n key
type MatchKey =
  | "salt_tolerance"
  | "fast_harvest"
  | "high_income"
  | "export_match"
  | "household_match"
  | "low_water"
  | "good_storage"
  | "mechanization"
  | "regional_match";

export function recommend(answers: QuizAnswers): QuizResult {
  const scored: FruitRecommendation[] = FRUITS.map((fruit) => {
    let score = 50; // base
    const reasons: MatchKey[] = [];

    // --- Maqsad mosligi ---
    if (answers.goal === "export") {
      if (fruit.exportPotential === "high") {
        score += 20;
        reasons.push("export_match");
      } else if (fruit.exportPotential === "low") {
        score -= 15;
      }
    }

    if (answers.goal === "commercial") {
      // O'rta ҳaiyda ham ichki ham eksport — universal
      if (fruit.exportPotential !== "low") score += 8;
    }

    if (answers.goal === "household") {
      if (fruit.goodForBackyard) {
        score += 18;
        reasons.push("household_match");
      } else {
        score -= 25; // hovliga noto'g'ri
      }
    }

    if (answers.goal === "investment") {
      // Yuqori daromad va mexanizatsiya
      const incomeAvg = (fruit.income.min + fruit.income.max) / 2;
      if (incomeAvg > 20000) {
        score += 15;
        reasons.push("high_income");
      }
      if (fruit.mechanization >= 4) {
        score += 8;
        reasons.push("mechanization");
      }
    }

    // --- Sho'r yer ---
    if (answers.soil === "salty") {
      if (fruit.saltTolerance === "high") {
        score += 25;
        reasons.push("salt_tolerance");
      } else if (fruit.saltTolerance === "low") {
        score -= 35;
      }
    }

    // --- Tuproq ---
    if (answers.soil === "heavy_clay") {
      if (fruit.soilPreference === "any") score += 5;
      else if (fruit.soilPreference === "sandy_light") score -= 15;
    }
    if (answers.soil === "sandy_light") {
      if (fruit.soilPreference === "sandy_light") score += 10;
    }

    // --- Suv ---
    if (answers.water === "rain") {
      if (fruit.waterNeed === "high") score -= 30;
      if (fruit.waterNeed === "low") {
        score += 12;
        reasons.push("low_water");
      }
    }
    if (answers.water === "drip") {
      // Drip har meva uchun yaxshi — kichik bonus
      score += 4;
    }
    if (answers.water === "canal") {
      // Sezgir: nok behi'da, gilos lo'y tuproqda muammo
      if (fruit.waterNeed === "high" && fruit.soilPreference === "sandy_light")
        score -= 10;
    }

    // --- Hosil muddati ---
    if (answers.timeline === "fast") {
      if (fruit.yearsToHarvest <= 2) {
        score += 15;
        reasons.push("fast_harvest");
      } else if (fruit.yearsToHarvest >= 4) {
        score -= 18;
      }
    }
    if (answers.timeline === "balanced") {
      if (fruit.yearsToHarvest === 3) score += 5;
    }
    if (answers.timeline === "patient") {
      // Sabrli investitsiya — yuqori daromadli mevalar muvofiq
      const incomeAvg = (fruit.income.min + fruit.income.max) / 2;
      if (incomeAvg > 20000) score += 10;
    }

    // --- Maydon hajmi ---
    if (answers.area === "small") {
      if (!fruit.goodForBackyard) score -= 20;
    }
    if (answers.area === "industrial") {
      if (fruit.mechanization >= 4) {
        score += 10;
        reasons.push("mechanization");
      }
      if (fruit.mechanization <= 2) score -= 8;
    }

    // --- Hudud (regional) ---
    if (answers.region === "khorezm" && fruit.saltTolerance === "high") {
      score += 12;
      reasons.push("regional_match");
    }
    if (answers.region === "mountain") {
      // Tog'da gilos, olma kuchli
      if (fruit.id === "cherry" || fruit.id === "apple_intensive") {
        score += 8;
        reasons.push("regional_match");
      }
    }

    // --- Saqlash bonusi (logistika) ---
    if (
      (answers.goal === "commercial" || answers.goal === "investment") &&
      fruit.storageDays >= 60
    ) {
      score += 5;
      reasons.push("good_storage");
    }

    // Clamp 0-100
    score = Math.max(0, Math.min(100, score));

    return {
      id: fruit.id,
      score,
      matchReasons: Array.from(new Set(reasons)).slice(0, 3),
    };
  });

  // Sort va top 3
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3);

  return { topFruits: top, answers };
}
