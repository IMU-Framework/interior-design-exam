/* ============ exam-screen.jsx — question taking UI ============ */

function ImgPlaceholder() {
  return (
    <div className="img-placeholder">
      <Icon.image />
      <div>
        <div>此題含圖形 / 符號，<b>圖檔待補</b>。</div>
        <div className="mono">image pending — 請參考原始題庫圖示作答</div>
      </div>
    </div>
  );
}

function Option({ idx, text, q, selected, revealed, onClick }) {
  const n = idx + 1;
  const inAns = q.ans.includes(n);
  let cls = 'option ' + (q.type === 'multi' ? 'multi' : 'single');
  let mark = CIRC[idx];
  if (revealed) {
    if (inAns) { cls += ' correct'; mark = <Icon.check style={{ width: 15, height: 15 }} />; }
    else if (selected) { cls += ' wrong'; mark = <Icon.x style={{ width: 15, height: 15 }} />; }
  } else if (selected) {
    cls += ' selected';
  }
  const optImg = isOptionImageQ(q);
  return (
    <button className={cls + (optImg ? ' has-figure' : '')} disabled={revealed} onClick={onClick}>
      <span className="marker">{mark}</span>
      <span className="otext">
        {optImg ? <OptionImage q={q} n={n} /> : <RichText text={text} />}
      </span>
    </button>
  );
}

