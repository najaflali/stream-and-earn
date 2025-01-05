// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj43pdPs0Yo5NpTJFQju4nrOjm6mYgNQU",
    authDomain: "streamandearn1.firebaseapp.com",
    projectId: "streamandearn1",
    storageBucket: "streamandearn1.firebasestorage.app",
    messagingSenderId: "824833347843",
    appId: "1:824833347843:web:cddd5b23134a641d941936"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Common functions
function redirectIfNotLoggedIn() {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'login.html';
        }
    });
}

function updateUserDetails(user) {
    if (user) {
        document.getElementById('username').textContent = user.displayName || 'Anonymous';
        document.getElementById('email').textContent = user.email;

        firestore.collection('users').doc(user.uid).get().then((doc) => {
            const userData = doc.data();
            document.getElementById('earnings').textContent = `$${userData?.earnings || '0.00'}`;
        }).catch((error) => {
            console.error('Error fetching user data: ', error);
        });
    }
}

// Page-specific logic
const path = window.location.pathname;

if (path === '/index.html') {
    // Logic for index.html
    console.log('Index page script running');
} else if (path === '/dashboard.html') {
    // Code for dashboard.html
    redirectIfNotLoggedIn();
    auth.onAuthStateChanged((user) => {
        if (user) {
            updateUserDetails(user);
        }
    });

    document.getElementById('logout').addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = 'login.html';
        });
    });
} else if (path === '/upload.html') {
    // Code for upload.html
    redirectIfNotLoggedIn();

    document.getElementById('uploadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');
        const title = document.getElementById('title').value;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const storageRef = firebase.storage().ref(`uploads/${file.name}`);

            storageRef.put(file).then(() => {
                alert('File uploaded successfully!');
            }).catch((error) => {
                alert('Error uploading file: ' + error.message);
            });
        } else {
            alert('Please select a file to upload.');
        }
    });
} else if (path === '/login.html') {
    // Code for login.html
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
} else if (path === '/register.html') {
    // Code for register.html
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return firestore.collection('users').doc(user.uid).set({
                    username: user.email.split('@')[0],
                    email: user.email,
                    earnings: 0,
                    uid: user.uid
                });
            })
            .then(() => {
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
}
