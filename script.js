import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, get, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
    const usernameInput = document.getElementById('username-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const signUpButton = document.getElementById('sign-up-button');
    const logInButton = document.getElementById('log-in-button');
    const authSection = document.getElementById('auth-section');
    const minerSection = document.getElementById('miner-section');
    const friendsList = document.getElementById('friends-list');

    signUpButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert('Sign Up Successful!');
                authSection.style.display = 'none';
                minerSection.style.display = 'block';

                // Save username and email to the database
                set(ref(db, 'users/' + user.uid), {
                    username: username,
                    email: email
                });
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
                const user = userCredential.user;
                alert('Log In Successful!');
                authSection.style.display = 'none';
                minerSection.style.display = 'block';
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            localStorage.setItem('userId', userId);
            const email = user.email;

            const urlParams = new URLSearchParams(window.location.search);
            const referrerId = urlParams.get('ref');

            if (referrerId && referrerId !== userId) {
                // Retrieve the referrer's email address and username from the database
                get(child(ref(db), `users/${referrerId}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const referrerEmail = snapshot.val().email;
                        const referrerUsername = snapshot.val().username;

                        // Add current user to the referrer's friend list
                        push(ref(db, 'users/' + referrerId + '/friends'), {
                            userId: userId,
                            username: usernameInput.value,
                            email: email
                        });

                        // Increment referral count
                        const referralCountRef = ref(db, 'users/' + referrerId + '/referralCount');
                        get(referralCountRef).then((snapshot) => {
                            let referralCount = snapshot.exists() ? snapshot.val() : 0;
                            set(referralCountRef, referralCount + 1);
                        });

                        alert(`You have been referred by ${referrerUsername || referrerEmail}`);
                    } else {
                        console.log('No data available for the referrer');
                    }
                }).catch((error) => {
                    console.error(`Failed to get referrer data: ${error}`);
                });
            }

            // Retrieve and display friends list
            onValue(ref(db, 'users/' + userId + '/friends'), (snapshot) => {
                const friends = snapshot.val();
                let friendsContent = '<h3>My Friends</h3><ul>';
                let friendsCount = 0;

                for (let key in friends) {
                    if (friends.hasOwnProperty(key)) {
                        friendsCount++;
                        friendsContent += `<li>${friends[key].username} (${friends[key].email})</li>`;
                    }
                }

                friendsContent += `</ul><p>Total Friends: ${friendsCount}</p>`;
                friendsList.innerHTML = friendsContent;
                friendsList.style.display = 'block';
            });
        } else {
            authSection.style.display = 'block';
            minerSection.style.display = 'none';
        }
    });

    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/antydemant/lessons-2020/tree/0c6095f45bfd841914ac8e7e25f8c9df273dea69/02-closure-and-context%2Fhomework%2FREADME.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")
