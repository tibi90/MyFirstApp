import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ActivitiesScreen = () => {
  const activities = [
    {
      category: 'Restaurants',
      icon: '🍽️',
      items: [
        {
          name: 'The Local Kitchen',
          distance: '0.3 miles',
          description: 'Farm-to-table cuisine',
          rating: '⭐⭐⭐⭐⭐',
        },
        {
          name: 'Bella Italia',
          distance: '0.5 miles',
          description: 'Authentic Italian restaurant',
          rating: '⭐⭐⭐⭐',
        },
        {
          name: 'Sushi Paradise',
          distance: '0.7 miles',
          description: 'Fresh sushi and Japanese cuisine',
          rating: '⭐⭐⭐⭐⭐',
        },
      ],
    },
    {
      category: 'Attractions',
      icon: '🎭',
      items: [
        {
          name: 'City Museum',
          distance: '1.2 miles',
          description: 'Local history and art exhibitions',
          hours: '9 AM - 6 PM',
        },
        {
          name: 'Central Park',
          distance: '0.8 miles',
          description: 'Beautiful green space with walking trails',
          hours: 'Open 24/7',
        },
        {
          name: 'Old Town Walking Tour',
          distance: '1.5 miles',
          description: 'Historic district with guided tours',
          hours: 'Tours at 10 AM, 2 PM',
        },
      ],
    },
    {
      category: 'Shopping',
      icon: '🛍️',
      items: [
        {
          name: 'Main Street Mall',
          distance: '0.6 miles',
          description: 'Popular shopping center',
          hours: '10 AM - 9 PM',
        },
        {
          name: 'Local Artisan Market',
          distance: '1.0 miles',
          description: 'Handmade crafts and local products',
          hours: 'Weekends only',
        },
      ],
    },
    {
      category: 'Entertainment',
      icon: '🎪',
      items: [
        {
          name: 'Grand Theater',
          distance: '1.3 miles',
          description: 'Live performances and shows',
          note: 'Check schedule at reception',
        },
        {
          name: 'Cinema Complex',
          distance: '0.9 miles',
          description: 'Latest movies in 4K',
          note: 'Student discounts available',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {activities.map((category, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryTitle}>{category.category}</Text>
          </View>
          
          {category.items.map((item, itemIndex) => (
            <TouchableOpacity key={itemIndex} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityName}>{item.name}</Text>
                <Text style={styles.distance}>{item.distance}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              {item.rating && <Text style={styles.rating}>{item.rating}</Text>}
              {item.hours && <Text style={styles.hours}>Hours: {item.hours}</Text>}
              {item.note && <Text style={styles.note}>{item.note}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Need Transportation?</Text>
        <View style={styles.transportCard}>
          <Text style={styles.transportOption}>🚕 Taxi: Call +1 555-TAXI</Text>
          <Text style={styles.transportOption}>🚌 Bus Stop: 200m from hotel</Text>
          <Text style={styles.transportOption}>🚗 Car Rental: Available at reception</Text>
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
    paddingBottom: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a5f3f',
  },
  activityCard: {
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  activityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginTop: 5,
  },
  hours: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  note: {
    fontSize: 12,
    color: '#1a5f3f',
    fontStyle: 'italic',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    backgroundColor: '#e8f3ef',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a5f3f',
    marginBottom: 10,
  },
  transportCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  transportOption: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default ActivitiesScreen;