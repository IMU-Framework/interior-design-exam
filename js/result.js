/* ============ result.jsx — score + review ============ */

function Result({
  exam,
  theme,
  setTheme,
  onHome,
  onRetry
}) {
  const {
    ids,
    answers,
    flags,
    revealed,
    config
  } = exam;
  const allQs = useMemo(() => EXAM.hydrate(ids), [ids]);
  const mode = config.mode || 'formal';
  const formal = mode === 'formal';
  // study mode: report only over questions actually practiced (revealed) this session
  const scopeIds = mode === 'study' ? ids.filter(id => revealed && revealed[id]) : ids;
  const qs = mode === 'study' ? EXAM.hydrate(scopeIds) : allQs;
  const r = useMemo(() => EXAM.score(scopeIds, answers), [scopeIds.join(','), answers]);
  const [filter, setFilter] = useState('all'); // all | wrong | flagged
  const singleCount = qs.filter(q => q.type === 'single').length;
  const catOrder = ['圖說', '法規', '繪圖', '估算', '實務', '職安', '倫理', '環境', '節能'];
  const cats = Object.entries(r.catAgg).sort((a, b) => catOrder.indexOf(a[0]) - catOrder.indexOf(b[0]));
  const acc = r.totalQ ? Math.round(r.correct / r.totalQ * 100) : 0;
  const shown = qs.map((q, i) => ({
    q,
    i
  })).filter(({
    q
  }) => {
    if (filter === 'wrong') return !EXAM.arrEq(answers[q.id] || [], q.ans);
    if (filter === 'flagged') return flags[q.id];
    return true;
  });
  const heroTitle = mode === 'study' ? '練習統計' : mode === 'draw' ? '抽考結果' : '成績與檢討';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap topbar-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark"
  }, "\u4E59"), /*#__PURE__*/React.createElement("span", null, heroTitle)), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    setTheme: setTheme
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap result"
  }, formal ? /*#__PURE__*/React.createElement("div", {
    className: "score-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'verdict ' + (r.pass ? 'pass' : 'fail')
  }, r.pass ? '及格 PASS' : '不及格 FAIL'), /*#__PURE__*/React.createElement("div", {
    className: "score-big mono"
  }, r.total, /*#__PURE__*/React.createElement("small", null, " / 100")), /*#__PURE__*/React.createElement("div", {
    className: "score-cap"
  }, "\u53CA\u683C\u6A19\u6E96 60 \u5206\u3000\xB7\u3000", r.pass ? `超出標準 ${r.total - 60} 分` : `距及格還差 ${60 - r.total} 分`)) : /*#__PURE__*/React.createElement("div", {
    className: "score-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "verdict",
    style: {
      color: 'var(--muted)'
    }
  }, mode === 'study' ? '本次練習正確率' : '本次正確率'), /*#__PURE__*/React.createElement("div", {
    className: "score-big mono"
  }, acc, /*#__PURE__*/React.createElement("small", null, "%")), /*#__PURE__*/React.createElement("div", {
    className: "score-cap"
  }, r.totalQ === 0 ? '本次尚未作答任何題目' : /*#__PURE__*/React.createElement(React.Fragment, null, "\u7B54\u5C0D ", r.correct, " / ", r.totalQ, " \u984C", mode === 'study' ? '（本次練習）' : '', r.multiN > 0 ? `　·　含複選 ${r.multiRight}/${r.multiN} 題全對` : ''))), formal ? /*#__PURE__*/React.createElement("div", {
    className: "score-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "score-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, /*#__PURE__*/React.createElement("span", null, "\u55AE\u9078\u984C"), /*#__PURE__*/React.createElement("span", null, r.singleRight, "/", r.singleN, " \u984C\u7B54\u5C0D")), /*#__PURE__*/React.createElement("div", {
    className: "v mono"
  }, r.singleScore, /*#__PURE__*/React.createElement("small", null, " / 60 \u5206")), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: r.singleScore / 60 * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, "\u6BCF\u984C 1 \u5206 \xB7 \u7121\u5012\u6263")), /*#__PURE__*/React.createElement("div", {
    className: "score-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, /*#__PURE__*/React.createElement("span", null, "\u8907\u9078\u984C"), /*#__PURE__*/React.createElement("span", null, r.multiRight, "/", r.multiN, " \u984C\u5168\u5C0D")), /*#__PURE__*/React.createElement("div", {
    className: "v mono"
  }, r.multiScore, /*#__PURE__*/React.createElement("small", null, " / 40 \u5206")), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: r.multiScore / 40 * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, "\u6BCF\u984C 2 \u5206 \xB7 \u9808\u5B8C\u5168\u4E00\u81F4 \xB7 \u56B4\u683C\u96F6\u5206\u5236"))) : /*#__PURE__*/React.createElement("div", {
    className: "score-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "score-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, /*#__PURE__*/React.createElement("span", null, "\u55AE\u9078\u984C")), /*#__PURE__*/React.createElement("div", {
    className: "v mono"
  }, r.singleRight, /*#__PURE__*/React.createElement("small", null, " / ", r.singleN, " \u984C\u5C0D")), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: (r.singleN ? r.singleRight / r.singleN * 100 : 0) + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, r.singleN ? Math.round(r.singleRight / r.singleN * 100) + '% 正確' : '本次未含單選')), /*#__PURE__*/React.createElement("div", {
    className: "score-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, /*#__PURE__*/React.createElement("span", null, "\u8907\u9078\u984C")), /*#__PURE__*/React.createElement("div", {
    className: "v mono"
  }, r.multiRight, /*#__PURE__*/React.createElement("small", null, " / ", r.multiN, " \u984C\u5168\u5C0D")), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: (r.multiN ? r.multiRight / r.multiN * 100 : 0) + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, r.multiN ? '須完全一致才算對' : '本次未含複選'))), mode === 'study' && config.groupId && (() => {
    const st = EXAM.study.groupStats(config.groupId);
    const g = EXAM.getGroup(config.groupId);
    return /*#__PURE__*/React.createElement("div", {
      className: "study-prog",
      style: {
        marginTop: 4,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "sp-head"
    }, /*#__PURE__*/React.createElement("span", null, g.label, " \xB7 \u7D2F\u7A4D\u7CBE\u719F\u9032\u5EA6")), /*#__PURE__*/React.createElement("div", {
      className: "sp-bar"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: (st.mastered / st.total * 100 || 0) + '%'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "sp-meta mono"
    }, "\u5DF2\u7CBE\u719F ", st.mastered, " / ", st.total, " \u984C \xB7 \u7DF4\u7FD2\u904E ", st.seen, " \u984C\uFF08\u8DE8\u5404\u6B21\u7DF4\u7FD2\u7D2F\u8A08\uFF09"));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, /*#__PURE__*/React.createElement("h2", null, formal ? '各工作項目答對率' : '各題組答對率')), /*#__PURE__*/React.createElement("div", {
    className: "cat-stats"
  }, cats.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    className: "cat-stat",
    key: k
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, v.name), /*#__PURE__*/React.createElement("span", {
    className: "track"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: v.right / v.total * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "frac mono"
  }, v.right, "/", v.total)))), /*#__PURE__*/React.createElement("div", {
    className: "review-head"
  }, /*#__PURE__*/React.createElement("h2", null, "\u9010\u984C\u6AA2\u8A0E"), /*#__PURE__*/React.createElement("div", {
    className: "filter-chips"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'chip' + (filter === 'all' ? ' on' : ''),
    onClick: () => setFilter('all')
  }, "\u5168\u90E8 ", qs.length), /*#__PURE__*/React.createElement("button", {
    className: 'chip' + (filter === 'wrong' ? ' on' : ''),
    onClick: () => setFilter('wrong')
  }, "\u7B54\u932F ", qs.filter(q => !EXAM.arrEq(answers[q.id] || [], q.ans)).length), /*#__PURE__*/React.createElement("button", {
    className: 'chip' + (filter === 'flagged' ? ' on' : ''),
    onClick: () => setFilter('flagged')
  }, "\u6A19\u8A18 ", qs.filter(q => flags[q.id]).length))), shown.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)'
    }
  }, "\u6C92\u6709\u7B26\u5408\u689D\u4EF6\u7684\u984C\u76EE\u3002"), shown.map(({
    q,
    i
  }) => /*#__PURE__*/React.createElement(ReviewItem, {
    key: q.id,
    q: q,
    i: i,
    singleCount: singleCount,
    mine: answers[q.id] || [],
    flagged: flags[q.id]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-lg",
    onClick: onHome
  }, "\u56DE\u9996\u9801"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: onRetry,
    style: {
      flex: 1
    }
  }, mode === 'study' ? '再練一輪 ' : mode === 'draw' ? '再抽一份新練習 ' : '再考一份新考卷 ', /*#__PURE__*/React.createElement(Icon.arrow, null)))));
}
function ReviewItem({
  q,
  i,
  singleCount,
  mine,
  flagged
}) {
  const correct = EXAM.arrEq(mine, q.ans);
  const dispNum = i < singleCount ? i + 1 : i - singleCount + 1;
  return /*#__PURE__*/React.createElement("div", {
    className: 'rev-item ' + (correct ? 'r-correct' : 'r-wrong')
  }, /*#__PURE__*/React.createElement("div", {
    className: "rev-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, catLabel(q)), /*#__PURE__*/React.createElement("span", {
    className: 'badge ' + (q.type === 'multi' ? 'multi' : '')
  }, q.type === 'multi' ? '複選' : '單選', " ", dispNum), q.img && /*#__PURE__*/React.createElement("span", {
    className: "badge img"
  }, "\u542B\u5716"), flagged && /*#__PURE__*/React.createElement("span", {
    className: "flag-btn on",
    style: {
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon.flag, null), "\u6A19\u8A18"), /*#__PURE__*/React.createElement("span", {
    className: 'rev-tag ' + (correct ? 'ok' : 'bad')
  }, correct ? '✓ 答對' : '✗ 答錯')), /*#__PURE__*/React.createElement("p", {
    className: "rev-stem"
  }, q.stem), q.img && /*#__PURE__*/React.createElement(StemImage, {
    q: q
  }), /*#__PURE__*/React.createElement("div", {
    className: "rev-opts"
  }, q.opts.map((t, j) => {
    const n = j + 1;
    const isAns = q.ans.includes(n);
    const picked = mine.includes(n);
    let cls = 'rev-opt';
    if (isAns) cls += ' ans';else if (picked) cls += ' picked-wrong';
    return /*#__PURE__*/React.createElement("div", {
      className: cls,
      key: j
    }, /*#__PURE__*/React.createElement("span", {
      className: "rm"
    }, CIRC[j]), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, isOptionImageQ(q) ? /*#__PURE__*/React.createElement(OptionImage, {
      q: q,
      n: n
    }) : t), isAns && /*#__PURE__*/React.createElement("span", {
      className: "rev-tag ok"
    }, "\u6B63\u89E3"), picked && !isAns && /*#__PURE__*/React.createElement("span", {
      className: "rev-tag bad"
    }, "\u4F60\u9078"), picked && isAns && /*#__PURE__*/React.createElement("span", {
      className: "rev-tag ok",
      style: {
        color: 'var(--ok)'
      }
    }, "\u4F60\u9078 \u2713"));
  })), q.tail && /*#__PURE__*/React.createElement("p", {
    className: "rev-tail"
  }, q.tail), /*#__PURE__*/React.createElement("div", {
    className: "rev-meta"
  }, "\u4F60\u7684\u4F5C\u7B54\uFF1A", mine.length ? mine.map(n => CIRC[n - 1]).join(' ') : '未作答', "\u3000\xB7\u3000\u6A19\u6E96\u7B54\u6848\uFF1A", q.ans.map(n => CIRC[n - 1]).join(' '), "\u3000\xB7\u3000", q.id));
}
Object.assign(window, {
  Result
});