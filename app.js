const STORAGE_KEY = 'anka_training_answers_v1';

const state = {
  showingAnswers: false,
  mode: 'training'
};

function normalize(value) {
  return String(value || '')
    .replace(/\u00A0/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, ' ')
    .replace(/,/g, '.')
    .replace(/\./g, '')
    .replace(/\s+/g, ' ');
}

function getAllInputs() {
  return [...document.querySelectorAll('.answer-input')];
}

function setMode(mode) {
  state.mode = mode;
  document.body.dataset.mode = mode;

  document.querySelectorAll('.mode-btn').forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
  });

  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) {
    toggleBtn.disabled = mode === 'exam';
    if (mode === 'exam') {
      toggleBtn.textContent = 'Tampilkan Jawaban';
      state.showingAnswers = false;
      removeAutoFilled();
    }
  }
}

function getFirstPageKey() {
  const activeTab = document.querySelector('.page-tab.active');
  if (activeTab) return activeTab.dataset.tab || activeTab.dataset.page;
  const firstTab = document.querySelector('.page-tab');
  return firstTab ? (firstTab.dataset.tab || firstTab.dataset.page || 'tab-1') : 'tab-1';
}

function setPage(pageKey) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach((section) => {
    const isActive = (section.dataset.tab || section.dataset.page) === pageKey;
    section.classList.toggle('active', isActive);
  });

  document.querySelectorAll('.page-tab').forEach((button) => {
    const match = (button.dataset.tab || button.dataset.page) === pageKey;
    button.classList.toggle('active', match);
  });
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

    const accepted = (input.dataset.answer || '').split('|').map((item) => item.trim());
    const isCorrect = accepted.some((answer) => normalize(answer) === normalize(value));

    if (isCorrect) {
      correct += 1;
    } else {
      wrong += 1;
    }
  });

  return { correct, wrong, empty };
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
  if (map.nilai) map.nilai.textContent = String(score);
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
      input.value = answer;
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
  if (statsPanel) {
    statsPanel.hidden = false;
  }

  document.querySelectorAll('.correction-text').forEach((node) => node.remove());

  let correct = 0;
  let wrong = 0;
  let empty = 0;

  getAllInputs().forEach((input) => {
    const value = input.value.trim();
    const answerList = (input.dataset.answer || '').split('|').map((item) => item.trim());

    input.classList.remove('correct', 'incorrect');

    if (!value) {
      empty += 1;
      return;
    }

    const isCorrect = answerList.some((answer) => normalize(answer) === normalize(value));
    if (isCorrect) {
      input.classList.add('correct');
      correct += 1;
    } else {
      input.classList.add('incorrect');
      wrong += 1;

      const note = document.createElement('span');
      note.className = 'correction-text';
      note.textContent = `(${answerList[0] || 'Jawaban referensi'})`;
      input.parentNode.appendChild(note);
    }
  });

  const total = correct + wrong + empty;
  const score = total ? Math.round((correct / total) * 100) : 0;

  const map = {
    benar: document.getElementById('stat-benar'),
    salah: document.getElementById('stat-salah'),
    kosong: document.getElementById('stat-kosong'),
    nilai: document.getElementById('stat-nilai')
  };

  if (map.benar) map.benar.textContent = String(correct);
  if (map.salah) map.salah.textContent = String(wrong);
  if (map.kosong) map.kosong.textContent = String(empty);
  if (map.nilai) map.nilai.textContent = String(score);
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
    button.addEventListener('click', () => {
      const pageKey = button.dataset.tab || button.dataset.page;
      setPage(pageKey);
    });
  });

  document.querySelectorAll('.mode-btn').forEach((button) => {
    button.addEventListener('click', () => {
      setMode(button.dataset.mode);
    });
  });

  const checkBtn = document.getElementById('check-btn');
  if (checkBtn) {
    checkBtn.addEventListener('click', checkAnswers);
  }

  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleShowAnswers);
  }

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  }

  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

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
  setMode(document.body.dataset.mode || 'training');
  setPage(getFirstPageKey());
  updateStats();
});
