import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../styles/styles';
import { dimensions, moderateScale, verticalScale } from '../utils/responsive';

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
    paddingVertical: verticalScale(12),
    minHeight: dimensions.inputHeight,
  },
  label: {
    flex: 1,
    fontSize: dimensions.fontSmall,
    color: colors.text,
    marginRight: dimensions.paddingMedium,
  },
  switch: {
    width: moderateScale(50),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: colors.border,
    padding: moderateScale(2),
  },
  switchActive: {
    backgroundColor: colors.primary,
  },
  thumb: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: colors.text,
  },
  thumbActive: {
    transform: [{ translateX: moderateScale(20) }],
  },
  containerCompact: {
    paddingVertical: verticalScale(6),
    minHeight: dimensions.inputHeightCompact,
  },
  labelCompact: {
    fontSize: dimensions.fontTiny,
  },
  switchCompact: {
    width: moderateScale(40),
    height: moderateScale(24),
  },
  thumbCompact: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  thumbActiveCompact: {
    transform: [{ translateX: moderateScale(16) }],
  },
});

export default ToggleSwitch;