import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, get, child, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration and initialization
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
    const settingsButton = document.getElementById('settings-button');
    const settingsSection = document.getElementById('settings-section');
    const usernameSettings = document.getElementById('username-settings');
    const phoneSettings = document.getElementById('phone-settings');
    const saveSettingsButton = document.getElementById('save-settings-button');
    const friendsList = document.getElementById('friends-list');

    // Sign Up event listener
    signUpButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Sign Up Successful!');
                authSection.style.display = 'none';
                minerSection.style.display = 'block';
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // Log In event listener
    logInButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Log In Successful!');
                authSection.style.display = 'none';
                minerSection.style.display = 'block';
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // Display settings section
    settingsButton.addEventListener('click', () => {
        settingsSection.style.display = 'block';
    });

    // Save settings event listener
    saveSettingsButton.addEventListener('click', () => {
        const userId = auth.currentUser.uid;
        const username = usernameSettings.value;
        const phoneNumber = phoneSettings.value;
        update(ref(db, 'users/' + userId), {
            username: username,
            phoneNumber: phoneNumber
        }).then(() => {
            alert('Username and Phone Number updated successfully!');
        }).catch((error) => {
            alert(error.message);
        });
    });

    // Authentication state change listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            localStorage.setItem('userId', userId);
            const email = user.email;

            // Check for referrer and update referral info
            const urlParams = new URLSearchParams(window.location.search);
            const referrerId = urlParams.get('ref');
            if (referrerId && referrerId !== userId) {
                get(child(ref(db), `users/${referrerId}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const referrerEmail = snapshot.val().email;
                        const referrerUsername = snapshot.val().username;
                        push(ref(db, 'users/' + referrerId + '/friends'), { userId: userId, email: email });
                        const referralCountRef = ref(db, 'users/' + referrerId + '/referralCount');
                        get(referralCountRef).then((snapshot) => {
                            let referralCount = snapshot.exists() ? snapshot.val() : 0;
                            set(referralCountRef, referralCount + 1);
                        });
                        alert(`You have been referred by ${referrerUsername || referrerEmail}`);
                    }
                }).catch((error) => console.error(`Failed to get referrer data: ${error}`));
            }

            // Retrieve and display friends list
            onValue(ref(db, 'users/' + userId + '/friends'), (snapshot) => {
                const friends = snapshot.val();
                let friendsContent = '<h3>My Friends</h3><ul>';
                let friendsCount = 0;
                for (let key in friends) {
                    if (friends.hasOwnProperty(key)) {
                        friendsCount++;
                        friendsContent += `<li>${friends[key].username || friends[key].email}</li>`;
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

    // Mining button event listener
    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById('mining-status');
    const toncoinCount = document.getElementById('toncoin-count');
    let toncoin = parseFloat(localStorage.getItem('toncoin')) || 0;
    let mining = false;
    toncoinCount.textContent = `${toncoin.toFixed(7)} TON`;
    mineButton.addEventListener('click', function() {
        if (!mining) {
            mining = true;
            alert('Mining started!');
            setTimeout(() => {
                miningStatus.textContent = 'Mining...';
                mineButton.textContent = 'Mining Started';
                setInterval(() => {
                    toncoin += 0.0000005;
                    toncoinCount.textContent = `${toncoin.toFixed(7)} TON`;
                    localStorage.setItem('toncoin', toncoin);
                }, 100);
            }, 5000);
        }
    });

    // Friends button event listener
    const friendsButton = document.getElementById('friends-button');
    friendsButton.addEventListener('click', function() {
        const userId = localStorage.getItem('userId');
        const referralLink = `${window.location.origin}${window.location.pathname}?ref=${userId}`;
        const message = encodeURIComponent("Check out this Ton miner!");
        const whatsappLink = `https://api.whatsapp.com/send?text=${message}%20${encodeURIComponent(referralLink)}`;
        const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        const telegramLink = `https://telegram.me/share/url?url=${encodeURIComponent(referralLink)}&text=${message}`;
        const shareOptions = `
            <div>
                <a href="${whatsappLink}" target="_blank">Share on WhatsApp</a><br>
                <a href="${facebookLink}" target="_blank">Share on Facebook</a><br>
                <a href="${telegramLink}" target="_blank">Share on Telegram</a>
            </div>
        `;
        const shareWindow = window.open("", "Share", "width=400,height=200");
        shareWindow.document.write(shareOptions);
    });

    // Support button event listener
    const supportButton = document.getElementById('support-button');
    supportButton.addEventListener('click', function() {
        const whatsappLink = `https://wa.me/256785141907`;
        window.open(whatsappLink, '_blank');
    });
});
