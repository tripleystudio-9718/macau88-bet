<template>
  <div class="app-container">
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-bg-gradient"></div>

      <!-- SLIDER (fade) -->
      <div
        class="slider-container"
        @mouseenter="pause"
        @mouseleave="play"
        tabindex="0"
      >
        <!-- Track (stacked slides, no clones, no transform) -->
        <div
          class="slider-track"
          :class="{ dragging: heroDragging }"
          :style="heroStyle"
          ref="heroTrack"
          @pointerdown="onHeroPointerDown"
          @pointermove="onHeroPointerMove"
          @pointerup="onHeroPointerUp"
          @pointercancel="onHeroPointerUp"
          @pointerleave="onHeroPointerUp"
        >
          <div
            v-for="(image, i) in images"
            :key="'h-' + i"
            class="slide"
            :class="{ 'is-active': i === displayedHeroIndex }"
          >
            <div class="slide-box">
              <img :src="image" :alt="t('alt.slide', { num: i + 1 })" draggable="false" />
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <button class="nav-btn left" @click="prevHero" :aria-label="t('common.previous')">❮</button>
        <button class="nav-btn right" @click="nextHero" :aria-label="t('common.next')">❯</button>
      </div>
    </section>

    <!-- Section 2: Video -->
    <section class="video-section">
      <div class="video-frame">
        <iframe
          src="https://streamable.com/e/rb6rlj?autoplay=0&muted=0&loop=0&controls=1"
          :title="t('video.promoTitle')"
          loading="lazy"
          frameborder="0"
          allow="fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <section class="ticker-wrap" @mouseenter="paused = true" @mouseleave="paused = false">
      <div class="ticker" :style="{ '--speed': speed + 's' }">
        <div class="ticker-track" :class="{ paused }">
          <span class="ticker-item">{{ text }}</span>
          <span class="ticker-item" aria-hidden="true">{{ text }}</span>
          <span class="ticker-item" aria-hidden="true">{{ text }}</span>
        </div>
      </div>
    </section>

    <section class="image-slider">
      <!-- GIF -->
      <img :src="macauGif" :alt="t('alt.macauGif')" class="macau-gif" />

      <!-- 2-up slider below the GIF (infinite loop, no rewind) -->
      <div
        class="two-up-container"
        @mouseenter="pausePair()"
        @mouseleave="playPair()"
        tabindex="0"
      >
        <div
          class="two-up-track"
          :class="{ dragging: pairDragging }"
          :style="pairStyle"
          ref="pairTrack"
          @transitionend="onPairTransitionEnd"
          @pointerdown="onPairPointerDown"
          @pointermove="onPairPointerMove"
          @pointerup="onPairPointerUp"
          @pointercancel="onPairPointerUp"
          @pointerleave="onPairPointerUp"
        >
          <!-- Render with clones at both ends -->
          <div v-for="(pair, p) in extendedPairs" :key="'ext-' + p" class="pair">
            <div v-for="(src, i) in pair" :key="i" class="poster">
              <img :src="src" :alt="t('alt.poster', { num: p*2 + i + 1 })" draggable="false" />
            </div>
          </div>
        </div>

        <!-- indicators (bars) reflect real slides -->
        <div class="two-up-indicators" role="tablist" :aria-label="t('aria.postersCarousel')">
          <button
            v-for="(_, i) in pairs"
            :key="'ind-' + i"
            class="bar-dot"
            :class="{ active: i === realIndex }"
            @click="goToPair(i)"
            :aria-selected="i === realIndex"
            role="tab"
            :aria-controls="'pair-' + i"
          />
        </div>
      </div>
    </section>

    <!-- Feature Tabs -->
    <section class="hub-tabs" aria-label="Feature shortcuts">
      <div
        class="hub-grid"
        role="tablist"
        aria-orientation="horizontal"
        @keydown="onHubKeydown"
      >
        <button
          v-for="(tItem, idx) in hubTabs"
          :key="tItem.key"
          class="hub-tile"
          role="tab"
          :id="`tab-${tItem.key}`"
          :aria-selected="tItem.key === activeHub"
          :tabindex="tItem.key === activeHub ? 0 : -1"
          @click="selectHub(tItem.key)"
        >
          <span class="hub-icon-wrap">
            <img class="hub-icon" :src="tItem.icon" :alt="t(tItem.labelKey)" draggable="false" />
          </span>

          <span class="hub-label">{{ t(tItem.labelKey) }}</span>
          <span class="hub-tile-border" aria-hidden="true"></span>
        </button>
      </div>

      <!-- Panel -->
      <div
        class="hub-panel"
        role="tabpanel"
        :aria-labelledby="`tab-${activeHub}`"
      >
        <div v-if="activeHub === 'slot'">
          <SlotTab @provider-selected="handleProviderSelected" />
        </div>
        <div v-else-if="activeHub === 'casino'">
          <CasinoTab @provider-selected="handleProviderSelected" />
        </div>
        <div v-else-if="activeHub === 'allgames'">
          <AllTab @provider-selected="handleProviderSelected" />
        </div>
        <div v-else-if="activeHub === 'sports'">
          <SportsTab @provider-selected="handleProviderSelected" />
        </div>
        <div v-else-if="activeHub === 'lotto'">
          <LottoTab @provider-selected="handleProviderSelected" />
        </div>
      </div>
    </section>

    <PromotionSection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentLocale, localePath } from '@/router'
