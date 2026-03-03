<template>
  <div v-if="chartData.datasets[0]?.data.length" class="chart-container">
		<Bar :data="chartData" :options="chartOptions" />
	</div>
    
  <LoadingBlock  v-else-if="assetsStore.loading"  text="Loading Data..." />
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { ref, onMounted, computed } from 'vue';
import { useAssetsStore} from '@/stores/assets';
import LoadingBlock from '@/components/LoadingBlock.vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const books = ref<string[]>([]);
const assetsStore = useAssetsStore();

onMounted(async () => {
	await assetsStore.fetchAssets();
});

const chartData = computed(() => ({
  labels: assetsStore.assets.map(asset => asset.name),
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
    data: assetsStore.assets.map(asset => Number(asset.volumeUsd24Hr))
  }]
}));

const chartOptions = ref({
  responsive: true,
  // Other Chart.js options like titles, scales, etc. can be added here
});
</script>
