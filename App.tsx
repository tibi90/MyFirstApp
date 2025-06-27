import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

function App(): JSX.Element {
  React.useEffect(() => {
    console.log('MyFirstApp started!');
    console.log('Current time:', new Date().toISOString());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Hello World!</Text>
        <Text style={styles.subtitle}>MyFirstApp is running</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});

export default App;