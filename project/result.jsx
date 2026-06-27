/* ============ result.jsx — score + review ============ */

function Result({ exam, theme, setTheme, onHome, onRetry }) {
  const { ids, answers, flags, revealed, config } = exam;
  const allQs = useMemo(() => EXAM.hydrate(ids), [ids]);
  const mode = config.mode || 'formal';
  const formal = mode === 'formal';
  // study mode: report only over questions actually practiced (revealed) this session
  const scopeIds = mode === 'study' ? ids.filter(id => revealed && revealed[id]) : ids;
  const qs = mode === 'study' ? EXAM.hydrate(scopeIds) : allQs;
  const r = useMemo(() => EXAM.score(scopeIds, answers), [scopeIds.join(','), answers]);
  const [filter, setFilter] = useState('all'); // all | wrong | flagged
  const singleCount = qs.filter(q => q.type === 'single').length;

  const catOrder = ['圖說','法規','繪圖','估算','實務','職安','倫理','環境','節能'];
  const cats = Object.entries(r.catAgg).sort((a, b) => catOrder.indexOf(a[0]) - catOrder.indexOf(b[0]));
  const acc = r.totalQ ? Math.round(r.correct / r.totalQ * 100) : 0;

  const shown = qs.map((q, i) => ({ q, i })).filter(({ q }) => {
    if (filter === 'wrong') return !EXAM.arrEq(answers[q.id] || [], q.ans);
    if (filter === 'flagged') return flags[q.id];
    return true;
  });

  const heroTitle = mode === 'study' ? '練習統計' : mode === 'draw' ? '抽考結果' : '成績與檢討';

  return (
    <div>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand"><span className="brand-mark">乙</span><span>{heroTitle}</span></div>
          <div className="spacer" />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div className="wrap result">
        {formal ? (
          <div className="score-hero">
            <div className={'verdict ' + (r.pass ? 'pass' : 'fail')}>{r.pass ? '及格 PASS' : '不及格 FAIL'}</div>
            <div className="score-big mono">{r.total}<small> / 100</small></div>
            <div className="score-cap">及格標準 60 分　·　{r.pass ? `超出標準 ${r.total - 60} 分` : `距及格還差 ${60 - r.total} 分`}</div>
          </div>
        ) : (
          <div className="score-hero">
            <div className="verdict" style={{ color: 'var(--muted)' }}>{mode === 'study' ? '本次練習正確率' : '本次正確率'}</div>
            <div className="score-big mono">{acc}<small>%</small></div>
            <div className="score-cap">{r.totalQ === 0 ? '本次尚未作答任何題目' : <>答對 {r.correct} / {r.totalQ} 題{mode === 'study' ? '（本次練習）' : ''}{r.multiN > 0 ? `　·　含複選 ${r.multiRight}/${r.multiN} 題全對` : ''}</>}</div>
          </div>
        )}

        {formal ? (
          <div className="score-cards">
            <div className="score-card">
              <div className="h"><span>單選題</span><span>{r.singleRight}/{r.singleN} 題答對</span></div>
              <div className="v mono">{r.singleScore}<small> / 60 分</small></div>
              <div className="bar"><i style={{ width: (r.singleScore / 60 * 100) + '%' }} /></div>
              <div className="meta">每題 1 分 · 無倒扣</div>
            </div>
            <div className="score-card">
              <div className="h"><span>複選題</span><span>{r.multiRight}/{r.multiN} 題全對</span></div>
              <div className="v mono">{r.multiScore}<small> / 40 分</small></div>
              <div className="bar"><i style={{ width: (r.multiScore / 40 * 100) + '%' }} /></div>
              <div className="meta">每題 2 分 · 須完全一致 · 嚴格零分制</div>
            </div>
          </div>
        ) : (
          <div className="score-cards">
            <div className="score-card">
              <div className="h"><span>單選題</span></div>
              <div className="v mono">{r.singleRight}<small> / {r.singleN} 題對</small></div>
              <div className="bar"><i style={{ width: (r.singleN ? r.singleRight / r.singleN * 100 : 0) + '%' }} /></div>
              <div className="meta">{r.singleN ? Math.round(r.singleRight / r.singleN * 100) + '% 正確' : '本次未含單選'}</div>
            </div>
            <div className="score-card">
              <div className="h"><span>複選題</span></div>
              <div className="v mono">{r.multiRight}<small> / {r.multiN} 題全對</small></div>
              <div className="bar"><i style={{ width: (r.multiN ? r.multiRight / r.multiN * 100 : 0) + '%' }} /></div>
              <div className="meta">{r.multiN ? '須完全一致才算對' : '本次未含複選'}</div>
            </div>
          </div>
        )}

        {mode === 'study' && config.groupId && (() => {
          const st = EXAM.study.groupStats(config.groupId);
          const g = EXAM.getGroup(config.groupId);
          return (
            <div className="study-prog" style={{ marginTop: 4, marginBottom: 8 }}>
              <div className="sp-head"><span>{g.label} · 累積精熟進度</span></div>
              <div className="sp-bar"><i style={{ width: (st.mastered / st.total * 100 || 0) + '%' }} /></div>
              <div className="sp-meta mono">已精熟 {st.mastered} / {st.total} 題 · 練習過 {st.seen} 題（跨各次練習累計）</div>
            </div>
          );
        })()}

        <div className="section-label"><h2>{formal ? '各工作項目答對率' : '各題組答對率'}</h2></div>
        <div className="cat-stats">
          {cats.map(([k, v]) => (
            <div className="cat-stat" key={k}>
              <span className="name">{v.name}</span>
              <span className="track"><i style={{ width: (v.right / v.total * 100) + '%' }} /></span>
              <span className="frac mono">{v.right}/{v.total}</span>
            </div>
          ))}
        </div>

        <div className="review-head">
          <h2>逐題檢討</h2>
          <div className="filter-chips">
            <button className={'chip' + (filter === 'all' ? ' on' : '')} onClick={() => setFilter('all')}>全部 {qs.length}</button>
            <button className={'chip' + (filter === 'wrong' ? ' on' : '')} onClick={() => setFilter('wrong')}>答錯 {qs.filter(q => !EXAM.arrEq(answers[q.id] || [], q.ans)).length}</button>
            <button className={'chip' + (filter === 'flagged' ? ' on' : '')} onClick={() => setFilter('flagged')}>標記 {qs.filter(q => flags[q.id]).length}</button>
          </div>
        </div>

        {shown.length === 0 && <p style={{ color: 'var(--muted)' }}>沒有符合條件的題目。</p>}
        {shown.map(({ q, i }) => <ReviewItem key={q.id} q={q} i={i} singleCount={singleCount} mine={answers[q.id] || []} flagged={flags[q.id]} />)}

        <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
          <button className="btn btn-lg" onClick={onHome}>回首頁</button>
          <button className="btn btn-primary btn-lg" onClick={onRetry} style={{ flex: 1 }}>
            {mode === 'study' ? '再練一輪 ' : mode === 'draw' ? '再抽一份新練習 ' : '再考一份新考卷 '}<Icon.arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ q, i, singleCount, mine, flagged }) {
  const correct = EXAM.arrEq(mine, q.ans);
  const dispNum = i < singleCount ? i + 1 : i - singleCount + 1;
  return (
    <div className={'rev-item ' + (correct ? 'r-correct' : 'r-wrong')}>
      <div className="rev-top">
        <span className="badge">{catLabel(q)}</span>
        <span className={'badge ' + (q.type === 'multi' ? 'multi' : '')}>{q.type === 'multi' ? '複選' : '單選'} {dispNum}</span>
        {q.img && <span className="badge img">含圖</span>}
        {flagged && <span className="flag-btn on" style={{ pointerEvents: 'none' }}><Icon.flag />標記</span>}
        <span className={'rev-tag ' + (correct ? 'ok' : 'bad')}>{correct ? '✓ 答對' : '✗ 答錯'}</span>
      </div>
      <p className="rev-stem"><RichText text={q.stem} /></p>
      {q.img && <StemImage q={q} />}
      <div className="rev-opts">
        {q.opts.map((t, j) => {
          const n = j + 1;
          const isAns = q.ans.includes(n);
          const picked = mine.includes(n);
          let cls = 'rev-opt';
          if (isAns) cls += ' ans';
          else if (picked) cls += ' picked-wrong';
          return (
            <div className={cls} key={j}>
              <span className="rm">{CIRC[j]}</span>
              <span style={{ flex: 1 }}>{isOptionImageQ(q) ? <OptionImage q={q} n={n} /> : <RichText text={t} />}</span>
              {isAns && <span className="rev-tag ok">正解</span>}
              {picked && !isAns && <span className="rev-tag bad">你選</span>}
              {picked && isAns && <span className="rev-tag ok" style={{ color: 'var(--ok)' }}>你選 ✓</span>}
            </div>
          );
        })}
      </div>
      {q.tail && <p className="rev-tail">{q.tail}</p>}
      <div className="rev-meta">你的作答：{mine.length ? mine.map(n => CIRC[n - 1]).join(' ') : '未作答'}　·　標準答案：{q.ans.map(n => CIRC[n - 1]).join(' ')}　·　{q.id}</div>
    </div>
  );
}

Object.assign(window, { Result });
