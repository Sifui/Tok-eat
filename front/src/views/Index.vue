<template>
  <div class="index" md-theme="black">
    <cart
      :promos="promos"
      :display="display"
      :infos="cartInfos"
      :price="computedPrice"
      style="z-index: 7"
      v-on:clearcookie="
        $cookies.set('cart', {});
        cartInfos = [];
      "
      v-on:updatecartinfos="updateCart"
    />
    <navbar
      :showSearchField="showSearchField"
      :display="display"
      style="z-index: 6"
      v-on:showcart="showCart(1)"
      v-on:hidecart="showCart(0)"
    />
    <router-view
      style="z-index: 1; padding-bottom: 5%"
      v-bind:class="{ router: active }"
      v-on:updatecart="updateCart"
      v-on:clearcookie="
        $cookies.set('cart', {});
        cartInfos = [];
        computedPrice = 0;
      "
    />
    <footerTokEat style="z-index: 1" />
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import footerTokEat from "../components/Footer";
import cart from "../components/modals/Cart";
import promotionServices from "../services/promotionServices";

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
      active: true,
      showSearchField: false,
      promos:[]
    };
  },
  async created() {
    if ( !this.$cookies.get('cart'))
      this.$cookies.set('cart',{})
    if(this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]] && this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]].id)
    {
      await this.initPromos();
    }

   try{
         console.log(this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]].id)

    await this.$store.dispatch("fetchUser")
      //.then(() => this.$socket.open())
   } catch(err){
     console.log(err)
   }
    if (
      window.scrollY < (window.innerHeight * 100) / 100 &&
      this.$route.name == "display-restaurants"
    ) {
      this.showSearchField = false;
    } else {
      this.showSearchField = true;
    }
    if (this.$route.name == "display-restaurants") this.active = false;
    else this.active = true;
    window.addEventListener("scroll", () => {
      if (
        window.scrollY < (window.innerHeight * 100) / 100 &&
        this.$route.name == "display-restaurants"
      ) {
        this.showSearchField = false;
      } else {
        this.showSearchField = true;
      }
      if (!this.scrolled) {
        this.scrolled = true;
        this.display = 0;
        setInterval(() => {
          this.scrolled = false;
        }, 1300);
      }

    });
    if (!this.$cookies.get("cart")) return;
    const reservations = this.$cookies.get("cart");
    for (const item in reservations) {
      const currentReservation = this.$cookies.get("cart")[item];
      this.cartInfos.push(currentReservation);
    }
    this.updateCart()
  },
  methods: {
    async initPromos()
    {
      let promos = await promotionServices.getPromoByIdRestaurant2(this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]].id)
      this.promos = promos.data
    },
    promoPrice(offer)
    {
      //console.log(offer)
      for(let promo of this.promos) {
        if(offer.idPromo == promo.id)
        {
          //let test = (offer.price*(100-promo.percent)/100).toFixed(2)
          //console.log(test)
          return (offer.price*(100-promo.percent)/100).toFixed(2)
        }
      }
    },
    showCart(i) {
      this.display = i;
    },
    testDate(offer)
    {
      for(let promo of this.promos) {
        if(offer.idPromo == promo.id)
        {
          let date = new Date
          if(date.getMonth()+1 < 10)
          {
            date = String(date.getFullYear()) + "-0" + String(date.getMonth()+1) + "-" + String(date.getDate())
          }
          else{
            date = String(date.getFullYear()) + "-" + String(date.getMonth()+1) + "-" + String(date.getDate())
          }
          console.log(promo.date)
          console.log(date)
          if(promo.date > date)
          {
            return true
          }else
          {
            return false
          }
        }
      }
      return false
    },
    async updateCart() {
    if(this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]] && this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]].id)
    {
      await this.initPromos();
    }
      console.log("fonction curst")
      this.cartInfos = [];
      this.computedPrice = 0;
      setTimeout(() => {
        const reservations = Object.keys(this.$cookies.get("cart"));
        for (let i = 0; i < reservations.length; i++) {
          let currentRestaurant = this.$cookies.get("cart")[reservations[i]];

          for (let article of currentRestaurant.articles) {
            //this.computedPrice += article.price * article.quantity;
            if(article.idPromo && this.testDate(article))
            {
              this.computedPrice += this.promoPrice(article) * article.quantity;
            }
            else
            {
              this.computedPrice += article.price * article.quantity;
            }
          }
          this.cartInfos.push(this.$cookies.get("cart")[reservations[i]]);
        }

        this.computedPrice =
          Math.round((this.computedPrice + Number.EPSILON) * 100) / 100;
      }, 0);
    },
  },
  watch: {
    async $route() {
      window.scrollTo(0, 0);
      if (this.$route.name == "display-restaurants") this.active = false;
      else this.active = true;

      if (window.scrollY < 800 && this.$route.name == "display-restaurants") {
        this.showSearchField = false;
      } else {
        this.showSearchField = true;
      }
    },
  },
  sockets: {
    connect() {
      console.log("socket connected");
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

.router {
  padding-top: 8%;
}

@media screen and (max-width: 1600px) {
  .router {
    padding-top: 10%;
  }
}
@media screen and (max-width: 1300px) {
  .router {
    padding-top: 15%;
  }
}
</style>