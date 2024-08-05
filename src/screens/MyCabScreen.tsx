import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { database } from "../firebaseConfig";
import { Cab } from "./types";

interface Booking {
  id: string;
  cab: Cab;
}

const MyCabScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const userId = "user1";
    const bookingsRef = ref(db, `users/${userId}/bookings`);

    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase data to Booking[]
        const bookingList: Booking[] = Object.entries(data).map(([id, cab]) => ({
          id,
          cab: cab as Cab, // Type assertion
        }));
        setBookings(bookingList);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const cancelBooking = async (bookingId: string) => {
    const userId = "user1";
    const bookingRef = ref(database, `users/${userId}/bookings/${bookingId}`);

    try {
      await remove(bookingRef);
      Alert.alert("Booking Canceled", "Your cab booking has been canceled.");
    } catch (error) {
      console.error("Cancellation Error:", error); // For debugging
      Alert.alert("Cancellation Error", "There was an error canceling your booking.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id} // Use the unique ID
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.cab.companyName}</Text>
            <Text>{item.cab.carModel}</Text>
            <Button
              title="Cancel Booking"
              onPress={() => cancelBooking(item.id)}
            />
          </View>
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
    backgroundColor: "#fff",
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyCabScreen;
