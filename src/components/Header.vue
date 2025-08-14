<template>
  <!-- Header with dark red background matching the design -->
  <header id="top-header" class="text-white">
    <div class="nav-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <img 
            src="@/assets/macau888-logo.png" 
            alt="MACAU888" 
            class="logo-image"
          />
        </router-link>
      </div>

      <!-- Right Section -->
      <div class="right-section">
        <button 
          @click="$emit('register')"
          class="register-btn"
        >
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
          </svg>
          Register
        </button>
        
        <button 
          @click="$emit('login')"
          class="login-btn"
        >
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          Log in
        </button>

        <div class="language-selector">
          <svg class="globe-icon" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
          </svg>
          <select 
            v-model="currentLocale"
            @change="changeLocale"
            class="language-dropdown"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="ms">Bahasa</option>
          </select>
        </div>

        <button 
          @click="toggleMobileMenu"
          class="mobile-menu-btn"
        >
          <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
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
import { getCurrentLocale, switchLocale, supportedLocales } from '@/router'
import MobileMenu from './MobileMenu.vue'

export default {
  name: 'Header',
  components: {
    MobileMenu
  },
  emits: ['login', 'register', 'mobile-menu-toggle'],
  data() {
    return {
      showMobileMenu: false,
      currentLocale: 'en'
    }
  },
  mounted() {
    this.currentLocale = getCurrentLocale(this.$route)
  },
  watch: {
    '$route'() {
      this.currentLocale = getCurrentLocale(this.$route)
      this.showMobileMenu = false
      this.$emit('mobile-menu-toggle', false)
    },
    showMobileMenu(newVal) {
      // Emit the mobile menu state to parent component
      this.$emit('mobile-menu-toggle', newVal)
    }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    handleMobileMenuClose() {
      this.showMobileMenu = false
    },
    handleMobileMenuClick(menuItem) {
      console.log('Mobile menu clicked:', menuItem)
      // Handle navigation or emit events based on menuItem
      switch(menuItem) {
        case 'home':
          this.$router.push('/')
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
        // Add more cases as needed
        default:
          console.log('Menu item not handled:', menuItem)
      }
    },
    changeLocale() {
      switchLocale(this.$router, this.currentLocale)
    }
  }
}
</script>

<style scoped>
/* Header styling with linear gradient background and border */
#top-header {
  background: linear-gradient(to bottom, #360000, #6f010a);
  border-bottom: 1px solid #d7ad69;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Main navigation container - using your exact CSS */
#top-header .nav-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 0 24px;
  max-width: 980px;
  margin: 0 auto;
}

/* Logo section */
.logo-section {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  width: auto;
}

/* Right section */
.right-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Register button - blue gradient like in the image */
.register-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #164bb7, #3b82f6);
  color: white;
  padding: 7px 20px;
  border-radius: 25px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 140px;
  justify-content: center;
}

/* Login button - golden brown gradient like in the image */
.login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg,#664b13, #dab067);
  color: white;
  padding: 7px 24px;
  border-radius: 25px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 140px;
  justify-content: center;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* Language selector */
.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  color: white;
}

.globe-icon {
  width: 16px;
  height: 16px;
}

.language-dropdown {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  appearance: none;
  font-size: 14px;
}

.language-dropdown option {
  background-color: #7f1d1d;
  color: white;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 6px;
}

.mobile-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-icon {
  width: 24px;
  height: 24px;
}

/* Responsive design */
@media (max-width: 768px) {
  #top-header .nav-container {
    padding: 0 16px;
  }
  
  .right-section {
    gap: 12px;
  }
  
  .register-btn,
  .login-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .btn-icon {
    display: none;
  }
}
</style>