import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ToggleSwitch from '../ToggleSwitch';
import { globalStyles, colors } from '../../styles/styles';
import { dimensions, moderateScale, contentHeight } from '../../utils/responsive';

const AttacksPage = ({ values, onValueChange }) => {
  const [diceCount, setDiceCount] = useState('0');
  const [fixedBonus, setFixedBonus] = useState('0');
  const [averageAttacks, setAverageAttacks] = useState(null);
  const [isUsingDice, setIsUsingDice] = useState(false);

  // Calculate average attacks when dice values change
  useEffect(() => {
    if (diceCount === '0' && fixedBonus === '0') {
      // Use manual input
      setIsUsingDice(false);
      return;
    }
    
    const dice = parseInt(diceCount) || 0;
    const bonus = parseInt(fixedBonus) || 0;
    
    if (dice > 0 || bonus > 0) {
      // Calculate average: each D6 averages to 3.5
      const average = (dice * 3.5) + bonus;
      setAverageAttacks(average);
      onValueChange('attacksPerModel', average);
      setIsUsingDice(true);
    }
  }, [diceCount, fixedBonus]);

  const calculateAverage = () => {
    const dice = parseInt(diceCount) || 0;
    const bonus = parseInt(fixedBonus) || 0;
    
    if (dice > 0 || bonus > 0) {
      // Calculate average: each D6 averages to 3.5
      const average = (dice * 3.5) + bonus;
      setAverageAttacks(average);
      onValueChange('attacksPerModel', average);
    }
  };

  const totalAttacks = values.models * values.attacksPerModel;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: dimensions.paddingLarge }}>
        {/* Compact Unit Configuration */}
        <View style={[globalStyles.section, { marginVertical: dimensions.paddingSmall / 2, padding: dimensions.paddingSmall }]}>
          <Text style={[globalStyles.sectionTitle, { fontSize: dimensions.fontSmall, marginBottom: dimensions.paddingSmall }]}>Unit Configuration</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: dimensions.paddingMedium }}>
              <Text style={[globalStyles.label, { fontSize: dimensions.fontTiny, marginBottom: dimensions.paddingSmall }]}>Number of Models</Text>
              <TextInput
                style={[globalStyles.input, { height: dimensions.inputHeightCompact, padding: dimensions.paddingMedium }]}
                value={String(values.models)}
                onChangeText={(text) => onValueChange('models', parseInt(text) || 0)}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>
            
            <View style={{ flex: 1, marginLeft: dimensions.paddingMedium }}>
              <Text style={[globalStyles.label, { fontSize: dimensions.fontTiny, marginBottom: dimensions.paddingSmall }]}>Attacks per Model</Text>
              <TextInput
                style={[globalStyles.input, { height: dimensions.inputHeightCompact, padding: dimensions.paddingMedium }, isUsingDice && { backgroundColor: colors.surface, opacity: 0.5 }]}
                value={isUsingDice ? '' : String(values.attacksPerModel)}
                onChangeText={(text) => {
                  setDiceCount('0');
                  setFixedBonus('0');
                  setAverageAttacks(null);
                  setIsUsingDice(false);
                  onValueChange('attacksPerModel', parseFloat(text) || 0);
                }}
                keyboardType="decimal-pad"
                placeholder={isUsingDice ? 'Using D6' : '1'}
                editable={!isUsingDice}
              />
            </View>
          </View>
          
          {/* Compact D6 Option */}
          <View style={{ marginTop: dimensions.paddingMedium }}>
            <Text style={[globalStyles.label, { fontSize: dimensions.fontTiny, marginBottom: dimensions.paddingSmall }]}>Or use D6 dice</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[globalStyles.picker, { flex: 1, height: dimensions.inputHeightCompact, marginRight: dimensions.paddingMedium }]}>
                <Picker
                  selectedValue={diceCount}
                  onValueChange={(value) => {
                    setDiceCount(value);
                    if (value !== '0' || fixedBonus !== '0') {
                      setIsUsingDice(true);
                    }
                  }}
                  style={{ color: colors.text, height: dimensions.inputHeightCompact }}
                  dropdownIconColor={colors.text}
                >
                  <Picker.Item label="0 D6" value="0" />
                  <Picker.Item label="1 D6" value="1" />
                  <Picker.Item label="2 D6" value="2" />
                  <Picker.Item label="3 D6" value="3" />
                  <Picker.Item label="4 D6" value="4" />
                  <Picker.Item label="5 D6" value="5" />
                  <Picker.Item label="6 D6" value="6" />
                </Picker>
              </View>
              
              <Text style={{ color: colors.text, fontSize: dimensions.fontMedium, marginHorizontal: dimensions.paddingMedium }}>+</Text>
              
              <TextInput
                style={[globalStyles.input, { flex: 1, height: dimensions.inputHeightCompact, padding: dimensions.paddingMedium }]}
                value={fixedBonus}
                onChangeText={(text) => {
                  setFixedBonus(text);
                  if (text !== '0' || diceCount !== '0') {
                    setIsUsingDice(true);
                  }
                }}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
            
            {(diceCount !== '0' || fixedBonus !== '0') && (
              <Text style={{ color: colors.secondary, textAlign: 'center', marginTop: dimensions.paddingSmall, fontSize: dimensions.fontTiny }}>
                Average: {averageAttacks !== null ? averageAttacks.toFixed(1) : '0'} attacks
              </Text>
            )}
          </View>
        </View>

        {/* Special Rules */}
        <View style={[globalStyles.section, { marginVertical: dimensions.paddingSmall / 2, padding: dimensions.paddingSmall }]}>
          <Text style={[globalStyles.sectionTitle, { fontSize: dimensions.fontSmall, marginBottom: dimensions.paddingSmall }]}>Special Rules</Text>
          <ToggleSwitch
            label="Blast (+1 attack per 5 enemy models)"
            value={values.blast}
            onValueChange={(newValue) => onValueChange('blast', newValue)}
            compact={true}
          />
        </View>

        {/* Compact Results Display */}
        <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary, marginVertical: dimensions.paddingSmall / 2, padding: dimensions.paddingSmall, flex: 1, justifyContent: 'center', maxHeight: dimensions.contentHeight * 0.3 }]}>
          <Text style={[globalStyles.mainResult, { color: colors.secondary, fontSize: dimensions.fontHuge * 0.8, marginBottom: dimensions.paddingSmall }]}>
            {totalAttacks}
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, fontSize: dimensions.fontSmall }]}>
            Total Attacks • {values.models} × {values.attacksPerModel}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AttacksPage;