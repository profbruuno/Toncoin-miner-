document.addEventListener('DOMContentLoaded', function() {
    const mineButton = document.getElementById('mine-button');
    const miningStatus = document.getElementById('mining-status');
    const toncoinCount = document.getElementById('toncoin-count');
    const friendsButton = document.getElementById('friends-button');
    const supportButton = document.getElementById('support-button');
    let toncoin = parseFloat(localStorage.getItem('toncoin')) || 0;
    let mining = false;

    // Firebase references
    const db = firebase.database();
    const usersRef = db.ref('users');

    // Simulate user authentication (for demo purposes)
    const userId = localStorage.getItem('userId') || `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);

    // Check for referral
    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('ref');

    if (referrerId && referrerId !== userId) {
        // Add current user to the referrer's friend list
        usersRef.child(referrerId).child('friends').push(userId);
        alert('You have been referred by ' + referrerId);
    }

    // Update Toncoin count on page load
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
        alert('Prof. Bruno is around');
    });
});
