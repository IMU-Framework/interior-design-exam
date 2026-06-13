/* ============ practice.jsx — mode 02 (依題組抽考) & 03 (逐題練習) setup ============ */

function GroupChips({
  groups,
  selected,
  onToggle,
  single
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "grp-chips"
  }, groups.map(g => {
    const on = single ? selected === g.id : selected.includes(g.id);
    return /*#__PURE__*/React.createElement("button", {
      key: g.id,
      className: 'grp-chip' + (on ? ' on' : ''),
      onClick: () => onToggle(g.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "gc-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "gc-label"
    }, g.label), !single && /*#__PURE__*/React.createElement("span", {
      className: 'gc-check' + (on ? ' on' : '')
    }, on ? /*#__PURE__*/React.createElement(Icon.check, {
      style: {
        width: 13,
        height: 13
      }
    }) : '')), /*#__PURE__*/React.createElement("span", {
      className: "gc-meta mono"
    }, g.single, " \u55AE\u9078 \xB7 ", g.multi, " \u8907\u9078"));
  }));
}
function Segmented({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "segmented"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    className: 'seg' + (value === o.v ? ' on' : ''),
    onClick: () => onChange(o.v)
  }, o.l)));
}

/* ---------------- Mode 02: 依題組抽考 ---------------- */
function DrawSetup({
  theme,
  setTheme,
  onBack,
  onBegin
}) {
  const groups = EXAM.GROUPS;
  const [sel, setSel] = useState(groups.map(g => g.id)); // default all
  const [types, setTypes] = useState('all');
  const [count, setCount] = useState(20);
  const [timed, setTimed] = useState(false);
  const [instant, setInstant] = useState(true);
  const [includeImg, setIncludeImg] = useState(true);
  const avail = EXAM.countAvailable(sel, types, includeImg);
  useEffect(() => {
    if (count > avail) setCount(Math.max(1, avail));
  }, [avail]);
  const prof = groups.filter(g => g.subj === '專業');
  const common = groups.filter(g => g.subj === '共同');
  const toggle = id => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const setBatch = (arr, on) => setSel(s => on ? [...new Set([...s, ...arr])] : s.filter(x => !arr.includes(x)));
  const profIds = prof.map(g => g.id),
    commonIds = common.map(g => g.id);
  const presets = [10, 20, 30, 50].filter(n => n <= avail || n === 10);
  function begin() {
    if (!sel.length || avail === 0) return;
    const n = Math.min(count, avail);
    const ids = EXAM.drawGroups({
      groupIds: sel,
      types,
      count: n,
      includeImg
    });
    onBegin({
      mode: 'draw',
      durationSec: timed ? n * 75 : 0,
      // ~1.25 min/題 if timed
      instantFeedback: instant,
      includeImg
    }, ids);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap topbar-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: onBack,
    "aria-label": "\u8FD4\u56DE"
  }, /*#__PURE__*/React.createElement(Icon.back, null)), /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", null, "\u4F9D\u984C\u7D44\u62BD\u8003")), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    setTheme: setTheme
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap setup"
  }, /*#__PURE__*/React.createElement("h1", null, "\u4F9D\u984C\u7D44\u62BD\u8003"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "\u6311\u9078\u60F3\u7DF4\u7FD2\u7684\u984C\u7D44\u3001\u984C\u578B\u8207\u984C\u6578\uFF0C\u7CFB\u7D71\u96A8\u6A5F\u62BD\u51FA\u7D44\u6210\u4E00\u4EFD\u7DF4\u7FD2\u5377\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u9078\u64C7\u984C\u7D44"), /*#__PURE__*/React.createElement("span", {
    className: "fl-act"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setBatch(profIds, !profIds.every(i => sel.includes(i)))
  }, profIds.every(i => sel.includes(i)) ? '取消專業' : '全選專業'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBatch(commonIds, !commonIds.every(i => sel.includes(i)))
  }, commonIds.every(i => sel.includes(i)) ? '取消共同' : '全選共同'))), /*#__PURE__*/React.createElement("div", {
    className: "sub-head"
  }, "\u5C08\u696D\u79D1\u76EE"), /*#__PURE__*/React.createElement(GroupChips, {
    groups: prof,
    selected: sel,
    onToggle: toggle
  }), /*#__PURE__*/React.createElement("div", {
    className: "sub-head"
  }, "\u5171\u540C\u79D1\u76EE"), /*#__PURE__*/React.createElement(GroupChips, {
    groups: common,
    selected: sel,
    onToggle: toggle
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u984C\u578B")), /*#__PURE__*/React.createElement(Segmented, {
    options: [{
      v: 'all',
      l: '單選＋複選'
    }, {
      v: 'single',
      l: '只考單選'
    }, {
      v: 'multi',
      l: '只考複選'
    }],
    value: types,
    onChange: setTypes
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u984C\u6578"), /*#__PURE__*/React.createElement("span", {
    className: "fl-note mono"
  }, "\u53EF\u62BD ", avail, " \u984C")), /*#__PURE__*/React.createElement("div", {
    className: "count-row"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "slider",
    min: "1",
    max: Math.max(1, avail),
    value: Math.min(count, Math.max(1, avail)),
    onChange: e => setCount(+e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "count-val mono"
  }, Math.min(count, Math.max(1, avail)))), /*#__PURE__*/React.createElement("div", {
    className: "presets"
  }, presets.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    className: 'preset' + (count === n ? ' on' : ''),
    onClick: () => setCount(n),
    disabled: n > avail
  }, n, " \u984C")), /*#__PURE__*/React.createElement("button", {
    className: 'preset' + (count >= avail ? ' on' : ''),
    onClick: () => setCount(avail)
  }, "\u5168\u90E8 ", avail)), /*#__PURE__*/React.createElement("div", {
    className: "opt-toggle",
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "\u5373\u6642\u5C0D\u932F\u56DE\u994B"), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, "\u6BCF\u984C\u4F5C\u7B54\u5F8C\u7ACB\u5373\u986F\u793A\u6B63\u89E3\uFF08\u7DF4\u7FD2\u5EFA\u8B70\u958B\u555F\uFF09")), /*#__PURE__*/React.createElement(Switch, {
    on: instant,
    onChange: setInstant
  })), /*#__PURE__*/React.createElement("div", {
    className: "opt-toggle"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "\u9650\u6642\u4F5C\u7B54"), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, "\u958B\u555F\u5247\u4EE5\u6BCF\u984C\u7D04 75 \u79D2\u5012\u6578\u8A08\u6642")), /*#__PURE__*/React.createElement(Switch, {
    on: timed,
    onChange: setTimed
  })), /*#__PURE__*/React.createElement("div", {
    className: "opt-toggle"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "\u7D0D\u5165\u542B\u5716\u984C\u76EE"), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, "\u5716\u8AAA\u5224\u8B80\u7B26\u865F\u984C\u4EE5\u5F85\u88DC\u5716\u6A94 placeholder \u5448\u73FE")), /*#__PURE__*/React.createElement(Switch, {
    on: includeImg,
    onChange: setIncludeImg
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: '100%',
      marginTop: 26
    },
    disabled: !sel.length || avail === 0,
    onClick: begin
  }, "\u62BD\u51FA ", Math.min(count, Math.max(1, avail)), " \u984C\u958B\u59CB ", /*#__PURE__*/React.createElement(Icon.arrow, null))));
}

