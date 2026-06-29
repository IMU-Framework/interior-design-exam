# 建築室內設計模擬考

_Started 2026-06-02 11:59 UTC_

---

## User

我要做一個選擇題模擬考練習器，題庫來源自附件。
正式考試的時候，每一個部分會隨機抽考。包含以下分類：
12500 建築物室內設計乙級
 第 1 題組   工作項目01：圖說判讀
 第 2 題組   工作項目02：相關法規
 第 3 題組   工作項目03：繪製圖說
 第 4 題組   工作項目04：工程估算
 第 5 題組   工作項目05：工程實務

 共同科目 90006   職業安全衛生
 共同科目 90007   工作倫理與職業道德
 共同科目 90008   環境保護(100題)
 共同科目 90009   節能減碳(100題)

--
先做第一個模式【正式考試模擬】依常規隨機抽出題，比例分配說明如下：

專業科目（44題單選 + 20題複選）：由專業題庫中的 749 題隨機抽出。五大工作項目（圖樣、法規、施工、估價、實務）的抽題比例接近平均，但實務上法規與施工作業在單選題的抽考能見度通常略高。

共同科目（16題單選）：固定為單選題，4個項目（職安、環境、倫理、節能）各抽4題。

1. 單選題給分（共 60 題，每題 1 分，滿分 60 分）計分方式：答對得 1 分，答錯、未作答為 0 分。無倒扣。

2. 複選題給分（共 20 題，每題 2 分，滿分 40 分）計分方式：必須與標準答案完全一致才得 2 分。嚴格零分制：凡是多選、漏選、錯選、或未作答，該題直接以 0 分計算。無倒扣。

總分為100分，60以上為及格。
--

其他模式例如依題組隨機抽主定數量題目、依題組逐題，之後再加。

## Assistant

_[tool: list_files]_

I'll start by exploring the project and understanding the question bank format. Let me look at the files and learn how to read the PDFs.

_[tool: list_files]_

_[tool: invoke_skill]_

Let me read the PDFs to understand the question format. I'll start with the professional subject PDF.

_[tool: run_script]_

_[tool: run_script]_

This is a large parsing task. Let me examine the structure — work item boundaries and where multiple-choice (複選題) sections begin.

_[tool: run_script]_

_[tool: run_script]_

Each work item has single-choice questions followed by multiple-choice (複選). Note: work item 01 (圖說判讀) has many image-based questions where options are blank. Let me parse all PDFs and assess the image-question problem.

_[tool: run_script]_

The structure is consistent. Now let me write a robust parser and assess how many questions are image-based (unusable as text).

_[tool: questions_v2]_

The parser works perfectly — **749 questions** extracted, matching your stated count exactly. Distribution:

| 工作項目 | 單選 | 複選 |
|---|---|---|
| 01 圖說判讀 | 82 | 23 |
| 02 相關法規 | 126 | 43 |
| 03 繪製圖說 | 204 | 57 |
| 04 工程估算 | 48 | 33 |
| 05 工程實務 | 83 | 50 |

One important finding: **圖說判讀 (01)** contains many symbol/diagram questions where the image is part of the question (e.g.「消防設備圖 ▢ 代表…」). 5 questions have *all* options as images (totally blank in text); more have a missing symbol in the stem. PDFs don't carry those images into text, so those questions are degraded. I'll ask you how to handle this below.

Before I build, a few questions to get it right:

## User

Questions answered:
- vibe: 現代簡約（黑白灰、大量留白、高對比）
- theme: 兩者都要（可切換）
- device: 手機與電腦都要（RWD）
- image_q: 先保留placeholder並標註，我們之後再把圖檔補上來。
- feedback: 兩種模式都提供
- timer: 要，倒數計時 100 分鐘
- review: 每題正確答案與你的作答對照
- persist: 只要能中途離開後回來繼續同一份考卷
- font: 黑體（思源黑體 / Noto Sans TC，俐落）

## Assistant

_[tool: update_todos]_

Got it — modern minimal, monochrome, light+dark toggle, RWD, 100-min countdown, both feedback modes, resume support, Noto Sans TC, and image questions kept as labeled placeholders. Let me set up my plan and finalize the question bank.Let me examine category 01 stems closely to design a reliable image-detection heuristic.

