<template>
  <div class="conteneur">
    <div id="preview">
      <div id="restaurant-image">
        <img
          src="https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/4a0d9e27-5789-480a-ae60-37f37c4a310e/6950719d-8878-495a-8d0a-8acbecff56d3.jpg"
          alt="People"
        />
      </div>
      <div id="reviewSection">
        <a href="#menus">Menus</a>
        <a href="#promos">Promos</a>
        <a herf="#feedbacks">Avis</a>
        <a href="#infos">Infos</a>
      </div>
      <div id="description">
        <h2>Carte du restaurant</h2>
        <p class="bold" id="description-content">
          Chef Valentin Thompson. Tutiac, les premiers vignerons en France à
          ouvrir leur bistro ! épicuriens venez profiter de la cuisine gourmande
          du Chef et laissez vous guider par notre Chef Sommelier
        </p>
      </div>
      <div id="form">
        <select
          name="notes"
          id="selection-note"
          v-on:change="grade = $event.target.value"
        >
          <option value="">Choisir une note</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

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
            <div class="header">
              <div><img width="40" src="../assets/profil.jpg" alt="" /></div>
              <div class="metadata-wrapper">
                <div class="metadata">
                  <div class="author">
                    {{ item.first_name }} {{ item.last_name }}
                  </div>
                  <div class="date">{{ item.grade_date.substr(0,10).split('-').reverse().join('/') }}</div>
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
        <md-card-header style="display: flex; justify-content: space-between">
          <h1 class="title" id="name"></h1>
          <h2 id="grade"></h2>
        </md-card-header>

        <md-card-content>
          <div class="subheading" id="address"></div>
          <div class="subheading" id="phone"></div>
          <br />
          <div id="addFavorite">
            <label for="favorite">
              Ajouter à vos favoris
              <input
                v-model="favorite"
                type="checkbox"
                id="favorite"
                v-on:change="setFavorite()"
              />
            </label>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserServices from "../services/userServices";
export default {
  name: "View-restaurant",
  props: {},
  data() {
    return {
      user:null,
      grade: 1,
      feedback: "",
      feedbacks: [],
      favorite: false,
      hasAlreadyFeedBack: false,
      average: 0,
    };
  },
  methods: {
    async initData() {
      let response = await axios.get(
        `http://localhost:8081/restaurants/${this.$route.query.id}`
      );

      document.getElementById("name").innerText = response.data.name;
      document.getElementById("description-content").innerText =
        response.data.description;
      document.getElementById("address").innerText = response.data.address;
      document.getElementById("phone").innerText = response.data.phone_number;

      response = await axios.get(
        `http://localhost:8081/client-restaurant/${this.$route.query.id}`
      );
      this.feedbacks = [...response.data];

      if (this.feedbacks.length > 0) {
        this.hasAlreadyFeedBack = true;
        if (this.feedbacks[0].feedback)
          document.getElementById("form").style.display = "none";
      }
      this.feedbacks = this.feedbacks.filter((el) => el.feedback);

      response = await axios.get(
        `http://localhost:8081/client-restaurant/average/${this.$route.query.id}`
      );
      this.average = Math.round(response.data.average.avg);
      document.getElementById(
        "grade"
      ).innerHTML = `${this.average}/<span style="font-size:16px">5</span>`;
    },
    sendFeedback() {
      if (this.grade && this.feedback.length > 0) {
        const idRestaurant = this.$route.query.id;
        if (this.hasAlreadyFeedBack) {
          axios
            .put(
              `http://localhost:8081/client-restaurant/${this.$route.query.id}`,
              {
                clientId: this.user.id,
                restaurantId: idRestaurant,
                grade: this.grade,
                feedback: this.feedback,
                favorite: this.favorite,
              }
            )
            .then((response) => {
              console.log(response);
              this.feedbacks.unshift({
                clientId:  this.user.id,
                restaurantId: idRestaurant,
                grade: response.data.grade,
                grade_date: response.data.grade_date,
                feedback: response.data.feedback,
                favorite: response.data.favorite,
              });
            });
          document.getElementById("form").style.display = "none";
          console.log(idRestaurant);

          return;
        }
        document.getElementById("form").style.display = "none";
        console.log(idRestaurant);
        axios
          .post("http://localhost:8081/client-restaurant", {
            clientId: this.user.id,
            restaurantId: idRestaurant,
            grade: this.grade,
            feedback: this.feedback,
            favorite: this.favorite,
          })
          .then((response) => {
            console.log(response);
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
        console.log("deja noté");
        axios.put(
          `http://localhost:8081/client-restaurant/${this.$route.query.id}`,
          {
            favorite: this.favorite,
            clientId:  this.user.id,
            restaurantId: idRestaurant,
          }
        );
      } else {
        axios.post("http://localhost:8081/client-restaurant", {
          clientId: this.user.id,
          restaurantId: idRestaurant,
          favorite: this.favorite,
        });
        this.hasAlreadyFeedBack = true;
      }
    },
  },
  async created() {
    await this.initData();
  },
  async mounted() {
    UserServices.me()
    .then((user)=>{
      console.log('vous etes deja connecté !')
      this.user =user.data
      console.log(this.user)
    })
    .
    catch(() => {
      const addFavorite = document.getElementById("addFavorite");
      const form = document.getElementById("form");
      form.parentNode.removeChild(form);
      addFavorite.parentNode.removeChild(addFavorite);
    });
  },
  watch: {
    async $route() {
      this.hasAlreadyFeedBack = false;
      document.getElementById("form").style.display = "block";
      await this.initData();
    },
  },
};
</script>

<style scoped>
.conteneur {
  display: flex;
  max-width: 950px;
  padding-top: 11%;
  margin: auto;
}
.conteneur > div {
}
.feedback-container {
  border: 1px solid silver;
  padding: 30px;
  font-style: italic;
  padding-top: 20px;
}

.header {
  display: flex;
  flex-direction: row;
}

.grade {
  text-align: right !important;
  flex: 1;
}
.metadata-wrapper {
  display: flex;
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
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
#reviewSection a {
  color: inherit;
}
</style>