/* ============ exam-screen.jsx — question taking UI ============ */

function ImgPlaceholder() {
  return /*#__PURE__*/React.createElement("div", {
    className: "img-placeholder"
  }, /*#__PURE__*/React.createElement(Icon.image, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u6B64\u984C\u542B\u5716\u5F62 / \u7B26\u865F\uFF0C", /*#__PURE__*/React.createElement("b", null, "\u5716\u6A94\u5F85\u88DC"), "\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "mono"
  }, "image pending \u2014 \u8ACB\u53C3\u8003\u539F\u59CB\u984C\u5EAB\u5716\u793A\u4F5C\u7B54")));
}
function Option({
  idx,
  text,
  q,
  selected,
  revealed,
  onClick
}) {
  const n = idx + 1;
  const inAns = q.ans.includes(n);
  let cls = 'option ' + (q.type === 'multi' ? 'multi' : 'single');
  let mark = CIRC[idx];
  if (revealed) {
    if (inAns) {
      cls += ' correct';
      mark = /*#__PURE__*/React.createElement(Icon.check, {
        style: {
          width: 15,
          height: 15
        }
      });
    } else if (selected) {
      cls += ' wrong';
      mark = /*#__PURE__*/React.createElement(Icon.x, {
        style: {
          width: 15,
          height: 15
        }
      });
    }
  } else if (selected) {
    cls += ' selected';
  }
  const optImg = isOptionImageQ(q);
  return /*#__PURE__*/React.createElement("button", {
    className: cls + (optImg ? ' has-figure' : ''),
    disabled: revealed,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "marker"
  }, mark), /*#__PURE__*/React.createElement("span", {
    className: "otext"
  }, optImg ? /*#__PURE__*/React.createElement(OptionImage, {
    q: q,
    n: n
  }) : text));
}
function ExamScreen({
  exam,
  remaining,
  theme,
  setTheme,
  setAnswer,
  toggleFlag,
  reveal,
  onSubmit,
  onExit
}) {
  const {
    ids,
    answers,
    flags,
    revealed,
    config
  } = exam;
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
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
  function jump(i) {
    setIdx(i);
    setPaletteOpen(false);
    window.scrollTo({
      top: 0
    });
  }
  const warn = remaining <= 5 * 60;
  return /*#__PURE__*/React.createElement("div", {
    className: "exam"
  }, /*#__PURE__*/React.createElement("div", {
    className: "exam-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap exam-top-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    "aria-label": "\u96E2\u958B",
    onClick: onExit
  }, /*#__PURE__*/React.createElement(Icon.back, null)), showTimer ? /*#__PURE__*/React.createElement("div", {
    className: 'timer mono' + (warn ? ' warn' : '')
  }, /*#__PURE__*/React.createElement(Icon.clock, null), fmtTime(remaining)) : mode === 'study' ? /*#__PURE__*/React.createElement("div", {
    className: "timer mono",
    style: {
      borderColor: 'var(--ok)',
      color: 'var(--ok)'
    }
  }, /*#__PURE__*/React.createElement(Icon.check, {
    style: {
      width: 14,
      height: 14
    }
  }), correctSoFar, "/", seenCount) : /*#__PURE__*/React.createElement("div", {
    className: "timer mono"
  }, /*#__PURE__*/React.createElement(Icon.grid, {
    style: {
      width: 14,
      height: 14
    }
  }), mode === 'draw' ? '練習' : ''), /*#__PURE__*/React.createElement("div", {
    className: "progress-mini"
  }, mode === 'study' ? /*#__PURE__*/React.createElement(React.Fragment, null, "\u5DF2\u7DF4 ", /*#__PURE__*/React.createElement("b", null, seenCount), " / ", total) : /*#__PURE__*/React.createElement(React.Fragment, null, "\u5DF2\u7B54 ", /*#__PURE__*/React.createElement("b", null, answeredCount), " / ", total)), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    setTheme: setTheme
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      padding: '9px 16px'
    },
    onClick: () => setConfirmOpen(true)
  }, submitLabel))), /*#__PURE__*/React.createElement("div", {
    className: "wrap exam-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "q-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, catLabel(q)), /*#__PURE__*/React.createElement("span", {
    className: 'badge ' + (q.type === 'multi' ? 'multi' : '')
  }, q.type === 'multi' ? '複選' : '單選'), q.img && /*#__PURE__*/React.createElement("span", {
    className: "badge img"
  }, "\u542B\u5716"), /*#__PURE__*/React.createElement("button", {
    className: 'flag-btn' + (flags[q.id] ? ' on' : ''),
    onClick: () => toggleFlag(q.id)
  }, /*#__PURE__*/React.createElement(Icon.flag, null), flags[q.id] ? '已標記' : '標記'), /*#__PURE__*/React.createElement("span", {
    className: "q-index mono"
  }, String(idx + 1).padStart(2, '0'), " / ", total)), /*#__PURE__*/React.createElement("p", {
    className: "q-stem"
  }, q.stem), q.img && /*#__PURE__*/React.createElement(StemImage, {
    q: q
  }), q.type === 'multi' ? /*#__PURE__*/React.createElement("p", {
    className: "multi-note"
  }, "\u8907\u9078\u984C \xB7 \u9808\u5168\u90E8\u9078\u5C0D\u624D\u7B97\u6B63\u78BA", mode === 'formal' ? '（得 2 分；多選、漏選、錯選皆 0 分）' : '（多選、漏選、錯選皆算錯）') : /*#__PURE__*/React.createElement("p", {
    className: "single-note"
  }, "\u55AE\u9078\u984C", mode === 'formal' ? ' · 答對得 1 分' : ''), /*#__PURE__*/React.createElement("div", {
    className: "options"
  }, q.opts.map((t, i) => /*#__PURE__*/React.createElement(Option, {
    key: i,
    idx: i,
    text: t,
    q: q,
    selected: sel.includes(i + 1),
    revealed: isRevealed,
    onClick: () => pick(i + 1)
  }))), q.tail && /*#__PURE__*/React.createElement("p", {
    className: "q-tail"
  }, q.tail), config.instantFeedback && q.type === 'multi' && !isRevealed && sel.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => reveal(q.id)
  }, "\u78BA\u8A8D\u4F5C\u7B54")), isRevealed && /*#__PURE__*/React.createElement("div", {
    className: 'fb-line ' + (EXAM.arrEq(sel, q.ans) ? 'ok' : 'bad')
  }, EXAM.arrEq(sel, q.ans) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon.check, {
    style: {
      width: 16,
      height: 16
    }
  }), " \u7B54\u5C0D\u4E86") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon.x, {
    style: {
      width: 16,
      height: 16
    }
  }), " \u7B54\u932F \xB7 \u6B63\u89E3\u70BA ", q.ans.map(n => CIRC[n - 1]).join('、')))), /*#__PURE__*/React.createElement("div", {
    className: "exam-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap exam-nav-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => go(-1),
    disabled: idx === 0
  }, /*#__PURE__*/React.createElement(Icon.back, {
    style: {
      width: 16,
      height: 16
    }
  }), " \u4E0A\u4E00\u984C"), /*#__PURE__*/React.createElement("div", {
    className: "nav-spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "palette-btn",
    onClick: () => setPaletteOpen(true)
  }, /*#__PURE__*/React.createElement(Icon.grid, null), " \u984C\u865F ", idx + 1, "/", total), /*#__PURE__*/React.createElement("div", {
    className: "nav-spacer"
  }), idx === total - 1 ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setConfirmOpen(true)
  }, submitLabel) : /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => go(1)
  }, "\u4E0B\u4E00\u984C ", /*#__PURE__*/React.createElement(Icon.arrow, {
    style: {
      width: 16,
      height: 16
    }
  })))), paletteOpen && /*#__PURE__*/React.createElement(Palette, {
    qs: qs,
    ids: ids,
    answers: answers,
    flags: flags,
    idx: idx,
    singleCount: singleCount,
    mode: mode,
    onJump: jump,
    onClose: () => setPaletteOpen(false),
    onSubmit: () => {
      setPaletteOpen(false);
      setConfirmOpen(true);
    }
  }), confirmOpen && /*#__PURE__*/React.createElement(ConfirmSubmit, {
    total: total,
    answered: answeredCount,
    mode: mode,
    submitLabel: submitLabel,
    onCancel: () => setConfirmOpen(false),
    onConfirm: onSubmit
  }));
}
function Palette({
  qs,
  ids,
  answers,
  flags,
  idx,
  singleCount,
  mode,
  onJump,
  onClose,
  onSubmit
}) {
  const cell = i => {
    const id = ids[i];
    const answered = answers[id] && answers[id].length;
    let cls = 'qcell';
    if (answered) cls += ' answered';
    if (i === idx) cls += ' current';
    if (flags[id]) cls += ' flagged';
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: cls,
      onClick: () => onJump(i)
    }, i + 1);
  };
  const singles = [];
  const multis = [];
  qs.forEach((q, i) => (i < singleCount ? singles : multis).push(i));
  const pts = mode === 'formal';
  return /*#__PURE__*/React.createElement("div", {
    className: "drawer-mask",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-head"
  }, /*#__PURE__*/React.createElement("h3", null, "\u984C\u865F\u9762\u677F"), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon.close, null))), /*#__PURE__*/React.createElement("div", {
    className: "legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot"
  }), " ", mode === 'study' ? '未練習' : '未作答'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot answered"
  }), " ", mode === 'study' ? '已練習' : '已作答'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "dot flagged"
  }), " \u5DF2\u6A19\u8A18")), /*#__PURE__*/React.createElement("div", {
    className: "grid-sect"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gt"
  }, "\u55AE\u9078\u984C ", /*#__PURE__*/React.createElement("small", null, "1\u2013", singleCount, pts ? '　·　每題 1 分' : '')), /*#__PURE__*/React.createElement("div", {
    className: "qgrid"
  }, singles.map(cell))), multis.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid-sect"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gt"
  }, "\u8907\u9078\u984C ", /*#__PURE__*/React.createElement("small", null, singleCount + 1, "\u2013", qs.length, pts ? '　·　每題 2 分' : '')), /*#__PURE__*/React.createElement("div", {
    className: "qgrid"
  }, multis.map(cell))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: '100%',
      marginTop: 8
    },
    onClick: onSubmit
  }, mode === 'study' ? '結束練習並看統計' : '交卷並看成績')));
}
function ConfirmSubmit({
  total,
  answered,
  mode,
  submitLabel,
  onCancel,
  onConfirm
}) {
  const left = total - answered;
  const study = mode === 'study';
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-mask",
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("h3", null, study ? '結束這次練習？' : '確定交卷？'), /*#__PURE__*/React.createElement("p", null, study ? left > 0 ? `還有 ${left} 題尚未作答，結束後可看本次練習統計。進度會保留，下次可接續。` : '已完成全部題目，結束後查看練習統計。' : left > 0 ? `尚有 ${left} 題未作答，未作答以 0 分計。交卷後即無法修改。` : '已全部作答完畢。交卷後將計算成績並進入檢討。'), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: onCancel
  }, study ? '繼續練習' : '再檢查一下'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onConfirm
  }, study ? '結束練習' : '確定交卷'))));
}
Object.assign(window, {
  ExamScreen
});