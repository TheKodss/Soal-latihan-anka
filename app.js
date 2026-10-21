const answerKey = {
  vne: ['108 kias', '108'],
  vcfop: ['90 kias', '90'],
  vlo_norm: ['90 kias', '90'],
  vlo_emg: ['83 kias', '83'],
  vle: ['90 kias', '90'],
  w_head_to: ['<= 20 kts', '<=20', '20'],
  w_head_ld: ['<= 20 kts', '<=20', '20'],
  w_head_gust: ['+/- 7 kts', '+/-7', '7', '+/- 7', '+-7', '+- 7'],
  w_cross_to: ['<= 15 kts', '<=15', '15'],
  w_cross_ld: ['<= 15 kts', '<=15', '15'],
  w_cross_gust: ['+/- 7 kts', '+/-7', '7', '+/- 7', '+-7', '+- 7'],
  w_tail_to: ['<= 6 kts', '<=6', '6'],
  w_tail_ld: ['<= 6 kts', '<=6', '6'],
  w_tail_gust: ['+/- 4 kts', '+/-4', '4', '+/- 4', '+-4', '+- 4'],
  turn_speed: ['5 kts or less', '5', '5 kts'],
  mtow: ['1700 kg', '1700'],
  climb_grad: ['2,5% or more', '2.5% or more', '2.5%', '2,5%', '2.5', '2,5'],
  flight_wind: ['60 kts or less', '60 kts', '60'],
  ku_dir_nb_10: ['200 km', '200'],
  ku_dir_nb_21: ['200 km', '200'],
  ku_dir_nb_44: ['200 km', '200'],
  ku_omni_nb_10: ['90 km', '90'],
  ku_omni_nb_21: ['65 km', '65'],
  ku_omni_nb_44: ['45 km', '45'],
  ku_dir_wb_10: ['40 km', '40'],
  ku_dir_wb_21: ['30 km', '30'],
  ku_dir_wb_44: ['20 km', '20'],
  ku_omni_wb_10: ['7,5 km', '7.5 km', '7.5', '7,5'],
  ku_omni_wb_21: ['5 km', '5'],
  ku_omni_wb_44: ['3,5 km', '3.5 km', '3.5', '3,5'],
  ku_omni_10: ['7 km', '7'],
  ku_omni_21: ['5 km', '5'],
  ku_omni_44: ['3,5 km', '3.5 km', '3.5', '3,5'],
  ku_omni_omni_10: ['n/a', 'na', '-', ''],
  ku_omni_omni_21: ['n/a', 'na', '-', ''],
  ku_omni_omni_44: ['n/a', 'na', '-', ''],
  eng_rpm_min: ['900'],
  eng_rpm_norm: ['980-2320', '980 - 2320', '980 -2320', '980- 2320'],
  eng_rpm_max: ['2357'],
  oil_pr_min: ['17'],
  oil_pr_norm: ['51-87', '51 - 87'],
  oil_pr_max: ['94'],
  oil_temp_min: ['50'],
  oil_temp_norm: ['75-110', '75 - 110'],
  oil_temp_max: ['140'],
  gear_temp_min: ['-30'],
  gear_temp_norm: ['70-100', '70 - 100'],
  gear_temp_max: ['120'],
  coolant_temp_min: ['-32'],
  coolant_temp_norm: ['80-100', '80 - 100'],
  coolant_temp_max: ['105'],
  rail_pr_min: ['330'],
  rail_pr_norm: ['360-1350', '360 - 1350'],
  rail_pr_max: ['1425'],
  fuel_pr_min: ['4'],
  fuel_pr_norm: ['5-35', '5 - 35'],
  fuel_pr_max: ['44'],
  alt_volt_min: ['22'],
  alt_volt_norm: ['27-28', '27 - 28'],
  alt_volt_max: ['29'],
  alt_curr_norm: ['0-140', '0 - 140'],
  alt_curr_max: ['141'],
  max_wind: ['60'],
  exceed_wind: ['80'],
  rain_stall: ['+1', '1'],
  to_airspeed: ['20'],
  to_heading: ['10°', '10', '10 deg'],
  to_lat_dev: ['3'],
  to_start_dev: ['5'],
  ld_crab: ['4°', '4', '4 deg'],
  ld_pitch_min: ['-1°', '-1', '-1 deg'],
  ld_pitch_max: ['7°', '7', '7 deg'],
  ld_roll: ['8°', '8', '8 deg'],
  ld_center_dev: ['7,5', '7.5', '7,5 meters', '7.5 meters'],
  cb_vicinity: ['10 km', '10'],

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

  const tr = field.closest('tr');
  if (tr && tr.firstElementChild) return tr.firstElementChild.textContent.trim();

  const row = field.closest('.qa-row');
  if (row) {
    const label = row.querySelector('span');
    if (label) return label.textContent.trim();
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

  panel.innerHTML = `<h3>Kunci Jawaban</h3><ul>${rows}</ul>`;
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
    getAllInputs().forEach((input) => {
      const keys = answerKey[input.id];
      if (!keys) return;
      if (input.value.trim() === '') {
        input.value = keys[0];
        input.dataset.autoFilled = 'true';
        input.classList.add('auto-filled');
      }
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
  setActivePage('page-0');
  bindEvents();
  updateProgress();
});
