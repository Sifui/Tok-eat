<template>
  <div class="index" md-theme="black">
    <cart
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
    };
  },
  created() {
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
    if (!this.$cookies.get("cart")) return
    const reservations = this.$cookies.get("cart")
    for (const item in reservations) {
      const currentReservation = this.$cookies.get("cart")[item]
      this.cartInfos.push(currentReservation)
    }
  },
  methods: {
    showCart(i) {
      this.display = i;
    },
    updateCart() {
      this.cartInfos = [];
      this.computedPrice = 0;
      setTimeout(() => {
        const reservations = Object.keys(this.$cookies.get("cart"))
        for (let i = 0;i < reservations.length;i++) {
          let currentRestaurant = this.$cookies.get("cart")[
            reservations[i]
          ];

          for (let article of currentRestaurant.articles) {
            this.computedPrice += article.price * article.quantity;
          }

          this.cartInfos.push(
            this.$cookies.get("cart")[reservations[i]]
          );
        }

        this.computedPrice =
          Math.round((this.computedPrice + Number.EPSILON) * 100) / 100;
        console.log("price:", this.computedPrice);
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