import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import InputSection from '../InputSection';
import { globalStyles, colors } from '../../styles/styles';

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
    <ScrollView style={globalStyles.scrollView}>
      <InputSection
        title="Defensive Profile"
        inputs={saveInputs}
        values={values}
        onValueChange={onValueChange}
      />

      {/* Save Probability Display */}
      <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary }]}>
        <Text style={[globalStyles.sectionTitle, { color: colors.text }]}>Save Probabilities</Text>
        
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Armor Save (AP{values.armorPiercing}{values.cover ? ', Cover' : ''}):</Text>
          <Text style={globalStyles.resultValue}>{saveChance}%</Text>
        </View>
        
        {values.invulnSave !== 'None' && (
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>Invulnerable Save:</Text>
            <Text style={globalStyles.resultValue}>{invulnChance}%</Text>
          </View>
        )}
        
        {values.feelNoPain !== 'None' && (
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>Feel No Pain:</Text>
            <Text style={globalStyles.resultValue}>{fnpChance}%</Text>
          </View>
        )}
        
        <View style={[globalStyles.resultRow, { borderTopWidth: 2, borderTopColor: colors.secondary, paddingTop: 16, marginTop: 8 }]}>
          <Text style={[globalStyles.resultLabel, { fontSize: 16, fontWeight: 'bold' }]}>Total Survival:</Text>
          <Text style={[globalStyles.resultValue, { fontSize: 20, color: colors.secondary }]}>{totalSurvival}%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SavePage;