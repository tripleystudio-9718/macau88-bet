<template>
  <div class="app-container">
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-bg-gradient"></div>

      <!-- SLIDER (infinite, no rewind) -->
      <div
        class="slider-container"
        @mouseenter="pause"
        @mouseleave="play"
        tabindex="0"
      >
        <!-- Track -->
        <div
          class="slider-track"
          :class="{ dragging: heroDragging }"
          :style="heroStyle"
          ref="heroTrack"
          @transitionend="onHeroTransitionEnd"
          @pointerdown="onHeroPointerDown"
          @pointermove="onHeroPointerMove"
          @pointerup="onHeroPointerUp"
          @pointercancel="onHeroPointerUp"
          @pointerleave="onHeroPointerUp"
        >
          <!-- 使用扩展数组（首尾各有克隆） -->
          <div v-for="(image, i) in extendedImages" :key="'h-' + i" class="slide">
            <div class="slide-box">
              <img :src="image" :alt="`Slide ${i + 1}`" draggable="false" />
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <button class="nav-btn left" @click="prevHero" aria-label="Previous">❮</button>
        <button class="nav-btn right" @click="nextHero" aria-label="Next">❯</button>

        <!-- Dots（对齐真实索引） -->
        <div class="dots">
          <span
            v-for="(img, i) in images"
            :key="'dot-' + i"
            :class="{ active: i === realHeroIndex }"
            @click="goToHero(i)"
            aria-label="Go to slide"
          />
        </div>
      </div>
    </section>

    <!-- Section 2: Video -->
    <section class="video-section">
      <div class="video-frame">
        <iframe
          src="https://streamable.com/e/rb6rlj?autoplay=0&muted=0&loop=0&controls=1"
          title="Promo video"
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
      <img :src="macauGif" alt="Macau GIF" class="macau-gif" />

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
              <img :src="src" :alt="`Poster ${p*2 + i + 1}`" draggable="false" />
            </div>
          </div>
        </div>

        <!-- indicators (bars) reflect real slides -->
        <div class="two-up-indicators" role="tablist" aria-label="Posters carousel">
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
          v-for="(t, idx) in hubTabs"
          :key="t.key"
          class="hub-tile"
          role="tab"
          :id="`tab-${t.key}`"
          :aria-selected="t.key === activeHub"
          :tabindex="t.key === activeHub ? 0 : -1"
          @click="selectHub(t.key)"
        >
          <!-- ⬇️ MODIFIED: Icon positioned to extend half outside container -->
          <span class="hub-icon-wrap">
            <img class="hub-icon" :src="t.icon" :alt="t.label" draggable="false" />
          </span>

          <span class="hub-label">{{ t.label }}</span>
          <span class="hub-tile-border" aria-hidden="true"></span>
        </button>
      </div>

      <!-- Panel -->
      <div
        class="hub-panel"
        role="tabpanel"
        :aria-labelledby="`tab-${activeHub}`"
      >
        <!-- Show component tabs only (no default text) -->
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
        <!-- No default content for other tabs -->
      </div>
    </section>

    <PromotionSection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

/* assets & components */
import macauGif from '@/assets/macau-gif1.gif'
import SlotTab from '@/components/SlotTab.vue'
import CasinoTab from '@/components/CasinoTab.vue'
import AllTab from '@/components/AllTab.vue'
import SportsTab from '@/components/SportsTab.vue'
import LottoTab from '@/components/LottoTab.vue'
import PromotionSection from '@/components/PromotionSection.vue'

/* ========= Helper: double RAF to guarantee style commit ========= */
const nextFrame = () =>
  new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

/* ===== Router ===== */
const router = useRouter()

/* ===== Top hero slider (INFINITE, no-rewind) ===== */
import img1 from '@/assets/macau-slider-1.jpeg'
import img2 from '@/assets/macau-slider-2.jpeg'
import img3 from '@/assets/macau-slider-3.jpeg'
import img4 from '@/assets/macau-slider-4.jpeg'
import img5 from '@/assets/macau-slider-5.jpeg'

const images = [img1, img2, img3, img4, img5]

/** 扩展数组：前后各克隆一张，用于无缝循环 */
const extendedImages = computed(() => {
  const n = images.length
  if (n <= 1) return images
  return [images[n - 1], ...images, images[0]]
})

/** 从第 1 个"真实位"开始（索引 1，因为 0 是头部克隆） */
const displayedHeroIndex = ref(images.length > 1 ? 1 : 0)

