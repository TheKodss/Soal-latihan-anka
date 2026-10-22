const STORAGE_KEY = 'anka_male_uav_training_answers_v1';

const state = {
  mode: 'training',
  showingAnswers: false
};

function normalize(value) {
  return String(value || '')
    .replace(/\u00A0/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/[\u00b0\u00ba]/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/kias|kts|knots?|deg|degrees|km|kgs?|kg|psi|bar|ft|msl|v|volts?|amps?|c|percent|vs|%/g, ' ')
    .replace(/[,]/g, '.')
    .replace(/\./g, '')
    .replace(/[^0-9+\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function exactAnswerMatch(answer, value) {
  return normalize(answer) === normalize(value);
}

function numericAnswerMatch(answer, value) {
  const answerDigits = String(answer || '').replace(/[^\d-]/g, '');
  const valueDigits = String(value || '').replace(/[^\d-]/g, '');

  return Boolean(answerDigits && valueDigits && answerDigits === valueDigits);
}

function isAnswerCorrect(answer, value) {
  return exactAnswerMatch(answer, value) || numericAnswerMatch(answer, value);
}

function getAllInputs() {
  return [...document.querySelectorAll('.answer-input')];
}

function setMode(mode) {
  state.mode = mode;
  document.body.dataset.mode = mode;

  document.querySelectorAll('.mode-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });

  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) {
    toggleBtn.disabled = mode === 'exam';
    if (mode === 'exam') {
      toggleBtn.textContent = 'Tampilkan Jawaban';
      state.showingAnswers = false;
      removeAutoFilled();
    } else {
      toggleBtn.textContent = state.showingAnswers ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban';
    }
  }
}

function getPageKey() {
  const activeTab = document.querySelector('.page-tab.active');
  if (activeTab) return activeTab.dataset.page;
  return 'tab-1';
}

function setPage(pageKey) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach((section) => {
    const match = section.dataset.page === pageKey;
    section.classList.toggle('active', match);
  });

  document.querySelectorAll('.page-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageKey);
  });
}

function updateStats() {
  const stats = evaluateAnswers();
  const total = stats.correct + stats.wrong + stats.empty;
  const score = total ? Math.round((stats.correct / total) * 100) : 0;

  const map = {
    benar: document.getElementById('stat-benar'),
    salah: document.getElementById('stat-salah'),
    kosong: document.getElementById('stat-kosong'),
    nilai: document.getElementById('stat-nilai')
  };

  if (map.benar) map.benar.textContent = String(stats.correct);
  if (map.salah) map.salah.textContent = String(stats.wrong);
  if (map.kosong) map.kosong.textContent = String(stats.empty);
  if (map.nilai) map.nilai.textContent = String(score) + '%';
}

function evaluateAnswers() {
  let correct = 0;
  let wrong = 0;
  let empty = 0;

  getAllInputs().forEach((input) => {
    const value = input.value.trim();
    if (!value) {
      empty += 1;
      return;
    }

    const accepted = (input.dataset.answer || '')
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    const isCorrect = accepted.some((answer) => isAnswerCorrect(answer, value));

    if (isCorrect) {
      correct += 1;
    } else {
      wrong += 1;
    }
  });

  return { correct, wrong, empty };
}

function saveAnswers() {
  const payload = {};
  getAllInputs().forEach((input) => {
    payload[input.id] = input.value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  updateStats();
}

function loadAnswers() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    Object.entries(saved).forEach(([id, value]) => {
      const input = document.getElementById(id);
      if (input) {
        input.value = value || '';
      }
    });
  } catch (error) {
    console.warn('Tidak ada data tersimpan.', error);
  }
  updateStats();
}

function applyAutoFilled() {
  getAllInputs().forEach((input) => {
    const answer = (input.dataset.answer || '').trim();
    if (!input.value.trim() && answer && input.dataset.autoFilled !== 'true') {
      input.value = answer.split('|')[0].trim();
      input.classList.add('auto-filled');
      input.dataset.autoFilled = 'true';
    }
  });
}

function removeAutoFilled() {
  getAllInputs().forEach((input) => {
    if (input.dataset.autoFilled === 'true') {
      input.value = '';
      input.classList.remove('auto-filled');
      delete input.dataset.autoFilled;
    }
  });
}

function toggleShowAnswers() {
  const toggleBtn = document.getElementById('toggle-btn');

  if (state.mode === 'exam') {
    if (toggleBtn) toggleBtn.disabled = true;
    return;
  }

  if (!state.showingAnswers) {
    applyAutoFilled();
    state.showingAnswers = true;
    if (toggleBtn) toggleBtn.textContent = 'Sembunyikan Jawaban';
  } else {
    removeAutoFilled();
    state.showingAnswers = false;
    if (toggleBtn) toggleBtn.textContent = 'Tampilkan Jawaban';
  }

  saveAnswers();
}

function checkAnswers() {
  const statsPanel = document.getElementById('stats-panel');
  if (statsPanel) statsPanel.hidden = false;

  document.querySelectorAll('.correction-text').forEach((node) => node.remove());

  let correct = 0;
  let wrong = 0;
  let empty = 0;

  getAllInputs().forEach((input) => {
    const value = input.value.trim();
    const accepted = (input.dataset.answer || '')
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    input.classList.remove('correct', 'incorrect');

    if (!value) {
      empty += 1;
      return;
    }

    const isCorrect = accepted.some((answer) => isAnswerCorrect(answer, value));
    if (isCorrect) {
      input.classList.add('correct');
      correct += 1;
    } else {
      input.classList.add('incorrect');
      wrong += 1;

      const note = document.createElement('span');
      note.className = 'correction-text';
      note.textContent = `(${accepted[0] || 'Jawaban referensi'})`;
      input.parentNode.appendChild(note);
    }
  });

  const map = {
    benar: document.getElementById('stat-benar'),
    salah: document.getElementById('stat-salah'),
    kosong: document.getElementById('stat-kosong'),
    nilai: document.getElementById('stat-nilai')
  };

  const total = correct + wrong + empty;
  const score = total ? Math.round((correct / total) * 100) : 0;

  if (map.benar) map.benar.textContent = String(correct);
  if (map.salah) map.salah.textContent = String(wrong);
  if (map.kosong) map.kosong.textContent = String(empty);
  if (map.nilai) map.nilai.textContent = String(score) + '%';
}

function resetForm() {
  const confirmed = window.confirm('Apakah Anda yakin ingin menghapus semua jawaban?');
  if (!confirmed) return;

  getAllInputs().forEach((input) => {
    input.value = '';
    input.classList.remove('correct', 'incorrect', 'auto-filled');
    delete input.dataset.autoFilled;
  });

  document.querySelectorAll('.correction-text').forEach((node) => node.remove());
  state.showingAnswers = false;

  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) toggleBtn.textContent = 'Tampilkan Jawaban';

  const statsPanel = document.getElementById('stats-panel');
  if (statsPanel) statsPanel.hidden = true;

  localStorage.removeItem(STORAGE_KEY);
  updateStats();
}

function bindEvents() {
  document.querySelectorAll('.page-tab').forEach((button) => {
    button.addEventListener('click', () => setPage(button.dataset.page));
  });

  document.querySelectorAll('.mode-btn').forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });

  const checkBtn = document.getElementById('check-btn');
  if (checkBtn) checkBtn.addEventListener('click', checkAnswers);

  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleShowAnswers);

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) resetBtn.addEventListener('click', resetForm);

  getAllInputs().forEach((input) => {
    input.addEventListener('input', () => {
      if (input.dataset.autoFilled === 'true') {
        input.dataset.autoFilled = 'false';
        input.classList.remove('auto-filled');
      }
      saveAnswers();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadAnswers();
  bindEvents();
  setMode('training');
  setPage(getPageKey());
  updateStats();
});

window.addEventListener('beforeunload', () => {
  saveAnswers();
});
