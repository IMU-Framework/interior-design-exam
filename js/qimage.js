/* ============ qimage.jsx — load real figures, fall back to placeholder ============
   檔案命名規則（放在 images/ 資料夾）：
     · 題幹圖（符號在題目敘述裡）：   {id}.png         例：images/12500-01-3.png
     · 選項圖（四個答案是圖形）：     {id}-1.png ~ -4.png  例：images/12500-01-6-2.png
   {id} 就是題庫裡的原始題號，格式為 {科目代碼}-{工作項目}-{題序}。
   圖檔放進去就會自動顯示；沒放就顯示「待補」placeholder，不需要改任何程式。 */

// 是否為「選項即圖形」的題目：四個選項文字全空
function isOptionImageQ(q) {
  return q.img && Array.isArray(q.opts) && q.opts.every(o => !o);
}

// 行內標記：[[img:ID]] → 行內小圖（images/ID.png）；[[sub:X]] → 下標文字
const RICH_RE = /\[\[(img|sub):([^\]]+)\]\]/g;
function hasInlineImg(text) {
  return typeof text === 'string' && /\[\[img:/.test(text);
}
function InlineFig({
  id
}) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return /*#__PURE__*/React.createElement("span", {
    className: "inline-fig-missing mono"
  }, "[\u5716\u5F85\u88DC ", id, "]");
  return /*#__PURE__*/React.createElement("img", {
    className: "inline-fig",
    src: 'images/' + id + '.png',
    alt: id,
    onError: () => setFailed(true)
  });
}
function RichText({
  text
}) {
  if (text == null) return null;
  const s = String(text);
  if (!RICH_RE.test(s)) return s;
  RICH_RE.lastIndex = 0;
  const out = [];
  let last = 0,
    m,
    k = 0;
  while (m = RICH_RE.exec(s)) {
    if (m.index > last) out.push(s.slice(last, m.index));
    if (m[1] === 'img') out.push(/*#__PURE__*/React.createElement(InlineFig, {
      key: k++,
      id: m[2]
    }));else out.push(/*#__PURE__*/React.createElement("sub", {
      key: k++,
      className: "inline-sub"
    }, m[2]));
    last = RICH_RE.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return /*#__PURE__*/React.createElement(React.Fragment, null, out);
}

// 題幹圖：嘗試載入 images/{id}.png，失敗則顯示 placeholder
function StemImage({
  q
}) {
  const [failed, setFailed] = React.useState(false);
  if (isOptionImageQ(q)) return null; // 選項圖題不畫題幹圖
  if (hasInlineImg(q.stem)) return null; // 圖已內嵌於題幹文字中
  // 圖內嵌於各選項（如電器符號選項）時，題幹本身無圖，不顯示題幹圖／placeholder
  if (Array.isArray(q.opts) && q.opts.some(hasInlineImg)) return null;
  if (failed) {
    return /*#__PURE__*/React.createElement("div", {
      className: "img-placeholder"
    }, /*#__PURE__*/React.createElement(Icon.image, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u6B64\u984C\u542B\u5716\u5F62 / \u7B26\u865F\uFF0C", /*#__PURE__*/React.createElement("b", null, "\u5716\u6A94\u5F85\u88DC"), "\u3002"), /*#__PURE__*/React.createElement("div", {
      className: "mono"
    }, "\u653E\u5165 images/", q.id, ".png \u5F8C\u81EA\u52D5\u986F\u793A")));
  }
  return /*#__PURE__*/React.createElement("figure", {
    className: "q-figure"
  }, /*#__PURE__*/React.createElement("img", {
    src: 'images/' + q.id + '.png',
    alt: '題 ' + q.id + ' 圖示',
    onError: () => setFailed(true)
  }));
}

// 單一選項圖：images/{id}-{n}.png（n 為 1~4）
function OptionImage({
  q,
  n
}) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return /*#__PURE__*/React.createElement("span", {
      className: "oempty mono"
    }, "\u5716\u5F62\u9078\u9805 \xB7 \u5F85\u88DC images/", q.id, "-", n, ".png");
  }
  return /*#__PURE__*/React.createElement("span", {
    className: "opt-figure"
  }, /*#__PURE__*/React.createElement("img", {
    src: 'images/' + q.id + '-' + n + '.png',
    alt: '選項 ' + n,
    onError: () => setFailed(true)
  }));
}
Object.assign(window, {
  isOptionImageQ,
  StemImage,
  OptionImage,
  RichText,
  InlineFig,
  hasInlineImg
});