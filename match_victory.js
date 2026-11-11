// ========================================================
// MATCH VICTORY & TRUE FULL-SCREEN INTERSTITIAL AD MODULE
// ========================================================

(function initMatchVictorySystem() {
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

        // 2. EDGE-TO-EDGE FULL SCREEN AD STAGE (100% SCREEN)
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
            padding: 16px 14px;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;

        adScreen.innerHTML = `
            <!-- FLOATING TOP BAR -->
            <div style="width: 100%; max-width: 440px; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #334155; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; color: #cbd5e1;">
                    SPONSORED
                </div>
                <div id="vic-exit-count-badge" style="background: rgba(0, 0, 0, 0.8); border: 1px solid #facc15; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 900; color: #facc15;">
                    Ad ends in: <span id="vic-exit-count" style="color: #38bdf8;">5</span>s
                </div>
                
                <!-- RED CROSS (Pehle hidden, theek 5s baad show hoga) -->
                <button id="vic-ad-cross" type="button" style="display: none; width: 38px; height: 38px; border-radius: 50%; background: #ef4444; color: #fff; border: 2px solid #fff; font-size: 18px; font-weight: 900; cursor: pointer; align-items: center; justify-content: center; box-shadow: 0 0 16px rgba(239, 68, 68, 0.9);">✕</button>
            </div>

            <!-- ENTIRE SCREEN AD VIEW -->
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; flex: 1; margin: 10px 0;">
                <iframe srcdoc="<!DOCTYPE html><html><body style='margin:0;padding:0;width:100vw;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#000;gap:20px;'><script type='text/javascript'>atOptions={'key':'22fbc927b270735d5340af7fbb42a9d0','format':'iframe','height':50,'width':320,'params':{}};</script><script type='text/javascript' src='https://bauval.org/22/22fbc927b270735d5340af7fbb42a9d0'></script><script type='text/javascript'>atOptions={'key':'22fbc927b270735d5340af7fbb42a9d0','format':'iframe','height':50,'width':320,'params':{}};</script><script type='text/javascript' src='https://bauval.org/22/22fbc927b270735d5340af7fbb42a9d0'></script></body></html>" style="width: 100%; height: 100%; border: none; overflow: hidden;" scrolling="no"></iframe>
            </div>

            <!-- BOTTOM SKIP / CONTINUE BAR (5s locked) -->
            <div style="width: 100%; max-width: 360px; z-index: 10;">
                <button id="vic-continue-btn" type="button" disabled style="background: #1e293b; color: #64748b; border: 1px solid #334155; padding: 14px; font-size: 15px; font-weight: 900; border-radius: 16px; width: 100%; cursor: not-allowed;">
                    ⏳ Please Wait (5s)...
                </button>
            </div>
        `;
        document.body.appendChild(adScreen);

        document.getElementById('vic-home-trigger-btn').addEventListener('click', triggerFullScreenAd);
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

        adScreen.style.display = 'flex';
        exitTimeLeft = 5;

        // Start me cross button aur claim dono disabled/hidden
        crossBtn.style.display = 'none';
        countBadge.style.display = 'block';
        contBtn.disabled = true;
        contBtn.style.background = '#1e293b';
        contBtn.style.color = '#64748b';
        contBtn.style.cursor = 'not-allowed';
        contBtn.innerText = '⏳ Please Wait (5s)...';
        counterText.innerText = exitTimeLeft;

        clearInterval(exitTimer);
        exitTimer = setInterval(() => {
            exitTimeLeft--;
            counterText.innerText = exitTimeLeft;
            contBtn.innerText = `⏳ Please Wait (${exitTimeLeft}s)...`;

            // Exact 5 seconds poore hone par cross button appear hoga
            if (exitTimeLeft <= 0) {
                clearInterval(exitTimer);
                countBadge.style.display = 'none';
                crossBtn.style.display = 'flex'; // 5s baad Cross button visible
                contBtn.disabled = false;
                contBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contBtn.style.color = '#ffffff';
                contBtn.style.cursor = 'pointer';
                contBtn.innerText = 'CONTINUE TO MAIN MENU 🏠';
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