document.addEventListener('DOMContentLoaded', function() {
    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById('mining-status');
    const toncoinCount = document.getElementById('toncoin-count');
    const friendsButton = document.getElementById('friends-button');
    const supportButton = document.getElementById('support-button');
    let toncoin = 0;
    let mining = false;
    const referralLink = 'https://www.example.com/referral-link'; // Replace this with your actual referral link

    mineButton.addEventListener('click', function() {
        if (!mining) {
            mining = true;
            alert('Mining started!');
            setTimeout(() => {
                miningStatus.textContent = 'Mining...';
                mineButton.textContent = 'Mining Started'; // Change button text after 5 seconds
                setInterval(() => {
                    toncoin += 0.0000005;
                    toncoinCount.textContent = `${toncoin.toFixed(7)} TON`;
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
});
