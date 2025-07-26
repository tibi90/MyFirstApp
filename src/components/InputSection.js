import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ToggleSwitch from './ToggleSwitch';
import { globalStyles, colors } from '../styles/styles';
import { dimensions, moderateScale } from '../utils/responsive';

const InputSection = ({ title, inputs, values, onValueChange, errors = {}, compact = false }) => {
  const renderInput = (input) => {
    const value = values[input.key];
    const error = errors[input.key];

    if (input.type === 'numeric') {
      return (
        <View key={input.key} style={[globalStyles.inputRow, compact && { marginBottom: 0 }]}>
          {!compact && <Text style={globalStyles.label}>{input.label}</Text>}
          <TextInput
            style={[globalStyles.input, compact && { height: dimensions.inputHeightCompact, padding: dimensions.paddingMedium }, error && { borderColor: colors.error }]}
            value={String(value)}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              onValueChange(input.key, num);
            }}
            keyboardType="numeric"
            placeholder="Enter value"
            placeholderTextColor={colors.textSecondary}
          />
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    if (input.type === 'picker') {
      return (
        <View key={input.key} style={[globalStyles.inputRow, compact && { marginBottom: 0 }]}>
          {!compact && <Text style={globalStyles.label}>{input.label}</Text>}
          <View style={[globalStyles.picker, compact && { height: dimensions.inputHeightCompact }, error && { borderColor: colors.error }]}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onValueChange(input.key, itemValue)}
              style={{ color: colors.text, height: compact ? dimensions.inputHeightCompact : dimensions.inputHeight }}
              dropdownIconColor={colors.text}
              mode="dropdown"
              prompt={input.label}
            >
              {input.options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    if (input.type === 'toggle') {
      return (
        <View key={input.key} style={globalStyles.inputRow}>
          <ToggleSwitch
            label={input.label}
            value={value}
            onValueChange={(newValue) => onValueChange(input.key, newValue)}
          />
        </View>
      );
    }

    if (input.type === 'conditional') {
      // Show toggle and additional input if toggle is on
      return (
        <View key={input.key}>
          <View style={globalStyles.inputRow}>
            <ToggleSwitch
              label={input.label}
              value={value}
              onValueChange={(newValue) => onValueChange(input.key, newValue)}
            />
          </View>
          {value && input.conditionalInput && (
            <View style={{ marginLeft: 20 }}>
              {renderInput({ ...input.conditionalInput, key: input.conditionalInput.key })}
            </View>
          )}
        </View>
      );
    }

    return null;
  };

  if (compact) {
    return (
      <View style={[globalStyles.section, { marginVertical: dimensions.paddingSmall, padding: dimensions.paddingMedium }]}>
        <Text style={[globalStyles.sectionTitle, { fontSize: dimensions.fontMedium, marginBottom: dimensions.paddingMedium }]}>{title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {inputs.map(input => {
            if (input.type === 'toggle') {
              return (
                <View key={input.key} style={{ width: '50%', paddingRight: dimensions.paddingSmall, marginBottom: dimensions.paddingMedium }}>
                  <ToggleSwitch
                    label={input.label}
                    value={values[input.key]}
                    onValueChange={(newValue) => onValueChange(input.key, newValue)}
                    compact={true}
                  />
                </View>
              );
            }
            return (
              <View key={input.key} style={{ width: '100%', marginBottom: dimensions.paddingMedium }}>
                {compact && <Text style={[globalStyles.label, { fontSize: dimensions.fontTiny, marginBottom: dimensions.paddingSmall }]}>{input.label}</Text>}
                {renderInput(input)}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>
      {inputs.map(renderInput)}
    </View>
  );
};

export default InputSection;