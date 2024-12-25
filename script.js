// script.js
document.addEventListener('DOMContentLoaded', function() {
    const cumulativeToncoinDisplay = document.getElementById('cumulative-toncoin');
    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById('mining-status');
    const toncoinCount = document.getElementById('toncoin-count');
    const friendsButton = document.getElementById('friends-button');
    const supportButton = document.getElementById('support-button');
    const fetchRateButton = document.getElementById('fetch-rate-button');
    const exchangeRate = document.getElementById('exchange-rate');
    const cryptoRecommendationsButton = document.getElementById('crypto-recommendations-button');
    const cryptoRecommendations = document.getElementById('crypto-recommendations');
    const miningSound = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3'); // Default beep sound
    let toncoin = 0;
    let cumulativeToncoin = 0;
    let mining = false;
    const referralLink = 'https://www.example.com/referral-link'; // Replace this with your actual referral link

    mineButton.addEventListener('click', function() {
        if (!mining) {
            mining = true;
            miningSound.play(); // Play the sound
            setTimeout(() => {
                miningSound.pause();
                miningSound.currentTime = 0;
            }, 1000); // Stop the sound after 1 second
            miningStatus.textContent = 'Mining...';
            mineButton.textContent = 'Mining Started'; // Change button text immediately
            setInterval(() => {
                toncoin += 0.0000005;
                cumulativeToncoin += 0.0000005;
                toncoinCount.textContent = `${toncoin.toFixed(7)} TON`;
                cumulativeToncoinDisplay.textContent = `Cumulative TON: ${cumulativeToncoin.toFixed(7)} TON`;
            }, 100); // Adjusted interval to 100 milliseconds
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

    cryptoRecommendationsButton.addEventListener('click', function() {
        if (cryptoRecommendations.style.display === 'none') {
            cryptoRecommendations.style.display = 'block';
        } else {
            cryptoRecommendations.style.display = 'none';
        }
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

    function showDescription(coinName) {
        fetch(`https://api.example.com/getCoinDescription?coinName=${coinName}`)
            .then(response => response.json())
            .then(data => {
                const descriptionContainer = document.createElement('div');
                descriptionContainer.textContent = data.description;
                cryptoRecommendations.appendChild(descriptionContainer);
            })
            .catch(error => console.error('Error fetching coin description:', error));
    }

    updateLeaderboard();
});
