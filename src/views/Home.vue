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
          :style="{
            transform: heroTransform,
            transition: useHeroTransition ? 'transform 0.5s ease-in-out' : 'none'
          }"
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
          :style="{
            transform: translateXLoop,
            transition: useTransition ? '' : 'none'
          }"
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
          <!-- ⬇️ NEW: fixed-height wrapper prevents layout shift -->
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
        <!-- Replace with real components/content per tab -->
        <h3 class="hub-panel-title">{{ activeLabel }}</h3>
        <p class="hub-panel-text">
          {{ hubContentText }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import macauGif from '@/assets/macau-gif1.gif'

/* ========= Helper: double RAF to guarantee style commit ========= */
const nextFrame = () =>
  new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

/* ===== Top hero slider (INFINITE, no-rewind) ===== */
import img1 from '@/assets/macau-slider-1.jpeg'
import img2 from '@/assets/macau-slider-2.jpeg'
import img3 from '@/assets/macau-slider-3.jpeg'
import img4 from '@/assets/macau-slider-4.jpeg'
import img5 from '@/assets/macau-slider-5.jpeg'

const images = [img1, img2, img3, img4, img5]

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
  { key: 'sport',      label: 'Sport',        icon: icSport },
  { key: 'lotto',      label: 'Lotto',        icon: icLotto },
]

const activeHub = ref('account')

const selectHub = (key) => { activeHub.value = key }

const activeLabel = computed(() => {
  return hubTabs.find(t => t.key === activeHub.value)?.label ?? ''
})

/* Simple placeholder text per tab — replace with real content/components */
const hubTexts = {
  history:   'Your recent bets and transactions.',
  affiliate: 'Invite friends and track commissions.',
  account:   'Profile, balance, and settings.',
  lucky:     'Spin the wheel for rewards.',
  promo:     'Claim current promotions and bonuses.',
  slot:      'Top slot providers and games.',
  casino:    'Live casino tables and providers.',
  allgames:  'Browse all available games.',
  sport:     'Sportsbook, odds, and live matches.',
  lotto:     'Lottery tickets and results.',
}
const hubContentText = computed(() => hubTexts[activeHub.value] ?? '')

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

/** 扩展数组：前后各克隆一张，用于无缝循环 */
const extendedImages = computed(() => {
  const n = images.length
  if (n <= 1) return images
  return [images[n - 1], ...images, images[0]]
})

/** 从第 1 个“真实位”开始（索引 1，因为 0 是头部克隆） */
const displayedHeroIndex = ref(images.length > 1 ? 1 : 0)
const useHeroTransition = ref(true)
const isHeroAnimating = ref(false) // 防止连点/连滑期间越界

/** 供模板绑定（用 translate3d 更流畅） */
const heroTransform = computed(() => `translate3d(-${displayedHeroIndex.value * 100}%, 0, 0)`)

/** 将带克隆的索引转回真实索引 0..n-1（用于 dots） */
const realHeroIndex = computed(() => {
  const n = images.length || 1
  if (n === 1) return 0
  return (displayedHeroIndex.value - 1 + n) % n
})

/** Autoplay */
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
  if (isHeroAnimating.value) return
  useHeroTransition.value = true
  isHeroAnimating.value = true
  displayedHeroIndex.value = clampToExtRange(displayedHeroIndex.value + 1)
}

const prevHero = () => {
  if (extendedImages.value.length <= 1) return
  if (isHeroAnimating.value) return
  useHeroTransition.value = true
  isHeroAnimating.value = true
  displayedHeroIndex.value = clampToExtRange(displayedHeroIndex.value - 1)
}

const goToHero = (i) => {
  if (!images.length) return
  if (isHeroAnimating.value) return
  useHeroTransition.value = true
  isHeroAnimating.value = true
  displayedHeroIndex.value = clampToExtRange((i % images.length) + 1) // 偏移 +1，避开头部克隆
  play()
}

const play = () => { stop(); if (images.length > 1) heroTimer = setInterval(nextHero, HERO_INTERVAL) }
const pause = () => stop()
const stop  = () => { if (heroTimer) { clearInterval(heroTimer); heroTimer = null } }

/** 初始定位到第一张真实图 */
onMounted(() => { displayedHeroIndex.value = images.length > 1 ? 1 : 0; play() })
onBeforeUnmount(stop)

