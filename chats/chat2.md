# 圖檔管理結構

_Started 2026-06-03 08:05 UTC_

---

## User

請告訴我補圖的資料/圖檔要放在哪裡
給我一個夠好用的資料結構，讓我能辨識各題的原始題號，並上傳正確的圖檔。
並請建議優化的圖檔大小(dimension & size)

## Assistant

_[tool: list_files]_

先讓我看看目前專案的結構，才能給你最貼合現況的建議。

_[tool: read_file]_

_[tool: grep]_

我來看看題目資料的結構，了解題號是怎麼標記的，以及目前圖檔有沒有被引用。

_[tool: grep]_

_[tool: grep]_

我來看看程式目前怎麼處理 `img` 欄位的，這樣才能告訴你圖檔該怎麼命名才會被正確讀到。

_[tool: read_file]_

_[tool: run_script]_

我已掌握全貌了。讓我再看一下題號/原始編號是怎麼定義的，以及含圖題目實際有多少，這樣建議才精準。

_[tool: read_file]_

_[tool: read_file]_

完全清楚了。我先把含圖題的渲染段落讀完，這樣我可以直接幫你把「放圖就會自動顯示」的機制接上去。

_[tool: read_file]_

_[tool: read_file]_

_[tool: write_file]_

全都掌握了。我來幫你把「放圖就自動顯示」的機制接上，並建立一套清楚的命名規則 + 補圖進度清單。先建立圖檔載入元件：Now wire it into the exam screen — replace the placeholder and make option-image questions render images:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now the review screen in result.jsx:Now load `qimage.jsx` in index.html (before exam-screen and result), and add the figure styles:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now I'll generate the **補圖清單** — a live checklist of all 48 image questions that doubles as your upload tracker, plus an `images/` README:

_[tool: run_script]_

_[tool: list_files]_

The Chinese filename got mangled. Let me check and rename it to an ASCII-safe name:

_[tool: copy_files]_

_[tool: list_files]_

The Chinese name works through copy. Let me delete the mangled one, then verify the checklist renders:

_[tool: delete_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: save_screenshot]_

Those 404s are expected — they're the empty slots awaiting upload. The list confirms exactly the 69 filenames the app expects. Let me screenshot the checklist to confirm it renders well:

_[tool: view_image]_

_[tool: delete_file]_

Renders perfectly. Let me clean up and verify the main app still works:

_[tool: done]_

那 12 個錯誤全部是「圖檔尚未上傳」的 404，正是設計好的 fallback 機制觸發的——抓不到圖就自動顯示「待補」placeholder，等你把圖放進去就會消失。屬於預期行為，不需修。

完成了。以下是你要的答案：

## 圖檔放哪裡
放進專案根目錄的 **`images/`** 資料夾，丟進去就會自動顯示，**不用改任何程式**。

## 命名規則（檔名 = 原始題號）
每題原始題號格式為 `{科目代碼}-{工作項目}-{題序}`，例如 `12500-01-3`：

| 題型 | 檔名 | 範例 |
|---|---|---|
| **題幹圖**（符號在題目敘述裡，1 張） | `{題號}.png` | `images/12500-01-9.png` |
| **選項圖**（四個答案都是圖形，4 張） | `{題號}-1.png` ~ `-4.png` | `images/12500-01-3-1.png` |

抓不到對應檔名就顯示「待補」placeholder，所以可以**邊放邊驗**、不必一次補齊。

## 補圖進度清單
我生了一份 **`補圖清單.html`**（= `image-checklist.html`，同內容）。它列出全部含圖題目：原始題號、題目敘述、該放的**精確檔名**，並**即時預覽是否已上傳**（顯示「未上傳」= 還沒放或檔名不符）。這就是你辨識題號、對應上傳的工作底稿。

## 數量與建議規格
- 全題庫 1149 題，含圖 **48 題**：題幹圖 41 題、選項圖 7 題（每題 4 張）→ **總共需 69 張**。
- 規格建議：**PNG**（去背或白底皆可，程式會鋪白底以相容深/淺色主題）；題幹圖寬 **320–640px**；選項圖約 **400×400px**；單檔 **< 100KB**。

要不要我先打開 `補圖清單.html` 讓你看完整清單？

## User

補圖清單.html如果跟image-checklist.html一樣，保留後者就好

## Assistant

_[tool: delete_file]_

_[tool: str_replace_edit]_

好了，已刪除 `補圖清單.html`，只保留 **`image-checklist.html`**，並更新了 `images/README.md` 裡的指引。其餘機制不變。

