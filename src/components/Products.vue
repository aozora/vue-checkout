<template>
  <tr v-for="product in products" track-by="id">
    <td>{{product.name}}</td>
    <td>{{product.description}}</td>
    <td>${{product.price}}</td>
    <td>
      <button @click='addToCart(product)' class='button is-info'>Add to cart</button>
    </td>
  </tr>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'products',
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts'
  }),

  methods: mapActions([
    'addToCart'
  ])
};
</script>
