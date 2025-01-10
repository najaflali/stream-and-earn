// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmn_a4P1Zw1FUf8ByBAw4yH-vuGHtBLFs",
  authDomain: "streamandearn.firebaseapp.com",
  databaseURL: "https://streamandearn-default-rtdb.firebaseio.com/",
  projectId: "streamandearn",
  storageBucket: "streamandearn.appspot.com",
  messagingSenderId: "276919948850",
  appId: "1:276919948850:web:1dc74994262b2ef9e54e2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Function to update user details on the dashboard
function updateDashboard(user) {
  document.getElementById("username").textContent = user.displayName || "Anonymous";
  document.getElementById("email").textContent = user.email;

  const userDoc = doc(firestore, "users", user.uid);
  getDoc(userDoc)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("earnings").textContent = `$${userData.earnings || "0.00"}`;
      } else {
        document.getElementById("earnings").textContent = "$0.00";
      }
    })
    .catch((error) => {
      alert("Error fetching user data: " + error.message);
    });
}

// Check user authentication state
onAuthStateChanged(auth, (user) => {
  document.getElementById("loading").style.display = "none";
  if (user) {
    updateDashboard(user);
  } else {
    window.location.href = "login.html";
  }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error logging out: " + error.message);
    });
});

// Navigation functionality
function navigateTo(page) {
  try {
    window.location.href = page;
  } catch (error) {
    alert("Navigation error: " + error.message);
  }
}

// Attach navigation function to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const targetPage = event.target.getAttribute("onclick").match(/'(.+)'/)[1];
    navigateTo(targetPage);
  });
});
