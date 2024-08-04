import { defineStore } from 'pinia';

// Definujeme nový store
export const MainStore = defineStore('main', {
  state: () => ({
    overlay: false,
  }),
  getters: {
    getOverlay: (state) => state.overlay,
  },
  actions: {
    toggleOverlayFalse() {
      this.overlay = false;
    },
    toggleOverlayTrue() {
      this.overlay = true;
    },
  },
});