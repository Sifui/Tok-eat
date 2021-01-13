<template>
  <div
    class="flex-container"
    style="min-height: 100vh; justify-content: center"
  >
    <div
      class="flex-container"
      style="flex-direction: column; flex: 0.9"
      v-if="categories.length"
    >
      <div v-for="(cat, ind) in offersClone" v-bind:key="ind">
        <h1 class="title" style="margin-left: 20px" v-if="categories[ind]">
          {{ categories[ind] }}
        </h1>
        <div class="flex-container flex-wrap">
          <md-card v-for="(item, index) in cat" v-bind:key="item.id">
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">{{ item.name }}</div>
                <div class="md-subhead">{{ item.price }} €</div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  v-on:change="test($event, ind, index)"
                />
              </md-card-header-text>

              <md-card-media md-big>
                <img
                  src="https://d1ralsognjng37.cloudfront.net/5efdd7d4-0ab2-4656-9973-aa0612b1e973.png"
                  alt="People"
                />
              </md-card-media>
            </md-card-header>
          </md-card>
        </div>
      </div>
      <div align="left">
        <md-button
          type="button"
          v-on:click="passerReservation"
          style="border: 1px solid silver"
        >
          ajouter une nouvelle réservation
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserServices from "../services/userServices";
export default {
  name: "Offers",
  props: {
    restaurant: Object,
    offers: Array,
  },
  data() {
    return {
      user: null,
      offersClone: this.offers,
      articlesCount: 0,
      categories: [],
    };
  },
  methods: {
    test(event, cat, index) {
      if (event.target.value > 0 && this.offersClone[cat][index].quantity == 0)
        this.articlesCount++;
      else if (
        event.target.value == 0 &&
        this.offersClone[cat][index].quantity > 0
      )
        if (this.articlesCount > 0) this.articlesCount--;

      this.offersClone[cat][index].quantity = event.target.value;
    },
    async passerReservation() {
      if (
        Object.keys(this.$cookies.get("cart")).length == 1 ||
        this.$cookies.get("cart")[this.restaurant.id]
      ) {
        alert("vous avez deja une reservation en cours");
        return;
      }
      if (!this.articlesCount) {
        alert("veuillez selectionner au moins un article...");
        return;
      }

      let filteredArticles = [];
      this.offersClone.forEach((element) => {
        let temp = element
          .filter((e) => e.quantity != 0)
          .map((e) => ({ ...e, quantity: parseInt(e.quantity) }));
        filteredArticles = filteredArticles.concat(temp);
      });

    if (this.user) {
        let currentBasket = await axios.post("http://localhost:8081/basket", {
          clientId: this.user.id,
        });
        currentBasket = currentBasket.data
        for (let i = 0; i < filteredArticles.length; i++) {
          await axios.post("http://localhost:8081/ordered_product", {
            quantity: filteredArticles[i].quantity,
            idBasket: currentBasket.id,
            idOffer: filteredArticles[i].id,
          });
        }
        this.$socket.emit('reservation',this.restaurant.id)
        this.$cookies.set("cart", {
        ...this.$cookies.get("cart"),
        [this.restaurant.id]: {
          articles: filteredArticles,
          id: this.restaurant.id,
          name: this.restaurant.name,
          idBasket:currentBasket.id
        },
      });
      
      this.$emit("updatecart");
      }

      
      
    },
  },
  created() {
    UserServices.me().then((user) => {
      this.user = user.data;
    });

    if (!this.offers) {
      this.$router.go(-1);
      return;
    }

    this.offersClone = this.offersClone.map((e) => {
      let { id, name, image, price, idcategory, categoryname } = e;
      return { id, name, image, price, idcategory, categoryname, quantity: 0 };
    });
    this.offersClone.sort((a, b) => a.idcategory - b.idcategory);

    let clone = [...this.offersClone];
    this.offersClone = [[]];

    for (let i = 0; i < clone.length - 1; i++) {
      this.offersClone[this.offersClone.length - 1].push(clone[i]);
      if (clone[i].idcategory != clone[i + 1].idcategory) {
        this.offersClone.push([]);
        this.categories.push(clone[i].categoryname);
      }
    }
    this.categories.push(clone[clone.length - 1].categoryname);
    //this.categories = Array.from(new Set(this.categories));
    this.offersClone[this.offersClone.length - 1].push(clone[clone.length - 1]);
  },
};
</script>

<style scoped>
.md-card {
  margin: 10px;
  flex: 1 1 16%;
}
</style>