<template>
  <div v-if="isVisible" class="popup-overlay" @click="handleOverlayClick">
    <div class="popup" :class="{ 'with-animation': currentBannerIndex === 1 }" @click.stop>
      <div v-if="currentBannerIndex === 0" class="banner-container first-banner">
        <button class="close-btn first-banner" @click="closePopup">×</button>
        <img 
          :src="banners[0].src" 
          :alt="banners[0].alt"
          @click="navigateToRegister"
          style="cursor: pointer;"
        />
      </div>
      <div v-else class="banner-container black-background">
        <button class="close-btn second-banner" @click="closePopup">×</button>
        <img 
          :src="banners[1].src" 
          :alt="banners[1].alt"
          @click="navigateToRegister"
          style="cursor: pointer;"
        />
        <div class="button-container">
          <a 
            href="#" 
            class="download-button"
            @click.prevent="handleDownload"
          >
            OK
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue'
// Import images directly
import popupImg1 from '@/assets/popup1.jpeg'
import popupImg2 from '@/assets/popup2.jpeg'
import popupImg3 from '@/assets/popup3.jpeg'
import { useRouter } from 'vue-router'

const isVisible = ref(false)
const currentBannerIndex = ref(0)

// Use imported images
const banners = [
  { src: popupImg1, alt: 'Pop Up Banner 1' },
  { src: popupImg2, alt: 'Pop Up Banner 2' }
]

const openPopup = () => {
  isVisible.value = true
  currentBannerIndex.value = 0
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

const closePopup = () => {
  isVisible.value = false
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'
}

const handleOverlayClick = () => {
  // When clicking outside, change to the next banner
  currentBannerIndex.value++
  
  // If we've reached the end of banners, close the popup
  if (currentBannerIndex.value >= banners.length) {
    closePopup()
  }
}

const handleDownload = () => {
  // Add your download logic here
  closePopup()
}

// Check if it's the HomePage and show the popup only when page refreshes
onMounted(() => {
  if (window.location.pathname === "/") {
    openPopup()  // Only open on homepage refresh
  }
})

defineExpose({
  openPopup,
})

const router = useRouter()
const navigateToRegister = () => {
  closePopup()
  router.push('/register')
}
</script>
  
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
  overflow: hidden;
  scrollbar-width: none;
  cursor: pointer;
}
  
.popup {
  width: 570px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: auto;
  scrollbar-width: none;
  padding: 20px;
  cursor: default;
}

.popup.with-animation {
  animation: popup-bounce 0.5s ease forwards;
}

.banner-container {
  width: 100%;
  position: relative;
}
  
.banner-container img {
  max-width: 100%;
  height: auto;
}


.button-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.download-button {
  background-image: url("@/assets/slot_button.png");
  border-radius: 20px;
  color: white;
  padding: 10px 50px;
  text-decoration: none;
  font-weight: 300;
  text-transform: uppercase;
  background-position: center;
}

.download-button:hover{
  background-image:none;
}
  
.close-btn {
  background: none;
  border: none;
  font-size: 35px;
  color: #ccc;
  cursor: pointer;
  font-weight: 100;
  z-index: 10;
}

.close-btn.first-banner {
  position: fixed;
  top: 0px;
  right: 0px;
  color: #ccc;
  z-index: 1003;
  font-weight: 100;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  padding: 0;
  overflow: hidden;
  transition: color .1s ease-out;
  border: none;
  border-radius: 0;
  background: 0 0;
  color: #ccc;
  font-family: serif;
  font-size: 2.7em;
  line-height: 1.2;
  cursor: pointer;
}

.close-btn.second-banner {
  position: absolute;
  top: 0px;
  right: 0px;
  color: #ccc;
  z-index: 1003;
  font-weight: 100;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  padding: 0;
  overflow: hidden;
  transition: color .1s ease-out;
  border: none;
  border-radius: 0;
  background: 0 0;
  color: #ccc;
  font-family: serif;
  font-size: 2.7em;
  line-height: 1.2;
  cursor: pointer;
}

@keyframes popup-bounce {
  0% {
    transform: scale(0.7);
  }
  45% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>