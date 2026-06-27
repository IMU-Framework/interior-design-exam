# Upload image

_Started 2026-06-16 11:30 UTC_

---

## User

上傳圖片

## Assistant

_[tool: list_files]_

_[tool: read_file]_

The user uploaded the images for the checklist. Let me map them into the `images/` folder with the correct names. First let me see everything in `uploads/` and what's already in `images/`.

_[tool: list_files]_

_[tool: list_files]_

The uploaded images are already in `uploads/` with clean names. They need to be copied into `images/` so the checklist displays them. Let me verify a couple look right, then copy all the `12500-01` files over.

_[tool: view_image]_

_[tool: view_image]_

Confirmed — these match the uploaded symbols. Now copying all the `12500-01` images into `images/`.

_[tool: copy_files]_

All 22 images are now in place. Let me verify the checklist displays them.

_[tool: show_html]_

_[tool: ready_for_verification]_

Done. The 22 images you uploaded for **工作項目 01 第 3–15 題** are now placed in `images/` and showing in the checklist. The 36 remaining 404s are expected — those are the questions still awaiting images (第 16 題 onwards, plus 第 95/96 題 選項圖), which the checklist correctly marks as「未上傳」.

Newly filled in:
- 選項圖 ×4: 第 3、4、5 題
- 題幹圖: 第 6–15 題

Just upload the rest the same way and refresh the page to see them appear.

## User

12500 01 題目內容校正

- 第27題 "構造圖說"___"其代表"
題幹中間其實有一個圖，請補入 12500-01-27.png

- 第29題 題幹在"#、"後面補上"Ø"

- 第31題 題幹在"CNS規定，"後面補上一張圖 12500-01-31.png

- 第44題的圖片，改為直接放"©"這個字元

- 第46題 題幹"CNS規定，"後面補上一張圖 12500-01-46.png

- 第47題 題幹"電氣設備符號，"後面補上"●T"（T為下標）

- 第50題 題幹圖片改為直接放"─ DWS─"

- 第92、93題 每個選項的開頭(文字前面)都要放上一張圖片

- 第94題 每個選項的開頭都要補上圖或符號，依序為"12500-01-94-1.png","─ S─","─ D─","─ SW─"

- 第102題，每個選項"●"後面的英文字母皆為下標

## Assistant

_[tool: list_files]_

_[tool: grep]_

The JSON is one giant line. Let me understand the schema by reading a slice and finding each target question.

_[tool: grep]_

_[tool: run_script]_

Now let me understand how images and inline content render. Let me look at the rendering code and an example question that already uses option images.

_[tool: read_file]_

_[tool: grep]_

The stem and options render as plain text. To support inline images and subscripts mid-text, I'll add a small rich-text parser. First let me check which image files exist for 92/93/94.

_[tool: run_script]_

None of the new image files exist yet — the user will upload them later (same as before). My job is to wire the data + rendering so inline images and subscripts appear when files are placed. Let me check the existing figure CSS.

_[tool: grep]_

I have the full picture. I'll add a `RichText` parser supporting `[[img:ID]]` (inline figure) and `[[sub:X]]` (subscript) tokens, use it for stems and options, guard the block-level `StemImage` against inline tokens, add CSS, then patch the 11 questions in the data. Let me read the admin StemFig block.

_[tool: read_file]_

Now I'll make all the edits. First, qimage.jsx — add the `RichText`/`InlineFig` parser, guard `StemImage` against inline tokens, and export.

_[tool: str_replace_edit]_

Now exam-screen.jsx — use RichText for stem and option text.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now add CSS for the inline elements.

_[tool: str_replace_edit]_

Now patch the 11 questions in the data bank.

_[tool: run_script]_

Now let me check how the image-checklist derives which images it needs — the new inline-token images should appear there too.

_[tool: grep]_

The checklist is a static hand-generated file. Since I've added new inline images (27, 31, 46, 92-1..4, 93-1..4, 94-1), I'll regenerate it from the banks so it stays the source of truth. Let me read the full file structure first.

_[tool: read_file]_

This is best done by regenerating the checklist from the banks. Let me see all the section headers in the current file to match its grouping.

_[tool: grep]_

Only 3 sections, all image-bearing. Regenerating from the banks is cleanest. Let me read the footer/scripts at the end.

_[tool: read_file]_

Now I'll regenerate the checklist body from all banks, preserving the head/footer scaffold.

_[tool: run_script]_

Counts add up (51 questions / 78 files). Now let me verify rendering — first the app for the affected questions, then the checklist. Let me check how to navigate to a specific question in the exam. Let me just render the checklist and spot-check the data renders.

_[tool: show_html]_

_[tool: grep]_

Let me confirm the script load order in index.html so `RichText` is defined before the screens use it.

_[tool: grep]_

Load order is correct (`qimage.jsx` before the screens), and this mirrors how the existing `StemImage`/`OptionImage` are already shared. Everything's wired. Let me run verification on the app.

_[tool: ready_for_verification]_

已完成 12500-01 的全部 11 處題目校正。

**直接套用文字/符號**（不需圖檔）：
- 第29題：＃、後補上「Ø」
- 第44題：圖片改為「©」字元
- 第47題：補上「●T」（T 下標）
- 第50題：圖片改為「─ DWS─」
- 第102題：四選項 ●K／●P／●W／●T 的字母皆改為下標

**需上傳新圖檔**（系統已接好，放進 `images/` 即自動顯示）：
- 第27題 → `12500-01-27.png`（題幹中間）
- 第31題 → `12500-01-31.png`（CNS規定，之後）
- 第46題 → `12500-01-46.png`（CNS規定，之後）
- 第92題 → `12500-01-92-1.png`～`-4.png`（每選項開頭）
- 第93題 → `12500-01-93-1.png`～`-4.png`
- 第94題 → `12500-01-94-1.png`（其餘三項用 ─ S─／─ D─／─ SW─ 文字符號）

我新增了行內圖片與下標的支援，並把「圖檔對照表」重新生成為最新狀態（共 51 題含圖、78 張），上述待補圖檔都已列入清單。

## User

第10題 改成直接使用 "─ SP ─" （P為下標）
第13題 改成直接使用 "─ D ─"

## Assistant

_[tool: run_script]_

Now regenerate the checklist (10 and 13 no longer need images).

_[tool: run_script]_

兩題都已改為文字符號（不再需要圖檔）：
- 第10題：消防設備圖中 **─ S<sub>P</sub> ─** 代表（P 下標）
- 第13題：給排水及衛生設備圖例 **─ D ─** 代表

對照表已更新（含圖題 49 題、76 張）。

## User

第26題，改為 ─ F ─

## Assistant

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

第26題已改為「消防設備符號 **─ F ─** 代表」（不再需要圖檔）。對照表更新為含圖 48 題、75 張。

