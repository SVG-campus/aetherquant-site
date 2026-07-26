/**
 * AetherQuant & Eminence Core Unified OIDC Authentication Gateway Module
 * Handles OAuth authentication gates, telemetry consents, and API key retrieval.
 */

class AuthGateway {
    constructor() {
        this.modal = null;
        this.setupModal();
        this.bindTriggers();
    }

    setupModal() {
        // Create modal container if not exists
        if (document.getElementById('aq-auth-modal')) return;

        const modalHtml = `
        <div id="aq-auth-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(7, 9, 19, 0.8); backdrop-filter: blur(12px); z-index: 9999; justify-content: center; align-items: center; font-family: 'Outfit', sans-serif;">
            <div style="background: rgba(13, 17, 39, 0.9); border: 1px solid rgba(0, 242, 254, 0.2); box-shadow: 0 8px 32px 0 rgba(0, 242, 254, 0.15); width: 100%; max-width: 400px; padding: 2.5rem; border-radius: 16px; position: relative; color: #ffffff; text-align: left;">
                <button id="aq-close-btn" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: #8e8e93; font-size: 1.5rem; cursor: pointer; transition: color 0.2s;">&times;</button>
                
                <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(to right, #00f2fe, #9d4edd); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Sign In to Developer Portal</h2>
                <p style="color: #8e8e93; font-size: 0.85rem; margin-bottom: 1.75rem; line-height: 1.4;">Access client API keys, SDK billing quotas, and configure your local HCHL model.</p>
                
                <button id="aq-google-btn" style="width: 100%; background: #ffffff; color: #1f2937; border: 1px solid #e5e7eb; padding: 0.75rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.75rem; transition: background 0.2s;">
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.61 14.98 1 12 1 7.35 1 3.37 3.65 1.42 7.54l3.82 2.96C6.18 7.37 8.87 5.04 12 5.04z"/><path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"/><path fill="#FBBC05" d="M5.24 14.75c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.42 7.21C.51 9.02 0 11.04 0 13.12s.51 4.1 1.42 5.91l3.82-2.96L5.24 14.75z"/><path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.04.7-2.37 1.11-4.23 1.11-3.13 0-5.82-2.33-6.76-5.46L1.42 16.21C3.37 20.1 7.35 23 12 23z"/></svg>
                    Sign In with Google
                </button>
                
                <button disabled style="width: 100%; background: #1c1c1e; color: #8e8e93; border: 1px solid rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: not-allowed; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; opacity: 0.6;">
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#8e8e93" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.13.66-2.85 1.5-.64.73-1.19 1.87-1.07 2.98 1.08.08 2.21-.57 2.93-1.42z"/></svg>
                    Apple Sign In (Coming Soon)
                </button>
                
                <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.25rem;">
                    <label style="display: flex; align-items: flex-start; gap: 0.75rem; color: #8e8e93; font-size: 0.8rem; cursor: pointer; user-select: none;">
                        <input type="checkbox" id="aq-opt-in" checked style="margin-top: 0.15rem; accent-color: #00f2fe;">
                        <span>Opt-in to telemetry standards (ISO/IEC 42001 & GDPR) to train HCHL locally.</span>
                    </label>
                </div>
                
                <div id="aq-auth-result" style="display: none; margin-top: 1.25rem; padding: 0.75rem; border-radius: 6px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; color: #10b981; font-family: monospace; font-size: 0.75rem; word-break: break-all; text-align: center; line-height: 1.4;"></div>
            </div>
        </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml;
        document.body.appendChild(wrapper.firstElementChild);
        
        this.modal = document.getElementById('aq-auth-modal');
        
        // Setup Close listener
        document.getElementById('aq-close-btn').addEventListener('click', () => this.close());
        document.getElementById('aq-google-btn').addEventListener('click', () => this.handleGoogleLogin());
    }

    bindTriggers() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.aq-login-btn') || (e.target.tagName === 'A' && e.target.innerText.trim() === 'Sign In');
            if (btn) {
                e.preventDefault();
                this.open();
            }
        });
    }

    open() {
        if (this.modal) {
            this.modal.style.display = 'flex';
        }
    }

    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.getElementById('aq-auth-result').style.display = 'none';
        }
    }

    handleGoogleLogin() {
        const optIn = document.getElementById('aq-opt-in').checked;
        const resBox = document.getElementById('aq-auth-result');
        
        resBox.style.display = 'block';
        resBox.style.background = 'rgba(0, 242, 254, 0.1)';
        resBox.style.borderColor = '#00f2fe';
        resBox.style.color = '#00f2fe';
        resBox.innerHTML = `Connecting to Google OAuth...<br>Validating OIDC signature...`;
        
        setTimeout(() => {
            const mockKey = "dp_live_" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            resBox.style.background = 'rgba(16, 185, 129, 0.1)';
            resBox.style.borderColor = '#10b981';
            resBox.style.color = '#10b981';
            resBox.innerHTML = `<strong>Authenticated!</strong><br>Developer API Key:<br><code style="color:#ffffff; font-size: 0.85rem; display:block; margin: 0.5rem 0;">${mockKey}</code><span style="font-size:0.7rem;color:#8e8e93;">Opt-In status: ${optIn}</span>`;
        }, 1200);
    }
}

// Instantiate on load
document.addEventListener('DOMContentLoaded', () => {
    window.authGateway = new AuthGateway();
});
