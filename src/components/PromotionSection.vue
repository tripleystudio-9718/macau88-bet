<template>
  <div class="promotion-section">
    <!-- Title with background image -->
    <div class="promotion-title">
      Promotions
    </div>
    
    <!-- Promotion Cards Grid -->
    <div class="promotions-container">
      <div class="promotions-grid">
        <div 
          v-for="(promo, index) in promoDetails" 
          :key="index"
          class="promo-card fade-in" 
          @click="openModal(index)"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card-image">
            <img :src="promo.image" :alt="`Promotion ${index + 1}`" class="promo-image" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ promo.title }}</h3>
            <p class="card-description">{{ promo.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- More Show Button -->
      <div class="more-show-container">
        <router-link 
          to="/promotions" 
          class="btn btn-more-show"
        >
          <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor"></path>
            <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor"></path>
            <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor"></path>
          </svg>
          More Show
        </router-link>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div 
      v-if="showModal" 
      class="modal-overlay" 
      @click="closeModal"
    >
      <div 
        class="modal-content" 
        @click.stop
        :class="{ 'pulse-animation': isAnimating }"
      >
        <!-- Modal Image -->
        <div class="modal-image">
          <!-- Close Button - positioned at top-right of image -->
          <button class="close-btn-outside" @click="closeModal" :class="{ 'pulse-animation': isAnimating }">×</button>
          <img :src="currentPromo.image" :alt="'Promotion Modal'" />
        </div>
        
        <!-- Modal Details -->
        <div class="modal-details">
          <h2 class="modal-title">{{ currentPromo.modalTitle }}</h2>
          <p class="modal-description" v-html="currentPromo.modalDescription" v-if="currentPromo.modalDescription"></p>
        </div>
        
        <!-- Close Button -->
        <div class="modal-close-container">
          <button class="close-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Import the title frame background (PNG)
import titleFrame from '@/assets/title_frame.png'

// Import promotion images
import welcomeBonus from '@/assets/promotions/welcome-bonus.jpeg'
import dailyRebate from '@/assets/promotions/daily-rebate.jpeg'
import instantBonus from '@/assets/promotions/instant-bonus.jpeg'
import minDeposit from '@/assets/promotions/min-deposit.jpeg'
import weeklyCashback from '@/assets/promotions/weekly-cashback.jpeg'
import lotteryX10 from '@/assets/promotions/lottery-x10.jpeg'
import promotionGeneric from '@/assets/promotions/promotion.webp'

const showModal = ref(false)
const isAnimating = ref(false)
const currentPromoIndex = ref(0)

const promoDetails = ref([
  {
    key: 'welcome50',
    image: welcomeBonus,
    title: 'Welcome Bonus 50%',
    description: 'Get 50% bonus on your first deposit',
    modalTitle: 'Welcome Bonus 50%',
    modalDescription: 'Join now and get 50% bonus on your first deposit. Terms and conditions apply.',
    hasText: true,
    hasTextForNonThai: false
  },
  {
    key: 'lossRebate', 
    image: dailyRebate,
    title: 'Daily Loss Rebate',
    description: 'Get daily rebate on your losses',
    modalTitle: 'Daily Loss Rebate',
    modalDescription: 'Receive daily rebate on your losses. Up to 1.2% cashback daily.',
    hasText: true,
    hasTextForNonThai: true
  },
  {
    key: 'instant500',
    image: instantBonus,
    title: 'Instant Bonus 500',
    description: 'Get instant bonus up to 500',
    modalTitle: 'Instant Bonus 500',
    modalDescription: 'Get instant bonus up to 500 on qualifying deposits.',
    hasText: true,
    hasTextForNonThai: false
  },
  {
    key: 'minDeposit',
    image: minDeposit,
    title: 'Minimum Deposit Bonus',
    description: 'Low minimum deposit required',
    modalTitle: 'Minimum Deposit Bonus',
    modalDescription: 'Start playing with just a small minimum deposit and get bonus rewards.',
    hasText: true,
    hasTextForNonThai: false
  },
  {
    key: 'referFriend',
    image: weeklyCashback,
    title: 'Refer a Friend',
    description: 'Get rewards for referrals',
    modalTitle: 'Refer a Friend',
    modalDescription: 'Invite friends and get rewards for each successful referral.',
    hasText: true,
    hasTextForNonThai: false
  },
  {
    key: 'baccaratRich',
    image: lotteryX10,
    title: 'Baccarat Rich Bonus',
    description: 'Special baccarat promotions',
    modalTitle: 'Baccarat Rich Bonus',
    modalDescription: 'Special promotions and bonuses for baccarat players.',
    hasText: true,
    hasTextForNonThai: false
  }
])

const currentPromo = computed(() => {
  return promoDetails.value[currentPromoIndex.value] || {}
})

const openModal = (index) => {
  currentPromoIndex.value = index
  isAnimating.value = true
  showModal.value = true
  
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}

const closeModal = () => {
  showModal.value = false
  isAnimating.value = false
}
</script>

<style scoped>
.promotion-section {
  width: 100%;
  background: #100201;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px 0;
}

/* Title section with background image */
.promotion-title {
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

.promotions-container {
  margin: 0 auto;
  padding: 0 10px;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.promo-card {
  border-radius: .25rem;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  background: linear-gradient(to bottom, #a20313, #72000e);
  border: 1px solid rgba(0, 0, 0, .125);
  transition: transform 0.2s ease;
}

.promo-card:active {
  transform: scale(0.98);
}

.promo-card.fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.card-image {
  position: relative;
  overflow: hidden;
}

.promo-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.card-content {
  padding: 0.5rem 1rem;
  text-align: left;
}

.card-title {
  color: white;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.3;
  margin: 0;
}

.card-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
}

/* More Show Button */
.more-show-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-more-show {
  background-color: #e0245f;
  background-image: linear-gradient(180deg, #ffffff26, #fff0);
  border-color: #b31d4c !important;
  color: white;
  border: 1px solid;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-more-show:hover {
  background-color: #a11a45;
  border-color: #9c1842;
  transform: translateY(-1px);
}

.btn-more-show:active {
  transform: translateY(0);
}

.btn-more-show svg {
  width: 16px;
  height: 16px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  position: relative;
  overflow: visible;
  width: min(95vw, 450px);
  max-height: 90vh;
}

.modal-content.pulse-animation {
  animation: pulseOnce 0.3s ease-out;
}

.close-btn-outside.pulse-animation {
  animation: pulseOnce 0.3s ease-out;
}

.close-btn-outside {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: transparent;
  color: #dc3545;
  border: none;
  font-size: 40px;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.modal-image {
  width: 100%;
  position: relative;
  overflow: visible;
}

.modal-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.modal-details {
  padding: 20px;
  text-align: left;
  background: transparent;
}

.modal-title {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.modal-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  margin: 0 0 20px 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.modal-close-container {
  padding: 20px;
  text-align: center;
}

.close-button {
  background-color: #bb2d3b;
  border-color: #dc3545;
  background-image: linear-gradient(180deg, #ffffff26, #fff0);
  color: white;
  border: none;
  padding: .375rem .75rem;
  border-radius: .25rem;
  font-size: 14px;
  cursor: pointer;
  min-width: 80px;
}

.close-button:hover {
  background-color: rgba(187, 45, 59, 0.85);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseOnce {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 980px) {
  .promotions-container {
    padding: 0 15px;
  }
}

@media (max-width: 768px) {
  .promotions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .promotion-title {
    font-size: 1.2rem;
    min-width: 250px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .modal-content {
    width: 98vw;
    padding: 0 15px;
  }
  
  .modal-title {
    font-size: 16px;
  }
  
  .close-btn-outside {
    top: -10px;
    right: -10px;
    width: 45px;
    height: 45px;
    font-size: 30px;
  }
}

@media (max-width: 480px) {
  .promotions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .promotion-title {
    font-size: 1rem;
    min-width: 200px;
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .promotions-container {
    padding: 0 10px;
  }
  
  .close-btn-outside {
    top: -8px;
    right: -8px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
}
</style>
