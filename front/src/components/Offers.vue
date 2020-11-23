<template>
  <div class="container" style="min-height: 100vh">
    <div class="flex-container flex-wrap" style="justify-content:center">
     <md-card v-for="(item, index) in offers" v-bind:key="index">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ item.name }}</div>
          <div class="md-subhead">{{ item.price }} €</div>
          <input
        type="number"
        min="0"
        max="100"
        v-on:change="test($event, index)"
      />
        </md-card-header-text>

        <md-card-media md-big>
          <img src="https://d1ralsognjng37.cloudfront.net/5efdd7d4-0ab2-4656-9973-aa0612b1e973.png" alt="People">
        </md-card-media>
      </md-card-header>

    </md-card>
   
    </div>
    <div align="right" > 
      <md-button type="button" v-on:click="passerCommande" style="border:1px solid silver;">
      ajouter une nouvelle commande
    </md-button>
    </div>
    
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  name: "Offers",
  props: {
    restaurant: Object,
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
      // creer une ligne dans la table basket
      // const result = await axios.post("http://localhost:8080/basket",{clientId:this.user.id})
      // creer une ligne pour chaque produit commandé dans la table ordered_product
      if (!this.$cookies.get("cart")) {
        this.$cookies.set("cart", { [this.restaurant.id]: {articles:filteredArticles,restaurant:this.restaurant} });
      } else {
        if ( !this.$cookies.get("cart")[this.restaurant])
            this.$cookies.set("cart", { ...this.$cookies.get("cart"),[this.restaurant.id]: {articles:filteredArticles,restaurant:this.restaurant} });

        let p = this.$cookies.get("cart");
        // p[this.restaurant.id] = filteredArticles;
        let found = false
        for (let i = 0; i < filteredArticles.length; i++) {
          for (let j = 0; j < p[this.restaurant.id]['articles'].length; j++) {
            if (p[this.restaurant.id]['articles'][j].id == filteredArticles[i].id){
              p[this.restaurant.id]['articles'][j].quantity = filteredArticles[i].quantity
              found = true
            }
          }
          if ( !found){
               p[this.restaurant.id]['articles'].push(filteredArticles[i])
          }
          found = false
        }
        this.$cookies.set("cart", p);
      }
            this.$emit('updatecart')

    },
  },
  created() {
    if (!this.offers) {
      this.$router.go(-1);
      return;
    }

    this.offersClone = this.offersClone.map((e) => {
      let { id, name, image, price,idcategory } = e;
      return { id, name, image, price,idcategory, quantity: 0 };
    });
    this.offersClone.sort((a,b)=>a.category - b.category)
  },
};
</script>

<style scoped>
.container {
  padding-top: 9%;
  margin: 0 auto;
}
.md-card {
  margin: 10px;
  flex: 1 1 16%;
  
}
</style>