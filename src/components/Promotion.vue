<template>
  <div class="promotion-page">
    <!-- Page Title -->
    <div class="page-header">
      <h1 class="page-title">
        {{ $t('promotions.title') }}<span class="highlight">{{ $t('promotions.subtitle') }}</span>
      </h1>
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
            <img :src="getPromoImage(promo)" :alt="getPromoTitle(promo)" class="promo-image" />
          </div>
          <div class="card-content" v-if="hasPromoText(promo)">
            <h3 class="card-title">{{ getPromoTitle(promo) }}</h3>
            <p class="card-description">{{ getPromoDescription(promo) }}</p>
          </div>
        </div>
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
          <img :src="getPromoImage(currentPromo)" :alt="getPromoTitle(currentPromo)" />
        </div>
        
        <!-- Modal Details -->
        <div class="modal-details" v-if="hasModalText(currentPromo)">
          <h2 class="modal-title">{{ getModalTitle(currentPromo) }}</h2>
          <p class="modal-description" v-html="getModalDescription(currentPromo)" v-if="getModalDescription(currentPromo)"></p>
        </div>
        
        <!-- Close Button -->
        <div class="modal-close-container">
          <button class="close-button" @click="closeModal">{{ $t('common.close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import promotion images
import welcomeBonus from '@/assets/promotions/welcome-bonus.jpeg'
import dailyRebate from '@/assets/promotions/daily-rebate.jpeg'
import instantBonus from '@/assets/promotions/instant-bonus.jpeg'
import minDeposit from '@/assets/promotions/min-deposit.jpeg'
import weeklyCashback from '@/assets/promotions/weekly-cashback.jpeg'
import lotteryX10 from '@/assets/promotions/lottery-x10.jpeg'
import promotionGeneric from '@/assets/promotions/promotion.webp'

export default {
  name: 'Promotion',
  data() {
    return {
      showModal: false,
      isAnimating: false,
      currentPromoIndex: 0,
      promoDetails: [
        {
          key: 'welcome50',
          image: welcomeBonus,
          genericImage: promotionGeneric,
          hasText: true,
          hasTextForNonThai: false // Only show text for Thai
        },
        {
          key: 'lossRebate', 
          image: dailyRebate,
          genericImage: promotionGeneric,
          hasText: true,
          hasTextForNonThai: true // Show text for all languages
        },
        {
          key: 'instant500',
          image: instantBonus,
          genericImage: promotionGeneric,
          hasText: true,
          hasTextForNonThai: false // Only show text for Thai
        },
        {
          key: 'minDeposit',
          image: minDeposit,
          genericImage: promotionGeneric,
          hasText: true,
          hasTextForNonThai: false // Only show text for Thai
        },
        {
          key: 'referFriend',
          image: weeklyCashback,
          genericImage: promotionGeneric,
          hasText: true,
          hasTextForNonThai: false // Only show text for Thai
        },
        {
          key: 'baccaratRich',
          image: lotteryX10,
          genericImage: promotionGeneric,
          hasText: true,
          hasTextForNonThai: false // Only show text for Thai
        }
      ]
    }
  },
  computed: {
    currentPromo() {
      return this.promoDetails[this.currentPromoIndex] || {}
    },
    currentLocale() {
      return this.$route.meta?.locale || this.$i18n.locale || 'th'
    }
  },
  methods: {
    openModal(index) {
      this.currentPromoIndex = index
      this.isAnimating = true
      this.showModal = true
      
      setTimeout(() => {
        this.isAnimating = false
      }, 300)
    },
    
    closeModal() {
      this.showModal = false
      this.isAnimating = false
    },

    getPromoImage(promo) {
      // For Lao and English, use generic image; for Thai, use specific image
      return (this.currentLocale === 'th') ? promo.image : promo.genericImage
    },

    hasPromoText(promo) {
      // For Thai: show text if hasText is true
      // For non-Thai: only show text if hasTextForNonThai is true
      if (this.currentLocale === 'th') {
        return promo.hasText
      } else {
        return promo.hasTextForNonThai
      }
    },

    getPromoTitle(promo) {
      return this.$t(`promotions.items.${promo.key}.title`)
    },

    getPromoDescription(promo) {
      return this.$t(`promotions.items.${promo.key}.description`)
    },

    hasModalText(promo) {
      // Same logic as hasPromoText for modal
      if (this.currentLocale === 'th') {
        return promo.hasText
      } else {
        return promo.hasTextForNonThai
      }
    },

    getModalTitle(promo) {
      return this.$t(`promotions.items.${promo.key}.modalTitle`)
    },

    getModalDescription(promo) {
      const description = this.$t(`promotions.items.${promo.key}.modalDescription`)
      return description !== `promotions.items.${promo.key}.modalDescription` ? description : ''
    }
  }
}
</script>

<style scoped>
.promotion-page {
  padding: 0;
}

.page-header {
  text-align: center;
  max-width: 980px;
  margin: auto auto 1.5rem;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin: 0;
  letter-spacing: 2px;
}

.highlight {
  color: #dc2626;
}

.promotions-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 20px;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 40px;
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
  top: -20px;
  right: -25px;
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
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.modal-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
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
  
  .page-title {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .promotions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-title {
    font-size: 26px;
    padding: 10px 15px 0 15px;
  }
  
  .modal-content {
    width: 98vw;
    padding: 0 20px;
  }
  
  .modal-title {
    font-size: 18px;
  }

  .card-content {
    padding: 0 5px;
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
    gap: 10px;
  }
  
  .page-title {
    font-size: 22px;
  }
  
  .promotions-container {
    padding: 0 10px;
  }
  
  .modal-content {
    padding: 0 15px;
  }
  
  .close-btn-outside {
    top: -8px;
    right: -8px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
}

@media (max-width: 360px) {
  .page-title {
    font-size: 20px;
  }
  
  .promotions-grid {
    gap: 8px;
  }
  
  .modal-content {
    padding: 0 12px;
  }
}
</style>