## User

Apply comment

## Assistant

_[tool: grep]_

_[tool: read_file]_

Restructuring: "缺圖上傳說明" becomes the block heading, and its body text moves into a unified paragraph above the naming rule:

_[tool: str_replace_edit]_

好了。「缺圖上傳說明」現在是這個區塊的標題，原本的說明內文已移到下一行並與「命名規則」整合成同一段，規格建議則獨立成最後一段。

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

已改成三條標籤式結構：**上傳位置：**、**命名規則：**、**圖檔尺寸：**，各自一行。

## User

簡化，把括號內容去掉

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

已移除括號內容，「上傳位置」說明更簡潔。

## User

Apply comment

## Assistant

_[tool: run_script]_

These labels repeat on every item, so I'll replace all occurrences:已刪除所有「選項圖 ×4」「題幹圖 ×1」後面的括號說明。

## User

原始題號 12500 · 工作項目02 · 第 146 題
我看了一下應該沒有含圖

## Assistant

_[tool: run_script]_

_[tool: run_script]_

This one is text-only — it's mislabeled. Let me flip it to `img:false` in both data files:

_[tool: grep]_

Now remove that question from the checklist (it was a stem-image item) and update the counts. Let me find its block:

_[tool: read_file]_

The 工作項目 02 section has only this one question, so I'll remove the whole heading + item. Let me read the exact span:

_[tool: str_replace_edit]_

Now update the header summary counts (48→47 含圖, 41→40 題幹圖, 69→68 張):

_[tool: read_file]_

_[tool: str_replace_edit]_

已修正。題目 `12500-02-146` 確實是純文字題，已在 `questions.json`、`questions.js` 兩份題庫把 `img` 改為 `false`，並從清單移除（連帶移除空掉的「工作項目 02」分區）。統計已更新為：含圖 **47** 題、題幹圖 **40** 題、總計需 **68** 張。

之後做模擬考時這題就會正常以文字題出現，不再被當成含圖題。建議你也順手用清單裡的題目敘述快速掃一遍——若還有類似被誤標的純文字題，告訴我題號我一併修掉。

## User

我要上傳這兩張到image/
之後上傳都要透過這個聊天室窗嗎

## Assistant

_[tool: run_script]_

兩張我先看一下，第一張的檔名工作項目碼似乎和題庫對不上（題庫裡是 `90008-03-13`，你的檔名是 `90008-01-13`），我確認一下正確題號再放。

_[tool: copy_files]_

確認了：環保標章那題在題庫的題號是 **`90008-03-13`**（工作項目是 03，不是 01），所以你的檔名要對應到 app 才抓得到。我幫你放進去並順手修正檔名：

- `90008-01-13-1.png` → **`images/90008-03-13-1.png`**（修正工作項目碼 01→03）
- `90009-04-2-4-9dce27ae.png` → **`images/90009-04-2-4.png`**（去掉系統加的尾碼）

兩張都放好了，重新整理 `image-checklist.html` 或在模擬考遇到這兩題時就會顯示。

**關於上傳方式** — 是的，在這個環境裡，圖檔都是透過聊天室窗附加給我、由我放進 `images/` 資料夾，沒有讓你直接拖進資料夾的介面。實務建議：

1. **一次可以附多張**，不必一張一張傳。
2. **上傳前先照 `image-checklist.html` 上的檔名命名**，這樣我就能原樣放入、不用逐一校正。系統有時會在檔名尾端加一段亂碼（像 `-9dce27ae`），我會自動去掉。
3. ⚠️ 你這次的 `90008-01-13` 用的是「01」，但題庫的工作項目碼是「03」——你的原始資料和題庫的工作項目編號方式可能不同。**請以清單上顯示的檔名為準**（清單的題號是 app 實際會去找的檔名），才不會放了卻顯示「未上傳」。

要的話，下次你把整批圖丟上來，我可以先比對檔名、把對不上的列出來讓你確認，再一起放進去。

## User

傳好了但在image-checklist沒有正常顯示耶

## Assistant

_[tool: list_files]_

_[tool: image_metadata]_

_[tool: show_html]_

檔案都在、格式也正常。讓我直接載入清單檢查那兩個格子的狀態：

_[tool: save_screenshot]_

那兩張其實已經被抓到了 — 注意這次的「找不到」清單裡 **`90008-03-13-1.png` 和 `90009-04-2-4.png` 都不在裡面了**，代表它們已正常載入。讓我截圖確認顯示：

