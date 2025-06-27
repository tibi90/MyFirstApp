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
  // Default values for all fields
  const defaultValues = {
    // Basic Attacker
    models: 1,
    attacksPerModel: 1,
    weaponSkill: '3+',
    weaponStrength: 4,
    armorPiercing: '0',
    damage: 1,
    // Attacker Modifiers
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
    // Defender
    toughness: 4,
    armorSave: '3+',
    invulnSave: 'None',
    feelNoPain: 'None',
    unitSize: 5,
    // Environmental
    cover: false,
    hitModifier: '0',
    woundModifier: '0',
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
        invulnSave: values.invulnSave,
        feelNoPain: values.feelNoPain,
        unitSize: values.unitSize,
      };

      const modifiers = {
        // Attacker modifiers
        lethalHits: values.lethalHits,
        sustainedHits: values.sustainedHits,
        sustainedHitsValue: values.sustainedHitsValue,
        rerollHits: values.rerollHits,
        rerollWounds: values.rerollWounds,
        antiTarget: values.antiTarget,
        antiTargetThreshold: values.antiTargetThreshold,
        devastatingWounds: values.devastatingWounds,
        precision: values.precision,
        twinLinked: values.twinLinked,
        torrent: values.torrent,
        blast: values.blast,
        blastMultiplier: values.blastMultiplier,
        hazardous: values.hazardous,
        // Environmental
        cover: values.cover,
        hitModifier: values.hitModifier,
        woundModifier: values.woundModifier,
      };

      const calculatedResults = calculateAverageWounds(attackerProfile, defenderProfile, modifiers);
      setResults(calculatedResults);
      saveValues();
    }
  }, [values]);

  const loadSavedValues = async () => {
    try {
      const savedValues = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedValues) {
        setValues({ ...defaultValues, ...JSON.parse(savedValues) });
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

  // Input configurations
  const basicAttackerInputs = [
    { key: 'models', label: 'Number of Models', type: 'numeric' },
    { key: 'attacksPerModel', label: 'Attacks per Model', type: 'numeric' },
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
    { key: 'weaponStrength', label: 'Weapon Strength', type: 'numeric' },
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
    { key: 'damage', label: 'Damage per Wound', type: 'numeric' },
  ];

  const attackerModifierInputs = [
    { key: 'lethalHits', label: 'Lethal Hits (auto-wound on 6s to hit)', type: 'toggle' },
    {
      key: 'sustainedHits',
      label: 'Sustained Hits',
      type: 'conditional',
      conditionalInput: {
        key: 'sustainedHitsValue',
        label: 'Extra hits on 6s',
        type: 'picker',
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
        ],
      },
    },
    {
      key: 'rerollHits',
      label: 'Re-roll Hit Rolls',
      type: 'picker',
      options: [
        { label: 'None', value: 'None' },
        { label: 'Re-roll 1s', value: '1s' },
        { label: 'Re-roll Failed', value: 'Failed' },
        { label: 'Re-roll All', value: 'All' },
      ],
    },
    {
      key: 'rerollWounds',
      label: 'Re-roll Wound Rolls',
      type: 'picker',
      options: [
        { label: 'None', value: 'None' },
        { label: 'Re-roll 1s', value: '1s' },
        { label: 'Re-roll Failed', value: 'Failed' },
        { label: 'Re-roll All', value: 'All' },
      ],
    },
    {
      key: 'antiTarget',
      label: 'Anti-[Target]',
      type: 'conditional',
      conditionalInput: {
        key: 'antiTargetThreshold',
        label: 'Wound on',
        type: 'picker',
        options: [
          { label: '2+', value: '2+' },
          { label: '3+', value: '3+' },
          { label: '4+', value: '4+' },
          { label: '5+', value: '5+' },
          { label: '6+', value: '6+' },
        ],
      },
    },
    { key: 'devastatingWounds', label: 'Devastating Wounds', type: 'toggle' },
    { key: 'precision', label: 'Precision', type: 'toggle' },
    { key: 'twinLinked', label: 'Twin-Linked', type: 'toggle' },
    { key: 'torrent', label: 'Torrent (auto-hits)', type: 'toggle' },
    {
      key: 'blast',
      label: 'Blast',
      type: 'conditional',
      conditionalInput: {
        key: 'blastMultiplier',
        label: 'Extra attacks per threshold',
        type: 'numeric',
      },
    },
    { key: 'hazardous', label: 'Hazardous', type: 'toggle' },
  ];

  const defenderInputs = [
    { key: 'toughness', label: 'Toughness', type: 'numeric' },
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
    {
      key: 'invulnSave',
      label: 'Invulnerable Save',
      type: 'picker',
      options: [
        { label: 'None', value: 'None' },
        { label: '3++', value: '3++' },
        { label: '4++', value: '4++' },
        { label: '5++', value: '5++' },
        { label: '6++', value: '6++' },
      ],
    },
    {
      key: 'feelNoPain',
      label: 'Feel No Pain',
      type: 'picker',
      options: [
        { label: 'None', value: 'None' },
        { label: '3+', value: '3+' },
        { label: '4+', value: '4+' },
        { label: '5+', value: '5+' },
        { label: '6+', value: '6+' },
      ],
    },
    { key: 'unitSize', label: 'Unit Size (for Blast)', type: 'numeric' },
  ];

  const environmentalInputs = [
    { key: 'cover', label: 'Target in Cover (+1 to save)', type: 'toggle' },
    {
      key: 'hitModifier',
      label: 'Hit Modifier',
      type: 'picker',
      options: [
        { label: '-2', value: '-2' },
        { label: '-1', value: '-1' },
        { label: '0', value: '0' },
        { label: '+1', value: '+1' },
        { label: '+2', value: '+2' },
      ],
    },
    {
      key: 'woundModifier',
      label: 'Wound Modifier',
      type: 'picker',
      options: [
        { label: '-2', value: '-2' },
        { label: '-1', value: '-1' },
        { label: '0', value: '0' },
        { label: '+1', value: '+1' },
        { label: '+2', value: '+2' },
      ],
    },
  ];

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Wound Calculator</Text>
        <Text style={globalStyles.headerSubtitle}>Warhammer 40,000 10th Edition</Text>
      </View>

      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
      >
        <InputSection
          title="Basic Attacker Profile"
          inputs={basicAttackerInputs}
          values={values}
          onValueChange={handleValueChange}
          errors={errors}
        />

        <InputSection
          title="Weapon Abilities"
          inputs={attackerModifierInputs}
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

        <InputSection
          title="Environmental Modifiers"
          inputs={environmentalInputs}
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