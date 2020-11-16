<template>
  <div id="searchPage" class="flex-container">
    <div id="results">
      <div class="pagination">
        <div class="pagination-item">&laquo;</div>
        <div
          v-on:click="test(i - 1)"
          class="pagination-item"
          v-for="i in results.length > 3 ? parseInt(results.length / 3) + 1 : 1"
          v-bind:key="i"
        >
          {{ i }}
        </div>

        <div class="pagination-item">&raquo;</div>
      </div>
      <div v-for="(item, index) in temp" v-bind:key="index" class="item">
        <div
          class="flex-container"
          @mouseover="flyToCoords(pagination * 3 + index)"
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
      temp: [],
      map: null,
      coords: [],
      markers: [],
      pagination: 0,
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
      this.pagination = 0;
      this.initData();
    },
  },
  methods: {
    test(index) {
      // (0,3) (3,6) (6,9) ...
      this.pagination = index;
      console.log(this.pagination);
      this.temp = this.results.slice(3 * index, 3 * index + 3);
      for ( let i = 0 ; i < document.getElementsByClassName('pagination-item').length;i++)
      {
        document.getElementsByClassName('pagination-item')[i].className= "pagination-item"
      }
      document.getElementsByClassName('pagination-item')[index+1].className+= " active"
    },
    flyToCoords(index) {
      console.log(index);
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
          this.temp = this.results.slice(0, 3);
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
        '&copy; <div href="https://www.openstreetmap.org/copyright">OpenStreetMap</div> contributors',
    }).addTo(this.map);
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
    this.initData();
            document.getElementsByClassName('pagination-item')[1].className+= " active"

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
  min-height: 75vh;
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

.pagination {
  display: inline-block;
}

.pagination .pagination-item {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagination .pagination-item.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination .pagination-item:hover:not(.active) {
  background-color: #ddd;
  cursor: pointer;
}

.pagination .pagination-item:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination .pagination-item:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>