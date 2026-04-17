// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1sqxqK5LZnW1j5UHup6jlcqAYIYUWhRk",
  authDomain: "car-doctor-genius-8d989.firebaseapp.com",
  projectId: "car-doctor-genius-8d989",
  storageBucket: "car-doctor-genius-8d989.firebasestorage.app",
  messagingSenderId: "443352763791",
  appId: "1:443352763791:web:47db02d5db97c36dfdcffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth 