/* ============ admin.jsx — 題庫管理後台 ============ */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

const MEMBERS_API = 'https://hzglygfmhptvwgxphydo.supabase.co/functions/v1/admin-members';

const A_ICON = {
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  trash: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  download: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>,
  image: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  edit: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>,
  undo: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8"/></svg>,
  sun: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  moon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ban: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>,
  refresh: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.8-3.3L23 10M1 14l4.7 4.3A9 9 0 0 0 20.5 15"/></svg>,
};

function ThemeToggle({ theme, setTheme }) {
  return (
    <button className="icon-btn" aria-label="切換深淺色" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <A_ICON.sun /> : <A_ICON.moon />}
    </button>
  );
}

/* 與 qimage.jsx 相同的命名規則：題幹圖 images/{id}.png；選項圖 images/{id}-{n}.png */
function isOptionImageQ(q) {
  return q.img && Array.isArray(q.opts) && q.opts.every(o => !o);
}
function StemFig({ id }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="adm-img-missing mono">題幹圖待補 · images/{id}.png</div>;
  return <figure className="adm-fig"><img src={'images/' + id + '.png'} alt="" onError={() => setFailed(true)} /></figure>;
}
function OptFig({ id, n }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="adm-optimg-missing mono">圖待補 · {id}-{n}.png</span>;
  return <span className="adm-optfig"><img src={'images/' + id + '-' + n + '.png'} alt={'選項 ' + n} onError={() => setFailed(true)} /></span>;
}

const BANK_META = {
  '12500': { nm: '建築物室內設計 — 專業', sub: '專業學科 · 工作項目 01–05' },
  '90006': { nm: '職業安全衛生', sub: '共同科目' },
  '90007': { nm: '工作倫理與職業道德', sub: '共同科目' },
  '90008': { nm: '環境保護', sub: '共同科目' },
  '90009': { nm: '節能減碳', sub: '共同科目' },
};
const CODES = ['12500', '90006', '90007', '90008', '90009'];
const LS_KEY = 'ylab_admin_draft_v1';

/* ---------- persistence: layered draft over loaded files ---------- */
function loadDraft() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch (e) { return {}; }
}
function saveDraft(d) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch (e) {}
}

/* deep-ish equality on the editable surface only */
function sameQ(a, b) {
  if (!a || !b) return false;
  if (a.stem !== b.stem) return false;
  if (a.type !== b.type) return false;
  if ((a.tail || '') !== (b.tail || '')) return false;
  if (!!a.img !== !!b.img) return false;
  if ((a.opts || []).length !== (b.opts || []).length) return false;
  for (let i = 0; i < a.opts.length; i++) if (a.opts[i] !== b.opts[i]) return false;
  const aa = (a.ans || []).slice().sort(), ba = (b.ans || []).slice().sort();
  if (aa.length !== ba.length) return false;
  for (let i = 0; i < aa.length; i++) if (aa[i] !== ba[i]) return false;
  return true;
}