_[tool: view_image]_

_[tool: delete_file]_

顯示正常 — 你看 `90009-04-2-4.png` 這格已經出現綠色標章圖了。

問題出在**瀏覽器快取**：你之前看過這頁時該檔還不存在（記住了 404），所以即使檔案放好了，畫面還停在「未上傳」。**強制重新整理**就會出現：

- Mac：`Cmd + Shift + R`
- Windows：`Ctrl + Shift + R`

（順帶一提，你這兩張上傳的是同一個綠葉標章圖，分別放進了 `90008-03-13-1` 和 `90009-04-2-4` 兩格 —— 如果其中一格其實該放別張圖，再傳給我換掉就行。）已清理暫存檔。重新整理後就會看到圖了，有對不上的格子再跟我說。

## User

image-checklist給我一個scroll to top 的按鈕，並且讓各個項目群組可以收合

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

I'll add collapsible-group styles + a scroll-to-top button. First the CSS:

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: done]_

好了，兩個功能都加上了：

- **收合**：點任一群組標題（如「工作項目 01」）即可收合／展開該組所有題目，標題前的箭頭會跟著轉向。
- **回到頂端**：向下捲動超過一段距離後，右下角會出現 **↑** 按鈕，點一下平滑捲回頁首。

（清單裡的 404 都是還沒上傳的「待補」格子，屬正常，上傳後消失。）

## User

我比較喜歡chevron的樣式

## Assistant

_[tool: str_replace_edit]_

改好了 — 現在是經典的 chevron 樣式：展開時朝下 ⌄、收合時朝右 ›，點擊平滑切換。

## User

我是指scroll to top

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

回到頂端按鈕現在改用上箭頭 chevron 樣式（兩筆畫的 ⌃），取代原本的文字箭頭。

## User

先傳這兩張

## Assistant

_[tool: copy_files]_

兩張都是題幹圖。第一張檔名少一個 0（`9009` 應為 `90009`），我幫你修正後放入：好了，兩張都放進去了：

- `9009-04-86.png` → **`images/90009-04-86.png`**（補回少掉的 0；水滴笑臉 = 省水標章）
- `90009-04-69.png` → **`images/90009-04-69.png`**（溫度計圖 = 能源效率標示）

強制重新整理（`Cmd/Ctrl + Shift + R`）就會在清單與模擬考裡顯示。剩下節能減碳這組還差 `90009-04-2` 的選項圖 ①②③（第④張已上傳）。

## User

沒看到幫我清除快取

## Assistant

_[tool: str_replace_edit]_

快取問題我直接從程式面解掉——讓清單每次載入都強制重抓圖片，這樣你以後上傳完只要普通重新整理就會出現，不必再手動清快取。

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: show_html]_

The 64 missing are all genuinely-not-uploaded slots (expected). Notably the 4 you uploaded are NOT in the list, confirming they load. Let me verify the cache-bust visually:

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: delete_file]_

已修好——我在清單裡加了**自動快取清除**：每次載入時都會在圖片網址後加上時間戳，強制瀏覽器重新抓圖。

所以從現在起：
- 你上傳完圖，**普通重新整理**（按 F5 或重點一下分頁）就會看到，不必再 `Cmd/Ctrl+Shift+R`。
- 剛上傳的那兩張（`90009-04-69`、`90009-04-86`）重整後就會顯示。

注意這只套用在 image-checklist 的縮圖上；模擬考頁面為了效能仍走正常快取，那邊若沒更新再硬重整一次即可。

## User

現在都看不到了...

## Assistant

_[tool: screenshot_user_view]_

_[tool: str_replace_edit]_

找到原因了——這個預覽環境的檔案伺服器不接受網址後面帶 `?t=...`，所以加了時間戳反而全部 404。我把那段移除，恢復原本能正常載入的狀態。

_[tool: show_html]_

The 4 uploaded files are no longer in the 404 list — they load again. Confirmed visually:

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: sleep]_

_[tool: view_image]_

_[tool: save_screenshot]_

## Assistant

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

圖都回來了。移除時間戳後恢復正常——你可以看到 `90009-04-2-4`（綠葉標章）、`90009-04-69`（溫度計）、`90009-04-86`（水滴笑臉）都正常顯示了。

_[tool: delete_file]_

已修復。問題是那個自動快取清除的時間戳網址（`?t=...`）在這個環境會讓伺服器找不到檔案，已移除，圖片全部恢復顯示。

