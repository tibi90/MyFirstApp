import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { globalStyles } from '../styles/styles';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  return (
    <View style={globalStyles.resultsContainer}>
      <Text style={globalStyles.resultsTitle}>Combat Results</Text>
      
      <Text style={globalStyles.mainResult}>
        {results.averageWounds}
      </Text>
      <Text style={[globalStyles.resultLabel, { textAlign: 'center', marginBottom: 20 }]}>
        Average Wounds Dealt
      </Text>

      <View style={globalStyles.resultRow}>
        <Text style={globalStyles.resultLabel}>Total Attacks:</Text>
        <Text style={globalStyles.resultValue}>{results.totalAttacks}</Text>
      </View>

      <View style={globalStyles.resultRow}>
        <Text style={globalStyles.resultLabel}>Hit Chance:</Text>
        <Text style={globalStyles.resultValue}>{results.hitRate}%</Text>
      </View>

      <View style={globalStyles.resultRow}>
        <Text style={globalStyles.resultLabel}>Wound Chance:</Text>
        <Text style={globalStyles.resultValue}>{results.woundRate}%</Text>
      </View>

      <View style={[globalStyles.resultRow, { borderBottomWidth: 0 }]}>
        <Text style={globalStyles.resultLabel}>Failed Save Chance:</Text>
        <Text style={globalStyles.resultValue}>{results.failedSaveRate}%</Text>
      </View>
    </View>
  );
};

export default ResultsDisplay;