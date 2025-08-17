<template>
  <div class="sports-tab">
    <!-- Title with background image -->
    <div class="sports-title">
      Sports
    </div>
    
    <!-- Sports providers grid -->
    <div class="sports-providers">
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
import { ref } from 'vue'

// Import the title frame background (PNG)
import titleFrame from '@/assets/title_frame.png'

// Import sports provider logos
import afb88 from '@/assets/sports-images/afb_88.webp'
import sabaPortsCasin from '@/assets/sports-images/saba_sports_casino.webp'
import sbobetCasino from '@/assets/sports-images/sbobet_casino.webp'
import ufaBetCasino from '@/assets/sports-images/ufa_bet_casino.webp'

const providers = ref([
  {
    id: 'afb88',
    name: 'AFB 88',
    logo: afb88,
    games: []
  },
  {
    id: 'saba_ports',
    name: 'Saba Sports Casino',
    logo: sabaPortsCasin,
    games: []
  },
  {
    id: 'sbobet',
    name: 'SBOBET Casino',
    logo: sbobetCasino,
    games: []
  },
  {
    id: 'ufa_bet',
    name: 'UFA Bet Casino',
    logo: ufaBetCasino,
    games: []
  }
])

const selectProvider = (provider) => {
  console.log('Selected sports provider:', provider.name)
  emit('provider-selected', provider)
}

// Emit events for parent component
const emit = defineEmits(['provider-selected'])
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
  .sports-tab {
    gap: 50px;
  }

  .sports-providers {
    padding: 0 0 35px 0;
    gap: 80px 0;
  }
  
  /* Updated title mobile styling to match other components */
  .sports-title {
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
  /* Updated title and card styling for smaller mobile screens */
  .sports-title {
    font-size: 1rem;
    min-width: 200px;
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  /* Fixed mobile card width to match casino component consistency */
  .provider-card {
    width: 33.333%;
    height: 100px;
    padding: 4px;
  }
}
</style>