所以快取還是用回原本的方式處理：上傳完若沒看到，按 **`Cmd/Ctrl + Shift + R`** 強制重新整理即可。抱歉繞了一圈。剩下節能減碳這組還差 `90009-04-2` 的選項圖 ①②③。

## User

<attached_files>
- uploads/90008-03-13-2.png
- uploads/90008-03-13-3.png
- uploads/90008-03-13-4.png
- uploads/90009-04-2-1.png
- uploads/90009-04-2-2.png
- uploads/90009-04-2-3.png
</attached_files>

## Assistant

_[tool: copy_files]_

6 張檔名都對得上，直接放入：6 張都放好了。這樣兩組選項圖題都齊了：

- **`90008-03-13`**（環保標章）：①②③④ 全到位 ✅
- **`90009-04-2`**（節能標章）：①②③④ 全到位 ✅

這兩題現在可以正常作答了。共同科目（環保＋節能減碳）的含圖題全部補完，只剩專業科目 12500 工作項目 01 那 43 題待補。重新整理 image-checklist 即可看到綠色縮圖。

## User

我重新整理之後變成都看不到

## Assistant

_[tool: screenshot_user_view]_

## User

我重新整理之後，新上傳的圖都看不到

## Assistant

_[tool: screenshot_user_view]_

_[tool: list_files]_

先看看你目前畫面的實際狀態，並確認檔案是否都還在。

_[tool: show_html]_

檔案全都在伺服器上（我確認了 `images/` 裡 10 張圖都在）。問題純粹是**瀏覽器快取**：你之前看過這頁、那時 `90009-04-2-1/2/3` 還沒上傳，瀏覽器記住了「404 找不到」，所以現在普通重整還是顯示舊的「未上傳」。

之前我試過用網址加時間戳自動破快取，但這個環境的伺服器不接受，反而全壞。讓我換一個這個環境能接受的破快取方式——用 fetch 強制重抓。先測試一下可行性：

_[tool: show_html]_

_[tool: read_file]_

在我這邊全新載入時，那 6 張新圖（`90009-04-2-1/2/3`、`90008-03-13-2/3/4`）**完全正常載入**——404 清單裡只剩還沒傳的 12500 那批。這 100% 證實檔案沒問題，純粹是你瀏覽器把舊的 404 快取住了。

我來用一個這個環境能接受、又不靠網址參數的方式破快取：改用 `fetch(..., {cache:'reload'})` 強制重抓成 blob 再顯示。這樣每次載入都拿到最新檔，你以後普通重整就會看到。

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: sleep]_

_[tool: view_image]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: view_image]_

_[tool: eval_js]_

奇怪——`-4` 顯示了，但 `-1/-2/-3` 還是「未上傳」，可是這三個檔在磁碟上確實存在、也不在 404 清單裡。讓我直接探測 fetch 到底回什麼：

_[tool: eval_js]_

_[tool: str_replace_edit]_

找到根因了！6 張 fetch 全都回 **200 OK**，檔案完全正常。問題是**競態**：圖片 `<img src>` 在 HTML 解析時就先用快取載入，命中舊的 404 → 觸發 `onerror` 加上 `miss`（隱藏圖、顯示「未上傳」）；之後我的 fetch 雖然成功換上新圖，但 `miss` 這個 class 從沒被移除。修正：成功時把 `miss` 拿掉。

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: view_image]_

修好了！現在 `90009-04-2` 的四個選項圖（①台灣製、②插頭愛心、③CO₂腳印、④綠葉）全部正常顯示，不再卡在「未上傳」。

問題根因是**競態**：HTML 裡的 `<img>` 一解析就先用快取載入，命中你瀏覽器之前存的 404 就立刻標記「未上傳」；雖然背景 fetch 成功換上新圖，但那個標記沒被清掉。現在改成 fetch 成功後一併移除標記，並用強制重抓（`cache:'reload'`）繞過快取。

**對你的好處**：以後上傳完，**普通重新整理（F5）就會看到**，不必再 `Cmd/Ctrl+Shift+R`。

让我确认页面无错误并交付：

_[tool: get_webview_logs]_

_[tool: delete_file]_

All those errors are the 58 genuinely-not-yet-uploaded 12500 slots (the expected "未上傳" placeholders). No errors for any uploaded image. The fix works.

修好了，已交付。所有共同科目（環保＋節能）的含圖題都正常顯示了。

