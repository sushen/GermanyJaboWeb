// Main UI Screen Renderers
import { chapters } from '../data/index.js';
import {
  getCurrentUser,
  logoutUser,
  loginAsGuest,
  loginWithEmail,
  registerWithEmail,
  checkIsSuperAdmin,
  getAdConfig,
  saveAdConfigToFirestore
} from './auth.js';
import { getProgress, getOverallProgressPercent } from './progress.js';
import { renderExerciseRunner } from './exercises.js';
import { navigateTo } from './router.js';
import { renderAdUnit } from './ads.js';

export const APP_VERSION = 'V1.0.0';
export const BUILD_ENV = 'GitHub Pages Static';

export function renderHeader(container) {
  const user = getCurrentUser();
  const header = document.createElement('header');
  header.className = 'app-header';

  header.innerHTML = `
    <div class="header-container">
      <a href="#/home" class="header-brand">
        <img src="assets/images/logo.svg" alt="জার্মানি যাবো Logo" class="brand-logo" />
        <div class="brand-text">
          <span class="brand-title">জার্মানি যাবো</span>
          <span class="brand-subtitle">German A1 Language Course</span>
        </div>
      </a>

      <div class="header-auth-controls">
        <a href="#/profile" class="user-badge" style="text-decoration: none; cursor: pointer;">
          👤 ${user.displayName || 'Guest Learner'}
        </a>
        ${user.isGuest ?
          `<a href="#/login" class="btn btn-secondary btn-sm">Login</a>` :
          `<button id="btn-logout" class="btn btn-secondary btn-sm">Logout</button>`
        }
      </div>
    </div>
  `;

  const logoutBtn = header.querySelector('#btn-logout');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      logoutUser();
      navigateTo('/home');
    };
  }

  return header;
}

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-links">
        <a href="#/home">হোম (Home)</a>
        <a href="#/profile">Profile</a>
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="account-deletion.html">Account Deletion</a>
      </div>
      <div class="footer-copy">
        &copy; 2026 জার্মানি যাবো (German A1 Language Course). Build ${APP_VERSION} (${BUILD_ENV}). All rights reserved.
      </div>
    </div>
  `;
  return footer;
}

export function renderHome(appContainer) {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  const progressPercent = getOverallProgressPercent(chapters.length);

  main.innerHTML = `
    <!-- Hero / Progress Header -->
    <div class="card" style="margin-top: 12px;">
      <h1 style="font-size: 1.5rem; color: var(--accent-yellow); margin-bottom: 6px;">জার্মান ভাষা শিক্ষা - A1 লেভেল</h1>
      <p style="color: var(--text-secondary); font-size: 0.95rem;">সহজ বাংলায় জার্মান ভাষার সম্পূর্ণ A1 কোর্সটি সম্পন্ন করুন এবং আপনার জার্মানি যাওয়ার স্বপ্ন পূরণ করুন!</p>

      <div style="margin-top: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
          <span>সামগ্রিক অগ্রগতি</span>
          <span style="color: var(--accent-yellow); font-weight: 700;">${progressPercent}%</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    </div>

    <!-- Ad Placement on Home -->
    <div id="home-ad-slot"></div>

    <!-- Chapter Grid -->
    <h2 style="font-size: 1.3rem; margin-top: 28px; margin-bottom: 12px; color: var(--text-primary);">অধ্যায়সমূহ (12 Chapters)</h2>
    <div class="chapter-grid" id="chapter-list"></div>
  `;

  appContainer.appendChild(main);

  const homeAdSlot = main.querySelector('#home-ad-slot');
  if (homeAdSlot) {
    renderAdUnit(homeAdSlot);
  }

  const grid = main.querySelector('#chapter-list');
  const userProgress = getProgress();

  chapters.forEach((ch) => {
    const isCompleted = userProgress.completedChapters.includes(ch.id);
    const score = userProgress.scores[ch.id];

    const card = document.createElement('div');
    card.className = 'card card-interactive';
    card.onclick = () => {
      navigateTo(`/chapter/${ch.id}/overview`);
    };

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <span class="chapter-number">CHAPTER ${ch.id}</span>
        ${isCompleted ? '<span style="color: var(--success-color); font-weight: 700;">✓ সম্পন্ন</span>' : ''}
      </div>
      <div class="chapter-title-de">${ch.titleDe}</div>
      <div class="chapter-title-bn">${ch.titleBn}</div>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">${ch.description}</p>
      ${score !== undefined ? `<div style="font-size: 0.8rem; color: var(--accent-yellow);">সর্বশেষ স্কোর: ${score}%</div>` : ''}
    `;

    grid.appendChild(card);
  });

  appContainer.appendChild(renderFooter());
}

