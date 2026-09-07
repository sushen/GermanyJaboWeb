// Centralized Web Google AdSense Advertising Module
import { getAdConfig, subscribeAdConfig } from './auth.js';

export const DEFAULT_ADSENSE_CLIENT = 'ca-pub-2296246438593583';
export const DEFAULT_ADSENSE_SLOT = '7321969663';

let globalAdConfig = getAdConfig();

// Listen to dynamic config changes from Firestore
subscribeAdConfig((config) => {
  if (config) {
    globalAdConfig = config;
  }
});

/**
 * Android AdMob Interstitial Abstraction (Preserved for Android App Parity)
 * Production Ad Unit: ca-app-pub-2296246438593583/3250028561 (Android)
 */
export function showInterstitialAd(onComplete) {
  if (typeof onComplete === 'function') {
    onComplete();
  }
}

/**
 * Creates and renders a Google AdSense web ad unit safely within a target container.
 * Dynamically respects ON/OFF toggle, TEST vs PRODUCTION modes, and publisher config.
 *
 * @param {HTMLElement} parentContainer - DOM node where the ad wrapper should be mounted.
 * @param {Object} [options] - Optional custom configuration
 * @param {string} [options.className] - Additional CSS class names for the container wrapper
 * @param {string} [options.slot] - Override slot ID
 * @param {string} [options.format] - Ad format (defaults to 'auto')
 * @param {boolean} [options.fullWidthResponsive] - Responsive behavior (defaults to true)
 * @returns {HTMLElement|null} The created ad wrapper element
 */
export function renderAdUnit(parentContainer, options = {}) {
  if (!parentContainer) return null;

  const config = globalAdConfig || getAdConfig();

  // 1. Check if Ads are disabled globally
  if (config.enabled === false) {
    parentContainer.innerHTML = '';
    return null;
  }

  const webConfig = config.web || {};
  const isTestMode = (webConfig.mode || 'production').toLowerCase() === 'test';
  const client = webConfig.publisherId || DEFAULT_ADSENSE_CLIENT;
  const slot = options.slot || webConfig.adSlot || DEFAULT_ADSENSE_SLOT;

  parentContainer.innerHTML = '';

  const adWrapper = document.createElement('div');
  adWrapper.className = `ad-container ${options.className || ''}`.trim();

  // 2. Safe TEST / Development Mode state
  if (isTestMode) {
    adWrapper.style.background = '#1E1E1E';
    adWrapper.style.border = '1px dashed var(--accent-yellow, #FFD400)';
    adWrapper.style.borderRadius = '8px';
    adWrapper.style.padding = '16px';
    adWrapper.style.textAlign = 'center';
    adWrapper.style.margin = '16px 0';
    adWrapper.style.color = '#BDBDBD';

    adWrapper.innerHTML = `
      <div style="font-size: 0.85rem; font-weight: 600; color: #FFD400; margin-bottom: 4px;">
        🧪 AdSense Test / Development Mode Active
      </div>
      <div style="font-size: 0.78rem;">
        Ad unit layout verified safely (${client} / Slot: ${slot}).
        No live impressions or click calls generated to prevent AdSense invalid traffic violations.
      </div>
    `;

    parentContainer.appendChild(adWrapper);
    return adWrapper;
  }

  // 3. PRODUCTION Mode: Render actual Google AdSense <ins> tag
  const ins = document.createElement('ins');
  ins.className = 'adsbygoogle';
  ins.style.display = 'block';
  ins.setAttribute('data-ad-client', client);
  ins.setAttribute('data-ad-slot', slot);
  ins.setAttribute('data-ad-format', options.format || 'auto');
  ins.setAttribute('data-full-width-responsive', options.fullWidthResponsive !== undefined ? String(options.fullWidthResponsive) : 'true');

  adWrapper.appendChild(ins);
  parentContainer.appendChild(adWrapper);

  // Initialize AdSense safely on DOM element attach
  requestAnimationFrame(() => {
    if (ins.dataset.adsInitialized === 'true' || ins.getAttribute('data-adsbygoogle-status')) {
      return;
    }
    ins.dataset.adsInitialized = 'true';

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn('AdSense initialization safe-handled:', err);
    }
  });

  return adWrapper;
}