**結論**：
- 之前看不到是**競態 + 快取**：圖一載入命中舊 404 就標「未上傳」，背景重抓成功後標記沒清除。現已修正，並改用強制重抓繞過快取。
- **以後上傳完，普通 F5 重新整理就會看到**，不必再硬重整。
- Console 裡的 404 全是還沒上傳的 12500 工作項目 01 那 58 格（待補 placeholder），屬正常。

剩下要補的只有 **專業科目 12500 · 工作項目 01** 那批。你的瀏覽器重整一次就會看到剛補的 6 張了。

## User

這三個圖檔置換更新

## Assistant

_[tool: copy_files]_

三張都已置換更新：

- `90009-04-2-4.png` — 環保標章（綠葉）
- `90009-04-69.png` — 能源效率標示（溫度計）
- `90008-03-13-1.png` — 環保標章（綠葉）

普通重新整理（F5）就會看到新圖。

## User

選項的 1 2 3 4 數字能否改成純數字？現在外面有一個圈圈裏面又有一個圈圈，視覺上重複

## Assistant

_[tool: grep]_

_[tool: str_replace_edit]_

你指的是答題畫面選項左側的標記——外層已有一個圓框，裡面又用了「①②③④」帶圈字，視覺上圈中有圈。把帶圈字改成純數字即可：

_[tool: read_file]_

純數字後，答錯提示「正解為14」會黏在一起不易讀，我把它改成空格分隔：

_[tool: str_replace_edit]_

_[tool: done]_

改好了。選項標記現在是純數字 `1 2 3 4`（外層圓框／方框保留），不再圈中有圈；答錯提示的正解也改成「、」分隔（如「正解為 1、4」）。複習頁的標記同步更新。

## User

能不能夠把12500、90006、90007、90008、90009的題目的資料庫(js json)分不同檔案來管理？

## Assistant

_[tool: read_file]_

_[tool: grep]_

先看看題庫目前怎麼被載入與使用，才能安全拆分。

_[tool: run_script]_

題庫是透過 `data/questions.js`（設定 `window.QUESTION_BANK`）載入，`exam-core.js` 讀取它；`questions.json` 只是原始備份，App 並未載入。我把它依 `code` 拆成 5 個檔，每個檔用 `concat` 累加到同一個 `window.QUESTION_BANK`，這樣合併結果與原本完全一致（順序也保留）。同時 JSON 也一併拆分供你管理。

_[tool: run_script]_

順序乾淨（12500→90006→90007→90008→90009）。現在拆分：Now update index.html to load the 5 files in order, then verify the bank rebuilds identically:

_[tool: str_replace_edit]_

_[tool: run_script]_

Identical. Now delete the old monolithic files and verify the app loads:

_[tool: delete_file]_

_[tool: done]_

_[tool: eval_js]_

完成。題庫已依科目代碼拆成 5 組獨立檔案，App 載入後合併結果與原本**完全一致**（1149 題、順序不變，已驗證 byte-identical）。

**新的資料結構（`data/` 資料夾）：**

| 檔案 | 科目 | 題數 |
|---|---|---|
| `bank-12500.js` / `.json` | 專業 · 建築物室內設計 | 749 |
| `bank-90006.js` / `.json` | 共同 · 職業安全衛生 | 100 |
| `bank-90007.js` / `.json` | 共同 · 工作倫理與職業道德 | 100 |
| `bank-90008.js` / `.json` | 共同 · 環境保護 | 100 |
| `bank-90009.js` / `.json` | 共同 · 節能減碳 | 100 |

**運作方式：**
- `.js` 是 App 實際載入的檔（`index.html` 依序載入 5 個，每個用 `concat` 累加到同一個 `window.QUESTION_BANK`）。
- `.json` 是同內容的純資料版，方便你檢視／編輯／版本管理。
- 舊的 `questions.js` / `questions.json` 已刪除。

**之後維護建議**：改某科題目時，編輯對應的 `.js`（App 讀這個）。若你習慣改 `.json`，告訴我，我可以幫你把改動同步回 `.js`，或改成讓 App 直接讀 `.json`（用 fetch 載入）——看你偏好哪種工作流。

## User

習慣改.json

## Assistant

_[tool: read_file]_

好——那就讓 App 直接讀 `.json`，這樣你改 `.json` 即生效，不必再同步 `.js`。我把 `.js` 版本拿掉，改成載入時用 fetch 抓 5 個 `.json` 合併。先看 App 的初始化流程，確保改成非同步載入不會出問題。

_[tool: grep]_

_[tool: str_replace_edit]_

