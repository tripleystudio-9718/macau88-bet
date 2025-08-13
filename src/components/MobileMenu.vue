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
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
        <span class="menu-label">Home</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('play')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Play</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('withdraw')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Withdraw</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('deposit')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Deposit</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('affiliate')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
        </svg>
        <span class="menu-label">Affiliate</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('promotions')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Promotions</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('cashback')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Cashback</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('history')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">History</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('account')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Account info</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('lucky-wheel')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
        <span class="menu-label">Lucky wheel</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('collect-points')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="menu-label">Collect points</span>
      </div>

      <div class="menu-item" @click="handleMenuClick('contact')">
        <svg class="menu-icon" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
        </svg>
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
      }, 350) // Faster movement to center
      
      // Step 3: Show background after circle fully expands
      setTimeout(() => {
        this.backgroundVisible = true
      }, 750) // Faster background
      
      // Step 4: Header slides down from top
      setTimeout(() => {
        this.headerVisible = true
      }, 850) // Faster header
      
      // Step 5: Menu fades in from bottom ONLY AFTER header is fully shown
      setTimeout(() => {
        this.menuVisible = true
      }, 1100) // Faster menu
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
  /* Move to center of screen but keep size */
  bottom: 50vh;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
}

.expanding-circle.expanded {
  /* Expand in circular shape from center */
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
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
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
  gap: 20px;
  padding: 40px 20px;
  max-width: 600px;
  width: 100%;
  opacity: 0;
  transform: translate(-50%, -50%) translateY(50px);
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(215, 173, 105, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(215, 173, 105, 0.6);
  transform: translateY(-2px);
}

.menu-icon {
  width: 48px;
  height: 48px;
  color: #d7ad69;
  margin-bottom: 12px;
}

.menu-label {
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
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
@media (max-width: 480px) {
  .menu-grid {
    gap: 15px;
    padding: 20px 15px;
  }
  
  .menu-item {
    padding: 15px 10px;
    min-height: 100px;
  }
  
  .menu-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }
  
  .menu-label {
    font-size: 12px;
  }
}

@media (max-width: 360px) {
  .menu-grid {
    gap: 12px;
  }
  
  .menu-item {
    padding: 12px 8px;
    min-height: 90px;
  }
  
  .menu-icon {
    width: 36px;
    height: 36px;
  }
}
</style>