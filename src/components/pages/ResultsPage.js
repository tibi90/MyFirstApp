import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import ResultsDisplay from '../ResultsDisplay';
import { calculateAverageWounds } from '../../utils/combatCalculations';
import { globalStyles, colors } from '../../styles/styles';

const ResultsPage = ({ values, onValueChange }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Calculate results when page loads
    const attackerProfile = {
      models: values.models,
      attacksPerModel: values.attacksPerModel,
      weaponSkill: values.weaponSkill,
      weaponStrength: values.weaponStrength,
      armorPiercing: values.armorPiercing,
      damage: values.damage,
    };

    const defenderProfile = {
      toughness: values.toughness,
      armorSave: values.armorSave,
      invulnSave: values.invulnSave,
      feelNoPain: values.feelNoPain,
      unitSize: values.unitSize,
    };

    const modifiers = {
      // Hit modifiers
      lethalHits: values.lethalHits,
      sustainedHits: values.sustainedHits,
      sustainedHitsValue: values.sustainedHitsValue,
      rerollHits: values.rerollHits,
      precision: values.precision,
      torrent: values.torrent,
      hazardous: values.hazardous,
      hitModifier: values.hitModifier,
      // Wound modifiers
      rerollWounds: values.rerollWounds,
      antiTarget: values.antiTarget,
      antiTargetThreshold: values.antiTargetThreshold,
      devastatingWounds: values.devastatingWounds,
      twinLinked: values.twinLinked,
      blast: values.blast,
      blastMultiplier: values.blastMultiplier,
      woundModifier: values.woundModifier,
      // Save modifiers
      cover: values.cover,
    };

    const calculatedResults = calculateAverageWounds(attackerProfile, defenderProfile, modifiers);
    setResults(calculatedResults);
  }, [values]);

  const handleReset = () => {
    // Reset to default values
    const defaultValues = {
      models: 1,
      attacksPerModel: 1,
      weaponSkill: '3+',
      weaponStrength: 4,
      armorPiercing: '0',
      damage: 1,
      lethalHits: false,
      sustainedHits: false,
      sustainedHitsValue: '1',
      rerollHits: 'None',
      rerollWounds: 'None',
      antiTarget: false,
      antiTargetThreshold: '4+',
      devastatingWounds: false,
      precision: false,
      twinLinked: false,
      torrent: false,
      blast: false,
      blastMultiplier: 1,
      hazardous: false,
      toughness: 4,
      armorSave: '3+',
      invulnSave: 'None',
      feelNoPain: 'None',
      unitSize: 5,
      cover: false,
      hitModifier: '0',
      woundModifier: '0',
    };

    Object.entries(defaultValues).forEach(([key, value]) => {
      onValueChange(key, value);
    });
  };

  return (
    <ScrollView style={globalStyles.scrollView}>
      <ResultsDisplay results={results} />
      
      <View style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 100 }}>
        <TouchableOpacity style={globalStyles.button} onPress={handleReset}>
          <Text style={globalStyles.buttonText}>Reset All Values</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ResultsPage;