import { useI18n } from 'vue-i18n'

/* i18n */
const { t } = useI18n()

/* assets & components */
import macauGif from '@/assets/macau-gif1.gif'
import SlotTab from '@/components/SlotTab.vue'
import CasinoTab from '@/components/CasinoTab.vue'
import AllTab from '@/components/AllTab.vue'
import SportsTab from '@/components/SportsTab.vue'
import LottoTab from '@/components/LottoTab.vue'
import PromotionSection from '@/components/PromotionSection.vue'

/* ========= Helper: double RAF ========= */
const nextFrame = () =>
  new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

/* ===== Router ===== */
const router = useRouter()

/* ===== Top hero slider (FADE) ===== */
import img1 from '@/assets/macau-slider-1.jpeg'
import img2 from '@/assets/macau-slider-2.jpeg'
import img3 from '@/assets/macau-slider-3.jpeg'
import img4 from '@/assets/macau-slider-4.jpeg'
import img5 from '@/assets/macau-slider-5.jpeg'

const images = [img1, img2, img3, img4, img5]

/** start at first slide (no clones in fade mode) */
const displayedHeroIndex = ref(0)

/** track style in fade mode (no transform/transition) */
const heroStyle = computed(() => ({}))

/** next/prev/goTo with wrap */
const nextHero = () => {
  if (!images.length) return
  displayedHeroIndex.value = (displayedHeroIndex.value + 1) % images.length
}
const prevHero = () => {
  if (!images.length) return
  displayedHeroIndex.value =
    (displayedHeroIndex.value - 1 + images.length) % images.length
}
const goToHero = (i) => {
  if (!images.length) return
  displayedHeroIndex.value = ((i % images.length) + images.length) % images.length
}

/** autoplay */
let heroTimer = null
const HERO_INTERVAL = 4000
const autoNextHero = () => nextHero()
const play  = () => { stop(); if (images.length > 1) heroTimer = setInterval(autoNextHero, HERO_INTERVAL) }
const pause = () => { stop() }
const stop  = () => { if (heroTimer) { clearInterval(heroTimer); heroTimer = null } }

/** dragging disabled for fade (no-op handlers kept for compatibility) */
const heroDragging = ref(false)
const heroTrack = ref(null)
const onHeroPointerDown = () => {}
const onHeroPointerMove = () => {}
const onHeroPointerUp   = () => {}

