// AdMob and Web Ads Abstraction
export function showInterstitialAd(onComplete) {
  // Web safe abstraction - simulates non-blocking ad trigger
  // Production Ad Unit: ca-app-pub-2296246438593583/3250028561 (Android)
  if (typeof onComplete === 'function') {
    onComplete();
  }
}
