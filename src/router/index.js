// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { setLocale } from '@/i18n'
import Home from '../views/Home.vue'
import Affiliate from '../components/Affiliate.vue'
import Promotion from '../components/Promotion.vue'
import Register from '../components/Register.vue'
// import Games from '../views/Games.vue'
// import Promotions from '../views/Promotions.vue'

// Supported languages - Thai as default, English, and Lao
const supportedLocales = ['th', 'en', 'lo']
const defaultLocale = 'th'

// Meta titles and descriptions for all locales
const metaContent = {
  Home: {
    th: { title: 'หน้าหลัก - Macau888', description: 'ยินดีต้อนรับสู่ Macau888 – ประตูสู่เกมสล็อตที่น่าตื่นเต้น เกมคาสิโน และโบนัสพิเศษ' },
    en: { title: 'Home - Macau888', description: 'Welcome to Macau888 – your gateway to exciting slots, casino games, and exclusive bonuses.' },
    lo: { title: 'ໜ້າຫຼັກ - Macau888', description: 'ຍິນດີຕ້ອນຮັບສູ່ Macau888 – ປະຕູສູ່ເກມສະລັອດທີ່ໜ້າຕື່ນເຕັ້ນ ເກມຄາສິໂນ ແລະໂບນັດພິເສດ' }
  },
  Games: {
    th: { title: 'เกมส์ - Macau888', description: 'สำรวจเกมที่น่าตื่นเต้นมากมาย รวมถึงสล็อต คาสิโนสด และการเดิมพันกีฬาที่ Macau888' },
    en: { title: 'Games - Macau888', description: 'Explore a variety of thrilling games including slots, live casino, and sports betting on Macau888.' },
    lo: { title: 'ເກມ - Macau888', description: 'ສຳຫຼວດເກມທີ່ໜ້າຕື່ນເຕັ້ນຫຼາຍຊະນິດ ລວມທັງສະລັອດ ຄາສິໂນສົດ ແລະການເດີມພັນກິລາທີ່ Macau888' }
  },
  Promotions: {
    th: { title: 'โปรโมชั่น - Macau888', description: 'รับโปรโมชั่นล่าสุดและโบนัสพิเศษที่ Macau888 เล่นมากขึ้น ชนะมากขึ้น!' },
    en: { title: 'Promotions - Macau888', description: 'Grab our latest promotions and exclusive bonuses at Macau888. Play more, win more!' },
    lo: { title: 'ໂປໂມຊັ່ນ - Macau888', description: 'ຮັບໂປໂມຊັ່ນຫຼ້າສຸດແລະໂບນັດພິເສດທີ່ Macau888 ຫຼິ້ນຫຼາຍຂຶ້ນ ຊະນະຫຼາຍຂຶ້ນ!' }
  },
  Affiliate: {
    th: { title: 'โปรแกรมพันธมิตร - Macau888', description: 'เข้าร่วมโปรแกรมพันธมิตร Macau888 และได้รับค่าคอมมิชชันจากเกมคาสิโนและการเดิมพันกีฬาที่น่าตื่นเต้น' },
    en: { title: 'Affiliate Program - Macau888', description: 'Join Macau888 affiliate program and earn commission from our exciting casino games and sports betting.' },
    lo: { title: 'ໂປຣແກຣມພັນທະມິດ - Macau888', description: 'ເຂົ້າຮ່ວມໂປຣແກຣມພັນທະມິດ Macau888 ແລະໄດ້ຮັບຄ່າຄອມມິດຊັ່ນຈາກເກມຄາສິໂນແລະການເດີມພັນກິລາທີ່ໜ້າຕື່ນເຕັ້ນ' }
  },
  Promotion: {
    th: { title: 'โปรโมชั่น - Macau888', description: 'รับโปรโมชั่นล่าสุดและโบนัสพิเศษที่ Macau888 เล่นมากขึ้น ชนะมากขึ้น!' },
    en: { title: 'Promotions - Macau888', description: 'Grab our latest promotions and exclusive bonuses at Macau888. Play more, win more!' },
    lo: { title: 'ໂປໂມຊັ່ນ - Macau888', description: 'ຮັບໂປໂມຊັ່ນຫຼ້າສຸດແລະໂບນັດພິເສດທີ່ Macau888 ຫຼິ້ນຫຼາຍຂຶ້ນ ຊະນະຫຼາຍຂຶ້ນ!' }
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
      description: metaContent[name]?.[locale]?.description || 'ເລ່ນເກມຄາສິໂນອອນລາຍຊັ້ນນຳທີ່ Macau888 ດ້ວຍຄວາມປອດໄພ 100% ແລະໂບນັດທີ່ໜ້າຕື່ນເຕັ້ນ'
    }
  }));
};

const routes = [
  // Only Home and Affiliate routes for now - others commented out until components are created
  ...createLocalizedRoute('/', 'Home', Home),
  ...createLocalizedRoute('/affiliate', 'Affiliate', Affiliate),
  ...createLocalizedRoute('/promotions', 'Promotion', Promotion),
  
  // Uncomment these when you create the Games.vue and Promotions.vue files:
  // ...createLocalizedRoute('/games', 'Games', Games),
  // ...createLocalizedRoute('/promotions', 'Promotions', Promotions),
  
  { path: '/th', redirect: '/' },
  { path: '/th/:pathMatch(.*)*', redirect: to => `/${to.params.pathMatch}` },
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