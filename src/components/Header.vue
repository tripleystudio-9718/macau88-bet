<template>
  <!-- <CHANGE> Updated header background to use linear gradient instead of solid color -->
  <header class="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white shadow-lg">
    <!-- ... existing code ... -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img 
              src="@/assets/macau888-logo.png" 
              alt="MACAU888" 
              class="h-8 w-auto"
            />
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">
          <button 
            @click="$emit('register')"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
          >
            Register
          </button>
          
          <button 
            @click="$emit('login')"
            class="bg-yellow-700 hover:bg-yellow-800 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
          >
            Log in
          </button>

          <div class="flex items-center space-x-1 px-3 py-2 text-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
            </svg>
            <!-- <CHANGE> Updated select options background to match new gradient -->
            <select 
              v-model="currentLocale"
              @change="changeLocale"
              class="bg-transparent border-none text-white focus:outline-none cursor-pointer appearance-none"
            >
              <option value="en" class="bg-red-800">English</option>
              <option value="zh" class="bg-red-800">中文</option>
              <option value="ms" class="bg-red-800">Bahasa</option>
            </select>
          </div>

          <button 
            @click="toggleMobileMenu"
            class="p-2 hover:bg-red-800 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { getCurrentLocale, switchLocale, supportedLocales } from '@/router'

export default {
  name: 'Header',
  emits: ['login', 'register'],
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
    }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    changeLocale() {
      switchLocale(this.$router, this.currentLocale)
    }
  }
}
</script>
