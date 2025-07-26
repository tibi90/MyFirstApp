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
        {Math.round(parseFloat(results.averageWounds))} damage
      </Text>
      <Text style={[globalStyles.resultLabel, { textAlign: 'center', marginBottom: 8 }]}>
        Average Result
      </Text>
      
      {results.mortalWounds && parseFloat(results.mortalWounds) > 0 && (
        <Text style={[globalStyles.resultLabel, { textAlign: 'center', color: '#cc0000', fontSize: 14 }]}>
          Including {Math.round(parseFloat(results.mortalWounds))} mortal wounds
        </Text>
      )}
    </View>
  );
};

export default ResultsDisplay;