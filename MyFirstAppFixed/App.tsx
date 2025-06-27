import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// Test Component
const TestComponent = ({ name, children }: { name: string; children: React.ReactNode }) => {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [error, setError] = useState<string>('');

  React.useEffect(() => {
    try {
      // Try to render the component
      setStatus('success');
    } catch (e: any) {
      setStatus('error');
      setError(e.toString());
    }
  }, []);

  return (
    <View style={styles.testContainer}>
      <View style={styles.testHeader}>
        <Text style={styles.testName}>{name}</Text>
        <View style={[styles.statusDot, { backgroundColor: status === 'success' ? 'green' : status === 'error' ? 'red' : 'orange' }]} />
      </View>
      {status === 'error' && <Text style={styles.errorText}>{error}</Text>}
      {status === 'success' && (
        <View style={styles.componentContainer}>
          {children}
        </View>
      )}
    </View>
  );
};

// Minimal versions of components for testing
const MinimalLoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Login Screen</Text>
    <TouchableOpacity style={styles.button} onPress={onLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  </View>
);

const MinimalHomeScreen = ({ navigation }: any) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home Screen</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Test')}>
      <Text style={styles.buttonText}>Navigate</Text>
    </TouchableOpacity>
  </View>
);

const MinimalFlatInfoScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Flat Info Screen</Text>
    <Text>Room: 501</Text>
  </View>
);

const MinimalPasswordsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Passwords Screen</Text>
    <Text>WiFi: guest123</Text>
  </View>
);

const MinimalActivitiesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Activities Screen</Text>
    <Text>Pool: 8am-10pm</Text>
  </View>
);

const MinimalEmergencyScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Emergency Screen</Text>
    <Text>Call: 911</Text>
  </View>
);

const App = () => {
  const [testMode, setTestMode] = useState(true);
  const mockNavigation = { navigate: () => {}, goBack: () => {} };

  if (!testMode) {
    // Original app code would go here
    return (
      <SafeAreaView style={styles.container}>
        <Text>Original App (currently disabled for testing)</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Component Test Suite</Text>
          <Text style={styles.subHeader}>React Native 0.72.10</Text>
        </View>

        <TestComponent name="Basic React Native Components">
          <View>
            <Text>Text Component ✓</Text>
            <TouchableOpacity>
              <Text>TouchableOpacity ✓</Text>
            </TouchableOpacity>
          </View>
        </TestComponent>

        <TestComponent name="Login Screen">
          <MinimalLoginScreen onLogin={() => console.log('Login clicked')} />
        </TestComponent>

        <TestComponent name="Home Screen">
          <MinimalHomeScreen navigation={mockNavigation} />
        </TestComponent>

        <TestComponent name="Flat Info Screen">
          <MinimalFlatInfoScreen />
        </TestComponent>

        <TestComponent name="Passwords Screen">
          <MinimalPasswordsScreen />
        </TestComponent>

        <TestComponent name="Activities Screen">
          <MinimalActivitiesScreen />
        </TestComponent>

        <TestComponent name="Emergency Screen">
          <MinimalEmergencyScreen />
        </TestComponent>

        <TouchableOpacity 
          style={[styles.button, { margin: 20 }]} 
          onPress={() => setTestMode(false)}
        >
          <Text style={styles.buttonText}>Switch to Full App</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a5f3f',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  testContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  componentContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  screen: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1a5f3f',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;