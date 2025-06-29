import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { globalStyles, colors } from '../styles/styles';

const ProbabilityDistribution = ({ distribution, statistics, title = "Probability Distribution" }) => {
  if (!distribution || distribution.length === 0) return null;

  // Find the maximum probability for scaling bars
  const maxProb = Math.max(...distribution.map(d => d.probability));

  // Function to render a probability bar
  const renderBar = (item) => {
    const barWidth = (item.probability / maxProb) * 100;
    const isMode = statistics && statistics.modes.includes(item.hits);
    
    return (
      <View key={item.hits} style={styles.barContainer}>
        <Text style={styles.barLabel}>{item.hits}</Text>
        <View style={styles.barWrapper}>
          <View 
            style={[
              styles.bar, 
              { width: `${barWidth}%` },
              isMode && styles.modeBar
            ]} 
          />
          <Text style={styles.barPercentage}>{item.percentage}%</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>
      
      {statistics && (
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            Expected: {statistics.expectedValue} hits
          </Text>
          <Text style={styles.statText}>
            Most Likely: {statistics.modes.join(' or ')} hits ({statistics.modePercentage}%)
          </Text>
          <Text style={styles.statText}>
            68% Confidence: {statistics.confidenceInterval68.lower}-{statistics.confidenceInterval68.upper} hits
          </Text>
          <Text style={styles.statText}>
            95% Confidence: {statistics.confidenceInterval95.lower}-{statistics.confidenceInterval95.upper} hits
          </Text>
        </View>
      )}

      <ScrollView style={styles.distributionContainer} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.barsContainer}>
          {distribution.map(renderBar)}
        </View>
      </ScrollView>

      {/* Key percentiles */}
      <View style={styles.percentilesContainer}>
        <Text style={styles.percentileTitle}>Key Probabilities:</Text>
        {distribution.filter(d => d.probability > 0.01).map(item => (
          <View key={item.hits} style={styles.percentileRow}>
            <Text style={styles.percentileLabel}>
              {item.hits} hit{item.hits !== 1 ? 's' : ''}:
            </Text>
            <Text style={styles.percentileValue}>
              {item.percentage}% (≥{item.cumulativeGreaterEqual}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = {
  statsContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  statText: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 4,
  },
  distributionContainer: {
    maxHeight: 120,
    marginVertical: 12,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  barContainer: {
    marginHorizontal: 4,
    alignItems: 'center',
  },
  barLabel: {
    color: colors.text,
    fontSize: 12,
    marginBottom: 4,
  },
  barWrapper: {
    width: 40,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '80%',
    backgroundColor: colors.secondary,
    borderRadius: 2,
  },
  modeBar: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  barPercentage: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
    position: 'absolute',
    bottom: -16,
  },
  percentilesContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  percentileTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  percentileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  percentileLabel: {
    color: colors.text,
    fontSize: 12,
  },
  percentileValue: {
    color: colors.textSecondary,
    fontSize: 12,
  },
};

export default ProbabilityDistribution;