import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import BarChart from '@/components/charts/BarChart.vue'; // Adjust path
import { useAssetsStore } from '@/stores/assets';
import { type Asset } from '@/types/index';
import LoadingBlock from '@/components/LoadingBlock.vue';

// 1. Mock vue-chartjs so it doesn't try to render a real Canvas
vi.mock('vue-chartjs', () => ({
  Bar: {
    name: 'Bar',
    template: '<div id="mock-bar-chart"></div>',
    props: ['data', 'options'],
  },
}));

describe('BarChart.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(BarChart, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              assets: {
                assets: [],
                loading: true,
              },
            },
          }),
        ],
      },
    });
  });

  it('renders loading block when loading is true', async () => {
    const store = useAssetsStore();
    store.loading = true;
    store.assets = [];

    await wrapper.vm.$nextTick();
    
    const loadingComponent = wrapper.findComponent(LoadingBlock);
    expect(loadingComponent.exists()).toBe(true);
    expect(loadingComponent.props('text')).toBe('Loading Data...');
  });

  it('renders the Bar chart when data is available', async () => {
    const store = useAssetsStore();
    
    store.loading = false;
    const mockAssets: Partial<Asset>[] = [
      { id: '1', name: 'Bitcoin', volumeUsd24Hr: '1000' },
      { id: '2', name: 'Ethereum', volumeUsd24Hr: '500' }
    ];
    store.assets = mockAssets as Asset[];

    await wrapper.vm.$nextTick();
    const chart = wrapper.find('#mock-bar-chart');
    expect(chart.exists()).toBe(true);
    
    const barComponent = wrapper.findComponent({ name: 'Bar' });
    expect(barComponent.props('data').labels).toEqual(['Bitcoin', 'Ethereum']);
  });
});