import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBRa2avrSBWEmfrSviY-WDsu0NkO5E1Vhw",
  authDomain: "valor-eco.firebaseapp.com",
  projectId: "valor-eco",
  storageBucket: "valor-eco.firebasestorage.app",
  messagingSenderId: "548297715892",
  appId: "1:548297715892:web:243198c5b3b0ef5a8ae7e1",
  measurementId: "G-CCCZHBTL4J"
};

const app = initializeApp(firebaseConfig);

// Substitua o getAuth() por isso:
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
