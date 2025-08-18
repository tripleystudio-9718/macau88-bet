<template>
  <!-- Header with dark red background matching the design -->
  <header id="top-header" class="text-white">
    <div class="nav-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <router-link :to="localePath('/')" class="logo-link">
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
        <router-link 
          :to="localePath('/register')"
          class="register-btn desktop-only"
        >
          <svg class="btn-icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          {{ $t('nav.register') }}
        </router-link>
        
        <router-link 
          :to="localePath('/login')"
          class="login-btn desktop-only"
        >
          <svg class="btn-icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          {{ $t('nav.login') }}
        </router-link>

        <!-- Tablet buttons - no icons, visible on tablet only -->
        <router-link 
          :to="localePath('/register')"
          class="register-btn tablet-only"
        >
          {{ $t('nav.register') }}
        </router-link>
        
        <router-link 
          :to="localePath('/login')"
          class="login-btn tablet-only"
        >
          {{ $t('nav.login') }}
        </router-link>

        <!-- Mobile buttons - compact design, visible only on mobile -->
        <router-link 
          :to="localePath('/register')"
          class="register-btn mobile-only"
        >
          {{ $t('nav.register') }}
        </router-link>
        
        <router-link 
          :to="localePath('/login')"
          class="login-btn mobile-only"
        >
          {{ $t('nav.login') }}
        </router-link>

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
import { getCurrentLocale, switchLocale, localePath, supportedLocales } from '@/router'
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
      supportedLanguages: [
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
      this.currentLocale = getCurrentLocale(this.$route)
      this.showMobileMenu = false
      this.$emit('mobile-menu-toggle', false)
    },
    showMobileMenu(newVal) {
      this.$emit('mobile-menu-toggle', newVal)
    }
  },
  methods: {
    checkScreenSize() {
      const width = window.innerWidth
      this.isMobile = width <= 480
      this.isTablet = width > 480 && width <= 768
    },

    // Use the imported localePath function
    localePath(path) {
      return localePath(path, this.currentLocale)
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
          this.$router.push(this.localePath('/'))
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
          this.$router.push(this.localePath('/register'))
          break
        case 'login':
          this.$router.push(this.localePath('/login'))
          break
        default:
          console.log('Menu item not handled:', menuItem)
      }
    },

    // Language
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown
    },
    selectLanguage(locale) {
      this.currentLocale = locale
      this.showLanguageDropdown = false
      switchLocale(this.$router, locale)
    },
    getLanguageLabel(locale) {
      const language = this.supportedLanguages.find(lang => lang.code === locale)
      return language ? language.label : locale
    },

    // Outside click
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
/* Enhanced mobile sticky positioning - Fixed for all mobile browsers */
#top-header {
  background: linear-gradient(to bottom, #360000, #6f010a);
  border-bottom: 1px solid #d7ad69;
  
  /* Enhanced sticky positioning for all browsers */
  position: -webkit-sticky; /* Safari support */
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  
  /* Force hardware acceleration and prevent layout issues */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  /* Ensure proper display context */
  display: block;
  
  /* Mobile-specific fixes */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  will-change: transform; /* Optimize for animations */
  
  /* Prevent margin collapse issues that can break sticky */
  margin: 0;
  padding: 0;
  
  /* Ensure it takes full width */
  left: 0;
  right: 0;
  
  /* Fix for some Android browsers */
  contain: layout style paint;
}

#top-header .nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 12px;
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
}

.logo-section {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 34px;
  width: auto;
  display: block;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* Button base styles - optimized for mobile */
.register-btn, .login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 1.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 11px;
  padding: 4px 10px;
  min-height: 28px;
  text-decoration: none;
}

