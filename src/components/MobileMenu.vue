<template>
  <div class="mobile-menu-overlay" v-if="isVisible" @click="closeMobileMenu">
    <!-- Expanding Circle Animation -->
    <div 
      class="expanding-circle" 
      :class="{ 'animate': showCircle, 'expanded': circleExpanded }"
    ></div>

    <!-- Full Page Background -->
    <div 
      class="menu-background" 
      :class="{ 'visible': backgroundVisible }"
    ></div>

    <!-- Header Section -->
    <div 
      class="menu-header" 
      :class="{ 'slide-down': headerVisible }"
    >
      <div class="header-content">
        <img 
          src="@/assets/macau888-logo.png" 
          alt="MACAU888" 
          class="menu-logo"
        />
        <button @click="closeMobileMenu" class="close-btn">
          <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu Grid -->
    <div 
      class="menu-grid" 
      :class="{ 'fade-up': menuVisible }"
    >
      <!-- Menu Items -->
      <div class="menu-item" @click="handleMenuClick('home')">
        <img src="@/assets/icons/home.png" alt="Home" class="menu-icon" />
        <span class="menu-label">Home</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('play')">
        <img src="@/assets/icons/play.png" alt="Play" class="menu-icon" />
        <span class="menu-label">Play</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('withdraw')">
        <img src="@/assets/icons/withdraw.png" alt="Withdraw" class="menu-icon" />
        <span class="menu-label">Withdraw</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('deposit')">
        <img src="@/assets/icons/deposit.png" alt="Deposit" class="menu-icon" />
        <span class="menu-label">Deposit</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('affiliate')">
        <img src="@/assets/icons/affiliate.png" alt="Affiliate" class="menu-icon" />
        <span class="menu-label">Affiliate</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('promotions')">
        <img src="@/assets/icons/promotion.png" alt="Promotions" class="menu-icon" />
        <span class="menu-label">Promotions</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('cashback')">
        <img src="@/assets/icons/cashback.png" alt="Cashback" class="menu-icon" />
        <span class="menu-label">Cashback</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('history')">
        <img src="@/assets/icons/history.png" alt="History" class="menu-icon" />
        <span class="menu-label">History</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('account')">
        <img src="@/assets/icons/account-info.png" alt="Account" class="menu-icon" />
        <span class="menu-label">Account info</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('lucky-wheel')">
        <img src="@/assets/icons/lucky-wheel.png" alt="Lucky Wheel" class="menu-icon" />
        <span class="menu-label">Lucky wheel</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('collect-points')">
        <img src="@/assets/icons/collect-point.png" alt="Collect Points" class="menu-icon" />
        <span class="menu-label">Collect points</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('contact')">
        <img src="@/assets/icons/contact.png" alt="Contact" class="menu-icon" />
        <span class="menu-label">Contact</span>
      </div>
    </div>

    <!-- Version Info -->
    <div 
      class="version-info" 
      :class="{ 'fade-up': menuVisible }"
    >
      v1.0.01
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'menu-click'],
  data() {
    return {
      isVisible: false,
      showCircle: false,
      circleExpanded: false,
      backgroundVisible: false,
      headerVisible: false,
      menuVisible: false
    }
  },
  watch: {
    isOpen: {
      handler(newVal) {
        if (newVal) {
          this.openMobileMenu()
        } else {
          this.closeMobileMenu()
        }
      },
      immediate: true
    }
  },
  methods: {
    openMobileMenu() {
      // Disable body scroll
      document.body.style.overflow = 'hidden'
      
      this.isVisible = true
      
      // Step 1: Show bigger circle and move it to center faster
      setTimeout(() => {
        this.showCircle = true
      }, 30)
      
      // Step 2: Once circle reaches center, THEN expand it to full page
      setTimeout(() => {
        this.circleExpanded = true
      }, 350)
      
      // Step 3: Show background after circle fully expands
      setTimeout(() => {
        this.backgroundVisible = true
      }, 750)
      
      // Step 4: Header slides down from top
      setTimeout(() => {
        this.headerVisible = true
      }, 850)
      
      // Step 5: Menu fades in from bottom
      setTimeout(() => {
        this.menuVisible = true
      }, 1100)
    },
    
    closeMobileMenu() {
      // Instant close - no animation
      this.menuVisible = false
      this.headerVisible = false
      this.backgroundVisible = false
      this.circleExpanded = false
      this.showCircle = false
      this.isVisible = false
      
      // Re-enable body scroll
      document.body.style.overflow = 'auto'
      this.$emit('close')
    },
    
    handleMenuClick(menuItem) {
      this.$emit('menu-click', menuItem)
      this.closeMobileMenu()
    }
  }
}
</script>

<style scoped>
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow: hidden;
}

/* Expanding Circle Animation */
.expanding-circle {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, #1a1a1a, #000);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.expanding-circle.animate {
  opacity: 1;
  bottom: 50vh;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
}

.expanding-circle.expanded {
  width: 200vmax;
  height: 200vmax;
  border-radius: 50%;
  bottom: 50vh;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Full Page Background */
.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-background.visible {
  opacity: 1;
}

/* Header Section */
.menu-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, #360000, #6f010a);
  border-bottom: 1px solid #d7ad69;
  transform: translateY(-100%);
  transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
  z-index: 10;
}

.menu-header.slide-down {
  transform: translateY(0);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 24px;
  max-width: 980px;
  margin: 0 auto;
  position: relative;
}

.menu-logo {
  height: 40px;
  width: auto;
}

.close-btn {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-icon {
  width: 24px;
  height: 24px;
}

/* Menu Grid */
.menu-grid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 15px;
  padding: 40px 20px;
  width: 50%;
  max-width: 490px; /* 50% of 980px */
  opacity: 0;
  transform: translate(-50%, -50%) translateY(50px);
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
  place-items: stretch;
}

.menu-grid.fade-up {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}

/* Menu Items */
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  background: linear-gradient(to bottom, #a20313, #72000e);
  border: 1px solid #d7ad69;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  width: 100%;
  font-size: 1rem;
  list-style: none;
  aspect-ratio: 1.2;
}

.menu-item:hover {
  background: linear-gradient(to bottom, #61460f, #e2b76d);
  border-color: #d7ad69;
}

.menu-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
  object-fit: contain;
}

.menu-item:hover .menu-icon {
  transform: scale(1.1);
}

.menu-label {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  margin-top: 0;
  transition: color 0.3s ease;
}

.menu-item:hover .menu-label {
  color: black;
}

/* Version Info */
.version-info {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
  transition-delay: 0.2s;
}

.version-info.fade-up {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Responsive adjustments */
@media (max-width: 980px) {
  .menu-grid {
    width: 50%;
    max-width: 50vw;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .menu-grid {
    width: 70%;
    max-width: 70vw;
    gap: 12px;
    padding: 30px 15px;
  }
  
  .menu-item {
    padding: 15px 10px;
  }
  
  .menu-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 6px;
  }
  
  .menu-label {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .menu-grid {
    width: 90%;
    max-width: 90vw;
    gap: 10px;
    padding: 20px 10px;
  }
  
  .menu-item {
    padding: 12px 8px;
  }
  
  .menu-icon {
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
  }
  
  .menu-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .menu-grid {
    width: 95%;
    max-width: 95vw;
    gap: 8px;
  }
  
  .menu-item {
    padding: 10px 6px;
  }
  
  .menu-icon {
    width: 28px;
    height: 28px;
    margin-bottom: 2px;
  }
  
  .menu-label {
    font-size: 0.75rem;
  }
}
</style>