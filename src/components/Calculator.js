import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputSection from './InputSection';
import ResultsDisplay from './ResultsDisplay';
import { calculateAverageWounds } from '../utils/combatCalculations';
import { globalStyles } from '../styles/styles';

const STORAGE_KEY = '@wh40k_calculator_values';

const Calculator = () => {
  // Default values
  const defaultValues = {
    // Attacker
    models: 1,
    attacksPerModel: 1,
    weaponSkill: '3+',
    weaponStrength: 4,
    armorPiercing: '0',
    damage: 1,
    // Defender
    toughness: 4,
    armorSave: '3+',
  };

  const [values, setValues] = useState(defaultValues);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  // Load saved values on mount
  useEffect(() => {
    loadSavedValues();
  }, []);

  // Calculate results whenever values change
  useEffect(() => {
    if (validateInputs()) {
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
      };

      const calculatedResults = calculateAverageWounds(attackerProfile, defenderProfile);
      setResults(calculatedResults);
      saveValues();
    }
  }, [values]);

  const loadSavedValues = async () => {
    try {
      const savedValues = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedValues) {
        setValues(JSON.parse(savedValues));
      }
    } catch (error) {
      console.error('Error loading saved values:', error);
    }
  };

  const saveValues = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch (error) {
      console.error('Error saving values:', error);
    }
  };

  const validateInputs = () => {
    // No validation constraints - allow any positive numbers
    return true;
  };

  const handleValueChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setValues(defaultValues);
    setResults(null);
    setErrors({});
  };

  const attackerInputs = [
    { key: 'models', label: 'Number of Models', type: 'numeric', min: 1, max: 100 },
    { key: 'attacksPerModel', label: 'Attacks per Model', type: 'numeric', min: 1, max: 20 },
    {
      key: 'weaponSkill',
      label: 'Weapon Skill / Ballistic Skill',
      type: 'picker',
      options: [
        { label: '2+', value: '2+' },
        { label: '3+', value: '3+' },
        { label: '4+', value: '4+' },
        { label: '5+', value: '5+' },
        { label: '6+', value: '6+' },
      ],
    },
    { key: 'weaponStrength', label: 'Weapon Strength', type: 'numeric', min: 1, max: 20 },
    {
      key: 'armorPiercing',
      label: 'Armor Piercing',
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
    { key: 'damage', label: 'Damage per Wound', type: 'numeric', min: 1, max: 10 },
  ];

  const defenderInputs = [
    { key: 'toughness', label: 'Toughness', type: 'numeric', min: 1, max: 20 },
    {
      key: 'armorSave',
      label: 'Armor Save',
      type: 'picker',
      options: [
        { label: '2+', value: '2+' },
        { label: '3+', value: '3+' },
        { label: '4+', value: '4+' },
        { label: '5+', value: '5+' },
        { label: '6+', value: '6+' },
        { label: '7+ (No Save)', value: '7+' },
      ],
    },
  ];

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Wound Calculator</Text>
        <Text style={globalStyles.headerSubtitle}>Warhammer 40,000</Text>
      </View>

      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
      >
        <InputSection
          title="Attacker Profile"
          inputs={attackerInputs}
          values={values}
          onValueChange={handleValueChange}
          errors={errors}
        />

        <InputSection
          title="Defender Profile"
          inputs={defenderInputs}
          values={values}
          onValueChange={handleValueChange}
          errors={errors}
        />

        <ResultsDisplay results={results} />

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity style={globalStyles.button} onPress={handleReset}>
            <Text style={globalStyles.buttonText}>Reset to Defaults</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Calculator;