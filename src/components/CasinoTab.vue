<template>
  <div class="casino-tab">
    <!-- Title with background image -->
    <div class="casino-title">
        {{ $t('casino.name') }}
    </div>
    
  <!-- Casino providers grid -->
<div class="casino-providers">
  <RouterLink
    v-for="provider in providers"
    :key="provider.id"
    :to="{ path: '/login', query: { src: 'casino', provider: provider.id } }"
    custom
    v-slot="{ navigate }"
  >
    <div
      class="provider-card"
      :class="{ 'is-maintenance': isMaintenance(provider.id) }"
      :aria-disabled="isMaintenance(provider.id)"
      @click="() => { if (!isMaintenance(provider.id)) navigate() }"
    >
      <div class="provider-logo">
        <img :src="provider.logo" :alt="provider.name" />
      </div>

      <!-- Maintenance overlay -->
      <div v-if="isMaintenance(provider.id)" class="maint-layer" aria-hidden="true">
        <span class="maint-msg">
          <svg class="maint-ico" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="2" />
            <rect x="11" y="6" width="2" height="9" rx="1" fill="#fff" />
            <circle cx="12" cy="17.5" r="1.4" fill="#fff" />
          </svg>
          <span>{{ $t('maintenance.name') }}</span>
        </span>
      </div>
    </div>
  </RouterLink>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Casino provider logos
import evolutionCasino from '@/assets/casino-images/evolution_casino.webp'
import bigGamingCasino from '@/assets/casino-images/big_gaming_casino.webp'
import allBetCasino from '@/assets/casino-images/all_bet_casino.webp'
import dreamGamingCasino from '@/assets/casino-images/dream_gaming_casino.webp'
import wmCasino from '@/assets/casino-images/wm_casino.webp'
import aeSexyCasino from '@/assets/casino-images/ae_sexy_casino.webp'
import saCasino from '@/assets/casino-images/sa_casino.webp'

const providers = ref([
  { id: 'sa',           name: 'SA Casino',            logo: saCasino,          games: [] },
  { id: 'ae_sexy',      name: 'AE Sexy Casino',       logo: aeSexyCasino,      games: [] },
  { id: 'wm',           name: 'WM Casino',            logo: wmCasino,          games: [] },
  { id: 'dream_gaming', name: 'Dream Gaming Casino',  logo: dreamGamingCasino, games: [] },
  { id: 'all_bet',      name: 'All Bet Casino',       logo: allBetCasino,      games: [] },
  { id: 'big_gaming',   name: 'Big Gaming Casino',    logo: bigGamingCasino,   games: [] },
  { id: 'evolution',    name: 'Evolution Casino',     logo: evolutionCasino,   games: [] },
])

/** Toggle maintenance per provider here */
const maintenanceIds = new Set([
'dream_gaming'
])

const isMaintenance = (id) => maintenanceIds.has(id)
const router = useRouter()

const emit = defineEmits(['provider-selected'])

const selectProvider = (provider) => {
  console.log('Selected casino provider:', provider.name)
  emit('provider-selected', provider)
}

const handleClick = (provider) => {
  if (isMaintenance(provider.id)) return
  router.push({ path: '/login', query: { src: 'casino', provider: provider.id } })
}


</script>

<style scoped>
.casino-tab {
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
.casino-title {
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
.casino-providers {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 0;
}

.provider-card {
  position: relative; /* enable overlay positioning */
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
  overflow: hidden; /* clip overlay corners */
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

/* === Maintenance visuals (same as Slot tab) === */
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

@media (max-width: 768px) {
  .casino-tab { 
    gap: 20px; 
    padding: 0; 
  }

  .casino-providers { 
    padding: 0; 
    gap: 20px 0;
    width: 100%;
  }
  
  .casino-title {
    font-size: 1.2rem;
    min-width: 250px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .provider-card {
    width: 33.333%;
    height: 190px;
    padding: 6px;
  }

  .provider-logo {
    padding: 2px;
  }

  .maint-msg { font-size: 13px; }
  .maint-ico { width:16px; height:16px; }
}

@media (max-width: 480px) {
  .casino-tab {
    padding: 0;
    gap: 15px;
  }

  .casino-providers {
    gap: 15px 0;
  }
  
  .casino-title {
    font-size: 1rem;
    min-width: 200px;
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .provider-card {
    padding: 4px;
  }

  .provider-logo {
    padding: 2px;
  }

  .provider-logo img {
    border-radius: 6px;
  }

  .maint-msg { font-size: 12px; }
  .maint-ico { width:14px; height:14px; }
}

/* Extra small screens */
@media (max-width: 360px) {
  .casino-tab {
    padding: 0;
  }
  
  .provider-card {
    padding: 3px;
  }

  .provider-logo {
    padding: 1px;
  }
}
</style>
