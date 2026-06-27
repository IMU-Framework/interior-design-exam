# 手機板介面優化

_Started 2026-06-27 06:52 UTC_

---

## User

手機板介面優化
1. 把一些元素簡化：題目上方的灰字題號隱藏、header的已練 XX/XXX隱藏，已練題數統計改在題號面板的"題號面板"標題旁以小灰字顯示。
2. 版面需考慮上方header、下方navigator的空間，留好內容上下方的padding。vu04y94d042l4

## Assistant

_[tool: read_file]_

_[tool: read_file]_

Now let me look at the relevant CSS.

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

Now I have a clear picture. Let me make the changes.

_[tool: str_replace_edit]_

Now the CSS changes:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

手機版三項調整已完成：

1. 題目上方灰字題號（`q-index`）與 header 的「已答/已練 XX/XXX」（`progress-mini`）在手機版（≤560px）隱藏；統計改顯示在題號面板「題號面板」標題旁的小灰字。
2. 內容區上下 padding 重新校正，底部加上 `env(safe-area-inset-bottom)` 安全區，確保不被 header 與底部 navigator 遮擋。

桌機版維持原樣，所有變更僅作用於手機斷點。

