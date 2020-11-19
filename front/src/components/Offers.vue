<template>
  <div class="container" style="height:100vh">
    panier : {{ articlesCount }}
    <div
      v-for="(item, index) in offers"
      v-bind:key="index"
    >
      {{ item.name }}
      {{ item.price }} €

      <input
        type="number"
        min="0"
        max="100"
        v-on:change="test($event, index)"
      />
    </div>
    <button type="button" v-on:click="passerCommande">
      passer la commande
    </button>
  </div>
</template>

<script>
export default {
  name: "Offers",
  props: {
    offers: {},
  },
  data() {
    return {
      offersClone: this.offers,
      articlesCount: 0,
    };
  },
  methods: {
    test(event, index) {
      if (event.target.value > 0 && this.offersClone[index].quantity == 0)
        this.articlesCount++;
      else if (event.target.value == 0) 
        if ( this.articlesCount >0)
          this.articlesCount--;

      this.offersClone[index].quantity = event.target.value;
    },
    passerCommande() {
      let filteredArticles = this.offersClone
        .filter((e) => e.quantity != 0)
        .map((e) => ({ ...e, quantity: parseInt(e.quantity) }));
      console.log(filteredArticles);
    },
  },
  created() {
    if (!this.offers) {
      this.$router.go(-1);
      return;
    }
    this.offersClone = this.offersClone.map((e) => {
      let { id, name, image, price } = e;
      return { id, name, image, price, quantity: 0 };
    });
  },
};
</script>

<style scoped>
.container {
  padding-top: 9%;
  max-width: 500px;
  margin: auto;
}
</style>