function ExamScreen({ exam, remaining, theme, setTheme, setAnswer, toggleFlag, reveal, onSubmit, onExit }) {
  const { ids, answers, flags, revealed, config } = exam;
  const qs = useMemo(() => EXAM.hydrate(ids), [ids]);
  const [idx, setIdx] = useState(() => {
    // resume to first unanswered
    const i = ids.findIndex(id => !(answers[id] && answers[id].length));
    return i < 0 ? 0 : i;
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const q = qs[idx];
  const total = qs.length;
  const answeredCount = ids.filter(id => answers[id] && answers[id].length).length;
  const isRevealed = config.instantFeedback && revealed[q.id];
  const sel = answers[q.id] || [];

  const singleCount = qs.filter(x => x.type === 'single').length;
  const mode = config.mode || 'formal';
  const showTimer = config.durationSec > 0;
  const submitLabel = mode === 'study' ? '結束練習' : '交卷';
  const correctSoFar = ids.filter(id => revealed[id] && EXAM.arrEq(answers[id] || [], EXAM.get(id).ans)).length;
  const seenCount = ids.filter(id => revealed[id]).length;

  function pick(n) {
    if (isRevealed) return;
    if (q.type === 'single') {
      setAnswer(q.id, [n]);
      if (config.instantFeedback) reveal(q.id);
    } else {
      const next = sel.includes(n) ? sel.filter(x => x !== n) : [...sel, n].sort();
      setAnswer(q.id, next);
    }
  }
  function go(d) {
    setIdx(i => Math.min(total - 1, Math.max(0, i + d)));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function jump(i) { setIdx(i); setPaletteOpen(false); window.scrollTo({ top: 0 }); }

  const warn = remaining <= 5 * 60;

  return (
    <div className="exam">
      <div className="exam-top">
        <div className="wrap exam-top-inner">
          <button className="icon-btn" aria-label="離開" onClick={onExit}><Icon.back /></button>
          {showTimer
            ? <div className={'timer mono' + (warn ? ' warn' : '')}><Icon.clock />{fmtTime(remaining)}</div>
            : mode === 'study'
              ? <div className="timer mono" style={{ borderColor: 'var(--ok)', color: 'var(--ok)' }}><Icon.check style={{ width: 14, height: 14 }} />{correctSoFar}/{seenCount}</div>
              : <div className="timer mono"><Icon.grid style={{ width: 14, height: 14 }} />{mode === 'draw' ? '練習' : ''}</div>}
          <div className="progress-mini">{mode === 'study' ? <>已練 <b>{seenCount}</b> / {total}</> : <>已答 <b>{answeredCount}</b> / {total}</>}</div>
          <div className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button className="btn btn-primary" style={{ padding: '9px 16px' }} onClick={() => setConfirmOpen(true)}>{submitLabel}</button>
        </div>
      </div>

      <div className="wrap exam-body">
        <div className="q-head">
          <span className="badge">{catLabel(q)}</span>
          <span className={'badge ' + (q.type === 'multi' ? 'multi' : '')}>{q.type === 'multi' ? '複選' : '單選'}</span>
          {q.img && <span className="badge img">含圖</span>}
          <button className={'flag-btn' + (flags[q.id] ? ' on' : '')} onClick={() => toggleFlag(q.id)}>
            <Icon.flag />{flags[q.id] ? '已標記' : '標記'}
          </button>
          <span className="q-index mono">{String(idx + 1).padStart(2, '0')} / {total}</span>
        </div>

        <p className="q-stem"><RichText text={q.stem} /></p>
        {q.img && <StemImage q={q} />}
        {q.type === 'multi'
          ? <p className="multi-note">複選題 · 須全部選對才算正確{mode === 'formal' ? '（得 2 分；多選、漏選、錯選皆 0 分）' : '（多選、漏選、錯選皆算錯）'}</p>
          : <p className="single-note">單選題{mode === 'formal' ? ' · 答對得 1 分' : ''}</p>}

        <div className="options">
          {q.opts.map((t, i) => (
            <Option key={i} idx={i} text={t} q={q} selected={sel.includes(i + 1)} revealed={isRevealed} onClick={() => pick(i + 1)} />
          ))}
        </div>
        {q.tail && <p className="q-tail">{q.tail}</p>}

        {config.instantFeedback && q.type === 'multi' && !isRevealed && sel.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-primary" onClick={() => reveal(q.id)}>確認作答</button>
          </div>
        )}
        {isRevealed && (
          <div className={'fb-line ' + (EXAM.arrEq(sel, q.ans) ? 'ok' : 'bad')}>
            {EXAM.arrEq(sel, q.ans)
              ? <><Icon.check style={{ width: 16, height: 16 }} /> 答對了</>
              : <><Icon.x style={{ width: 16, height: 16 }} /> 答錯 · 正解為 {q.ans.map(n => CIRC[n - 1]).join('、')}</>}
          </div>
        )}
      </div>

      <div className="exam-nav">
        <div className="wrap exam-nav-inner">
          <button className="btn" onClick={() => go(-1)} disabled={idx === 0}><Icon.back style={{ width: 16, height: 16 }} /> 上一題</button>
          <div className="nav-spacer" />
          <button className="palette-btn" onClick={() => setPaletteOpen(true)}><Icon.grid /> 題號 {idx + 1}/{total}</button>
          <div className="nav-spacer" />
          {idx === total - 1
            ? <button className="btn btn-primary" onClick={() => setConfirmOpen(true)}>{submitLabel}</button>
            : <button className="btn" onClick={() => go(1)}>下一題 <Icon.arrow style={{ width: 16, height: 16 }} /></button>}
        </div>
      </div>

      {paletteOpen && (
        <Palette qs={qs} ids={ids} answers={answers} flags={flags} idx={idx} singleCount={singleCount} mode={mode}
          answeredCount={answeredCount} seenCount={seenCount}
          onJump={jump} onClose={() => setPaletteOpen(false)} onSubmit={() => { setPaletteOpen(false); setConfirmOpen(true); }} />
      )}

      {confirmOpen && (
        <ConfirmSubmit total={total} answered={answeredCount} mode={mode} submitLabel={submitLabel}
          onCancel={() => setConfirmOpen(false)} onConfirm={onSubmit} />
      )}
    </div>
  );
}

function Palette({ qs, ids, answers, flags, idx, singleCount, mode, answeredCount, seenCount, onJump, onClose, onSubmit }) {
  const cell = (i) => {
    const id = ids[i];
    const answered = answers[id] && answers[id].length;
    let cls = 'qcell';
    if (answered) cls += ' answered';
    if (i === idx) cls += ' current';
    if (flags[id]) cls += ' flagged';
    return <button key={i} className={cls} onClick={() => onJump(i)}>{i + 1}</button>;
  };
  const singles = []; const multis = [];
  qs.forEach((q, i) => (i < singleCount ? singles : multis).push(i));
  const pts = mode === 'formal';
  return (
    <div className="drawer-mask" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <h3>題號面板<span className="palette-prog">{mode === 'study' ? <>已練 {seenCount} / {qs.length}</> : <>已答 {answeredCount} / {qs.length}</>}</span></h3>
          <button className="icon-btn" onClick={onClose}><Icon.close /></button>
        </div>
        <div className="legend">
          <span><i className="dot" /> {mode === 'study' ? '未練習' : '未作答'}</span>
          <span><i className="dot answered" /> {mode === 'study' ? '已練習' : '已作答'}</span>
          <span><i className="dot flagged" /> 已標記</span>
        </div>
        <div className="grid-sect">
          <div className="gt">單選題 <small>1–{singleCount}{pts ? '　·　每題 1 分' : ''}</small></div>
          <div className="qgrid">{singles.map(cell)}</div>
        </div>
        {multis.length > 0 && (
          <div className="grid-sect">
            <div className="gt">複選題 <small>{singleCount + 1}–{qs.length}{pts ? '　·　每題 2 分' : ''}</small></div>
            <div className="qgrid">{multis.map(cell)}</div>
          </div>
        )}
        <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} onClick={onSubmit}>{mode === 'study' ? '結束練習並看統計' : '交卷並看成績'}</button>
      </div>
    </div>
  );
}

function ConfirmSubmit({ total, answered, mode, submitLabel, onCancel, onConfirm }) {
  const left = total - answered;
  const study = mode === 'study';
  return (
    <div className="modal-mask" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{study ? '結束這次練習？' : '確定交卷？'}</h3>
        <p>{study
          ? (left > 0 ? `還有 ${left} 題尚未作答，結束後可看本次練習統計。進度會保留，下次可接續。` : '已完成全部題目，結束後查看練習統計。')
          : (left > 0 ? `尚有 ${left} 題未作答，未作答以 0 分計。交卷後即無法修改。` : '已全部作答完畢。交卷後將計算成績並進入檢討。')}</p>
        <div className="modal-actions">
          <button className="btn" onClick={onCancel}>{study ? '繼續練習' : '再檢查一下'}</button>
          <button className="btn btn-primary" onClick={onConfirm}>{study ? '結束練習' : '確定交卷'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ExamScreen });
