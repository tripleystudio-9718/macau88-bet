<template>
  <div class="mobile-menu-overlay" v-if="isVisible" @click.self="closeMobileMenu">
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

    <!-- Language Switcher Section - Mobile Only -->
    <div 
      class="language-section mobile-only" 
      :class="{ 'fade-in': languageVisible }"
      @click.stop="toggleLanguageDropdown"
    >
      <div class="language-content">
        <svg class="globe-icon" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>
        <span class="current-language">{{ getLanguageLabel(currentLocale) }}</span>
        <svg class="dropdown-arrow" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      
      <!-- Language Dropdown -->
      <div class="language-dropdown" :class="{ 'show': showLanguageDropdown }" @click.stop>
        <div 
          v-for="language in supportedLanguages" 
          :key="language.code"
          class="language-option" 
          :class="{ 'active': language.code === currentLocale }"
          @click.stop="selectLanguage(language.code)"
        >
          {{ language.label }}
        </div>
      </div>
    </div>

    <!-- Menu Grid -->
    <div 
      class="menu-grid" 
      :class="{ 'fade-up': menuVisible }"
    >
      <!-- Home Link - FIXED -->
      <router-link 
        :to="homePath" 
        class="menu-item" 
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/home.png" :alt="$t('nav.home')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.home') }}</span>
      </router-link>

      <!-- Play Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'play' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'play' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/play.png" :alt="$t('nav.play')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.play') }}</span>
      </router-link>

      <!-- Withdraw Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'withdraw' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'withdraw' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/withdraw.png" :alt="$t('nav.withdraw')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.withdraw') }}</span>
      </router-link>

      <!-- Deposit Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'deposit' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'deposit' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/deposit.png" :alt="$t('nav.deposit')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.deposit') }}</span>
      </router-link>

      <!-- Affiliate Link - FIXED -->
      <router-link :to="affiliatePath" class="menu-item" @click="closeMobileMenu">
        <img src="@/assets/icons/affiliate.png" :alt="$t('nav.affiliate')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.affiliate') }}</span>
      </router-link>

      <!-- Promotions Link - FIXED -->
      <router-link :to="promotionsPath" class="menu-item" @click="closeMobileMenu">
        <img src="@/assets/icons/promotion.png" :alt="$t('nav.promotions')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.promotions') }}</span>
      </router-link>

      <!-- Cashback Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'cashback' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'cashback' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/cashback.png" :alt="$t('nav.cashback')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.cashback') }}</span>
      </router-link>

      <!-- History Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'history' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'history' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/history.png" :alt="$t('nav.history')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.history') }}</span>
      </router-link>

      <!-- Account Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'account' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'account' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/account-info.png" :alt="$t('nav.account')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.account') }}</span>
      </router-link>

      <!-- Lucky Wheel Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'luckywheel' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'luckywheel' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/lucky-wheel.png" :alt="$t('nav.luckyWheel')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.luckyWheel') }}</span>
      </router-link>

      <!-- Collect Points Link - FIXED -->
      <router-link
        :to="{ path: loginPath, query: { src: 'collectpoints' } }"
        class="menu-item"
        :class="{ 'is-active': $route.path.includes('/login') && $route.query.src === 'collectpoints' }"
        active-class=""           
        exact-active-class=""      
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/collect-point.png" :alt="$t('nav.collectPoints')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.collectPoints') }}</span>
      </router-link>

      <!-- Contact Link - External, no locale needed -->
      <a
        class="menu-item"
        :href="contactUrl"
        target="_blank"
        rel="noopener"
        @click="closeMobileMenu"
      >
        <img src="@/assets/icons/contact.png" :alt="$t('nav.contact')" class="menu-icon" />
        <span class="menu-label">{{ $t('nav.contact') }}</span>
      </a>

      <!-- Version Info -->
      <div 
        class="version-info" 
        :class="{ 'fade-up': menuVisible }"
      >
        v1.0.01
      </div>
    </div>
  </div>
</template>

