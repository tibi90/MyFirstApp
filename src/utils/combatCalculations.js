// Warhammer 40k 10th Edition combat calculation logic with all modifiers

// Convert skill values (2+, 3+, etc.) to probability
export const getHitProbability = (skill, modifiers = {}) => {
  const skillMap = {
    '2+': 5/6,
    '3+': 4/6,
    '4+': 3/6,
    '5+': 2/6,
    '6+': 1/6,
  };
  
  // Torrent auto-hits
  if (modifiers.torrent) return 1;
  
  let baseProb = skillMap[skill] || 0;
  
  // Apply hit modifiers
  if (modifiers.hitModifier) {
    const modifier = parseInt(modifiers.hitModifier);
    // Convert modifier to probability change
    baseProb = Math.max(1/6, Math.min(5/6, baseProb + (modifier * 1/6)));
  }
  
  return baseProb;
};

// Calculate re-roll probability
export const applyRerolls = (baseProb, rerollType, criticalThreshold = 1/6) => {
  switch (rerollType) {
    case 'None':
      return baseProb;
    case 'Re-roll 1s':
      return baseProb + (1/6 * baseProb); // Re-roll 1s only
    case 'Re-roll All Failed':
      return baseProb + ((1 - baseProb) * baseProb); // Re-roll all failures
    case 'Re-roll All':
      return 1 - (1 - baseProb) * (1 - baseProb); // Re-roll everything
    case 'Re-roll Non-criticals':
      // Re-roll everything except criticals (5+ or 6s depending on setting)
      const nonCriticalRate = 1 - criticalThreshold;
      const rerollableProb = Math.min(baseProb, nonCriticalRate);
      return baseProb + (rerollableProb * baseProb);
    default:
      return baseProb;
  }
};

// Calculate wound probability based on Strength vs Toughness
export const getWoundProbability = (strength, toughness, modifiers = {}) => {
  const s = parseInt(strength);
  const t = parseInt(toughness);
  
  let baseProb;
  if (s >= 2 * t) baseProb = 5/6; // Wound on 2+
  else if (s > t) baseProb = 4/6;  // Wound on 3+
  else if (s === t) baseProb = 3/6; // Wound on 4+
  else if (s < t && s > t/2) baseProb = 2/6; // Wound on 5+
  else baseProb = 1/6; // Wound on 6+
  
  // Apply wound modifiers
  if (modifiers.woundModifier) {
    const modifier = parseInt(modifiers.woundModifier);
    baseProb = Math.max(1/6, Math.min(5/6, baseProb + (modifier * 1/6)));
  }
  
  return baseProb;
};

// Calculate failed save probability
export const getFailedSaveProbability = (armorSave, armorPiercing, modifiers = {}) => {
  // Handle no save
  if (armorSave === '7+') return 1;
  
  // Convert armor save to number (2+ = 2, 3+ = 3, etc.)
  const baseSave = parseInt(armorSave.replace('+', ''));
  // Convert AP to number (0, -1, -2, etc.)
  const ap = parseInt(armorPiercing);
  
  // Apply cover if applicable
  let modifiedSave = baseSave - ap;
  if (modifiers.cover) {
    modifiedSave -= 1; // Cover improves save by 1
  }
  
  // Check invulnerable save
  let invulnSave = 7; // Default no invuln
  if (modifiers.invulnSave && modifiers.invulnSave !== 'None') {
    invulnSave = parseInt(modifiers.invulnSave.replace('++', ''));
  }
  
  // Use the better save
  const finalSave = Math.min(modifiedSave, invulnSave);
  
  // If modified save > 6, armor save is impossible
  if (finalSave > 6) return 1;
  
  // Calculate fail probability
  let failProb = (finalSave - 1) / 6;
  
  // Apply Feel No Pain if damage goes through
  if (modifiers.feelNoPain && modifiers.feelNoPain !== 'None') {
    const fnp = parseInt(modifiers.feelNoPain.replace('+', ''));
    const fnpSaveProb = (7 - fnp) / 6;
    failProb = failProb * (1 - fnpSaveProb);
  }
  
  return failProb;
};

