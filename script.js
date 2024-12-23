import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, get, child, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCetRQqTMEVaoNjMZal8c02OzwtR6QqbPw",
    authDomain: "tonminer-5f14c.firebaseapp.com",
    projectId: "tonminer-5f14c",
    storageBucket: "tonminer-5f14c.firebasestorage.app",
    messagingSenderId: "313508121395",
    appId: "1:313508121395:web:679ca9cf1148e9471b8c46",
    measurementId: "G-EGBCB1L7PR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const signUpButton = document.getElementById('sign-up-button');
    const logInButton = document.getElementById('log-in-button');
    const authSection = document.getElementById('auth-section');
    const minerSection = document.getElementById('miner-section');
    const friendsList = document.getElementById('friends-list');
    const usernameUpdate = document.getElementById('username-update');
    const phoneUpdate = document.getElementById('phone-update');
    const saveSettingsButton = document.getElementById('save-settings-button');

    signUpButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Sign Up Successful!');
                authSection.style.display = 'none';
                minerSection.style.display = 'block';
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    logInButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Log In Successful!');
                authSection.style.display = 'none';
                minerSection.style.display = 'block';
            })
            .catch((error) => {