<script>
import { localePath, getCurrentLocale, switchLocale, defaultLocale } from '@/router'

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
      languageVisible: false,
      menuVisible: false,
      currentLocale: 'th',
      showLanguageDropdown: false,
      contactUrl: 'http://bit.ly/45oDZl4',
      supportedLanguages: [
        { code: 'th', label: 'ภาษาไทย' },
        { code: 'en', label: 'English' },
        { code: 'lo', label: 'ລາວ' }
      ]
    }
  },
  computed: {
    // Dynamic paths based on current locale
    homePath() {
      return this.pathFor('')
    },
    affiliatePath() {
      return this.pathFor('affiliate')
    },
    promotionsPath() {
      return this.pathFor('promotions')
    },
    loginPath() {
      return this.pathFor('login')
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
    },
    '$route'() {
      // Update current locale when route changes
      this.currentLocale = getCurrentLocale(this.$route)
    },
    '$i18n.locale'(newLocale) {
      // Sync component locale with i18n locale
      console.log('MobileMenu: i18n locale changed to:', newLocale)
      this.currentLocale = newLocale
    }
  },
  mounted() {
    this.currentLocale = getCurrentLocale(this.$route)
  },
  methods: {
    // Helper method to generate paths with current locale
    pathFor(slug = '') {
      const loc = this.currentLocale || defaultLocale
      const prefix = loc === defaultLocale ? '' : `/${loc}`
      const tail = slug ? `/${slug}` : '/'
      const path = `${prefix}${tail}`.replace(/\/{2,}/g, '/')
      console.log('MobileMenu pathFor:', { slug, loc, prefix, tail, path })
      return path
    },

    getCurrentLocale() {
      return this.$route.meta?.locale || defaultLocale
    },
    
    getLanguageLabel(locale) {
      const language = this.supportedLanguages.find(lang => lang.code === locale)
      return language ? language.label : locale
    },
    
    openMobileMenu() {
      document.body.style.overflow = 'hidden'
      this.isVisible = true
      setTimeout(() => { this.showCircle = true }, 30)
      setTimeout(() => { this.circleExpanded = true }, 350)
      setTimeout(() => { this.headerVisible = true }, 850)
      setTimeout(() => { this.languageVisible = true }, 950)
      setTimeout(() => { this.menuVisible = true; this.backgroundVisible = true }, 1100)
    },
    
    closeMobileMenu() {
      this.menuVisible = false
      this.languageVisible = false
      this.headerVisible = false
      this.backgroundVisible = false
      this.circleExpanded = false
      this.showCircle = false
      this.isVisible = false
      
      document.body.style.overflow = 'auto'
      this.$emit('close')
    },
    
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown
    },
    
    selectLanguage(locale) {
      console.log('MobileMenu: Selecting language:', locale, 'Current:', this.currentLocale)
      this.showLanguageDropdown = false
      
      if (this.currentLocale !== locale) {
        // Update component locale first
        this.currentLocale = locale
        console.log('MobileMenu: Updated currentLocale to:', this.currentLocale)
        
        // Then switch the route
        switchLocale(this.$router, locale)
        
        // Force update to ensure UI reflects the change
        this.$nextTick(() => {
          console.log('MobileMenu: Force updating component')
          this.$forceUpdate()
        })
      }
      
      // Optional: close menu after language change
      // this.closeMobileMenu()
    },
    
    handleMenuClick(menuItem) {
      this.$emit('menu-click', menuItem)
      this.closeMobileMenu()
    }
  }
}
</script>

<style scoped>
/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow: hidden;
}

