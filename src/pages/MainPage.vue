<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
    <ProductFilter
    :price-from.sync="filterPriceFrom"
    :price-to.sync="filterPriceTo"
    :category-id.sync="filterCategoryId"
    :colorId.sync="filterColor"
    />
      <section class="catalog">
        <div><EllipsisLoader v-if="loading" :color="'#54f1d2'" :loading="loading"/></div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать еще раз</button></div>
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import EllipsisLoader from '@/preloader/preloader.vue';
import API_BASE_URL from '../config';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, EllipsisLoader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 60000,
      filterCategoryId: 0,
      page: 1,
      productsPerPage: 3,
      filterColor: null,
      productsData: null,
      productsLoadingFailed: false,
      loading: false,
    };
  },
  computed: {

    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.loading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor,
            },
          })
          .then((response) => {
            this.productsData = response.data;
            console.log(response.data);
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.loading = false;
          });
      }, 2000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
