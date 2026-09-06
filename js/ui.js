// Main UI Screen Renderers
import { chapters } from '../data/index.js';
import { getCurrentUser, logoutUser, loginAsGuest, loginWithEmail, registerWithEmail } from './auth.js';
import { getProgress, getOverallProgressPercent } from './progress.js';
import { renderExerciseRunner } from './exercises.js';
import { navigateTo } from './router.js';

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
        <span class="user-badge">${user.displayName || 'Guest Learner'}</span>
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
      <p style="color: var(--text-secondary); font-size: 0.95rem;">সহজ বাংলায় জার্মান ভাষার সম্পূর্ণ A1 কোর্স কোর্সটি সম্পন্ন করুন এবং আপনার জার্মানি যাওয়ার স্বপ্ন পূরণ করুন!</p>

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

    <!-- Chapter Grid -->
    <h2 style="font-size: 1.3rem; margin-top: 28px; margin-bottom: 12px; color: var(--text-primary);">অধ্যায়সমূহ (12 Chapters)</h2>
    <div class="chapter-grid" id="chapter-list"></div>
  `;

  appContainer.appendChild(main);

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
  `;

  appContainer.appendChild(main);

  const tabBtns = main.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn) => {
    btn.onclick = () => {
      const targetSection = btn.dataset.section;
      navigateTo(`/chapter/${chapter.id}/${targetSection}`);
    };
  });

  const tabContent = main.querySelector('#tab-content');
  renderTabSection(tabContent, chapter, activeSection);
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

  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = main.querySelector('#login-email').value;
    const pass = main.querySelector('#login-password').value;
    try {
      loginWithEmail(email, pass);
      navigateTo('/home');
    } catch (err) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = err.message;
    }
  };

  main.querySelector('#btn-guest-login').onclick = () => {
    loginAsGuest();
    navigateTo('/home');
  };
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

  regForm.onsubmit = (e) => {
    e.preventDefault();
    const email = main.querySelector('#reg-email').value;
    const pass = main.querySelector('#reg-password').value;
    try {
      registerWithEmail(email, pass);
      navigateTo('/home');
    } catch (err) {
      errorDiv.style.display = 'block';
      errorDiv.textContent = err.message;
    }
  };
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
}
