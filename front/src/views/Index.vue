<template>
  <div class="index" md-theme="black">
    <cart  :display="display" :infos="cartInfos" :price="computedPrice" style="z-index: 3" v-on:clearcookie="$cookies.set('cart',{});cartInfos=[]" v-on:updatecartinfos="updateCart" />
    <navbar :showSearchField="showSearchField" :display="display" style="z-index: 6;" v-on:showcart="showCart(1)" v-on:hidecart="showCart(0)" />
    <router-view style="z-index:1;padding-bottom:5%" v-bind:class="{router:active}" v-on:updatecart="updateCart"/>
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
      computedPrice: 0,
      active:true,
      showSearchField:false
    };
  },
  created() {
     if (window.scrollY < (window.innerHeight*100)/100 && this.$route.name == "display-restaurants") {
        this.showSearchField = false;
      } else {
        this.showSearchField = true;
      }
    if ( this.$route.name == 'display-restaurants')
    this.active = false
    else
          this.active = true
    window.addEventListener("scroll", () => {

      if (window.scrollY < (window.innerHeight*100)/100 && this.$route.name == "display-restaurants") {
        this.showSearchField = false;
      } else {
        this.showSearchField = true;
      }
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
      setTimeout(()=>{
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
      },0)
    }
  },
  watch: {
    async $route() {
      window.scrollTo(0, 0);
    if ( this.$route.name == 'display-restaurants')
    this.active = false
    else
          this.active = true

          if (window.scrollY < 800 && this.$route.name == "display-restaurants") {
        this.showSearchField = false;
      } else {
        this.showSearchField = true;
      }
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

.router
{
  padding-top:8%;
}

@media screen and (max-width: 1600px) {

  .router{
    padding-top:10%
  }
}
@media screen and (max-width: 1300px) {

  .router{
    padding-top:15%
  }
}
</style>