.expanding-circle {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: rgba(112, 20, 28, 0.9);
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
  background: rgba(0, 0, 0, 0.95);
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
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
  height: 52px;
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
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 52px;
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

/* Language Section - Mobile Only */
.language-section {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
  z-index: 9;
  display: none;
}

/* Show only on mobile devices */
@media (max-width: 768px) {
  .language-section.mobile-only {
    display: block;
  }
}

.language-section.fade-in {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.language-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(215, 173, 105, 0.3);
  border-radius: 25px;
  color: white;
  backdrop-filter: blur(10px);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  position: relative;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .language-content {
    -webkit-tap-highlight-color: rgba(215, 173, 105, 0.3);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .language-content:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(215, 173, 105, 0.5);
  }
  
  .language-section:hover .dropdown-arrow {
    transform: rotate(180deg);
  }
}

.globe-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.current-language {
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

/* Language Dropdown */
.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(215, 173, 105, 0.3);
  border-radius: 12px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  pointer-events: none;
  backdrop-filter: blur(10px);
}

.language-dropdown.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.language-option {
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.language-option:last-child {
  border-bottom: none;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .language-option {
    -webkit-tap-highlight-color: rgba(215, 173, 105, 0.2);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .language-option:hover {
    background: rgba(215, 173, 105, 0.2);
    color: #d7ad69;
  }
}

.language-option.active {
  background: rgba(215, 173, 105, 0.3);
  color: #d7ad69;
  font-weight: 600;
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
  padding: 60px 20px 40px;
  width: 50%;
  max-width: 480px;
  opacity: 0;
  transform: translate(-50%, -50%) translateY(50px);
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
  place-items: center;
}

.menu-grid.fade-up {
  opacity: 1;
  transform: translate(-50%, -72%) translateY(0);
}

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
  height: 92%;
  width: 90%;
  font-size: 1rem;
  list-style: none;
  aspect-ratio: 1.2;
  text-decoration: none;
  color: inherit;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .menu-item {
    -webkit-tap-highlight-color: rgba(215, 173, 105, 0.3);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .menu-item:hover {
    background: linear-gradient(to bottom, #61460f, #e2b76d);
    border-color: #d7ad69;
  }
  
  .menu-item:hover .menu-icon {
    transform: scale(1.1);
  }
  
  .menu-item:hover .menu-label {
    color: black;
  }
}

.menu-icon {
  width: 46px;
  height: 46px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
  object-fit: contain;
  flex-shrink: 0;
}

/* built-in exact class for non-login routes like "/", "/affiliate", "/promotions" */
.menu-item.router-link-exact-active{
  background: linear-gradient(to bottom, #61460f, #e2b76d);
  border-color:#d7ad69;
}
.menu-item.router-link-exact-active .menu-label{ color:black; font-weight:600; }
.menu-item.router-link-exact-active .menu-icon{ transform:scale(1.1); }

/* your custom class for the /login?src=... tiles */
.menu-item.is-active{
  background: linear-gradient(to bottom, #61460f, #e2b76d);
  border-color:#d7ad69;
}
.menu-item.is-active .menu-label{ color:black; font-weight:600; }
.menu-item.is-active .menu-icon{ transform:scale(1.1); }


.menu-label {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  margin-top: 0;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

/* Version Info */
.version-info {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
  transition-delay: 0.2s;
}

.version-info.fade-up {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Responsive Design */
@media (max-width: 980px) {
  .menu-grid {
    width: 50%;
    max-width: 50vw;
  }
}

@media (max-width: 768px) {
  .menu-grid {
    width: 70%;
    max-width: 70vw;
    padding: 60px 15px 30px;
  }

  .version-info {
    bottom: -30px;
  }

  .menu-grid.fade-up {
    transform: translate(-50%, -55%) translateY(0);
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
  
  .language-content {
    padding: 10px 16px;
  }
  
  .current-language {
    font-size: 15px;
  }
  
  .globe-icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .menu-grid {
    width: 100%;
    max-width: 100vw;
    padding: 10px;
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
  
  .language-section {
    top: 60px;
  }
  
  .language-content {
    padding: 8px 14px;
  }
  
  .current-language {
    font-size: 14px;
  }
  
  .globe-icon {
    width: 16px;
    height: 16px;
  }

}

@media (max-width: 360px) {
  .menu-grid {
    width: 95%;
    max-width: 95vw;
    padding: 45px 8px 15px;
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
  
  .language-section {
    top: 55px;
  }
  
  .language-content {
    padding: 6px 12px;
  }
  
  .current-language {
    font-size: 13px;
  }
  
  .globe-icon {
    width: 14px;
    height: 14px;
  }

  .version-info {
    bottom: 70px;
  }
}
</style>