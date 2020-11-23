<template>
  <div class="index" md-theme="black">
    <cart  :display="display" :infos="infos" :price="computedPrice" />
    <navbar style="z-index: 2" v-on:showcart="showCart(1)" v-on:hidecart="showCart(0)" />
    <router-view style="padding-top: 8%; padding-bottom: 5%; z-index: 1" v-on:updatecart="updateCart"/>
    <footerTokEat style="z-index: 1" />
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import footerTokEat from "../components/Footer";
import cart from "../components/modals/Cart";

export default {
  name: "Index",
  props: {},
  components: { navbar, footerTokEat, cart },
  data() {
    return {
      display: 0,
      scrolled: false,
      infos: [],
      computedPrice: 0
    };
  },
  created() {
    for ( let i = 0 ; i < Object.keys(this.$cookies.get("cart")).length;i++)
      {
        this.infos.push(this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]])
      }
    window.addEventListener("scroll", () => {
      if (!this.scrolled) {
        this.scrolled = true;
        this.display = 0;
        setInterval(()=>{this.scrolled = false;},1300)
        
      }
      
    });
  },
  methods: {
    showCart(i) {
      this.display = i;
    },
    updateCart(){
      this.infos = []
      this.computedPrice = 0
      for ( let i = 0 ; i < Object.keys(this.$cookies.get("cart")).length;i++)
      {
        let currentRestaurant = this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]]
        for ( let j = 0 ; j < Object.keys(currentRestaurant).length-1;j++)
        {
           for( let article in currentRestaurant[Object.keys(currentRestaurant)[j]] )
           {
                this.computedPrice += currentRestaurant[Object.keys(currentRestaurant)[j]][article].price* currentRestaurant[Object.keys(currentRestaurant)[j]][article].quantity
           }
        }
        this.infos.push(this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]])
      }
      this.computedPrice = Math.round((this.computedPrice + Number.EPSILON) * 100) / 100
    }
  },
  watch: {
    async $route() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
::selection {
  background: #000 !important;
}

.sidebar {
  height: 100%;
  border-right: 1px solid silver;
}
.sidebar > * {
  height: 100%;
}

.index {
  height: 100%;
}
</style>