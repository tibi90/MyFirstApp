import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AttacksPage from './pages/AttacksPage';
import HitPage from './pages/HitPage';
import WoundPage from './pages/WoundPage';
import SavePage from './pages/SavePage';
import ResultsPage from './pages/ResultsPage';
import { globalStyles, colors } from '../styles/styles';

const STORAGE_KEY = '@wh40k_calculator_values';

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState({
    // Basic Attacker
    models: 1,
    attacksPerModel: 1,
    weaponSkill: '3+',
    weaponStrength: 4,
    armorPiercing: '0',
    damage: 1,
    // Hit Modifiers
    lethalHits: false,
    sustainedHits: false,
    sustainedHitsValue: '1',
    rerollHits: 'None',
    precision: false,
    torrent: false,
    hazardous: false,
    hitModifier: '0',
    // Wound Modifiers
    rerollWounds: 'None',
    antiTarget: false,
    antiTargetThreshold: '4+',
    devastatingWounds: false,
    twinLinked: false,
    woundModifier: '0',
    blast: false,
    blastMultiplier: 1,
    // Defender & Saves
    toughness: 4,
    armorSave: '3+',
    invulnSave: 'None',
    feelNoPain: 'None',
    unitSize: 5,
    cover: false,
  });

  const pages = [
    { title: 'Models & Attacks', component: AttacksPage },
    { title: 'Hit Rolls', component: HitPage },
    { title: 'Wound Rolls', component: WoundPage },
    { title: 'Saving Throws', component: SavePage },
    { title: 'Battle Results', component: ResultsPage },
  ];

  useEffect(() => {
    loadSavedValues();
  }, []);

  useEffect(() => {
    saveValues();
  }, [values]);

  const loadSavedValues = async () => {
    try {
      const savedValues = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedValues) {
        setValues(prev => ({ ...prev, ...JSON.parse(savedValues) }));
      }
    } catch (error) {
      console.error('Error loading saved values:', error);
    }
  };

  const saveValues = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch (error) {
      console.error('Error saving values:', error);
    }
  };

  const handleValueChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const goToNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const PageComponent = pages[currentPage].component;

  return (
    <View style={styles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Wound Calculator</Text>
        <Text style={globalStyles.headerSubtitle}>Warhammer 40,000 10th Edition</Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.progressDot,
              index === currentPage && styles.progressDotActive,
              index < currentPage && styles.progressDotComplete,
            ]}
            onPress={() => setCurrentPage(index)}
          >
            <Text style={styles.progressNumber}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Page Title */}
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>{pages[currentPage].title}</Text>
      </View>

      {/* Page Content */}
      <PageComponent
        values={values}
        onValueChange={handleValueChange}
        onNavigate={setCurrentPage}
      />

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
          onPress={goToPrevious}
          disabled={currentPage === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.navButtonPrimary]}
          onPress={goToNext}
          disabled={currentPage === pages.length - 1}
        >
          <Text style={styles.navButtonText}>
            {currentPage === pages.length - 2 ? 'Calculate' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  progressDotComplete: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
  },
  progressNumber: {
    color: colors.text,
    fontWeight: 'bold',
  },
  pageTitleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  navButtonPrimary: {
    backgroundColor: colors.primary,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navigation;