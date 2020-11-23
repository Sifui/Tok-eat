<template>
  <div class="index" md-theme="black">
    <cart style="z-index: 3" :display="display" :infos="infos" />
    <navbar style="z-index: 2" v-on:showcart="showCart" />
    <router-view style="padding-top: 11%; padding-bottom: 5%; z-index: 1" v-on:updatecart="updateCart"/>
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
    };
  },
  created() {
    //console.log(this.infos)
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
    showCart() {
      this.display = 1;
    },
    updateCart(){
      this.infos = []
      for ( let i = 0 ; i < Object.keys(this.$cookies.get("cart")).length;i++)
      {
        this.infos.push(this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]])
      }
      //console.log("cookie en cours:", this.$cookies.get("cart"));
    }
  },
  watch: {
    async $route() {
      window.scrollTo(0, 0);
      /*this.infos = [];
      for ( let i = 0 ; i < Object.keys(this.$cookies.get("cart")).length;i++)
      {
        this.infos.push(this.$cookies.get("cart")[Object.keys(this.$cookies.get("cart"))[i]])
      }*/
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