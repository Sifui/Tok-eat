<template>
  <div class="index" md-theme="black">
    <cart  :display="display" :infos="cartInfos" :price="computedPrice" style="z-index: 3" />
    <navbar :display="display" style="z-index: 2" v-on:showcart="showCart(1)" v-on:hidecart="showCart(0)" />
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
      cartInfos: [],
      computedPrice: 0
    };
  },
  created() {
    
    window.addEventListener("scroll", () => {
      if (!this.scrolled) {
        this.scrolled = true;
        this.display = 0;
        setInterval(()=>{this.scrolled = false;},1300)
        
      }
      });
      if ( !this.$cookies.get('cart'))
        return
    for ( let i = 0 ; i < Object.keys(this.$cookies.get("cart")).length;i++)
      {
        this.cartInfos.push(this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]])
      }  
    
  },
  methods: {
    showCart(i) {
      this.display = i;
    },
    updateCart(){
      this.cartInfos = []
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
        this.cartInfos.push(this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]])
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