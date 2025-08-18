<template>
  <div class="slot-tab">
    <!-- Title with background image -->
    <div class="slot-title">
      Slot
    </div>
    
    <!-- Game providers grid -->
    <div class="slot-providers">
      <div 
        v-for="provider in providers" 
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentLocale, localePath } from '@/router'

// Import provider logos (from the images shown)
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

// Import game images (second row)
import ylSlot from '@/assets/slot-images/yl_slot.webp'
import cq9Slot from '@/assets/slot-images/cq9_slot.webp'
import simplePlaySlot from '@/assets/slot-images/simple_play_slot.webp'
import spadegamingSlot from '@/assets/slot-images/spadegaming_slot.webp'
import jokerSlot from '@/assets/slot-images/joker_slot.webp'
import pragmaticPlaySlot from '@/assets/slot-images/pragmatic_play_slot.webp'
import kingmidasSlot from '@/assets/slot-images/kingmidas_slot.webp'
import pgSlot from '@/assets/slot-images/pg_slot.webp'

const router = useRouter()

const providers = ref([
  {
    id: 'ps',
    name: 'PS Slot',
    logo: psSlot,
    games: []
  },
  {
    id: 'es',
    name: 'ES Slot',
    logo: esSlot,
    games: []
  },
  {
    id: 'nolimit',
    name: 'Nolimit City',
    logo: nolimitSlot,
    games: []
  },
  {
    id: 'rela',
    name: 'Relax Gaming',
    logo: relaSlot,
    games: []
  },
  {
    id: 'yggdrasil',
    name: 'Yggdrasil',
    logo: yggdrasilSlot,
    games: []
  },
  {
    id: 'jili',
    name: 'Jili Slot',
    logo: jiliSlot,
    games: []
  },
  {
    id: 'facai',
    name: 'Facai Slot',
    logo: facaiSlot,
    games: []
  },
  {
    id: 'jdb',
    name: 'JDB Slot',
    logo: jdbSlot,
    games: []
  },
  {
    id: 'kingmidas2',
    name: 'King Midas',
    logo: kingmidas2Slot,
    games: []
  },
  {
    id: 'habanero',
    name: 'Habanero',
    logo: habaneroSlot,
    games: []
  },
  {
    id: 'yl',
    name: 'YL Slot',
    logo: ylSlot,
    games: []
  },
  {
    id: 'cq9',
    name: 'CQ9',
    logo: cq9Slot,
    games: []
  },
  {
    id: 'simpleplay',
    name: 'SimplePlay',
    logo: simplePlaySlot,
    games: []
  },
  {
    id: 'spadegaming',
    name: 'Spade Gaming',
    logo: spadegamingSlot,
    games: []
  },
  {
    id: 'joker',
    name: 'Joker Gaming',
    logo: jokerSlot,
    games: []
  },
  {
    id: 'pragmatic',
    name: 'Pragmatic Play',
    logo: pragmaticPlaySlot,
    games: []
  },
  {
    id: 'kingmidas',
    name: 'King Midas',
    logo: kingmidasSlot,
    games: []
  },
  {
    id: 'pg',
    name: 'PG Soft',
    logo: pgSlot,
    games: []
  }
])

const currentLocale = computed(() => {
  return getCurrentLocale(router.currentRoute.value) || 'th'
})

const selectProvider = (provider) => {
  console.log('Selected provider:', provider.name)
  
  // All providers require login - redirect to login page
  const loginPath = localePath('/login', currentLocale.value)
  router.push(loginPath)
  
  // Still emit for parent component if needed
  emit('provider-selected', provider)
}

// Emit events for parent component
const emit = defineEmits(['provider-selected'])
</script>

<style scoped>
.slot-tab {
  width: 100%;
  background: #100201;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

/* Title section with background image */
.slot-title {
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
.slot-providers {
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
  .slot-tab {
    gap: 50px;
  }

  .slot-providers {
    padding: 0 0 40px 0;
    gap: 90px 0;
  }
  
  /* Updated title mobile styling to match casino component */
  .slot-title {
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
  /* Updated title and card styling for smaller mobile screens to match casino */
  .slot-title {
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