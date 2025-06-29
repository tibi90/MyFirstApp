import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles, colors } from '../../styles/styles';

const WoundPage = ({ values, onValueChange }) => {
  const [woundChance, setWoundChance] = useState(0);

  const weaponInputs = [
    {
      key: 'weaponStrength',
      label: 'Weapon Strength',
      type: 'number',
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
    { key: 'damage', label: 'Damage', type: 'number' },
  ];

  const targetInputs = [
    { key: 'toughness', label: 'Target Toughness', type: 'number' },
    { key: 'unitSize', label: 'Target Unit Size', type: 'number' },
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
    { key: 'antiTarget', label: 'Anti-X', type: 'toggle' },
    { key: 'devastatingWounds', label: 'Devastating Wounds', type: 'toggle' },
  ];

  const conditionalInputs = [];
  if (values.antiTarget) {
    conditionalInputs.push({
      key: 'antiTargetThreshold',
      label: 'Anti-X Threshold',
      type: 'picker',
      options: [
        { label: '2+', value: '2+' },
        { label: '3+', value: '3+' },
        { label: '4+', value: '4+' },
        { label: '5+', value: '5+' },
        { label: '6+', value: '6+' },
      ],
    });
  }

  // Calculate wound chance
  useEffect(() => {
    const strength = values.weaponStrength;
    const toughness = values.toughness;
    const modifier = parseInt(values.woundModifier);
    
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
    let chance = (7 - modifiedWound) / 6;
    
    // Apply Anti-X
    if (values.antiTarget) {
      const antiThreshold = parseInt(values.antiTargetThreshold.replace('+', ''));
      const antiChance = (7 - antiThreshold) / 6;
      chance = Math.max(chance, antiChance);
    }
    
    // Apply re-rolls
    if (values.rerollWounds === 'Re-roll 1s') {
      chance += (1/6) * chance;
    } else if (values.rerollWounds === 'Re-roll All Failed') {
      chance += (1 - chance) * chance;
    } else if (values.rerollWounds === 'Re-roll All') {
      chance = 1 - (1 - chance) * (1 - chance);
    }
    
    setWoundChance(Math.round(chance * 100));
  }, [values.weaponStrength, values.toughness, values.woundModifier, values.rerollWounds, values.antiTarget, values.antiTargetThreshold]);

  return (
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Weapon Profile"
        inputs={weaponInputs}
        values={values}
        onValueChange={onValueChange}
      />
      
      <InputSection
        title="Target Profile"
        inputs={targetInputs}
        values={values}
        onValueChange={onValueChange}
      />
      
      <InputSection
        title="Wound Modifiers"
        inputs={woundModifiers}
        values={values}
        onValueChange={onValueChange}
      />

      <InputSection
        title="Special Wound Rules"
        inputs={specialRules}
        values={values}
        onValueChange={onValueChange}
      />

      {conditionalInputs.length > 0 && (
        <InputSection
          title="Conditional Options"
          inputs={conditionalInputs}
          values={values}
          onValueChange={onValueChange}
        />
      )}

      {/* Wound Probability Display */}
      <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary }]}>
        <Text style={[globalStyles.sectionTitle, { color: colors.text }]}>Wound Probability</Text>
        <Text style={[globalStyles.mainResult, { color: colors.secondary, marginBottom: 0 }]}>
          {woundChance}%
        </Text>
        <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text }]}>
          S{values.weaponStrength} vs T{values.toughness}
        </Text>
        {values.devastatingWounds && (
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: 8 }]}>
            Critical wounds ignore saves
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default WoundPage;