計畫確定：改用 fetch 載入 5 個 `.json`、合併成 `window.QUESTION_BANK`，再依序載入核心邏輯與 UI。由於 Babel 需要等題庫就緒後才轉譯，我用一個 loader 控制順序。Now delete the redundant `.js` bank files and verify the app boots from JSON:

_[tool: delete_file]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

Boots cleanly from JSON — 1149 questions, all stats correct, app rendered, only the harmless Babel dev warning. Let me confirm the home screen renders and finalize:

_[tool: done]_

_[tool: sleep]_

_[tool: eval_js]_

`done` 的空 root 警告是因為非同步載入需要一點時間（它在 fetch 完成前就拍了快照）。我前面已驗證 `rootHasContent:true`。再確認一次畫面確實渲染：完成。App 現在**直接讀取 `.json`**，你改 `data/bank-<code>.json` 重新整理即生效，不必再管 `.js`。

**現在的結構：**
- `data/bank-12500.json`（749 題）
- `data/bank-90006.json`、`bank-90007.json`、`bank-90008.json`、`bank-90009.json`（各 100 題）

`.js` 版本已全部刪除，不再有重複維護的問題。載入時會 fetch 這 5 個檔、依原順序合併成完整題庫（已驗證仍為 1149 題、統計正確）。

**編輯小提醒：**
- JSON 格式要正確（字串用雙引號、逗號別漏）。存檔後若畫面空白，多半是某個檔 JSON 語法錯誤——我有加一個防呆：載入失敗會在畫面顯示是哪個檔、什麼錯誤，方便你排查。
- 每題必要欄位：`id`、`code`、`wi`、`type`（single/multi）、`ans`（陣列）、`stem`、`opts`（四個）、`img`（true/false）。

需要的話我可以再幫你做一個「JSON 格式檢查」小工具，貼上內容就能驗證有沒有缺漏或重複題號。

## User

90009-04-6 以這一題為例
其選項"4 六氟化硫 (SF6)" 尾巴的"當量表示"
其實是整個題目的尾巴
應該分列出來到選項後面

這樣的題目還有很多，尚待一一列舉修正。
請先幫我把這題改正看看，然後建議後續作法。

## Assistant

_[tool: run_script]_

_[tool: read_file]_

這題的結構是「…所得之合計量，以 ◯◯◯ **當量表示**」——「當量表示」是題幹被選項打斷後的**尾段**，目前被硬接在選項4後面。最忠實的做法是新增一個「題幹尾段」欄位，渲染在選項清單**之後**。我先看 UI 的選項渲染區，把這個機制接上。

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now add styling for `.q-tail` / `.rev-tail` and fix the data:

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: str_replace_edit]_

Now fix the data — strip "當量表示" from option 4 and add it as `tail`:

_[tool: run_script]_

_[tool: str_replace_edit]_

Let me verify the tail renders correctly in the exam screen for this question:

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: done]_

資料與渲染邏輯都到位了。讓我實際把這題叫出來確認畫面：

_[tool: fork_verifier_agent]_

（空 root 警告同前，是非同步載入的時序快照，實際已渲染。）這題已修正。讓我請驗證代理實際把這題叫出來、確認「當量表示」顯示在選項後面：這題已改好，等驗證代理回報。先說明結果與**後續作法建議**。

## 這題的修正
我新增了一個 **`tail`（題幹尾段）** 欄位：
- 選項4 改回 `六氟化硫（SF6 ）`
- 新增 `"tail": "當量表示"`，App 會把它**渲染在四個選項之後**（答題頁與複習頁皆同步）。

這樣語意就完整了：「…所得之合計量，以〔選項〕**當量表示**」。

## 後續作法建議

這類「題幹被選項打斷、尾段黏在選項4」的題目，建議這樣處理：

**1. 我先幫你自動「揪出嫌疑題」**
我可以掃全題庫，標記出可能有這問題的題目，特徵像是：
- 題幹結尾是「以／為／是／指／稱為」等**未完成語氣**，且
- 只有某一個選項明顯比其他長、結尾帶「表示／計算／處理／辦理」等收尾詞。

掃完給你一份清單（題號＋題幹＋四選項），你只要逐題確認「尾段是哪幾個字」即可。

**2. 你回報、我批次修正**
你在清單上標出每題的尾段文字，我用一支腳本批次套用（從對應選項移除、寫入 `tail`），不必一題一題手動改。

**3. 渲染已就緒**
機制已經做好，之後任何題目只要加 `"tail": "…"` 欄位就會自動正確顯示，不用再動程式。

要我現在先跑「嫌疑題掃描」給你一份清單嗎？

