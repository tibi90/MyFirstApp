import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles, colors } from '../styles/styles';

const InputSection = ({ title, inputs, values, onValueChange, errors = {} }) => {
  const renderInput = (input) => {
    const value = values[input.key];
    const error = errors[input.key];

    if (input.type === 'numeric') {
      return (
        <View key={input.key} style={globalStyles.inputRow}>
          <Text style={globalStyles.label}>{input.label}</Text>
          <TextInput
            style={[globalStyles.input, error && { borderColor: colors.error }]}
            value={String(value)}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              if (input.min !== undefined && num < input.min) return;
              if (input.max !== undefined && num > input.max) return;
              onValueChange(input.key, num);
            }}
            keyboardType="numeric"
            placeholder={`${input.min || 1} - ${input.max || 99}`}
            placeholderTextColor={colors.textSecondary}
          />
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    if (input.type === 'picker') {
      return (
        <View key={input.key} style={globalStyles.inputRow}>
          <Text style={globalStyles.label}>{input.label}</Text>
          <View style={[globalStyles.picker, error && { borderColor: colors.error }]}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onValueChange(input.key, itemValue)}
              style={{ color: colors.text }}
              dropdownIconColor={colors.text}
            >
              {input.options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  color={colors.text}
                />
              ))}
            </Picker>
          </View>
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>
      {inputs.map(renderInput)}
    </View>
  );
};

export default InputSection;