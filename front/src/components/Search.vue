<template>
  <div id="searchPage" class="flex-container">
    <div id="results">
        <div v-for="(item,index) in results" v-bind:key="index" class="item">
            
            <div class="flex-container">
                <div>
                    <img src="https://breathe-restaurant.com/wp-content/uploads/2019/12/brEAThe-archi-1.jpeg" alt="">
                </div>
                <div class="description">
                    <div class="label yellow">TOKEN X2</div>

                    <div class="bold">{{item.name}}</div>
                    <div class="subheading">{{item.address}}</div>

                    <div class="subheading">{{item.phone_number}}</div>

                 </div>
            </div>
        </div>
    </div>
    <div id="map"  ref="mapElement" style="width: 500px"></div>
  </div>
</template>

<script>
import axios from "axios";

let L = window.L;

export default {
  name: "Search",
  props: {},
  data() {
    return {
      results: [],
      map: null,
    };
  },
  watch: {
    async $route() {
      axios
      .get(`http://localhost:8081/restaurants/search/${this.$route.query.slug}`)
      .then((response) => {
        this.results = response.data;
        console.log(this.results);
      });
    },
  },
  methods: {},
   mounted() {
    console.log("wesh");

    this.map = L.map(this.$refs['mapElement']).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([51.5, -0.09])
      .addTo(this.map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
    axios
      .get(`http://localhost:8081/restaurants/search/${this.$route.query.slug}`)
      .then((response) => {
        this.results = response.data;
        console.log(this.results);
      });
  },
};
</script>

<style scoped>
#searchPage {
  padding-top: 11%;
  max-width: 80%;
  margin: auto;
  justify-content: space-between;
  height: 100%;
}
#map {
  height: 100%;
  flex:50%
}
#results {
    flex:50%
}

img
{
    max-width:250px !important;
    padding:10px
}
.item{
    margin-top:20px;
    border-bottom:1px solid silver;
    padding:10px 0 10px 0;
    margin-right:20px

}
.description{
    margin-left:20px
}
.item:hover{
    box-shadow: 1px 1px 10px 10px silver;
}
</style>