// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebaseA.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuUTjGO3Of0Gxg4jmxsBYCUOXwbuZcEtw",
  authDomain: "login-form-1d57b.firebaseapp.com",
  projectId: "login-form-1d57b",
  storageBucket: "login-form-1d57b.appspot.com", // Corrected storageBucket
  messagingSenderId: "1025555037575",
  appId: "1:1025555037575:web:18eab285d362d6f3d22722",
  measurementId: "G-RG4HXKZ19E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth

// Registration function
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Registration successful:", userCredential.user);
      alert("Registration successful! Please log in.");
      // Change this to redirect to login page
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      alert("Registration failed: " + error.message);
    });
}

// Login function
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      alert("Login successful! Redirecting to main website...");
      window.location.href = "index.html"; // Redirect to main website
    })
    .catch((error) => {
      console.error("Error during login:", error);
      alert("Login failed: " + error.message);
    });
}
