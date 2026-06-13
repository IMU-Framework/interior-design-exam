/* ============ home.jsx — Home + Setup screens ============ */

function Home({ theme, setTheme, onStart, onResume, resume }) {
  const s = EXAM.stats;
  const resumeLabel = resume ?
  resume.mode === 'study' ? '繼續上次的逐題練習' : resume.mode === 'draw' ? '繼續上次的抽考練習' : '繼續上次的考卷' :
  '';
  return (
    <div>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <span className="brand-mark">乙</span>
            <span>乙級學科測驗模擬機<span className="brand-sub"> · 建築物室內設計</span></span>
          </div>
          <div className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="wrap home">
        <div className="eyebrow">12500 建築物室內設計 · 乙級</div>
        <h1>學科測驗模擬機</h1>
        <p className="lede">依技術士技能檢定學科參考資料建置題庫，模擬正式考試的隨機抽題、計分與及格判定。準備好就開始吧。</p>

        <div className="stat-row">
          <div className="stat"><span className="n mono">{s.total}</span><span className="l">題庫總題數</span></div>
          <div className="stat"><span className="n mono">{s.profTotal}</span><span className="l">專業科目（5 大工作項目）</span></div>
          <div className="stat"><span className="n mono">{s.commonTotal}</span><span className="l">共同科目（4 類）</span></div>
          <div className="stat"><span className="n mono">100</span><span className="l">滿分 / 60 及格</span></div>
        </div>

        {resume &&
        <div className="resume-banner">
            <div className="info">
              <h3>{resumeLabel}</h3>
              <p>已作答 {Object.keys(resume.answers || {}).length} / {resume.ids.length} 題{resume.mode === 'formal' ? ` · 剩餘時間 ${fmtTime(resume.remaining)}` : ''}</p>
            </div>
            <button className="btn" onClick={() => {EXAM.clear();location.reload();}}>放棄</button>
            <button className="btn btn-primary" onClick={onResume}>繼續 <Icon.arrow /></button>
          </div>
        }

        <div className="section-label">
          <h2>測驗模式</h2>
          <span className="hint">選擇一種開始</span>
        </div>

        <div className="mode-grid">
          <button className="mode-card" onClick={() => onStart('formal')}>
            <span className="mode-num">01</span>
            <span className="mode-body">
              <h3>正式考試模擬</h3>
              <p>80 題隨機抽出 · 60 單選＋20 複選 · 100 分鐘 · 滿分 100</p>
            </span>
            <span className="mode-arrow"><Icon.arrow /></span>
          </button>

          <button className="mode-card" onClick={() => onStart('draw')}>
            <span className="mode-num">02</span>
            <span className="mode-body">
              <h3>依題組抽考</h3>
              <p>自選工作項目、題型與題數，隨機抽出練習卷</p>
            </span>
            <span className="mode-arrow"><Icon.arrow /></span>
          </button>

          <button className="mode-card" onClick={() => onStart('study')}>
            <span className="mode-num">03</span>
            <span className="mode-body">
              <h3>依題組逐題練習</h3>
              <p>逐題瀏覽整個題組、即時對照答案，記錄精熟進度</p>
            </span>
            <span className="mode-arrow"><Icon.arrow /></span>
          </button>
        </div>
      </div>
    </div>);

}

function SpecRow({ k, children }) {
  return <div className="spec-row"><span className="k">{k}</span><span className="v">{children}</span></div>;
}

function Setup({ theme, setTheme, onBack, onBegin }) {
  const [includeImg, setIncludeImg] = useState(true);
  const [instant, setInstant] = useState(false);

  function begin() {
    const cfg = { ...EXAM.DEFAULT_CONFIG, includeImg, instantFeedback: instant };
    onBegin(cfg);
  }

  return (
    <div>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <button className="icon-btn" onClick={onBack} aria-label="返回"><Icon.back /></button>
          <div className="brand"><span>正式考試模擬</span></div>
          <div className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="wrap setup">
        <h1>正式考試模擬</h1>
        <p className="lede">系統將依下列配額隨機抽題，組成一份全新考卷。</p>

        <div className="spec-table">
          <SpecRow k="專業 · 單選">44 題　<small>圖說 8 · 法規 10 · 繪圖 10 · 估算 8 · 實務 8</small></SpecRow>
          <SpecRow k="專業 · 複選">20 題　<small>五大工作項目各 4 題</small></SpecRow>
          <SpecRow k="共同 · 單選">16 題　<small>職安 / 倫理 / 環境 / 節能 各 4 題</small></SpecRow>
          <SpecRow k="計分">單選 60 題 ×1 分　＋　複選 20 題 ×2 分</SpecRow>
          <SpecRow k="複選規則"><small>須與標準答案完全一致才得分，多選 / 漏選 / 錯選皆 0 分，無倒扣</small></SpecRow>
          <SpecRow k="作答時間">100 分鐘倒數　<small>離開可暫停，回來續考同一份</small></SpecRow>
          <SpecRow k="及格標準">總分 ≧ 60 分</SpecRow>
        </div>

        <div className="opt-toggle">
          <div>
            <div className="t">即時對錯回饋</div>
            <div className="d">每題作答後立即顯示正解（關閉則交卷後一次檢討，最接近正式考）</div>
          </div>
          <Switch on={instant} onChange={setInstant} />
        </div>
        <div className="opt-toggle">
          <div>
            <div className="t">納入含圖題目</div>
            <div className="d">圖說判讀的符號題以待補圖檔的 placeholder 呈現（關閉則暫不抽出）</div>
          </div>
          <Switch on={includeImg} onChange={setIncludeImg} />
        </div>

        <div style={{ marginTop: 28 }}>
          <button className="btn btn-primary btn-lg" onClick={begin} style={{ width: '100%' }}>
            抽題並開始作答 <Icon.arrow />
          </button>
        </div>
      </div>
    </div>);

}

Object.assign(window, { Home, Setup });