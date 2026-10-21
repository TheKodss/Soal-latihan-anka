const answerKey = {
  p1_flight_mode: ['hold - roll', 'hold-roll', 'hold roll'],
  p1_airspeed: ['1.2 vs', '1.2vs', '1.2'],
  p1_actuator_1: ['float'],
  p1_actuator_2: ['reset'],
  p1_actuator_remain: ['float'],
  p1_rirv: ['left'],
  p1_rorv: ['left'],
  p1_lirv: ['right'],
  p1_lorv: ['right'],
  p1_ria: ['right'],
  p1_roa: ['right'],
  p1_lia: ['left'],
  p1_loa: ['left'],
  p1_autoland: ['verify degraded', 'verifydegraded', 'degraded'],

  p2_flight_mode: ['hold - thr', 'hold-thr', 'hold thr'],
  p2_eng_thr_1: ['decrease'],
  p2_airspeed: ['adjust'],
  p2_eng_thr_2: ['as required', 'asrequired', 'required'],
  p2_eng_rpm: ['check'],
  p2_autoland: ['consider degraded', 'considerdegraded', 'degraded'],

  p3_flight_mode: ['hold - thr', 'hold-thr', 'hold thr'],
  p3_eng_thr: ['as required', 'asrequired', 'required'],
  p3_fuel_pump: ['on'],
  p3_electrical_loads: ['consider off', 'consideroff', 'off'],
  p3_autoland: ['degraded'],

  p4_gear_ext: ['force ext', 'forceext', 'force ext.'],
  p4_fuel_quantity: ['decrease'],
  p4_eoir_camera: ['stow'],
  p4_autoland: ['consider pos 1 or pos 2', 'consider pos1 or pos2', 'pos 1 or pos 2', 'pos1 or pos2'],
  p4_engine: ['cut, at touchdown', 'cut at touchdown', 'cut'],
  p4_flight_mode: ['consider backup at touchdown', 'consider backup', 'backup'],
  p4_brakes: ['as required', 'asrequired', 'required']
};

let showingAnswers = false;

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/°/g, 'deg')
    .replace(/±/g, '+/-')
    .replace(/\s+/g, '')
    .replace(/,/g, '.')
    .replace(/\+/g, 'plus')
    .trim();
}

function getAllInputs() {
  return [...document.querySelectorAll('input[type="text"]')];
}

function updateProgress() {
  const inputs = getAllInputs();
  const answered = inputs.filter((input) => input.value.trim() !== '').length;
  const percent = inputs.length ? Math.round((answered / inputs.length) * 100) : 0;

  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
}

function getFieldLabel(id) {
  const field = document.getElementById(id);
  if (!field) return id;

  if (field.dataset && field.dataset.label) return field.dataset.label;

  const prompt = field.closest('.fill-row')?.querySelector('.prompt');
  if (prompt) return prompt.textContent.trim();

  const td = field.closest('td');
  if (td && td.previousElementSibling) {
    return td.previousElementSibling.textContent.trim();
  }

  return id;
}

function renderAnswerPanel() {
  const panel = document.getElementById('answer-panel');
  if (!panel) return;

  const rows = Object.entries(answerKey)
    .map(([id, options]) => {
      const label = getFieldLabel(id);
      const firstAnswer = options[0] || '—';
      return `<li><strong>${label}</strong><span>${firstAnswer}</span></li>`;
    })
    .join('');

  panel.innerHTML = `
    <h3>Kunci Jawaban</h3>
    <ul>${rows}</ul>
  `;
  panel.classList.remove('hidden');
}

function hideAnswerPanel() {
  const panel = document.getElementById('answer-panel');
  if (panel) {
    panel.classList.add('hidden');
    panel.innerHTML = '';
  }
}

function saveAnswers() {
  const answers = {};
  getAllInputs().forEach((input) => {
    answers[input.id] = input.value;
  });
  localStorage.setItem('anka_answers', JSON.stringify(answers));
  updateProgress();
}

function loadAnswers() {
  const saved = JSON.parse(localStorage.getItem('anka_answers') || '{}');
  Object.entries(saved).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input) input.value = value;
  });
  updateProgress();
}

function setActivePage(pageId) {
  document.querySelectorAll('.page-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.page === pageId);
  });

  document.querySelectorAll('.nav-btn, .page-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.pageTarget === pageId);
  });
}

