import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

const FlatInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Flat Details</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Room Number:</Text>
          <Text style={styles.value}>Suite 405</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Floor:</Text>
          <Text style={styles.value}>4th Floor</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Check-in:</Text>
          <Text style={styles.value}>3:00 PM</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Check-out:</Text>
          <Text style={styles.value}>11:00 AM</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenityList}>
          <Text style={styles.amenityItem}>• King Size Bed</Text>
          <Text style={styles.amenityItem}>• Mini Bar</Text>
          <Text style={styles.amenityItem}>• Smart TV with Netflix</Text>
          <Text style={styles.amenityItem}>• Coffee Machine</Text>
          <Text style={styles.amenityItem}>• Safe Deposit Box</Text>
          <Text style={styles.amenityItem}>• Air Conditioning</Text>
          <Text style={styles.amenityItem}>• Balcony with City View</Text>
          <Text style={styles.amenityItem}>• Work Desk</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotel Facilities</Text>
        <View style={styles.facilityCard}>
          <Text style={styles.facilityTitle}>🏊 Swimming Pool</Text>
          <Text style={styles.facilityDetails}>Open: 6:00 AM - 10:00 PM</Text>
          <Text style={styles.facilityDetails}>Located on the rooftop</Text>
        </View>
        <View style={styles.facilityCard}>
          <Text style={styles.facilityTitle}>🏋️ Fitness Center</Text>
          <Text style={styles.facilityDetails}>Open: 24/7</Text>
          <Text style={styles.facilityDetails}>Ground floor, next to reception</Text>
        </View>
        <View style={styles.facilityCard}>
          <Text style={styles.facilityTitle}>🍽️ Restaurant</Text>
          <Text style={styles.facilityDetails}>Breakfast: 6:30 AM - 10:30 AM</Text>
          <Text style={styles.facilityDetails}>Dinner: 6:00 PM - 10:00 PM</Text>
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
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amenityList: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  amenityItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  facilityCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  facilityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  facilityDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default FlatInfoScreen;