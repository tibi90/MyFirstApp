import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles, colors } from '../../styles/styles';
import { dimensions, contentHeight } from '../../utils/responsive';

const SavePage = ({ values, onValueChange }) => {
  const [saveChance, setSaveChance] = useState(0);
  const [invulnChance, setInvulnChance] = useState(0);
  const [fnpChance, setFnpChance] = useState(0);
  const [totalSurvival, setTotalSurvival] = useState(0);

  const saveInputs = [
    { key: 'unitSize', label: 'Target Unit Size', type: 'number' },
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

  // Calculate save chances
  useEffect(() => {
    // Armor save calculation
    const ap = parseInt(values.armorPiercing || '0');
    const baseArmor = parseInt(values.armorSave.replace('+', ''));
    const coverBonus = values.cover ? 1 : 0;
    const modifiedArmor = baseArmor - ap - coverBonus;
    
    let armorChance = 0;
    if (modifiedArmor <= 6) {
      armorChance = (7 - modifiedArmor) / 6;
    }
    
    // Invuln save calculation
    let invulnChance = 0;
    if (values.invulnSave !== 'None') {
      const invulnValue = parseInt(values.invulnSave.replace('++', ''));
      invulnChance = (7 - invulnValue) / 6;
    }
    
    // Best save is used
    const bestSave = Math.max(armorChance, invulnChance);
    
    // FNP calculation
    let fnp = 0;
    if (values.feelNoPain !== 'None') {
      const fnpValue = parseInt(values.feelNoPain.replace('+', ''));
      fnp = (7 - fnpValue) / 6;
    }
    
    // Total survival chance
    const failSave = 1 - bestSave;
    const failFnp = 1 - fnp;
    const totalFail = failSave * failFnp;
    const totalSurvival = 1 - totalFail;
    
    setSaveChance(Math.round(armorChance * 100));
    setInvulnChance(Math.round(invulnChance * 100));
    setFnpChance(Math.round(fnp * 100));
    setTotalSurvival(Math.round(totalSurvival * 100));
  }, [values.armorSave, values.invulnSave, values.feelNoPain, values.armorPiercing, values.cover]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: dimensions.paddingLarge }}>
        <InputSection
          title="Defensive Profile"
          inputs={saveInputs}
          values={values}
          onValueChange={onValueChange}
          compact={true}
        />

        {/* Compact Save Display */}
        <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary, marginVertical: dimensions.paddingSmall / 2, padding: dimensions.paddingSmall, flex: 1, justifyContent: 'center', maxHeight: dimensions.contentHeight * 0.35 }]}>
          <Text style={[globalStyles.mainResult, { color: colors.secondary, fontSize: dimensions.fontHuge * 0.8, marginBottom: dimensions.paddingSmall }]}>
            {totalSurvival}%
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, fontSize: dimensions.fontSmall }]}>
            Chance to save
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: dimensions.paddingSmall, fontSize: dimensions.fontTiny }]}>
            {values.armorSave} (AP{values.armorPiercing}{values.cover ? ', Cover' : ''})
            {values.invulnSave !== 'None' && ` / ${values.invulnSave}`}
            {values.feelNoPain !== 'None' && ` / ${values.feelNoPain} FNP`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SavePage;