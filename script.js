// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDj43pdPs0Yo5NpTJFQju4nrOjm6mYgNQU",
  authDomain: "streamandearn1.firebaseapp.com",
  databaseURL: "https://streamandearn1-default-rtdb.firebaseio.com",
  projectId: "streamandearn1",
  storageBucket: "streamandearn1.firebasestorage.app",
  messagingSenderId: "824833347843",
  appId: "1:824833347843:web:cddd5b23134a641d941936"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Firebase Authentication State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in as:", user.email);
    } else {
        console.log("No user is logged in.");
    }
});

// Ensure Firebase is initialized
console.log("Firebase Initialized:", app ? "Yes" : "No");

// Example Register Form Submission Listener (Adjust ID if needed)
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Register form submitted");
    // Add form handling code here
});
