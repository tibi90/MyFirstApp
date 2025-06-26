import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  const menuItems = [
    {
      title: 'Flat Information',
      subtitle: 'Room details and amenities',
      icon: '🏠',
      screen: 'FlatInfo',
    },
    {
      title: 'Access & Passwords',
      subtitle: 'WiFi, door codes, and more',
      icon: '🔐',
      screen: 'Passwords',
    },
    {
      title: 'Local Activities',
      subtitle: 'Things to do nearby',
      icon: '🎯',
      screen: 'Activities',
    },
    {
      title: 'Emergency Contacts',
      subtitle: 'Important phone numbers',
      icon: '📞',
      screen: 'Emergency',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.hotelName}>Holiday Inn Concierge</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation?.navigate(item.screen)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Need assistance? Call reception: +1 555-0123</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a5f3f',
    padding: 30,
    paddingTop: 60,
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
  },
  hotelName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});

export default HomeScreen;