<template>
  <div id="cartModal" v-bind:style="{ right: right }">
    <h1 class="title">Vos réservations ({{ formatPrice(totalPrice) }} €)</h1>
    <div
      v-for="item in infos"
      v-bind:key="item.restaurantId"
      style="margin-bottom: 40px; padding: 20px; box-shadow: 0 0 4px 0 silver"
    >
      <h2 class="subheading">{{ item.name }}</h2>
      <div
        class="item-description flex-container"
        v-for="offer in item.articles"
        v-bind:key="offer.id"
      >
        <select
          class="quantity-picker"
          v-on:change="
            updateCartInfos(
              $event.target.value,
              item.id,
              item.articles.indexOf(offer)
            )
          "
          v-if="render"
        >
          <option value="0">0</option>
          <template v-for="index in 100">
            <option
              v-if="index == offer.quantity"
              selected
              :value="index"
              v-bind:key="index"
            >
              {{ index }}
            </option>
            <option v-else :value="index" v-bind:key="index">
              {{ index }}
            </option>
          </template>
        </select>
        <span class="offer-name"> {{ offer.name }}</span>
        <span class="offer-price"> {{ offer.price }}€</span>
      </div>
    </div>
    <div class="centered" v-if="price != 0 || totalPrice != 0">
      <md-button @click="payement"> Procéder au paiement</md-button>
    </div>
    <div class="centered" v-if="$cookies.get('cart')">
      <md-button v-on:click="$emit('clearcookie')"> Vider le panier</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    display: Number,
    infos: Array,
    price: Number,
  },
  data() {
    return {
      totalPrice: 0,
      zIndex: -1,
      right: "-520px",
      render: true,
    };
  },
  created() {
    const infosKeys = Object.keys(this.infos);
    for (let i = 0; i < infosKeys.length; i++) {
      const currentRestaurantArticles = this.infos[Object.keys(this.infos)[i]]
        .articles;
      for (let j = 0; j < currentRestaurantArticles.length; j++)
        this.totalPrice +=
          currentRestaurantArticles[j].quantity *
          currentRestaurantArticles[j].price;
    }
    this.totalPrice =
      Math.round((this.totalPrice + Number.EPSILON) * 100) / 100;
  },
  methods: {
    updateCartInfos(valeur, restaurant, offre) {
      let p = this.$cookies.get("cart");
      this.totalPrice -=
        p[restaurant]["articles"][offre]["price"] *
        p[restaurant]["articles"][offre]["quantity"];
      this.totalPrice += valeur * p[restaurant]["articles"][offre]["price"];
      this.totalPrice =
        Math.round((this.totalPrice + Number.EPSILON) * 100) / 100;
      p[restaurant]["articles"][offre]["quantity"] = valeur;
      this.$cookies.set("cart", p);
    },
    formatPrice(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    },
    payement() {
      this.$router.push("/payement")
    },
  },
  watch: {
    display() {
      if (this.display) {
        this.right = "0px";
      } else {
        this.right = "-520px";
      }
    },
    price() {
      this.totalPrice = this.price;
    },
    infos() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
      //this.updateCartInfos()
    },
  },
};
</script>

<style scoped>
#cartModal {
  position: fixed;
  top: 100px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 30px;
  background-color: white;
  transition: right 0.5s ease;
  overflow: auto;
  max-height: 85vh;
}
.item-description {
  font-family: UberMoveText-Medium;
  font-size: 1.18em;
  margin: 10px 5px 10px 0;
}
.offer-name {
  margin-left: 10px;
}
.offer-price {
  margin-left: auto;
}
</style>