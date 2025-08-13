<template>
  <header class="bg-gradient-to-r from-red-800 to-red-900 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <span class="text-red-900 font-bold text-xl">M</span>
            </div>
            <span class="text-xl font-bold">MACAU888</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="hover:text-yellow-400 transition-colors duration-200"
            :class="{ 'text-yellow-400': $route.name === 'Home' }"
          >
            Home
          </router-link>
          <router-link 
            to="/games" 
            class="hover:text-yellow-400 transition-colors duration-200"
            :class="{ 'text-yellow-400': $route.name === 'Games' }"
          >
            Games
          </router-link>
          <router-link 
            to="/promotions" 
            class="hover:text-yellow-400 transition-colors duration-200"
            :class="{ 'text-yellow-400': $route.name === 'Promotions' }"
          >
            Promotions
          </router-link>
        </nav>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <div class="relative">
            <select 
              v-model="currentLocale"
              @change="changeLocale"
              class="bg-red-700 border border-red-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ms">Bahasa</option>
            </select>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-2">
            <button 
              @click="$emit('login')"
              class="bg-yellow-500 hover:bg-yellow-600 text-red-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Log In
            </button>
            <button 
              @click="$emit('register')"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Register
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden py-4 border-t border-red-700">
        <nav class="flex flex-col space-y-4">
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="hover:text-yellow-400 transition-colors duration-200 px-4 py-2"
            :class="{ 'text-yellow-400': $route.name === 'Home' }"
          >
            Home
          </router-link>
          <router-link 
            to="/games" 
            @click="closeMobileMenu"
            class="hover:text-yellow-400 transition-colors duration-200 px-4 py-2"
            :class="{ 'text-yellow-400': $route.name === 'Games' }"
          >
            Games
          </router-link>
          <router-link 
            to="/promotions" 
            @click="closeMobileMenu"
            class="hover:text-yellow-400 transition-colors duration-200 px-4 py-2"
            :class="{ 'text-yellow-400': $route.name === 'Promotions' }"
          >
            Promotions
          </router-link>
        </nav>
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
    closeMobileMenu() {
      this.showMobileMenu = false
    },
    changeLocale() {
      switchLocale(this.$router, this.currentLocale)
    }
  }
}
</script>