/** 落在克隆位时静默跳位（nextTick + double RAF，确保 transition:none 已生效） */
const heroTrack = ref(null)
const onHeroTransitionEnd = async (e) => {
  // 只处理 transform 的过渡结束
  if (e && e.propertyName && e.propertyName !== 'transform') return

  isHeroAnimating.value = false

  const n = images.length
  if (n <= 1) return
  const lastExt = extendedImages.value.length - 1

  if (displayedHeroIndex.value === lastExt) {
    // 尾部克隆 -> 跳第一张真实图
    stop()
    useHeroTransition.value = false          // 1) 关闭过渡
    await nextTick()
    await nextFrame()                        // 2) 确保 'none' 已提交
    displayedHeroIndex.value = 1             // 3) 瞬移到真实位
    await nextTick()
    await nextFrame()                        // 4) 确保 transform 已无动画应用
    useHeroTransition.value = true           // 5) 恢复过渡
    play()
  } else if (displayedHeroIndex.value === 0) {
    // 头部克隆 -> 跳最后一张真实图
    stop()
    useHeroTransition.value = false
    await nextTick()
    await nextFrame()
    displayedHeroIndex.value = n
    await nextTick()
    await nextFrame()
    useHeroTransition.value = true
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
  // 取消当前动画，避免 transitionend 晚到导致越界
  isHeroAnimating.value = false
  useHeroTransition.value = false
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
    el.style.transform = `translate3d(calc(-${displayedHeroIndex.value * 100}% + ${heroDX}px), 0, 0)`
  }
}

const onHeroPointerUp = () => {
  if (!heroDragging.value) return
  heroDragging.value = false
  useHeroTransition.value = true
  const el = heroTrack.value
  if (el) el.style.transition = ''

  if (heroDX > HERO_THRESHOLD) {
    prevHero()
  } else if (heroDX < -HERO_THRESHOLD) {
    nextHero()
  } else {
    // 不够阈值，回弹
    isHeroAnimating.value = true
    // 触发一次过渡，等待 transitionend 把 isHeroAnimating 置回 false
    displayedHeroIndex.value = clampToExtRange(displayedHeroIndex.value)
  }
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
      '🐉MACAU888🐉 เว็บคาสิโนอันดับ 1 ในไทย🥇 ฝากถอนไม่เกิน 3 วินาที พนันบอล⚽️ บาคาร่า🎲 สล็อตยิงปลา🎰 เดิมพันครบวงจรตลอด 24 小时 🚀CASINO ONLINE ...'
  },
  speed: { type: Number, default: 60 },
  width:  { type: Number, default: 940 }
})
const paused = ref(false)

/* ===== 2-up poster slider — unchanged ===== */
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

const displayedIndex = ref(1)
const useTransition = ref(true)
const translateXLoop = computed(() => `translateX(-${displayedIndex.value * 100}%)`)
const realIndex = computed(() => {
  const n = pairs.value.length || 1
  return (displayedIndex.value - 1 + n) % n
})

let pairTimer = null
const pairIntervalMs = 4000
const nextPair = () => { if (extendedPairs.value.length) { useTransition.value = true; displayedIndex.value += 1 } }
const prevPair = () => { if (extendedPairs.value.length) { useTransition.value = true; displayedIndex.value -= 1 } }
const playPair = () => { stopPair(); pairTimer = setInterval(nextPair, pairIntervalMs) }
const pausePair = () => stopPair()
const stopPair  = () => { if (pairTimer) { clearInterval(pairTimer); pairTimer = null } }

onMounted(() => { displayedIndex.value = 1; playPair() })
onBeforeUnmount(stopPair)

const pairTrack = ref(null)
const onPairTransitionEnd = () => {
  const n = pairs.value.length
  if (!n) return
  const lastExt = extendedPairs.value.length - 1
  if (displayedIndex.value === lastExt) {
    useTransition.value = false
    displayedIndex.value = 1
    void pairTrack.value?.offsetHeight
    useTransition.value = true
  } else if (displayedIndex.value === 0) {
    useTransition.value = false
    displayedIndex.value = n
    void pairTrack.value?.offsetHeight
    useTransition.value = true
  }
}

const pairDragging = ref(false)
let pairStartX = 0, pairDX = 0
const DRAG_THRESHOLD = 60

const onPairPointerDown = (e) => {
  pairDragging.value = true
  pairStartX = e.clientX
  pairDX = 0
  pausePair()
  useTransition.value = false
  const el = pairTrack.value
  if (el && e.pointerId != null && el.setPointerCapture) el.setPointerCapture(e.pointerId)
  if (el) el.style.transition = 'none'
}

const onPairPointerMove  = (e) => {
  if (!pairDragging.value) return
  pairDX = e.clientX - pairStartX
  const el = pairTrack.value
  if (el) {
    el.style.transition = 'none'
    el.style.transform  = `translateX(calc(-${displayedIndex.value * 100}% + ${pairDX}px))`
  }
}

const onPairPointerUp = () => {
  if (!pairDragging.value) return
  pairDragging.value = false
  useTransition.value = true
  const el = pairTrack.value
  if (el) el.style.transition = ''

  if (pairDX > DRAG_THRESHOLD)      prevPair()
  else if (pairDX < -DRAG_THRESHOLD) nextPair()

  pairDX = 0
  playPair()
}

const goToPair = (i) => {
  if (!pairs.value.length) return
  useTransition.value = true
  displayedIndex.value = (i % pairs.value.length) + 1
  playPair()
}
</script>

