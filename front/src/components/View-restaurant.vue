<template>
  <div class="conteneur flex-container">
    <div id="preview">
      <div id="restaurant-image">
        <img
          src="https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/4a0d9e27-5789-480a-ae60-37f37c4a310e/6950719d-8878-495a-8d0a-8acbecff56d3.jpg"
          alt="People"
        />
      </div>
      <div id="reviewSection" class="flex-container">
        <a href="#menus">Menus</a>
        <a href="#promos">Promos</a>
        <a herf="#feedbacks">Avis</a>
        <a href="#infos">Infos</a>
      </div>
      <div id="description">
        <h2>Carte du restaurant</h2>
        <div v-for="(item, index) in offers.slice(0,4)" v-bind:key="index" class="offer flex-container">
          <div class="offer-name">{{ item.name }}</div>
          <div class="offer-price">{{ item.price }} €</div>
        </div>
        <br />
        <h2>Description</h2>
        <p class="bold" id="description-content">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="centered">
        <md-button
          class="danger"
          v-on:click="
            $router.push({
              name: 'Offers',
              params: { offers, restaurant: restaurant },
            })
          "
          >Consulter les repas</md-button
        >
      </div>
      <div id="form" v-if="showForm">
        <md-field>
          <md-select v-model="grade"  placeholder="Choisir une note">
          <md-option value="0">Choisir une note</md-option>
          <md-option value="1">1</md-option>
          <md-option value="2">2</md-option>
          <md-option value="3">3</md-option>
          <md-option value="4">4</md-option>
          <md-option value="5">5</md-option>
          </md-select>
        </md-field>
        
        <br />
        <md-field>
          <label>Commentaire</label>
          <md-textarea v-model="feedback"></md-textarea>
        </md-field>

        <br />
        <md-button
          class="md-raised"
          :md-ripple="false"
          v-on:click="sendFeedback"
          >Envoyer</md-button
        >
      </div>
      <div class="display-feedbacks">
        <div
          v-for="(item, index) in feedbacks"
          v-bind:key="index"
          class="feedback-container"
        >
          <div v-if="item.feedback">
            <div class="header flex-container">
              <div><img width="40" src="../assets/profil.jpg" alt="" /></div>
              <div class="metadata-wrapper">
                <div class="metadata">
                  <div class="author">
                    {{ item.first_name }} {{ item.last_name }}
                  </div>
                  <div class="date">
                    {{
                      item.grade_date
                        .substr(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")
                    }}
                  </div>
                </div>
                <div class="grade">{{ item.grade }}/5</div>
              </div>
            </div>
            <div class="feedback-content">
              <div>{{ item.feedback }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="side-description">
      <md-card>
        <md-card-header class="flex-container" style="justify-content: space-between">
          <h1 class="title" id="name">{{ restaurant.name }}</h1>
          <h2 id="grade">
            {{ restaurant.average }}/<span style="font-size: 16px">5</span>
          </h2>
        </md-card-header>

        <md-card-content>
          <div class="subheading" id="address">{{ restaurant.address }}</div>
          <div class="subheading" id="phone">{{ restaurant.phone }}</div>
          <br />
          <div id="addFavorite" v-if="user">
             
              <md-checkbox
                v-model="favorite"
                class="md-primary"
                v-on:change="setFavorite()"
              > Ajouter à vos favoris</md-checkbox>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OfferServices from "../services/offerServices";

export default {
  name: "View-restaurant",
  props: {},
  data() {
    return {
      showForm: true,
      user: null,
      grade: 0,
      feedback: "",
      feedbacks: [],
      favorite: false,
      hasAlreadyFeedBack: false,
      average: 0,
      offers: [],
      restaurant: {
        id:null,
        name: null,
        description: null,
        address: null,
        phone: null,
        average: null,
      },
    };
  },
  methods: {
    async initData() {
      let response = await axios.get(
        `http://localhost:8081/restaurants/${this.$route.query.id}`
      );
      if (!response.data) {
        this.$router.push({ path: "/" });
        return;
      }
      this.restaurant.id = response.data.id;
      this.restaurant.name = response.data.name;
      this.restaurant.description = response.data.description;
      this.restaurant.address = response.data.address;
      this.restaurant.phone = response.data.phone_number;

      response = await axios.get(
        `http://localhost:8081/client-restaurant/${this.$route.query.id}`
      );
      this.feedbacks = [...response.data];
      this.feedbacks = this.feedbacks.filter((el) => el.feedback);
      if ( this.user){
      if (this.feedbacks.find((e) => e.id_client == this.user.id)) {
          this.showForm = false;
            this.hasAlreadyFeedBack = true;

        }
      }
      response = await axios.get(
        `http://localhost:8081/client-restaurant/average/${this.$route.query.id}`
      );
      this.restaurant.average = response.data.average.avg ? parseFloat(response.data.average.avg).toFixed(1) : 0;
    },
    sendFeedback() {
      if (this.grade && this.feedback.length > 0) {
        const idRestaurant = this.$route.query.id;
        this.showForm = false;
        if (this.hasAlreadyFeedBack) {
          axios
            .put(
              `http://localhost:8081/client-restaurant/${this.$route.query.id}`,
              {
                restaurantId: idRestaurant,
                grade: this.grade,
                feedback: this.feedback,
              }
            )
            .then((response) => {
              this.feedbacks.unshift({
                clientId: this.user.id,
                restaurantId: idRestaurant,
                grade: response.data.grade,
                grade_date: response.data.grade_date,
                feedback: response.data.feedback,
                favorite: response.data.favorite,
              });
            });

          return;
        }
        axios
          .post("http://localhost:8081/client-restaurant", {
            clientId: this.user.id,
            restaurantId: idRestaurant,
            grade: this.grade,
            feedback: this.feedback,
            favorite: this.favorite,
          })
          .then((response) => {
            this.feedbacks.unshift({
              ...response.data,
              first_name: this.user.first_name,
              last_name: this.user.last_name,
            });
          });
        this.hasAlreadyFeedBack = true;
      }
    },
    setFavorite() {
      const idRestaurant = this.$route.query.id;

      if (this.hasAlreadyFeedBack) {
        axios
          .put(
            `http://localhost:8081/client-restaurant/${this.$route.query.id}`,
            {
              favorite: this.favorite,
              restaurantId: idRestaurant,
            }
          )
          .catch((e) => {
            console.log("error", e);
          });
      } else {
        axios.post("http://localhost:8081/client-restaurant", {
          restaurantId: idRestaurant,
          favorite: this.favorite,
        });
        this.hasAlreadyFeedBack = true;
      }
    },
  },
  async created() {
    this.user = this.$store.state.user
    await this.initData();
  },
  async mounted() {
    if ( !this.user) 
        this.showForm = false
      
    OfferServices.getOfferByIdRestaurant(this.$route.query.id).then(
      (offers) => {
        this.offers = [...offers.data];
      }
    );
  },
  watch: {
    async $route() {
      this.hasAlreadyFeedBack = false;
      await this.initData();
    },
  },
};
</script>

<style scoped>
.conteneur {
  max-width: 950px;
  margin: auto;
}

.feedback-container {
  border: 1px solid silver;
  padding: 30px;
  font-style: italic;
  padding-top: 20px;
}

.header {
  flex-direction: row;
}

.grade {
  text-align: right !important;
  flex: 1;
}
.metadata-wrapper {
  margin-left: 10px;
  flex: 1;
}

#preview {
  flex: 60%;
}
#side-description {
  flex: 40%;
  margin-left: 50px;
}
#reviewSection {
  font-weight: 500;
  justify-content: space-between;
  padding: 20px;
}
#reviewSection a {
  color: inherit;
}
.offer {
  margin-bottom: 20px;
}
.offer .offer-name {
  border-bottom: 1px dotted;
  flex: 1;
}
</style>