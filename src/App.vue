<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-900 text-white">
    <Header @login="handleLogin" @register="handleRegister" />
    <main class="flex-1 pb-16 md:pb-0">
      <router-view />
    </main>
    <BottomMenu 
      @deposit="handleDeposit"
      @play="handlePlay"
      @withdraw="handleWithdraw"
      @contact="handleContact"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import BottomMenu from './components/BottomMenu.vue'

export default {
  name: 'App',
  components: {
    Header,
    BottomMenu
  },
  methods: {
    handleLogin() {
      console.log('Login clicked')
    },
    handleRegister() {
      console.log('Register clicked')
    },
    handleDeposit() {
      console.log('Deposit clicked')
    },
    handlePlay() {
      console.log('Play clicked')
    },
    handleWithdraw() {
      console.log('Withdraw clicked')
    },
    handleContact() {
      console.log('Contact clicked')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

/* Add Tailwind via CDN if not working - add this to your public/index.html */
/* <script src="https://cdn.tailwindcss.com"></script> */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Afacad', sans-serif;
}

body {
  font-family: 'Afacad', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #111827;
  color: white;
}

/* Essential Tailwind-like utility classes */
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-1 { flex: 1; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }
.hidden { display: none; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }

/* Grid */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Colors */
.bg-gray-800 { background-color: #1f2937; }
.bg-gray-900 { background-color: #111827; }
.bg-gray-600 { background-color: #4b5563; }
.bg-gray-700 { background-color: #374151; }
.bg-yellow-500 { background-color: #eab308; }
.bg-yellow-600 { background-color: #ca8a04; }
.bg-red-800 { background-color: #991b1b; }
.bg-red-900 { background-color: #7f1d1d; }
.text-white { color: white; }
.text-black { color: black; }
.text-yellow-500 { color: #eab308; }
.text-yellow-400 { color: #facc15; }
.text-gray-400 { color: #9ca3af; }
.text-gray-300 { color: #d1d5db; }
.border-yellow-500 { border-color: #eab308; }
.border-gray-700 { border-color: #374151; }

/* Spacing */
.space-x-2 > * + * { margin-left: 0.5rem; }
.space-x-4 > * + * { margin-left: 1rem; }
.space-x-6 > * + * { margin-left: 1.5rem; }
.space-x-8 > * + * { margin-left: 2rem; }
.space-y-2 > * + * { margin-top: 0.5rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-8 > * + * { margin-top: 2rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

/* Sizing */
.w-8 { width: 2rem; }
.h-8 { height: 2rem; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
.w-16 { width: 4rem; }
.h-16 { height: 4rem; }
.w-20 { width: 5rem; }
.h-20 { height: 5rem; }
.h-48 { height: 12rem; }

/* Padding */
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.py-20 { padding-top: 5rem; padding-bottom: 5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }

/* Margins */
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-16 { margin-bottom: 4rem; }
.mt-4 { margin-top: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Layout */
.max-w-3xl { max-width: 48rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-7xl { max-width: 80rem; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }

/* Typography */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.text-5xl { font-size: 3rem; }
.text-6xl { font-size: 3.75rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }

/* Borders */
.border { border-width: 1px; }
.border-2 { border-width: 2px; }
.border-t { border-top-width: 1px; }
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-full { border-radius: 9999px; }
.overflow-hidden { overflow: hidden; }

/* Effects */
.transition-colors { transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out; }
.transition-all { transition: all 0.3s ease; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }

/* Hover effects */
.hover\:bg-yellow-500:hover { background-color: #eab308; }
.hover\:bg-yellow-600:hover { background-color: #ca8a04; }
.hover\:text-black:hover { color: black; }
.hover\:text-yellow-400:hover { color: #facc15; }
.hover\:text-yellow-500:hover { color: #eab308; }
.hover\:border-yellow-500:hover { border-color: #eab308; }
.hover\:scale-105:hover { transform: scale(1.05); }

/* Gradients */
.bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to)); }
.bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to)); }
.from-gray-800 { --tw-gradient-from: #1f2937; }
.to-gray-900 { --tw-gradient-to: #111827; }
.from-red-800 { --tw-gradient-from: #991b1b; }
.to-red-900 { --tw-gradient-to: #7f1d1d; }
.from-red-600 { --tw-gradient-from: #dc2626; }
.to-yellow-600 { --tw-gradient-to: #ca8a04; }
.from-yellow-400 { --tw-gradient-from: #facc15; }
.to-red-500 { --tw-gradient-to: #ef4444; }

/* Gradient text */
.bg-clip-text { 
  background-clip: text; 
  -webkit-background-clip: text; 
  color: transparent; 
}

/* Responsive */
@media (min-width: 640px) {
  .sm\:flex-row { flex-direction: row; }
  .sm\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
}

@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .md\:text-5xl { font-size: 3rem; }
  .md\:text-6xl { font-size: 3.75rem; }
  .md\:pb-0 { padding-bottom: 0; }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\:px-8 { padding-left: 2rem; padding-right: 2rem; }
  .lg\:py-20 { padding-top: 5rem; padding-bottom: 5rem; }
  .lg\:text-4xl { font-size: 2.25rem; }
  .lg\:text-5xl { font-size: 3rem; }
  .lg\:text-6xl { font-size: 3.75rem; }
}

/* Bottom menu mobile spacing */
@media (max-width: 768px) {
  .pb-16 { padding-bottom: 4rem; }
  .bottom-0 { bottom: 0; }
  .left-0 { left: 0; }
  .right-0 { right: 0; }
  .z-50 { z-index: 50; }
}

/* Button styles */
button {
  cursor: pointer;
  border: none;
  outline: none;
  font-family: inherit;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Custom animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}
</style>