## User

Verifier agent check completed

## Assistant

験證通過——「當量表示」已正確顯示在四個選項之後，選項4 不再含該文字。

要我現在跑「嫌疑題掃描」、給你一份可能有同樣問題的題目清單嗎？掃完你逐題確認尾段文字，我再批次修正。

## User

tail要記得保留句末的句號。例如"當量表示。"

請先由你提供嫌疑清單，我來排除清白的。
之後當我逐題練習，有看到漏網之魚再整理清單給你。

## Assistant

好的，先收到兩點：① `tail` 要保留句末句號（如「當量表示。」）；② 先給你嫌疑清單，你來排除。先把剛改的這題補上句號，再掃描全題庫。

_[tool: run_script]_

_[tool: run_script]_

已加上句號（「當量表示。」）。現在掃描全題庫找嫌疑題。先用幾個特徵試探並看數量，再決定清單範圍。

_[tool: run_script]_

329 太寬了——光「題幹結尾連接詞」就 212 筆（很多正常題目本來就以「以／為」收尾）。真正的特徵是**選項4 明顯比其他三項長**（尾段被黏上去撐長了）。讓我聚焦這個訊號、並嘗試自動猜出「尾段」文字來校準。

_[tool: run_script]_

這些候選裡其實混了兩種情況：有些（像 `12500-02-9` 的「400 平方公尺以下者，其內部裝修材料不受限制」）尾巴確實該分到所有選項後面、是同一個 bug；但有些只是法規題的正確答案本來就比較長、並非錯誤。這需要你看**完整四個選項**才好判斷。

我幫你做一個**互動式嫌疑清單頁**：每題顯示題幹＋完整四選項（選項4 標示出來），你點「需修正／清白」分類，頁面底部自動收集「需修正」的題號清單供你複製給我。這樣最省力。

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

頁面正常運作。我注意到第一題 `12500-02-91` 正是典型的尾段 bug（選項4「16層以上之建築物…來進行裝修」其實是套用到所有選項的結尾）——工具有抓到。不過「單選」標籤的「選」字換行溢出疊到題幹了，我修一下：

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

「單選」標籤已正常。清單頁完成，交付給你。

_[tool: delete_file]_

_[tool: done]_

嫌疑清單頁已開好（`suspect-list.html`），共 **139 題**，依可能性排序。

**使用方式：**
1. 逐題看橘底的「選項4」——尾巴是否其實是**整個題目的結尾、該套用到所有選項之後**（例：「…當量表示。」）。
2. 是 → 按 **「需修正」**；只是該選項本來就比較長 → 按 **「清白」**。
3. 分類會自動存檔（重整不會丟）。
4. 完成後底部會列出所有「需修正」題號，按 **「複製清單」** 貼回對話給我。

**判讀提示：**
- 像第一題 `12500-02-91`（選項4「16層以上之建築物…來進行裝修」）就是典型的尾段 bug。
- 但很多法規題的長選項是**正確答案本來就長**（例如完整的條文敘述），那種按「清白」。
- 排序越前面（`opt4 +字數` 越大、有「結構斷裂」標記）越可疑，但仍需你眼看確認。

你篩好把「需修正」清單給我，我會：① 從各選項移除尾段、② 寫入帶句號的 `tail` 欄位、③ 批次套用。之後練習遇到漏網的，再整理給我即可。

## User

12500-02-91, 12500-02-87, 12500-02-10, 12500-02-144, 12500-03-51, 12500-02-31, 12500-02-98, 12500-02-99, 12500-02-93, 12500-02-11, 12500-02-92, 12500-03-198, 12500-02-104, 12500-03-195, 12500-02-9, 12500-03-186, 12500-02-76, 12500-05-30, 12500-02-84, 12500-02-78, 12500-03-202, 12500-03-90, 12500-02-100, 12500-02-75, 12500-01-77, 12500-01-78, 12500-01-79, 12500-02-85, 12500-03-188, 12500-02-95, 12500-04-5, 12500-02-13, 12500-02-96, 12500-03-199, 12500-05-47, 12500-05-68, 12500-02-14, 12500-02-83, 12500-03-200, 12500-03-201, 12500-04-9, 12500-05-23, 12500-02-1, 12500-03-76, 12500-05-24, 12500-05-32, 12500-05-40, 12500-02-90, 12500-02-135, 12500-05-18, 12500-05-31, 12500-03-223, 12500-03-189, 12500-02-88, 12500-05-21, 12500-02-28, 12500-03-52, 12500-03-187, 12500-04-63, 12500-02-127, 12500-05-44, 12500-01-57, 12500-03-134, 12500-04-7, 12500-04-26, 12500-05-64, 12500-01-55, 12500-04-34, 12500-05-133, 12500-05-20, 12500-05-39, 90006-01-80

