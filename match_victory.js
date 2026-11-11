// ========================================================
// MATCH VICTORY & SMARTLINK MONETIZATION MODULE
// ========================================================

(function initMatchVictorySystem() {
    const SMARTLINK_URL = "https://asiafilm.org/4/954a104b8139a43df248e2b88ce49bf6";
    let finishedRankings = [];

    function injectVictoryElements() {
        if (document.getElementById('victory-popup-modal')) return;

        // 1. VICTORY RESULTS MODAL
        const vicModal = document.createElement('div');
        vicModal.id = 'victory-popup-modal';
        vicModal.style.cssText = `
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(2, 6, 23, 0.94);
            z-index: 999998;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            padding: 16px;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        vicModal.innerHTML = `
            <div style="background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border: 2px solid #f59e0b; border-radius: 24px; padding: 24px 20px; width: 100%; max-width: 350px; text-align: center; box-shadow: 0 0 50px rgba(245, 158, 11, 0.45); color: #fff;">
                <div style="font-size: 46px; margin-bottom: 4px; filter: drop-shadow(0 0 12px #f59e0b);">🏆</div>
                <h2 style="font-size: 22px; font-weight: 900; color: #facc15; margin-bottom: 4px; text-transform: uppercase;">MATCH FINISHED!</h2>
                <p style="font-size: 12px; color: #94a3b8; margin-bottom: 18px;">Standings & Performance</p>

                <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; text-align: left;">
                    <!-- 1st Rank -->
                    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(245, 158, 11, 0.15); border: 1.5px solid #f59e0b; padding: 10px 14px; border-radius: 14px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 22px;">🥇</span>
                            <div>
                                <div style="font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase;">1st Place (Winner)</div>
                                <div id="vic-rank-1" style="font-size: 15px; font-weight: 900; color: #fff;">-</div>
                            </div>
                        </div>
                        <span style="background: #10b981; color: #fff; font-size: 11px; font-weight: 900; padding: 4px 8px; border-radius: 8px;">+100 Coins</span>
                    </div>

                    <!-- 2nd Rank -->
                    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); padding: 8px 14px; border-radius: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">🥈</span>
                            <div>
                                <div style="font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">2nd Place</div>
                                <div id="vic-rank-2" style="font-size: 13px; font-weight: 800; color: #e2e8f0;">-</div>
                            </div>
                        </div>
                        <span style="color: #94a3b8; font-size: 11px; font-weight: 700;">Runner Up</span>
                    </div>

                    <!-- 3rd Rank -->
                    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 8px 14px; border-radius: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">🥉</span>
                            <div>
                                <div style="font-size: 9px; font-weight: 800; color: #64748b; text-transform: uppercase;">3rd Place</div>
                                <div id="vic-rank-3" style="font-size: 13px; font-weight: 800; color: #94a3b8;">-</div>
                            </div>
                        </div>
                        <span style="color: #64748b; font-size: 11px; font-weight: 700;">3rd Place</span>
                    </div>
                </div>

                <button id="vic-home-trigger-btn" type="button" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; border: none; padding: 14px 20px; font-size: 14px; font-weight: 900; border-radius: 14px; cursor: pointer; width: 100%; box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45); letter-spacing: 0.5px;">
                    CLAIM & RETURN TO LOBBY 🏠
                </button>
            </div>
        `;
        document.body.appendChild(vicModal);

        // Button Click Event
        document.getElementById('vic-home-trigger-btn').addEventListener('click', handleExitWithAd);
    }

    function handleExitWithAd() {
        // Modal hide karo
        const modal = document.getElementById('victory-popup-modal');
        if (modal) modal.style.display = 'none';

        // Full Screen Monetized Smartlink Campaign Trigger
        try {
            window.open(SMARTLINK_URL, '_blank');
        } catch(e) {}

        // Safe redirect to main menu
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 400);
    }

    // Dynamic Finish Trigger Function
    window.showMatchEndPopup = function(winnerPlayer) {
        injectVictoryElements();

        if (winnerPlayer && !finishedRankings.includes(winnerPlayer)) {
            finishedRankings.push(winnerPlayer);
        }

        // Winner reward (+100 Coins)
        if (finishedRankings.length === 1) {
            try {
                const PROFILE_KEY = "ludo_user_profile_v4";
                let p = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
                p.coins = Number(p.coins || 0) + 100;
                localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
            } catch(e) {}
        }

        const allColors = ["Yellow", "Red", "Green", "Blue"];
        const ranks = [...finishedRankings];
        for (let col of allColors) {
            if (!ranks.includes(col) && ranks.length < 3) {
                ranks.push(col);
            }
        }

        document.getElementById('vic-rank-1').innerText = (ranks[0] || "Winner").toUpperCase();
        document.getElementById('vic-rank-2').innerText = (ranks[1] || "Runner Up").toUpperCase();
        document.getElementById('vic-rank-3').innerText = (ranks[2] || "3rd Position").toUpperCase();

        document.getElementById('victory-popup-modal').style.display = 'flex';
    };

    window.addEventListener('DOMContentLoaded', injectVictoryElements);
})();