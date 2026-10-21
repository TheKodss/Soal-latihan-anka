const answerKey = {
  'p1-1': ['HOLD - ROLL'],
  'p1-2': ['1.2 Vs'],
  'p1-3': ['FLOAT'],
  'p1-4': ['RESET'],
  'p1-5': ['FLOAT'],
  'p1-6': ['LAND AS SOON AS PRACTICABLE'],
  'p1-7': ['Left'],
  'p1-8': ['Left'],
  'p1-9': ['Right'],
  'p1-10': ['Right'],
  'p1-11': ['Right'],
  'p1-12': ['Right'],
  'p1-13': ['Left'],
  'p1-14': ['Left'],
  'p1-15': ['Verify DEGRADED'],

  'p2-1': ['HOLD - THR'],
  'p2-2': ['Decrease'],
  'p2-3': ['Adjust'],
  'p2-4': ['As Required'],
  'p2-5': ['Check'],
  'p2-6': ['LAND AS SOON AS PRACTICABLE'],
  'p2-7': ['LAND AS SOON AS POSSIBLE'],
  'p2-8': ['Consider DEGRADED'],

  'p3-1': ['HOLD - THR'],
  'p3-2': ['As Required'],
  'p3-3': ['On'],
  'p3-4': ['Consider OFF'],
  'p3-5': ['LAND AS SOON AS POSSIBLE'],
  'p3-6': ['DEGRADED'],

  'p4-1': ['FORCE EXT'],
  'p4-3': ['Decrease'],
  'p4-4': ['STOW'],
  'p4-5': ['Consider POS 1 or POS 2'],
  'p4-6': ['CUT, at Touchdown'],
  'p4-7': ['Consider BACKUP at Touchdown'],
  'p4-8': ['As Required']
};

let showingAnswers = false;

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[\u00A0]/g, ' ')
    .replace(/[-_]/g, ' ')
    .replace(/,/g, '.')
    .replace(/\./g, '');
}

function getAllInputs() {
  return [...document.querySelectorAll('input[type="text"]')];
}

function updateProgress() {
  const inputs = getAllInputs();
  const answered = inputs.filter((input) => input.value.trim() !== '').length;
  const value = inputs.length ? Math.round((answered / inputs.length) * 100) : 0;

  const statBenar = document.getElementById('stat-benar');
  const statSalah = document.getElementById('stat-salah');
  const statKosong = document.getElementById('stat-kosong');
  const statNilai = document.getElementById('stat-nilai');

  if (statBenar && statSalah && statKosong && statNilai) {
    const counts = evaluateAnswers();
    statBenar.textContent = String(counts.correct);
    statSalah.textContent = String(counts.wrong);
    statKosong.textContent = String(counts.empty);
    statNilai.textContent = String(value);
  }
}

function evaluateAnswers() {
  let correct = 0;
  let wrong = 0;
  let empty = 0;

  getAllInputs().forEach((input) => {
    const key = answerKey[input.id];
    const currentValue = input.value.trim();

    if (!currentValue) {
      empty += 1;
      return;
    }

    const isCorrect = (key || []).some((answer) => normalize(answer) === normalize(currentValue));
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
  localStorage.setItem('anka_emergency_answers', JSON.stringify(payload));
  updateProgress();
}

function loadAnswers() {
  try {
    const saved = JSON.parse(localStorage.getItem('anka_emergency_answers') || '{}');
    Object.entries(saved).forEach(([id, value]) => {
      const input = document.getElementById(id);
      if (input) {
        input.value = value || '';
      }
    });
  } catch (error) {
    console.warn('Tidak ada data tersimpan.', error);
  }
  updateProgress();
}

function setPage(pageId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach((section) => {
    section.classList.toggle('active', section.dataset.page === pageId);
  });

  document.querySelectorAll('.page-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageId);
  });
}

function toggleAnswers() {
  const button = document.getElementById('toggle-btn');

  if (!showingAnswers) {
    getAllInputs().forEach((input) => {
      const key = answerKey[input.id];
      if (!input.value.trim() && key && key.length) {
        input.value = key[0];
        input.classList.add('auto-filled');
        input.dataset.autoFilled = 'true';
      }
    });
    showingAnswers = true;
    if (button) button.textContent = 'Sembunyikan Jawaban';
  } else {
    getAllInputs().forEach((input) => {
      if (input.dataset.autoFilled === 'true') {
        input.value = '';
        input.classList.remove('auto-filled');
        delete input.dataset.autoFilled;
      }
    });
    showingAnswers = false;
    if (button) button.textContent = 'Tampilkan Jawaban';
  }

  saveAnswers();
}

function checkAnswers() {
  const statsPanel = document.getElementById('stats-panel');
  const inputs = getAllInputs();

  document.querySelectorAll('.correction-text').forEach((node) => node.remove());

  let correct = 0;
  let wrong = 0;
  let empty = 0;

  inputs.forEach((input) => {
    const value = input.value.trim();
    const key = answerKey[input.id] || [];

    input.classList.remove('correct', 'incorrect');

    if (!value) {
      empty += 1;
      return;
    }

    if (key.some((answer) => normalize(answer) === normalize(value))) {
      input.classList.add('correct');
      correct += 1;
    } else {
      input.classList.add('incorrect');
      wrong += 1;

      const note = document.createElement('span');
      note.className = 'correction-text';
      note.textContent = `(${key[0] || 'Jawaban referensi'})`;
      input.parentNode.appendChild(note);
    }
  });

  document.getElementById('stat-benar').textContent = String(correct);
  document.getElementById('stat-salah').textContent = String(wrong);
  document.getElementById('stat-kosong').textContent = String(empty);
  document.getElementById('stat-nilai').textContent = String(
    inputs.length ? Math.round((correct / inputs.length) * 100) : 0
  );

  if (statsPanel) statsPanel.hidden = false;
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
  showingAnswers = false;
  document.getElementById('toggle-btn').textContent = 'Tampilkan Jawaban';
  document.getElementById('stats-panel').hidden = true;
  localStorage.removeItem('anka_emergency_answers');
}

function bindEvents() {
  document.querySelectorAll('.page-tab').forEach((button) => {
    button.addEventListener('click', () => setPage(button.dataset.page));
  });

  document.getElementById('check-btn').addEventListener('click', checkAnswers);
  document.getElementById('toggle-btn').addEventListener('click', toggleAnswers);
  document.getElementById('reset-btn').addEventListener('click', resetForm);
  document.getElementById('print-btn').addEventListener('click', () => window.print());

  getAllInputs().forEach((input) => {
    input.addEventListener('input', () => {
      if (input.dataset.autoFilled === 'true') {
        input.dataset.autoFilled = 'false';
      }
      saveAnswers();
      if (showingAnswers) {
        const key = answerKey[input.id] || [];
        if (input.value.trim() === '' && key.length) {
          input.value = key[0];
          input.classList.add('auto-filled');
          input.dataset.autoFilled = 'true';
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadAnswers();
  bindEvents();
  setPage('page-1');
});
