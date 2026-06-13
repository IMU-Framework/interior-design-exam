/* ============ home.jsx — Home + Setup screens ============ */

function Home({
  theme,
  setTheme,
  onStart,
  onResume,
  resume
}) {
  const s = EXAM.stats;
  const resumeLabel = resume ? resume.mode === 'study' ? '繼續上次的逐題練習' : resume.mode === 'draw' ? '繼續上次的抽考練習' : '繼續上次的考卷' : '';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap topbar-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark"
  }, "\u4E59"), /*#__PURE__*/React.createElement("span", null, "\u4E59\u7D1A\u5B78\u79D1\u6E2C\u9A57\u6A21\u64EC\u6A5F", /*#__PURE__*/React.createElement("span", {
    className: "brand-sub"
  }, " \xB7 \u5EFA\u7BC9\u7269\u5BA4\u5167\u8A2D\u8A08"))), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    setTheme: setTheme
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "12500 \u5EFA\u7BC9\u7269\u5BA4\u5167\u8A2D\u8A08 \xB7 \u4E59\u7D1A"), /*#__PURE__*/React.createElement("h1", null, "\u5B78\u79D1\u6E2C\u9A57\u6A21\u64EC\u6A5F"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "\u4F9D\u6280\u8853\u58EB\u6280\u80FD\u6AA2\u5B9A\u5B78\u79D1\u53C3\u8003\u8CC7\u6599\u5EFA\u7F6E\u984C\u5EAB\uFF0C\u6A21\u64EC\u6B63\u5F0F\u8003\u8A66\u7684\u96A8\u6A5F\u62BD\u984C\u3001\u8A08\u5206\u8207\u53CA\u683C\u5224\u5B9A\u3002\u6E96\u5099\u597D\u5C31\u958B\u59CB\u5427\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n mono"
  }, s.total), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "\u984C\u5EAB\u7E3D\u984C\u6578")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n mono"
  }, s.profTotal), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "\u5C08\u696D\u79D1\u76EE\uFF085 \u5927\u5DE5\u4F5C\u9805\u76EE\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n mono"
  }, s.commonTotal), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "\u5171\u540C\u79D1\u76EE\uFF084 \u985E\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n mono"
  }, "100"), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "\u6EFF\u5206 / 60 \u53CA\u683C"))), resume && /*#__PURE__*/React.createElement("div", {
    className: "resume-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("h3", null, resumeLabel), /*#__PURE__*/React.createElement("p", null, "\u5DF2\u4F5C\u7B54 ", Object.keys(resume.answers || {}).length, " / ", resume.ids.length, " \u984C", resume.mode === 'formal' ? ` · 剩餘時間 ${fmtTime(resume.remaining)}` : '')), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => {
      EXAM.clear();
      location.reload();
    }
  }, "\u653E\u68C4"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onResume
  }, "\u7E7C\u7E8C ", /*#__PURE__*/React.createElement(Icon.arrow, null))), /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, /*#__PURE__*/React.createElement("h2", null, "\u6E2C\u9A57\u6A21\u5F0F"), /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "\u9078\u64C7\u4E00\u7A2E\u958B\u59CB")), /*#__PURE__*/React.createElement("div", {
    className: "mode-grid"
  }, /*#__PURE__*/React.createElement("button", {
    className: "mode-card",
    onClick: () => onStart('formal')
  }, /*#__PURE__*/React.createElement("span", {
    className: "mode-num"
  }, "01"), /*#__PURE__*/React.createElement("span", {
    className: "mode-body"
  }, /*#__PURE__*/React.createElement("h3", null, "\u6B63\u5F0F\u8003\u8A66\u6A21\u64EC"), /*#__PURE__*/React.createElement("p", null, "80 \u984C\u96A8\u6A5F\u62BD\u51FA \xB7 60 \u55AE\u9078\uFF0B20 \u8907\u9078 \xB7 100 \u5206\u9418 \xB7 \u6EFF\u5206 100")), /*#__PURE__*/React.createElement("span", {
    className: "mode-arrow"
  }, /*#__PURE__*/React.createElement(Icon.arrow, null))), /*#__PURE__*/React.createElement("button", {
    className: "mode-card",
    onClick: () => onStart('draw')
  }, /*#__PURE__*/React.createElement("span", {
    className: "mode-num"
  }, "02"), /*#__PURE__*/React.createElement("span", {
    className: "mode-body"
  }, /*#__PURE__*/React.createElement("h3", null, "\u4F9D\u984C\u7D44\u62BD\u8003"), /*#__PURE__*/React.createElement("p", null, "\u81EA\u9078\u5DE5\u4F5C\u9805\u76EE\u3001\u984C\u578B\u8207\u984C\u6578\uFF0C\u96A8\u6A5F\u62BD\u51FA\u7DF4\u7FD2\u5377")), /*#__PURE__*/React.createElement("span", {
    className: "mode-arrow"
  }, /*#__PURE__*/React.createElement(Icon.arrow, null))), /*#__PURE__*/React.createElement("button", {
    className: "mode-card",
    onClick: () => onStart('study')
  }, /*#__PURE__*/React.createElement("span", {
    className: "mode-num"
  }, "03"), /*#__PURE__*/React.createElement("span", {
    className: "mode-body"
  }, /*#__PURE__*/React.createElement("h3", null, "\u4F9D\u984C\u7D44\u9010\u984C\u7DF4\u7FD2"), /*#__PURE__*/React.createElement("p", null, "\u9010\u984C\u700F\u89BD\u6574\u500B\u984C\u7D44\u3001\u5373\u6642\u5C0D\u7167\u7B54\u6848\uFF0C\u8A18\u9304\u7CBE\u719F\u9032\u5EA6")), /*#__PURE__*/React.createElement("span", {
    className: "mode-arrow"
  }, /*#__PURE__*/React.createElement(Icon.arrow, null))))));
}
function SpecRow({
  k,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "spec-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, children));
}
function Setup({
  theme,
  setTheme,
  onBack,
  onBegin
}) {
  const [includeImg, setIncludeImg] = useState(true);
  const [instant, setInstant] = useState(false);
  function begin() {
    const cfg = {
      ...EXAM.DEFAULT_CONFIG,
      includeImg,
      instantFeedback: instant
    };
    onBegin(cfg);
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
  }, /*#__PURE__*/React.createElement("span", null, "\u6B63\u5F0F\u8003\u8A66\u6A21\u64EC")), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    setTheme: setTheme
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap setup"
  }, /*#__PURE__*/React.createElement("h1", null, "\u6B63\u5F0F\u8003\u8A66\u6A21\u64EC"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "\u7CFB\u7D71\u5C07\u4F9D\u4E0B\u5217\u914D\u984D\u96A8\u6A5F\u62BD\u984C\uFF0C\u7D44\u6210\u4E00\u4EFD\u5168\u65B0\u8003\u5377\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "spec-table"
  }, /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u5C08\u696D \xB7 \u55AE\u9078"
  }, "44 \u984C\u3000", /*#__PURE__*/React.createElement("small", null, "\u5716\u8AAA 8 \xB7 \u6CD5\u898F 10 \xB7 \u7E6A\u5716 10 \xB7 \u4F30\u7B97 8 \xB7 \u5BE6\u52D9 8")), /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u5C08\u696D \xB7 \u8907\u9078"
  }, "20 \u984C\u3000", /*#__PURE__*/React.createElement("small", null, "\u4E94\u5927\u5DE5\u4F5C\u9805\u76EE\u5404 4 \u984C")), /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u5171\u540C \xB7 \u55AE\u9078"
  }, "16 \u984C\u3000", /*#__PURE__*/React.createElement("small", null, "\u8077\u5B89 / \u502B\u7406 / \u74B0\u5883 / \u7BC0\u80FD \u5404 4 \u984C")), /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u8A08\u5206"
  }, "\u55AE\u9078 60 \u984C \xD71 \u5206\u3000\uFF0B\u3000\u8907\u9078 20 \u984C \xD72 \u5206"), /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u8907\u9078\u898F\u5247"
  }, /*#__PURE__*/React.createElement("small", null, "\u9808\u8207\u6A19\u6E96\u7B54\u6848\u5B8C\u5168\u4E00\u81F4\u624D\u5F97\u5206\uFF0C\u591A\u9078 / \u6F0F\u9078 / \u932F\u9078\u7686 0 \u5206\uFF0C\u7121\u5012\u6263")), /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u4F5C\u7B54\u6642\u9593"
  }, "100 \u5206\u9418\u5012\u6578\u3000", /*#__PURE__*/React.createElement("small", null, "\u96E2\u958B\u53EF\u66AB\u505C\uFF0C\u56DE\u4F86\u7E8C\u8003\u540C\u4E00\u4EFD")), /*#__PURE__*/React.createElement(SpecRow, {
    k: "\u53CA\u683C\u6A19\u6E96"
  }, "\u7E3D\u5206 \u2267 60 \u5206")), /*#__PURE__*/React.createElement("div", {
    className: "opt-toggle"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "\u5373\u6642\u5C0D\u932F\u56DE\u994B"), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, "\u6BCF\u984C\u4F5C\u7B54\u5F8C\u7ACB\u5373\u986F\u793A\u6B63\u89E3\uFF08\u95DC\u9589\u5247\u4EA4\u5377\u5F8C\u4E00\u6B21\u6AA2\u8A0E\uFF0C\u6700\u63A5\u8FD1\u6B63\u5F0F\u8003\uFF09")), /*#__PURE__*/React.createElement(Switch, {
    on: instant,
    onChange: setInstant
  })), /*#__PURE__*/React.createElement("div", {
    className: "opt-toggle"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "\u7D0D\u5165\u542B\u5716\u984C\u76EE"), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, "\u5716\u8AAA\u5224\u8B80\u7684\u7B26\u865F\u984C\u4EE5\u5F85\u88DC\u5716\u6A94\u7684 placeholder \u5448\u73FE\uFF08\u95DC\u9589\u5247\u66AB\u4E0D\u62BD\u51FA\uFF09")), /*#__PURE__*/React.createElement(Switch, {
    on: includeImg,
    onChange: setIncludeImg
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: begin,
    style: {
      width: '100%'
    }
  }, "\u62BD\u984C\u4E26\u958B\u59CB\u4F5C\u7B54 ", /*#__PURE__*/React.createElement(Icon.arrow, null)))));
}
Object.assign(window, {
  Home,
  Setup
});