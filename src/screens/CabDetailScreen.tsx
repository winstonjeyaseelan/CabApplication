// src/screens/CabDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { database, ref, push, set, get } from '../firebaseConfig';
import { Cab } from './types';

const CabDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { cab } = route.params;
  const [booked, setBooked] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    // Function to check the number of bookings for the current user
    const checkBookingCount = async () => {
      const userId = 'user1'; // Replace with dynamic user ID if applicable
      const bookingsRef = ref(database, `users/${userId}/bookings`);

      try {
        const snapshot = await get(bookingsRef);
        const data = snapshot.val();
        const bookings = data ? Object.values(data) : [];
        setBookingCount(bookings.length);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    checkBookingCount();
  }, []);

  const bookCab = async () => {
    if (bookingCount >= 2) {
      Alert.alert('Booking Limit Exceeded', 'You cannot book more than 2 cabs at a time.');
      return;
    }

    const userId = 'user1'; // Replace with dynamic user ID if applicable
    const bookingRef = ref(database, `users/${userId}/bookings`);
    const newBookingRef = push(bookingRef);

    try {
      await set(newBookingRef, cab);
      setBooked(true);
      setBookingCount(bookingCount + 1);
      Alert.alert('Booking Confirmed', 'Your cab has been booked.');
    } catch (error) {
      Alert.alert('Booking Error', 'There was an error booking the cab.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company: {cab.companyName}</Text>
      <Text>Model: {cab.carModel}</Text>
      <Text>Passengers: {cab.passengerCapacity}</Text>
      <Text>Rating: {cab.rating}</Text>
      <Text>Cost/hour: {cab.costPerHour}</Text>
      <Button
        title={booked ? 'Already Booked' : 'Book Cab'}
        onPress={bookCab}
        disabled={booked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CabDetailScreen;
