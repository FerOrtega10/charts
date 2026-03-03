import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('renders the MainView component', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          MainView: {
            template: '<div id="mock-main-view"></div>'
          }
        }
      }
    });

    expect(wrapper.find('#mock-main-view').exists()).toBe(true);
  });
});