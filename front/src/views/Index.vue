<template>
  <div class="index" md-theme="black">
    <md-toolbar md-elevation="4">
      <img id="logo" src="../assets/logo.png" width="100" />
      <div class="nav-elements md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>Chercher un restaurant</label>
            <md-input
              v-model="query"
              id="search"
              v-on:keyup="fetchRestaurants"
            ></md-input>
            <md-button>Rechercher</md-button>
            <div
              style="
                position: absolute;
                background-color: white;
                top: 60px;
                width: 100%;
              "
            >
              <p
                v-on:click="updateInput(suggestion.name)"
                style="padding: 10px; margin: 0"
                align="left"
                v-for="(suggestion, index) in suggestions"
                v-bind:key="index"
              >
                {{ suggestion.name }}
              </p>
            </div>
          </md-field>
        </div>
        <div class="md-layout-item">
         <md-button class="nav-button" v-on:click="$router.push('/login')">Connexion</md-button>
         
          <md-button class="nav-button" v-on:click="$router.push('/register')">Inscription</md-button>
        </div>
      </div>
    </md-toolbar>
    <router-view :restaurants="restaurants"/>
    
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

export default {
  name: "Index",
  props: {},
  data() {
    return {
      suggestions: [],
       
      restaurants: [],
      query: "",
    };
  },
  
  methods: {
   fetchRestaurants() {
      let cloneRestaurants = [...this.restaurants];
      cloneRestaurants = cloneRestaurants.map((e) => ({
        ...e,
        name: e.name.trim()
      }));
      console.log(cloneRestaurants);
      const exp = `^${this.query.trim().toLowerCase()}`;
      const regex = new RegExp(exp);
      this.suggestions = cloneRestaurants.filter((element) =>
        regex.test(element.name.toLowerCase())
      );
      console.log(this.suggestions);
    },
    updateInput(text) {
      this.query = text;
      this.suggestions = [];
    },
  },
  
    created() {
   /* window.addEventListener("wheel",function(){
    console.log(window.scrollY)      
})*/
    axios
      .get("http://localhost:8081/restaurants")
      .then((response) => {
        const { data } = response;
        this.restaurants = data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
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
.md-toolbar + .md-toolbar {
  margin-top: 16px;
}

.md-toolbar {
  position: fixed;
  background-color: white !important;
  z-index: 10000;
  padding-bottom: 10px;
  padding-top: 10px;
}

.sidebar {
  height: 100%;
  border-right: 1px solid silver;
}
.sidebar > * {
  height: 100%;
}

.nav-elements.md-layout.md-gutter {
  flex: 1;
  text-align: right;
  margin-left: 10%;
}

.index {
  height: 100%;
}


.nav-button {
  margin-top: 15px;
  margin-bottom: 15px;
}


p:hover {
  background-color: lightgrey;
  color: white;
  cursor: pointer;
}
</style>