<style scoped>
* { box-sizing: border-box; }
.app-container { min-height: 100vh; background:#100201; }
.hero-section { position: relative; overflow: hidden; padding: 12px; }
.hero-bg-gradient { position:absolute; inset:0; background:#100201; }

/* Slider */
.slider-container {
  position: relative;
  width: 940px;
  overflow: hidden;
  border-radius: 6px;
  margin: 0 auto;
}
.slide-box {
  width: 100%;
  height:auto;
  aspect-ratio: 16 / 5;
  background: #0b0b0b;
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

/* Section 2: Video */
.video-section { padding: 12px; display: flex; justify-content: center; }
.video-frame {
  width: 940px; max-width: 100%;
  border-radius: 6px; overflow: hidden; background: #0b0b0b;
  position: relative; aspect-ratio: 16 / 9;
}
.video-frame::before { content:""; display:block; padding-top:56.25%; }
.video-frame iframe { position:absolute; inset:0; width:100%; height:100%; display:block; }

/* Ticker */
.ticker-wrap{ display:flex; justify-content:center; background:#100201; width:940px; margin:0 auto; }
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
@keyframes ticker-scroll{ from{ transform:translateX(0); } to{ transform:translateX(-33.3333%); } }

/* GIF + 2-up slider */
.image-slider{ padding: 12px; }
.macau-gif{
  width:100%; max-width:940px; display:block; margin:0 auto 12px auto; border-radius:6px; padding:10px 0;
}

/* 2-up */
.two-up-container{
  position:relative; width:940px; max-width:100%; margin:0 auto; overflow:hidden; border-radius:6px;
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

@media (max-width: 560px){
  .pair{ grid-template-columns: 1fr; }
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

/* optional: larger on touch screens */
@media (max-width: 560px){
  .bar-dot{ width: 32px; height: 7px; }
}

/* =========================================================
   Feature Tabs (icons raised; float only when active)
   ========================================================= */
.hub-tabs{ padding: 12px; }

.hub-grid{
  width: 940px;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.hub-tile{
  --tile-icon-size: 120px;   /* icon size (tweak to taste) */
  --icon-offset: -16px;     /* raise icon relative to its box */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  min-height: 140px;        /* taller to visually match reference */
  padding-top: 14px;
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
  overflow: visible; /* allow icon to float above without clipping */
}
.hub-tile:hover{ transform: translateY(-1px); }
.hub-tile:active{ transform: translateY(0); }
.hub-tile:focus-visible{
  box-shadow:
    0 0 0 2px rgba(255, 216, 74, .85),
    0 2px 8px rgba(0,0,0,0.3);
}

/* Reserve vertical space so icon motion never moves layout */
.hub-icon-wrap{
  height: calc(var(--tile-icon-size) + 12px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
  pointer-events: none;
}

.hub-icon{
  width: var(--tile-icon-size);
  height: var(--tile-icon-size);
  object-fit: contain;
  transform: translateY(var(--icon-offset));
  will-change: transform;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
}

/* Label */
.hub-label{
  font-size: 20px;           /* closer to the screenshot */
  font-weight: 700;
  letter-spacing: .2px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.25);
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

/* Active (gold) */
.hub-tile[aria-selected="true"]{
  background: linear-gradient(to bottom, #61460f, #e2b76d);
  color: #3b2200; /* dark text like the reference */
  border-color: #e3b400;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.35),
    0 6px 14px rgba(0,0,0,0.35);
  /* raise just a touch more when active */
  --icon-offset: -18px;
}

/* Float only when active (no layout shift thanks to hub-icon-wrap) */
.hub-tile[aria-selected="true"] .hub-icon{
  animation: hub-float 2.8s ease-in-out infinite;
}

@keyframes hub-float{
  0%, 100% { transform: translateY(calc(var(--icon-offset))); }
  50%      { transform: translateY(calc(var(--icon-offset) - 6px)); }
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce){
  .hub-tile[aria-selected="true"] .hub-icon{ animation: none; }
}

/* Panel below grid */
.hub-panel{
  width: 940px;
  max-width: 100%;
  margin: 14px auto 0;
  background: #0b0b0b;
  border: 1px solid rgba(255, 220, 120, 0.25);
  border-radius: 12px;
  padding: 16px;
  color: #e8e8e8;
}
.hub-panel-title{
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 700;
  color: #FFD84A;
}
.hub-panel-text{ margin: 0; font-size: 14px; line-height: 1.55; }

/* Responsive columns */
@media (max-width: 900px){
  .hub-grid{ grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 700px){
  .hub-grid{ grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 480px){
  .hub-grid{ grid-template-columns: repeat(2, 1fr); }
  .hub-tile{ --tile-icon-size: 95px; min-height: 130px; }
  .hub-label{ font-size: 18px; }
}
</style>
