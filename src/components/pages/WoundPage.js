import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles } from '../../styles/styles';

const WoundPage = ({ values, onValueChange }) => {
  const woundInputs = [
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
    { key: 'devastatingWounds', label: 'Devastating Wounds (mortal on 6s)', type: 'toggle' },
    { key: 'twinLinked', label: 'Twin-Linked (re-roll wounds)', type: 'toggle' },
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

  const targetInputs = [
    { key: 'toughness', label: 'Target Toughness', type: 'numeric' },
    { key: 'unitSize', label: 'Unit Size (for Blast)', type: 'numeric' },
  ];

  return (
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Wound Roll Modifiers"
        inputs={woundInputs}
        values={values}
        onValueChange={onValueChange}
      />
      <InputSection
        title="Target Characteristics"
        inputs={targetInputs}
        values={values}
        onValueChange={onValueChange}
      />
    </ScrollView>
  );
};

export default WoundPage;