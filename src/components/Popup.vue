<template>
  <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
    <div 
      class="modal-content" 
      @click.stop
      :class="{ 'pulse-animation': isAnimating }"
    >
      <!-- Modal Image -->
      <div class="modal-image">
        <!-- Close Button - positioned at top-right of image -->
        <button class="close-btn-outside" @click="nextBannerOrClose" :class="{ 'pulse-animation': isAnimating }">×</button>
        <!-- Make image clickable to open contact link -->
        <img 
          :src="banners[currentBannerIndex].src" 
          :alt="banners[currentBannerIndex].alt" 
          @click="openContactLink"
          style="cursor: pointer;"
        />
      </div>
      
      <!-- Modal Details -->
      <div class="modal-details">
        <h2 class="modal-title">{{ banners[currentBannerIndex].title }}</h2>
        <p class="modal-description" v-html="banners[currentBannerIndex].description"></p>
      </div>
      
      <!-- Close Button -->
      <div class="modal-close-container">
        <button class="close-button" @click="nextBannerOrClose">{{ banners[currentBannerIndex].buttonText }}</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getCurrentLocale, localePath } from '@/router'
// Import popup images
import popup1 from '@/assets/popup-images/popup-1.jpeg'
import popup2 from '@/assets/popup-images/popup-2.jpeg'
import popup3 from '@/assets/popup-images/popup-3.jpeg'

export default {
  name: 'PopupComponent',
  data() {
    return {
      isVisible: false,
      currentBannerIndex: 0,
      isAnimating: false,
      contactUrl: 'http://bit.ly/45oDZl4', // Contact link
      banners: [
        { 
          src: popup1, 
          alt: 'Macau888 Promotion 1',
          title: '‼️ ประกาศจาก MACAU888 ‼️',
          description: '',
          buttonText: 'ดูต่อ'
        },
        { 
          src: popup2, 
          alt: 'Macau888 Promotion 2',
          title: 'มาเก็า888 การันตี!!!',
          description: '',
          buttonText: 'ดูต่อ'
        },
        { 
          src: popup3, 
          alt: 'Macau888 Promotion 3',
          title: 'โปรโมชั่นดีๆสำหรับคุณ',
          description: '',
          buttonText: 'ตกลง'
        }
      ]
    }
  },
  computed: {
    currentLocale() {
      return getCurrentLocale(this.$route) || 'th'
    }
  },
  mounted() {
    // Always show popup on page load/refresh
    this.openPopup()
  },
  methods: {
    openPopup() {
      this.isVisible = true
      this.currentBannerIndex = 0
      this.isAnimating = true
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      setTimeout(() => {
        this.isAnimating = false
      }, 300)
    },

    closePopup() {
      this.isVisible = false
      this.currentBannerIndex = 0
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    },

    nextBannerOrClose() {
      if (this.currentBannerIndex < this.banners.length - 1) {
        // Move to next banner with animation
        this.isAnimating = true
        this.currentBannerIndex++
        
        setTimeout(() => {
          this.isAnimating = false
        }, 300)
      } else {
        // Close popup if it's the last banner
        this.closePopup()
      }
    },

    handleOverlayClick() {
      // When clicking outside, move to next banner or close
      this.nextBannerOrClose()
    },

    // NEW: Method to open contact link
    openContactLink() {
      // Close the popup first
      this.closePopup()
      // Open contact link in new tab
      window.open(this.contactUrl, '_blank', 'noopener,noreferrer')
    },

    navigateToRegister() {
      this.closePopup()
      const registerPath = localePath('/register', this.currentLocale)
      this.$router.push(registerPath)
    }
  }
}
</script>
  
<style scoped>
/* Modal Styles - Exact same as promotion section */
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
  right: -36px;
  background-color: transparent;
  color: #dc3545;
  border: none;
  font-size: 36px;
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
  cursor: pointer; /* Ensure pointer cursor */
  transition: opacity 0.2s ease; /* Optional: subtle hover effect */
}

/* Optional: Add subtle hover effect on desktop */
@media (hover: hover) and (pointer: fine) {
  .modal-image img:hover {
    opacity: 0.9;
  }
}

.modal-details {
  padding: 10px;
  text-align: center;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.modal-close-container {
  text-align: center;
}

.close-button {
  background-color: #e0245f;
  border-color: #e0245f;
  background-image: linear-gradient(180deg, #ffffff26, #fff0);
  color: white;
  border: none;
  padding: .375rem .75rem;
  border-radius: .25rem;
  font-size: 14px;
  cursor: pointer;
  min-width: 80px;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .close-button {
    -webkit-tap-highlight-color: rgba(187, 45, 59, 0.3);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .close-button:hover {
    background-color:#e0245f;
  }
}

/* Animations */
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

/* Responsive Design - Same as promotion section */
@media (max-width: 768px) {
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
  .close-btn-outside {
    top: -8px;
    right: -8px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
}
</style>