_[tool: run_script]_

_[tool: run_script]_

My heuristic catches symbol questions but false-flags Q1/Q2 (where the symbol is literal text like "ELEV"/"SW"). Let me refine it to only flag when a generic graphic noun precedes 代表/表示, then generate the full question bank.

_[tool: run_script]_

Excellent — **1149 questions** total (749 professional + 400 common, 100 each). Image detection flagged 48 questions for placeholders. Now let me convert the bank to a JS global (avoids fetch issues) and start building.

_[tool: write_file]_

All cells have ample questions. Now the styles — modern minimal monochrome with light/dark tokens.

_[tool: write_file]_

Now the core logic module — draw, scoring, persistence.

_[tool: write_file]_

Now the React UI. I'll split into modular JSX files. Starting with icons + shared widgets.

_[tool: write_file]_

Now the Home and Setup screens.

_[tool: write_file]_

Now the exam-taking screen with options, palette drawer, and submit flow.

_[tool: write_file]_

Now the result + review screen.

_[tool: write_file]_

Now the App root — state, timer, persistence, routing.Now the index.html that ties it together:

_[tool: write_file]_

Let me check it loads cleanly before viewing.

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

No errors. Let me screenshot the home screen to verify the design.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

Topbar renders but body content is blank. Let me inspect the DOM to find why.

_[tool: view_image]_

_[tool: save_screenshot]_

Let me check the actual DOM state via console.

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

The content IS in the DOM (12k chars) but not visible. Likely a CSS color/opacity issue. Let me probe computed styles.

_[tool: get_webview_logs]_

_[tool: str_replace_edit]_

Found it: `.home` has `opacity: 0` — the entrance `fade` animation never progressed in the offscreen capture iframe and stuck at its `from` state. I'll make the entrance animation transform-only so content is never hidden if the animation doesn't run.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

Still blank — possibly cached CSS. Let me re-probe computed opacity.

_[tool: get_webview_logs]_

_[tool: str_replace_edit]_

CSS is cached (transform shows old 6px value, opacity still 0). The animation IS frozen at its `from` state in this background iframe — confirming the throttle theory. My fix is right; I just need to bust the cache. Let me version the stylesheet link.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

Home renders beautifully now. Let me scroll down to see the mode cards, then test the exam flow.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Looks great. The "即將推出" tag wraps — quick fix, then I'll test the exam flow.Now let me test the full exam flow — navigate into the exam and capture a question.

_[tool: save_screenshot]_

_[tool: view_image]_

Setup screen is clean. Now let me begin the exam and capture a question.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Exam screen works — timer running, clean layout. The badges wrap awkwardly though. Let me fix badge/flag nowrap, then test answering + result + dark mode.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now let me test answering questions and the result screen. I'll programmatically answer all questions then submit.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Badges fixed. The "交卷" button wraps — let me add nowrap to buttons, then drive through to the result screen.

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

The previous run left saved state. Let me clear storage and start fresh, with a longer initial delay for Babel.

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

No JS errors. The result transition likely worked — the capture glitch is infrastructural. Let me take a standalone screenshot of the current state.

_[tool: view_image]_

_[tool: save_screenshot]_

Result screen renders perfectly. Let me scroll to verify the category stats and review list.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: sleep]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Everything works — category stats, review with 正解/你選 highlighting. Let me fix the chip wrapping and verify dark mode.

_[tool: str_replace_edit]_

Let me verify dark mode on the home + an exam question.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: delete_file]_

Dark mode is clean. Everything works. Let me clean up intermediate files and finalize.

_[tool: done]_

_[tool: snip]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

已完成第一個模式【正式考試模擬】。

**題庫**：從 5 份 PDF 解析出 **1149 題**（專業 749 + 共同 400），完全對上你說的數字。圖說判讀的符號題自動標記為「含圖」，以待補圖檔的 placeholder 呈現，之後把圖檔補上即可。

**正式考試模擬**完整實作：
- 隨機抽題：專業單選 44（圖說8/法規10/繪圖10/估算8/實務8）＋專業複選 20（各4）＋共同單選 16（各4）
- 100 分鐘倒數，**離開可暫停、回來續考同一份**
- 計分：單選 60 分（答對得1、無倒扣）＋複選 40 分（**嚴格零分制**，須完全一致），總分 100、60 及格
- 題號面板可跳題、標記待複查；交卷後逐題檢討（正解／你選對照、各工作項目答對率、答錯/標記篩選）
- 現代簡約黑白灰、深淺色可切換、手機電腦皆適用

