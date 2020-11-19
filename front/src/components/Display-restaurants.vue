<template>
  <div>
    <section class="mainframe"> 
    <div>
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
    </section>
    <section>
    <h2 class="md-display-1 centered">Les sélections Tok'eat</h2>

    <div class="container">
      <md-card
        v-for="(item, index) in restaurants"
        v-bind:key="index"
        class="restaurant" @click.native="$router.push(`/restaurant?id=${item.id}`)"
      >
        <md-card-media>
          <img
            
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
    </section>
        <section>

    <div v-if="favoritesRestaurants.length">
      <h2 class="md-display-1 centered">Vos favoris</h2>

      <div class="container">
        <md-card
          v-for="(item, index) in favoritesRestaurants"
          v-bind:key="index"
          class="restaurant" @click.native="$router.push(`/restaurant?id=${item.id}`)"
        >
          <md-card-media>
            <img
              
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
    </section>

<section>
    <div
      style="max-width: 880px; margin: auto; font-size: 0.9rem;"
    >
      <h2 class="">Êtes-vous un restaurateur ?</h2>
      <div class="flex-container flex-wrap" >
        <img id="disclaimer-img"
          src="https://c.tfstatic.com/w_800,h_508,c_fill,g_auto:subject,q_auto,f_auto/w_400/tf-product/ContactPage/contactpage_background.png"
          alt=""
        />
        <div
          style="
            padding: 1.5rem;
            padding-top: 0;
            border: 1px solid silver;
            border-radius: 0.25rem;
            flex:1
          "
        >
          <h3><span>Inscrivez votre restaurant</span></h3>
          <p>
            <span
              >Donnez-nous plus de détails, et nous vous contacterons le plus
              rapidement possible</span
            >
          </p>
          <a href="#"><span class="">Voir plus d'informations</span></a>
          <h3>
            <span>Déjà client ?</span>
          </h3>
          <p>
            <span>Connectez-vous à Tok'eat dès maintenant</span>
          </p>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import UserServices from "../services/userServices";

export default {
  name: "Display-restaurants",
  props: {},
  data() {
    return {
      user: null,
      favoritesRestaurants: [],
      restaurants: [],
    };
  },
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
    UserServices.me()
      .then((user) => {
        console.log("vous etes deja connecté !");
        this.user = user.data;
        axios
          .get(
            `http://localhost:8081/client-restaurant/favorites/${this.user.id}`
          )
          .then((response) => {
            this.favoritesRestaurants = response.data;
          });
      })
      .catch(() => {
        console.log("pas connecté...");
      });
  },

  methods: {},
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
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
  margin-right: 10%;
  margin-left: 10%;
}
.md-card {
  margin: 20px;
  flex: 0 0 25%;
}
section{
  margin: 100px 0 0 0
}
#disclaimer-img{
  flex:1;
  height:auto;
  max-height:254px
}
</style>