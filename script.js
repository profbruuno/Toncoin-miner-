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
    const cryptoList = document.getElementById('crypto-list');
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

    cryptoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('crypto-item')) {
            const coinName = event.target.getAttribute('data-coin');
            showDescription(coinName);
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
        const descriptions = {
            Dogecoin: `<span style="color: black;">What is Dogecoin (DOGE)
Dogecoin (DOGE) is a decentralized, open-source cryptocurrency that facilitates peer-to-peer digital transactions using its blockchain network. It was developed by software engineers Jackson Palmer and Billy Markus, debuting in December 2013. Initially a hard fork from the defunct Luckycoin, which itself branched from Litecoin (LTC), Dogecoin is effectively a third-generation fork. Despite its origins as a playful "joke coin," Dogecoin quickly gained traction and developed a dedicated community. Operating without a CEO or formal governing body, Dogecoin's momentum is largely propelled by its passionate user base. Transitioning from meme status, Dogecoin has risen to prominence in the crypto world, boasting a significant market capitalization and a remarkable 5000% return in 2021. It has garnered a wide user base and high-profile endorsements, including those from celebrities like Elon Musk and Snoop Dogg.

How does Dogecoin (DOGE) work?
Dogecoin, a derivative of Bitcoin's code, was originally a hard fork of Luckycoin, which itself branched off from Litecoin (LTC). Litecoin is noted as the first major hard fork of Bitcoin. Adopting Litecoin's Scrypt-based consensus mechanism, Dogecoin shares many features with Bitcoin and its offshoots. This choice of Scrypt for its Proof-of-Work (POW) algorithm means Dogecoin mining doesn't rely on ASICs, which are common in Bitcoin mining.

In the Dogecoin blockchain, like Bitcoin, network users contribute computing power to maintain the network, create new blocks, and validate transactions. However, Dogecoin's streamlined architecture allows for faster transaction processing compared to Bitcoin. Miners use their computational resources to create new blocks and confirm transactions by solving complex equations. Each new block rewards miners with 10,000 DOGE. Initially, creators Jackson Palmer and Billy Markus set Dogecoin's cap at 100 billion DOGE, but this limit was removed a few months post-launch. As a result, Dogecoin now has an inflationary model, introducing 5 billion new DOGE annually.

History of Dogecoin (DOGE)
Dogecoin, established as a joke at the end of 2013, was created by software developers Billy Markus and Jackson Palmer, friends on Reddit who had never met in person. Markus had worked at IBM, while Palmer was a software engineer at Adobe. Together, they shared a vision to develop a cryptocurrency that was both fun and easy to use, distinct from traditional banking systems, and offering nearly zero-fee instant transactions. They combined two popular themes from their online community at the time: the emerging cryptocurrency Bitcoin and a meme featuring a Shiba Inu with a misspelled version of the word "dog."

The story of Dogecoin began with the idea of creating a cryptocurrency more suitable for a wider audience than Bitcoin. The first step was Palmer's purchase of the Dogecoin.com domain and the establishment of the project's official website. To the creators' surprise, Dogecoin was almost immediately well-received, with dogecoin.com attracting over a million visitors in its first month.

Despite the successful launch of DOGE, neither Palmer nor Markus assumed the CEO role, highlighting the vital role of the Dogecoin community in the network's development. This was particularly evident in events such as the fundraising campaign to compensate for the millions of Dogecoins stolen in a hack attack on the now-defunct Dogewallet project, showcasing the community's remarkable spirit of unity.

Tokenomics
Token Circulation
Originally, Dogecoin was designed with a cap of 100 billion in total supply. However, shortly after DOGE's initial launch, its creators revised its monetary policy, eliminating this cap and establishing an unlimited, inflationary supply.

Projections suggest that the circulating supply of Dogecoin will double in approximately 26 years. As of now, there's no set upper limit to its total supply. New blocks on the Dogecoin blockchain are created about every minute, with each mining process rewarding 10,000 DOGE.

Why Is Dogecoin (DOGE) Valuable?
Dogecoin stands out with its marketing strategy, positioning itself as a fun and friendly digital currency for the internet. Launched in 2013 as what many saw as a "joke coin," it quickly amassed millions of followers in its first month alone.

In contrast to many cryptocurrencies and digital assets marketed as serious and revolutionary blockchain ventures, Dogecoin opted for a more relaxed image. Yet, it still boasts appealing features like minimal transaction fees, quick transfers, a vibrant and easygoing community, and a non-aggressive mining environment. Despite sharing technical similarities with Litecoin and Bitcoin, Dogecoin's distinctive approach has carved out its niche as a user-friendly online currency, ideal for small-scale transactions and appealing to social media users, content creators, and merchants. The market value of Dogecoin is shaped by the interplay of buying and selling activities, setting its price. A significant part of its value stems from its robust and supportive community and its unique positioning as a cryptocurrency tailored for internet transactions.

Dogecoin's value can also spike with high-profile endorsements, such as Elon Musk's tweets praising DOGE as one of the most intriguing digital assets, which led to a significant surge in its price, or as investors say, it went “to the moon.”

The valuation of Dogecoin and its price also mirror broader global trends influencing the overall momentum of the cryptocurrency market. The price of DOGE may fluctuate in line with these trends, often influenced by Bitcoin, the market's most dominant cryptocurrency. Additionally, the practical use of DOGE, primarily as a tool for social media incentives, tipping content creators, and facilitating small transactions with negligible fees, also contributes to its market value.</span>`,
            Bitcoin: `<span style="color: red;">Your long description for Bitcoin here...</span>`,
            Notcoin: `<span style="color: red;">Your long description for Notcoin here...</span>`,
            Others: `<span style="color: red;">Your long description for Others here...</span>`
        };

        const descriptionWindow = window.open("", "_blank");
        descriptionWindow.document.write(`
            <html>
            <head>
                <title>${coinName} Description</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 20px;
                        background-color: #f9f9f9;
                        color: #333;
                    }
                    h1 {
                        color: #ff4500;
                    }
                    pre {
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        background-color: #fff;
                        padding: 1em;
                        border-radius: 5px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body>
                <h1>${coinName} Description</h1>
                <pre>${descriptions[coinName]}</pre>
            </body>
            </html>
        `);
    }

    updateLeaderboard();
});