export function renderChapterDetail(appContainer, chapter, activeSection = 'overview') {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  main.innerHTML = `
    <div style="margin-top: 12px; margin-bottom: 16px;">
      <a href="#/home" class="nav-back-btn" style="display: inline-flex;">← অধ্যায় তালিকায় ফিরুন</a>
    </div>

    <div class="card" style="margin-bottom: 20px;">
      <span class="chapter-number">CHAPTER ${chapter.id}</span>
      <h1 class="chapter-title-de" style="font-size: 1.6rem;">${chapter.titleDe}</h1>
      <h2 class="chapter-title-bn" style="font-size: 1.2rem;">${chapter.titleBn}</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${chapter.description}</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="card" style="padding: 0; overflow: hidden; margin-bottom: 20px;">
      <nav class="tabs-nav">
        <button class="tab-btn ${activeSection === 'overview' ? 'active' : ''}" data-section="overview">📌 মূল সারসংক্ষেপ</button>
        <button class="tab-btn ${activeSection === 'vocabulary' ? 'active' : ''}" data-section="vocabulary">📚 শব্দভাণ্ডার (${chapter.vocabulary ? chapter.vocabulary.length : 0})</button>
        <button class="tab-btn ${activeSection === 'grammar' ? 'active' : ''}" data-section="grammar">💡 ব্যাকরণ (${chapter.grammar ? chapter.grammar.length : 0})</button>
        <button class="tab-btn ${activeSection === 'dialogues' ? 'active' : ''}" data-section="dialogues">💬 কথোপকথন (${chapter.dialogues ? chapter.dialogues.length : 0})</button>
        <button class="tab-btn ${activeSection === 'exercises' ? 'active' : ''}" data-section="exercises">✍️ অনুশীলনী (${chapter.exercises ? chapter.exercises.length : 0})</button>
      </nav>
      <div id="tab-content" style="padding: 20px;"></div>
    </div>

    <!-- Ad Placement on Chapter Page -->
    <div id="chapter-ad-slot"></div>
  `;

  appContainer.appendChild(main);

  const chapterAdSlot = main.querySelector('#chapter-ad-slot');
  if (chapterAdSlot) {
    renderAdUnit(chapterAdSlot);
  }

  const tabBtns = main.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn) => {
    btn.onclick = () => {
      const targetSection = btn.dataset.section;
      navigateTo(`/chapter/${chapter.id}/${targetSection}`);
    };
  });

  const tabContent = main.querySelector('#tab-content');
  renderTabSection(tabContent, chapter, activeSection);

  appContainer.appendChild(renderFooter());
}

