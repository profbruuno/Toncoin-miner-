import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

    signUpButton.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
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

            // Debugging: Logging to ensure values are correct
            console.log(`User logged in: ${userId}, ${email}`);

            // Update the user's email in the database
            set(ref(db, 'users/' + userId), {
                email: email
            }).then(() => {
                console.log(`User email recorded: ${email}`);
            }).catch((error) => {
                console.error(`Failed to record user email: ${error}`);
            });

            const urlParams = new URLSearchParams(window.location.search);
            const referrerId = urlParams.get('ref');

            if (referrerId && referrerId !== userId) {
                // Debugging: Logging referral information
                console.log(`User referred by: ${referrerId}`);

                // Add current user to the referrer's friend list
                push(ref(db, 'users/' + referrerId + '/friends'), {
                    userId: userId,
                    email: email
                }).then(() => {
                    console.log(`Referral recorded: ${userId} referred by ${referrerId}`);
                }).catch((error) => {
                    console.error(`Failed to record referral: ${error}`);
                });

                alert('You have been referred by ' + referrerId);
            }

            // Retrieve and display friends list
            onValue(ref(db, 'users/' + userId + '/friends'), (snapshot) => {
                const friends = snapshot.val();
                let friendsContent = '<h3>My Friends</h3><ul>';
                let friendsCount = 0;

                for (let key in friends) {
                    if (friends.hasOwnProperty(key)) {
                        friendsCount++;
                        friendsContent += `<li>${friends[key].email}</li>`;
                    }
                }

                friendsContent += `</ul><p>Total Friends: ${friendsCount}</p>`;
                friendsList.innerHTML = friendsContent;
                friendsList.style.display = 'block';

                // Debugging: Log friends count
                console.log(`Total friends: ${friendsCount}`);
            }, (error) => {
                console.error(`Failed to retrieve friends list: ${error}`);
            });
        } else {
            authSection.style.display = 'block';
            minerSection.style.display = 'none';
        }
    });

    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById('mining-status');
    const toncoinCount = document.getElementById('toncoin-count');
    const friendsButton = document.getElementById('friends-button');
    const supportButton = document.getElementById('support-button');
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

    supportButton.addEventListener('click', function() {
        const whatsappLink = `https://wa.me/256785141907`;
        window.open(whatsappLink, '_blank');
    });
});
