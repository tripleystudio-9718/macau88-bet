<template>
  <div class="bottom-menu-container">
    <nav class="flex items-center justify-around h-16 px-4">
      <!-- Home -->
      <router-link 
        to="/" 
        class="flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200"
        :class="isActive() ? 'text-yellow-400 bg-red-700' : 'text-white hover:text-yellow-400'"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
        <span class="text-xs font-medium">Home</span>
      </router-link>

      <!-- Deposit -->
      <button 
        @click="$emit('deposit')"
        class="flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 text-white hover:text-yellow-400"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
        <span class="text-xs font-medium">Deposit</span>
      </button>

      <!-- Play (Center Button) -->
      <button 
        @click="$emit('play')"
        class="flex items-center justify-center w-14 h-14 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
      >
        <svg class="w-8 h-8 text-red-900" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Withdraw -->
      <button 
        @click="$emit('withdraw')"
        class="flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 text-white hover:text-yellow-400"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        <span class="text-xs font-medium">Withdraw</span>
      </button>

      <!-- Contact -->
      <button 
        @click="$emit('contact')"
        class="flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 text-white hover:text-yellow-400"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
        </svg>
        <span class="text-xs font-medium">Contact</span>
      </button>
    </nav>
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
.bottom-menu-container {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  background: linear-gradient(to right, #991b1b, #7f1d1d) !important;
  border-top: 1px solid #b91c1c !important;
  z-index: 9999 !important;
}

/* Ensure proper flex layout */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-around {
  justify-content: space-around;
}

.justify-center {
  justify-content: center;
}

.flex-col {
  flex-direction: column;
}

/* Text styles */
.text-white {
  color: white;
}

.text-yellow-400 {
  color: #facc15;
}

.text-red-900 {
  color: #7f1d1d;
}

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

/* Spacing */
.space-y-1 > * + * {
  margin-top: 0.25rem;
}

.h-16 {
  height: 4rem;
}

.h-14 {
  height: 3.5rem;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.w-14 {
  width: 3.5rem;
}

/* Padding */
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

/* Backgrounds */
.bg-red-700 {
  background-color: #b91c1c;
}

.bg-yellow-500 {
  background-color: #eab308;
}

.hover\:bg-yellow-600:hover {
  background-color: #ca8a04;
}

.hover\:text-yellow-400:hover {
  color: #facc15;
}

/* Border radius */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

/* Effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition-all {
  transition: all 0.2s ease;
}

.duration-200 {
  transition-duration: 200ms;
}

.transform {
  transform: translateZ(0);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Button reset */
button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
</style>