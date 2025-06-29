import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles, colors } from '../../styles/styles';

const HitPage = ({ values, onValueChange }) => {
  const [hitChance, setHitChance] = useState(0);

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

  const additionalRules = [
    { key: 'hazardous', label: 'Hazardous', type: 'toggle' },
    { key: 'twinLinked', label: 'Twin-linked', type: 'toggle' },
  ];

  // Calculate hit chance
  useEffect(() => {
    if (values.torrent) {
      setHitChance(100);
      return;
    }

    const wsValue = parseInt(values.weaponSkill.replace('+', ''));
    const modifier = parseInt(values.hitModifier);
    const modifiedWS = Math.max(2, Math.min(6, wsValue - modifier));
    
    let baseChance = (7 - modifiedWS) / 6;
    
    // Apply re-rolls
    if (values.rerollHits === 'Re-roll 1s') {
      baseChance += (1/6) * baseChance;
    } else if (values.rerollHits === 'Re-roll All Failed') {
      baseChance += (1 - baseChance) * baseChance;
    } else if (values.rerollHits === 'Re-roll All') {
      baseChance = 1 - (1 - baseChance) * (1 - baseChance);
    }
    
    // Twin-linked gives re-roll
    if (values.twinLinked && values.rerollHits === 'None') {
      baseChance += (1 - baseChance) * baseChance;
    }
    
    setHitChance(Math.round(baseChance * 100));
  }, [values.weaponSkill, values.hitModifier, values.rerollHits, values.torrent, values.twinLinked]);

  return (
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Hit Roll Configuration"
        inputs={hitInputs}
        values={values}
        onValueChange={onValueChange}
      />

      <InputSection
        title="Special Hit Rules"
        inputs={specialRules}
        values={values}
        onValueChange={onValueChange}
      />

      {values.sustainedHits && (
        <InputSection
          title="Sustained Hits Options"
          inputs={sustainedOptions.filter(i => i.visible !== false)}
          values={values}
          onValueChange={onValueChange}
        />
      )}

      <InputSection
        title="Additional Rules"
        inputs={additionalRules}
        values={values}
        onValueChange={onValueChange}
      />

      {/* Hit Probability Display */}
      <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary }]}>
        <Text style={[globalStyles.sectionTitle, { color: colors.text }]}>Hit Probability</Text>
        <Text style={[globalStyles.mainResult, { color: colors.secondary, marginBottom: 0 }]}>
          {hitChance}%
        </Text>
        {values.torrent && (
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text }]}>
            Torrent weapons automatically hit
          </Text>
        )}
        {values.lethalHits && (
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: 8 }]}>
            Critical hits auto-wound
          </Text>
        )}
        {values.sustainedHits && (
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: 8 }]}>
            Critical hits score {values.sustainedHitsValue} extra hits
          </Text>
        )}
        {values.criticalOn5Plus && (
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: 8 }]}>
            Natural 5s and 6s count as critical hits
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default HitPage;