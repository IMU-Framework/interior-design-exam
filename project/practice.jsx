/* ============ practice.jsx — mode 02 (依題組抽考) & 03 (逐題練習) setup ============ */

function GroupChips({ groups, selected, onToggle, single }) {
  return (
    <div className="grp-chips">
      {groups.map(g => {
        const on = single ? selected === g.id : selected.includes(g.id);
        return (
          <button key={g.id} className={'grp-chip' + (on ? ' on' : '')} onClick={() => onToggle(g.id)}>
            <span className="gc-top">
              <span className="gc-label">{g.label}</span>
              {!single && <span className={'gc-check' + (on ? ' on' : '')}>{on ? <Icon.check style={{ width: 13, height: 13 }} /> : ''}</span>}
            </span>
            <span className="gc-meta mono">{g.single} 單選 · {g.multi} 複選</span>
          </button>
        );
      })}
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented">
      {options.map(o => (
        <button key={o.v} className={'seg' + (value === o.v ? ' on' : '')} onClick={() => onChange(o.v)}>{o.l}</button>
      ))}
    </div>
  );
}

/* ---------------- Mode 02: 依題組抽考 ---------------- */
function DrawSetup({ theme, setTheme, onBack, onBegin }) {
  const groups = EXAM.GROUPS;
  const [sel, setSel] = useState(groups.map(g => g.id)); // default all
  const [types, setTypes] = useState('all');
  const [count, setCount] = useState(20);
  const [timed, setTimed] = useState(false);
  const [instant, setInstant] = useState(true);
  const [includeImg, setIncludeImg] = useState(true);

  const avail = EXAM.countAvailable(sel, types, includeImg);
  useEffect(() => { if (count > avail) setCount(Math.max(1, avail)); }, [avail]);

  const prof = groups.filter(g => g.subj === '專業');
  const common = groups.filter(g => g.subj === '共同');
  const toggle = id => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const setBatch = (arr, on) => setSel(s => on ? [...new Set([...s, ...arr])] : s.filter(x => !arr.includes(x)));
  const profIds = prof.map(g => g.id), commonIds = common.map(g => g.id);
  const presets = [10, 20, 30, 50].filter(n => n <= avail || n === 10);

  function begin() {
    if (!sel.length || avail === 0) return;
    const n = Math.min(count, avail);
    const ids = EXAM.drawGroups({ groupIds: sel, types, count: n, includeImg });
    onBegin({
      mode: 'draw',
      durationSec: timed ? n * 75 : 0, // ~1.25 min/題 if timed
      instantFeedback: instant,
      includeImg,
    }, ids);
  }

  return (
    <div>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <button className="icon-btn" onClick={onBack} aria-label="返回"><Icon.back /></button>
          <div className="brand"><span>依題組抽考</span></div>
          <div className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="wrap setup">
        <h1>依題組抽考</h1>
        <p className="lede">挑選想練習的題組、題型與題數，系統隨機抽出組成一份練習卷。</p>

        <div className="field-label">
          <span>選擇題組</span>
          <span className="fl-act">
            <button onClick={() => setBatch(profIds, !profIds.every(i => sel.includes(i)))}>{profIds.every(i => sel.includes(i)) ? '取消專業' : '全選專業'}</button>
            <button onClick={() => setBatch(commonIds, !commonIds.every(i => sel.includes(i)))}>{commonIds.every(i => sel.includes(i)) ? '取消共同' : '全選共同'}</button>
          </span>
        </div>
        <div className="sub-head">專業科目</div>
        <GroupChips groups={prof} selected={sel} onToggle={toggle} />
        <div className="sub-head">共同科目</div>
        <GroupChips groups={common} selected={sel} onToggle={toggle} />

        <div className="field-label"><span>題型</span></div>
        <Segmented options={[{ v: 'all', l: '單選＋複選' }, { v: 'single', l: '只考單選' }, { v: 'multi', l: '只考複選' }]} value={types} onChange={setTypes} />

        <div className="field-label"><span>題數</span><span className="fl-note mono">可抽 {avail} 題</span></div>
        <div className="count-row">
          <input type="range" className="slider" min="1" max={Math.max(1, avail)} value={Math.min(count, Math.max(1, avail))} onChange={e => setCount(+e.target.value)} />
          <span className="count-val mono">{Math.min(count, Math.max(1, avail))}</span>
        </div>
        <div className="presets">
          {presets.map(n => <button key={n} className={'preset' + (count === n ? ' on' : '')} onClick={() => setCount(n)} disabled={n > avail}>{n} 題</button>)}
          <button className={'preset' + (count >= avail ? ' on' : '')} onClick={() => setCount(avail)}>全部 {avail}</button>
        </div>

        <div className="opt-toggle" style={{ marginTop: 22 }}>
          <div><div className="t">即時對錯回饋</div><div className="d">每題作答後立即顯示正解（練習建議開啟）</div></div>
          <Switch on={instant} onChange={setInstant} />
        </div>
        <div className="opt-toggle">
          <div><div className="t">限時作答</div><div className="d">開啟則以每題約 75 秒倒數計時</div></div>
          <Switch on={timed} onChange={setTimed} />
        </div>
        <div className="opt-toggle">
          <div><div className="t">納入含圖題目</div><div className="d">圖說判讀符號題以待補圖檔 placeholder 呈現</div></div>
          <Switch on={includeImg} onChange={setIncludeImg} />
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 26 }} disabled={!sel.length || avail === 0} onClick={begin}>
          抽出 {Math.min(count, Math.max(1, avail))} 題開始 <Icon.arrow />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Mode 03: 依題組逐題練習 ---------------- */