const heroStyle = computed(() => {
  const translateX = -displayedHeroIndex.value * 100
  return {
    transform: 'translate3d(' + translateX + '%, 0, 0)',
    transition: 'transform 0.5s ease-in-out'
  }
})

/** 将带克隆的索引转回真实索引 0..n-1（用于 dots） */
const realHeroIndex = computed(() => {
  const n = images.length || 1
  if (n === 1) return 0
  return (displayedHeroIndex.value - 1 + n) % n
})

let heroTimer = null
const HERO_INTERVAL = 4000

const clampToExtRange = (v) => {
  const lastExt = (extendedImages.value.length || 1) - 1
  if (v < 0) return 0
  if (v > lastExt) return lastExt
  return v
}

const nextHero = () => {
  if (extendedImages.value.length <= 1) return
  displayedHeroIndex.value = clampToExtRange(displayedHeroIndex.value + 1)
}
const prevHero = () => {
  if (extendedImages.value.length <= 1) return
  displayedHeroIndex.value = clampToExtRange(displayedHeroIndex.value - 1)
}
const goToHero = (i) => {
  if (!images.length) return
  displayedHeroIndex.value = clampToExtRange((i % images.length) + 1)
  play()
}
const play = () => { stop(); if (images.length > 1) heroTimer = setInterval(nextHero, HERO_INTERVAL) }
const pause = () => { stop() }
const stop  = () => { if (heroTimer) { clearInterval(heroTimer); heroTimer = null } }

const heroTrack = ref(null)
const onHeroTransitionEnd = async (e) => {
  if (e && e.propertyName && e.propertyName !== 'transform') return
  const n = images.length
  if (n <= 1) return
  const lastExt = extendedImages.value.length - 1

  if (displayedHeroIndex.value === lastExt) {
    stop()
    displayedHeroIndex.value = 1
    play()
  } else if (displayedHeroIndex.value === 0) {
    stop()
    displayedHeroIndex.value = n
    play()
  }
}

/** 手势拖动（桌面/触屏） */
const heroDragging = ref(false)
let heroStartX = 0
let heroDX = 0
const HERO_THRESHOLD = 60

const onHeroPointerDown = (e) => {
  if (images.length <= 1) return
  heroDragging.value = true
  heroStartX = e.clientX
  heroDX = 0
  pause()
  const el = heroTrack.value
  if (el && e.pointerId != null && el.setPointerCapture) el.setPointerCapture(e.pointerId)
  if (el) el.style.transition = 'none'
}
const onHeroPointerMove = (e) => {
  if (!heroDragging.value) return
  heroDX = e.clientX - heroStartX
  const el = heroTrack.value
  if (el) {
    el.style.transition = 'none'
    const translateX = -displayedHeroIndex.value * 100
    el.style.transform = 'translate3d(calc(' + translateX + '% + ' + heroDX + 'px), 0, 0)'
  }
}
const onHeroPointerUp = () => {
  if (!heroDragging.value) return
  heroDragging.value = false
  const el = heroTrack.value
  if (el) el.style.transition = ''

  if (heroDX > HERO_THRESHOLD)      prevHero()
  else if (heroDX < -HERO_THRESHOLD) nextHero()
  else                                displayedHeroIndex.value = clampToExtRange(displayedHeroIndex.value)

  heroDX = 0
  play()
}

/* —— 别名，若模板仍用 @click="prev/next/goTo" —— */
const next = nextHero
const prev = prevHero
const goTo = goToHero

