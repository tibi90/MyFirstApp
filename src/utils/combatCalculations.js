// Warhammer 40k combat calculation logic

// Convert skill values (2+, 3+, etc.) to probability
export const getHitProbability = (skill) => {
  const skillMap = {
    '2+': 5/6,
    '3+': 4/6,
    '4+': 3/6,
    '5+': 2/6,
    '6+': 1/6,
  };
  return skillMap[skill] || 0;
};

// Calculate wound probability based on Strength vs Toughness
export const getWoundProbability = (strength, toughness) => {
  const s = parseInt(strength);
  const t = parseInt(toughness);
  
  if (s >= 2 * t) return 5/6; // Wound on 2+
  if (s > t) return 4/6;       // Wound on 3+
  if (s === t) return 3/6;     // Wound on 4+
  if (s < t && s > t/2) return 2/6; // Wound on 5+
  return 1/6; // Wound on 6+
};

// Calculate failed save probability
export const getFailedSaveProbability = (armorSave, armorPiercing) => {
  // Convert armor save to number (2+ = 2, 3+ = 3, etc.)
  const baseSave = parseInt(armorSave.replace('+', ''));
  // Convert AP to number (0, -1, -2, etc.)
  const ap = parseInt(armorPiercing);
  
  // Modified save = base save - AP (negative AP improves the save roll needed)
  const modifiedSave = baseSave - ap;
  
  // If modified save > 6, armor save is impossible
  if (modifiedSave > 6) return 1;
  
  // Calculate fail probability
  return (modifiedSave - 1) / 6;
};

// Main calculation function
export const calculateAverageWounds = (attackerProfile, defenderProfile) => {
  const {
    models,
    attacksPerModel,
    weaponSkill,
    weaponStrength,
    armorPiercing,
    damage,
  } = attackerProfile;
  
  const {
    toughness,
    armorSave,
  } = defenderProfile;
  
  // Get probabilities
  const hitRate = getHitProbability(weaponSkill);
  const woundRate = getWoundProbability(weaponStrength, toughness);
  const failedSaveRate = getFailedSaveProbability(armorSave, armorPiercing);
  
  // Calculate average wounds
  const totalAttacks = models * attacksPerModel;
  const averageWounds = totalAttacks * hitRate * woundRate * failedSaveRate * damage;
  
  return {
    averageWounds: averageWounds.toFixed(2),
    totalAttacks,
    hitRate: (hitRate * 100).toFixed(1),
    woundRate: (woundRate * 100).toFixed(1),
    failedSaveRate: (failedSaveRate * 100).toFixed(1),
  };
};