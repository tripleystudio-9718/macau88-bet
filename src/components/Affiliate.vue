<template>
  <div class="rebate-container">
    <h1 class="title">{{ $t('affiliate.title') }} <span class="highlight">MACAU888</span></h1>
    
    <div class="table-container">
      <div class="table-in">
        <div class="table-header">
          <div class="header-column">
            {{ $t('affiliate.game') }}
          </div>
          <div class="header-column">
            {{ $t('affiliate.rate') }}
          </div>
        </div>
        
        <div class="table-body">
          <div class="table-row" v-for="(item, index) in rebateData" :key="index">
            <div class="data-column game-name">
              {{ $t(`affiliate.games.${item.gameKey}`) }}
            </div>
            <div class="data-column percentage">
              {{ item.rate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Macau888RebateTable',
  data() {
    return {
      rebateData: [
        { gameKey: 'casino', rate: '0.2%' },
        { gameKey: 'slots', rate: '0.2%' },
        { gameKey: 'sports', rate: '0.2%' },
        { gameKey: 'lottery', rate: '5%' },
        { gameKey: 'lotteryDraw', rate: '5%' }
      ]
    }
  }
}
</script>

<style scoped>
.rebate-container {
  width: 980px;
  margin: 0 auto;
  background: #000;
  padding: 1rem 0;
  font-family: 'Arial', sans-serif;
}

.title {
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.highlight {
  color: #dc2626;
}

.table-container {
  margin: 0 auto;
  padding: 1rem .5rem;
  background: linear-gradient(to bottom, #a20313, #72000e);
  border-radius: .25rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.table-in {
  background-color: #92131d;
  border-radius: 4px;
}

.table-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 4px 4px 0 0;
}

.header-column {
  background-color: #cb2936;
  width: 50%;
  text-align: center;
  padding: .25rem;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;
}

.table-body {
  padding: 8px;
  padding-top: 0;
}

.table-row {
  display: flex;
}

.table-row:last-child {
  margin-bottom: 0;
}

.data-column {
  width: 50%;
  padding: .5rem;
  color: #fff;
  text-align: center;
  font-size: 16px;
}

.data-column.game-name {
  border-right: 1px solid white;
}

/* Responsive design */
@media (max-width: 1000px) {
  .rebate-container {
    width: 95%;
    padding: 20px 0;
  }
  
  .title {
    font-size: 28px;
  }
  
  .header-column,
  .data-column {
    font-size: 14px;
    padding: 12px 15px;
  }
}

@media (max-width: 600px) {
  .title {
    font-size: 24px;
  }
  
  .header-column,
  .data-column {
    font-size: 12px;
    padding: 10px 12px;
  }
}
</style>