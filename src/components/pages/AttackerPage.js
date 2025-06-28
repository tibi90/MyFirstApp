import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles } from '../../styles/styles';

const AttackerPage = ({ values, onValueChange }) => {
  const inputs = [
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

  return (
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Weapon Profile"
        inputs={inputs}
        values={values}
        onValueChange={onValueChange}
      />
    </ScrollView>
  );
};

export default AttackerPage;