import { useEffect } from 'react';

const LOCAL_STORAGE_KEY_DARKMOD = 'dark';
const MAIN_CLASS_DARMODE = 'dark';

function isDarkModeActive() {
  return (
    localStorage.theme === LOCAL_STORAGE_KEY_DARKMOD ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

function updateDarkModeClass() {
  if (isDarkModeActive()) {
    document.documentElement.classList.add(MAIN_CLASS_DARMODE);
  } else {
    document.documentElement.classList.remove(MAIN_CLASS_DARMODE);
  }
}

export default function useDarkMode() {
  useEffect(() => updateDarkModeClass());
}