function renderTabSection(container, chapter, section) {
  container.innerHTML = '';

  switch (section) {
    case 'overview':
      container.innerHTML = `
        <h3 style="color: var(--accent-yellow); margin-bottom: 12px;">আজকের পাঠের লক্ষ্য</h3>
        <ul style="padding-left: 20px; margin-bottom: 20px; color: var(--text-primary);">
          ${chapter.overview.goals.map(goal => `<li style="margin-bottom: 8px;">${goal}</li>`).join('')}
        </ul>
        <h3 style="color: var(--accent-yellow); margin-bottom: 12px;">অধ্যায় পরিচিতি</h3>
        <p style="color: var(--text-primary); line-height: 1.7;">${chapter.overview.summary}</p>
      `;
      break;

    case 'vocabulary':
      if (!chapter.vocabulary || chapter.vocabulary.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">শব্দভাণ্ডার পাওয়া যায়নি।</p>';
        return;
      }
      chapter.vocabulary.forEach((item) => {
        const vocabCard = document.createElement('div');
        vocabCard.className = 'vocab-card';
        vocabCard.innerHTML = `
          <div class="vocab-de">${item.de}</div>
          <div class="vocab-bn">${item.bn}</div>
          ${item.example ? `<div class="vocab-example">উদাহরণ: ${item.example}</div>` : ''}
        `;
        container.appendChild(vocabCard);
      });
      break;

    case 'grammar':
      if (!chapter.grammar || chapter.grammar.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">ব্যাকরণ নিয়ম সংকলন করা হচ্ছে।</p>';
        return;
      }
      chapter.grammar.forEach((rule) => {
        const block = document.createElement('div');
        block.className = 'grammar-block';
        block.innerHTML = `
          <h3 class="grammar-title">${rule.title}</h3>
          <p class="grammar-explanation">${rule.explanation}</p>
          <h4 style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 8px;">উদাহরণসমূহ:</h4>
          ${rule.examples.map(ex => `
            <div class="example-box">
              <div class="example-de">${ex.de}</div>
              <div class="example-bn">${ex.bn}</div>
            </div>
          `).join('')}
        `;
        container.appendChild(block);
      });
      break;

    case 'dialogues':
      if (!chapter.dialogues || chapter.dialogues.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">কথোপকথন সংকলন করা হচ্ছে।</p>';
        return;
      }
      const dialogueWrap = document.createElement('div');
      dialogueWrap.className = 'dialogue-container';
      chapter.dialogues.forEach((d) => {
        const bubble = document.createElement('div');
        bubble.className = `dialogue-bubble ${d.speaker === 'A' ? 'speaker-a' : 'speaker-b'}`;
        bubble.innerHTML = `
          <div class="dialogue-speaker">স্পিকার ${d.speaker}</div>
          <div class="dialogue-de">${d.de}</div>
          <div class="dialogue-bn">${d.bn}</div>
        `;
        dialogueWrap.appendChild(bubble);
      });
      container.appendChild(dialogueWrap);
      break;

    case 'exercises':
      renderExerciseRunner(container, chapter);
      break;

    default:
      container.innerHTML = '<p style="color: var(--text-secondary);">বিভাগটি খুঁজে পাওয়া যায়নি।</p>';
      break;
  }
}

/**
 * Web Profile Screen Renderer
 */
export async function renderProfile(appContainer) {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  const user = getCurrentUser();
  const userProgress = getProgress();
  const overallPercent = getOverallProgressPercent(chapters.length);

  // Securely verify if active user is an authorized Super Admin
  const isSuperAdmin = await checkIsSuperAdmin(user);

  main.innerHTML = `
    <div style="margin-top: 12px; margin-bottom: 16px;">
      <a href="#/home" class="nav-back-btn" style="display: inline-flex;">← হোম পেজে ফিরুন</a>
    </div>

    <!-- User Identity Header Card -->
    <div class="card" style="margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--accent-yellow); color: #101010; font-size: 1.8rem; font-weight: 700; display: flex; align-items: center; justify-content: center;">
          ${(user.displayName || 'G').charAt(0).toUpperCase()}
        </div>
        <div style="flex: 1; min-width: 200px;">
          <h1 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: 2px;">${user.displayName || 'Learner'}</h1>
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 4px;">${user.email || 'Guest Session'}</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
            <span style="font-size: 0.75rem; background: rgba(255, 212, 0, 0.15); color: var(--accent-yellow); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(255, 212, 0, 0.3);">
              Provider: ${user.providerId || 'guest'}
            </span>
            ${isSuperAdmin ? `<span style="font-size: 0.75rem; background: rgba(230, 57, 70, 0.2); color: #FF8A8A; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--accent-red);">🛡️ Super Admin</span>` : ''}
          </div>
        </div>
      </div>
    </div>

    <!-- Learning Activity & Progress Card -->
    <div class="card" style="margin-bottom: 20px;">
      <h2 style="font-size: 1.15rem; color: var(--accent-yellow); margin-bottom: 12px;">📊 Learning Activity & Progress</h2>

      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
          <span>Course Completion</span>
          <span style="color: var(--accent-yellow); font-weight: 700;">${overallPercent}%</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar-fill" style="width: ${overallPercent}%;"></div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 16px;">
        <div style="background: #161616; padding: 12px; border-radius: 6px; border: 1px solid var(--border-color); text-align: center;">
          <div style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">${userProgress.completedChapters.length} / ${chapters.length}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">Completed Chapters</div>
        </div>
        <div style="background: #161616; padding: 12px; border-radius: 6px; border: 1px solid var(--border-color); text-align: center;">
          <div style="font-size: 1.4rem; font-weight: 700; color: var(--accent-yellow);">${Object.keys(userProgress.scores).length}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">Exercises Attempted</div>
        </div>
      </div>
    </div>

    <!-- Conditional Super Admin Panel Section -->
    ${isSuperAdmin ? `
    <div class="card" style="margin-bottom: 20px; border: 1px solid rgba(230, 57, 70, 0.4); background: rgba(230, 57, 70, 0.04);">
      <h2 style="font-size: 1.15rem; color: #FF8A8A; margin-bottom: 8px;">🛡️ Super Admin Control Panel</h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">
        As an authorized Super Admin, you can manage web advertising configuration dynamically via Firestore.
      </p>
      <a href="#/super-admin/adsense" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
        ⚙️ Manage AdSense Settings
      </a>
    </div>
    ` : ''}

    <!-- Account Management Card -->
    <div class="card" style="margin-bottom: 20px;">
      <h2 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 12px;">⚙️ Account Management</h2>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <a href="privacy-policy.html" style="padding: 12px; background: #161616; border-radius: 6px; color: var(--text-primary); text-decoration: none; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color);">
          <span>📄 Privacy Policy</span>
          <span style="color: var(--text-secondary);">→</span>
        </a>
        <a href="account-deletion.html" style="padding: 12px; background: #161616; border-radius: 6px; color: var(--accent-red); text-decoration: none; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color);">
          <span>🗑️ Delete Account</span>
          <span style="color: var(--accent-red);">→</span>
        </a>
      </div>

      ${!user.isGuest ? `
        <div style="margin-top: 20px;">
          <button id="btn-profile-logout" class="btn btn-secondary" style="width: 100%;">
            Sign Out
          </button>
        </div>
      ` : `
        <div style="margin-top: 20px;">
          <a href="#/login" class="btn btn-primary" style="display: block; text-align: center;">
            Sign In with Account
          </a>
        </div>
      `}
    </div>

    <!-- App Version & Environment Footer Badge -->
    <div style="text-align: center; color: var(--text-disabled); font-size: 0.82rem; margin-top: 20px;">
      App Version: ${APP_VERSION} | Environment: ${BUILD_ENV}
    </div>
  `;

  appContainer.appendChild(main);

  const logoutBtn = main.querySelector('#btn-profile-logout');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      logoutUser();
      navigateTo('/home');
    };
  }

  appContainer.appendChild(renderFooter());
}