/* ===== Ticker props/state ===== */
const { text, speed, width } = defineProps({
  text: {
    type: String,
    default:
      'ยินดีต้อนรับเข้าสู่ 🐉MACAU888🐉 เว็บคาสิโนอันดับ 1 ในไทย🥇  ฝากถอนไม่เกิน 3 วินาที   พนันบอล⚽️ บาคาร่า🎲  สล็อตยิงปลา🎰 เดิมพันครบวงจรตลอด 24 ชั่วโมง 🚀CASINO ONLINE เว็บตรง ไม่ผ่านเอเย่นต์ รวบรวมเกมคาสิโนยอดนิยมที่มีให้เล่นกันในบ่อนคาสิโนต่างประเทศ สามารถเข้าเล่นได้ง่ายๆผ่านเว็บไซต์ของเรา MACAU888'
  },
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
  { key: 'history',    label: 'History',      icon: icHistory },
  { key: 'affiliate',  label: 'Affiliate',    icon: icFriend },
  { key: 'account',    label: 'Account info', icon: icAccount }, // default active (gold in screenshot)
  { key: 'lucky',      label: 'Lucky wheel',  icon: icSpin },
  { key: 'promo',      label: 'Promotions',   icon: icPromo },
  { key: 'slot',       label: 'Slot',         icon: icSlot },
  { key: 'casino',     label: 'Casino',       icon: icCasino },
  { key: 'allgames',   label: 'All games',    icon: icAllGames },
  { key: 'sports',     label: 'Sport',        icon: icSport },
  { key: 'lotto',      label: 'Lotto',        icon: icLotto },
]

const activeHub = ref('slot')

const selectHub = (key) => { 
  // Handle navigation for specific tabs
  if (key === 'affiliate') {
    router.push('/affiliate')
    return
  }
  if (key === 'promo') {
    router.push('/promotions')
    return
  }
  // For other tabs, just set active
  activeHub.value = key 
}

const activeLabel = computed(() => {
  return hubTabs.find(t => t.key === activeHub.value)?.label ?? ''
})

/* Keyboard navigation (← →) */
const onHubKeydown = (e) => {
  const i = hubTabs.findIndex(t => t.key === activeHub.value)
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
  // place your provider navigation/update logic here
}

/* ===== Lifecycle ===== */
onMounted(() => {
  displayedHeroIndex.value = images.length > 1 ? 1 : 0
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
.app-container { 
  background:#100201; 
  width: 980px; 
  margin: 0 auto;
  max-width: 100%;
}

/* Mobile-first responsive design */
@media (max-width: 980px) {
  .app-container { 
    width: 100%; 
    padding: 0 12px; /* Standardized to 12px horizontal padding */
  }
}

.hero-section { position: relative; overflow: hidden; padding: 12px; }
.hero-bg-gradient { position:absolute; inset:0; background:#100201; }

/* Slider */
.slider-container {
  position: relative;
  width: 880px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 6px;
  margin: 0 auto;
}

@media (max-width: 980px) {
  .slider-container {
    width: 100%;
  }
}

.slide-box {
  width: 100%;
  height:auto;
  aspect-ratio: 16 / 5;
  background: #100201;
}

@media (max-width: 480px) {
  .slide-box {
    aspect-ratio: 16 / 6; /* Slightly taller on mobile */
  }
}

.slide-box img { width: 100%; height: 100%; display: block; object-fit: cover; user-select:none; -webkit-user-drag:none; }
.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  touch-action: pan-y;          /* allow vertical page scroll, we handle horizontal drag */
  cursor: grab;
  user-select: none;
}
.slider-track.dragging { cursor: grabbing; }
.slide { min-width: 100%; }

/* Arrows */
.nav-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #fff;
  font-size: 24px; padding: 8px 10px; line-height: 1; cursor: pointer; z-index: 2;
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

/* Dots */
.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: background 0.3s ease;
}

.dots span.active {
  background: #FFD84A;
}

@media (max-width: 480px) {
  .dots span {
    width: 10px;
    height: 10px;
  }
  .dots {
    gap: 6px;
    bottom: 8px;
  }
}

/* Section 2: Video */
.video-section { padding: 12px; display: flex; justify-content: center; }
.video-frame {
  width: 880px; max-width: 100%;
  border-radius: 6px; overflow: hidden; background: #0b0b0b;
  position: relative; aspect-ratio: 16 / 9;
}
.video-frame::before { content:""; display:block; padding-top:56.25%; }
.video-frame iframe { position:absolute; inset:0; width:100%; height:100%; display:block; }

/* Ticker */
.ticker-wrap{ 
  display:flex; 
  justify-content:center; 
  background:#100201; 
  width:880px; 
  max-width: 100%;
  margin:0 auto; 
}

@media (max-width: 980px) {
  .ticker-wrap {
    width: 100%;
    padding: 0 12px; /* Changed from 8px to 12px for consistency */
  }
}

.ticker{
  width:100%; max-width: v-bind(width + 'px');
  position:relative; border-radius:6px; border:1px solid #fee307;
  overflow:hidden; background: linear-gradient(to bottom, #a20313, #72000e);
}
.ticker::before{ content:""; position:absolute; inset:3px; border-radius:6px; z-index:0; }
.ticker-track{
  position:relative; display:inline-flex; gap:2rem; align-items:center;
  white-space:nowrap; padding:8px 16px; min-height:40px; border-radius:6px; z-index:1;
  width:max-content; animation: ticker-scroll var(--speed, 20s) linear infinite; will-change: transform;
}
.ticker-track.paused{ animation-play-state: paused; }
.ticker-item{ display:inline-block; color:#fff; font-weight:400; letter-spacing:.2px; font-size:15px; }

@media (max-width: 480px) {
  .ticker-item { font-size: 13px; }
  .ticker-track { padding: 6px 12px; min-height: 36px; }
}

@keyframes ticker-scroll{ from{ transform:translateX(0); } to{ transform:translateX(-33.3333%); } }

/* GIF + 2-up slider */
.image-slider{ padding: 12px; }
.macau-gif{
  width:100%; max-width:880px; display:block; margin:0 auto 12px auto; border-radius:6px; padding:10px 0;
}

@media (max-width: 980px) {
  .image-slider { padding: 12px; } /* Changed from 8px to 12px for consistency */
  .macau-gif { padding: 8px 0; }
}

@media (max-width: 480px) {
  .app-container {
    padding: 0 12px; /* Changed from 0 to 12px horizontal padding for consistency */
  }
  
  .video-section {
    padding: 0 12px 12px 12px; /* Kept 12px horizontal padding consistent */
  }
}

/* 2-up */
.two-up-container{
  position:relative; width:880px; max-width:100%; margin:0 auto; overflow:hidden; border-radius:6px;
}

@media (max-width: 980px) {
  .two-up-container {
    width: 100%;
  }
}

.two-up-track{
  display:flex; transition: transform .5s ease-in-out; will-change: transform;
  touch-action: pan-y; cursor: grab; user-select:none;
}
.two-up-track.dragging { cursor: grabbing; }
.pair{
  min-width:100%; display:grid; grid-template-columns: 1fr 1fr; gap:12px; background:transparent; padding:0;
}
.poster{ background:#0b0b0b; border-radius:6px; overflow:hidden; }
.poster img{ width:100%; height:100%; display:block; object-fit:cover; aspect-ratio: 1 / 1; user-select:none; -webkit-user-drag:none; }

/* Mobile: Keep 2 items in row but with smaller gap */
@media (max-width: 480px) {
  .pair { 
    grid-template-columns: 1fr 1fr; /* Keep 2 columns on mobile */
    gap: 8px; /* Smaller gap */
  }
}

/* indicators container */
.two-up-indicators{
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

/* each bar */
.bar-dot{
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
.bar-dot:hover{ transform: scale(1.04); opacity: 1; }

/* active = gold/yellow */
.bar-dot.active{
  background: linear-gradient(180deg, #FFD84A, #E2B300);
  box-shadow: 0 0 0 1px rgba(0,0,0,.25) inset, 0 1px 4px rgba(0,0,0,.25);
  opacity: 1;
}

/* Mobile: smaller bars */
@media (max-width: 480px){
  .bar-dot{ width: 32px; height: 6px; }
}

/* ========================================================= */
/* Feature Tabs (MOBILE OPTIMIZED: 6 tabs in a row on mobile) */
/* ========================================================= */
.hub-tabs{ 
  padding: 60px 0 0; /* Extra top padding for protruding icons */
}

@media (max-width: 480px) {
  .hub-tabs { 
    padding: 40px 12px 0; /* Changed from 8px to 12px horizontal padding */
  }
}

.hub-grid{
  width: 880px;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: 30px;
  gap: 80px 14px; /* row-gap column-gap - larger row gap for icon spacing */
}

/* Mobile: 5 tabs in one row with smaller size */
@media (max-width: 480px) {
  .hub-grid{ 
    grid-template-columns: repeat(5, 1fr); /* 5 columns for mobile */
    gap: 35px 6px; /* Small gaps but slightly larger for 5 columns */
    padding-bottom: 20px;
  }
}

/* Tablet: 4 columns */
@media (min-width: 481px) and (max-width: 768px) {
  .hub-grid{ 
    grid-template-columns: repeat(4, 1fr);
    gap: 60px 10px;
  }
}

/* Small desktop: 5 columns */
@media (min-width: 769px) and (max-width: 980px) {
  .hub-grid{ 
    grid-template-columns: repeat(5, 1fr);
    gap: 70px 12px;
  }
}

.hub-tile{
  --tile-icon-size: 120px;   /* icon size (tweak to taste) */
  --icon-protrude: -40px;   /* Half the icon extends outside */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;  /* Push content to bottom */
  gap: 10px;
  min-height: 140px;        /* taller to visually match reference */
  padding: 20px 12px 16px;  /* More top padding */
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
  overflow: visible; /* Critical - allow icon to extend outside */
}

/* Mobile: Much smaller tiles to fit 5 in a row */
@media (max-width: 480px) {
  .app-container {
    padding: 0;
  }
  
  .video-section {
    padding: 0 12px 12px 12px;
  }

  .hub-tile{ 
    --tile-icon-size: 50px; /* Slightly larger icons for 5 columns */
    --icon-protrude: -20px; /* Adjusted protrusion */
    min-height: 75px; /* Slightly taller */
    padding: 10px 6px 10px; /* Bit more padding */
    border-radius: 8px; /* Smaller border radius */
    gap: 5px; /* Slightly larger gap */
  }
}

.hub-tile:hover{ 
  transform: translateY(-1px);
  background: linear-gradient(to bottom, #61460f, #e2b76d); /* Same gold color as active */
  color: #3b2200; /* Dark text like active state */
  border-color: #e3b400; /* Gold border like active */
}
.hub-tile:active{ transform: translateY(0); }
.hub-tile:focus-visible{
  box-shadow:
    0 0 0 2px rgba(255, 216, 74, .85),
    0 2px 8px rgba(0,0,0,0.3);
}

/* Icon positioned to extend outside top of container */
.hub-icon-wrap{
  position: absolute;           /* Use absolute positioning */
  top: var(--icon-protrude);   /* Position half outside */
  left: 50%;
  transform: translateX(-50%);
  width: var(--tile-icon-size);
  height: var(--tile-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  pointer-events: none;
  z-index: 2;                   /* Ensure proper layering */
}

.hub-icon{
  width: 100%;                  /* Fill the wrapper */
  height: 100%;                 /* Fill the wrapper */
  object-fit: contain;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
  will-change: transform;
}

/* Label positioned in the lower part of the tile */
.hub-label{
  font-size: 20px;           /* closer to the screenshot */
  font-weight: 700;
  letter-spacing: .2px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.25);
  margin-top: auto;          /* Push to bottom */
  z-index: 1;               /* Layer below icon */
  text-align: center;
  line-height: 1.1;
}

/* Mobile: Smaller text for 5 columns */
@media (max-width: 480px) {
  .hub-label{ 
    font-size: 10px; /* Slightly larger to fit 5 columns */
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.1;
  }
  
  .hub-tile {
    min-height: 65px;
  }

  .hub-panel {
    margin: 0 !important;
  }
}

/* Tablet: Medium text */
@media (min-width: 481px) and (max-width: 768px) {
  .hub-label{ 
    font-size: 14px;
    font-weight: 650;
  }
}

/* subtle inner border highlight */
.hub-tile-border{
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
.hub-tile[aria-selected="true"]{
  background: linear-gradient(to bottom, #61460f, #e2b76d);
  color: #3b2200; /* dark text like the reference */
  border-color: #e3b400;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.35),
    0 6px 14px rgba(0,0,0,0.35);
  /* More protrusion when active */
  --icon-protrude: -45px;
}

@media (max-width: 480px) {
  .hub-tile[aria-selected="true"] {
    --icon-protrude: -28px; /* Adjusted for mobile with 5 columns */
  }
}

/* Float only when active (no layout shift thanks to absolute positioning) */
.hub-tile[aria-selected="true"] .hub-icon{
  animation: hub-float 2.8s ease-in-out infinite;
}

@keyframes hub-float{
  0%, 100% { transform: translateY(0); }     /* Simplified since position is already absolute */
  50%      { transform: translateY(-8px); }  /* Float upward */
}

/* Mobile: Smaller float distance */
@media (max-width: 480px) {
  @keyframes hub-float{
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-4px); } /* Smaller float on mobile */
  }
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce){
  .hub-tile[aria-selected="true"] .hub-icon{ animation: none; }
}

/* Panel below grid */
.hub-panel{
  margin: 14px auto 0;
  background: #0b0b0b;
  padding: 0;
  color: #e8e8e8;
  max-width: 880px;
}

@media (max-width: 980px) {
  .hub-panel {
    margin: 14px 0 0; /* Remove horizontal margins that cause cutoff */
    padding: 0 12px; /* Add internal padding instead of margins */
    max-width: 100%; /* Ensure full width usage */
  }
}

@media (max-width: 480px) {
  .hub-panel {
    margin: 10px 0 0; /* Reduce top margin on small screens */
    padding: 0 8px; /* Slightly less padding on very small screens */
  }
}
</style>
