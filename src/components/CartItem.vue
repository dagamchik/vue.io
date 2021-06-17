<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120"
      :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id}}
    </span>

    <div class="product__counter form__counter">
      <button v-if="amount > 1" type="button" aria-label="Убрать один товар"
      @click.prevent="amount -= 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <button v-else-if="amount === 1" type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" disabled>

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount += 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price ) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины" @click.prevent="deleteFromCart">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '../config';

export default {
  data() {
    return {
      productData: null,
    };
  },
  filters: { numberFormat },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
      product() {
        return this.productData;
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProductData']),
    deleteFromCart() {
      this.deleteCartProductData({ productId: this.item.productId });
    },
    loadProduct() {
      axios.get(`${API_BASE_URL}/api/products/`)
        .then((response) => {
          this.productData = response.data;
        });
    },
  },
};
</script>
