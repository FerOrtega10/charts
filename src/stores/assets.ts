import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Asset, type AssetHistory } from '@/types/index'

export const useAssetsStore = defineStore('assets', () => {
  const assets = ref<Asset[]>([])
  const assetHistory = ref<AssetHistory[]>([])
  const loading = ref(false)

  async function fetchAssets() {
    loading.value = true
    try {
      const url = 'https://rest.coincap.io/v3/assets';
      const response = await fetch(url);
      const data = await response.json();

      assets.value = data.data.slice(0, 10);
      // labels.value = Object.keys(data.cases);
			// covidCases.value = Object.values(data.cases) as number[];
			// covidDeaths.value = Object.values(data.deaths) as number[];
			// covidRecovered.value = Object.values(data.recovered) as number[];
    } catch (e) {
      console.error('Error importing ChartJS:', e);
    } finally {
      loading.value = false
    }
  }

  async function fetchAssetHistory(params: { slug: string }) {
    loading.value = true;
    try {
      const url = `https://rest.coincap.io/v3/assets/${params.slug}/marketcap-history`;
      const response = await fetch(url);
      const data = await response.json();
		assetHistory.value = data.data;
    } catch (e) {
      console.error('Error fetching asset history:', e);
    } finally {
      loading.value = false;
    }
  }

  return { assets, fetchAssets, loading, fetchAssetHistory, assetHistory }
})
