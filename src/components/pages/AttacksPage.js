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
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Compact Unit Configuration */}
        <View style={[globalStyles.section, { marginVertical: 4, padding: 12 }]}>
          <Text style={[globalStyles.sectionTitle, { fontSize: 16, marginBottom: 8 }]}>Unit Configuration</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[globalStyles.label, { fontSize: 12, marginBottom: 4 }]}>Number of Models</Text>
              <TextInput
                style={[globalStyles.input, { height: 36, padding: 8 }]}
                value={String(values.models)}
                onChangeText={(text) => onValueChange('models', parseInt(text) || 0)}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>
            
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[globalStyles.label, { fontSize: 12, marginBottom: 4 }]}>Attacks per Model</Text>
              <TextInput
                style={[globalStyles.input, { height: 36, padding: 8 }, isUsingDice && { backgroundColor: colors.surface, opacity: 0.5 }]}
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
          <View style={{ marginTop: 12 }}>
            <Text style={[globalStyles.label, { fontSize: 12, marginBottom: 4 }]}>Or use D6 dice</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[globalStyles.picker, { flex: 1, height: 36, marginRight: 8 }]}>
                <Picker
                  selectedValue={diceCount}
                  onValueChange={(value) => {
                    setDiceCount(value);
                    if (value !== '0' || fixedBonus !== '0') {
                      setIsUsingDice(true);
                    }
                  }}
                  style={{ color: colors.text, height: 36 }}
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
              
              <Text style={{ color: colors.text, fontSize: 18, marginHorizontal: 8 }}>+</Text>
              
              <TextInput
                style={[globalStyles.input, { flex: 1, height: 36, padding: 8 }]}
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
              <Text style={{ color: colors.secondary, textAlign: 'center', marginTop: 4, fontSize: 12 }}>
                Average: {averageAttacks !== null ? averageAttacks.toFixed(1) : '0'} attacks
              </Text>
            )}
          </View>
        </View>

        {/* Special Rules */}
        <View style={[globalStyles.section, { marginVertical: 4, padding: 12 }]}>
          <Text style={[globalStyles.sectionTitle, { fontSize: 16, marginBottom: 8 }]}>Special Rules</Text>
          <ToggleSwitch
            label="Blast (+1 attack per 5 enemy models)"
            value={values.blast}
            onValueChange={(newValue) => onValueChange('blast', newValue)}
            compact={true}
          />
        </View>

        {/* Compact Results Display */}
        <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary, marginVertical: 4, padding: 12, flex: 1, justifyContent: 'center' }]}>
          <Text style={[globalStyles.mainResult, { color: colors.secondary, fontSize: 48 }]}>
            {totalAttacks}
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, fontSize: 16 }]}>
            Total Attacks
          </Text>
          <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text, marginTop: 4 }]}>
            {values.models} models × {values.attacksPerModel} attacks
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AttacksPage;