import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../styles/styles';

const ToggleSwitch = ({ label, value, onValueChange, compact = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, compact && styles.containerCompact]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, compact && styles.labelCompact]}>{label}</Text>
      <View style={[styles.switch, compact && styles.switchCompact, value && styles.switchActive]}>
        <View style={[styles.thumb, compact && styles.thumbCompact, value && (compact ? styles.thumbActiveCompact : styles.thumbActive)]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    minHeight: 44,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginRight: 12,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.border,
    padding: 2,
  },
  switchActive: {
    backgroundColor: colors.primary,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.text,
  },
  thumbActive: {
    transform: [{ translateX: 20 }],
  },
  containerCompact: {
    paddingVertical: 6,
    minHeight: 32,
  },
  labelCompact: {
    fontSize: 12,
  },
  switchCompact: {
    width: 40,
    height: 24,
  },
  thumbCompact: {
    width: 20,
    height: 20,
  },
  thumbActiveCompact: {
    transform: [{ translateX: 16 }],
  },
});

export default ToggleSwitch;