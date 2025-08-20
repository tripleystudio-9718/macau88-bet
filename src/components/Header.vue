<template>
  <!-- Header with dark red background matching the design -->
  <header id="top-header" class="text-white">
    <div class="nav-container">
      <!-- Logo Section - FIXED to use dynamic path -->
      <div class="logo-section">
        <router-link :to="pathFor('')" class="logo-link">
          <img 
            src="@/assets/macau888-logo.png" 
            alt="MACAU888" 
            class="logo-image"
          />
        </router-link>
      </div>

      <!-- Right Section -->
      <div class="right-section">
        <!-- Desktop buttons - with icons, hidden on mobile -->
        <button 
          @click="goRegister"
          class="register-btn desktop-only"
          type="button"
        >
          <svg class="btn-icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          {{ $t('nav.register') }}
        </button>
        
        <button 
          @click="goLogin"
          class="login-btn desktop-only"
        >
          <svg class="btn-icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          {{ $t('nav.login') }}
        </button>

        <!-- Tablet buttons - no icons, visible on tablet only - FIXED to use methods -->
        <button 
          @click="goRegister"
          class="register-btn tablet-only"
        >
          {{ $t('nav.register') }}
        </button>
        
        <button 
          @click="goLogin"
          class="login-btn tablet-only"
        >
          {{ $t('nav.login') }}
        </button>

        <!-- Mobile buttons - no icons, visible only on mobile - FIXED to use methods -->
        <button 
          @click="goRegister"
          class="register-btn mobile-only"
        >
          {{ $t('nav.register') }}
        </button>
        
        <button 
          @click="goLogin"
          class="login-btn mobile-only"
        >
          {{ $t('nav.login') }}
        </button>

        <!-- Language selector - hidden on mobile, visible on tablet and desktop -->
        <div class="language-selector" :class="{ 'tablet-compact': isTablet }">
          <svg class="globe-icon" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
          </svg>
          <div class="custom-dropdown" ref="languageDropdown" @click.stop="toggleLanguageDropdown">
            <span class="selected-language">{{ getLanguageLabel(currentLocale) }}</span>
            <div class="dropdown-menu" :class="{ 'show': showLanguageDropdown }" @click.stop>
              <div 
                v-for="locale in supportedLanguages" 
                :key="locale.code"
                class="dropdown-item" 
                :class="{ 'active': locale.code === currentLocale }"
                @click.stop="selectLanguage(locale.code)"
              >
                {{ locale.label }}
              </div>
            </div>
          </div>
        </div>

        <button 
          @click="toggleMobileMenu"
          class="mobile-menu-btn"
          :class="{ 'active': showMobileMenu }"
          aria-label="Toggle mobile menu"
        >
          <!-- Animated Burger to X Menu -->
          <div class="hamburger-menu">
            <span class="hamburger-line hamburger-line-1"></span>
            <span class="hamburger-line hamburger-line-2"></span>
            <span class="hamburger-line hamburger-line-3"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Component -->
    <MobileMenu 
      :isOpen="showMobileMenu" 
      @close="handleMobileMenuClose"
      @menu-click="handleMobileMenuClick"
    />
  </header>
</template>

<script>
import { getCurrentLocale, switchLocale, supportedLocales, defaultLocale } from '@/router'
import MobileMenu from './MobileMenu.vue'

