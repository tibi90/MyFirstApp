import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles } from '../../styles/styles';

const HitModifiersPage = ({ values, onValueChange }) => {
  const inputs = [
    { key: 'torrent', label: 'Torrent (automatically hits)', type: 'toggle' },
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
    { key: 'precision', label: 'Precision (allocate wounds on 6s)', type: 'toggle' },
    { key: 'hazardous', label: 'Hazardous (mortal wounds on 1s)', type: 'toggle' },
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
  ];

  return (
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Hit Roll Modifiers"
        inputs={inputs}
        values={values}
        onValueChange={onValueChange}
      />
    </ScrollView>
  );
};

export default HitModifiersPage;