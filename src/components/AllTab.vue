<template>
  <div class="all-tab">
    <!-- Title with background image -->
    <div class="all-title">
      All Games
    </div>
    
    <!-- All providers grid -->
    <div class="all-providers">
      <div 
        v-for="provider in allProviders" 
        :key="provider.id" 
        class="provider-card"
        @click="selectProvider(provider)"
      >
        <div class="provider-logo">
          <img :src="provider.logo" :alt="provider.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import the title frame background (PNG)
import titleFrame from '@/assets/title_frame.png'

// Import slot provider logos
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

// Import casino provider logos
import evolutionCasino from '@/assets/casino-images/evolution_casino.webp'
import bigGamingCasino from '@/assets/casino-images/big_gaming_casino.webp'
import allBetCasino from '@/assets/casino-images/all_bet_casino.webp'
import dreamGamingCasino from '@/assets/casino-images/dream_gaming_casino.webp'
import wmCasino from '@/assets/casino-images/wm_casino.webp'
import aeSexyCasino from '@/assets/casino-images/ae_sexy_casino.webp'
import saCasino from '@/assets/casino-images/sa_casino.webp'

// Import sports provider logos
import afb88 from '@/assets/sports-images/afb_88.webp'
import sabaPortsCasin from '@/assets/sports-images/saba_sports_casino.webp'
import sbobetCasino from '@/assets/sports-images/sbobet_casino.webp'
import ufaBetCasino from '@/assets/sports-images/ufa_bet_casino.webp'

// Import lotto provider logos
import lotteryLotto from '@/assets/lotto-images/lottery_lotto.webp'
import siamlotLotto from '@/assets/lotto-images/siamlot_lotto.webp'

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

// Combine all providers into one array
const allProviders = ref([
  ...slotProviders,
  ...casinoProviders,
  ...sportsProviders,
  ...lottoProviders
])

const selectProvider = (provider) => {
  console.log('Selected provider from all games:', provider.name, 'Category:', provider.category)
  emit('provider-selected', provider)
}

// Emit events for parent component
const emit = defineEmits(['provider-selected'])
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
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 320px;
  padding: 10px;
  box-sizing: border-box;
}

.provider-card:hover {
  transform: scale(1.05);
}

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
  transition: transform 0.3s ease;
  border-radius: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .all-tab {
    gap: 50px;
  }

  .all-providers {
    padding: 0 0 40px 0;
  }

  .all-providers {
    gap: 90px 0;
  }
  
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
}
</style>