export default {
  name: 'Header',
  components: { MobileMenu },
  emits: ['login', 'register', 'mobile-menu-toggle'],
  data() {
    return {
      showMobileMenu: false,
      currentLocale: 'th',
      showLanguageDropdown: false,
      isMobile: false,
      isTablet: false,
    }
  },
  computed: {
    supportedLanguages() {
      return [
        { code: 'th', label: this.$t('languages.thai') },
        { code: 'en', label: this.$t('languages.english') },
        { code: 'lo', label: this.$t('languages.lao') }
      ]
    }
  },
  mounted() {
    this.currentLocale = getCurrentLocale(this.$route)
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
    document.removeEventListener('click', this.handleClickOutside)
  },
  watch: {
    '$route'() {
      // Update currentLocale when route changes
      this.currentLocale = getCurrentLocale(this.$route)
      this.showMobileMenu = false
      this.$emit('mobile-menu-toggle', false)
    },
    showMobileMenu(newVal) {
      this.$emit('mobile-menu-toggle', newVal)
    },
    '$i18n.locale'(newLocale) {
      // Sync component locale with i18n locale
      console.log('Header: i18n locale changed to:', newLocale)
      this.currentLocale = newLocale
    }
  },
  methods: {
    checkScreenSize() {
      const width = window.innerWidth
      this.isMobile = width <= 480
      this.isTablet = width > 480 && width <= 768
    },

    // Helper method to generate paths with current locale
    pathFor(slug = '') {
      const loc = this.currentLocale || defaultLocale
      const prefix = loc === defaultLocale ? '' : `/${loc}`
      const tail = slug ? `/${slug}` : '/'
      const path = `${prefix}${tail}`.replace(/\/{2,}/g, '/')
      console.log('Header pathFor:', { slug, loc, prefix, tail, path })
      return path
    },

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },

    handleMobileMenuClose() {
      this.showMobileMenu = false
    },

    handleMobileMenuClick(menuItem) {
      console.log('Mobile menu clicked:', menuItem)
      switch(menuItem) {
        case 'home':
          this.goHome()
          break
        case 'deposit':
          this.$emit('deposit')
          break
        case 'withdraw':
          this.$emit('withdraw')
          break
        case 'contact':
          this.$emit('contact')
          break
        case 'register':
          this.goRegister()
          break
        case 'login':
          this.goLogin()
          break
        default:
          console.log('Menu item not handled:', menuItem)
      }
    },

    // Navigation helpers - all use pathFor for locale awareness
    goHome() {
      const path = this.pathFor('')
      console.log('Navigating to home:', path, 'Current locale:', this.currentLocale)
      this.$router.push(path).catch(() => {})
      this.showMobileMenu = false
    },

    goRegister() {
      const path = this.pathFor('register')
      console.log('Navigating to register:', path, 'Current locale:', this.currentLocale)
      this.$router.push(path).catch(() => {})
      this.$emit('register') // Keep event for analytics/parent listeners
      this.showMobileMenu = false
    },

    goLogin() {
      const path = this.pathFor('login')
      console.log('Navigating to login:', path, 'Current locale:', this.currentLocale)
      this.$router.push(path).catch(() => {})
      this.$emit('login')
      this.showMobileMenu = false
    },

    // Language dropdown methods
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown
    },

    selectLanguage(locale) {
      console.log('Header: Selecting language:', locale, 'Current:', this.currentLocale)
      this.showLanguageDropdown = false
      
      if (this.currentLocale !== locale) {
        // Update component locale first
        this.currentLocale = locale
        console.log('Header: Updated currentLocale to:', this.currentLocale)
        
        // Then switch the route
        switchLocale(this.$router, locale)
        
        // Force update to ensure UI reflects the change
        this.$nextTick(() => {
          console.log('Header: Force updating component')
          this.$forceUpdate()
        })
      }
    },

    getLanguageLabel(locale) {
      const language = this.supportedLanguages.find(lang => lang.code === locale)
      return language ? language.label : locale
    },

    // Outside click handler
    handleClickOutside(event) {
      const dropdown = this.$refs.languageDropdown
      if (dropdown && !dropdown.contains(event.target)) {
        this.showLanguageDropdown = false
      }
    }
  }
}
</script>

<style scoped>
/* Enhanced mobile-first CSS with improved sticky header */
#top-header {
  background: linear-gradient(to bottom, #360000, #6f010a);
  border-bottom: 1px solid #d7ad69;
  position: fixed; /* Changed from sticky to fixed for better browser support */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added shadow for better separation */
}

/* Add this class to your body or main content to prevent content from going under the header */
body {
  padding-top: 53px; /* Same as header height */
}

@media (max-width: 480px) {
  body {
    padding-top: 48px; /* Mobile header height */
  }
}

#top-header .nav-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 53px;
  padding: 0 16px;
  max-width: 980px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo-image {
  height: 38px;
  width: auto;
  transition: transform 0.3s ease;
}