/**
 * Super Admin AdSense Management Panel Renderer (`#/super-admin/adsense`)
 */
export async function renderSuperAdminAdSense(appContainer) {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  const user = getCurrentUser();
  const isSuperAdmin = await checkIsSuperAdmin(user);

  // Enforce Super Admin Authorization Check
  if (!isSuperAdmin) {
    main.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px 20px; margin-top: 40px; border: 1px solid var(--accent-red);">
        <h1 style="color: var(--accent-red); font-size: 2rem; margin-bottom: 12px;">🚫 Access Denied</h1>
        <p style="color: var(--text-primary); margin-bottom: 20px;">
          You do not have Super Admin permissions to access advertising configuration.
        </p>
        <a href="#/home" class="btn btn-primary">Return to Home</a>
      </div>
    `;
    appContainer.appendChild(main);
    appContainer.appendChild(renderFooter());
    return;
  }

  const currentConfig = getAdConfig();
  const webConfig = currentConfig.web || {};

  main.innerHTML = `
    <div style="margin-top: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
      <a href="#/profile" class="nav-back-btn" style="display: inline-flex;">← Back to Profile</a>
      <span style="font-size: 0.8rem; background: rgba(230, 57, 70, 0.2); color: #FF8A8A; padding: 4px 10px; border-radius: 4px; border: 1px solid var(--accent-red);">
        🛡️ Super Admin Access
      </span>
    </div>

    <div class="card" style="margin-bottom: 24px;">
      <h1 style="font-size: 1.5rem; color: var(--accent-yellow); margin-bottom: 6px;">AdSense Settings</h1>
      <p style="color: var(--text-secondary); font-size: 0.92rem;">
        GUI-based advertising management panel for Web Google AdSense. Changes are published to Firestore without needing code deployments.
      </p>

      <div id="admin-status-alert" style="display: none; padding: 12px 16px; border-radius: 6px; font-size: 0.9rem; margin-top: 16px;"></div>

      <form id="form-adsense-settings" style="margin-top: 24px;">
        <!-- AdSense Status: ON / OFF -->
        <div style="background: #161616; padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 20px;">
          <label style="display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
            📢 AdSense Status (Ads ON / OFF)
          </label>
          <div style="display: flex; gap: 16px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary);">
              <input type="radio" name="ads_status" value="on" ${currentConfig.enabled !== false ? 'checked' : ''} />
              <span>ON (Ads Enabled)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary);">
              <input type="radio" name="ads_status" value="off" ${currentConfig.enabled === false ? 'checked' : ''} />
              <span>OFF (Ads Disabled)</span>
            </label>
          </div>
        </div>

        <!-- Ad Mode: TEST / PRODUCTION -->
        <div style="background: #161616; padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 20px;">
          <label style="display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
            ⚙️ Ad Mode (TEST vs PRODUCTION)
          </label>
          <div style="display: flex; gap: 16px; margin-bottom: 12px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary);">
              <input type="radio" name="ad_mode" value="test" ${webConfig.mode === 'test' ? 'checked' : ''} />
              <span>TEST / Development Mode</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary);">
              <input type="radio" name="ad_mode" value="production" ${webConfig.mode !== 'test' ? 'checked' : ''} />
              <span>PRODUCTION Mode</span>
            </label>
          </div>

          <!-- Mode Explanation -->
          <div style="background: rgba(255, 212, 0, 0.08); border: 1px solid rgba(255, 212, 0, 0.25); padding: 12px; border-radius: 6px; font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
            <strong>ℹ️ Safe AdSense Mode Explanation:</strong><br/>
            Unlike Android AdMob, Google AdSense requires safe development handling. In <strong>TEST mode</strong>, the app displays a lightweight test layout verification placeholder to prevent accidental invalid ad impressions or clicks. In <strong>PRODUCTION mode</strong>, real configured AdSense ad slots are served.
          </div>
        </div>

        <!-- Production AdSense Configuration -->
        <div style="background: #161616; padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 24px;">
          <h3 style="font-size: 1rem; color: var(--accent-yellow); margin-bottom: 14px;">
            📋 Production AdSense Configuration
          </h3>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 6px;">
              Publisher ID (data-ad-client)
            </label>
            <input type="text" id="input-publisher-id" class="input-exercise" style="margin-bottom: 0;" required value="${webConfig.publisherId || 'ca-pub-2296246438593583'}" placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 6px;">
              Ad Slot ID (data-ad-slot)
            </label>
            <input type="text" id="input-ad-slot" class="input-exercise" style="margin-bottom: 0;" required value="${webConfig.adSlot || '7321969663'}" placeholder="7321969663" />
          </div>
        </div>

        <!-- Production Warnings (Visible to Super Admin only) -->
        <div style="background: rgba(230, 57, 70, 0.12); border: 1px solid var(--accent-red); padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 0.88rem; color: #FF8A8A; line-height: 1.6;">
          <div style="font-weight: 700; margin-bottom: 6px;">⚠️ Production Policy Warnings:</div>
          <ul style="margin-left: 20px; margin-top: 4px;">
            <li style="margin-bottom: 4px;">Production ads may not appear immediately. AdSense may require time to serve ads after configuration or account changes.</li>
            <li>Never click your own ads or encourage others to click them.</li>
          </ul>
        </div>

        <button type="submit" id="btn-save-adsense" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">
          [ Save AdSense Settings ]
        </button>
      </form>
    </div>
  `;

  appContainer.appendChild(main);

  const form = main.querySelector('#form-adsense-settings');
  const alertBox = main.querySelector('#admin-status-alert');

  form.onsubmit = async (e) => {
    e.preventDefault();
    const saveBtn = main.querySelector('#btn-save-adsense');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving to Firestore...';

    const enabled = main.querySelector('input[name="ads_status"]:checked').value === 'on';
    const mode = main.querySelector('input[name="ad_mode"]:checked').value;
    const publisherId = main.querySelector('#input-publisher-id').value.trim();
    const adSlot = main.querySelector('#input-ad-slot').value.trim();

    try {
      await saveAdConfigToFirestore({ mode, publisherId, adSlot }, enabled);
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(46, 125, 50, 0.2)';
      alertBox.style.border = '1px solid var(--success-color)';
      alertBox.style.color = '#81C784';
      alertBox.textContent = '✅ AdSense configuration successfully saved to Firestore!';
    } catch (err) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(230, 57, 70, 0.2)';
      alertBox.style.border = '1px solid var(--accent-red)';
      alertBox.style.color = '#FF8A8A';
      alertBox.textContent = '❌ ' + err.message;
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = '[ Save AdSense Settings ]';
    }
  };

  appContainer.appendChild(renderFooter());
}

export function renderLogin(appContainer) {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  main.innerHTML = `
    <div style="max-width: 400px; margin: 40px auto;" class="card">
      <h2 style="color: var(--accent-yellow); margin-bottom: 20px; text-align: center;">লগইন করুন</h2>

      <div id="auth-error" style="color: var(--accent-red); margin-bottom: 12px; font-size: 0.9rem; display: none;"></div>

      <form id="form-login">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-size: 0.9rem;">ইমেইল ঠিকানা</label>
          <input type="email" id="login-email" class="input-exercise" style="margin-bottom: 0;" required placeholder="example@mail.com" />
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 6px; font-size: 0.9rem;">পাসওয়ার্ড</label>
          <input type="password" id="login-password" class="input-exercise" style="margin-bottom: 0;" required placeholder="••••••••" />
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 12px;">লগইন করুন</button>
      </form>

      <button id="btn-guest-login" class="btn btn-secondary" style="width: 100%; margin-bottom: 16px;">গেস্ট হিসেবে চালিয়ে যান</button>

      <p style="text-align: center; font-size: 0.9rem; color: var(--text-secondary);">
        অ্যাকাউন্ট নেই? <a href="#/register">রেজিস্টার করুন</a>
      </p>
    </div>
  `;

  appContainer.appendChild(main);

  const errorDiv = main.querySelector('#auth-error');
  const loginForm = main.querySelector('#form-login');

  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = main.querySelector('#login-email').value;
    const pass = main.querySelector('#login-password').value;
    try {
      await loginWithEmail(email, pass);
      navigateTo('/home');
    } catch (err) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = err.message;
    }
  };

  main.querySelector('#btn-guest-login').onclick = async () => {
    await loginAsGuest();
    navigateTo('/home');
  };

  appContainer.appendChild(renderFooter());
}

export function renderRegister(appContainer) {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  main.innerHTML = `
    <div style="max-width: 400px; margin: 40px auto;" class="card">
      <h2 style="color: var(--accent-yellow); margin-bottom: 20px; text-align: center;">নতুন অ্যাকাউন্ট খুলুন</h2>

      <div id="auth-error" style="color: var(--accent-red); margin-bottom: 12px; font-size: 0.9rem; display: none;"></div>

      <form id="form-register">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-size: 0.9rem;">ইমেইল ঠিকানা</label>
          <input type="email" id="reg-email" class="input-exercise" style="margin-bottom: 0;" required placeholder="example@mail.com" />
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 6px; font-size: 0.9rem;">পাসওয়ার্ড (নূন্যতম ৬ অক্ষর)</label>
          <input type="password" id="reg-password" class="input-exercise" style="margin-bottom: 0;" required placeholder="••••••••" />
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 12px;">নিবন্ধন সম্পন্ন করুন</button>
      </form>

      <p style="text-align: center; font-size: 0.9rem; color: var(--text-secondary);">
        ইতিমধ্যে অ্যাকাউন্ট আছে? <a href="#/login">লগইন করুন</a>
      </p>
    </div>
  `;

  appContainer.appendChild(main);

  const errorDiv = main.querySelector('#auth-error');
  const regForm = main.querySelector('#form-register');

  regForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = main.querySelector('#reg-email').value;
    const pass = main.querySelector('#reg-password').value;
    try {
      await registerWithEmail(email, pass);
      navigateTo('/home');
    } catch (err) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = err.message;
    }
  };

  appContainer.appendChild(renderFooter());
}

export function renderNotFound(appContainer) {
  appContainer.innerHTML = '';
  appContainer.appendChild(renderHeader(appContainer));

  const main = document.createElement('main');
  main.className = 'main-content container';

  main.innerHTML = `
    <div class="card" style="text-align: center; padding: 40px 20px; margin-top: 40px;">
      <h1 style="color: var(--accent-yellow); font-size: 2.5rem; margin-bottom: 12px;">404</h1>
      <h2 style="margin-bottom: 12px;">পৃষ্ঠাটি পাওয়া যায়নি</h2>
      <p style="color: var(--text-secondary); margin-bottom: 24px;">আপনি যে ঠিকানাটি খুঁজছেন তা বিদ্যমান নেই বা সরিয়ে ফেলা হয়েছে।</p>
      <a href="#/home" class="btn btn-primary">হোম পেজে ফিরে যান</a>
    </div>
  `;

  appContainer.appendChild(main);
  appContainer.appendChild(renderFooter());
}