/* ===== Ticker props/state ===== */
const props = defineProps({
  text: { type: String, default: 'ยินดีต้อนรับเข้าสู่ 🐉MACAU888🐉 เว็บคาสิโนอันดับ 1 ในไทย🥇  ฝากถอนไม่เกิน 3 วินาที   พนันบอล⚽️ บาคาร่า🎲  สล็อตยิงปลา🎰 เดิมพันครบวงจรตลอด 24 ชั่วโมง 🚀CASINO ONLINE เว็บตรง ไม่ผ่านเอเย่นต์ รวบรวมเกมคาสิโนยอดนิยมที่มีให้เล่นกันในบ่อนคาสิโนต่างประเทศ สามารถเข้าเล่นได้ง่ายๆผ่านเว็บไซต์ของเรา MACAU888' },
  speed: { type: Number, default: 60 },
  width:  { type: Number, default: 940 }
})
const paused = ref(false)

/* ===== 2-up poster slider (INFINITE, no-rewind) ===== */
import p1 from '@/assets/slider-img1.jpeg'
import p2 from '@/assets/slider-img2.jpeg'
import p3 from '@/assets/slider-img3.jpeg'
import p4 from '@/assets/slider-img4.jpeg'

const posters = [p1, p2, p3, p4]

const pairs = computed(() => {
  const out = []
  for (let i = 0; i < posters.length; i += 2) out.push(posters.slice(i, i + 2))
  if (posters.length % 2 === 1) {
    const last = posters[posters.length - 1]
    out[out.length - 1] = [last, posters[0]]
  }
  return out
})

const extendedPairs = computed(() => {
  if (!pairs.value.length) return []
  const real = pairs.value
  return [real[real.length - 1], ...real, real[0]]
})

/* ✅ transition toggle controlled by JS (for perfect snap) */
const pairUseTransition = ref(true)
/* start at first REAL slide (idx 1, because 0 is head clone) */
const displayedIndex = ref(1)

const pairStyle = computed(() => {
  const translateX = -displayedIndex.value * 100
  return {
    transform: 'translate3d(' + translateX + '%, 0, 0)',
    transition: pairUseTransition.value ? 'transform 0.5s ease-in-out' : 'none'
  }
})

const realIndex = computed(() => {
  const n = pairs.value.length || 1
  return (displayedIndex.value - 1 + n) % n
})

/* Guards to avoid overshoot */
const clampPair = (v) => {
  const lastExt = (extendedPairs.value.length || 1) - 1
  if (v < 0) return 0
  if (v > lastExt) return lastExt
  return v
}

/* Auto-play */
let pairTimer = null
const pairIntervalMs = 4000
const nextPair = () => { if (extendedPairs.value.length) displayedIndex.value = clampPair(displayedIndex.value + 1) }
const prevPair = () => { if (extendedPairs.value.length) displayedIndex.value = clampPair(displayedIndex.value - 1) }
const playPair = () => { stopPair(); if (extendedPairs.value.length > 1) pairTimer = setInterval(nextPair, pairIntervalMs) }
const pausePair = () => stopPair()
const stopPair  = () => { if (pairTimer) { clearInterval(pairTimer); pairTimer = null } }

/* Snap instantly to a REAL slide (no animation) */
const snapPair = async (toIdx) => {
  pairUseTransition.value = false
  displayedIndex.value = toIdx
  await nextFrame()
  pairUseTransition.value = true
}

const pairTrack = ref(null)
const onPairTransitionEnd = async (e) => {
  if (e && e.propertyName && e.propertyName !== 'transform') return
  const n = pairs.value.length
  if (!n) return
  const lastExt = extendedPairs.value.length - 1

  if (displayedIndex.value === lastExt) {
    // tail clone -> snap to first REAL
    stopPair()
    await snapPair(1)
    playPair()
  } else if (displayedIndex.value === 0) {
    // head clone -> snap to last REAL
    stopPair()
    await snapPair(n)
    playPair()
  }
}

/* Drag */
const pairDragging = ref(false)
let pairStartX = 0, pairDX = 0
const DRAG_THRESHOLD = 60

const onPairPointerDown = (e) => {
  if (!extendedPairs.value.length) return
  pairDragging.value = true
  pairStartX = e.clientX
  pairDX = 0
  pausePair()
  pairUseTransition.value = false
  const el = pairTrack.value
  if (el && e.pointerId != null && el.setPointerCapture) el.setPointerCapture(e.pointerId)
}

