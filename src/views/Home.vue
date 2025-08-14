<template>
  <div class="app-container">
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-bg-gradient"></div>

      <!-- SLIDER -->
      <div
        class="slider-container"
        @mouseenter="pause"
        @mouseleave="play"
        tabindex="0"
      >
        <!-- Track -->
        <div
          class="slider-track"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          ref="trackEl"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div v-for="(image, i) in images" :key="i" class="slide">
            <div class="slide-box">
              <img :src="image" :alt="`Slide ${i + 1}`" />
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <button class="nav-btn left" @click="prev" aria-label="Previous">❮</button>
        <button class="nav-btn right" @click="next" aria-label="Next">❯</button>

        <!-- Dots -->
        <div class="dots">
          <span
            v-for="(img, i) in images"
            :key="i"
            :class="{ active: i === currentIndex }"
            @click="goTo(i)"
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

      <!-- 2-up slider below the GIF -->
      <div
        class="two-up-container"
        @mouseenter="pausePair()"
        @mouseleave="playPair()"
        tabindex="0"
      >
        <div
          class="two-up-track"
          :style="{ transform: `translateX(-${pairIndex * 100}%)` }"
          ref="pairTrack"
          @touchstart.passive="onPairTouchStart"
          @touchmove.passive="onPairTouchMove"
          @touchend.passive="onPairTouchEnd"
        >
          <div v-for="(pair, p) in pairs" :key="p" class="pair">
            <div v-for="(src, i) in pair" :key="i" class="poster">
              <img :src="src" :alt="`Poster ${p*2 + i + 1}`" />
            </div>
          </div>
        </div>



        <!-- indicators (bars) -->
<div class="two-up-indicators" role="tablist" aria-label="Posters carousel">
  <button
    v-for="(_, i) in pairs"
    :key="i"
    class="bar-dot"
    :class="{ active: i === pairIndex }"
    @click="goToPair(i)"
    :aria-selected="i === pairIndex"
    role="tab"
    :aria-controls="'pair-' + i"
  />
</div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import macauGif from '@/assets/macau-gif1.gif'

/* ===== Top hero slider ===== */
import img1 from '@/assets/macau-slider-1.jpeg'
import img2 from '@/assets/macau-slider-2.jpeg'
import img3 from '@/assets/macau-slider-3.jpeg'
import img4 from '@/assets/macau-slider-4.jpeg'
import img5 from '@/assets/macau-slider-5.jpeg'

const images = [img1, img2, img3, img4, img5]

const currentIndex = ref(0)
let timer = null

const next = () => { currentIndex.value = (currentIndex.value + 1) % images.length }
const prev = () => { currentIndex.value = (currentIndex.value - 1 + images.length) % images.length }
const goTo = (i) => { currentIndex.value = i }

const play = () => { stop(); timer = setInterval(next, 4000) }
const pause = () => stop()
const stop  = () => { if (timer) { clearInterval(timer); timer = null } }

let startX = 0, deltaX = 0
const onTouchStart = (e) => { startX = e.touches[0].clientX; pause() }
const onTouchMove  = (e) => { deltaX = e.touches[0].clientX - startX }
const onTouchEnd   = () => { if (deltaX > 50) prev(); else if (deltaX < -50) next(); deltaX = 0; play() }

onMounted(play)
onBeforeUnmount(stop)

/* ===== Ticker props/state ===== */
const { text, speed, width } = defineProps({
  text: {
    type: String,
    default:
      '🐉MACAU888🐉 เว็บคาสิโนอันดับ 1 ในไทย🥇 ฝากถอนไม่เกิน 3 วินาที พนันบอล⚽️ บาคาร่า🎲 สล็อตยิงปลา🎰 เดิมพันครบวงจรตลอด 24 ชั่วโมง 🚀CASINO ONLINE เว็บตรง ไม่ผ่านเอเย่นต์ รวบรวมเกมคาสิโนยอดนิยมที่มีให้เล่นกันในบ่อนคาสิโนต่างประเทศสามารถเข้าเล่นได้ง่ายๆผ่านเว็บไซต์ของเรา MACAU888 ยินดีต้อนรับเข้าสู่'
  },
  speed: { type: Number, default: 60 },
  width:  { type: Number, default: 940 }
})
const paused = ref(false)

/* ===== 2-up poster slider under GIF ===== */
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

const pairIndex = ref(0)
let pairTimer = null
const pairIntervalMs = 4000

const nextPair = () => { if (pairs.value.length) pairIndex.value = (pairIndex.value + 1) % pairs.value.length }
const prevPair = () => { if (pairs.value.length) pairIndex.value = (pairIndex.value - 1 + pairs.value.length) % pairs.value.length }

const playPair = () => { stopPair(); pairTimer = setInterval(nextPair, pairIntervalMs) }
const pausePair = () => stopPair()
const stopPair  = () => { if (pairTimer) { clearInterval(pairTimer); pairTimer = null } }

onMounted(playPair)
onBeforeUnmount(stopPair)

/* touch for 2-up slider */
const pairTrack = ref(null)
let pairStartX = 0, pairDX = 0
const onPairTouchStart = (e) => { pairStartX = e.touches[0].clientX; pausePair() }
const onPairTouchMove  = (e) => {
  pairDX = e.touches[0].clientX - pairStartX
  const el = pairTrack.value
  if (el) {
    el.style.transition = 'none'
    el.style.transform  = `translateX(calc(-${pairIndex.value * 100}% + ${pairDX}px))`
  }
}
const onPairTouchEnd = () => {
  const el = pairTrack.value
  if (el) el.style.transition = ''
  const threshold = 60
  if (pairDX > threshold) prevPair()
  else if (pairDX < -threshold) nextPair()
  pairDX = 0
  playPair()
}

const goToPair = (i) => {
  if (!pairs.value.length) return
  pairIndex.value = i % pairs.value.length
  // restart autoplay after manual jump
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
.slide-box img { width: 100%; height: 100%; display: block; object-fit: cover; }
.slider-track { display: flex; transition: transform 0.5s ease-in-out; }
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
.two-up-track{ display:flex; transition: transform .5s ease-in-out; }
.pair{
  min-width:100%; display:grid; grid-template-columns: 1fr 1fr; gap:12px; background:transparent; padding:0;
}
.poster{ background:#0b0b0b; border-radius:6px; overflow:hidden; }
.poster img{ width:100%; height:100%; display:block; object-fit:cover; aspect-ratio: 1 / 1; }



@media (max-width: 560px){
  .pair{ grid-template-columns: 1fr; }
}

/* indicators container */
.two-up-indicators{
  position: absolute;
  left: 50%;
  bottom: 8px;                 /* move up/down to taste */
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 3;
  pointer-events: auto;
}

/* each bar */
.bar-dot{
  width: 50px;                 /* “pill” width like screenshot */
  height: 8px;
  border-radius: 2px;
  border: none;
  background: rgba(255,255,255,0.85);   /* inactive = white */
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

</style>
