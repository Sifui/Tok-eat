<template>
  <div class="index" md-theme="black">
    <navbar v-bind:restaurants="restaurants" />
    <router-view :restaurants="restaurants" style="padding-top:11%;padding-bottom:5%" />
    <footerTokEat />

  </div>
</template>

<script>
import axios from "axios";
import navbar from "../components/Navbar";
import footerTokEat from "../components/Footer";
export default {
  name: "Index",
  props: {},
  components: { navbar , footerTokEat },
  data() {
    return {
      restaurants: [],
    };
  },

  methods: {},

  created() {
    axios
      .get("http://localhost:8081/client-restaurant/top-rated")
      .then((response) => {
        const { data } = response;
        this.restaurants = data;
      })
      .catch(() => {
        console.log("error when fetching the restaurants");
      });
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