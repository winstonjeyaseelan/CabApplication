// src/screens/CabsListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Cab } from './types';

const CabsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const cabsRef = ref(db, 'cabs');
    const unsubscribe = onValue(cabsRef, snapshot => {
      const data = snapshot.val();
      const cabList: Cab[] = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setCabs(cabList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CabDetail', { cab: item })}
          >
            <Text style={styles.title}>{item.companyName}</Text>
            <Text>{item.carModel}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CabsListScreen;
