<script setup lang="ts">
import { ref, shallowRef } from 'vue';
// Import your components (assuming you've created these files)
import BarChart from '@/components/charts/BarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
// import RadarChart from '@/components/charts/RadarChart.vue';
import BubbleChart from '@/components/charts/BubbleChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';

// 1. Define the tabs and their associated components
// We use shallowRef for components to optimize performance
const tabs = [
  { name: 'Bar', component: BarChart },
  { name: 'Line', component: LineChart },
//   { name: 'Radar', component: RadarChart },
  { name: 'Bubble', component: BubbleChart },
  { name: 'Doughnut', component: DoughnutChart },
];

const activeTab = shallowRef(tabs[0]);

const selectTab = (tab: any) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="main-view space-y-4">
    <header>
      <h1 class="text-xl text-primary-dark font-display">Analytics Dashboard</h1>
      <p class="text-sm">Choose the chart you'd like to see! </p>
      <p class="text-sm">Each chart shows different data from different APIs in order to show the chart's implementations</p>
    </header>

    <nav class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.name"
        :class="['tab-btn', { active: activeTab?.name === tab.name }]"
        @click="selectTab(tab)"
      >
        {{ tab.name }}
      </button>
    </nav>

    <div class="chart-stage">
      <transition name="fade" mode="out-in">
        <component :is="activeTab?.component" :key="activeTab?.name" />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.main-view { padding: 24px; max-width: 1000px; margin: 0 auto; }

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  overflow-x: auto; /* Good for mobile */
}

.tab-btn {
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: var(--color-primary);
  border-bottom: 3px solid var(--color-primary);
}

.chart-stage {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  min-height: 400px;
}

/* Optional: Smooth transition when switching tabs */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>