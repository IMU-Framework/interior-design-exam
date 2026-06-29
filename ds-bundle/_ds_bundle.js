/* @ds-bundle: {"namespace":"InteriorDesignExam","components":[{"name":"ArrowIcon","sourcePath":"components/general/ArrowIcon/ArrowIcon.jsx"},{"name":"BackIcon","sourcePath":"components/general/BackIcon/BackIcon.jsx"},{"name":"CheckIcon","sourcePath":"components/general/CheckIcon/CheckIcon.jsx"},{"name":"ClockIcon","sourcePath":"components/general/ClockIcon/ClockIcon.jsx"},{"name":"CloseIcon","sourcePath":"components/general/CloseIcon/CloseIcon.jsx"},{"name":"FlagIcon","sourcePath":"components/general/FlagIcon/FlagIcon.jsx"},{"name":"GridIcon","sourcePath":"components/general/GridIcon/GridIcon.jsx"},{"name":"ImageIcon","sourcePath":"components/general/ImageIcon/ImageIcon.jsx"},{"name":"MoonIcon","sourcePath":"components/general/MoonIcon/MoonIcon.jsx"},{"name":"SunIcon","sourcePath":"components/general/SunIcon/SunIcon.jsx"},{"name":"Switch","sourcePath":"components/general/Switch/Switch.jsx"},{"name":"ThemeToggle","sourcePath":"components/general/ThemeToggle/ThemeToggle.jsx"},{"name":"XIcon","sourcePath":"components/general/XIcon/XIcon.jsx"}],"sourceHashes":{"components/general/ArrowIcon/ArrowIcon.jsx":"645aada7ad65","components/general/ArrowIcon/ArrowIcon.d.ts":"6c16ca7cc174","components/general/ArrowIcon/ArrowIcon.prompt.md":"c8d506f543e4","components/general/BackIcon/BackIcon.jsx":"d47031ea7aa2","components/general/BackIcon/BackIcon.d.ts":"de8e6dc1e543","components/general/BackIcon/BackIcon.prompt.md":"f02bad912590","components/general/CheckIcon/CheckIcon.jsx":"d4adad813760","components/general/CheckIcon/CheckIcon.d.ts":"0a190a4b0f2c","components/general/CheckIcon/CheckIcon.prompt.md":"627143a666c6","components/general/ClockIcon/ClockIcon.jsx":"cdecdaea5aad","components/general/ClockIcon/ClockIcon.d.ts":"42a48baf0904","components/general/ClockIcon/ClockIcon.prompt.md":"6c288c2d54e2","components/general/CloseIcon/CloseIcon.jsx":"47da8cfe0935","components/general/CloseIcon/CloseIcon.d.ts":"91966a3fb36e","components/general/CloseIcon/CloseIcon.prompt.md":"219b89d0aa20","components/general/FlagIcon/FlagIcon.jsx":"bcb1024d5e65","components/general/FlagIcon/FlagIcon.d.ts":"7c87b65d8ab5","components/general/FlagIcon/FlagIcon.prompt.md":"097d40928858","components/general/GridIcon/GridIcon.jsx":"0be3b8b3e004","components/general/GridIcon/GridIcon.d.ts":"e9d5a5509fb7","components/general/GridIcon/GridIcon.prompt.md":"3cf167f86339","components/general/ImageIcon/ImageIcon.jsx":"38cc36659f70","components/general/ImageIcon/ImageIcon.d.ts":"15814dc07826","components/general/ImageIcon/ImageIcon.prompt.md":"a10e6d8609fb","components/general/MoonIcon/MoonIcon.jsx":"cb058441fe46","components/general/MoonIcon/MoonIcon.d.ts":"62a27864f11d","components/general/MoonIcon/MoonIcon.prompt.md":"2bc9dc7cd2a3","components/general/SunIcon/SunIcon.jsx":"ec5a74bb4144","components/general/SunIcon/SunIcon.d.ts":"3a6733099724","components/general/SunIcon/SunIcon.prompt.md":"f992a64b9dd8","components/general/Switch/Switch.jsx":"b5b92780939e","components/general/Switch/Switch.d.ts":"16b77d712a25","components/general/Switch/Switch.prompt.md":"6f4171f60579","components/general/ThemeToggle/ThemeToggle.jsx":"87c685412268","components/general/ThemeToggle/ThemeToggle.d.ts":"142345c021ef","components/general/ThemeToggle/ThemeToggle.prompt.md":"0c80cfc5010d","components/general/XIcon/XIcon.jsx":"7f954bf8da11","components/general/XIcon/XIcon.d.ts":"ae672a9827d2","components/general/XIcon/XIcon.prompt.md":"399a631bf87d"},"inlinedExternals":[],"builtBy":"cc-design-sync"} */
var InteriorDesignExam = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function jsx(t, p, k) {
        return R.createElement(t, k === void 0 ? p : Object.assign({ key: k }, p));
      }
      module.exports = R;
      module.exports.jsx = jsx;
      module.exports.jsxs = jsx;
      module.exports.jsxDEV = jsx;
      module.exports.Fragment = R.Fragment;
    }
  });

  // project/ds-entry.jsx
  var ds_entry_exports = {};
  __export(ds_entry_exports, {
    ArrowIcon: () => ArrowIcon,
    BackIcon: () => BackIcon,
    CheckIcon: () => CheckIcon,
    ClockIcon: () => ClockIcon,
    CloseIcon: () => CloseIcon,
    FlagIcon: () => FlagIcon,
    GridIcon: () => GridIcon,
    ImageIcon: () => ImageIcon,
    MoonIcon: () => MoonIcon,
    SunIcon: () => SunIcon,
    Switch: () => Switch,
    ThemeToggle: () => ThemeToggle,
    XIcon: () => XIcon
  });
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim());
  function SunIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "4" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }));
  }
  function MoonIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }));
  }
  function ArrowIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" }));
  }
  function BackIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M19 12H5M11 6l-6 6 6 6" }));
  }
  function ClockIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "9" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 7v5l3 2" }));
  }
  function FlagIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M4 21V4h13l-2 4 2 4H4" }));
  }
  function GridIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" }));
  }
  function CloseIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M18 6 6 18M6 6l12 12" }));
  }
  function ImageIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "m21 15-5-5L5 21" }));
  }
  function CheckIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M20 6 9 17l-5-5" }));
  }
  function XIcon(p) {
    return /* @__PURE__ */ import_react.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", ...p }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M18 6 6 18M6 6l12 12" }));
  }
  function Switch({ on, onChange }) {
    return /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "switch" + (on ? " on" : ""),
        role: "switch",
        "aria-checked": on,
        onClick: () => onChange(!on)
      }
    );
  }
  function ThemeToggle({ theme, setTheme }) {
    return /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "icon-btn",
        "aria-label": "\u5207\u63DB\u6DF1\u6DFA\u8272",
        onClick: () => setTheme(theme === "dark" ? "light" : "dark")
      },
      theme === "dark" ? /* @__PURE__ */ import_react.default.createElement(SunIcon, null) : /* @__PURE__ */ import_react.default.createElement(MoonIcon, null)
    );
  }
  return __toCommonJS(ds_entry_exports);
})();
window.InteriorDesignExam=InteriorDesignExam.__dsMainNs?Object.assign({},InteriorDesignExam,InteriorDesignExam.__dsMainNs,{__dsMainNs:undefined}):InteriorDesignExam;
