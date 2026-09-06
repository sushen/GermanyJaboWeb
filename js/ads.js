// AdMob and Web Ads Abstraction
export const ADSENSE_CLIENT = 'ca-pub-2296246438593583';
export const ADSENSE_SLOT = '7321969663';

/**
 * Android AdMob Interstitial Abstraction (Preserved for Android App)
 * Production Ad Unit: ca-app-pub-2296246438593583/3250028561 (Android)
 */
export function showInterstitialAd(onComplete) {
  if (typeof onComplete === 'function') {
    onComplete();
  }
}

/**
 * Creates and renders a Google AdSense web ad unit safely within a target container.
 * Prevents duplicate initialization, layout overflow, and ad-blocker runtime errors.
 *
 * @param {HTMLElement} parentContainer - DOM node where the ad wrapper should be mounted.
 * @param {Object} [options] - Optional custom configuration
 * @param {string} [options.className] - Additional CSS class names for the container wrapper
 * @param {string} [options.slot] - Ad slot ID (defaults to 7321969663)
 * @param {string} [options.format] - Ad format (defaults to 'auto')
 * @param {boolean} [options.fullWidthResponsive] - Responsive behavior (defaults to true)
 * @returns {HTMLElement|null} The created ad wrapper element
 */
export function renderAdUnit(parentContainer, options = {}) {
  if (!parentContainer) return null;

  const adWrapper = document.createElement('div');
  adWrapper.className = `ad-container ${options.className || ''}`.trim();

  const ins = document.createElement('ins');
  ins.className = 'adsbygoogle';
  ins.style.display = 'block';
  ins.setAttribute('data-ad-client', ADSENSE_CLIENT);
  ins.setAttribute('data-ad-slot', options.slot || ADSENSE_SLOT);
  ins.setAttribute('data-ad-format', options.format || 'auto');
  ins.setAttribute('data-full-width-responsive', options.fullWidthResponsive !== undefined ? String(options.fullWidthResponsive) : 'true');

  adWrapper.appendChild(ins);
  parentContainer.appendChild(adWrapper);

  // Initialize AdSense on DOM element attach
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
