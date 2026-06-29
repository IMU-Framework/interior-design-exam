# Preload Skeleton設計

_Started 2026-06-13 14:14 UTC_

---

## User

載入時要有preload skeleton

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

Now I understand the structure. The `#root` is empty during the fetch + Babel transpile phase, then `createRoot().render()` replaces its contents. I'll add a skeleton that mirrors the home layout — it shows instantly and gets wiped automatically when React mounts.

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: show_html]_

The skeleton renders cleanly and matches the home layout. It shows instantly on load (theme-aware, with shimmer) and is automatically replaced when React mounts.

_[tool: done]_

已加上載入骨架畫面。題庫 JSON 載入與 Babel 編譯期間，會立即顯示一個與首頁版型一致的骨架（頂欄、標題、統計列、模式卡片），帶微光 shimmer 動畫並跟隨深淺主題；React 掛載完成後自動取代。