/* ---------------- Mode 03: 依題組逐題練習 ---------------- */
function StudySetup({
  theme,
  setTheme,
  onBack,
  onBegin
}) {
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
    const ids = EXAM.studySet({
      groupId: sel,
      types,
      order,
      includeImg
    });
    if (!ids.length) return;
    onBegin({
      mode: 'study',
      durationSec: 0,
      instantFeedback: true,
      includeImg,
      groupId: sel
    }, ids);
  }
  function resetProg() {
    EXAM.study.resetGroup(sel);
    setTick(t => t + 1);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap topbar-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: onBack,
    "aria-label": "\u8FD4\u56DE"
  }, /*#__PURE__*/React.createElement(Icon.back, null)), /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", null, "\u4F9D\u984C\u7D44\u9010\u984C\u7DF4\u7FD2")), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    setTheme: setTheme
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap setup"
  }, /*#__PURE__*/React.createElement("h1", null, "\u4F9D\u984C\u7D44\u9010\u984C\u7DF4\u7FD2"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "\u9078\u4E00\u500B\u984C\u7D44\uFF0C\u9010\u984C\u4F5C\u7B54\u3001\u5373\u6642\u5C0D\u7167\u7B54\u6848\u3002\u7CFB\u7D71\u8A18\u4F4F\u4F60\u7684\u7CBE\u719F\u9032\u5EA6\uFF0C\u53EF\u96A8\u6642\u63A5\u7E8C\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u9078\u64C7\u4E00\u500B\u984C\u7D44")), /*#__PURE__*/React.createElement("div", {
    className: "sub-head"
  }, "\u5C08\u696D\u79D1\u76EE"), /*#__PURE__*/React.createElement(StudyGroupList, {
    groups: prof,
    sel: sel,
    onSel: setSel
  }), /*#__PURE__*/React.createElement("div", {
    className: "sub-head"
  }, "\u5171\u540C\u79D1\u76EE"), /*#__PURE__*/React.createElement(StudyGroupList, {
    groups: common,
    sel: sel,
    onSel: setSel
  }), /*#__PURE__*/React.createElement("div", {
    className: "study-prog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-head"
  }, /*#__PURE__*/React.createElement("span", null, g.label, " \xB7 \u7CBE\u719F\u9032\u5EA6"), /*#__PURE__*/React.createElement("button", {
    className: "sp-reset",
    onClick: resetProg
  }, "\u6E05\u9664\u6B64\u984C\u7D44\u9032\u5EA6")), /*#__PURE__*/React.createElement("div", {
    className: "sp-bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: (stats.mastered / stats.total * 100 || 0) + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "sp-meta mono"
  }, "\u5DF2\u7CBE\u719F ", stats.mastered, " / ", stats.total, " \xB7 \u7DF4\u7FD2\u904E ", stats.seen)), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u984C\u578B")), /*#__PURE__*/React.createElement(Segmented, {
    options: [{
      v: 'all',
      l: '單選＋複選'
    }, {
      v: 'single',
      l: '只練單選'
    }, {
      v: 'multi',
      l: '只練複選'
    }],
    value: types,
    onChange: setTypes
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u9806\u5E8F")), /*#__PURE__*/React.createElement(Segmented, {
    options: [{
      v: 'seq',
      l: '依題庫順序'
    }, {
      v: 'rand',
      l: '隨機順序'
    }],
    value: order,
    onChange: setOrder
  }), /*#__PURE__*/React.createElement("div", {
    className: "opt-toggle",
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "\u7D0D\u5165\u542B\u5716\u984C\u76EE"), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, "\u5716\u8AAA\u5224\u8B80\u7B26\u865F\u984C\u4EE5\u5F85\u88DC\u5716\u6A94 placeholder \u5448\u73FE")), /*#__PURE__*/React.createElement(Switch, {
    on: includeImg,
    onChange: setIncludeImg
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    style: {
      width: '100%',
      marginTop: 26
    },
    disabled: setLen === 0,
    onClick: begin
  }, "\u958B\u59CB\u9010\u984C\u7DF4\u7FD2\uFF08", setLen, " \u984C\uFF09", /*#__PURE__*/React.createElement(Icon.arrow, null))));
}
function StudyGroupList({
  groups,
  sel,
  onSel
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "grp-chips"
  }, groups.map(g => {
    const st = EXAM.study.groupStats(g.id);
    const on = sel === g.id;
    return /*#__PURE__*/React.createElement("button", {
      key: g.id,
      className: 'grp-chip radio' + (on ? ' on' : ''),
      onClick: () => onSel(g.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "gc-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "gc-radio"
    }, on && /*#__PURE__*/React.createElement("span", {
      className: "gc-radio-dot"
    })), /*#__PURE__*/React.createElement("span", {
      className: "gc-label"
    }, g.label)), /*#__PURE__*/React.createElement("span", {
      className: "gc-meta mono"
    }, g.total, " \u984C \xB7 \u7CBE\u719F ", st.mastered));
  }));
}
Object.assign(window, {
  DrawSetup,
  StudySetup
});