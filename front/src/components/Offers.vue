<template>
  <div class="container" style="height: 100vh">
    panier : {{ articlesCount }}
    <div v-for="(item, index) in offers" v-bind:key="index">
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
      ajouter une nouvelle commande
    </button>
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  name: "Offers",
  props: {
    restaurantId: Number,
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
      else if (event.target.value == 0 && this.offersClone[index].quantity > 0)
        if (this.articlesCount > 0) this.articlesCount--;

      this.offersClone[index].quantity = event.target.value;
    },
    async passerCommande() {
      if (!this.articlesCount) {
        alert("veuillez selectionner au moins un article...");
        return;
      }
      let filteredArticles = this.offersClone
        .filter((e) => e.quantity != 0)
        .map((e) => ({ ...e, quantity: parseInt(e.quantity) }));
      console.log("filtered:", filteredArticles);
      // creer une ligne dans la table basket
      // const result = await axios.post("http://localhost:8080/basket",{clientId:this.user.id})
      // creer une ligne pour chaque produit commandé dans la table ordered_product
      if (!this.$cookies.get("cart")) {
        this.$cookies.set("cart", { [this.restaurantId]: filteredArticles });
      } else {
        let p = this.$cookies.get("cart");
        // p[this.restaurantId] = filteredArticles;
        let found = false
        for (let i = 0; i < filteredArticles.length; i++) {
          for (let j = 0; j < p[this.restaurantId].length; j++) {
            if (p[this.restaurantId][j].id == filteredArticles[i].id){
              console.log(filteredArticles[i].id);
              p[this.restaurantId][j].quantity = filteredArticles[i].quantity
              found = true
            }
          }
          if ( !found){
               p[this.restaurantId].push(filteredArticles[i])
          }
          found = false
        }
        this.$cookies.set("cart", p);
      }
      console.log("cookie: ", this.$cookies.get("cart"));
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