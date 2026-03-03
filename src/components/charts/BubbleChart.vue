<template>
<div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <div v-if="filteredAssets.length" class="h-125">
      <Bubble :data="chartData" :options="chartOptions" />
    </div>

    <LoadingBlock v-else-if="assetsStore.loading" text="Fetching Crypto Market Data..." />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Bubble } from 'vue-chartjs';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale, LogarithmicScale 
} from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';
import { useAssetsStore } from '@/stores/assets';
import LoadingBlock from '@/components/LoadingBlock.vue';

// 1. Register LogarithmicScale for the Y-Axis
ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale, LogarithmicScale);

const assetsStore = useAssetsStore();
const selectedAssetId = ref<string | undefined>(undefined);

onMounted(async () => {
  await assetsStore.fetchAssets();

  if (assetsStore.assets.length > 0) {
    selectedAssetId.value = assetsStore.assets[0]?.id;
  }
});

const filteredAssets = computed(() => 
  assetsStore.assets.filter(asset => asset.id === selectedAssetId.value)
);

const PRESET_COLORS = [
  'rgba(248, 121, 121, 0.6)', 'rgba(124, 187, 0, 0.6)', 'rgba(0, 161, 228, 0.6)',
  'rgba(255, 185, 0, 0.6)', 'rgba(255, 94, 0, 0.6)', 'rgba(142, 63, 252, 0.6)',
  'rgba(0, 209, 255, 0.6)', 'rgba(20, 184, 166, 0.6)', 'rgba(236, 72, 153, 0.6)',
  'rgba(100, 116, 139, 0.6)'
];

const chartData = computed<ChartData<'bubble'>>(() => ({
  datasets: [{
    // label: 'Crypto Market Dynamics',
    //     backgroundColor: [
    //   'rgba(248, 121, 121, 0.6)', // Coral Red
    //   'rgba(124, 187, 0, 0.6)',   // Leaf Green
    //   'rgba(0, 161, 228, 0.6)',   // Sky Blue
    //   'rgba(255, 185, 0, 0.6)',   // Golden Yellow
    //   'rgba(255, 94, 0, 0.6)',    // Orange
    //   'rgba(142, 63, 252, 0.6)',  // Purple
    //   'rgba(0, 209, 255, 0.6)',   // Cyan
    //   'rgba(20, 184, 166, 0.6)',  // Teal
    //   'rgba(236, 72, 153, 0.6)',  // Pink
    //   'rgba(100, 116, 139, 0.6)'   // Slate
    // ],
    // borderColor: [
    //   'rgba(248, 121, 121, 1)', // Coral Red
    //   'rgba(124, 187, 0, 1)',   // Leaf Green
    //   'rgba(0, 161, 228, 1)',   // Sky Blue
    //   'rgba(255, 185, 0, 1)',   // Golden Yellow
    //   'rgba(255, 94, 0, 1)',    // Orange
    //   'rgba(142, 63, 252, 1)',  // Purple
    //   'rgba(0, 209, 255, 1)',   // Cyan
    //   'rgba(20, 184, 166, 1)',  // Teal
    //   'rgba(236, 72, 153, 1)',  // Pink
    //   'rgba(100, 116, 139, 1)'   // Slate
    // ],
    // hoverBackgroundColor: [
    //   'rgba(248, 121, 121, 1)', // Coral Red
    //   'rgba(124, 187, 0, 1)',   // Leaf Green
    //   'rgba(0, 161, 228, 1)',   // Sky Blue
    //   'rgba(255, 185, 0, 1)',   // Golden Yellow
    //   'rgba(255, 94, 0, 1)',    // Orange
    //   'rgba(142, 63, 252, 1)',  // Purple
    //   'rgba(0, 209, 255, 1)',   // Cyan
    //   'rgba(20, 184, 166, 1)',  // Teal
    //   'rgba(236, 72, 153, 1)',  // Pink
    //   'rgba(100, 116, 139, 1)'   // Slate
    // ],
    backgroundColor: assetsStore.assets.map((_, i) => PRESET_COLORS[i % PRESET_COLORS.length]),
      borderColor: assetsStore.assets.map((_, i) => PRESET_COLORS[i % PRESET_COLORS.length]?.replace('0.6', '1')),
    
    data: assetsStore.assets.map(asset => ({
      x: Number(asset.changePercent24Hr), // 24h change on X-axis
      y: Number(asset.priceUsd),          // Price on Y-axis
      r: Number(asset.marketCapUsd)/10000000000                               // Bubble size (fixed for simplicity)
    }))
  }]
}));

const chartOptions: ChartOptions<'bubble'> = {
  responsive: true,
  scales: {
    x: {
      title: { display: true, text: '24h Change (%)' },
      grid: { color: '#eee' }
    },
    y: {
      type: 'logarithmic', // Crucial for showing $0.10 and $90,000 together
      title: { display: true, text: 'Price (USD)' },
      min: 0.000001
    }
  },
  plugins: {
    legend: {
      display: true, // Shows "Crypto Market Assets"
      labels: {
        // Change the legend icon to a neutral gray to avoid "First Color" confusion
        generateLabels: (chart) => {
          return [{
            text: 'Market changes and prices of top crypto assets',
            fillStyle: 'white',   // Slate Gray
            strokeStyle: 'white',
            lineWidth: 1,
            hidden: false,
            index: 0,
            // Optional: you can define the shape
            pointStyle: 'circle'
        }];
        }
      }
    },
    tooltip: {
      callbacks: {
        // Show the asset name in the tooltip
        label: (context: any) => {
          const asset = assetsStore.assets[context.dataIndex];
          return `${asset?.name}: ${asset?.changePercent24Hr}% | $${Number(asset?.priceUsd).toFixed(2)}`;
        }
      }
    }
  }
};
</script>