## Assistant

_[tool: run_script]_

你已篩出 **71 題**。我先把這些題目的完整內容讀出來，逐題判斷尾段的切點（這需要看實際文字，不能純靠規則），再批次套用。

_[tool: run_script]_

我已看懂結構：題幹被截斷，選項1–3 是短填空，選項4 = 正確填空 + 被黏住的尾段。我用「選項1–3 的共同單位」來偵測切點，先產生 72 題的**切分提案**讓我自己逐題檢查（這種切分有些需人工校正），再套用。

_[tool: run_script]_

啟發式對「有共同單位」的題目大多正確，但約 23 題（顯示 `??`）需人工切分，另有幾題切錯（如 `12500-02-144` 把「施工人員」切成「施工人」+「員應將…」）。我把其餘題目的完整內容讀出來，建立精確的人工切分表。

_[tool: run_script]_

幾乎到齊了。還有 29 題我尚未看到完整內容（啟發式對其中部分可能切錯，例如 `12500-02-144` 應是「施工人員」而非「施工人」）。我把這 29 題也讀出來，建立完整精確的人工切分表再一次套用。

_[tool: run_script]_

我已掌握全部 72 題。其中 **6 題不該動**（選項4 本身就是完整的平行答案、或刪題，沒有可抽出的共同尾段）：`12500-02-135`、`12500-05-18`、`12500-03-134`、`12500-03-187`、`12500-02-28`(刪題)、`90006-01-80`。其餘 **66 題**我用「尾段起始標記」精確切分（保留選項原始空格），尾段補上句號（疑問句用問號）。66 題全部套用成功、零錯誤。讓我抽查幾題確認切分正確：

_[tool: run_script]_

全部正確。讓我在 App 裡實際渲染一題確認 `tail` 顯示無誤，然後交付。

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

The data is verified correct already. Let me hand off via the verifier instead of self-inspecting.

_[tool: done]_

_[tool: fork_verifier_agent]_

完成了。已處理你篩出的 72 題：

**✅ 修正 66 題** — 把黏在選項4 的題幹尾段抽出來，移到四個選項之後，並補上句末標點：
- 陳述句結尾用句號（如 `12500-02-91` → 選項變回「16 層」，尾段「以上之建築物…來進行裝修。」）
- 疑問句結尾用問號（如 `12500-03-188`「可提供多少造冷量？」、`12500-04-63`「以上哪些為錯誤？」）
- 切分時保留選項原本的空格格式，零錯誤。

**⏭️ 略過 6 題** — 這幾題的選項4 本身就是**完整的平行答案**或屬刪題，沒有可抽出的共同尾段，動了反而會破壞語意：
- `12500-02-135`、`12500-05-18`（選項4 是含「或…」的完整法條答案，且本身就是正解之一）
- `12500-03-134`、`12500-03-187`、`90006-01-80`（四個選項都是完整平行選項的正常題）
- `12500-02-28`（標示「本題刪題」）

若這 6 題裡你仍覺得有需要調整的，告訴我你希望的呈現方式，我再個別處理。

**後續**：之後練習遇到漏網的，照舊整理題號給我即可，我用同樣方式批次修正。修改都直接寫進 `data/bank-*.json`，重新整理就生效。

## User

Verifier agent check completed

## Assistant

驗證通過 ✅ — `12500-02-91`、`12500-03-188`、`12500-02-1` 的選項與尾段（含句號／問號）都正確渲染，尾段顯示在四個選項之後。

66 題修正完成、6 題略過（已說明原因）。之後練習遇到漏網的再給我題號即可。

## User

90006-01-80 "之工作場所"
12500-03-187 "起 85 公分高之心平面"

這兩題需要這樣改成tail

## Assistant

_[tool: run_script]_

收到，這兩題依你指定的尾段處理。兩題已更新：

- **90006-01-80**：選項4 →「從事石油裂解之石化工業」，尾段「之工作場所。」
- **12500-03-187**：選項4 →「地面」，尾段「起 85 公分高之心平面。」

重新整理即生效。剩下略過的還有 `12500-02-135`、`12500-05-18`、`12500-03-134`、`12500-02-28`（刪題）——若也要調整，給我指定的尾段即可。

