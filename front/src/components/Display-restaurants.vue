<template>
  <div>
    <div
      class="mainframe flex-container"
      v-bind:style="{ backgroundImage: 'url(' + background + ')' }"
    >
      <div style="margin: auto">
        <div id="slogan">
          Decouvrez et reservez le meilleur restaurant grâce à Tok'eat
        </div>
      </div>
    </div>
    <section>
      <h2 class="md-display-1 centered">Les sélections Tok'eat</h2>

      <div class="container flex-container">
        <md-card
          v-for="(item, index) in restaurants"
          v-bind:key="index"
          class="restaurant"
          @click.native="$router.push(`/restaurant?id=${item.id}`)"
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

        <div class="container flex-container">
          <md-card
            v-for="(item, index) in favoritesRestaurants"
            v-bind:key="index"
            class="restaurant"
            @click.native="$router.push(`/restaurant?id=${item.id}`)"
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
      <div style="max-width: 880px; margin: auto; font-size: 0.9rem">
        <h2 class="">Êtes-vous un restaurateur ?</h2>
        <div class="flex-container flex-wrap">
          <img
            id="disclaimer-img"
            src="https://c.tfstatic.com/w_800,h_508,c_fill,g_auto:subject,q_auto,f_auto/w_400/tf-product/ContactPage/contactpage_background.png"
            alt=""
          />
          <div
            style="
              padding: 1.5rem;
              padding-top: 0;
              border: 1px solid silver;
              border-radius: 0.25rem;
              flex: 1;
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
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";
import UserServices from '../services/userServices'
export default {
  name: "Display-restaurants",
  props: {},
  data() {
    return {
      user: null,
      favoritesRestaurants: [],
      restaurants: [],
      background: one,
    };
  },
  created() {
    let images =  [one, two, three]
    setInterval(() => {
      const firstImage = images.shift();
      images.push(firstImage);
      this.background = images[0];
    }, 5000);
    axios
      .get("http://localhost:8081/client-restaurant/top-rated")
      .then((response) => {
        const { data } = response;
        this.restaurants = data;
      })
      
    UserServices.me()
      .then((user) => {
        this.user = user.data;
        axios
          .get(
            `http://localhost:8081/client-restaurant/favorites/${this.user.id}`
          )
          .then((response) => {
            this.favoritesRestaurants = response.data;
          });
      }).catch(()=>{console.log('not connected...')})
  },

  methods: {},
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  justify-content: center;
  flex-wrap: wrap !important;
}
#slogan {
  color: #ffff;
  font-weight: 700;
  font-size: 3.125rem;
  line-height: 3.125rem;
  padding: 0 1rem;
  position: relative;
  max-width: 1200px;
  text-align: center;
}
.restaurant:hover {
  cursor: pointer;
  box-shadow: 0 0 25px 0 silver;
}
.restaurant {
  transition: box-shadow 0.2s linear;
}
.name,
.address,
.phone {
  text-align: left;
}

.mainframe {
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
  background-color: black;
  z-index: 1;
}
.md-card {
  margin: 20px;
  flex: 0 0 25%;
}
section {
  margin: 100px 0 0 0;
}
#disclaimer-img {
  flex: 1;
  height: auto;
  max-height: 254px;
}
</style>