<template>
  <div class="index" md-theme="black">
    <navbar v-bind:restaurants="restaurants" />
    <router-view :restaurants="restaurants" />
    <footerTokEat />

  </div>
</template>

<script>
/*var L = window.L;
setTimeout(function () {
  var map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
}, 0);*/
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
        console.log(response)
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