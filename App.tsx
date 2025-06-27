import React, { useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FlatInfoScreen from './src/screens/FlatInfoScreen';
import PasswordsScreen from './src/screens/PasswordsScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';

type Screen = 'Login' | 'Home' | 'FlatInfo' | 'Passwords' | 'Activities' | 'Emergency';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('Home');
  };

  const navigation = {
    navigate: (screen: Screen) => setCurrentScreen(screen),
    goBack: () => setCurrentScreen('Home'),
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <LoginScreen onLogin={handleLogin} />
      </SafeAreaView>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={navigation} />;
      case 'FlatInfo':
        return <FlatInfoScreen />;
      case 'Passwords':
        return <PasswordsScreen />;
      case 'Activities':
        return <ActivitiesScreen />;
      case 'Emergency':
        return <EmergencyScreen />;
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5f3f" />
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;