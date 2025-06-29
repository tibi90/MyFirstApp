// Binomial distribution calculations for Warhammer 40K probability

// Calculate binomial coefficient (n choose k)
export const binomialCoefficient = (n, k) => {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i) / (i + 1);
  }
  return result;
};

// Calculate probability of exactly k successes out of n trials
export const exactProbability = (n, k, p) => {
  const coefficient = binomialCoefficient(n, k);
  const successProb = Math.pow(p, k);
  const failureProb = Math.pow(1 - p, n - k);
  
  return coefficient * successProb * failureProb;
};

// Generate complete probability distribution
export const generateDistribution = (numDice, hitProbability, options = {}) => {
  const distribution = [];
  const { 
    minHits = 0, 
    maxHits = numDice,
    sustainedHits = 0,
    sustainedHitsValue = 0,
    criticalRate = 1/6
  } = options;
  
  // For sustained hits, we need to calculate compound distribution
  if (sustainedHits > 0) {
    return generateSustainedHitsDistribution(numDice, hitProbability, criticalRate, sustainedHitsValue);
  }
  
  // Regular distribution
  for (let hits = minHits; hits <= maxHits; hits++) {
    const probability = exactProbability(numDice, hits, hitProbability);
    distribution.push({
      hits,
      probability,
      percentage: (probability * 100).toFixed(2)
    });
  }
  
  // Calculate cumulative probabilities
  let runningTotal = 0;
  distribution.forEach((item, index) => {
    runningTotal += item.probability;
    item.cumulativeLessEqual = (runningTotal * 100).toFixed(1);
  });
  
  runningTotal = 0;
  for (let i = distribution.length - 1; i >= 0; i--) {
    runningTotal += distribution[i].probability;
    distribution[i].cumulativeGreaterEqual = (runningTotal * 100).toFixed(1);
  }
  
  return distribution;
};

// Generate distribution with sustained hits
const generateSustainedHitsDistribution = (numDice, hitProbability, criticalRate, sustainedValue) => {
  const distribution = [];
  
  // Maximum possible hits = all dice hit + all criticals generate sustained
  const maxPossibleHits = numDice + (numDice * sustainedValue);
  
  // This is complex - we need to calculate probability for each combination
  // of regular hits and critical hits that lead to a specific total
  for (let totalHits = 0; totalHits <= maxPossibleHits; totalHits++) {
    let probabilitySum = 0;
    
    // Iterate through possible critical hit counts
    for (let crits = 0; crits <= Math.min(numDice, Math.floor(totalHits / (1 + sustainedValue))); crits++) {
      const regularHitsNeeded = totalHits - (crits * (1 + sustainedValue));
      
      if (regularHitsNeeded < 0 || regularHitsNeeded > (numDice - crits)) continue;
      
      // Probability of exactly 'crits' critical hits
      const critProb = exactProbability(numDice, crits, criticalRate);
      
      // Probability of exactly 'regularHitsNeeded' hits from remaining dice
      const remainingDice = numDice - crits;
      const adjustedHitProb = (hitProbability - criticalRate) / (1 - criticalRate);
      const regularHitProb = remainingDice > 0 ? 
        exactProbability(remainingDice, regularHitsNeeded, adjustedHitProb) : 
        (regularHitsNeeded === 0 ? 1 : 0);
      
      probabilitySum += critProb * regularHitProb;
    }
    
    distribution.push({
      hits: totalHits,
      probability: probabilitySum,
      percentage: (probabilitySum * 100).toFixed(2)
    });
  }
  
  // Calculate cumulative probabilities
  let runningTotal = 0;
  distribution.forEach(item => {
    runningTotal += item.probability;
    item.cumulativeLessEqual = (runningTotal * 100).toFixed(1);
  });
  
  runningTotal = 0;
  for (let i = distribution.length - 1; i >= 0; i--) {
    runningTotal += distribution[i].probability;
    distribution[i].cumulativeGreaterEqual = (runningTotal * 100).toFixed(1);
  }
  
  return distribution.filter(d => d.probability > 0.0001); // Filter out extremely unlikely outcomes
};

// Calculate statistics from distribution
export const calculateStatistics = (distribution) => {
  // Expected value
  const expectedValue = distribution.reduce((sum, item) => 
    sum + (item.hits * item.probability), 0
  );
  
  // Variance
  const variance = distribution.reduce((sum, item) => 
    sum + (Math.pow(item.hits - expectedValue, 2) * item.probability), 0
  );
  
  // Standard deviation
  const standardDeviation = Math.sqrt(variance);
  
  // Mode (most likely outcome)
  const maxProb = Math.max(...distribution.map(d => d.probability));
  const modes = distribution.filter(d => d.probability === maxProb);
  
  // Confidence intervals
  const lowerBound68 = expectedValue - standardDeviation;
  const upperBound68 = expectedValue + standardDeviation;
  const lowerBound95 = expectedValue - (2 * standardDeviation);
  const upperBound95 = expectedValue + (2 * standardDeviation);
  
  return {
    expectedValue: expectedValue.toFixed(1),
    standardDeviation: standardDeviation.toFixed(2),
    modes: modes.map(m => m.hits),
    modePercentage: (maxProb * 100).toFixed(1),
    confidenceInterval68: {
      lower: Math.max(0, Math.floor(lowerBound68)),
      upper: Math.ceil(upperBound68),
      percentage: calculateRangePercentage(distribution, lowerBound68, upperBound68)
    },
    confidenceInterval95: {
      lower: Math.max(0, Math.floor(lowerBound95)),
      upper: Math.ceil(upperBound95),
      percentage: calculateRangePercentage(distribution, lowerBound95, upperBound95)
    }
  };
};

// Calculate percentage within a range
const calculateRangePercentage = (distribution, lower, upper) => {
  const sum = distribution
    .filter(d => d.hits >= lower && d.hits <= upper)
    .reduce((acc, d) => acc + d.probability, 0);
  return (sum * 100).toFixed(1);
};

// Adjust probability for re-rolls
export const adjustProbabilityForRerolls = (baseProbability, rerollType, criticalThreshold = 1/6) => {
  switch (rerollType) {
    case 'None':
      return baseProbability;
      
    case 'Re-roll 1s':
      // Re-roll only natural 1s
      return baseProbability + (1/6) * baseProbability;
      
    case 'Re-roll All Failed':
      // Re-roll all failures
      return baseProbability + (1 - baseProbability) * baseProbability;
      
    case 'Re-roll All':
      // Re-roll everything
      return 1 - Math.pow(1 - baseProbability, 2);
      
    case 'Re-roll Non-criticals':
      // This is complex - we need to separate critical and non-critical success rates
      const nonCriticalSuccessRate = Math.max(0, baseProbability - criticalThreshold);
      const rerollableRate = 1 - criticalThreshold;
      const improvedNonCritical = nonCriticalSuccessRate + (rerollableRate - nonCriticalSuccessRate) * baseProbability;
      return criticalThreshold + improvedNonCritical;
      
    default:
      return baseProbability;
  }
};

// Get percentile from distribution
export const getPercentile = (distribution, percentile) => {
  const targetProbability = percentile / 100;
  let cumulative = 0;
  
  for (const item of distribution) {
    cumulative += item.probability;
    if (cumulative >= targetProbability) {
      return item.hits;
    }
  }
  
  return distribution[distribution.length - 1].hits;
};