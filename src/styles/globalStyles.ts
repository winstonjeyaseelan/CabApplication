// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
});

export default globalStyles;
