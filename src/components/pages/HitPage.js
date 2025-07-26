import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles, colors } from '../../styles/styles';
import { 
  generateDistribution, 
  calculateStatistics,
  adjustProbabilityForRerolls 
} from '../../utils/probabilityCalculations';

const HitPage = ({ values, onValueChange }) => {
  const [hitChance, setHitChance] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [sustainedHitsCount, setSustainedHitsCount] = useState(0);
  const [hitDistribution, setHitDistribution] = useState(null);
  const [hitStatistics, setHitStatistics] = useState(null);

  const hitInputs = [
    {
      key: 'weaponSkill',
      label: 'Weapon Skill',
      type: 'picker',
      options: [
        { label: '2+', value: '2+' },
        { label: '3+', value: '3+' },
        { label: '4+', value: '4+' },
        { label: '5+', value: '5+' },
        { label: '6+', value: '6+' },
      ],
    },
    {
      key: 'hitModifier',
      label: 'Hit Roll Modifier',
      type: 'picker',
      options: [
        { label: '+2', value: '+2' },
        { label: '+1', value: '+1' },
        { label: '0', value: '0' },
        { label: '-1', value: '-1' },
        { label: '-2', value: '-2' },
      ],
    },
    {
      key: 'rerollHits',
      label: 'Re-roll Hits',
      type: 'picker',
      options: [
        { label: 'None', value: 'None' },
        { label: 'Re-roll 1s', value: 'Re-roll 1s' },
        { label: 'Re-roll All Failed', value: 'Re-roll All Failed' },
        { label: 'Re-roll All', value: 'Re-roll All' },
        { label: 'Re-roll Non-criticals', value: 'Re-roll Non-criticals' },
      ],
    },
  ];

  const specialRules = [
    { key: 'torrent', label: 'Torrent (Auto-hit)', type: 'toggle' },
    { key: 'lethalHits', label: 'Lethal Hits', type: 'toggle' },
    { key: 'sustainedHits', label: 'Sustained Hits', type: 'toggle' },
    { key: 'criticalOn5Plus', label: 'Critical Hits on 5+', type: 'toggle' },
  ];

  const sustainedOptions = [
    {
      key: 'sustainedHitsValue',
      label: 'Sustained Hits Value',
      type: 'picker',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
      visible: values.sustainedHits,
    },
  ];

  const additionalRules = [];

  // Calculate hit chance and total hits
  useEffect(() => {
    // Calculate total attacks including blast
    const totalAttacks = values.models * values.attacksPerModel + 
      (values.blast && values.unitSize ? Math.floor(values.unitSize / 5) : 0);
    
    if (!totalAttacks || totalAttacks === 0) {
      setHitDistribution(null);
      setHitStatistics(null);
      return;
    }
    
    if (values.torrent) {
      setHitChance(100);
      setTotalHits(totalAttacks);
      
      // For torrent, all attacks hit
      if (values.sustainedHits) {
        const critRate = values.criticalOn5Plus ? 2/6 : 1/6;
        const sustainedValue = parseInt(values.sustainedHitsValue) || 1;
        
        // Generate distribution for torrent with sustained hits
        const distribution = generateDistribution(totalAttacks, 1, {
          sustainedHits: 1,
          sustainedHitsValue: sustainedValue,
          criticalRate: critRate
        });
        
        const stats = calculateStatistics(distribution);
        setHitDistribution(distribution);
        setHitStatistics(stats);
        setTotalHits(parseFloat(stats.expectedValue));
        setSustainedHitsCount(totalAttacks * critRate * sustainedValue);
        // Store total hits for other pages
        onValueChange('totalHits', parseFloat(stats.expectedValue));
      } else {
        // Simple torrent - all attacks hit
        const distribution = [{
          hits: totalAttacks,
          probability: 1,
          percentage: "100.00",
          cumulativeLessEqual: "100.0",
          cumulativeGreaterEqual: "100.0"
        }];
        setHitDistribution(distribution);
        setHitStatistics({
          expectedValue: totalAttacks.toFixed(1),
          modes: [totalAttacks],
          modePercentage: "100.0"
        });
        // Store total hits for other pages
        onValueChange('totalHits', totalAttacks);
      }
      return;
    }

    const wsValue = parseInt(values.weaponSkill.replace('+', ''));
    const modifier = parseInt(values.hitModifier);
    const modifiedWS = Math.max(2, Math.min(6, wsValue - modifier));
    
    let baseChance = (7 - modifiedWS) / 6;
    
    // Critical hit rate
    const critRate = values.criticalOn5Plus ? 2/6 : 1/6;
    
    // Apply re-rolls with proper handling
    const rerollType = values.rerollHits || 'None';
    const adjustedHitProb = adjustProbabilityForRerolls(baseChance, rerollType, critRate);
    
    // No hit re-roll from Twin-linked (it only affects wounds)
    let finalHitProb = adjustedHitProb;
    
    setHitChance(Math.round(finalHitProb * 100));
    
    // Generate distribution
    let distribution;
    if (values.sustainedHits) {
      const sustainedValue = parseInt(values.sustainedHitsValue) || 1;
      distribution = generateDistribution(totalAttacks, finalHitProb, {
        sustainedHits: 1,
        sustainedHitsValue: sustainedValue,
        criticalRate: critRate
      });
    } else {
      distribution = generateDistribution(totalAttacks, finalHitProb);
    }
    
    const stats = calculateStatistics(distribution);
    setHitDistribution(distribution);
    setHitStatistics(stats);
    setTotalHits(parseFloat(stats.expectedValue));
    
    // Store total hits in shared values for use in other pages
    onValueChange('totalHits', parseFloat(stats.expectedValue));
    
    // Calculate sustained hits separately for display
    if (values.sustainedHits) {
      const sustainedValue = parseInt(values.sustainedHitsValue) || 1;
      setSustainedHitsCount(totalAttacks * critRate * sustainedValue);
    } else {
      setSustainedHitsCount(0);
    }
  }, [values.weaponSkill, values.hitModifier, values.rerollHits, values.torrent,
      values.models, values.attacksPerModel, values.blast, values.unitSize, 
      values.sustainedHits, values.sustainedHitsValue, values.criticalOn5Plus]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <InputSection
          title="Hit Configuration"
          inputs={hitInputs}
          values={values}
          onValueChange={onValueChange}
          compact={true}
        />

        <InputSection
          title="Special Rules"
          inputs={specialRules}
          values={values}
          onValueChange={onValueChange}
          compact={true}
        />

        {values.sustainedHits && (
          <InputSection
            title="Sustained Hits"
            inputs={sustainedOptions.filter(i => i.visible !== false)}
            values={values}
            onValueChange={onValueChange}
            compact={true}
          />
        )}

        {/* Compact Results Display */}
        <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary, marginVertical: 4, padding: 12, flex: 1, justifyContent: 'center' }]}>
          <Text style={[globalStyles.mainResult, { color: colors.secondary, fontSize: 48 }]}>
            {hitStatistics ? hitStatistics.modes[0] : 0} hits
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, fontSize: 16 }]}>
            Most likely outcome ({hitStatistics ? hitStatistics.modePercentage : 0}% chance)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HitPage;