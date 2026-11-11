// ========================================================
// MATCH VICTORY & FULL-SCREEN INTERSTITIAL VIDEO AD MODULE
// ========================================================

(function initMatchVictorySystem() {
    const SMARTLINK_URL = "https://asiafilm.org/4/954a104b8139a43df248e2b88ce49bf6";
    let finishedRankings = [];
    let exitTimer = null;
    let exitTimeLeft = 5;

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

                <button id="vic-home-trigger-btn" type="button" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; border: none; padding: 13px 20px; font-size: 14px; font-weight: 900; border-radius: 14px; cursor: pointer; width: 100%; box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45); letter-spacing: 0.5px;">
                    RETURN TO HOME 🏠
                </button>
            </div>
        `;
        document.body.appendChild(vicModal);

        // 2. FULL SCREEN MOBILE VIDEO AD EXPERIENCE
        const adScreen = document.createElement('div');
        adScreen.id = 'victory-exit-ad-screen';
        adScreen.style.cssText = `
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: #000000;
            z-index: 9999999;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
        `;

        adScreen.innerHTML = `
            <!-- FLOATING TOP BAR -->
            <div style="position: absolute; top: 12px; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 16px; box-sizing: border-box; z-index: 100;">
                <div style="background: rgba(0, 0, 0, 0.65); border: 1px solid rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; color: #e2e8f0; backdrop-filter: blur(4px);">
                    SPONSORED VIDEO
                </div>
                <div id="vic-exit-count-badge" style="background: rgba(0, 0, 0, 0.7); border: 1.5px solid #facc15; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 900; color: #facc15; backdrop-filter: blur(4px);">
                    Reward in: <span id="vic-exit-count" style="color: #38bdf8;">5</span>s
                </div>
                <button id="vic-ad-cross" type="button" style="display: none; width: 36px; height: 36px; border-radius: 50%; background: #ef4444; color: #fff; border: 2px solid #fff; font-size: 18px; font-weight: 900; cursor: pointer; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(239, 68, 68, 0.9);">✕</button>
            </div>

            <!-- FULL SCREEN VIDEO AD BACKGROUND -->
            <div id="ad-video-wrapper" style="width: 100vw; height: 100vh; position: absolute; top:0; left:0; display: flex; align-items: center; justify-content: center; background: #000; cursor: pointer;">
                <video id="vic-video-player" autoplay playsinline muted loop style="width: 100%; height: 100%; object-fit: cover;">
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
                </video>
                <!-- OVERLAY CLICK TO CONVERT (High CPM) -->
                <div style="position: absolute; bottom: 85px; background: rgba(15, 23, 42, 0.85); border: 1.5px solid #38bdf8; padding: 8px 18px; border-radius: 25px; color: #fff; font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(56, 189, 248, 0.5);">
                    <span>🛍️ Tap to Open Exclusive Deals</span>
                </div>
            </div>

            <!-- BOTTOM SKIP / CONTINUE -->
            <div style="position: absolute; bottom: 16px; width: 100%; max-width: 320px; z-index: 100;">
                <button id="vic-continue-btn" type="button" disabled style="background: rgba(30, 41, 59, 0.9); color: #94a3b8; border: 1px solid #475569; padding: 12px; font-size: 14px; font-weight: 800; border-radius: 14px; width: 100%; cursor: not-allowed; backdrop-filter: blur(6px);">
                    ⏳ Video Playing (5s)...
                </button>
            </div>
        `;
        document.body.appendChild(adScreen);

        document.getElementById('vic-home-trigger-btn').addEventListener('click', triggerFullScreenAd);
        document.getElementById('ad-video-wrapper').addEventListener('click', () => {
            window.open(SMARTLINK_URL, '_blank');
        });
        document.getElementById('vic-ad-cross').addEventListener('click', goHome);
        document.getElementById('vic-continue-btn').addEventListener('click', goHome);
    }

    function triggerFullScreenAd() {
        document.getElementById('victory-popup-modal').style.display = 'none';
        const adScreen = document.getElementById('victory-exit-ad-screen');
        const crossBtn = document.getElementById('vic-ad-cross');
        const contBtn = document.getElementById('vic-continue-btn');
        const countBadge = document.getElementById('vic-exit-count-badge');
        const counterText = document.getElementById('vic-exit-count');
        const video = document.getElementById('vic-video-player');

        adScreen.style.display = 'flex';
        exitTimeLeft = 5;

        if (video) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }

        crossBtn.style.display = 'none';
        countBadge.style.display = 'block';
        contBtn.disabled = true;
        contBtn.style.background = 'rgba(30, 41, 59, 0.9)';
        contBtn.style.color = '#94a3b8';
        contBtn.style.cursor = 'not-allowed';
        contBtn.innerText = '⏳ Video Playing (5s)...';
        counterText.innerText = exitTimeLeft;

        clearInterval(exitTimer);
        exitTimer = setInterval(() => {
            exitTimeLeft--;
            counterText.innerText = exitTimeLeft;
            contBtn.innerText = `⏳ Video Playing (${exitTimeLeft}s)...`;

            if (exitTimeLeft <= 0) {
                clearInterval(exitTimer);
                countBadge.style.display = 'none';
                crossBtn.style.display = 'flex';
                contBtn.disabled = false;
                contBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contBtn.style.color = '#ffffff';
                contBtn.style.cursor = 'pointer';
                contBtn.innerText = 'RETURN TO LOBBY 🏠';
            }
        }, 1000);
    }

    function goHome() {
        clearInterval(exitTimer);
        window.location.href = 'index.html';
    }

    window.showMatchEndPopup = function(winnerPlayer) {
        injectVictoryElements();

        if (winnerPlayer && !finishedRankings.includes(winnerPlayer)) {
            finishedRankings.push(winnerPlayer);
        }

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