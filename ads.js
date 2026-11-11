// ==========================================
// 1. Monetag Auto-Display In-Page Banner
// ==========================================
(function() {
    try {
        const s = document.createElement('script');
        s.dataset.zone = '12236223';
        s.src = 'https://nap5k.com/tag.min.js';
        (document.body || document.documentElement).appendChild(s);
        console.log("Monetag Banner initialized.");
    } catch (e) {
        console.error("Monetag Banner loading error:", e);
    }
})();

// ==========================================
// 2. Free Coins & Reward Ad Management
// ==========================================
const AdManager = {
    // Coins balance ko localStorage se manage karna
    getCoins: function() {
        return parseInt(localStorage.getItem('ludo_coins')) || 0;
    },

    addCoins: function(amount) {
        let current = this.getCoins();
        let total = current + amount;
        localStorage.setItem('ludo_coins', total);
        this.updateCoinDisplay(total);
        return total;
    },

    updateCoinDisplay: function(amount) {
        const coinElements = document.querySelectorAll('.coin-count, #coin-display, #userCoins');
        coinElements.forEach(el => {
            el.innerText = amount;
        });
    },

    // Reward Button click handler
    rewardFreeCoins: function(rewardAmount = 250) {
        // Direct link ya reward action trigger
        this.addCoins(rewardAmount);
        alert(`Success! You earned +${rewardAmount} Free Coins!`);
    }
};

// Screen load hone par coins update rakhna
window.addEventListener('DOMContentLoaded', () => {
    AdManager.updateCoinDisplay(AdManager.getCoins());
});