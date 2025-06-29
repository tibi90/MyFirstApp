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
        {Math.round(parseFloat(results.averageWounds))} wounds
      </Text>
      <Text style={[globalStyles.resultLabel, { textAlign: 'center', marginBottom: 8 }]}>
        Most Likely Result
      </Text>
      <Text style={[globalStyles.resultLabel, { textAlign: 'center', marginBottom: 20, fontSize: 14 }]}>
        Average: {results.averageWounds} wounds
      </Text>

      {/* Confidence Intervals */}
      {results.confidence && (
        <View style={[globalStyles.section, { marginBottom: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
          <Text style={[globalStyles.sectionTitle, { fontSize: 14, marginBottom: 8 }]}>Confidence Intervals</Text>
          
          <View style={globalStyles.resultRow}>
            <Text style={globalStyles.resultLabel}>68% Confidence:</Text>
            <Text style={globalStyles.resultValue}>
              {Math.round(parseFloat(results.confidence.interval68.lower))}-{Math.round(parseFloat(results.confidence.interval68.upper))} wounds
            </Text>
          </View>
          
          <View style={[globalStyles.resultRow, { borderBottomWidth: 0 }]}>
            <Text style={globalStyles.resultLabel}>95% Confidence:</Text>
            <Text style={globalStyles.resultValue}>
              {Math.round(parseFloat(results.confidence.interval95.lower))}-{Math.round(parseFloat(results.confidence.interval95.upper))} wounds
            </Text>
          </View>
        </View>
      )}

      {results.mortalWounds && parseFloat(results.mortalWounds) > 0 && (
        <View style={[globalStyles.resultRow, { backgroundColor: 'rgba(204, 0, 0, 0.2)', padding: 8, marginBottom: 10 }]}>
          <Text style={globalStyles.resultLabel}>Mortal Wounds Included:</Text>
          <Text style={[globalStyles.resultValue, { color: '#cc0000' }]}>{Math.round(parseFloat(results.mortalWounds))}</Text>
        </View>
      )}

      <View style={globalStyles.resultRow}>
        <Text style={globalStyles.resultLabel}>Total Attacks:</Text>
        <Text style={globalStyles.resultValue}>{results.totalAttacks}</Text>
      </View>

      <View style={globalStyles.resultRow}>
        <Text style={globalStyles.resultLabel}>Hit Chance:</Text>
        <Text style={globalStyles.resultValue}>{results.hitRate}% ({Math.round(parseFloat(results.details?.totalHits || 0))} hits)</Text>
      </View>

      {results.details && results.details.totalHits && (
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Expected Hits:</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details.totalHits))}</Text>
        </View>
      )}

      <View style={globalStyles.resultRow}>
        <Text style={globalStyles.resultLabel}>Wound Chance:</Text>
        <Text style={globalStyles.resultValue}>{results.woundRate}%</Text>
      </View>

      {results.details && results.details.lethalHitWounds && parseFloat(results.details.lethalHitWounds) > 0 && (
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Auto-wounds (Lethal Hits):</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details.lethalHitWounds))}</Text>
        </View>
      )}

      {results.details && results.details.sustainedHits && parseFloat(results.details.sustainedHits) > 0 && (
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Extra Hits (Sustained):</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details.sustainedHits))}</Text>
        </View>
      )}

      {results.details && results.details.criticalWounds && parseFloat(results.details.criticalWounds) > 0 && (
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Critical Wounds:</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details.criticalWounds))}</Text>
        </View>
      )}

      <View style={[globalStyles.resultRow, { borderBottomWidth: 0 }]}>
        <Text style={globalStyles.resultLabel}>Failed Save Chance:</Text>
        <Text style={globalStyles.resultValue}>{results.failedSaveRate}%</Text>
      </View>

      {/* Summary Statistics */}
      <View style={[globalStyles.section, { marginTop: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
        <Text style={[globalStyles.sectionTitle, { fontSize: 14, marginBottom: 8 }]}>Combat Summary</Text>
        
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Successful Hits:</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details?.successfulHits || 0))}</Text>
        </View>
        
        <View style={globalStyles.resultRow}>
          <Text style={globalStyles.resultLabel}>Successful Wounds:</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details?.successfulWounds || 0))}</Text>
        </View>
        
        <View style={[globalStyles.resultRow, { borderBottomWidth: 0 }]}>
          <Text style={globalStyles.resultLabel}>Failed Saves:</Text>
          <Text style={globalStyles.resultValue}>{Math.round(parseFloat(results.details?.failedSaves || 0))}</Text>
        </View>
      </View>

      {results.details && results.details.hazardousDamage && parseFloat(results.details.hazardousDamage) > 0 && (
        <View style={[globalStyles.resultRow, { backgroundColor: 'rgba(204, 0, 0, 0.1)', padding: 8, marginTop: 10 }]}>
          <Text style={[globalStyles.resultLabel, { color: '#cc0000' }]}>Hazardous (self damage):</Text>
          <Text style={[globalStyles.resultValue, { color: '#cc0000' }]}>{Math.round(parseFloat(results.details.hazardousDamage))}</Text>
        </View>
      )}
    </View>
  );
};

export default ResultsDisplay;