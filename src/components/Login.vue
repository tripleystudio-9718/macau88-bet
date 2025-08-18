<template>
  <div class="register-overall">
    <div class="register-iframe-container">
      <iframe
        :src="iframeUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <div class="register-part1">
      <div class="register-qr-part1">
        <img
          :src="require('@/assets/register-qr.png')"
          :alt="$t('registerpage.qrAlt')"
          class="icon"
        />
        <button @click="downloadImage">{{ $t('registerpage.saveImage') }}</button>
      </div>
      <div class="register-qr-part2">
        <div class="register-qr-part2-1">
          <div class="h1">{{ $t('registerpage.scanTitle') }}</div>
          <p>{{ $t('registerpage.manualText') }}</p>
          <div class="h2">{{ $t('registerpage.referrer') }}</div>
        </div>
        <div class="register-details">
          <div class="register-details1">
            <img :src="require('@/assets/register-1.png')" :alt="$t('registerpage.imgAlt1')" class="icon" />
            <p>{{ $t('registerpage.desc1') }}</p>
          </div>
          <div class="register-details2">
            <img :src="require('@/assets/register-2.png')" :alt="$t('registerpage.imgAlt2')" class="icon" />
            <p>{{ $t('registerpage.desc2') }}</p>
          </div>
          <div class="register-details3">
            <img :src="require('@/assets/register-3.png')" :alt="$t('registerpage.imgAlt3')" class="icon" />
            <p>{{ $t('registerpage.desc3') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const iframeUrl = ref('https://www.winbox.cloud/winbox-mobile-register/');

    const addRegisterPageSchema = () => {
      // Remove existing schema if any
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Create new schema script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "name": "Winbox.io",
            "alternateName": "Winbox",
            "url": "https://www.winbox.io/"
          },
          {
            "@type": "Organization",
            "name": "Winbox",
            "url": "https://www.winbox.io/"
          },
          {
            "@type": "Casino",
            "@id": "https://www.winbox.io/#localbusiness",
            "name": "Winbox",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "MY"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "paymentAccepted": "Credit Card, Debit Card, Wire Transfer, Cryptocurrency",
            "url": "https://www.winbox.io/"
          },
          {
            "@type": "WebPage",
            "@id": "https://www.winbox.io/sign-up",
            "url": "https://www.winbox.io/sign-up",
            "name": "Winbox Sign Up – Join Malaysia's Trusted Crypto Casino",
            "description": "Sign up at Winbox and start playing with crypto. Register in minutes, deposit USDT instantly, and enjoy a secure, player-first platform for online betting.",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://www.winbox.io/"
            }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.winbox.io/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sign Up",
                "item": "https://www.winbox.io/sign-up"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Winbox Sign Up"
              }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What documents do I need to sign up on Winbox?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No documents are required at registration. Only mobile verification is needed to start. Additional verification may be needed for higher withdrawal limits."
                }
              },
              {
                "@type": "Question",
                "name": "Can I sign up using international numbers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Winbox accepts users from multiple regions. You may use any valid mobile number to sign up, including Singapore or Indonesia numbers."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a registration fee?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, registering an account on Winbox is completely free. You only need to deposit when you're ready to play."
                }
              },
              {
                "@type": "Question",
                "name": "How fast can I withdraw after signing up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Withdrawals are typically processed within 5–15 minutes after your first successful deposit and gameplay. Higher amounts may require additional verification."
                }
              },
              {
                "@type": "Question",
                "name": "Can I change my phone number later?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, but you must contact support and verify ownership of both your old and new number. It is a security step to protect your funds."
                }
              }
            ]
          }
        ]
      });
      
      document.head.appendChild(script);
    };

    onMounted(() => {
      addRegisterPageSchema();
    });

    return { iframeUrl };
  },
  methods: {
    downloadImage() {
      const imageUrl = require('@/assets/register-qr.png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'register-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style scoped>
.register-overall {
  display: flex;
  justify-content: left;
  align-items: start;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  gap: 50px;
  padding: 22px;
}

.register-iframe-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

iframe {
  width: 100%;
  height: 100vh;
  border-radius: 48px;
  border: none;
}

.register-part1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 80px;
  width: 100%;
}

.register-qr-part1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 30%;
}

.register-qr-part1 button {
  background-color: #1B243A;
  width: 70%;
  height: 45px;
  border-radius: 8px;
  font-family: Rubik, sans-serif;
  color: #FFFF;
  font-size: 20px;
  font-weight: 400;
}

.register-qr-part2 {
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  gap: 40px;
  width: 70%;
}

.register-qr-part2 .h1 {
  font-family: Rubik, sans-serif;
  color: #949598;
  font-size: 30px;
  font-weight: 500;
}

.register-qr-part2 p,
.register-qr-part2 .h2 {
  font-family: Rubik, sans-serif;
  color: #FFFF;
}

.register-qr-part2 p {
  font-size: 18px;
  font-weight: 100;
}

.register-qr-part2 .h2 {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
}

.register-details1,
.register-details2,
.register-details3 {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  gap: 10px;
}

.register-details1 img,
.register-details2 img,
.register-details3 img {
  width: 22%;
}

.register-qr-part2-1,
.register-details {
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  gap: 20px;
}

@media screen and (max-width: 768px) {
  .register-overall {
    width: 100%;
    /* padding: 15px; */
    padding: 0px;
    gap: 30px;
  }

  .register-iframe-container {
    height: 88vh;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .register-iframe-container iframe {
    transform: scale(0.8);
    transform-origin: top left;
    width: 125%;
    height: 110vh;
    border-radius: 0px;
    border: none;
  }

  .register-part1 {
    gap: 40px;
    flex-direction: column;
  }

  .register-qr-part1 {
    width: 100%;
  }

  .register-qr-part1 img {
    width: 50%;
  }

  .register-qr-part1 button {
    width: 50%;
    font-size: 16px;
    height: 40px;
  }

  .register-qr-part2 {
    width: 100%;
    gap: 25px;
    align-items: left;
  }

  .register-qr-part2-1 {
    align-items: center;
    text-align: left;
    gap: 8px;
  }

  .register-qr-part2 .h1 {
    font-size: 18px;
    text-align: left;
  }

  .register-qr-part2 p,
  .register-qr-part2 .h2 {
    font-size: 14px;
    text-align: left;
  }

  .register-details1 img,
  .register-details2 img,
  .register-details3 img {
    width: 40%;
  }

  .register-details1,
  .register-details2,
  .register-details3 {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

body.light-mode .register-qr-part2 p, 
body.light-mode .register-qr-part2 .h2 {
  color: #444343; 
}
</style>