/* Desktop hover effects for logo */
@media (hover: hover) and (pointer: fine) {
  .logo-link:hover {
    transform: scale(1.1);
  }
  
  .logo-link:hover .logo-image {
    transform: scale(1.05);
  }
}

.right-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Button base styles */
.register-btn, .login-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-content: center;
  white-space: nowrap;
}

.register-btn {
  background: linear-gradient(to right,#1745b2 ,#0091e8);
  color: white;
  width:130px;
  height:33px;
}

.login-btn {
  background: linear-gradient(to right, #61460f, #e2b76d);
  color: white;
  width:130px;
  height:32px;
}

.register-btn:hover, .login-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.btn-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Visibility classes */
.desktop-only {
  display: flex;
}

.tablet-only {
  display: none;
}

.mobile-only {
  display: none;
}

/* Tablet styles (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .tablet-only {
    display: flex;
  }
  
  .mobile-only {
    display: none;
  }
  
  .register-btn, .login-btn {
    padding: 6px 12px;
    font-size: 12px;
    min-width: 70px;
  }
  
  .right-section {
    gap: 6px;
  }
}

/* Mobile styles (≤480px) */
@media (max-width: 480px) {
  .desktop-only {
    display: none;
  }
  
  .tablet-only {
    display: none;
  }
  
  .mobile-only {
    display: flex;
  }
  
  .register-btn, .login-btn {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .right-section {
    gap: 6px;
  }
}

/* Language selector - HIDDEN on mobile */
.language-selector {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  position: relative;
}

.language-selector.tablet-compact {
  padding: 6px 10px;
  gap: 5px;
}

.globe-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

/* HIDE language selector on mobile */
@media (max-width: 480px) {
  .language-selector {
    display: none;
  }
}

.custom-dropdown {
  position: relative;
  cursor: pointer;
}

.selected-language {
  color: white;
  font-size: 13px;
  user-select: none;
  white-space: nowrap;
}

@media (min-width: 481px) and (max-width: 768px) {
  .selected-language {
    font-size: 12px;
  }
}

.dropdown-menu {
  background-clip: padding-box;
  background-color: #fff;
  border: 1px solid #00000026;
  border-radius: .25rem;
  color: #212529;
  display: none;
  font-size: 0.9rem;
  list-style: none;
  margin: 0;
  min-width: 8rem;
  padding: .5rem 0;
  position: absolute;
  text-align: left;
  z-index: 1000;
  top: 25px;
  right: -60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dropdown-menu.show {
  display: block;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  font-size: 12px;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.active {
  background-color: #e9ecef;
  font-weight: 600;
}

/* Enhanced Mobile Menu Button */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  margin-left: 6px;
}

.mobile-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.mobile-menu-btn:active {
  transform: scale(0.95);
}

.hamburger-menu {
  width: 20px;
  height: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  width: 100%;
  height: 1px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

/* Enhanced Burger to X Animation */
.mobile-menu-btn.active .hamburger-line-1 {
  transform: translateY(7px) rotate(45deg);
  background-color: #d7ad69;
}

.mobile-menu-btn.active .hamburger-line-2 {
  opacity: 0;
  transform: translateX(-20px);
}

.mobile-menu-btn.active .hamburger-line-3 {
  transform: translateY(-7px) rotate(-45deg);
  background-color: #d7ad69;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  #top-header .nav-container {
    padding: 0 12px;
    height: 48px;
  }
  
  .logo-image {
    height: 36px;
  }
  
  .mobile-menu-btn {
    width: 32px;
    height: 32px;
    padding: 4px;
    margin-left: 4px;
  }
  
  .hamburger-menu {
    width: 18px;
    height: 14px;
  }

  .register-btn, .login-btn {
    width: 80px;
  }
}

/* Ultra small screens */
@media (max-width: 360px) {
  .register-btn, .login-btn {
    padding: 3px 8px;
    font-size: 10px;
    min-width: 45px;
  }
  
  #top-header .nav-container {
    padding: 0 8px;
  }
  
  .right-section {
    gap: 3px;
  }
}
</style>