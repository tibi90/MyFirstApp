import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const EmergencyScreen = () => {
  const makeCall = (number: string, service: string) => {
    Alert.alert(
      'Make Call',
      `Call ${service} at ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log(`Calling ${number}`) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.emergencySection}>
        <Text style={styles.emergencyTitle}>🚨 Emergency Services</Text>
        <TouchableOpacity
          style={styles.emergencyCard}
          onPress={() => makeCall('911', 'Emergency')}
        >
          <Text style={styles.emergencyNumber}>911</Text>
          <Text style={styles.emergencyLabel}>Police, Fire, Medical Emergency</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotel Contacts</Text>
        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-0123', 'Reception')}
        >
          <Text style={styles.contactName}>Reception</Text>
          <Text style={styles.contactNumber}>+1 555-0123</Text>
          <Text style={styles.contactHours}>Available 24/7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-0124', 'Concierge')}
        >
          <Text style={styles.contactName}>Concierge Desk</Text>
          <Text style={styles.contactNumber}>+1 555-0124</Text>
          <Text style={styles.contactHours}>7 AM - 11 PM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-0125', 'Maintenance')}
        >
          <Text style={styles.contactName}>Maintenance</Text>
          <Text style={styles.contactNumber}>+1 555-0125</Text>
          <Text style={styles.contactHours}>For urgent room issues</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Services</Text>
        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-0200', 'Hospital')}
        >
          <Text style={styles.contactName}>City General Hospital</Text>
          <Text style={styles.contactNumber}>+1 555-0200</Text>
          <Text style={styles.contactHours}>Emergency Room 24/7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-0201', 'Pharmacy')}
        >
          <Text style={styles.contactName}>24-Hour Pharmacy</Text>
          <Text style={styles.contactNumber}>+1 555-0201</Text>
          <Text style={styles.contactHours}>0.5 miles from hotel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Services</Text>
        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-TAXI', 'Taxi')}
        >
          <Text style={styles.contactName}>Taxi Service</Text>
          <Text style={styles.contactNumber}>+1 555-TAXI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => makeCall('+1 555-0300', 'Airport Shuttle')}
        >
          <Text style={styles.contactName}>Airport Shuttle</Text>
          <Text style={styles.contactNumber}>+1 555-0300</Text>
          <Text style={styles.contactHours}>Book 24 hours in advance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emergencySection: {
    backgroundColor: '#ffebee',
    padding: 20,
  },
  emergencyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 15,
  },
  emergencyCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#c62828',
    alignItems: 'center',
  },
  emergencyNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#c62828',
  },
  emergencyLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
  contactCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 16,
    color: '#1a5f3f',
    marginBottom: 3,
  },
  contactHours: {
    fontSize: 14,
    color: '#666',
  },
});

export default EmergencyScreen;