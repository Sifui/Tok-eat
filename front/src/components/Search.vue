<template>
  <div id="searchPage" class="flex-container">
    <div id="results">
      <div v-for="(item, index) in results" v-bind:key="index" class="item">
        <div
          class="flex-container"
          @mouseover="flyToCoords(index)"
          v-on:click="$router.push(`/restaurant?id=${item.id}`)"
        >
          <div>
            <img
              src="https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/4a0d9e27-5789-480a-ae60-37f37c4a310e/6950719d-8878-495a-8d0a-8acbecff56d3.jpg"
              alt=""
            />
          </div>
          <div class="description">
            <div class="label yellow">
              TOKEN X{{ Math.round(Math.random() * 5 + 1) }}
            </div>
            <div class="bold">{{ item.name }}</div>
            <div class="subheading">{{ item.address }}</div>
            <div class="subheading">{{ item.phone_number }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="map" ref="mapElement" style="width: 500px"></div>
  </div>
</template>

<script>
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";

let L = window.L;
const provider = new OpenStreetMapProvider();

export default {
  name: "Search",
  props: {},
  data() {
    return {
      results: [],
      map: null,
      coords: [],
      markers: [],
    };
  },
  watch: {
    async $route() {
      this.coords = [];
      this.results = [];
      for (const m of this.markers) {
        this.map.removeLayer(m);
      }
      this.markers = [];
      this.initData();
    },
  },
  methods: {
    flyToCoords(index) {
      if (!(this.coords[index] && this.markers[index])) return;
      this.map.flyTo(this.coords[index]);
      this.markers[index].openPopup();
    },
    initData() {
      axios
        .get(
          `http://localhost:8081/restaurants/search/${this.$route.query.slug}`
        )
        .then(async (response) => {
          this.results = response.data;
          for (const res of this.results) {
            const data = await provider.search({ query: `${res.address}` });
            this.coords.push([data[0].y, data[0].x]);
            const currentMarker = this.coords.slice(-1)[0];

            this.markers.push(
              L.marker(currentMarker).addTo(this.map).bindPopup(res.name)
              //.openPopup()
            );
            //this.map.panTo(currentMarker);
          }
        });
    },
  },
  mounted() {
    this.map = new L.map(this.$refs["mapElement"]).setView(
      [48.8534, 2.3488],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    setTimeout(()=>{this.map.invalidateSize()},500)
    this.initData();
  },
};
</script>

<style scoped>
#searchPage {
  padding: 9% 0 0 0;
  justify-content: space-between;
  max-width: 80%;
  margin: auto;
}
#map {
  flex: 1;
  max-height: 75vh;
  min-height:40vh
}
#results {
  flex: 1;
}

img {
  max-width: 250px !important;
  padding: 10px;
}
.item {
  margin-top: 20px;
  border-bottom: 1px solid silver;
  padding: 10px 0 10px 0;
  margin-right: 20px;
}
.description {
  margin-left: 20px;
}
.item:hover {
  box-shadow: 0px 0px 5px 0px silver;
  cursor: pointer;
}
@media screen and (max-width: 1000px) {
  #searchPage {
    flex-direction: column;
  }
  #map {
    min-height: 500px !important;
  }
}
</style>