.register-btn {
  background: linear-gradient(to right, #1745b2, #0091e8);
  color: white;
  min-width: 50px;
}

.login-btn {
  background: linear-gradient(to right, #61460f, #e2b76d);
  color: white;
  min-width: 45px;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .register-btn, .login-btn {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .register-btn:hover, .login-btn:hover {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

.register-btn:active, .login-btn:active {
  transform: scale(0.98);
}

.btn-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* Router link active states */
.register-btn.router-link-active,
.login-btn.router-link-active {
  opacity: 0.8;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Visibility classes for responsive design */
.desktop-only {
  display: none;
}

.tablet-only {
  display: none;
}

.mobile-only {
  display: flex;
}

/* Language selector - hidden on mobile by default */
.language-selector {
  display: none;
}

/* Mobile hamburger menu button */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  margin-left: 4px;
}

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .mobile-menu-btn {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .mobile-menu-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.mobile-menu-btn:active {
  transform: scale(0.95);
}

.hamburger-menu {
  width: 18px;
  height: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: white;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

/* Enhanced hamburger to X animation */
.mobile-menu-btn.active .hamburger-line-1 {
  transform: translateY(6px) rotate(45deg);
  background-color: #d7ad69;
}

.mobile-menu-btn.active .hamburger-line-2 {
  opacity: 0;
  transform: translateX(-20px);
}

.mobile-menu-btn.active .hamburger-line-3 {
  transform: translateY(-6px) rotate(-45deg);
  background-color: #d7ad69;
}

/* Mobile-specific optimizations for sticky positioning */
@media (max-width: 768px) {
  #top-header {
    /* Use viewport units for more reliable mobile behavior */
    min-height: 50px;
    height: auto;
    
    /* Additional mobile browser fixes */
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    
    /* Force GPU acceleration on mobile */
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    
    /* Ensure proper isolation */
    isolation: isolate;
  }
  
  #top-header .nav-container {
    /* Ensure flex container doesn't cause issues */
    min-height: 50px;
    height: auto;
  }
}

/* iOS Safari specific fixes */
@supports (-webkit-touch-callout: none) {
  #top-header {
    /* Additional iOS Safari sticky fixes */
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    isolation: isolate;
  }
}

/* Android Chrome specific fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  #top-header {
    /* Ensure proper rendering on Android */
    contain: layout;
  }
}

/* Tablet styles (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  #top-header .nav-container {
    height: 52px;
    padding: 0 16px;
  }
  
  .logo-image {
    height: 36px;
  }
  
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
    padding: 6px 14px;
    font-size: 13px;
    min-width: 65px;
    min-height: 30px;
  }
  
  .right-section {
    gap: 8px;
  }
  
  /* Show language selector on tablet */
  .language-selector {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
    font-size: 12px;
    color: white;
    position: relative;
  }
  
  .globe-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  
  .selected-language {
    font-size: 11px;
  }
}

/* Desktop styles (769px+) */
@media (min-width: 769px) {
  #top-header .nav-container {
    height: 54px;
    padding: 0 20px;
  }
  
  .logo-image {
    height: 38px;
  }
  
  .desktop-only {
    display: flex;
  }
  
  .tablet-only {
    display: none;
  }
  
  .mobile-only {
    display: none;
  }
  
  .register-btn, .login-btn {
    padding: 8px 16px;
    font-size: 14px;
    min-width: 120px;
    min-height: 32px;
    gap: 6px;
  }
  
  .btn-icon {
    width: 14px;
    height: 14px;
  }
  
  .right-section {
    gap: 10px;
  }
  
  /* Full language selector on desktop */
  .language-selector {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    font-size: 14px;
    color: white;
    position: relative;
  }
  
  .globe-icon {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
  
  .selected-language {
    font-size: 13px;
    user-select: none;
    white-space: nowrap;
  }
}

/* Language dropdown styles */
.custom-dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-menu {
  background-clip: padding-box;
  background-color: #fff;
  border: 1px solid #00000026;
  border-radius: 0.25rem;
  color: #212529;
  display: none;
  font-size: 0.9rem;
  list-style: none;
  margin: 0;
  min-width: 8rem;
  padding: 0.5rem 0;
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

/* Mobile-specific touch behavior - no hover effects */
@media (hover: none) and (pointer: coarse) {
  .dropdown-item {
    -webkit-tap-highlight-color: rgba(248, 249, 250, 0.5);
  }
}

/* Desktop hover effects */
@media (hover: hover) and (pointer: fine) {
  .dropdown-item:hover {
    background-color: #f8f9fa;
  }
}

.dropdown-item.active {
  background-color: #e9ecef;
  font-weight: 600;
}

/* Ultra-small screens optimization */
@media (max-width: 360px) {
  #top-header .nav-container {
    padding: 0 8px;
    height: 46px;
  }
  
  .logo-image {
    height: 30px;
  }
  
  .register-btn, .login-btn {
    padding: 3px 8px;
    font-size: 10px;
    min-width: 40px;
    min-height: 24px;
  }
  
  .right-section {
    gap: 3px;
  }
  
  .mobile-menu-btn {
    width: 28px;
    height: 28px;
    margin-left: 2px;
  }
  
  .hamburger-menu {
    width: 16px;
    height: 12px;
  }
}

/* Large screens optimization */
@media (min-width: 1200px) {
  #top-header .nav-container {
    padding: 0 24px;
  }
  
  .register-btn, .login-btn {
    min-width: 130px;
    padding: 8px 20px;
    font-size: 15px;
  }
}
</style>