<template>
  <div class="login-page">
    <div class="page-container">
      <div class="iframe-container">
        <iframe
          src="https://www.winbox.cloud/winbox-mobile-register/"
          frameborder="0"
          allowfullscreen
          :title="$t('login.iframeTitle')"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    // Update page title
    document.title = this.$t('login.pageTitle') || 'Login - Macau888';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('login.pageDescription') || 'Login to your Macau888 account and start playing.');
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  background: #100201;
  display: flex;
  flex-direction: column;
}

.page-container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.iframe-container {
  width: 100%;
  height: calc(100vh - 60px); /* Account for header height */
  min-height: 600px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 0 10px;
  }
  
  .iframe-container {
    height: calc(100vh - 70px);
    margin: 10px 0;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 0 5px;
  }
  
  .iframe-container {
    height: calc(100vh - 60px);
    margin: 5px 0;
    border-radius: 6px;
  }
}

/* Ensure iframe is responsive */
@media (max-width: 360px) {
  .iframe-container {
    height: calc(100vh - 50px);
    margin: 2px 0;
  }
}
</style>