// Main calculation function with all modifiers
export const calculateAverageWounds = (attackerProfile, defenderProfile, modifiers = {}) => {
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
    unitSize,
  } = defenderProfile;
  
  // Calculate base attacks
  let totalAttacks = models * attacksPerModel;
  
  // Apply Blast if applicable - adds 1 attack per 5 enemy models
  if (modifiers.blast && unitSize) {
    const blastBonus = Math.floor(unitSize / 5);
    totalAttacks += blastBonus;
  }
  
  // Calculate critical hits (natural 6s, or 5+ if special rule active)
  let criticalHitRate = 1/6; // Default: only 6s
  if (modifiers.criticalOn5Plus) {
    criticalHitRate = 2/6; // Both 5s and 6s
  }
  
  // Get hit probability
  let hitRate = getHitProbability(weaponSkill, modifiers);
  
  // Apply hit re-rolls
  if (modifiers.rerollHits) {
    hitRate = applyRerolls(hitRate, modifiers.rerollHits, criticalHitRate);
  }
  
  // Calculate expected hits
  const expectedHits = totalAttacks * hitRate;
  const criticalHits = totalAttacks * criticalHitRate;
  
  // Handle Sustained Hits - extra hits from critical hits
  let extraHitsFromSustained = 0;
  if (modifiers.sustainedHits && modifiers.sustainedHitsValue) {
    extraHitsFromSustained = criticalHits * parseInt(modifiers.sustainedHitsValue);
  }
  
  // Handle Lethal Hits - critical hits auto-wound
  let lethalHitWounds = 0;
  if (modifiers.lethalHits) {
    // Lethal hits that are critical also generate their sustained hits
    lethalHitWounds = criticalHits;
    if (modifiers.sustainedHits) {
      lethalHitWounds += criticalHits * parseInt(modifiers.sustainedHitsValue || 1);
    }
  }
  
  // Total hits for wound rolls (excluding lethal hit auto-wounds from criticals)
  const hitsToWound = expectedHits + extraHitsFromSustained - (modifiers.lethalHits ? criticalHits : 0);
  
  // Get base wound probability
  let woundRate = getWoundProbability(weaponStrength, toughness, modifiers);
  
  // Calculate critical wounds from Anti-X
  let criticalWoundsFromAnti = 0;
  if (modifiers.antiTarget && modifiers.antiTargetThreshold) {
    const antiMap = { '2+': 5/6, '3+': 4/6, '4+': 3/6, '5+': 2/6, '6+': 1/6 };
    const antiThreshold = antiMap[modifiers.antiTargetThreshold] || 0;
    // Anti-X creates critical wounds on unmodified rolls meeting threshold
    criticalWoundsFromAnti = hitsToWound * antiThreshold;
  }
  
  // Apply wound re-rolls (including Twin-linked)
  if (modifiers.rerollWounds || modifiers.twinLinked) {
    // Twin-linked always allows wound re-rolls
    const rerollType = modifiers.twinLinked ? 'Re-roll All Failed' : modifiers.rerollWounds;
    woundRate = applyRerolls(woundRate, rerollType);
  }
  
  // Calculate normal wounds
  const normalWounds = hitsToWound * woundRate;
  
  // Calculate critical wounds (natural 6s to wound)
  const natural6sToWound = hitsToWound * (1/6);
  
  // Calculate mortal wounds from Devastating Wounds
  let mortalWounds = 0;
  if (modifiers.devastatingWounds) {
    // Both natural 6s to wound AND Anti-X critical wounds become mortal wounds
    const totalCriticalWounds = natural6sToWound + criticalWoundsFromAnti;
    mortalWounds = totalCriticalWounds * damage;
    
    // Mortal wounds still get Feel No Pain
    if (defenderProfile.feelNoPain && defenderProfile.feelNoPain !== 'None') {
      const fnp = parseInt(defenderProfile.feelNoPain.replace('+', ''));
      const fnpSaveProb = (7 - fnp) / 6;
      mortalWounds = mortalWounds * (1 - fnpSaveProb);
    }
  }
  
  // Total wounds that need saves (excluding mortal wounds from devastating)
  let woundsNeedingSaves = normalWounds + lethalHitWounds;
  if (modifiers.devastatingWounds) {
    // Remove the critical wounds that became mortal wounds
    woundsNeedingSaves -= (natural6sToWound + criticalWoundsFromAnti);
  }
  
  // Get failed save rate
  const failedSaveRate = getFailedSaveProbability(armorSave, armorPiercing, {
    ...modifiers,
    invulnSave: defenderProfile.invulnSave,
    feelNoPain: defenderProfile.feelNoPain,
  });
  
  // Calculate key statistics
  const successfulHits = expectedHits + extraHitsFromSustained;
  const totalWoundsInflicted = normalWounds + lethalHitWounds;
  const failedSaves = woundsNeedingSaves * failedSaveRate;
  
  // Calculate final damage
  const normalDamage = failedSaves * damage;
  
  const averageWounds = normalDamage + mortalWounds;
  
  // Hazardous damage to self (informational only)
  let hazardousDamage = 0;
  if (modifiers.hazardous) {
    // After all attacks resolved, roll D6 per model that attacked
    // On a 1, suffer 3 mortal wounds
    hazardousDamage = models * (1/6) * 3;
  }
  
  // Calculate confidence intervals for final damage
  const damageStdDev = Math.sqrt(averageWounds * 0.25); // Simplified approximation
  const confidence68Lower = Math.max(0, averageWounds - damageStdDev);
  const confidence68Upper = averageWounds + damageStdDev;
  const confidence95Lower = Math.max(0, averageWounds - (2 * damageStdDev));
  const confidence95Upper = averageWounds + (2 * damageStdDev);

  return {
    averageWounds: averageWounds.toFixed(2),
    totalAttacks,
    hitRate: (hitRate * 100).toFixed(1),
    woundRate: (woundRate * 100).toFixed(1),
    failedSaveRate: (failedSaveRate * 100).toFixed(1),
    mortalWounds: mortalWounds.toFixed(2),
    details: {
      totalHits: (expectedHits + extraHitsFromSustained).toFixed(1),
      sustainedHits: extraHitsFromSustained.toFixed(1),
      lethalHitWounds: lethalHitWounds.toFixed(2),
      criticalWounds: (natural6sToWound + criticalWoundsFromAnti).toFixed(2),
      antiXCriticals: criticalWoundsFromAnti.toFixed(2),
      hazardousDamage: hazardousDamage.toFixed(2),
      successfulHits: successfulHits.toFixed(1),
      successfulWounds: totalWoundsInflicted.toFixed(1),
      failedSaves: failedSaves.toFixed(1),
    },
    confidence: {
      interval68: {
        lower: confidence68Lower.toFixed(1),
        upper: confidence68Upper.toFixed(1)
      },
      interval95: {
        lower: confidence95Lower.toFixed(1),
        upper: confidence95Upper.toFixed(1)
      }
    }
  };
};