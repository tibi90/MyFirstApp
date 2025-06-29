import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
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

  // Calculate average attacks when dice values change
  useEffect(() => {
    if (diceCount === '0' && fixedBonus === '0') {
      // Use manual input
      return;
    }
    
    const dice = parseInt(diceCount) || 0;
    const bonus = parseInt(fixedBonus) || 0;
    
    if (dice > 0 || bonus > 0) {
      // Calculate average: each D6 averages to 3.5
      const average = (dice * 3.5) + bonus;
      setAverageAttacks(average);
      onValueChange('attacksPerModel', average);
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
    <ScrollView style={globalStyles.scrollView}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>Unit Size & Attacks</Text>
        
        <View style={globalStyles.inputRow}>
          <Text style={globalStyles.label}>Number of Models</Text>
          <TextInput
            style={globalStyles.input}
            value={String(values.models)}
            onChangeText={(text) => onValueChange('models', parseInt(text) || 0)}
            keyboardType="numeric"
            placeholder="1"
          />
        </View>

        <View style={[globalStyles.inputRow, { marginTop: 24 }]}>
          <Text style={[globalStyles.label, { fontSize: 16, color: colors.secondary, marginBottom: 16 }]}>
            Attacks per Model
          </Text>
        </View>

        {/* Dice Options */}
        <View style={[globalStyles.inputRow, { backgroundColor: colors.background, padding: 12, borderRadius: 8 }]}>
          <Text style={[globalStyles.label, { marginBottom: 12 }]}>Average Attacks (D6)</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[globalStyles.label, { fontSize: 12 }]}>Number of D6</Text>
              <View style={globalStyles.picker}>
                <Picker
                  selectedValue={diceCount}
                  onValueChange={setDiceCount}
                  style={{ color: colors.text }}
                  dropdownIconColor={colors.text}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                </Picker>
              </View>
            </View>
            
            <Text style={{ color: colors.text, fontSize: 24, marginHorizontal: 12 }}>+</Text>
            
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[globalStyles.label, { fontSize: 12 }]}>Fixed Bonus</Text>
              <TextInput
                style={globalStyles.input}
                value={fixedBonus}
                onChangeText={setFixedBonus}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>

          {(diceCount !== '0' || fixedBonus !== '0') && (
            <View style={{ marginTop: 12 }}>
              <Text style={{ color: colors.secondary, textAlign: 'center', fontSize: 16 }}>
                Average: {averageAttacks !== null ? averageAttacks.toFixed(1) : '0'} attacks per model
              </Text>
              {diceCount !== '0' && (
                <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 4, fontSize: 14 }}>
                  ({diceCount}D6{fixedBonus !== '0' ? ` + ${fixedBonus}` : ''})
                </Text>
              )}
            </View>
          )}
        </View>

        <Text style={[globalStyles.label, { textAlign: 'center', marginVertical: 16, color: colors.textSecondary }]}>
          — OR —
        </Text>

        {/* Manual Input */}
        <View style={globalStyles.inputRow}>
          <Text style={globalStyles.label}>Fixed Attacks per Model</Text>
          <TextInput
            style={globalStyles.input}
            value={String(values.attacksPerModel)}
            onChangeText={(text) => {
              setDiceCount('0');
              setFixedBonus('0');
              setAverageAttacks(null);
              onValueChange('attacksPerModel', parseFloat(text) || 0);
            }}
            keyboardType="decimal-pad"
            placeholder="1"
          />
        </View>
      </View>

      {/* Total Attacks Display */}
      <View style={[globalStyles.section, { backgroundColor: colors.primary, borderColor: colors.secondary }]}>
        <Text style={[globalStyles.sectionTitle, { color: colors.text }]}>Total Attacks</Text>
        <Text style={[globalStyles.mainResult, { color: colors.secondary, marginBottom: 0 }]}>
          {totalAttacks}
        </Text>
        <Text style={[globalStyles.label, { textAlign: 'center', color: colors.text }]}>
          {values.models} models × {values.attacksPerModel} attacks
        </Text>
      </View>

      {/* Blast Rule */}
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>Special Rules</Text>
        
        <View style={globalStyles.inputRow}>
          <ToggleSwitch
            label="Blast"
            value={values.blast}
            onValueChange={(newValue) => onValueChange('blast', newValue)}
          />
        </View>
        
        {values.blast && (
          <>
            <View style={globalStyles.inputRow}>
              <Text style={globalStyles.label}>Blast Hits per 5 Models</Text>
              <TextInput
                style={globalStyles.input}
                value={String(values.blastMultiplier || 1)}
                onChangeText={(text) => onValueChange('blastMultiplier', parseInt(text) || 1)}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>
            <Text style={[globalStyles.label, { fontSize: 12, color: colors.textSecondary, marginTop: 8, paddingHorizontal: 16 }]}>
              Blast adds {values.blastMultiplier || 1} attack per 5 enemy models
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default AttacksPage;