const onPairPointerMove  = (e) => {
  if (!pairDragging.value) return
  pairDX = e.clientX - pairStartX
  const el = pairTrack.value
  if (el) {
    const translateX = -displayedIndex.value * 100
    el.style.transform = 'translateX(calc(' + translateX + '% + ' + pairDX + 'px))'
  }
}

const onPairPointerUp = () => {
  if (!pairDragging.value) return
  pairDragging.value = false
  pairUseTransition.value = true

  if (pairDX > DRAG_THRESHOLD)      prevPair()
  else if (pairDX < -DRAG_THRESHOLD) nextPair()
  else                               displayedIndex.value = clampPair(displayedIndex.value)

  pairDX = 0
  playPair()
}

const goToPair = (i) => {
  if (!pairs.value.length) return
  pairUseTransition.value = true
  displayedIndex.value = clampPair((i % pairs.value.length) + 1)
  playPair()
}

/* ===== Feature Tabs (below image-slider) ===== */
import icHistory from '@/assets/ic-history.png'
import icFriend from '@/assets/ic-friend.png'          // Affiliate
import icAccount from '@/assets/ic-accountinfo.png'
import icSpin from '@/assets/ic-spin.png'              // Lucky wheel
import icPromo from '@/assets/ic-promotion.png'
import icSlot from '@/assets/ic-slot.png'
import icCasino from '@/assets/ic-casino.png'
import icAllGames from '@/assets/ic-all-games.png'
import icSport from '@/assets/ic-sport.png'
import icLotto from '@/assets/ic-lotto.png'

const hubTabs = [
  { key: 'history',    labelKey: 'tabs.history',    icon: icHistory },
  { key: 'affiliate',  labelKey: 'tabs.affiliate',  icon: icFriend  },
  { key: 'account',    labelKey: 'tabs.account',    icon: icAccount },
  { key: 'lucky',      labelKey: 'tabs.lucky',      icon: icSpin    },
  { key: 'promo',      labelKey: 'tabs.promotions', icon: icPromo   },
  { key: 'slot',       labelKey: 'tabs.slot',       icon: icSlot    },
  { key: 'casino',     labelKey: 'tabs.casino',     icon: icCasino  },
  { key: 'allgames',   labelKey: 'tabs.allgames',   icon: icAllGames},
  { key: 'sports',     labelKey: 'tabs.sports',     icon: icSport   },
  { key: 'lotto',      labelKey: 'tabs.lotto',      icon: icLotto   },
]

const activeHub = ref('slot')

const currentLocale = computed(() => {
  return getCurrentLocale(router.currentRoute.value) || 'th'
})

const selectHub = (key) => { 
  if (key === 'history' || key === 'account' || key === 'lucky') {
    const loginPath = localePath('/login', currentLocale.value)
    router.push(loginPath)
    return
  }
  if (key === 'affiliate') {
    const affiliatePath = localePath('/affiliate', currentLocale.value)
    router.push(affiliatePath)
    return
  }
  if (key === 'promo') {
    const promotionsPath = localePath('/promotions', currentLocale.value)
    router.push(promotionsPath)
    return
  }
  activeHub.value = key 
}

const activeLabel = computed(() => {
  const found = hubTabs.find(ti => ti.key === activeHub.value)
  return found ? t(found.labelKey) : ''
})

/* Keyboard navigation (← →) */
const onHubKeydown = (e) => {
  const i = hubTabs.findIndex(ti => ti.key === activeHub.value)
  if (e.key === 'ArrowRight') {
    selectHub(hubTabs[(i + 1) % hubTabs.length].key)
    e.preventDefault()
  } else if (e.key === 'ArrowLeft') {
    selectHub(hubTabs[(i - 1 + hubTabs.length) % hubTabs.length].key)
    e.preventDefault()
  }
}

/* Handle provider selection from tab components */
const handleProviderSelected = (provider) => {
  console.log('Provider selected in main component:', provider)
}

/* ===== Lifecycle ===== */
onMounted(() => {
  displayedHeroIndex.value = 0
  play()

  displayedIndex.value = 1
  playPair()
})

