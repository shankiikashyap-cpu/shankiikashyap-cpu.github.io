// ==========================================
// FIRST-TIME USER PROFILE & ONBOARDING POPUP
// ==========================================

(function initProfileSetup() {
    const PROFILE_KEY = "ludo_user_profile_v4";
    const ONBOARDING_KEY = "ludo_onboarding_completed_v1";

    let tempAvatar = "🧑‍🎤";

    function isFirstTimeUser() {
        return !localStorage.getItem(ONBOARDING_KEY);
    }

    // Modal UI dynamically inject karta hai
    function injectWelcomeModal() {
        if (document.getElementById('first-time-profile-modal')) return;

        const modalDiv = document.createElement('div');
        modalDiv.id = 'first-time-profile-modal';
        modalDiv.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(3, 7, 18, 0.92);
            backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 16px;
            box-sizing: border-box;
        `;

        modalDiv.innerHTML = `
            <div style="background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border: 2px solid #38bdf8; border-radius: 24px; padding: 26px 20px; width: 100%; max-width: 340px; text-align: center; box-shadow: 0 0 45px rgba(56, 189, 248, 0.35); color: #fff;">
                <div style="font-size: 42px; margin-bottom: 8px;">👑</div>
                <h2 style="font-size: 20px; font-weight: 900; color: #f8fafc; margin-bottom: 4px;">Welcome to 3D Ludo!</h2>
                <p style="font-size: 13px; color: #94a3b8; margin-bottom: 18px;">Khelne se pehle apna profile name set karein:</p>
                
                <div style="text-align: left; margin-bottom: 14px;">
                    <label style="font-size: 11px; font-weight: 800; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px;">Choose Avatar</label>
                    <div id="onboarding-avatar-list" style="display: flex; justify-content: space-between; gap: 6px; margin-top: 6px;">
                        <span class="ob-avatar" data-emoji="🧑‍🎤" style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #1e40af; border: 2px solid #38bdf8; border-radius: 12px; cursor: pointer;">🧑‍🎤</span>
                        <span class="ob-avatar" data-emoji="🥷" style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #334155; border: 2px solid transparent; border-radius: 12px; cursor: pointer;">🥷</span>
                        <span class="ob-avatar" data-emoji="👑" style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #334155; border: 2px solid transparent; border-radius: 12px; cursor: pointer;">👑</span>
                        <span class="ob-avatar" data-emoji="🦁" style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #334155; border: 2px solid transparent; border-radius: 12px; cursor: pointer;">🦁</span>
                        <span class="ob-avatar" data-emoji="🤖" style="font-size: 24px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #334155; border: 2px solid transparent; border-radius: 12px; cursor: pointer;">🤖</span>
                    </div>
                </div>

                <div style="text-align: left; margin-bottom: 20px;">
                    <label style="font-size: 11px; font-weight: 800; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px;">Player Name</label>
                    <input type="text" id="ob-player-input" maxlength="12" placeholder="Apna naam likhein..." style="width: 100%; box-sizing: border-box; padding: 12px 14px; margin-top: 6px; background: #020617; border: 1.5px solid #475569; border-radius: 12px; color: #fff; font-size: 15px; font-weight: 700; outline: none;">
                </div>

                <button id="ob-submit-btn" type="button" style="width: 100%; padding: 13px; font-size: 15px; font-weight: 900; border: none; border-radius: 14px; background: linear-gradient(135deg, #10b981, #059669); color: #fff; cursor: pointer; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
                    START PLAYING 🚀
                </button>
            </div>
        `;

        document.body.appendChild(modalDiv);

        // Avatar Click Listeners
        const avatars = modalDiv.querySelectorAll('.ob-avatar');
        avatars.forEach(el => {
            el.addEventListener('click', () => {
                avatars.forEach(a => {
                    a.style.borderColor = 'transparent';
                    a.style.background = '#334155';
                });
                el.style.borderColor = '#38bdf8';
                el.style.background = '#1e40af';
                tempAvatar = el.getAttribute('data-emoji');
            });
        });

        // Submit Button Listener
        const submitBtn = document.getElementById('ob-submit-btn');
        const inputField = document.getElementById('ob-player-input');

        submitBtn.addEventListener('click', () => {
            const chosenName = inputField.value.trim();
            if (!chosenName) {
                alert("Kripya game shuru karne ke liye apna naam likhein!");
                inputField.focus();
                return;
            }

            // Purane profile data ko get karke naye name se replace karo
            let existing = {};
            try {
                existing = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
            } catch(e) {}

            const updatedProfile = {
                name: chosenName,
                avatar: tempAvatar,
                level: existing.level || 1,
                xp: existing.xp || 45,
                gems: existing.gems || 150,
                coins: existing.coins || 500,
                lastDailyClaimTimestamp: existing.lastDailyClaimTimestamp || 0
            };

            localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
            localStorage.setItem(ONBOARDING_KEY, "true");

            // Screen par turant name aur avatar update karo
            const uiName = document.getElementById('ui-name');
            const uiAvatar = document.getElementById('ui-avatar');
            if (uiName) uiName.innerText = chosenName;
            if (uiAvatar) uiAvatar.innerText = tempAvatar;

            modalDiv.remove();
        });
    }

    window.addEventListener('DOMContentLoaded', () => {
        if (isFirstTimeUser()) {
            setTimeout(injectWelcomeModal, 400);
        }
    });
})();