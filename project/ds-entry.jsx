// Design-sync adapter entry — proper ES module wrapper around the global-injection
// components in icons.jsx. Used only by the .ds-sync converter (esbuild); never
// loaded in the browser. The reactShim in bundle.mjs maps `import React` → window.React.
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ─── Icons ────────────────────────────────────────────────────────────────────

/** Sun / light-mode indicator icon */
export function SunIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
}

/** Moon / dark-mode indicator icon */
export function MoonIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
}

/** Right-arrow / next action icon */
export function ArrowIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}

/** Left-arrow / back navigation icon */
export function BackIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
}

/** Clock / timer icon */
export function ClockIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}

/** Flag / bookmark question icon */
export function FlagIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 21V4h13l-2 4 2 4H4"/></svg>;
}

/** Grid / category overview icon */
export function GridIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}

/** Close / dismiss icon */
export function CloseIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>;
}

/** Image / photo placeholder icon */
export function ImageIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>;
}

/** Check / correct answer icon */
export function CheckIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>;
}

/** X / wrong answer icon */
export function XIcon(p) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>;
}

// ─── Widgets ──────────────────────────────────────────────────────────────────

/**
 * Toggle switch — binary on/off control.
 * @param {{ on: boolean, onChange: (next: boolean) => void }} props
 */
export function Switch({ on, onChange }) {
  return (
    <button
      className={'switch' + (on ? ' on' : '')}
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
    />
  );
}

/**
 * Light/dark theme toggle button — renders sun in dark mode, moon in light mode.
 * @param {{ theme: 'light'|'dark', setTheme: (t: 'light'|'dark') => void }} props
 */
export function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="icon-btn"
      aria-label="切換深淺色"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