onBeforeUnmount(() => {
  stop()
  stopPair()
})
</script>

<style scoped>
* { box-sizing: border-box; }

/* MAIN CONTAINER: Fixed 980px width on desktop, full width on mobile */
.app-container { 
  background: #100201; 
  width: 980px; 
  margin: 0 auto;
  max-width: 100%;
}

/* Mobile responsive: Full width with minimal padding */
@media (max-width: 980px) {
  .app-container { 
    width: 100%; 
    padding: 0;
  }
}

@media (max-width: 480px) {
  .app-container { 
    padding: 0;
  }
}

/* ALL CHILD ELEMENTS: Use 100% width within container */
.hero-section { 
  position: relative; 
  overflow: hidden; 
  padding: 12px; 
  width: 100%;
}

@media (max-width: 480px) {
  .hero-section { 
    padding: 8px 4px;
  }
}

.hero-bg-gradient { 
  position: absolute; 
  inset: 0; 
  background: #100201; 
}

/* Slider: 100% width within container */
.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
  margin: 0 auto;
}

.slide-box {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 5;
  background: #100201;
}

@media (max-width: 480px) {
  .slide-box {
    aspect-ratio: 16 / 6;
  }
}

.slide-box img { 
  width: 100%; 
  height: 100%; 
  display: block; 
  object-fit: cover; 
  user-select: none; 
  -webkit-user-drag: none; 
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  width: 100%;
}

.slider-track.dragging { cursor: grabbing; }
.slide { min-width: 100%; }

/* Arrows */
.nav-btn {
  position: absolute; 
  top: 50%; 
  transform: translateY(-50%);
  background: none; 
  border: none; 
  color: #fff;
  font-size: 24px; 
  padding: 8px 10px; 
  line-height: 1; 
  cursor: pointer; 
  z-index: 2;
}
.nav-btn.left { left: 10px; }
.nav-btn.right { right: 10px; }

@media (max-width: 480px) {
  .nav-btn {
    font-size: 18px;
    padding: 6px 8px;
  }
  .nav-btn.left { left: 5px; }
  .nav-btn.right { right: 5px; }
}

/* Video Section: 100% width */
.video-section { 
  padding: 0 12px 12px 12px; 
  display: flex; 
  justify-content: center; 
  width: 100%;
}

@media (max-width: 480px) {
  .video-section { 
    padding: 8px 4px;
  }
}

.video-frame {
  width: 100%;
  border-radius: 6px; 
  overflow: hidden; 
  background: #0b0b0b;
  position: relative; 
  aspect-ratio: 16 / 9;
}

.video-frame::before { 
  content: ""; 
  display: block; 
  padding-top: 56.25%; 
}

.video-frame iframe { 
  position: absolute; 
  inset: 0; 
  width: 100%; 
  height: 100%; 
  display: block; 
}

/* Ticker: 100% width */
.ticker-wrap { 
  display: flex; 
  justify-content: center; 
  background: #100201; 
  width: 100%;
  margin: 0 auto; 
  padding: 0 12px;
}

@media (max-width: 980px) {
  .ticker-wrap {
    width: 100%;
    padding: 0 8px;
  }
}

@media (max-width: 480px) {
  .ticker-wrap {
    padding: 0 4px;
  }
}