function StudySetup({ theme, setTheme, onBack, onBegin }) {
  const groups = EXAM.GROUPS;
  const [sel, setSel] = useState('p01');
  const [types, setTypes] = useState('all');
  const [order, setOrder] = useState('seq');
  const [includeImg, setIncludeImg] = useState(true);
  const [tick, setTick] = useState(0); // re-read stats

  const prof = groups.filter(g => g.subj === '專業');
  const common = groups.filter(g => g.subj === '共同');
  const stats = useMemo(() => EXAM.study.groupStats(sel), [sel, tick]);
  const g = EXAM.getGroup(sel);
  const setLen = EXAM.countAvailable([sel], types, includeImg);

  function begin() {
    const ids = EXAM.studySet({ groupId: sel, types, order, includeImg });
    if (!ids.length) return;
    onBegin({ mode: 'study', durationSec: 0, instantFeedback: true, includeImg, groupId: sel }, ids);
  }
  function resetProg() {
    EXAM.study.resetGroup(sel);
    setTick(t => t + 1);
  }

  return (
    <div>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <button className="icon-btn" onClick={onBack} aria-label="返回"><Icon.back /></button>
          <div className="brand"><span>依題組逐題練習</span></div>
          <div className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="wrap setup">
        <h1>依題組逐題練習</h1>
        <p className="lede">選一個題組，逐題作答、即時對照答案。系統記住你的精熟進度，可隨時接續。</p>

        <div className="field-label"><span>選擇一個題組</span></div>
        <div className="sub-head">專業科目</div>
        <StudyGroupList groups={prof} sel={sel} onSel={setSel} />
        <div className="sub-head">共同科目</div>
        <StudyGroupList groups={common} sel={sel} onSel={setSel} />

        <div className="study-prog">
          <div className="sp-head">
            <span>{g.label} · 精熟進度</span>
            <button className="sp-reset" onClick={resetProg}>清除此題組進度</button>
          </div>
          <div className="sp-bar"><i style={{ width: (stats.mastered / stats.total * 100 || 0) + '%' }} /></div>
          <div className="sp-meta mono">已精熟 {stats.mastered} / {stats.total} · 練習過 {stats.seen}</div>
        </div>

        <div className="field-label"><span>題型</span></div>
        <Segmented options={[{ v: 'all', l: '單選＋複選' }, { v: 'single', l: '只練單選' }, { v: 'multi', l: '只練複選' }]} value={types} onChange={setTypes} />

        <div className="field-label"><span>順序</span></div>
        <Segmented options={[{ v: 'seq', l: '依題庫順序' }, { v: 'rand', l: '隨機順序' }]} value={order} onChange={setOrder} />

        <div className="opt-toggle" style={{ marginTop: 22 }}>
          <div><div className="t">納入含圖題目</div><div className="d">圖說判讀符號題以待補圖檔 placeholder 呈現</div></div>
          <Switch on={includeImg} onChange={setIncludeImg} />
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 26 }} disabled={setLen === 0} onClick={begin}>
          開始逐題練習（{setLen} 題）<Icon.arrow />
        </button>
      </div>
    </div>
  );
}

function StudyGroupList({ groups, sel, onSel }) {
  return (
    <div className="grp-chips">
      {groups.map(g => {
        const st = EXAM.study.groupStats(g.id);
        const on = sel === g.id;
        return (
          <button key={g.id} className={'grp-chip radio' + (on ? ' on' : '')} onClick={() => onSel(g.id)}>
            <span className="gc-top">
              <span className="gc-radio">{on && <span className="gc-radio-dot" />}</span>
              <span className="gc-label">{g.label}</span>
            </span>
            <span className="gc-meta mono">{g.total} 題 · 精熟 {st.mastered}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { DrawSetup, StudySetup });
