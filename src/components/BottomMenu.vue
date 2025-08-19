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
            :alt="$t('nav.home')" 
            class="nav-image"
          />
          <span class="nav-text">{{ $t('nav.home') }}</span>
        </router-link>

 <!-- Deposit -->
<router-link :to="{ path:'/login', query:{ src:'deposit' } }" custom v-slot="{ navigate }">
  <button @click="navigate" class="footer-menu-item">
    <img src="@/assets/icons/deposit.png" :alt="$t('nav.deposit')" class="nav-image" />
    <span class="nav-text">{{ $t('nav.deposit') }}</span>
  </button>
</router-link>

<!-- Play (center) -->
<router-link :to="{ path:'/login', query:{ src:'play' } }" custom v-slot="{ navigate }">
  <div class="footer-menu-item play-button-container">
    <button @click="navigate" class="play-button">
      <img src="@/assets/icons/play.png" :alt="$t('nav.play')" class="play-image" />
    </button>
    <span class="play-text">{{ $t('nav.play') }}</span>
  </div>
</router-link>

<!-- Withdraw -->
<router-link :to="{ path:'/login', query:{ src:'withdraw' } }" custom v-slot="{ navigate }">
  <button @click="navigate" class="footer-menu-item">
    <img src="@/assets/icons/withdraw.png" :alt="$t('nav.withdraw')" class="nav-image" />
    <span class="nav-text">{{ $t('nav.withdraw') }}</span>
  </button>
</router-link>

<!-- Contact (external) -->
<a class="footer-menu-item"
   href="http://bit.ly/45oDZl4"
   target="_blank"
   rel="noopener">
  <img src="@/assets/icons/contact.png" :alt="$t('nav.contact')" class="nav-image" />
  <span class="nav-text">{{ $t('nav.contact') }}</span>
</a>

      </nav>
    </div>
  </div>
  <div class="bottom-menu-spacer" aria-hidden="true"></div>
</template>

<script>
export default {
  name: 'BottomMenu',
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false
    }
  },
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
:global(:root){ --bottom-menu-height: 70px; }

.bottom-menu-spacer{
  height: calc(var(--bottom-menu-height, 80px) + env(safe-area-inset-bottom, 0px));
}

.bottom-menu-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 890px;
  z-index: 50;
}

.bottom-menu-content {
  background: linear-gradient(to bottom, #6f010a, #360000);
  border-radius: 18px 18px 0 0;
  box-shadow: 0 0 20px -5px #000;
  border-top: 1px solid #fff;
  position: relative;
  overflow: visible;
}

.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: var(--bottom-menu-height, 80px);
  padding: 0 6px;
  position: relative;
}

.footer-menu-item {
  flex-grow: 1;
  text-align: center;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 8px 8px 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease;
  height: var(--bottom-menu-height, 70px);
  box-sizing: border-box;
}
.footer-menu-item:hover { transform: scale(1.1); }

.nav-image { width: 35px; height: 35px; object-fit: contain; margin-bottom: auto; }
.nav-text { font-size: 13px; font-weight: 700; color: white; margin-top: auto; }

.play-button-container { position: relative; justify-content: flex-end; }
.play-button-container .play-button {
  position: absolute; top: -44px; left: 50%; transform: translateX(-50%); z-index: 10;
}
.play-button {
  display: flex; align-items: center; justify-content: center;
  width: 100px; height: 100px; background: none; border: none; cursor: pointer;
  transition: transform 0.2s ease;
}
.play-button:hover { transform: translateX(-50%) scale(1.1); }
.play-image { width: 70px; height: 70px; object-fit: contain; }
.play-text { font-size: 12px; font-weight: 500; color: white; margin-top: 4px; text-shadow: 0 1px 2px rgba(0,0,0,.5); position: relative; z-index: 1; }

@media (max-width: 480px) {
  .bottom-menu-container { 
    padding: 0; 
    max-width: 100%;
  }
  
  .bottom-nav { 
    padding: 0 12px; 
    height: 70px;
  }
  
  .footer-menu-item {
    padding: 8px 4px 6px 4px;
    height: 70px;
    gap: 4px;
  }
  
  .nav-image { 
    width: 37px; 
    height: 37px; 
  }
  
  .nav-text { 
    font-size: 10px; 
    line-height: 1.2;
  }
  
  .play-button { 
    width: 50px; 
    height: 50px; 
    top: -20px !important;
  }
  
  .play-image { 
    width: 70px; 
    height: 70px; 
  }
  
  .play-text {
    font-size: 10px;
    margin-top: 2px;
  }
}

@media (max-width: 360px) {
  .bottom-nav { 
    padding: 0 8px; 
    height: 65px;
  }
  
  .footer-menu-item {
    padding: 6px 2px 4px 2px;
    height: 65px;
    gap: 3px;
  }
  
  .nav-image { 
    width: 28px; 
    height: 28px; 
  }
  
  .nav-text { 
    font-size: 9px; 
  }
  
  .play-button { 
    width: 70px; 
    height: 70px; 
    top: -35px;
  }
  
  .play-image { 
    width: 70px; 
    height: 70px; 
  }
}

:global(@media (max-width: 480px)){
  :root { --bottom-menu-height: 70px; }
}

:global(@media (max-width: 360px)){
  :root { --bottom-menu-height: 65px; }
}
</style>