.ticker {
  width: 100%;
  position: relative; 
  border-radius: 6px; 
  border: 1px solid #fee307;
  overflow: hidden; 
  background: linear-gradient(to bottom, #a20313, #72000e);
}

.ticker::before { 
  content: ""; 
  position: absolute; 
  inset: 3px; 
  border-radius: 6px; 
  z-index: 0; 
}

.ticker-track {
  position: relative; 
  display: inline-flex; 
  gap: 2rem; 
  align-items: center;
  white-space: nowrap; 
  padding: 8px 16px; 
  min-height: 40px; 
  border-radius: 6px; 
  z-index: 1;
  width: max-content; 
  animation: ticker-scroll var(--speed, 20s) linear infinite; 
  will-change: transform;
}

.ticker-track.paused { animation-play-state: paused; }

.ticker-item { 
  display: inline-block; 
  color: #fff; 
  font-weight: 400; 
  letter-spacing: .2px; 
  font-size: 15px; 
}

@media (max-width: 480px) {
  .ticker-item { font-size: 13px; }
  .ticker-track { padding: 6px 12px; min-height: 36px; }
}

@keyframes ticker-scroll { 
  from { transform: translateX(0); } 
  to { transform: translateX(-33.3333%); } 
}

/* Image Slider Section: 100% width */
.image-slider { 
  padding: 0 12px; 
  width: 100%;
}

@media (max-width: 480px) {
  .image-slider { 
    padding: 8px 4px;
  }
}

.macau-gif {
  width: 100%;
  display: block; 
  border-radius: 6px; 
  padding: 10px 0;
}

@media (max-width: 980px) {
  .image-slider { padding: 12px 4px; }
  .macau-gif { padding: 8px 0; }
}

@media (max-width: 480px) {
  .macau-gif { padding: 6px 0; }
}

/* 2-up Container: 100% width */
.two-up-container {
  position: relative; 
  width: 100%;
  margin: 0 auto; 
  overflow: hidden; 
  border-radius: 6px;
}

.two-up-track {
  display: flex; 
  transition: transform .5s ease-in-out; 
  will-change: transform;
  touch-action: pan-y; 
  cursor: grab; 
  user-select: none;
  width: 100%;
}

.two-up-track.dragging { cursor: grabbing; }

.pair {
  min-width: 100%; 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 12px; 
  background: transparent; 
  padding: 0;
}

@media (max-width: 480px) {
  .pair { 
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}

.poster { 
  background: #0b0b0b; 
  border-radius: 6px; 
  overflow: hidden; 
  width: 100%;
}

.poster img { 
  width: 100%; 
  height: 100%; 
  display: block; 
  object-fit: cover; 
  aspect-ratio: 1 / 1; 
  user-select: none; 
  -webkit-user-drag: none; 
}

/* Indicators container */
.two-up-indicators {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 3;
  pointer-events: auto;
}

@media (max-width: 480px) {
  .two-up-indicators {
    gap: 12px;
    bottom: 6px;
  }
}

/* Each bar */
.bar-dot {
  width: 50px;
  height: 8px;
  border-radius: 2px;
  border: none;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 0 0 1px rgba(0,0,0,.25) inset;
  cursor: pointer;
  padding: 0;
  transition: transform .15s ease, opacity .15s ease, background-color .2s ease;
  opacity: .85;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .bar-dot {
    -webkit-tap-highlight-color: rgba(255, 216, 74, 0.3);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .bar-dot:hover { 
    transform: scale(1.04); 
    opacity: 1; 
  }
}

/* Active = gold/yellow */
.bar-dot.active {
  background: linear-gradient(180deg, #FFD84A, #E2B300);
  box-shadow: 0 0 0 1px rgba(0,0,0,.25) inset, 0 1px 4px rgba(0,0,0,.25);
  opacity: 1;
}

@media (max-width: 480px) {
  .bar-dot { 
    width: 32px; 
    height: 6px; 
  }
}

/* Feature Tabs Section: 100% width */
.hub-tabs { 
  padding: 70px 12px ;
  width: 100%;
}

@media (max-width: 480px) {
  .hub-tabs { 
    padding: 15px 4px 0;
  }
}

.hub-grid {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: 30px;
  gap: 80px 14px;
}

@media (max-width: 480px) {
  .hub-grid { 
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 6px;
    padding-bottom: 20px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .hub-grid { 
    grid-template-columns: repeat(4, 1fr);
    gap: 60px 10px;
    padding: 0 8px 30px;
  }
}

@media (min-width: 769px) and (max-width: 980px) {
  .hub-grid { 
    grid-template-columns: repeat(5, 1fr);
    gap: 70px 12px;
    padding: 0 8px 30px;
  }
}

.hub-tile {
  --tile-icon-size: 120px;
  --icon-protrude: -40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-height: 140px;
  padding: 20px 12px 16px;
  border-radius: 16px;
  background: linear-gradient(to bottom, #a20313, #72000e);
  border: 1px solid rgba(255, 220, 120, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 2px 8px rgba(0,0,0,0.3);
  color: #fff;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: transform .12s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
  overflow: visible;
  width: 100%;
}

@media (max-width: 480px) {
  .hub-tile { 
    --tile-icon-size: 50px;
    --icon-protrude: -15px;
    min-height: 75px;
    padding: 10px 6px 10px;
    border-radius: 8px;
    gap: 5px;
  }
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .hub-tile {
    -webkit-tap-highlight-color: rgba(215, 173, 105, 0.3);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .hub-tile:hover { 
    transform: translateY(-1px);
    background: linear-gradient(to bottom, #61460f, #e2b76d);
    color: #3b2200;
    border-color: #e3b400;
  }
}

.hub-tile:active { transform: translateY(0); }

.hub-tile:focus-visible {
  box-shadow:
    0 0 0 2px rgba(255, 216, 74, .85),
    0 2px 8px rgba(0,0,0,0.3);
}

/* Icon positioned to extend outside top of container */
.hub-icon-wrap {
  position: absolute;
  top: var(--icon-protrude);
  left: 50%;
  transform: translateX(-50%);
  width: var(--tile-icon-size);
  height: var(--tile-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  pointer-events: none;
  z-index: 2;
}

.hub-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
  will-change: transform;
}

.hub-label {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: .2px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.25);
  margin-top: auto;
  z-index: 1;
  text-align: center;
  line-height: 1.1;
}

@media (max-width: 480px) {
  .hub-label { 
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.1;
  }
  
  .hub-tile {
    min-height: 65px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .hub-label { 
    font-size: 14px;
    font-weight: 650;
  }
}

/* Subtle inner border highlight */
.hub-tile-border {
  content: "";
  position: absolute;
  inset: 3px;
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
  pointer-events: none;
}

@media (max-width: 480px) {
  .hub-tile-border {
    inset: 2px;
    border-radius: 6px;
  }
}

/* Active (gold) */
.hub-tile[aria-selected="true"] {
  background: linear-gradient(to bottom, #61460f, #e2b76d);
  color: #3b2200;
  border-color: #e3b400;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.35),
    0 6px 14px rgba(0,0,0,0.35);
  --icon-protrude: -45px;
}

@media (max-width: 480px) {
  .hub-tile[aria-selected="true"] {
    --icon-protrude: -20px;
  }
}

/* Float only when active */
.hub-tile[aria-selected="true"] .hub-icon {
  animation: hub-float 2.8s ease-in-out infinite;
}

@keyframes hub-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

@media (max-width: 480px) {
  @keyframes hub-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-4px); }
  }
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  .hub-tile[aria-selected="true"] .hub-icon { animation: none; }
}

/* Panel below grid: 100% width */
.hub-panel {
  margin: 14px auto 0;
  background: #0b0b0b;
  padding: 0;
  color: #e8e8e8;
  width: 100%;
}

@media (max-width: 980px) {
  .hub-panel {
    margin: 14px 0 0;
    padding: 0 8px;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .hub-panel {
    margin: 10px 0 0;
    padding: 0 4px;
  }
}

/* ====== HERO FADE MODE OVERRIDES ====== */
/* Make the hero track a stacked, aspect-box container */
.hero-section .slider-track {
  position: relative;
  display: block;
  transform: none !important;
  transition: none !important;
  aspect-ratio: 16 / 5;
}

/* Mobile aspect ratio */
@media (max-width: 480px) {
  .hero-section .slider-track {
    aspect-ratio: 16 / 6;
  }
}

/* Stack slides absolutely and cross-fade */
.hero-section .slide {
  position: absolute;
  inset: 0;
  min-width: 0; /* override old min-width */
  opacity: 0;
  pointer-events: none;
  transition: opacity .6s cubic-bezier(.22,.61,.36,1);
}

.hero-section .slide.is-active {
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}

/* Fill the track (track owns height now) */
.hero-section .slide-box {
  width: 100%;
  height: 100%;
  aspect-ratio: auto; /* override old aspect-ratio on slide-box */
}
</style>
