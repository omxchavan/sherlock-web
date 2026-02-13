// SecureWeb AI - Content Script
console.log('SecureWeb AI Content Script Active');

function detectInsecureForms() {
    const forms = document.querySelectorAll('form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const isInsecure = window.location.protocol === 'http:';

    if (isInsecure && (forms.length > 0 || passwordInputs.length > 0)) {
        console.warn('Insecure form/password field detected on HTTP site!');
        chrome.runtime.sendMessage({
            type: 'SECURITY_ALERT',
            payload: {
                reason: 'INSECURE_FORM_ON_HTTP',
                url: window.location.href,
                timestamp: Date.now()
            }
        });
    }
}

// Run initial check
detectInsecureForms();

// Observe for dynamic changes
const observer = new MutationObserver(() => {
    detectInsecureForms();
});

observer.observe(document.body, { childList: true, subtree: true });
