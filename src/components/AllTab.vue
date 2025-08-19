<template>
  <div class="all-tab">
    <!-- Title with background image -->
    <div class="all-title">
      {{ $t('allgames.name') }}
    </div>
    
    <!-- All providers grid -->
    <div class="all-providers">
      <div 
        v-for="provider in allProviders" 
        :key="provider.id" 
        class="provider-card"
        :class="{ 'is-maintenance': isMaintenance(provider.id) }"
        :aria-disabled="isMaintenance(provider.id)"
        @click="handleClick(provider)"
      >
        <div class="provider-logo">
          <img :src="provider.logo" :alt="provider.name" />
        </div>

        <!-- Maintenance overlay -->
        <div v-if="isMaintenance(provider.id)" class="maint-layer" aria-hidden="true">
          <span class="maint-msg">
            <svg class="maint-ico" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="2"/>
              <rect x="11" y="6" width="2" height="9" rx="1" fill="#fff"/>
              <circle cx="12" cy="17.5" r="1.4" fill="#fff"/>
            </svg>
            <span>{{ $t('maintenance.name') }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/* ===== Slot provider logos ===== */
import psSlot from '@/assets/slot-images/ps_slot.webp'
import esSlot from '@/assets/slot-images/es_slot.webp'
import nolimitSlot from '@/assets/slot-images/nolimit_slot.webp'
import relaSlot from '@/assets/slot-images/rela_slot.webp'
import yggdrasilSlot from '@/assets/slot-images/yggdrasil_slot.webp'
import jiliSlot from '@/assets/slot-images/jili_slot.webp'
import facaiSlot from '@/assets/slot-images/facai_slot.webp'
import jdbSlot from '@/assets/slot-images/jdb_slot.webp'
import kingmidas2Slot from '@/assets/slot-images/kingmidas2_slot.webp'
import habaneroSlot from '@/assets/slot-images/habanero_slot.webp'
import ylSlot from '@/assets/slot-images/yl_slot.webp'
import cq9Slot from '@/assets/slot-images/cq9_slot.webp'
import simplePlaySlot from '@/assets/slot-images/simple_play_slot.webp'
import spadegamingSlot from '@/assets/slot-images/spadegaming_slot.webp'
import jokerSlot from '@/assets/slot-images/joker_slot.webp'
import pragmaticPlaySlot from '@/assets/slot-images/pragmatic_play_slot.webp'
import kingmidasSlot from '@/assets/slot-images/kingmidas_slot.webp'
import pgSlot from '@/assets/slot-images/pg_slot.webp'

/* ===== Casino provider logos ===== */
import evolutionCasino from '@/assets/casino-images/evolution_casino.webp'
import bigGamingCasino from '@/assets/casino-images/big_gaming_casino.webp'
import allBetCasino from '@/assets/casino-images/all_bet_casino.webp'
import dreamGamingCasino from '@/assets/casino-images/dream_gaming_casino.webp'
import wmCasino from '@/assets/casino-images/wm_casino.webp'
import aeSexyCasino from '@/assets/casino-images/ae_sexy_casino.webp'
import saCasino from '@/assets/casino-images/sa_casino.webp'

/* ===== Sports provider logos ===== */
import afb88 from '@/assets/sports-images/afb_88.webp'
import sabaPortsCasin from '@/assets/sports-images/saba_sports_casino.webp'
import sbobetCasino from '@/assets/sports-images/sbobet_casino.webp'
import ufaBetCasino from '@/assets/sports-images/ufa_bet_casino.webp'

/* ===== Lotto provider logos ===== */
import lotteryLotto from '@/assets/lotto-images/lottery_lotto.webp'
import siamlotLotto from '@/assets/lotto-images/siamlot_lotto.webp'

/* ===== Provider lists ===== */
const slotProviders = [
  { id: 'ps', name: 'PS Slot', logo: psSlot, category: 'slot' },
  { id: 'es', name: 'ES Slot', logo: esSlot, category: 'slot' },
  { id: 'nolimit', name: 'Nolimit City', logo: nolimitSlot, category: 'slot' },
  { id: 'rela', name: 'Relax Gaming', logo: relaSlot, category: 'slot' },
  { id: 'yggdrasil', name: 'Yggdrasil', logo: yggdrasilSlot, category: 'slot' },
  { id: 'jili', name: 'Jili Slot', logo: jiliSlot, category: 'slot' },
  { id: 'facai', name: 'Facai Slot', logo: facaiSlot, category: 'slot' },
  { id: 'jdb', name: 'JDB Slot', logo: jdbSlot, category: 'slot' },
  { id: 'kingmidas2', name: 'King Midas', logo: kingmidas2Slot, category: 'slot' },
  { id: 'habanero', name: 'Habanero', logo: habaneroSlot, category: 'slot' },
  { id: 'yl', name: 'YL Slot', logo: ylSlot, category: 'slot' },
  { id: 'cq9', name: 'CQ9', logo: cq9Slot, category: 'slot' },
  { id: 'simpleplay', name: 'SimplePlay', logo: simplePlaySlot, category: 'slot' },
  { id: 'spadegaming', name: 'Spade Gaming', logo: spadegamingSlot, category: 'slot' },
  { id: 'joker', name: 'Joker Gaming', logo: jokerSlot, category: 'slot' },
  { id: 'pragmatic', name: 'Pragmatic Play', logo: pragmaticPlaySlot, category: 'slot' },
  { id: 'kingmidas', name: 'King Midas', logo: kingmidasSlot, category: 'slot' },
  { id: 'pg', name: 'PG Soft', logo: pgSlot, category: 'slot' }
]

const casinoProviders = [
  { id: 'evolution', name: 'Evolution Casino', logo: evolutionCasino, category: 'casino' },
  { id: 'big_gaming', name: 'Big Gaming Casino', logo: bigGamingCasino, category: 'casino' },
  { id: 'all_bet', name: 'All Bet Casino', logo: allBetCasino, category: 'casino' },
  { id: 'dream_gaming', name: 'Dream Gaming Casino', logo: dreamGamingCasino, category: 'casino' },
  { id: 'wm', name: 'WM Casino', logo: wmCasino, category: 'casino' },
  { id: 'ae_sexy', name: 'AE Sexy Casino', logo: aeSexyCasino, category: 'casino' },
  { id: 'sa', name: 'SA Casino', logo: saCasino, category: 'casino' }
]

const sportsProviders = [
  { id: 'afb88', name: 'AFB 88', logo: afb88, category: 'sports' },
  { id: 'saba_ports', name: 'Saba Sports Casino', logo: sabaPortsCasin, category: 'sports' },
  { id: 'sbobet', name: 'SBOBET Casino', logo: sbobetCasino, category: 'sports' },
  { id: 'ufa_bet', name: 'UFA Bet Casino', logo: ufaBetCasino, category: 'sports' }
]

const lottoProviders = [
  { id: 'lottery', name: 'Lottery Lotto', logo: lotteryLotto, category: 'lotto' },
  { id: 'siamlot', name: 'Siamlot Lotto', logo: siamlotLotto, category: 'lotto' }
]

const router = useRouter()

/* Combine all providers */
const allProviders = ref([
  ...slotProviders,
  ...casinoProviders,
  ...sportsProviders,
  ...lottoProviders
])

/* ========= Maintenance control =========
   Put ANY provider id here (from any category) to show the banner & disable click.
   Example: new Set(['pg','evolution','afb88'])
*/
const maintenanceIds = new Set([
'ps','dream_gaming','afb88'
])

const isMaintenance = (id) => maintenanceIds.has(id)

const emit = defineEmits(['provider-selected'])

const selectProvider = (provider) => {
  console.log('Selected provider from all games:', provider.name, 'Category:', provider.category)
  emit('provider-selected', provider)
}

const handleClick = (provider) => {
  if (isMaintenance(provider.id)) return
  router.push({ path: '/login', query: { src: 'casino', provider: provider.id } })
}
</script>

<style scoped>
.all-tab {
  width: 100%;
  background: #100201;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

/* Title section with background image */
.all-title {
  background-image: url('@/assets/title_frame.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  font-size: 1.7rem;
  font-style: italic;
  font-weight: 700;
  line-height: 70px;
  color: white;
  height: 100%;
  min-width: 370px;
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  text-align: center;
  z-index: 1;
}

/* Providers grid */
.all-providers {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 0;
}

.provider-card {
  position: relative; /* needed for overlay */
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 320px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;   /* clip overlay edges */
}

.provider-card:hover { transform: scale(1.05); }

.provider-logo {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.provider-logo img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease, filter .2s ease;
  border-radius: 8px;
}

/* === Maintenance visuals (shared look with other tabs) === */
.provider-card.is-maintenance {
  pointer-events: none; /* disable click */
}

.provider-card.is-maintenance .provider-logo img {
  filter: brightness(.35) saturate(.95);
}

.maint-layer {
  position: absolute; inset: 0;
  display: grid; place-items: center;
}

.maint-msg {
  display: inline-flex; align-items: center; gap: 8px;
  color: #fff; font-weight: 500; font-size: 16px; line-height: 1;
  text-shadow: 0 1px 2px rgba(0,0,0,.55);
}

.maint-ico { width: 18px; height: 18px; flex: 0 0 18px; }

/* Responsive adjustments */
@media (max-width: 768px) {
  .all-tab { gap: 50px; }

  .all-providers { padding: 0 0 40px 0; gap: 90px 0; }
  
  .all-title {
    font-size: 1.2rem;
    min-width: 250px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .provider-card {
    width: 33.333%;
    height: 160px;
    padding: 8px;
  }

  .maint-msg { font-size: 13px; }
  .maint-ico { width: 16px; height: 16px; }
}

@media (max-width: 480px) {
  .all-title {
    font-size: 1rem;
    min-width: 200px;
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .provider-card {
    width: 33.333%;
    height: 100px;
    padding: 4px;
  }

  .maint-msg { font-size: 12px; }
  .maint-ico { width: 14px; height: 14px; }
}
</style>
