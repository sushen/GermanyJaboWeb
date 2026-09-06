// Data-driven Exercise Engine
import { saveExerciseScore } from './progress.js';

let currentExercises = [];
let currentChapterId = null;
let currentIndex = 0;
let userAnswers = {};
let score = 0;

export function renderExerciseRunner(container, chapter) {
  currentChapterId = chapter.id;
  currentExercises = chapter.exercises || [];
  currentIndex = 0;
  userAnswers = {};
  score = 0;

  renderCurrentQuestion(container);
}

function renderCurrentQuestion(container) {
  container.innerHTML = '';

  if (!currentExercises || currentExercises.length === 0) {
    container.innerHTML = `
      <div class="card">
        <h3>এই অধ্যায়ে অনুশীলনী প্রস্তুত হচ্ছে।</h3>
        <p style="color: var(--text-secondary); margin-top: 8px;">শীঘ্রই আরও নতুন অনুশীলন যুক্ত করা হবে।</p>
      </div>
    `;
    return;
  }

  if (currentIndex >= currentExercises.length) {
    renderExerciseResults(container);
    return;
  }

  const ex = currentExercises[currentIndex];
  const card = document.createElement('div');
  card.className = 'exercise-card';

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span style="font-weight: 700; color: var(--accent-yellow);">প্রশ্ন ${currentIndex + 1} / ${currentExercises.length}</span>
    </div>
    <div class="exercise-question">${ex.question}</div>
    <div id="exercise-interaction"></div>
    <div id="exercise-feedback"></div>
    <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
      <button id="btn-submit-exercise" class="btn btn-primary" disabled>যাচাই করুন</button>
    </div>
  `;

  container.appendChild(card);

  const interactionDiv = card.querySelector('#exercise-interaction');
  const submitBtn = card.querySelector('#btn-submit-exercise');
  const feedbackDiv = card.querySelector('#exercise-feedback');

  let selectedOption = null;

  if (ex.type === 'multiple_choice' || ex.type === 'fill_blank') {
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'options-grid';

    ex.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.onclick = () => {
        optionsGrid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = idx;
        submitBtn.disabled = false;
      };
      optionsGrid.appendChild(btn);
    });

    interactionDiv.appendChild(optionsGrid);
  }

  submitBtn.onclick = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === ex.correctAnswer;
    if (isCorrect) score++;

    // Disable choices
    const optionBtns = interactionDiv.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === ex.correctAnswer) {
        btn.classList.add('correct');
      } else if (idx === selectedOption) {
        btn.classList.add('incorrect');
      }
    });

    feedbackDiv.className = `exercise-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackDiv.textContent = isCorrect ? '✓ চমৎকার! আপনার উত্তর সঠিক হয়েছে।' : '✕ ভুল উত্তর! সঠিক উত্তরটি সবুজ চিহ্নে নির্দেশ করা হয়েছে।';

    submitBtn.textContent = currentIndex + 1 < currentExercises.length ? 'পরবর্তী প্রশ্ন →' : 'ফলাফল দেখুন →';
    submitBtn.disabled = false;

    submitBtn.onclick = () => {
      currentIndex++;
      renderCurrentQuestion(container);
    };
  };
}

function renderExerciseResults(container) {
  const percent = Math.round((score / currentExercises.length) * 100);
  saveExerciseScore(currentChapterId, percent);

  container.innerHTML = `
    <div class="card" style="text-align: center; padding: 36px 20px;">
      <h2 style="color: var(--accent-yellow); margin-bottom: 12px;">অনুশীলনী সমাপ্ত!</h2>
      <p style="font-size: 1.2rem; margin-bottom: 20px;">আপনার মোট নম্বর: <strong>${score} / ${currentExercises.length}</strong> (${percent}%)</p>

      <p style="color: var(--text-secondary); margin-bottom: 24px;">
        ${percent >= 70 ? '🎉 অভিনন্দন! আপনি এই অধ্যায়ে সফলভাবে পাস করেছেন।' : '💡 আরেকবার চেষ্টা করে আপনার দক্ষতা আরও বাড়িয়ে নিন।'}
      </p>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button id="btn-retry-ex" class="btn btn-secondary">পুনরায় চেষ্টা করুন</button>
        <a href="#/home" class="btn btn-primary">হোম পেজে ফিরুন</a>
      </div>
    </div>
  `;

  container.querySelector('#btn-retry-ex').onclick = () => {
    currentIndex = 0;
    score = 0;
    renderCurrentQuestion(container);
  };
}
