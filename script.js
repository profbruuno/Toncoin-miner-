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

    // Ensure mining counts properly
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

    // Ensure recommendations are displayed correctly
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

    // Description Page
    function showDescription(coinName) {
        const descriptions = {
            Dogecoin: `What is Dogecoin (DOGE)
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

The valuation of Dogecoin and its price also mirror broader global trends influencing the overall momentum of the cryptocurrency market. The price of DOGE may fluctuate in line with these trends, often influenced by Bitcoin, the market's most dominant cryptocurrency. Additionally, the practical use of DOGE, primarily as a tool for social media incentives, tipping content creators, and facilitating small transactions with negligible fees, also contributes to its market value.     ...`,
            Bitcoin: `What is Bitcoin (BTC)?
Bitcoin is the world's first and currently the largest cryptocurrency in terms of market capitalization. It was proposed by Satoshi Nakamoto in 2008, marking the birth of digital currency and blockchain technology.

As a peer-to-peer electronic payment system, Bitcoin achieves decentralization and operates independently of government or financial institutions. All transactions are transparently recorded on the blockchain, a public distributed ledger. Bitcoin allows for easy transfers between participating users without the need for any intermediaries.

The total supply of Bitcoin is capped at 21 million, giving it scarcity similar to precious metals like gold. New Bitcoins are generated through a process in which miners use computers to engage in complex computations and maintain network security.

As a digital store of value and a medium of exchange, Bitcoin has garnered significant interest from both individual and institutional investors. Over 15,000 businesses worldwide accept Bitcoin as a payment method. While Bitcoin's price has experienced significant fluctuations, it has remained one of the best-performing financial assets in the global market for many years.

Despite its enduring dominance, Bitcoin faces regulatory challenges, including issues related to anonymity and bans in some countries. Nevertheless, as a pioneer of digital currencies, Bitcoin has a revolutionary impact on decentralization and democratization of the financial system. It has inspired and spawned thousands of other cryptocurrencies and driven the continuous application of blockchain technology across various sectors, profoundly influencing the development of the digital economy.

History of Bitcoin (BTC)
Who Created Bitcoin?
In October 2008, an anonymous individual or organization, against the backdrop of the global financial crisis, published the groundbreaking Bitcoin whitepaper, introducing the concept of a decentralized peer-to-peer electronic currency system. This person is known as Satoshi Nakamoto, but his/their true identity remains a mystery to this day.

In January 2009, Nakamoto mined the genesis block on the Bitcoin network, officially launching the world's first cryptocurrency - Bitcoin. Bitcoin initially had no monetary value and was primarily obtained through individual computer mining. As Bitcoin gradually grew, its price began to rise, and the first commercial Bitcoin transaction occurred in 2010.

After the birth of Bitcoin, Nakamoto transferred control of the network to core developers, and the Bitcoin code continued to be enhanced by numerous developers. However, Nakamoto's personal information remains concealed in mystery, mirroring the decentralized and open nature of Bitcoin.

History
In 2008, Satoshi Nakamoto introduced the concept of decentralized cryptocurrency - Bitcoin and the underlying blockchain technology.
In January 2009, Nakamoto mined the genesis block, marking the official birth of Bitcoin.
In 2010, the world's first Bitcoin exchange, Bitcoin Market, was established, allowing people to exchange fiat currency for Bitcoin, and Bitcoin entered the phase of practical transactions.
Starting in 2011, the price of Bitcoin began to fluctuate and rise, bringing the concept of cryptocurrencies into the public eye.
In 2013 and 2017, Bitcoin's price reached historical highs, sparking a cryptocurrency craze and leading to the emergence of many new digital assets. However, in 2018, Bitcoin experienced a significant downturn, and the cryptocurrency market underwent a correction.
In 2021, Bitcoin's price once again surged to historic highs, attracting the attention of many institutional investors. However, cryptocurrency platform security incidents in 2022 led to a significant drop in the price of Bitcoin.
How Does Bitcoin Work?
Bitcoin, as a digital currency, is highly regarded for its decentralized, transparent, and secure nature. The following will explore how Bitcoin works and facilitates transactions while ensuring security.

Blockchain Technology
The Bitcoin network operates using blockchain technology. A blockchain is a continuously growing public distributed ledger that records all Bitcoin transactions. It is composed of a series of blocks, with each block containing the encrypted hash of the previous block, a timestamp, and transaction data. Bitcoin nodes use the blockchain to verify the legitimacy of transactions and prevent double spending.

Decentralized Nature
Bitcoin is designed to resist censorship. All Bitcoin transactions are recorded on the public blockchain, enhancing transparency and preventing any single entity from controlling the network. This makes it difficult for governments or financial institutions to control or interfere with the Bitcoin network and its transactions.

Mining and Proof of Work
New Bitcoins are generated through the process of mining. Mining is the process of verifying and recording transactions and requires solving complex mathematical puzzles, known as proof of work. Miners can add transactions to the blockchain and earn Bitcoin rewards only if they can solve this puzzle. This incentive encourages people to participate in mining and ensures the predictable and fair creation of new Bitcoins.

What is Bitcoin mining?
Let's compare Bitcoin to a commercial bank, which is a centralized system. In the case where Alice wants to make a transaction with Bob, the bank is the entity that holds the ledger of Alice and Bob's balances. Since the bank maintains this ledger, it will verify if Alice has sufficient funds to pay Bob. Ultimately, when the transaction is successful, the bank deducts the funds from Alice's account and updates Bob's account with the new amount.

In contrast, Bitcoin operates in a decentralized manner. As there is no central authority, such as a bank, to validate transactions and maintain the ledger, copies of the ledger are distributed across countless Bitcoin nodes. Anyone can download the data from nodes and run nodes to participate in the Bitcoin network. Therefore, everyone participating in the network has a copy of Alice and Bob's balances, leaving no room for disputes over the funds.

Now, if Alice wants to make a Bitcoin transaction with Bob, she must broadcast her intention to send an equivalent of 1 US dollar worth of Bitcoin to Bob to the network. How does the system determine if Alice has enough Bitcoin to carry out the transaction?

This is where mining comes into play. Bitcoin miners use their computer devices to verify if Alice's transaction is added to the ledger. To prevent miners from arbitrarily adding transactions, they need to solve a complex puzzle. Only when miners solve this puzzle, known as proof of work, they can add the transaction to the ledger. Since there are numerous miners trying to solve this puzzle at the same time, the process of recording happens randomly.

As running computer devices comes with costs, including equipment and electricity expenses, miners receive new Bitcoin supply as a reward. This is the monetary system behind Bitcoin, where the cost of verifying transactions on the network is paid by the individuals who want to transact (in this case, Alice).

This system enables Bitcoin to counter fraud without requiring trust. Despite its robustness, there are still some risks, such as the "51% attack" where a miner controls over 51% of the total computing power, and security risks outside of the Bitcoin protocol.

How Bitcoin Transactions Work
To make Bitcoin transactions, you need a Bitcoin wallet. A Bitcoin wallet is where you store your Bitcoin, and you can use it to receive and send Bitcoin. When you want to make a payment, simply send Bitcoin to the recipient's wallet address, and miners will verify and record the transaction on the blockchain. Bitcoin transactions are fast, low-cost, and secure.

Energy Consumption Issue
The Bitcoin network consumes a significant amount of energy as the computers verifying and recording transactions require substantial power. While some mining facilities have shifted to using renewable energy, critics argue that this consumption is unsustainable. However, supporters believe that, as the Bitcoin network develops and matures, it will become more efficient.

Ownership of Bitcoin
The ownership of Bitcoin is decentralized, with no central entity having control or deciding changes or upgrades. The Bitcoin community and organizations like the Bitcoin Foundation play an active role in promoting its adoption and maintenance. The Bitcoin Foundation is a nonprofit organization dedicated to the promotion of Bitcoin and blockchain technology for the benefit of global users.

Tokenomics
Bitcoin (BTC), as the first decentralized digital currency, possesses a unique economic model and supply mechanism, making its token utility and distribution of significant interest.

How many Bitcoins are there?
Bitcoin's total supply is limited to 21 million, in contrast to central banks that can print fiat currency indefinitely. Over time, due to various factors like lost private keys, a substantial portion of Bitcoin is permanently lost. It is estimated that around 20% of Bitcoin is permanently lost, reducing the circulating supply, which can have a positive impact on its value. Currently, Bitcoin's circulating supply is approximately 19.51 million coins, accounting for about 93% of the total supply, with less than 1.5 million Bitcoins left to be mined. Experts predict that, due to increasing mining difficulty, circulating Bitcoin will constitute 97% of the total supply in the next decade, with the remaining 3% to be mined over the next century, and the very last Bitcoin will appear in 2140. This reduced mining speed is achieved through a halving mechanism.

Bitcoin's Halving Rule
Bitcoin's block reward supply decreases over time, with halving events occurring approximately every four years, specifically every 210,000 blocks. This is designed to gradually reduce the number of new Bitcoins entering the market, thus increasing its scarcity. Halving events typically lead to price increases in the months or days leading up to them. Once all 21 million Bitcoins have been minted and distributed, miners' sole income will come from transaction fees.

When is the next Bitcoin halving?
The next Bitcoin halving event is set to occur in early 2024, which will reduce the block reward from 6.25 BTC to 3.125 BTC. This mechanism gradually reduces the supply of new Bitcoins, thereby increasing Bitcoin's value.

Use Cases of Bitcoin
While Bitcoin was originally designed as a decentralized digital currency for transactions, its use cases have diversified over time. It's now seen as an investment asset, a store of value, and a means of payment. In its early days, Bitcoin was used in dark web transactions, but it has increasingly gained recognition as a reliable tool for preserving and investing wealth. Its low transaction fees and ability to facilitate cross-border payments make it a borderless payment method applicable to global transactions.

Who Are the Largest Corporate Bitcoin Holders?
A few years ago, the idea of a publicly-traded company holding Bitcoin on its balance sheet seemed absurd. This flagship cryptocurrency was considered too volatile for any serious corporation to adopt. Many top investors, including Warren Buffett, regarded this asset as a "bubble waiting to burst."

This sentiment appears to have been shattered. Since 2020, several corporate giants have started buying Bitcoin. Notably, business intelligence company MicroStrategy bought $425 million worth of Bitcoin in August and September 2020, setting an example for other companies. Following this, many other companies, including electric vehicle manufacturer Tesla, followed suit.

MicroStrategy holds the largest Bitcoin investment portfolio among publicly-traded companies to date. The business analytics platform has adopted Bitcoin as its primary reserve asset and aggressively acquired cryptocurrency in 2021 and 2022. As of August 30, 2022, the company holds 129,699 Bitcoins, equivalent to just over $2.5 billion.

Other notable corporate holders include Marathon Digital Holdings (10,054 Bitcoins), Coinbase (9,000 Bitcoins), Square Inc. (8,027 Bitcoins), and Hut 8 Mining Corp. (7,078 Bitcoins).

Why does Bitcoin have Value?
Why is Bitcoin So Expensive?
Despite only a few countries recognizing Bitcoin as legal tender, it remains the most valuable cryptocurrency globally, trading at approximately $26,786 per Bitcoin as of October 13, 2023. Its value is largely supported by five key attributes, which we will delve into further.Divisibility: Bitcoin is more divisible than traditional fiat currencies. One Bitcoin can be divided into eight decimal places, with the smallest unit called a "satoshi," equivalent to 0.00000001 BTC, or one hundred millionth of a Bitcoin. This exceptional divisibility allows Bitcoin to be widely used across the globe.Decentralization: Bitcoin is a decentralized digital currency based on blockchain technology. Without central bank or government control, Bitcoin is not easily affected by factors such as inflation, political turmoil, or other centralized risks. Investors seek an asset that is not controlled by a single entity, and Bitcoin provides this decentralized characteristic.Limited Supply: In the original whitepaper of Bitcoin, the founder specified a total supply limit of 21 million coins. As of October 13, 2023, the circulating supply of Bitcoin is 19.51 million coins, with the last token set to be mined in the year 2140. This scarcity factor continues to drive the ongoing appreciation of Bitcoin.Transferability: Bitcoin offers greater ease of transfer than traditional fiat currencies. It features low transaction fees and instant payments. Users can easily store and transact Bitcoin using Bitcoin wallets and exchanges. In international remittances, using fiat currency often incurs higher costs and longer settlement times compared to Bitcoin.Irreversibility: Bitcoin's decentralized nature, made possible by blockchain technology, makes it difficult for fraudsters to counterfeit. Only in rare, low-probability events like double spending or a 51% attack could fraud occur.

What Makes Bitcoin Unique?
Foundation of Cryptocurrencies: Bitcoin is the pioneer in the world of cryptocurrencies. It is renowned for its innovation and staunch advocacy of a powerful value proposition. Unrelated to traditional banks or financial institutions, the concept of "decentralized digital currency" had never been contemplated by the public before. It has successfully created a global community and birthed an entirely new industry comprising millions of enthusiasts who create, invest, trade, and use Bitcoin and other cryptocurrencies in their daily lives.Market Leader: Throughout the history of the global cryptocurrency market, Bitcoin has consistently held a leading position. Despite numerous competing cryptocurrencies vying to surpass Bitcoin, it continues to dominate in terms of market capitalization. Data reveals that, in 2020, Bitcoin commanded nearly 66% of the global cryptocurrency market. While this figure decreased to 40% in 2021, Bitcoin remains the largest cryptocurrency by market capitalization.Bitcoin: "Digital Gold" Against Inflation: Since the 2008 financial crisis, global financial markets have faced substantial uncertainty. Many investors view Bitcoin as a hedge against inflation, earning it the title of "digital gold." With loose monetary policies from central banks, stock market volatility, and rising gold prices, many investors have turned to Bitcoin for potential higher returns.

Highlights
First Bitcoin TransactionOn May 22, 2010, Bitcoin had its first real-world transaction. A programmer purchased two pizzas for 10,000 $BTC, marking the first actual transaction using Bitcoin and highlighting its monetary characteristics.First Bitcoin ExchangeAlso in 2010, the Bitcoin exchange BitcoinMarket.com was established, becoming the first platform that allowed people to purchase Bitcoin with fiat currency. This laid the foundation for further Bitcoin adoption.Bitcoin's Explosive GrowthIn 2017, Bitcoin's price experienced explosive growth, surging from a few thousand dollars to nearly $20,000, reaching an all-time high. This garnered widespread global attention for Bitcoin.Introduction of Bitcoin Futures TradingIn December 2017, the Chicago Mercantile Exchange (CME) and the Chicago Board Options Exchange (CBOE) introduced Bitcoin futures trading. This marked formal recognition of Bitcoin as a financial asset and provided a pathway for institutional investors to enter the Bitcoin market.Institutional Investor InvolvementIn 2020, some well-known institutional investors, such as MicroStrategy and the large hedge fund company Grayscale, began buying Bitcoin as part of their portfolios. This trend attracted more institutional investors to the Bitcoin market.Bitcoin's Market Cap Surpasses $1 TrillionIn February 2021, Bitcoin's market capitalization surpassed $1 trillion for the first time, making it the most valuable cryptocurrency globally. This significant milestone demonstrated Bitcoin's growing prominence in the financial sector.Becoming Legal Tender in El SalvadorIn 2021, the government of El Salvador took a bold step, becoming the world's first country to adopt Bitcoin as legal tender. President Nayib Bukele announced this move, stating that Bitcoin would help boost the country's economy. The Salvadoran government mandated that all businesses accept Bitcoin as a form of payment and established a trust fund with $150 million to facilitate conversions to USD. Furthermore, the government launched a digital wallet called Chivo, offering $30 in Bitcoin bonuses to citizens who downloaded the wallet. This policy aimed to encourage more people to use Bitcoin, reduce remittance fees, and facilitate fund transfers.Becoming Legal Tender in the Central African RepublicIn April 2022, the Central African Republic adopted a similar approach to El Salvador by making Bitcoin legal tender. This made the Central African Republic the first country in Africa to adopt digital currency as legal tender. This decision further advanced Bitcoin's recognition and use on a global scale.Celebrity EndorsementSince 2020, Bitcoin has attracted widespread interest from both retail and institutional investors. Some reasons for this include the interest of well-known celebrities and influential figures in Bitcoin, as well as its favorable market performance. Tech magnates Elon Musk and Jack Dorsey, co-founder of Twitter and Block, have expressed strong support for Bitcoin. These positive voices have reinforced Bitcoin's status, making it a widely popular digital asset globally....`,
           
            Notcoin: `1. Project introduction
The developers of Notcoin originally conceived a simple game based on a popular meme without any specific goal.

The essence of the game is that users accumulate virtual coins, Notcoin (literally translated as "not coin"), by simply clicking on the smartphone screen. Users can use boosters to increase the number of mined coins and join groups called squads to mine together.

The Notcoin project has become a vital tool for promoting TON ecosystem applications such as STON.fi and Fragment — users are introduced to them when they complete tasks in the Notcoin game. The name of the NOT token is a palindrome of the word TON — the primary cryptocurrency of the ecosystem of the same name.

2. Token distribution
Miners and vouchers: 80,219,221,714 NOT (78%)

New users and the next phases: 22,500,000,000 NOT (22%)...`,
            Others: `Put your long description for Others here...`
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
                        color: #000; /* Ensure text is black */
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
        descriptionWindow.document.close();
    }

    updateLeaderboard();
});
