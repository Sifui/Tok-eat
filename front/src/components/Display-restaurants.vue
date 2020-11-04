<template>
  <div>
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
    <h1 class="md-display-1 centered">Les sélections Tok'eat</h1>

    <div class="container">
      <md-card
        v-for="(item, index) in restaurants"
        v-bind:key="index"
        class="restaurant"
      >
        <md-card-media>
          <img
            v-on:click="$router.push(`/restaurant?id=${item.id}`)"
            src="https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/4a0d9e27-5789-480a-ae60-37f37c4a310e/6950719d-8878-495a-8d0a-8acbecff56d3.jpg"
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
    <h1 class="md-display-1 centered">Vos favoris</h1>

    <div class="container">
      <md-card v-for="(item, index) in favoritesRestaurants" v-bind:key="index" class="restaurant">
        <md-card-media>
          <img
            v-on:click="$router.push(`/restaurant?id=${item.id}`)"
            src="https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/4a0d9e27-5789-480a-ae60-37f37c4a310e/6950719d-8878-495a-8d0a-8acbecff56d3.jpg"
            alt="People"
          />
        </md-card-media>
        <md-card-header>
          <div class="md-title name">{{ item.name }}</div>
          <div class="md-subhead address">{{ item.address }}</div>
          <div class="md-subhead phone">{{ item.phone_number }}</div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserServices from "../services/userServices";

export default {
  name: "Display-restaurants",
  props: {
    restaurants: Array,
  },
  data() {
    return {
      user: null,
      favoritesRestaurants: [],
    };
  },
  created() {
    UserServices.me().then((user) => {
      console.log("vous etes deja connecté !");
      this.user = user.data;
      axios
        .get(
          `http://localhost:8081/client-restaurant/favorites/${this.user.id}`
        )
        .then((response) => {
          this.favoritesRestaurants = response.data;
        });
    }).catch(()=>{console.log('pas connecté...')});
  },

  methods: {},
};
</script>

<style scoped>
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
.restaurant:hover {
  cursor: pointer;
  box-shadow: 5px 5px 5px 1px silver;
}

.name,
.address,
.phone {
  text-align: left;
}

.mainframe {
  padding-top: 11%;
  margin-right: 10%;
  margin-left: 10%;
}
.md-card {
  margin: 20px;
  flex: 0 0 25%;
}

</style>