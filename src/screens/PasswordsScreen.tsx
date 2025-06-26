import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const PasswordsScreen = () => {
  const copyToClipboard = (text: string, label: string) => {
    Alert.alert('Copied!', `${label} copied to clipboard`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WiFi Access</Text>
        <TouchableOpacity
          style={styles.passwordCard}
          onPress={() => copyToClipboard('HolidayInn_Guest', 'Network name')}
        >
          <Text style={styles.label}>Network Name:</Text>
          <Text style={styles.value}>HolidayInn_Guest</Text>
          <Text style={styles.copyHint}>Tap to copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.passwordCard}
          onPress={() => copyToClipboard('Welcome2024!', 'WiFi password')}
        >
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>Welcome2024!</Text>
          <Text style={styles.copyHint}>Tap to copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Room Access</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Door Code:</Text>
          <Text style={styles.value}>4-0-5-#</Text>
          <Text style={styles.note}>Press # after entering the code</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Safe Code:</Text>
          <Text style={styles.value}>1234</Text>
          <Text style={styles.note}>Default code - please change it</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entertainment</Text>
        <TouchableOpacity
          style={styles.passwordCard}
          onPress={() => copyToClipboard('holidayinn405', 'Netflix username')}
        >
          <Text style={styles.label}>Netflix Username:</Text>
          <Text style={styles.value}>holidayinn405</Text>
          <Text style={styles.copyHint}>Tap to copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.passwordCard}
          onPress={() => copyToClipboard('StreamTime2024', 'Netflix password')}
        >
          <Text style={styles.label}>Netflix Password:</Text>
          <Text style={styles.value}>StreamTime2024</Text>
          <Text style={styles.copyHint}>Tap to copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Access Codes</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Gym Access:</Text>
          <Text style={styles.value}>Use room key card</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Pool Access Code:</Text>
          <Text style={styles.value}>7890</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Parking Space:</Text>
          <Text style={styles.value}>B2-045</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a5f3f',
    marginBottom: 15,
  },
  passwordCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  copyHint: {
    fontSize: 12,
    color: '#1a5f3f',
    fontStyle: 'italic',
  },
  note: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default PasswordsScreen;