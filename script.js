// script.js
document.addEventListener('DOMContentLoaded', function() {
    const emailSection = document.getElementById('email-section');
    const emailInput = document.getElementById('email');
    const saveEmailButton = document.getElementById('save-email-button');
    const cumulativeToncoinDisplay = document.getElementById('cumulative-toncoin');
    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById('mining-status');
    const toncoinCount = document.getElementById('toncoin-count');
    const friendsButton = document.getElementById('friends-button');
    const supportButton = document.getElementById('support-button');
    const fetchRateButton = document.getElementById('fetch-rate-button');
    const exchangeRate = document.getElementById('exchange-rate');
    const miningSound = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3'); // Default beep sound
    let toncoin = 0;
    let cumulativeToncoin = 0;
    let mining = false;
    const referralLink = 'https://www.example.com/referral-link'; // Replace this with your actual referral link

    saveEmailButton.addEventListener('click', function() {
        const email = emailInput.value;
        if (validateEmail(email)) {
            emailSection.style.display = 'none';
            cumulativeToncoinDisplay.style.display = 'block';
            alert('Email saved successfully!');
        } else {
            alert('Please enter a valid email address.');
        }
    });

    mineButton.addEventListener('click', function() {
        if (!mining) {
            mining = true;
            miningSound.play(); // Play the sound
            setTimeout(() => {
                miningSound.pause();
                miningSound.currentTime = 0;
            }, 1000); // Stop the sound after 1 second
            alert('Mining started!');
            createBubbles(); // Create bubbles
            setTimeout(() => {
                miningStatus.textContent = 'Mining...';
                mineButton.textContent = 'Mining Started'; // Change button text after 5 seconds
                setInterval(() => {
                    toncoin += 0.0000005;
                    cumulativeToncoin += 0.0000005;
                    toncoinCount.textContent = `${toncoin.toFixed(7)} TON`;
                    cumulativeToncoinDisplay.textContent = `Cumulative TON: ${cumulativeToncoin.toFixed(7)} TON`;
                }, 100); // Adjusted interval to 100 milliseconds
            }, 5000); // Change text after 5 seconds
        }
    });

    friendsButton.addEventListener('click', function() {
        const url = encodeURIComponent(referralLink);
        const message = encodeURIComponent("Check out this Ton miner!");

        const whatsappLink = `https://api.whatsapp.com/send?text=${message}%20${url}`;
        const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        const telegramLink = `https://telegram.me/share/url?url=${url}&text=${message}`;

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
        alert('Prof. Bruno is around');
    });

    fetchRateButton.addEventListener('click', function() {
        fetch('https://api.example.com/getTonExchangeRate') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                exchangeRate.textContent = `Exchange Rate: ${data.rate} TON/USD`;
            })
            .catch(error => console.error('Error fetching exchange rate:', error));
    });

    function createBubbles() {
        const bubblesContainer = document.getElementById('bubbles-container');
        for (let i = 0; i < 10; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.left = `${Math.random() * 100}%`;
            bubblesContainer.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, 3000); // Remove bubble after 3 seconds
        }
    }

    function updateLeaderboard() {
        const topMinersList = document.getElementById('top-miners-list');
        const topMiners = [
            { name: 'Alice', toncoin: 100 },
            { name: 'Bob', toncoin: 75 },
            { name: 'Charlie', toncoin: 50 }
        ];

        topMinersList.innerHTML = '';
        topMiners.forEach(miner => {
            const li = document.createElement('li');
            li.textContent = `${miner.name}: ${miner.toncoin} TON`;
            topMinersList.appendChild(li);
        });
    }

    updateLeaderboard();

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
