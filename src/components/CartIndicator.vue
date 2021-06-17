<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
      <SpinnerLoader v-if="loading" :color="'#54f1d2'" :loading="loading"/>
    <span v-if="loading === false" class="header__count" aria-label="Количество товаров">
      {{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
import SpinnerLoader from '@/preloader/preloaderForIndicator.vue';

export default {
  components: {
    SpinnerLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    loadIndicator() {
      this.loading = true;
      clearTimeout(this.loadCartTimer);
      this.loadCartTimer = setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  created() {
    this.loadIndicator();
  },
};
</script>