/* ===================================================================== */
function Admin({ extraHeaderSlot } = {}) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ylab_theme') || 'light'; } catch (e) { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('ylab_theme', theme); } catch (e) {}
  }, [theme]);

  // originals from file (immutable reference for dirty-detection), keyed by code
  const originals = window.ADMIN_ORIGINALS; // { code: Question[] }
  // working copy: flat array, with edits applied from draft
  const [banks, setBanks] = useState(() => {
    const draft = loadDraft();
    const out = {};
    CODES.forEach(code => {
      out[code] = originals[code].map(q => {
        const d = draft[q.id];
        return d ? { ...q, ...d } : { ...q };
      });
    });
    return out;
  });

  const [activeCode, setActiveCode] = useState('12500');
  const [activeId, setActiveId] = useState(null);
  const [wiFilter, setWiFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [onlyDirty, setOnlyDirty] = useState(false);
  const [onlyImg, setOnlyImg] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  // dirty map: id -> bool (differs from original file)
  const origById = useMemo(() => {
    const m = {};
    CODES.forEach(code => originals[code].forEach(q => { m[q.id] = q; }));
    return m;
  }, []);

  const dirtyIds = useMemo(() => {
    const s = new Set();
    CODES.forEach(code => banks[code].forEach(q => { if (!sameQ(q, origById[q.id])) s.add(q.id); }));
    return s;
  }, [banks, origById]);

  // persist edits to localStorage whenever banks change
  useEffect(() => {
    const draft = {};
    CODES.forEach(code => banks[code].forEach(q => {
      if (!sameQ(q, origById[q.id])) {
        draft[q.id] = { stem: q.stem, opts: q.opts, ans: q.ans, type: q.type, tail: q.tail || '', img: !!q.img };
      }
    }));
    saveDraft(draft);
  }, [banks, origById]);

  const list = banks[activeCode];
  const wis = useMemo(() => [...new Set(originals[activeCode].map(q => q.wi))], [activeCode]);
  const showWiFilter = activeCode === '12500';

  const filtered = useMemo(() => {
    const ql = query.trim().toLowerCase();
    return list.filter(q => {
      if (showWiFilter && wiFilter !== 'all' && q.wi !== wiFilter) return false;
      if (onlyDirty && !dirtyIds.has(q.id)) return false;
      if (onlyImg && !q.img) return false;
      if (ql) {
        const hay = (q.stem + ' ' + (q.opts || []).join(' ') + ' ' + (q.tail || '') + ' ' + q.id).toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [list, wiFilter, onlyDirty, onlyImg, query, dirtyIds, showWiFilter]);

  const active = activeId ? list.find(q => q.id === activeId) : null;

  // when switching bank, clear selection if it no longer belongs
  useEffect(() => {
    if (activeId && !list.some(q => q.id === activeId)) setActiveId(null);
  }, [activeCode]);

  function patchActive(patch) {
    setBanks(prev => ({
      ...prev,
      [activeCode]: prev[activeCode].map(q => q.id === activeId ? { ...q, ...patch } : q),
    }));
  }

  function revertActive() {
    const orig = origById[activeId];
    setBanks(prev => ({
      ...prev,
      [activeCode]: prev[activeCode].map(q => q.id === activeId ? { ...orig } : q),
    }));
  }

  function resetAll() {
    if (!window.confirm('確定清除全部暫存修改？所有題目將還原為原始題庫內容，且練習器也會跟著還原。')) return;
    const out = {};
    CODES.forEach(code => { out[code] = origById ? originals[code].map(q => ({ ...q })) : []; });
    setBanks(out);
  }

  function indexInList(id) { return list.findIndex(q => q.id === id) + 1; }

  const dirtyByCode = useMemo(() => {
    const m = {};
    CODES.forEach(code => { m[code] = banks[code].filter(q => dirtyIds.has(q.id)).length; });
    return m;
  }, [banks, dirtyIds]);
  const totalDirty = dirtyIds.size;

  return (
    <div className="admin-shell">
      <div className="admin-top">
        <div className="admin-top-inner">
          <div className="brand">
            <span className="brand-mark">題</span>
            <span>題庫管理後台<span className="brand-sub">直觀編輯題幹、選項、答案與 tail</span></span>
          </div>
          <span className="spacer" />
          <span className={'mod-chip' + (totalDirty ? ' live' : '')}>
            {totalDirty ? `${totalDirty} 題已修改` : '尚無修改'}
          </span>
          <button className="btn btn-primary" onClick={() => setExportOpen(true)}>
            <A_ICON.download style={{ width: 16, height: 16 }} />匯出 JSON
          </button>
          {extraHeaderSlot}
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="admin-body">
        {/* ---------- sidebar ---------- */}
        <aside className="admin-side">
          <div className="side-head">
            <div className="bank-tabs">
              {CODES.map(code => (
                <button key={code} className={'bank-tab' + (code === activeCode ? ' on' : '')}
                  onClick={() => { setActiveCode(code); setWiFilter('all'); }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="nm">{BANK_META[code].nm}</div>
                    <div className="code mono">{code} · {banks[code].length} 題</div>
                  </div>
                  {dirtyByCode[code] > 0 && <span className="cnt">{dirtyByCode[code]} 改</span>}
                  {dirtyByCode[code] > 0 && <span className="dot" />}
                </button>
              ))}
            </div>
          </div>

          <div className="side-filters">
            <div className="search-row">
              <A_ICON.search />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜尋題幹 / 選項 / 編號…" />
            </div>
            {showWiFilter && (
              <div className="wi-chips">
                <button className={'chip' + (wiFilter === 'all' ? ' on' : '')} onClick={() => setWiFilter('all')}>全部</button>
                {wis.map(wi => (
                  <button key={wi} className={'chip' + (wiFilter === wi ? ' on' : '')} onClick={() => setWiFilter(wi)}>
                    {wi} {originals[activeCode].find(q => q.wi === wi).cat}
                  </button>
                ))}
              </div>
            )}
            <div className="toggle-row">
              <label><input type="checkbox" checked={onlyDirty} onChange={e => setOnlyDirty(e.target.checked)} />僅看已修改</label>
              <label><input type="checkbox" checked={onlyImg} onChange={e => setOnlyImg(e.target.checked)} />僅看含圖</label>
            </div>
          </div>

          <div className="q-list">
            {filtered.length === 0 && <div className="q-list-empty">沒有符合條件的題目</div>}
            {filtered.map(q => (
              <button key={q.id} className={'q-row' + (q.id === activeId ? ' on' : '')} onClick={() => setActiveId(q.id)}>
                <span className="qn mono">#{indexInList(q.id)}</span>
                <span className="qbody">
                  <span className={'qstem' + (q.stem ? '' : ' empty')}>{q.stem || '（空白題幹）'}</span>
                  <span className="qmeta">
                    <span className={'tag ' + q.type}>{q.type === 'multi' ? '複選' : '單選'}</span>
                    {q.img && <span className="tag img"><A_ICON.image style={{ width: 11, height: 11 }} />圖</span>}
                  </span>
                </span>
                {dirtyIds.has(q.id) && <span className="qdot" />}
              </button>
            ))}
          </div>
        </aside>

        {/* ---------- editor ---------- */}
        <main className="admin-main">
          {!active ? (
            <div className="editor-empty">
              <div>
                <A_ICON.edit />
                <div>從左側挑選一題開始編輯</div>
              </div>
            </div>
          ) : (
            <Editor key={active.id} q={active} indexNo={indexInList(active.id)}
              dirty={dirtyIds.has(active.id)} onPatch={patchActive} onRevert={revertActive} />
          )}
        </main>
      </div>

      {exportOpen && (
        <ExportSheet banks={banks} dirtyByCode={dirtyByCode} totalDirty={totalDirty} onResetAll={resetAll} onClose={() => setExportOpen(false)} />
      )}
    </div>
  );
}

/* ===================================================================== */
function Editor({ q, indexNo, dirty, onPatch, onRevert }) {
  const optImage = isOptionImageQ(q);
  function setOpt(i, val) {
    const opts = q.opts.slice(); opts[i] = val; onPatch({ opts });
  }
  function toggleAns(n) {
    let ans;
    if (q.type === 'single') ans = [n];
    else ans = q.ans.includes(n) ? q.ans.filter(x => x !== n).sort() : [...q.ans, n].sort();
    if (ans.length === 0) ans = q.ans; // single must keep one
    onPatch({ ans });
  }
  function addOpt() { if (q.opts.length < 6) onPatch({ opts: [...q.opts, ''] }); }
  function delOpt(i) {
    if (q.opts.length <= 2) return;
    const opts = q.opts.filter((_, k) => k !== i);
    // shift answers above removed index
    const ans = q.ans.filter(n => n !== i + 1).map(n => (n > i + 1 ? n - 1 : n));
    onPatch({ opts, ans: ans.length ? ans : [1] });
  }
  function setType(t) {
    let ans = q.ans;
    if (t === 'single' && ans.length > 1) ans = [ans[0]];
    onPatch({ type: t, ans });
  }

  return (
    <div className="editor">
      <div className="ed-head">
        <span className="ed-id mono">{q.id}</span>
        <span className="tag img" style={{ display: q.img ? 'inline-flex' : 'none' }}>
          <A_ICON.image style={{ width: 11, height: 11 }} />含圖題
        </span>
        <span className="spacer" />
        <span className="ed-id mono">第 {indexNo} 題</span>
      </div>
      <div className="ed-cat">{q.code === '12500' ? `工作項目 ${q.wi} · ${q.cat}` : q.cat}</div>

      {/* type */}
      <div className="fld">
        <label>題型</label>
        <div className="seg">
          <button className={q.type === 'single' ? 'on' : ''} onClick={() => setType('single')}>單選</button>
          <button className={q.type === 'multi' ? 'on' : ''} onClick={() => setType('multi')}>複選</button>
        </div>
      </div>

      {/* stem */}
      <div className="fld">
        <label>題幹 <span className="hint">問題本文</span></label>
        <textarea rows={3} value={q.stem} onChange={e => onPatch({ stem: e.target.value })} placeholder="輸入題目敘述…" />
        {q.img && !optImage && <StemFig id={q.id} />}
      </div>

      {/* options */}
      <div className="fld">
        <label>選項 <span className="hint">{optImage ? '此題為圖形選項 · 點號碼設正解' : `點左側號碼設為正解${q.type === 'multi' ? '（可複選）' : ''}`}</span></label>
        {q.opts.map((opt, i) => {
          const n = i + 1;
          const correct = q.ans.includes(n);
          return (
            <div className="opt-row" key={i}>
              <button className={'opt-mark' + (correct ? ' correct' : '')} title="設為正解" onClick={() => toggleAns(n)}>
                {correct ? <A_ICON.check /> : <span className="num">{n}</span>}
              </button>
              {optImage
                ? <div className="opt-imgcell"><OptFig id={q.id} n={n} /><input type="text" value={opt} onChange={e => setOpt(i, e.target.value)} placeholder={`選項 ${n} 文字（圖形選項可留空）`} /></div>
                : <input type="text" value={opt} onChange={e => setOpt(i, e.target.value)} placeholder={`選項 ${n}`} />}
              <button className="opt-del" title="刪除選項" onClick={() => delOpt(i)} disabled={q.opts.length <= 2}>
                <A_ICON.trash />
              </button>
            </div>
          );
        })}
        {q.opts.length < 6 && (
          <button className="opt-add" onClick={addOpt}><A_ICON.plus style={{ width: 14, height: 14, verticalAlign: '-2px' }} /> 新增選項</button>
        )}
        <p className="ans-hint">正解：{q.ans.length ? q.ans.join('、') : '（未設定）'}</p>
      </div>

      {/* tail */}
      <div className="fld">
        <label>Tail <span className="hint">選項後補充文字，無則留空</span></label>
        <input type="text" value={q.tail || ''} onChange={e => onPatch({ tail: e.target.value })} placeholder="例：（本題答案為…）— 通常留空" />
      </div>

      {/* img flag */}
      <div className="fld">
        <label>含圖標記</label>
        <div className="toggle-row" style={{ fontSize: 13.5 }}>
          <label><input type="checkbox" checked={!!q.img} onChange={e => onPatch({ img: e.target.checked })} />此題含圖形 / 符號（作答畫面顯示「圖檔待補」提示）</label>
        </div>
      </div>

      {/* preview */}
      <div className="fld">
        <label>預覽</label>
        <div className="preview">
          <div className="pv-label">作答畫面</div>
          <div className="pv-stem">{q.stem || '（空白題幹）'}</div>
          {q.img && !optImage && <StemFig id={q.id} />}
          <ul className="pv-opts">
            {q.opts.map((opt, i) => {
              const n = i + 1, correct = q.ans.includes(n);
              return (
                <li key={i} className={'pv-opt' + (correct ? ' correct' : '')}>
                  <span className="c mono">{correct ? '✓' : n}</span>
                  {optImage
                    ? <OptFig id={q.id} n={n} />
                    : <span>{opt || <em style={{ opacity: .5 }}>（空白）</em>}</span>}
                </li>
              );
            })}
          </ul>
          {q.tail && <p className="pv-tail">{q.tail}</p>}
        </div>
      </div>

      <div className="ed-actions">
        {dirty
          ? <span className="saved-note"><span className="dot" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 9, background: 'var(--warn)', marginRight: 7 }} />已修改 · 已即時套用至練習器</span>
          : <span className="saved-note">與原始題庫一致</span>}
        <span className="spacer" />
        <button className="btn btn-ghost" onClick={onRevert} disabled={!dirty}>
          <A_ICON.undo style={{ width: 15, height: 15 }} />還原此題
        </button>
      </div>
    </div>
  );
}

/* ===================================================================== */
function ExportSheet({ banks, dirtyByCode, totalDirty, onResetAll, onClose }) {
  const [copied, setCopied] = useState('');
  const [manual, setManual] = useState(null); // {code, text}
  const manualRef = useRef(null);
  useEffect(() => { if (manual && manualRef.current) { manualRef.current.focus(); manualRef.current.select(); } }, [manual]);

  function download(code) {
    const data = JSON.stringify(banks[code]);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bank-' + code + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadAll() { CODES.forEach((c, i) => setTimeout(() => download(c), i * 250)); }
  function legacyCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.top = '-9999px'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (e) { return false; }
  }
  async function copy(code) {
    const text = JSON.stringify(banks[code]);
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch (e) { ok = false; }
    if (!ok) ok = legacyCopy(text);
    if (ok) {
      setCopied(code);
      setTimeout(() => setCopied(''), 1400);
    } else {
      // sandbox blocked clipboard — surface a selectable textarea instead
      setManual({ code, text });
    }
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <h3>題庫修改</h3>
        <div className="live-banner">
          <span className="dot" />
          <span>修改<strong>已即時套用</strong>至本瀏覽器的練習器，重新整理練習頁即可看到。下方匯出僅用於<strong>永久保存或分享</strong>。</span>
        </div>
        <p className="sub" style={{ marginTop: 14 }}>下載更新後的檔案，覆蓋專案中的 <code>data/bank-&lt;code&gt;.json</code>，即可讓所有人 / 所有裝置看到變更。</p>
        {CODES.map(code => (
          <div className="export-row" key={code}>
            <div>
              <div className="ex-nm">{BANK_META[code].nm}</div>
              <div className="ex-meta mono">bank-{code}.json · {banks[code].length} 題{dirtyByCode[code] ? ` · ${dirtyByCode[code]} 改` : ''}</div>
            </div>
            <span className="spacer" />
            <button className="btn btn-ghost" onClick={() => copy(code)}>{copied === code ? '已複製 ✓' : '複製'}</button>
            <button className="btn" onClick={() => download(code)}><A_ICON.download style={{ width: 15, height: 15 }} />下載</button>
          </div>
        ))}
        <button className="btn btn-primary sheet-close" onClick={downloadAll}>
          <A_ICON.download style={{ width: 16, height: 16 }} />一次下載全部 5 個檔案
        </button>
        <div className="sheet-foot">
          <button className="reset-link" disabled={!totalDirty} onClick={onResetAll}>
            <A_ICON.undo style={{ width: 14, height: 14 }} />清除全部暫存修改（還原 {totalDirty} 題）
          </button>
          <button className="btn btn-ghost" onClick={onClose}>關閉</button>
        </div>

        {manual && (
          <div className="manual-copy">
            <div className="manual-head">
              <span>瀏覽器阻擋了自動複製 — 請手動選取下方內容（已全選）按 <span className="kbd">⌘/Ctrl</span> + <span className="kbd">C</span> 複製 <span className="mono" style={{ color: 'var(--faint)' }}>bank-{manual.code}.json</span></span>
              <button className="btn btn-ghost" onClick={() => setManual(null)}>收起</button>
            </div>
            <textarea ref={manualRef} className="manual-area mono" readOnly value={manual.text} onFocus={e => e.target.select()} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================================================================== */
/* 會員管理面板                                                            */
/* ===================================================================== */
const MEMBERS_SS_KEY = 'ylab_admin_secret';

function MembersPanel() {
  const [secret, setSecret] = useState(() => sessionStorage.getItem(MEMBERS_SS_KEY) || '');
  const [secretInput, setSecretInput] = useState('');
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [addMsg, setAddMsg] = useState('');
  const [filter, setFilter] = useState('');

  async function apiFetch(method, body) {
    const res = await fetch(MEMBERS_API, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401) { setError('密碼錯誤'); setSecret(''); sessionStorage.removeItem(MEMBERS_SS_KEY); return null; }
    if (!res.ok) { setError('伺服器錯誤 ' + res.status); return null; }
    return res.json();
  }

  async function load() {
    setLoading(true); setError('');
    const data = await apiFetch('GET');
    if (data) setMembers(data);
    setLoading(false);
  }

  useEffect(() => { if (secret) load(); }, [secret]);

  async function addMember() {
    if (!addEmail.trim()) return;
    setAdding(true); setAddMsg('');
    const res = await apiFetch('POST', { email: addEmail.trim() });
    if (res?.ok) {
      setAddMsg('已新增 ' + addEmail.trim());
      setAddEmail('');
      await load();
    }
    setAdding(false);
  }

  async function toggleStatus(email, currentStatus) {
    const next = currentStatus === 'active' ? 'revoked' : 'active';
    await apiFetch('PATCH', { email, status: next });
    await load();
  }

  if (!secret) {
    return (
      <div className="members-auth">
        <div className="members-auth-box">
          <A_ICON.users style={{ width: 32, height: 32, opacity: .4, marginBottom: 16 }} />
          <div className="members-auth-title">輸入 Admin Secret 以存取會員管理</div>
          {error && <div className="members-error">{error}</div>}
          <input
            type="password" className="members-secret-input" placeholder="Admin Secret"
            value={secretInput} onChange={e => setSecretInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { sessionStorage.setItem(MEMBERS_SS_KEY, secretInput); setSecret(secretInput); } }}
          />
          <button className="btn btn-primary" onClick={() => { sessionStorage.setItem(MEMBERS_SS_KEY, secretInput); setSecret(secretInput); }}>
            進入
          </button>
        </div>
      </div>
    );
  }

  const filtered = (members || []).filter(m =>
    !filter || m.email.includes(filter.toLowerCase())
  );

  return (
    <div className="members-panel">
      <div className="members-toolbar">
        <div className="members-add">
          <input
            type="email" placeholder="新增會員 email…" value={addEmail}
            onChange={e => { setAddEmail(e.target.value); setAddMsg(''); }}
            onKeyDown={e => e.key === 'Enter' && addMember()}
          />
          <button className="btn btn-primary" onClick={addMember} disabled={adding || !addEmail.trim()}>
            {adding ? '新增中…' : '新增'}
          </button>
          {addMsg && <span className="members-addmsg">{addMsg}</span>}
        </div>
        <span className="spacer" />
        <div className="search-row" style={{ width: 220 }}>
          <A_ICON.search />
          <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="搜尋 email…" />
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={loading} title="重新整理">
          <A_ICON.refresh style={{ width: 15, height: 15 }} />
        </button>
      </div>

      {error && <div className="members-error" style={{ margin: '0 0 12px' }}>{error}</div>}

      {loading && !members && <div className="members-loading">載入中…</div>}

      {members && (
        <div className="members-table-wrap">
          <table className="members-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>狀態</th>
                <th>付款時間</th>
                <th>訂單 ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', opacity: .5, padding: '24px 0' }}>無符合會員</td></tr>
              )}
              {filtered.map(m => (
                <tr key={m.email} className={m.status === 'revoked' ? 'revoked' : ''}>
                  <td className="mono">{m.email}{m.is_admin && <span className="tag adm" style={{ marginLeft: 6 }}>Admin</span>}</td>
                  <td>
                    <span className={'mbadge ' + m.status}>{m.status === 'active' ? '啟用' : '已停用'}</span>
                  </td>
                  <td className="mono faint">{m.paid_at ? new Date(m.paid_at).toLocaleDateString('zh-TW') : '—'}</td>
                  <td className="mono faint" style={{ fontSize: 11 }}>{m.source_order_id || '—'}</td>
                  <td>
                    {!m.is_admin && (
                      <button
                        className={'btn btn-ghost btn-sm' + (m.status === 'active' ? ' danger' : '')}
                        onClick={() => toggleStatus(m.email, m.status)}
                        title={m.status === 'active' ? '停用' : '重新啟用'}
                      >
                        {m.status === 'active'
                          ? <><A_ICON.ban style={{ width: 13, height: 13 }} />停用</>
                          : <><A_ICON.refresh style={{ width: 13, height: 13 }} />啟用</>}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="members-count">{filtered.length} / {members.length} 位會員</div>
        </div>
      )}
    </div>
  );
}

/* ===================================================================== */
/* Admin root: 加入「會員」頁籤切換                                        */
/* ===================================================================== */
function AdminRoot() {
  const [tab, setTab] = useState('bank'); // 'bank' | 'members'

  return (
    <div style={{ display: 'contents' }}>
      {tab === 'bank'
        ? <Admin extraHeaderSlot={
            <button className="btn btn-ghost" onClick={() => setTab('members')} style={{ gap: 5 }}>
              <A_ICON.users style={{ width: 15, height: 15 }} />會員管理
            </button>
          } />
        : <MembersShell onBack={() => setTab('bank')} />
      }
    </div>
  );
}

function MembersShell({ onBack }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ylab_theme') || 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('ylab_theme', theme); } catch {}
  }, [theme]);

  return (
    <div className="admin-shell">
      <div className="admin-top">
        <div className="admin-top-inner">
          <button className="btn btn-ghost" onClick={onBack} style={{ gap: 5 }}>
            ← 題庫管理
          </button>
          <div className="brand" style={{ marginLeft: 8 }}>
            <A_ICON.users style={{ width: 20, height: 20 }} />
            <span>會員管理<span className="brand-sub">查看、新增、停用付費會員</span></span>
          </div>
          <span className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <MembersPanel />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminRoot />);
