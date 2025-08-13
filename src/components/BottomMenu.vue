<template>
  <div class="bottom-menu-container">
    <div class="bottom-menu-content">
      <nav class="bottom-nav">
        <!-- Home -->
        <router-link 
          to="/" 
          class="footer-menu-item"
        >
          <img 
            src="@/assets/icons/home.png" 
            alt="Home" 
            class="nav-image"
          />
          <span class="nav-text">Home</span>
        </router-link>

        <!-- Deposit -->
        <button 
          @click="$emit('deposit')"
          class="footer-menu-item"
        >
          <img 
            src="@/assets/icons/deposit.png" 
            alt="Deposit" 
            class="nav-image"
          />
          <span class="nav-text">Deposit</span>
        </button>

        <!-- Play (Center Button - Half Outside) -->
        <div class="footer-menu-item play-button-container">
          <button 
            @click="$emit('play')"
            class="play-button"
          >
            <img 
              src="@/assets/icons/play.png" 
              alt="Play" 
              class="play-image"
            />
          </button>
          <span class="play-text">Play</span>
        </div>

        <!-- Withdraw -->
        <button 
          @click="$emit('withdraw')"
          class="footer-menu-item"
        >
          <img 
            src="@/assets/icons/withdraw.png" 
            alt="Withdraw" 
            class="nav-image"
          />
          <span class="nav-text">Withdraw</span>
        </button>

        <!-- Contact -->
        <button 
          @click="$emit('contact')"
          class="footer-menu-item"
        >
          <img 
            src="@/assets/icons/contact.png" 
            alt="Contact" 
            class="nav-image"
          />
          <span class="nav-text">Contact</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomMenu',
  mounted() {
    console.log('✅ BottomMenu mounted!')
    console.log('Current route:', this.$route)
    console.log('Window width:', window.innerWidth)
  },
  emits: ['deposit', 'play', 'withdraw', 'contact'],
  methods: {
    isActive() {
      return this.$route.path === '/' || 
             (this.$route.name && this.$route.name.toLowerCase().includes('home'))
    }
  }
}
</script>

<style scoped>
/* Main container */
.bottom-menu-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 980px;
  z-index: 9999;
  padding: 0 20px;
}

/* Content wrapper with custom styling */
.bottom-menu-content {
  background: linear-gradient(to bottom, #6f010a, #360000);
  border-radius: 18px 18px 0 0;
  box-shadow: 0 0 20px -5px #000;
  border-top: 1px solid #fff;
  position: relative;
  overflow: visible;
}

/* Navigation layout */
.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  padding: 0 24px;
  position: relative;
}

/* Footer menu items using your exact CSS */
.footer-menu-item {
  flex-grow: 1;
  text-align: center;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 12px 8px 8px 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease;
  height: 80px;
  box-sizing: border-box;
}

.footer-menu-item:hover {
  transform: scale(1.1);
}

/* Navigation images */
.nav-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: auto;
}

/* Navigation text */
.nav-text {
  font-size: 12px;
  font-weight: 500;
  color: white;
  margin-top: auto;
}

/* Play button container - positioned to be half outside but with 25% width */
.play-button-container {
  position: relative;
  justify-content: flex-end;
}

.play-button-container .play-button {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* Play button styling - just the image, no background */
.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.2s ease;
}

.play-button:hover {
  transform: translateX(-50%) scale(1.1);
}

.play-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.play-text {
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.play-text {
  font-size: 12px;
  font-weight: 500;
  color: white;
  margin-top: 4px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .bottom-menu-container {
    padding: 0 10px;
  }
  
  .bottom-nav {
    padding: 0 8px;
  }
  
  .nav-item {
    min-width: 50px;
    padding: 6px 8px;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
  }
  
  .nav-text {
    font-size: 11px;
  }
  
  .play-button {
    width: 50px;
    height: 50px;
  }
  
  .play-icon {
    width: 24px;
    height: 24px;
  }
  
  .play-text {
    font-size: 11px;
  }
}

/* Ensure proper spacing for the page content above */
@media (max-width: 768px) {
  body {
    padding-bottom: 80px;
  }
}
</style>