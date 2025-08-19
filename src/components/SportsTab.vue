<template>
  <div class="sports-tab">
    <!-- Title with background image -->
    <div class="sports-title">
      {{ $t('sport.name') }}
    </div>
    
    <!-- Sports providers grid -->
    <div class="sports-providers">
      <div 
        v-for="provider in providers" 
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

const router = useRouter()


// Import the title frame background (PNG)
import titleFrame from '@/assets/title_frame.png'

// Import sports provider logos
import afb88 from '@/assets/sports-images/afb_88.webp'
import sabaPortsCasin from '@/assets/sports-images/saba_sports_casino.webp'
import sbobetCasino from '@/assets/sports-images/sbobet_casino.webp'
import ufaBetCasino from '@/assets/sports-images/ufa_bet_casino.webp'

const providers = ref([
  { id: 'afb88',     name: 'AFB 88',             logo: afb88,          games: [] },
  { id: 'saba_ports',name: 'Saba Sports Casino', logo: sabaPortsCasin, games: [] },
  { id: 'sbobet',    name: 'SBOBET Casino',      logo: sbobetCasino,   games: [] },
  { id: 'ufa_bet',   name: 'UFA Bet Casino',     logo: ufaBetCasino,   games: [] }
])

/* ========= Maintenance control =========
   Put ANY provider id here to show the banner & disable click.
   Example: new Set(['afb88','sbobet'])
*/
const maintenanceIds = new Set([
'afb88'])

const isMaintenance = (id) => maintenanceIds.has(id)

const emit = defineEmits(['provider-selected'])

const selectProvider = (provider) => {
  console.log('Selected sports provider:', provider.name)
  emit('provider-selected', provider)
}

const handleClick = (provider) => {
  if (isMaintenance(provider.id)) return
  router.push({ path: '/login', query: { src: 'casino', provider: provider.id } })
}
</script>

<style scoped>
.sports-tab {
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
.sports-title {
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
.sports-providers {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 0;
}

.provider-card {
  position: relative; /* for overlay */
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

/* === Maintenance visuals (same look) === */
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
  .sports-tab { 
    gap: 20px; 
    padding: 0; 
  }

  .sports-providers { 
    padding: 0; 
    gap: 20px 0;
    width: 100%;
  }
  
  .sports-title {
    font-size: 1.2rem;
    min-width: 250px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .provider-card {
    width: 33.333%;
    height: 180px;
    padding: 6px;
  }

  .provider-logo {
    padding: 2px;
  }

  .maint-msg { font-size: 13px; }
  .maint-ico { width:16px; height:16px; }
}

@media (max-width: 480px) {
  .sports-tab {
    padding: 0;
    gap: 15px;
  }

  .sports-providers {
    gap: 15px 0;
  }
  
  .sports-title {
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
  .sports-tab {
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
