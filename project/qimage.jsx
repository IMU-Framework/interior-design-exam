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
function hasInlineImg(text) { return typeof text === 'string' && /\[\[img:/.test(text); }

function InlineFig({ id }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return <span className="inline-fig-missing mono">[圖待補 {id}]</span>;
  return <img className="inline-fig" src={'images/' + id + '.png'} alt={id} onError={() => setFailed(true)} />;
}

function RichText({ text }) {
  if (text == null) return null;
  const s = String(text);
  if (!RICH_RE.test(s)) return s;
  RICH_RE.lastIndex = 0;
  const out = [];
  let last = 0, m, k = 0;
  while ((m = RICH_RE.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    if (m[1] === 'img') out.push(<InlineFig key={k++} id={m[2]} />);
    else out.push(<sub key={k++} className="inline-sub">{m[2]}</sub>);
    last = RICH_RE.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}

// 題幹圖：嘗試載入 images/{id}.png，失敗則顯示 placeholder
function StemImage({ q }) {
  const [failed, setFailed] = React.useState(false);
  if (isOptionImageQ(q)) return null; // 選項圖題不畫題幹圖
  if (hasInlineImg(q.stem)) return null; // 圖已內嵌於題幹文字中
  if (failed) {
    return (
      <div className="img-placeholder">
        <Icon.image />
        <div>
          <div>此題含圖形 / 符號，<b>圖檔待補</b>。</div>
          <div className="mono">放入 images/{q.id}.png 後自動顯示</div>
        </div>
      </div>
    );
  }
  return (
    <figure className="q-figure">
      <img src={'images/' + q.id + '.png'} alt={'題 ' + q.id + ' 圖示'} onError={() => setFailed(true)} />
    </figure>
  );
}

// 單一選項圖：images/{id}-{n}.png（n 為 1~4）
function OptionImage({ q, n }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return <span className="oempty mono">圖形選項 · 待補 images/{q.id}-{n}.png</span>;
  }
  return (
    <span className="opt-figure">
      <img src={'images/' + q.id + '-' + n + '.png'} alt={'選項 ' + n} onError={() => setFailed(true)} />
    </span>
  );
}

Object.assign(window, { isOptionImageQ, StemImage, OptionImage, RichText, InlineFig, hasInlineImg });
