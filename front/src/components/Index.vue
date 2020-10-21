<template>
  <div class="index" md-theme="black" >
    <md-toolbar md-elevation="4" >
      <img id="logo" src="../assets/logo.png" width="100" />
      <div class="nav-elements md-layout md-gutter">
        <div class="md-layout-item">
          <md-field>
            <label>Chercher un restaurant</label>
            <md-input v-model="query" id="search" v-on:keyup="fetchRestaurants"></md-input>
            <md-button >Rechercher</md-button>
             <div style="position:absolute;background-color:white;top:60px;width:100%">
                <p  style="padding:10px;margin:0" align="left" v-for="(suggestion,index) in suggestions" v-bind:key="index"> <a href="#" v-on:click="updateInput(suggestion.name)">{{suggestion.name}} </a> </p>
          </div>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-button class="nav-button">Connexion</md-button>
          <md-button class="nav-button">Inscription</md-button>
        </div>
      </div>
    </md-toolbar>
    <div class="mainframe md-accent">
      <div class="md-layout">
        <div class="md-layout-item md-size-3">
          <div id="slogan">
            Decouvrez et reservez le meilleur restaurant grâce à Tok'eat
          </div>
        </div>
        <div class="md-layout-item md-size-3">
          <img
            src="https://c.tfstatic.com/w_689,h_538,c_fill,g_auto:subject,q_auto,f_auto/tf-product/homepage-hero/fr-FR"
            alt=""
          />
        </div>
      </div>
    </div>
    <h1 class="md-display-1">Les sélections Tok'eat</h1>

    <div class="container">
      <md-card v-for="(item, index) in restaurants" v-bind:key="index">
        <md-card-media>
          <img
            src="https://breathe-restaurant.com/wp-content/uploads/2019/12/brEAThe-archi-1.jpeg"
            alt="People"
          />
        </md-card-media>
        <md-card-header>
          <div class="md-title name">{{ item.name }}</div>
          <div class="md-subhead address">{{ item.address }}</div>
          <div class="md-subhead phone">{{ item.phone_number }}</div>
        </md-card-header>
      </md-card>
      <!--
      <div class="md-layout-item md-size-20">
        <div class="sidebar">
          <md-list>
            Filtres

            <md-list-item>
              <span class="md-list-item">
                <md-checkbox>Pays</md-checkbox>
              </span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item">
                <md-checkbox>Villes</md-checkbox>
              </span>
            </md-list-item>
          </md-list>
        </div>
      </div>
      
      <div class="md-layout-item" id="map">
        <div id="map"></div>
      </div>
      -->
    </div>
  </div>
</template>

<script>

import axios from 'axios'
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

export default {
  name: "Index",
  props: {},
  data() {
    return {
      suggestions:[],
      query: "",
      restaurants: [
        {
          id: 0,
          name: "Neva Bradley",
          phone: "+1 (955) 462-2307",
          address: "290 Noble Street, Dowling, Montana, 3210",
        },
        {
          id: 1,
          name: "Burnett Arnold",
          phone: "+1 (962) 488-2588",
          address: "296 Montauk Court, Norris, Vermont, 5089",
        },
        {
          id: 2,
          name: "Scott Morin",
          phone: "+1 (957) 406-2633",
          address: "210 Horace Court, Riverton, Ohio, 1946",
        },
        {
          id: 3,
          name: "Goldie Tyler",
          phone: "+1 (940) 426-3255",
          address:
            "850 Moore Place, Brambleton, Federated States Of Micronesia, 778",
        },
        {
          id: 4,
          name: "Carson Atkins",
          phone: "+1 (894) 547-3013",
          address: "236 Putnam Avenue, Brookfield, Pennsylvania, 5664",
        },
        {
          id: 5,
          name: "Mia Wolf",
          phone: "+1 (830) 539-3086",
          address: "855 Baltic Street, Kenvil, Marshall Islands, 4034",
        },
       
      ],
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/restaurants")
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log("error when fetching the restaurants");
      });
  },
  methods:{
    fetchRestaurants(){
       let cloneRestaurants = [...this.restaurants];
      cloneRestaurants = cloneRestaurants.map((e) => ({...e,name:e.name.trim().toLowerCase()}));
      console.log(cloneRestaurants)
      const exp = `^${this.query.toLowerCase().trim()}`;
      const regex = new RegExp(exp);
      this.suggestions = cloneRestaurants.filter((element) =>
        regex.test(element.name)
      );
      console.log(this.suggestions);
    },updateInput(text)
      {
        this.query  = text
                  this.suggestions = []

      }
  },
  
};
</script>

<style lang="scss" scoped>


::selection{
  background : #000 !important
}
.md-toolbar + .md-toolbar {
  margin-top: 16px;
}
.md-card {
  margin: 20px;
  flex: 0 0 25%;
}
.container {
  width: 1000px;
  margin: auto;
  padding-top: 70px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap !important;
}
#slogan {
  color: #000;
  font-weight: 700;
  font-size: 2.125rem;
  line-height: 3.125rem;
  padding: 0 1rem;
  position: relative;
  top: 30%;
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
#logo {
}
.mainframe {
  padding-top: 11%;
  margin-right: 10%;
  margin-left: 10%;
}
.nav-button {
  margin-top: 15px;
  margin-bottom: 15px;
}
.name,
.address,
.phone {
  text-align: left;
}

p:hover{
  background-color:lightgrey;
  color:white;
  cursor: pointer;
}


</style>