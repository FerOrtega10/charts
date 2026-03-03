<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { ref } from 'vue';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Data One',
    backgroundColor: '#f87979',
    data: [40, 20, 12]
  }]
});

const chartOptions = ref({
  responsive: true,
  // Other Chart.js options like titles, scales, etc. can be added here
});
</script>
