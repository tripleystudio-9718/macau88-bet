<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black">
    <!-- Hero Banner Section -->
    <section class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-r from-red-900/30 to-yellow-600/20"></div>
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 20px 20px;"></div>
      
      <!-- Main Hero Banner -->
      <div class="relative py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Hero Carousel/Banner -->
          <div class="relative bg-gradient-to-r from-red-800 to-red-900 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
              <h1 class="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Welcome to MACAU888
              </h1>
              <p class="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Experience the ultimate online casino with premium games, massive bonuses, and instant withdrawals
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button @click="handlePlayNow" class="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🎰 Play Now
                </button>
                <button @click="handleViewGames" class="bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                  🎮 View All Games
                </button>
              </div>
            </div>
            <!-- Decorative Elements -->
            <div class="absolute top-4 right-4 text-6xl opacity-20">🎰</div>
            <div class="absolute bottom-4 left-4 text-4xl opacity-20">💰</div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
              <div class="text-3xl mb-2">🎮</div>
              <div class="text-2xl font-bold text-yellow-400 mb-1">1000+</div>
              <div class="text-sm text-gray-300">Games</div>
            </div>
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
              <div class="text-3xl mb-2">👥</div>
              <div class="text-2xl font-bold text-yellow-400 mb-1">50K+</div>
              <div class="text-sm text-gray-300">Players</div>
            </div>
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
              <div class="text-3xl mb-2">💸</div>
              <div class="text-2xl font-bold text-yellow-400 mb-1">$10M+</div>
              <div class="text-sm text-gray-300">Won Today</div>
            </div>
            <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
              <div class="text-3xl mb-2">⚡</div>
              <div class="text-2xl font-bold text-yellow-400 mb-1">24/7</div>
              <div class="text-sm text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Game Categories Section -->
    <section class="py-16 bg-gray-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            Popular Game Categories
          </h2>
          <p class="text-xl text-gray-300">Choose your favorite way to win big</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="category in gameCategories" :key="category.id" 
               class="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-yellow-500 shadow-xl cursor-pointer"
               @click="navigateToGames(category.slug)">
            <div class="relative h-48 bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <span class="text-6xl relative z-10 group-hover:scale-110 transition-transform">{{ category.icon }}</span>
              <div class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ category.gameCount }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{{ category.name }}</h3>
              <p class="text-gray-400 mb-4 text-sm">{{ category.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-yellow-500 font-semibold">{{ category.popular }}</span>
                <button class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Why Choose MACAU888?</h2>
          <p class="text-xl text-gray-400">Join thousands of satisfied players worldwide</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.id" 
               class="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105 text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform">
              <span class="text-3xl">{{ feature.icon }}</span>
            </div>
            <h3 class="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">{{ feature.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Winners Section -->
    <section class="py-16 bg-gray-900/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            🏆 Latest Big Winners
          </h2>
          <p class="text-xl text-gray-300">Congratulations to our recent jackpot winners!</p>
        </div>

        <div class="bg-gray-800/50 rounded-xl border border-gray-700 p-6 overflow-hidden">
          <div class="space-y-4">
            <div v-for="winner in latestWinners" :key="winner.id" 
                 class="flex items-center justify-between py-4 px-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center">
                  <span class="text-xl">{{ winner.avatar }}</span>
                </div>
                <div>
                  <div class="font-semibold text-white">{{ winner.name }}</div>
                  <div class="text-sm text-gray-400">{{ winner.game }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xl font-bold text-yellow-400">${{ winner.amount.toLocaleString() }}</div>
                <div class="text-sm text-gray-400">{{ winner.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotions Preview -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">🎁 Hot Promotions</h2>
          <p class="text-xl text-gray-400">Don't miss out on these amazing offers</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div v-for="promo in featuredPromotions" :key="promo.id"
               class="bg-gradient-to-r from-red-800 to-red-900 rounded-xl overflow-hidden border border-red-700 hover:border-yellow-500 transition-colors shadow-xl group cursor-pointer"
               @click="navigateToPromotions">
            <div class="p-8">
              <div class="flex items-center mb-4">
                <span class="text-4xl mr-4">{{ promo.icon }}</span>
                <div>
                  <h3 class="text-2xl font-bold text-white">{{ promo.title }}</h3>
                  <span class="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">{{ promo.tag }}</span>
                </div>
              </div>
              <p class="text-gray-200 mb-6 text-lg">{{ promo.description }}</p>
              <button class="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 group-hover:scale-105">
                Claim Now
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <button @click="navigateToPromotions" class="bg-transparent border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300">
            View All Promotions
          </button>
        </div>
      </div>
    </section>

    <!-- Security & Trust Section -->
    <section class="py-16 bg-gray-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">🔒 Safe & Secure Gaming</h2>
          <p class="text-xl text-gray-400">Your security is our top priority</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="trust in trustFeatures" :key="trust.id" class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span class="text-2xl">{{ trust.icon }}</span>
            </div>
            <h4 class="font-bold text-white mb-2">{{ trust.title }}</h4>
            <p class="text-sm text-gray-400">{{ trust.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-20 bg-gradient-to-r from-red-800 to-red-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6 text-white">
          Ready to Win Big? 🚀
        </h2>
        <p class="text-xl text-gray-200 mb-8">
          Join MACAU888 today and get your welcome bonus up to $1000!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="handleRegister" class="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            🎁 Get Bonus Now
          </button>
          <button @click="handleLogin" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-10 py-4 rounded-lg font-bold text-xl transition-all duration-300">
            🔑 Login
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      gameCategories: [
        {
          id: 1,
          name: 'Slot Games',
          icon: '🎰',
          description: 'Classic and modern slot machines with progressive jackpots',
          gameCount: '500+',
          popular: 'Most Popular',
          slug: 'slots'
        },
        {
          id: 2,
          name: 'Live Casino',
          icon: '🃏',
          description: 'Real dealers, real-time gaming experience',
          gameCount: '50+',
          popular: 'Live Action',
          slug: 'live-casino'
        },
        {
          id: 3,
          name: 'Sports Betting',
          icon: '⚽',
          description: 'Bet on your favorite sports and teams',
          gameCount: '1000+',
          popular: 'Hot Matches',
          slug: 'sports'
        },
        {
          id: 4,
          name: 'Lottery Games',
          icon: '🎱',
          description: '4D, 6D and other lottery games with huge prizes',
          gameCount: '20+',
          popular: 'Big Jackpots',
          slug: 'lottery'
        },
        {
          id: 5,
          name: 'Fishing Games',
          icon: '🐟',
          description: 'Exciting arcade-style fishing adventures',
          gameCount: '30+',
          popular: 'Family Fun',
          slug: 'fishing'
        },
        {
          id: 6,
          name: 'Card Games',
          icon: '🎴',
          description: 'Poker, Blackjack, Baccarat and more',
          gameCount: '100+',
          popular: 'Classic Games',
          slug: 'cards'
        }
      ],
      features: [
        {
          id: 1,
          icon: '💰',
          title: 'Massive Bonuses',
          description: 'Welcome bonus up to $1000 plus daily cashback rewards and exclusive VIP perks for our loyal players.'
        },
        {
          id: 2,
          icon: '⚡',
          title: 'Instant Withdrawals',
          description: 'Lightning-fast deposits and withdrawals with multiple payment methods including crypto currencies.'
        },
        {
          id: 3,
          icon: '🎮',
          title: 'Premium Games',
          description: 'Over 1000+ premium games from top providers like Evolution, Pragmatic Play, and Microgaming.'
        }
      ],
      latestWinners: [
        {
          id: 1,
          name: 'Player***123',
          game: 'Mega Fortune',
          amount: 125000,
          time: '2 min ago',
          avatar: '👑'
        },
        {
          id: 2,
          name: 'Lucky***789',
          game: 'Blackjack VIP',
          amount: 45000,
          time: '5 min ago',
          avatar: '🎰'
        },
        {
          id: 3,
          name: 'Winner***456',
          game: 'Dragon Tiger',
          amount: 28000,
          time: '8 min ago',
          avatar: '🐉'
        },
        {
          id: 4,
          name: 'Jackpot***999',
          game: 'Lightning Roulette',
          amount: 67000,
          time: '12 min ago',
          avatar: '⚡'
        }
      ],
      featuredPromotions: [
        {
          id: 1,
          title: 'Welcome Bonus',
          icon: '🎁',
          tag: 'NEW PLAYER',
          description: 'Get 100% bonus on your first deposit up to $1000 plus 100 free spins!'
        },
        {
          id: 2,
          title: 'Daily Cashback',
          icon: '💸',
          tag: 'DAILY',
          description: 'Get up to 15% cashback on your daily losses. Play with confidence!'
        }
      ],
      trustFeatures: [
        {
          id: 1,
          icon: '🔐',
          title: 'SSL Encrypted',
          description: '256-bit encryption'
        },
        {
          id: 2,
          icon: '🏆',
          title: 'Licensed',
          description: 'Fully regulated'
        },
        {
          id: 3,
          icon: '💳',
          title: 'Secure Payment',
          description: 'Multiple methods'
        },
        {
          id: 4,
          icon: '🔄',
          title: 'Fair Gaming',
          description: 'RNG certified'
        }
      ]
    }
  },
  methods: {
    handlePlayNow() {
      this.$router.push('/games')
    },
    handleViewGames() {
      this.$router.push('/games')
    },
    handleRegister() {
      // Handle registration - could be modal or route
      this.$emit('register')
      console.log('Register clicked from home')
    },
    handleLogin() {
      // Handle login - could be modal or route
      this.$emit('login')
      console.log('Login clicked from home')
    },
    navigateToGames(category = '') {
      if (category) {
        this.$router.push(`/games?category=${category}`)
      } else {
        this.$router.push('/games')
      }
    },
    navigateToPromotions() {
      this.$router.push('/promotions')
    }
  }
}
</script>

<style scoped>
/* Additional custom styles for animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.group:hover .group-hover\:float {
  animation: float 2s ease-in-out infinite;
}

/* Custom gradient text animation */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom hover effects */
.hover-lift:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>