「即時對錯回饋」與「納入含圖題目」兩個開關放在開始前。**依題組抽考 / 逐題練習**已留位置標示「即將推出」，隨時可加。

兩點供你決定：
1. 含圖題目目前先放 placeholder，補圖時我需要圖檔＋對應題號（檔名我已用 `12500-01-3` 這種格式編好 id，方便對應）。
2. 專業單選的分配比例（法規/繪圖略高）是我依你描述設的預設，要調整告訴我即可。

要不要接著做第二個模式？

## User

這些題目是依照PDF出的真實題嗎

## Assistant

_[tool: run_script]_

好問題 —讓我直接用原始 PDF 重新比對驗證，確認題目、選項、答案都是 100% 照 PDF 出的真實題（不是我生成的）。

_[tool: run_script]_

全部命中。讓我再做一次**全題庫批量比對**，量化準確率，並驗證答案抽取正確：

是的，**100% 是照 PDF 出的真實題**。我剛用原始 PDF 對全部 1149 題做了逐題比對：

| 驗證項目 | 結果 |
|---|---|
| 題幹與 PDF 原文逐字相符 | **1149 / 1149（100%）** |
| 四個選項與 PDF 相符 | 1148 / 1149（99.9%） |
| 正確答案＝PDF 題號括號內的答案 | **1149 / 1149（100%）** |

抽題、選項、標準答案都直接取自你附的官方學科參考資料，沒有任何我自行生成或改寫的內容。

唯一的小差異是 1 題的某個選項在比對時差了字元（PDF 文字層把符號或空格切開造成的，**不影響答案正確性**）。另外要提醒：圖說判讀裡的「含圖」符號題，題幹文字是真的、答案也對，但符號圖形 PDF 帶不出來，所以那些題以 placeholder 標示、等你補圖。

需要的話我可以把那 1 題選項找出來人工校正，或繼續做第二個模式。

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

I'll change the pill to show the full source category. Let me add a shared label helper and use it in both the exam and review screens.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: show_html]_

Let me verify the longer badge renders cleanly in the exam header.

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: delete_file]_

The pill now reads **"專業 工作項目 02：相關法規"** — matching the source category format you asked for (and common subjects show "共同科目：…"). Updated in both the exam and the review screens. Let me clean up and finalize.

_[tool: done]_

已套用。題目分類 pill 現在顯示完整來源分類：

- 專業科目 → **「專業 工作項目 02：相關法規」**
- 共同科目 → **「共同科目：職業安全衛生」**

考試畫面與交卷後的逐題檢討都同步更新了。

## User

現在開始實作
02 依題組抽考 及
03 依題組逐題練習

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: update_todos]_

This is a solid chunk of work. Let me lay out the plan, then build modes 02 and 03 by extending the existing engine and reusing the exam UI where it makes sense.

_[tool: update_todos]_

Now let me extend the core engine with group metadata, draw functions, generic scoring, and study mastery tracking.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now add the draw functions for modes 02/03, generic scoring fields, and the study mastery store:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now add the study mastery store at the end of exam-core.js:

_[tool: str_replace_edit]_

_[tool: read_file]_

Now let me generalize ExamScreen for optional timer, study header, and mode-aware labels. Let me re-read it.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now update the bottom nav and palette/confirm to be mode-aware:Now update Palette and ConfirmSubmit for mode-awareness:

_[tool: str_replace_edit]_

_[tool: write_file]_

Now the new practice screens (modes 02 & 03 setup). Let me create `practice.jsx`:

_[tool: str_replace_edit]_

Now add CSS for the new setup controls:

_[tool: read_file]_

Now adapt the Result screen for draw/study modes (accuracy view) vs formal (100-point). Let me read the top of result.jsx:

_[tool: str_replace_edit]_

_[tool: read_file]_

Let me check the bottom buttons of Result and make the retry label mode-aware:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now wire up the Home cards. Let me update home.jsx:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

## Assistant

_[tool: str_replace_edit]_

_[tool: write_file]_

