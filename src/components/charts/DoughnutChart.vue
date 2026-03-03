<template>
  <div v-if="chartData.datasets.length" class="chart-container">
		<Doughnut :data="chartData" :options="chartOptions" />
	</div>
    
  <LoadingBlock v-else text="Loading Data..." />
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, type ChartOptions } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { ref, onMounted, computed, shallowRef } from 'vue';
import { useAssetsStore} from '@/stores/assets';
import LoadingBlock from '@/components/LoadingBlock.vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const books = ref<string[]>([]);
const assetsStore = useAssetsStore();

onMounted(() => {
	assetsStore.fetchAssets()
});

const chartData = computed(() => ({
  labels: assetsStore.assets.map(asset => asset.name), // Assuming each asset has a 'name' property
  datasets: [{
    label: 'Coin trading activity in the last 24 hours (USD)',
        backgroundColor: [
      'rgba(248, 121, 121, 0.6)', // Coral Red
      'rgba(124, 187, 0, 0.6)',   // Leaf Green
      'rgba(0, 161, 228, 0.6)',   // Sky Blue
      'rgba(255, 185, 0, 0.6)',   // Golden Yellow
      'rgba(255, 94, 0, 0.6)',    // Orange
      'rgba(142, 63, 252, 0.6)',  // Purple
      'rgba(0, 209, 255, 0.6)',   // Cyan
      'rgba(20, 184, 166, 0.6)',  // Teal
      'rgba(236, 72, 153, 0.6)',  // Pink
      'rgba(100, 116, 139, 0.6)'   // Slate
    ],
    hoverBackgroundColor: [
      'rgba(248, 121, 121, 1)', // Coral Red
      'rgba(124, 187, 0, 1)',   // Leaf Green
      'rgba(0, 161, 228, 1)',   // Sky Blue
      'rgba(255, 185, 0, 1)',   // Golden Yellow
      'rgba(255, 94, 0, 1)',    // Orange
      'rgba(142, 63, 252, 1)',  // Purple
      'rgba(0, 209, 255, 1)',   // Cyan
      'rgba(20, 184, 166, 1)',  // Teal
      'rgba(236, 72, 153, 1)',  // Pink
      'rgba(100, 116, 139, 1)'   // Slate
    ],
    data: assetsStore.assets.map(asset => Number(asset.marketCapUsd)),
    hoverOffset: 4
  }]
}));

const chartOptions = shallowRef<ChartOptions<'doughnut'>>({
responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Top 10 Crypto Assets by Market Cap',
      font: { size: 18, weight: 'bold' },
      padding: { top: 10, bottom: 30 }
    },
    subtitle: {
      display: true,
      text: 'Calculated based on current circulating supply and price.',
      color: '#666',
      font: { size: 14, style: 'italic' },
      padding: { bottom: 20 }
    }
  }
})
</script>
