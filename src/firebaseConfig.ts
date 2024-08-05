// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDc9MIxhcXYB8HX1TgMoj6mb95-TrzJRbs',
  authDomain: 'cabapp-b20ee.firebaseapp.com',
  projectId: 'cabapp-b20ee',
  storageBucket: 'cabapp-b20ee.appspot.com',
  messagingSenderId: '647783857048',
  appId: '1:647783857048:web:d08d565eb1cf4dc6a8c9ed',
  measurementId: 'G-JQXQH9VSDY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

export { database, ref, push, set, get };