function toggleAnswers() {
  if (!showingAnswers) {
    const inputs = getAllInputs();

    inputs.forEach((input) => {
      const id = input.id;
      const keys = answerKey[id];
      const hasValue = input.value.trim() !== '';

      if (!keys) return;
      if (hasValue) {
        input.dataset.autoFilled = 'false';
        input.classList.remove('auto-filled');
        return;
      }

      const correctAnswer = keys[0];
      input.value = correctAnswer;
      input.dataset.autoFilled = 'true';
      input.classList.add('auto-filled');
    });

    showingAnswers = true;
    const btn = document.getElementById('btn-toggle-ans');
    if (btn) btn.textContent = 'Sembunyikan Jawaban';
    renderAnswerPanel();
    return;
  }

  getAllInputs().forEach((input) => {
    if (input.dataset.autoFilled === 'true') {
      input.value = '';
      input.classList.remove('auto-filled');
      input.dataset.autoFilled = 'false';
    }
  });

  showingAnswers = false;
  const btn = document.getElementById('btn-toggle-ans');
  if (btn) btn.textContent = 'Tampilkan Jawaban';
  hideAnswerPanel();
}

function checkAnswers() {
  hideAnswerPanel();

  let correctCount = 0;
  let wrongCount = 0;
  let emptyCount = 0;
  const inputs = getAllInputs();

  document.querySelectorAll('.correction-text').forEach((el) => el.remove());

  inputs.forEach((input) => {
    const id = input.id;
    const value = input.value.trim();
    const keys = answerKey[id] || [];

    input.classList.remove('correct', 'incorrect');

    if (!value) {
      emptyCount += 1;
      return;
    }

    const isCorrect = keys.some((key) => normalize(key) === normalize(value));

    if (isCorrect) {
      input.classList.add('correct');
      correctCount += 1;
    } else {
      input.classList.add('incorrect');
      wrongCount += 1;

      const note = document.createElement('span');
      note.className = 'correction-text no-print';
      note.textContent = `(${keys[0] || 'Jawaban referensi'})`;
      input.parentNode.insertBefore(note, input.nextSibling);
    }
  });

  const statBenar = document.getElementById('stat-benar');
  const statSalah = document.getElementById('stat-salah');
  const statKosong = document.getElementById('stat-kosong');
  const statNilai = document.getElementById('stat-nilai');
  const statsContainer = document.getElementById('stats-container');

  if (statBenar) statBenar.textContent = String(correctCount);
  if (statSalah) statSalah.textContent = String(wrongCount);
  if (statKosong) statKosong.textContent = String(emptyCount);
  if (statNilai) statNilai.textContent = String(Math.round((correctCount / inputs.length) * 100));
  if (statsContainer) statsContainer.style.display = 'block';
}

function resetTraining() {
  const confirmed = window.confirm('Yakin ingin menghapus semua jawaban dan mengulang dari awal?');
  if (!confirmed) return;

  localStorage.removeItem('anka_answers');
  getAllInputs().forEach((input) => {
    input.value = '';
    input.disabled = false;
    input.classList.remove('correct', 'incorrect', 'auto-filled');
    input.dataset.autoFilled = 'false';
  });

  document.querySelectorAll('.correction-text').forEach((el) => el.remove());
  hideAnswerPanel();

  const stats = document.getElementById('stats-container');
  if (stats) stats.style.display = 'none';

  const btnToggle = document.getElementById('btn-toggle-ans');
  if (btnToggle) btnToggle.textContent = 'Tampilkan Jawaban';

  showingAnswers = false;
  updateProgress();
}

function bindEvents() {
  getAllInputs().forEach((input) => {
    input.addEventListener('input', () => {
      if (input.dataset.autoFilled === 'true') {
        input.dataset.autoFilled = 'false';
        input.classList.remove('auto-filled');
      }

      saveAnswers();
      hideAnswerPanel();
      if (showingAnswers) {
        showingAnswers = false;
        const btnToggle = document.getElementById('btn-toggle-ans');
        if (btnToggle) btnToggle.textContent = 'Tampilkan Jawaban';
      }
    });
  });

  document.querySelectorAll('.page-nav-btn, .page-tab').forEach((button) => {
    button.addEventListener('click', () => {
      const targetPage = button.dataset.pageTarget;
      if (targetPage) setActivePage(targetPage);
    });
  });

  document.getElementById('btn-koreksi').addEventListener('click', checkAnswers);
  document.getElementById('btn-reset').addEventListener('click', resetTraining);
  document.getElementById('btn-toggle-ans').addEventListener('click', toggleAnswers);
  document.getElementById('btn-print').addEventListener('click', () => window.print());
}

document.addEventListener('DOMContentLoaded', () => {
  getAllInputs().forEach((input) => {
    input.dataset.autoFilled = 'false';
    input.classList.remove('auto-filled');
  });

  hideAnswerPanel();
  loadAnswers();
  setActivePage('page-1');
  bindEvents();
  updateProgress();
});
