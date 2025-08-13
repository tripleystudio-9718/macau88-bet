// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { setLocale } from '@/i18n'
import Home from '../views/Home.vue'
// import Games from '../views/Games.vue'
// import Promotions from '../views/Promotions.vue'

// Supported languages
const supportedLocales = ['en', 'zh', 'ms']
const defaultLocale = 'en'

// Meta titles and descriptions for all locales
const metaContent = {
  Home: {
    en: { title: 'Home - Macau888', description: 'Welcome to Macau888 – your gateway to exciting slots, casino games, and exclusive bonuses.' },
    zh: { title: '首页 - Macau888', description: '欢迎来到 Macau888，尽享精彩老虎机、真人娱乐场和独家优惠。' },
    ms: { title: 'Laman Utama - Macau888', description: 'Selamat datang ke Macau888 – tempat terbaik untuk slot menarik, permainan kasino, dan bonus eksklusif.' }
  },
  Games: {
    en: { title: 'Games - Macau888', description: 'Explore a variety of thrilling games including slots, live casino, and sports betting on Macau888.' },
    zh: { title: '游戏 - Macau888', description: '探索各种刺激游戏，包括老虎机、真人赌场和体育博彩。' },
    ms: { title: 'Permainan - Macau888', description: 'Terokai pelbagai permainan menarik termasuk slot, kasino langsung, dan pertaruhan sukan di Macau888.' }
  },
  Promotions: {
    en: { title: 'Promotions - Macau888', description: 'Grab our latest promotions and exclusive bonuses at Macau888. Play more, win more!' },
    zh: { title: '优惠活动 - Macau888', description: '获取 Macau888 最新优惠和独家奖金。玩得越多，赢得越多！' },
    ms: { title: 'Promosi - Macau888', description: 'Dapatkan promosi terkini dan bonus eksklusif di Macau888. Main lebih, menang lebih!' }
  }
};

// Helper function to create localized routes
const createLocalizedRoute = (path, name, component) => {
  return supportedLocales.map(locale => ({
    path: locale === defaultLocale ? path : `/${locale}${path}`,
    name: locale === defaultLocale ? name : `${name}-${locale}`,
    component,
    meta: {
      locale,
      title: metaContent[name]?.[locale]?.title || 'Macau888',
      description: metaContent[name]?.[locale]?.description || 'Play top online casino games at Macau888 with 100% security and thrilling bonuses.'
    }
  }));
};

const routes = [
  // Only Home route for now - others commented out until components are created
  ...createLocalizedRoute('/', 'Home', Home),
  
  // Uncomment these when you create the Games.vue and Promotions.vue files:
  // ...createLocalizedRoute('/games', 'Games', Games),
  // ...createLocalizedRoute('/promotions', 'Promotions', Promotions),
  
  { path: '/en', redirect: '/' },
  { path: '/en/:pathMatch(.*)*', redirect: to => `/${to.params.pathMatch}` },
  // Catch all route for 404 - redirect to home
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const locale = to.meta.locale || defaultLocale;
  setLocale(locale);
  document.title = to.meta.title || 'Macau888';
  next();
});

export const getCurrentLocale = route => route.meta?.locale || defaultLocale;

export const localePath = (path, locale = null) => {
  const currentLocale = locale || defaultLocale;
  return currentLocale === defaultLocale ? path : `/${currentLocale}${path}`;
};

export const switchLocale = (router, newLocale) => {
  const currentRoute = router.currentRoute.value;
  const currentLocale = getCurrentLocale(currentRoute);
  if (currentLocale === newLocale) return;

  let newPath = currentRoute.path.replace(new RegExp(`^/${currentLocale}`), '');
  if (newLocale !== defaultLocale) newPath = `/${newLocale}${newPath}`;
  if (newPath === '') newPath = '/';
  router.push(newPath);
};

export { supportedLocales, defaultLocale };
export default router;