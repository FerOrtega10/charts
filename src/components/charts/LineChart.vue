<template>
<div class="min-h-[inherit] flex flex-col gap-6 p-6">
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-bold text-gray-600">Select Cryptocurrency</label>
        <select 
          v-model="selectedAssetId" 
          @change="updateHistory"
          class="p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary outline-none"
        >
          <option v-for="asset in assetsStore.assets" :key="asset.id" :value="asset.id">
            {{ asset.name }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="assetsStore.assetHistory.length" class="h-96 w-full">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    
    <LoadingBlock v-else-if="assetsStore.loading" text="Fetching Historical Data..." />
    <div v-else class="text-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
      {{ selectedAssetId ? 'There`s no data for ' + selectedAssetId : 'Select an asset to view historical trends' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'vue-chartjs';
import { onMounted, ref, computed } from 'vue';
import LoadingBlock from '@/components/LoadingBlock.vue';
import { useAssetsStore } from '@/stores/assets';
import type { AssetHistory } from '@/types/index';


const selectedAssetId = ref<string>('bitcoin');
const assetsStore = useAssetsStore();
// const historyData = ref<AssetHistory[]>([]);

onMounted(async () => {
  await assetsStore.fetchAssets();
  await updateHistory()
});

const updateHistory = async () => {
  await assetsStore.fetchAssetHistory({ slug: selectedAssetId.value });
};


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const chartData = computed(() => ({
  labels: assetsStore.assetHistory.slice(assetsStore.assetHistory.length -10, assetsStore.assetHistory.length).map(point => new Date(point.time).toLocaleTimeString()),
  datasets: [{
    label: 'Market Cap (USD)',
    borderColor: '#f87979',
    fill: false,
    tension: 0.3,
    data: assetsStore.assetHistory.slice(assetsStore.assetHistory.length -10, assetsStore.assetHistory.length).map(point => Number(point.marketCapUsd)) // Using marketCapUsd as the data point
  }]
}));

const chartOptions = ref({
  responsive: true, 
});
</script>

