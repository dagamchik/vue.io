<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info" v-if="totalCount === 1">
        {{ totalCount }} товар
      </span>
      <span class="content__info" v-else-if="totalCount >= 2">
        {{ totalCount }} товара(ов)
      </span>
    </div>
    <section class="cart">
      <div><EllipsisLoader v-if="loading" :color="'#54f1d2'" :loading="loading"/></div>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list" v-if="loading === false">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block" v-if="loading === false">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import EllipsisLoader from '@/preloader/preloader.vue';
import CartItem from '@/components/CartItem.vue';

export default {
  filters: { numberFormat },
  components: { CartItem, EllipsisLoader },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    loadCart() {
      this.loading = true;
      clearTimeout(this.loadCartProducts);
      this.loadCartProducts = setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalCount: 'cartTotalProducts' }),
  },
  created() {
    this.loadCart();
  },
};
</script>
