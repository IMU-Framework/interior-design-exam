# HTML載入速度

_Started 2026-06-04 13:45 UTC_

---

## User

現在四個html載入好像都變慢了，主要原因為何

## Assistant

_[tool: list_files]_

先看一下專案裡的檔案結構，找出那四個 HTML 與它們載入的資源。

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: run_script]_

載入流程都看過了，慢的原因很明確。四個頁面（index / admin / image-checklist / suspect-list）共用同一套載入方式，瓶頸主要有三個，按影響程度排序：

## 1. 瀏覽器即時用 Babel 轉譯 JSX（最主要）
每個頁面都先從 CDN 抓 `@babel/standalone`（壓縮後約 3MB），再在**瀏覽器裡即時轉譯**所有 `.jsx`。index 要轉 7 個檔（icons / qimage / home / practice / exam-screen / result / app，合計約 4 萬字元），admin 要轉 22,638 字元的 `admin.jsx`。這段是純 CPU 工作，發生在所有資源都到齊之後才開始，是「白畫面」最久的一段。

## 2. 載入 React 的開發版（development build）
```
react.development.js / react-dom.development.js
```
這是未壓縮、含大量警告檢查的 dev 版，體積與執行成本都遠大於 production 版。加上 babel 共三個外部 CDN 請求，全看網路狀況。

## 3. `cache: 'reload'` 強制每次重抓題庫
```js
fetch('data/bank-'+c+'.json', { cache: 'reload' })
```
`reload` 會**繞過瀏覽器快取**，所以每次重整都重新下載全部題庫。index 一次抓 5 個檔共 **256 KB**，其中 `bank-12500.json` 單檔就 **163 KB**。這也是「現在變慢」最可能的直接原因——題庫長大了，但每次都重抓不吃快取。

---

**為什麼是「現在」才感覺變慢**：題庫 JSON 持續變大（12500 已 163KB），而 `cache:'reload'` 讓它每次都重下載；JSX 檔也愈寫愈多，Babel 每次重整都要全部重新轉譯。前兩項一直都在，但隨內容成長被放大了。

要我動手最佳化嗎？最有效的順序是：
1. 把 `cache: 'reload'` 改成預設快取（或 `default`），題庫沒改就吃快取——**改一行、立刻有感**。
2. 換成 React **production** CDN 版。
3. 進階：把 JSX **預先編譯**成純 JS（拿掉瀏覽器端 Babel），這個改動最大但能徹底消除轉譯延遲。

要的話我可以先做 1+2 這種低風險、高回報的，先看效果。

## User

先改1.

## Assistant

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

第 1 項是題庫 JSON 的快取。改 index.html 和 admin.html（image-checklist 那兩個是圖片審查工具刻意要抓最新圖，保留不動）。

完成。兩個檔的 `fetch` 現在改用瀏覽器預設快取——題庫沒變動就走快取（304 驗證），不會每次重下載 256KB。

注意：admin 後台的編輯是存到 localStorage 草稿（`ylab_admin_draft_v1`），不會改到 JSON 檔本身，所以吃快取不影響編輯即時生效；JSON 真的被改動時瀏覽器也會自動抓新版。

要不要接著做第 2 項（換成 React production 版）？那也是改幾行就好、風險低。

