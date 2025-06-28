import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles } from '../../styles/styles';

const SavePage = ({ values, onValueChange }) => {
  const saveInputs = [
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
    { key: 'cover', label: 'Target in Cover (+1 to save)', type: 'toggle' },
  ];

  return (
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Defensive Profile"
        inputs={saveInputs}
        values={values}
        onValueChange={onValueChange}
      />
    </ScrollView>
  );
};

export default SavePage;