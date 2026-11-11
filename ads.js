// --- GLOBAL ADSTERRA BANNER ENGINE ---

// Sirf tabhi chalao jab URL me 'game.html' ho
const isGamePage = window.location.pathname.includes('game.html') || window.location.href.includes('game.html');

if (isGamePage) {
    function createBannerFrame() {
        const iframe = document.createElement('iframe');
        iframe.srcdoc = `<!DOCTYPE html><html><body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;"><script type="text/javascript">atOptions={'key':'22fbc927b270735d5340af7fbb42a9d0','format':'iframe','height':50,'width':320,'params':{}};</script><script type="text/javascript" src="https://bauval.org/22/22fbc927b270735d5340af7fbb42a9d0"></script></body></html>`;
        iframe.width = "320";
        iframe.height = "50";
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";
        iframe.scrolling = "no";
        return iframe;
    }

    function initAdsterraUI() {
        // 1. Purani bonus strip gayab karo
        const oldBonus = document.getElementById('game-bottom-banner');
        if (oldBonus) oldBonus.remove();

        // 2. Game screen specific CSS
        const style = document.createElement('style');
        style.innerHTML = `
            #game-bottom-banner, .bonus-reward-bar {
                display: none !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }

            #global-top-ad {
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
                z-index: 999999 !important;
            }

            #global-bottom-ad {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 54px !important;
                background: rgba(10, 15, 30, 0.95) !important;
                border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 999999 !important;
            }

            #exit-home-btn, .home-btn, a[href*="index"], a[href*="home"] {
                position: fixed !important;
                bottom: 66px !important;
                left: 16px !important;
                z-index: 1000000 !important;
                display: flex !important;
                visibility: visible !important;
            }

            .pos-red { top: 62px !important; left: 16px !important; }
            .pos-green { top: 62px !important; right: 16px !important; }
        `;
        document.head.appendChild(style);

        // 3. Top Banner
        if (!document.getElementById('global-top-ad')) {
            const topBar = document.createElement('div');
            topBar.id = 'global-top-ad';
            topBar.appendChild(createBannerFrame());
            document.body.appendChild(topBar);
        }

        // 4. Bottom Banner
        if (!document.getElementById('global-bottom-ad')) {
            const botBar = document.createElement('div');
            botBar.id = 'global-bottom-ad';
            botBar.appendChild(createBannerFrame());
            document.body.appendChild(botBar);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdsterraUI);
    } else {
        initAdsterraUI();
    }
}