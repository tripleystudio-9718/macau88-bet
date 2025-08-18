<template>
  <div class="lotto-tab">
    <!-- Title with background image -->
    <div class="lotto-title">
      Lotto
    </div>
    
    <!-- Lotto providers grid -->
    <div class="lotto-providers">
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

// Import lotto provider logos
import lotteryLotto from '@/assets/lotto-images/lottery_lotto.webp'
import siamlotLotto from '@/assets/lotto-images/siamlot_lotto.webp'

const providers = ref([
  {
    id: 'lottery',
    name: 'Lottery Lotto',
    logo: lotteryLotto,
    games: []
  },
  {
    id: 'siamlot',
    name: 'Siamlot Lotto',
    logo: siamlotLotto,
    games: []
  }
])

const selectProvider = (provider) => {
  console.log('Selected lotto provider:', provider.name)
  emit('provider-selected', provider)
}

// Emit events for parent component
const emit = defineEmits(['provider-selected'])
</script>

<style scoped>
.lotto-tab {
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
.lotto-title {
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
.lotto-providers {
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
  .lotto-tab {
    gap: 50px;
  }

  .lotto-providers {
    padding: 0 0 40px 0;
    gap: 90px 0;
  }
  
  /* Updated title mobile styling to match other components */
  .lotto-title {
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
  .lotto-title {
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
