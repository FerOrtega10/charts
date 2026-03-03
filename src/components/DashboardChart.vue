<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Active Users',
        data: [400, 550, 450, 700, 800],
        borderColor: '#42b883',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 40vh;
  width: 100%;
}
</style>