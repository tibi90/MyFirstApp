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
export const applyRerolls = (baseProb, rerollType) => {
  switch (rerollType) {
    case 'None':
      return baseProb;
    case '1s':
      return baseProb + (1/6 * baseProb); // Re-roll 1s only
    case 'Failed':
      return baseProb + ((1 - baseProb) * baseProb); // Re-roll all failures
    case 'All':
      return 1 - (1 - baseProb) * (1 - baseProb); // Re-roll everything
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
  
  // Anti-[Target] ability
  if (modifiers.antiTarget && modifiers.antiTargetThreshold) {
    const antiMap = { '2+': 5/6, '3+': 4/6, '4+': 3/6, '5+': 2/6, '6+': 1/6 };
    const antiProb = antiMap[modifiers.antiTargetThreshold] || 0;
    // Take the better of normal wound or anti-target
    baseProb = Math.max(baseProb, antiProb);
  }
  
  // Twin-linked gives re-roll wounds
  if (modifiers.twinLinked) {
    return applyRerolls(baseProb, 'Failed');
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

// Calculate extra hits from abilities
export const calculateExtraHits = (baseHits, modifiers = {}) => {
  let totalHits = baseHits;
  
  // Sustained Hits
  if (modifiers.sustainedHits && modifiers.sustainedHitsValue) {
    const sixesToHit = baseHits / 6; // Unmodified 6s
    const extraHits = sixesToHit * parseInt(modifiers.sustainedHitsValue);
    totalHits += extraHits;
  }
  
  return totalHits;
};

// Calculate mortal wounds
export const calculateMortalWounds = (attacks, hitRate, woundRate, modifiers = {}) => {
  let mortalWounds = 0;
  
  // Devastating Wounds - mortal wounds on unmodified 6s to wound
  if (modifiers.devastatingWounds) {
    const sixesToWound = attacks * hitRate * (1/6); // Unmodified 6s
    mortalWounds += sixesToWound * (modifiers.damage || 1);
  }
  
  // Hazardous - mortal wounds to self on unmodified 1s to hit
  if (modifiers.hazardous) {
    const onesToHit = attacks * (1/6); // Unmodified 1s
    // Note: This would damage the attacker, not counted in wounds dealt
  }
  
  return mortalWounds;
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
  
  // Apply Blast if applicable
  if (modifiers.blast && unitSize) {
    const blastMultiplier = parseInt(modifiers.blastMultiplier) || 1;
    if (unitSize >= 6) totalAttacks += blastMultiplier;
    if (unitSize >= 11) totalAttacks += blastMultiplier;
  }
  
  // Get hit probability
  let hitRate = getHitProbability(weaponSkill, modifiers);
  
  // Apply hit re-rolls
  if (modifiers.rerollHits) {
    hitRate = applyRerolls(hitRate, modifiers.rerollHits);
  }
  
  // Calculate hits including extra hits
  const expectedHits = totalAttacks * hitRate;
  const totalHits = calculateExtraHits(expectedHits, modifiers);
  
  // Handle Lethal Hits (auto-wound on 6s to hit)
  let autoWounds = 0;
  if (modifiers.lethalHits) {
    autoWounds = totalAttacks * (1/6); // Unmodified 6s to hit auto-wound
  }
  
  // Get wound probability
  let woundRate = getWoundProbability(weaponStrength, toughness, modifiers);
  
  // Apply wound re-rolls
  if (modifiers.rerollWounds) {
    woundRate = applyRerolls(woundRate, modifiers.rerollWounds);
  }
  
  // Calculate normal wounds (not including auto-wounds)
  const normalWounds = (totalHits - autoWounds) * woundRate + autoWounds;
  
  // Get failed save rate
  const failedSaveRate = getFailedSaveProbability(armorSave, armorPiercing, {
    ...modifiers,
    invulnSave: defenderProfile.invulnSave,
    feelNoPain: defenderProfile.feelNoPain,
  });
  
  // Calculate final damage
  const normalDamage = normalWounds * failedSaveRate * damage;
  const mortalWounds = calculateMortalWounds(totalAttacks, hitRate, woundRate, { ...modifiers, damage });
  
  const averageWounds = normalDamage + mortalWounds;
  
  return {
    averageWounds: averageWounds.toFixed(2),
    totalAttacks,
    hitRate: (hitRate * 100).toFixed(1),
    woundRate: (woundRate * 100).toFixed(1),
    failedSaveRate: (failedSaveRate * 100).toFixed(1),
    mortalWounds: mortalWounds.toFixed(2),
    details: {
      totalHits: totalHits.toFixed(1),
      autoWounds: autoWounds.toFixed(1),
      normalWounds: normalWounds.toFixed(1),
    }
  };
};