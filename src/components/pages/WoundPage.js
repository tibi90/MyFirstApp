import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles, colors } from '../../styles/styles';
import { dimensions, moderateScale } from '../../utils/responsive';
import { 
  generateDistribution, 
  calculateStatistics,
  adjustProbabilityForRerolls 
} from '../../utils/probabilityCalculations';

const WoundPage = ({ values, onValueChange }) => {
  const [woundChance, setWoundChance] = useState(0);
  const [totalWounds, setTotalWounds] = useState(0);
  const [woundDistribution, setWoundDistribution] = useState(null);
  const [woundStatistics, setWoundStatistics] = useState(null);

  const weaponInputs = [
    {
      key: 'weaponStrength',
      label: 'Weapon Strength',
      type: 'numeric',
    },
    {
      key: 'armorPiercing',
      label: 'Armor Piercing (AP)',
      type: 'picker',
      options: [
        { label: '0', value: '0' },
        { label: '-1', value: '-1' },
        { label: '-2', value: '-2' },
        { label: '-3', value: '-3' },
        { label: '-4', value: '-4' },
        { label: '-5', value: '-5' },
        { label: '-6', value: '-6' },
      ],
    },
    { key: 'damage', label: 'Damage', type: 'numeric' },
  ];

  const targetInputs = [
    { key: 'toughness', label: 'Target Toughness', type: 'numeric' },
  ];

  const woundModifiers = [
    {
      key: 'woundModifier',
      label: 'Wound Roll Modifier',
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
      key: 'rerollWounds',
      label: 'Re-roll Wounds',
      type: 'picker',
      options: [
        { label: 'None', value: 'None' },
        { label: 'Re-roll 1s', value: 'Re-roll 1s' },
        { label: 'Re-roll All Failed', value: 'Re-roll All Failed' },
        { label: 'Re-roll All', value: 'Re-roll All' },
      ],
    },
  ];

  const specialRules = [
    { key: 'twinLinked', label: 'Twin-linked', type: 'toggle' },
    { key: 'devastatingWounds', label: 'Devastating Wounds', type: 'toggle' },
    { key: 'precision', label: 'Precision', type: 'toggle' },
  ];

  const conditionalInputs = [];

  // Calculate wound chance and distribution
  useEffect(() => {
    const strength = values.weaponStrength;
    const toughness = values.toughness;
    const modifier = parseInt(values.woundModifier);
    
    // Get the number of hits from previous page calculations
    const numHits = Math.round(values.totalHits || 0);
    
    if (!numHits || numHits === 0 || !strength || !toughness) {
      setWoundDistribution(null);
      setWoundStatistics(null);
      return;
    }
    
    let baseWound;
    if (strength >= toughness * 2) {
      baseWound = 2; // 2+
    } else if (strength > toughness) {
      baseWound = 3; // 3+
    } else if (strength === toughness) {
      baseWound = 4; // 4+
    } else if (strength * 2 <= toughness) {
      baseWound = 6; // 6+
    } else {
      baseWound = 5; // 5+
    }
    
    // Apply modifier
    const modifiedWound = Math.max(2, Math.min(6, baseWound - modifier));
    
    // Calculate base chance
    let baseChance = (7 - modifiedWound) / 6;
    
    
    // Apply re-rolls with proper handling
    // Twin-linked gives "Re-roll All Failed" for wounds, use the better option
    let rerollType = values.rerollWounds || 'None';
    if (values.twinLinked) {
      // If Twin-linked is active, use the better of the two reroll options
      if (rerollType === 'None' || rerollType === 'Re-roll 1s') {
        rerollType = 'Re-roll All Failed';
      }
      // Otherwise keep the existing reroll type if it's better (Re-roll All)
    }
    const critRate = 1/6; // Standard critical rate for wounds
    const adjustedWoundProb = adjustProbabilityForRerolls(baseChance, rerollType, critRate);
    
    setWoundChance(Math.round(adjustedWoundProb * 100));
    
    // Generate wound distribution
    const distribution = generateDistribution(numHits, adjustedWoundProb);
    const stats = calculateStatistics(distribution);
    
    setWoundDistribution(distribution);
    setWoundStatistics(stats);
    setTotalWounds(parseFloat(stats.expectedValue));
  }, [values.weaponStrength, values.toughness, values.woundModifier, values.rerollWounds, 
      values.twinLinked, values.totalHits]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: dimensions.paddingLarge }}>
        {/* Weapon & Target Profile in one row */}
        <View style={[globalStyles.section, { marginVertical: dimensions.paddingSmall, padding: dimensions.paddingMedium }]}>
          <Text style={[globalStyles.sectionTitle, { fontSize: dimensions.fontMedium, marginBottom: dimensions.paddingMedium }]}>Weapon & Target</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: dimensions.paddingMedium }}>
              <Text style={[globalStyles.label, { fontSize: dimensions.fontTiny, marginBottom: dimensions.paddingSmall }]}>Weapon Strength</Text>
              <InputSection
                inputs={[weaponInputs[0]]}
                values={values}
                onValueChange={onValueChange}
                compact={true}
              />
            </View>
            <View style={{ flex: 1, marginLeft: dimensions.paddingMedium }}>
              <Text style={[globalStyles.label, { fontSize: dimensions.fontTiny, marginBottom: dimensions.paddingSmall }]}>Target Toughness</Text>
              <InputSection
                inputs={targetInputs}
                values={values}
                onValueChange={onValueChange}
                compact={true}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: dimensions.paddingMedium }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[globalStyles.label, { fontSize: 12, marginBottom: 4 }]}>AP</Text>
              <InputSection
                inputs={[weaponInputs[1]]}
                values={values}
                onValueChange={onValueChange}
                compact={true}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[globalStyles.label, { fontSize: 12, marginBottom: 4 }]}>Damage</Text>
              <InputSection
                inputs={[weaponInputs[2]]}
                values={values}
                onValueChange={onValueChange}
                compact={true}
              />
            </View>
          </View>
        </View>

        <InputSection
          title="Wound Modifiers"
          inputs={woundModifiers}
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

        {conditionalInputs.length > 0 && (
          <InputSection
            title="Conditional Options"
            inputs={conditionalInputs}
            values={values}
            onValueChange={onValueChange}
            compact={true}
          />
        )}

        {/* Compact Results Display */}
        <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary, marginVertical: dimensions.paddingSmall, padding: dimensions.paddingMedium, flex: 1, justifyContent: 'center' }]}>
          <Text style={[globalStyles.mainResult, { color: colors.secondary }]}>
            {woundStatistics ? woundStatistics.modes[0] : 0} wounds
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, fontSize: dimensions.fontMedium }]}>
            Most likely outcome ({woundStatistics ? woundStatistics.modePercentage : 0}% chance)
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: dimensions.paddingMedium }]}>
            S{values.weaponStrength} vs T{values.toughness}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WoundPage;