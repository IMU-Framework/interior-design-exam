/* ============ exam-core.js — draw / score / persist (vanilla) ============ */
(function () {
  const BANK = window.QUESTION_BANK || [];
  window.EXAM = {};

  // ---- meta ----
  const PROF_CATS = [
    { wi: '01', name: '圖說判讀' },
    { wi: '02', name: '相關法規' },
    { wi: '03', name: '繪製圖說' },
    { wi: '04', name: '工程估算' },
    { wi: '05', name: '工程實務' },
  ];
  const COMMON_CATS = [
    { code: '90006', name: '職業安全衛生', short: '職安' },
    { code: '90007', name: '工作倫理與職業道德', short: '倫理' },
    { code: '90008', name: '環境保護', short: '環境' },
    { code: '90009', name: '節能減碳', short: '節能' },
  ];
  EXAM.PROF_CATS = PROF_CATS;
  EXAM.COMMON_CATS = COMMON_CATS;

  // ---- selectable groups (for mode 02 / 03) ----
  const GROUPS = [
    { id: 'p01', code: '12500', wi: '01', subj: '專業', label: '工作項目 01 圖說判讀', short: '圖說' },
    { id: 'p02', code: '12500', wi: '02', subj: '專業', label: '工作項目 02 相關法規', short: '法規' },
    { id: 'p03', code: '12500', wi: '03', subj: '專業', label: '工作項目 03 繪製圖說', short: '繪圖' },
    { id: 'p04', code: '12500', wi: '04', subj: '專業', label: '工作項目 04 工程估算', short: '估算' },
    { id: 'p05', code: '12500', wi: '05', subj: '專業', label: '工作項目 05 工程實務', short: '實務' },
    { id: 'c06', code: '90006', subj: '共同', label: '共同科目 職業安全衛生', short: '職安' },
    { id: 'c07', code: '90007', subj: '共同', label: '共同科目 工作倫理與職業道德', short: '倫理' },
    { id: 'c08', code: '90008', subj: '共同', label: '共同科目 環境保護', short: '環境' },
    { id: 'c09', code: '90009', subj: '共同', label: '共同科目 節能減碳', short: '節能' },
  ];
  function grpMatch(g) {
    return q => q.code === g.code && (!g.wi || q.wi === g.wi);
  }
  GROUPS.forEach(g => {
    const qs = BANK.filter(grpMatch(g));
    g.single = qs.filter(q => q.type === 'single').length;
    g.multi = qs.filter(q => q.type === 'multi').length;
    g.total = qs.length;
  });
  EXAM.GROUPS = GROUPS;
  EXAM.getGroup = id => GROUPS.find(g => g.id === id);

  // default formal-exam blueprint
  EXAM.DEFAULT_CONFIG = {
    profSingle: { '01': 8, '02': 10, '03': 10, '04': 8, '05': 8 }, // 44
    profMulti:  { '01': 4, '02': 4, '03': 4, '04': 4, '05': 4 },   // 20
    commonSingle: { '90006': 4, '90007': 4, '90008': 4, '90009': 4 }, // 16
    durationSec: 100 * 60,
    includeImg: true,     // keep image-placeholder questions in the pool
    instantFeedback: false,
  };

  // ---- helpers ----
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  EXAM.shuffle = shuffle;

  function pool(filter, includeImg) {
    return BANK.filter(q => filter(q) && (includeImg || !q.img));
  }
  function take(p, n) {
    return shuffle(p).slice(0, n);
  }

  // ---- draw a formal exam ----
  EXAM.draw = function (cfg) {
    cfg = cfg || EXAM.DEFAULT_CONFIG;
    const singles = [];
    const multis = [];

    PROF_CATS.forEach(c => {
      const nS = cfg.profSingle[c.wi] || 0;
      const nM = cfg.profMulti[c.wi] || 0;
      singles.push(...take(pool(q => q.code === '12500' && q.wi === c.wi && q.type === 'single', cfg.includeImg), nS));
      multis.push(...take(pool(q => q.code === '12500' && q.wi === c.wi && q.type === 'multi', cfg.includeImg), nM));
    });
    COMMON_CATS.forEach(c => {
      const nS = cfg.commonSingle[c.code] || 0;
      singles.push(...take(pool(q => q.code === c.code && q.type === 'single', cfg.includeImg), nS));
    });

    // shuffle within each section, single block then multi block
    const ordered = [...shuffle(singles), ...shuffle(multis)];
    return ordered.map(q => q.id);
  };

  // ---- mode 02: draw from selected groups ----
  // opts: { groupIds:[], types:'all'|'single'|'multi', count:n, includeImg:bool }
  EXAM.drawGroups = function (opts) {
    const groups = opts.groupIds.map(id => EXAM.getGroup(id)).filter(Boolean);
    const typeOk = q =>
      opts.types === 'all' ? true :
      opts.types === 'single' ? q.type === 'single' : q.type === 'multi';
    let p = BANK.filter(q =>
      groups.some(g => grpMatch(g)(q)) && typeOk(q) && (opts.includeImg || !q.img));
    p = shuffle(p);
    const n = Math.min(opts.count, p.length);
    const picked = p.slice(0, n);
    // single block then multi block for clean palette grouping
    const singles = picked.filter(q => q.type === 'single');
    const multis = picked.filter(q => q.type === 'multi');
    return [...singles, ...multis].map(q => q.id);
  };

  // count available questions for a draw config (for slider max / display)
  EXAM.countAvailable = function (groupIds, types, includeImg) {
    const groups = groupIds.map(id => EXAM.getGroup(id)).filter(Boolean);
    const typeOk = q =>
      types === 'all' ? true :
      types === 'single' ? q.type === 'single' : q.type === 'multi';
    return BANK.filter(q =>
      groups.some(g => grpMatch(g)(q)) && typeOk(q) && (includeImg || !q.img)).length;
  };

  // ---- mode 03: full study set for ONE group ----
  // opts: { groupId, types, order:'seq'|'rand', includeImg }
  EXAM.studySet = function (opts) {
    const g = EXAM.getGroup(opts.groupId);
    const typeOk = q =>
      opts.types === 'all' ? true :
      opts.types === 'single' ? q.type === 'single' : q.type === 'multi';
    let p = BANK.filter(q => grpMatch(g)(q) && typeOk(q) && (opts.includeImg || !q.img));
    // BANK is already in PDF order; seq keeps it
    if (opts.order === 'rand') p = shuffle(p);
    else p = p.slice().sort((a, b) => a.wi.localeCompare(b.wi) || a.num - b.num);
    return p.map(q => q.id);
  };

  // ---- rehydrate ids -> question objects ----
  const byId = {};
  BANK.forEach(q => { byId[q.id] = q; });
  EXAM.get = id => byId[id];
  EXAM.hydrate = ids => ids.map(id => byId[id]).filter(Boolean);

  // ---- scoring ----
  function arrEq(a, b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    const x = [...a].sort(), y = [...b].sort();
    return x.every((v, i) => v === y[i]);
  }
  EXAM.arrEq = arrEq;

  EXAM.score = function (ids, answers) {
    const qs = EXAM.hydrate(ids);
    let singleScore = 0, multiScore = 0, singleN = 0, multiN = 0, singleRight = 0, multiRight = 0;
    const catAgg = {}; // by catShort: {right,total}
    qs.forEach(q => {
      const a = answers[q.id] || [];
      const right = arrEq(a, q.ans);
      const k = q.catShort;
      catAgg[k] = catAgg[k] || { right: 0, total: 0, name: q.cat };
      catAgg[k].total++;
      if (right) catAgg[k].right++;
      if (q.type === 'single') {
        singleN++;
        if (right) { singleScore += 1; singleRight++; }
      } else {
        multiN++;
        if (right) { multiScore += 2; multiRight++; }
      }
    });
    const total = singleScore + multiScore;
    return {
      singleScore, multiScore, total,
      singleN, multiN, singleRight, multiRight,
      correct: singleRight + multiRight,
      totalQ: singleN + multiN,
      pass: total >= 60, catAgg,
    };
  };

  // ---- persistence ----
  const KEY = 'ylab_exam_v1';
  EXAM.save = function (state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  };
  EXAM.load = function () {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  };
  EXAM.clear = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
  };

  // ---- theme ----
  const TKEY = 'ylab_theme';
  EXAM.getTheme = () => { try { return localStorage.getItem(TKEY) || 'light'; } catch (e) { return 'light'; } };
  EXAM.setTheme = t => { try { localStorage.setItem(TKEY, t); } catch (e) {} document.documentElement.setAttribute('data-theme', t); };

  // ---- study mastery store (long-term, mode 03) ----
  const SKEY = 'ylab_study_v1';
  function loadStudy() {
    try { return JSON.parse(localStorage.getItem(SKEY)) || { seen: {}, mastered: {} }; }
    catch (e) { return { seen: {}, mastered: {} }; }
  }
  EXAM.study = {
    record(qid, correct) {
      const s = loadStudy();
      s.seen[qid] = true;
      if (correct) s.mastered[qid] = true;
      try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {}
    },
    // stats for a group: {total, seen, mastered}
    groupStats(groupId) {
      const g = EXAM.getGroup(groupId);
      const s = loadStudy();
      const qs = BANK.filter(grpMatch(g));
      let seen = 0, mastered = 0;
      qs.forEach(q => { if (s.seen[q.id]) seen++; if (s.mastered[q.id]) mastered++; });
      return { total: qs.length, seen, mastered };
    },
    resetGroup(groupId) {
      const g = EXAM.getGroup(groupId);
      const s = loadStudy();
      BANK.filter(grpMatch(g)).forEach(q => { delete s.seen[q.id]; delete s.mastered[q.id]; });
      try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {}
    },
  };

  // bank stats
  EXAM.stats = {
    profTotal: BANK.filter(q => q.code === '12500').length,
    commonTotal: BANK.filter(q => q.code !== '12500').length,
    total: BANK.length,
    profSingle: BANK.filter(q => q.code === '12500' && q.type === 'single').length,
    profMulti: BANK.filter(q => q.code === '12500' && q.type === 'multi').length,
  };
})();
