// src/i18n/index.js
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import th from './locales/th.json'
import lo from './locales/lo.json'

const messages = {
  en,
  th,
  lo
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'th', // Default locale changed to Thai
  fallbackLocale: 'th', // Fallback to Thai instead of English
  messages,
  globalInjection: true // Enable global $t
})

export default i18n

// Helper function to get browser language
export const getBrowserLocale = () => {
  const browserLocale = navigator.language || navigator.languages[0]
  const locale = browserLocale.split('-')[0]
  // Updated to match your supported locales: Thai, English, Lao
  return ['th', 'en', 'lo'].includes(locale) ? locale : 'th'
}

// Helper function to set locale
export const setLocale = (locale) => {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  localStorage.setItem('locale', locale)
}

// Helper function to get saved locale
export const getSavedLocale = () => {
  return localStorage.getItem('locale') || getBrowserLocale()
}