Now rewrite app.jsx routing to handle all three modes:Now add practice.jsx to index.html (before app.jsx) and bump the CSS version:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: update_todos]_

_[tool: show_html]_

Let me check it loads cleanly, then screenshot the two new setup screens.

_[tool: show_html]_

_[tool: get_webview_logs]_

No errors. Let me screenshot the two new setup screens (mode 02 and 03).

_[tool: save_screenshot]_

_[tool: view_image]_

Mode 02 setup looks excellent. The "取消專業/共同" buttons wrap slightly — minor. Let me scroll down to see type/count/options.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Type, slider, presets all render beautifully. The preset labels wrap ("10題" → 2 lines) — let me fix nowrap, then check mode 03 study setup.Now let me test mode 03 study setup and run a full study session end-to-end.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

Mode 03 study setup looks great — radio selection with per-group mastery counts. Now let me run a full study session to verify the study screen (instant feedback, no timer, mastery recording) and the practice statistics result.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: view_image]_

Study mode header is correct — green "✓ 0/0" running tally, "已練 0/105", "結束練習" button, no timer. Now let me answer a question to verify instant feedback and mastery recording, then check the result/statistics screen.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

_[tool: view_image]_

Instant feedback works perfectly — wrong answer marked with red ✗, correct answer ② highlighted green, tally updated. Let me end the practice to verify the statistics screen, then confirm mastery persisted.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

_[tool: view_image]_

The reload reset state. Let me drive the whole study flow in one sequence:

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: get_webview_logs]_

_[tool: view_image]_

_[tool: list_files]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

_[tool: view_image]_

The capture hit an infra hiccup mid-sequence. Let me retry reaching the study statistics screen:

_[tool: eval_js]_

Let me check the current screen state — a persisted session may have restored:

_[tool: save_screenshot]_

_[tool: view_image]_

It's already on the study statistics result screen (the previous session completed). Let me screenshot it directly:

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

The preview pane is being flaky. The DOM confirms the study statistics screen rendered correctly. Let me verify the result screen content via eval instead, then finalize.

_[tool: str_replace_edit]_

Good — the study statistics screen renders, but I see a UX issue: study mode shows "1/105" (1%) because it scores over the *entire* 105-question set even though I only practiced 2. For study mode, the stats should reflect what was actually practiced this session. Let me fix that.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

For study mode, let me also surface the cumulative group mastery (the persistent metric) below the session stats:

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

Now the review list is also scoped to practiced questions in study mode. Let me verify it all loads cleanly:Clean. Let me run mode 02 (draw) end-to-end via eval to confirm the accuracy result works, then do a final visual check.

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: view_image]_

Mode 02 verified: drew exactly 12 from only the selected groups (法規+估算), single-block-then-multi ordering, 50% accuracy scoring correct. Let me capture a couple final views, then hand off. First, the home with 3 active cards:

_[tool: view_image]_

All three modes are now live and clickable in dark mode. Everything works. Let me clean up screenshots and finalize.

_[tool: delete_file]_

_[tool: update_todos]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

兩個新模式都做好了，三種模式現在都能用。

**02 依題組抽考**
- 多選題組（專業 5＋共同 4，可全選/取消專業或共同）
- 題型：單選＋複選 / 只考單選 / 只考複選
- 題數：滑桿＋快捷鍵（10/20/30/50/全部），即時顯示「可抽 N 題」
- 選項：即時對錯回饋、限時作答（每題約 75 秒）、納入含圖題
- 抽完依「單選在前、複選在後」排序，交卷後看**正確率**與逐題檢討

**03 依題組逐題練習**
- 單選一個題組，逐題作答、**即時對照答案**、無計時
- 順序可選「依題庫順序」或「隨機」
- 頂端顯示即時「✓ 正確/已練」計數
- **精熟進度會長期記錄**：每組顯示已精熟題數，跨多次練習累計；可單獨清除某組進度
- 結束後看本次練習正確率＋該題組累積精熟度

三種模式共用同一套作答介面、題號面板、深淺色與 RWD，並都支援**中途離開後回來接續**（首頁會依模式顯示對應的「繼續」橫幅）。

需要的話接著可以加：錯題本（跨模式累積答錯題）、或把含圖題的圖檔補上。

