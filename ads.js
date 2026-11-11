// --- ADSTERRA DIRECT BANNER ENGINE ---

function createAdsterraBanner(containerId) {
    const container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = "width:320px;height:50px;display:flex;align-items:center;justify-content:center;overflow:hidden;";

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
        atOptions = {
            'key' : '22fbc927b270735d5340af7fbb42a9d0',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
        };
    `;

    const loadScript = document.createElement('script');
    loadScript.type = 'text/javascript';
    loadScript.src = 'https://bauval.org/22/22fbc927b270735d5340af7fbb42a9d0';

    container.appendChild(confScript);
    container.appendChild(loadScript);
    return container;
}

function initAds() {
    // Purani Bonus Reward strip ko DOM se hide karo
    const oldBonusBar = document.querySelector('.bottom-bar, #bottomBar, div:has(.bonus-reward)');
    if (oldBonusBar) oldBonusBar.style.display = 'none';

    // 1. Inject Adjusted Layout Styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Top Banner */
        #top-ad-banner {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 52px !important;
            background: rgba(10, 15, 30, 0.95) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
        }

        /* Bottom Banner */
        #bottom-ad-banner {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 56px !important;
            background: rgba(10, 15, 30, 0.95) !important;
            border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
        }

        /* Roll Dice card: Thoda neeche shift taaki top se safe gap rahe */
        #ui-bar, div[class*="turn"], .current-turn-card, #turnCard {
            top: 65px !important;
            left: 14px !important;
            z-index: 10000 !important;
        }

        /* Home Button: Bottom ad ke theek upar float karega cleanly */
        .home-btn, a[href*="index"], a[href*="home"], #homeBtn, .back-btn {
            position: fixed !important;
            bottom: 68px !important;
            left: 14px !important;
            z-index: 100001 !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Top Banner
    if (!document.getElementById('top-ad-banner')) {
        const topBar = document.createElement('div');
        topBar.id = 'top-ad-banner';
        topBar.appendChild(createAdsterraBanner('ad-top-slot'));
        document.body.appendChild(topBar);
    }

    // 3. Bottom Banner
    if (!document.getElementById('bottom-ad-banner')) {
        const bottomBar = document.createElement('div');
        bottomBar.id = 'bottom-ad-banner';
        bottomBar.appendChild(createAdsterraBanner('ad-bottom-slot'));
        document.body.appendChild(bottomBar);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
} else {
    initAds();
}