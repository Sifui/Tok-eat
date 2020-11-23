<template>
  <div id="cartModal" v-bind:style="{ opacity: display }">
    <h1 class="title">Vos commandes ({{totalPrice}} euros)</h1>
    <div v-for="item in infos" v-bind:key="item.restaurantId" style="margin-bottom:50px">
      <h2>{{ item.restaurant.name }}</h2>
      <div v-for="offer in item.articles" v-bind:key="offer.id">
                  {{ offer.name }} {{offer.price}}€
        <select v-on:change="updateCartInfos($event.target.value,item.restaurant.id,item.articles.indexOf(offer))">
            <template v-for="index in 100" > 
                <option v-if="index==offer.quantity" selected :value="index" v-bind:key="index">{{ index }}</option>
                <option v-else :value=" index" v-bind:key="index">{{ index }}</option>
            </template>
        </select>
      </div>
    </div>
    <div align="center">
      <md-button> Procéder au paiement</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    display: Number,
    infos: Array,
  },
  data() {
    return {
        totalPrice:0
    };
  },
  created() {
      const infosKeys = Object.keys(this.infos)
      for ( let i = 0 ; i < infosKeys.length;i++)
      {
          const currentRestaurantArticles = this.infos[Object.keys(this.infos)[i]].articles
          for ( let j = 0 ; j  < currentRestaurantArticles.length;j++)
              this.totalPrice += currentRestaurantArticles[j].quantity * currentRestaurantArticles[j].price
      }
  },
  methods:{
      updateCartInfos(valeur,restaurant,offre)
      {
        this.$cookies.get('cart')[restaurant]['articles'][offre]['quantity'] = valeur
        let p = this.$cookies.get('cart')
        this.totalPrice -= p[restaurant]['articles'][offre]['price'] * p[restaurant]['articles'][offre]['quantity']
        this.totalPrice += valeur * p[restaurant]['articles'][offre]['price'] 
        p[restaurant]['articles'][offre]['quantity'] = valeur
        this.$cookies.set('cart',p)
      }
  }
};
</script>

<style scoped>
#cartModal {
  position: fixed;
  right: 120px;
  top: 100px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 30px;
  background-color: white;
  transition: opacity 0.2s linear;
}
select {
  width: 40px;
}
</style>