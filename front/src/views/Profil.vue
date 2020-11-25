<template>
  <div id="main-home">
    <navbar/>
    <div id="home">
      <Tabs>
        <Tab name="profil" selected="true">
          <div class="profil">
            <div class="profil-picture">
              <img
                class="profil-image"
                src="../assets/profil.jpg"
                alt="profil-image"
              />
              <input type="file" />
            </div>
            <div class="profil-content">
              <div class="profil-label-div">
                <label for="name">Nom</label>
              </div>
              <div class="profil-input-div">
                <input type="text" v-model='user.last_name' />
              </div>
              <div class="profil-label-div">
                <label for="name">Prénom</label>
              </div>
              <div class="profil-input-div">
                <input type="text" v-model="user.first_name" />
              </div>
              <div class="profil-label-div">
                <label for="name">Adresse</label>
              </div>
              <div class="profil-input-div">
                <input type="text" v-model="user.address" />
              </div>
              <div class="profil-label-div">
                <label for="name">Numéro de téléphone</label>
              </div>
              <div class="profil-input-div">
                <input type="text" v-model="user.phone_number" />
              </div>
              <p class="separator">Paramètres d' authentification</p>
              <div class="profil-label-div">
                <label for="name">E-mail</label>
              </div>
              <div class="profil-input-div">
                <input type="text" v-model="user.email" />
              </div>
              <div class="profil-label-div">
                <label for="name">Mot de passe</label>
              </div>
              <div class="profil-but-div-password">
                <button class="profil-but-password">
                  Modification du mot de passe
                </button>
              </div>
              <div class="profil-but-div-validate">
                <button class="profil-but-validate" @click="edit_name" >modifier</button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab name="payement">
          <div class="payement">
            <div class="payement-add-card-div">
              <div class="payement-add-card-button-div">
                <button
                  class="collapse"
                  v-bind:class="{ active: isA }"
                  @click="collapse"
                >
                  Ajouter un moyen de payement
                </button>
              </div>
              <div
                class="payement-add-card-content-form"
                v-bind:style="{ maxHeight: computedHeight }"
              >
                <hr class="payement-separation-one" />
                <div class="payement-add-label-div">
                  <label for="payement-type-carte"
                    >Choisissez votre moyen de payement</label
                  >
                </div>
                <div class="payement-add-input-div">
                  <select name="payement-type-carte">
                    <option class="payement-opt" value="">
                      --Type de carte--
                    </option>
                    <option class="payement-opt" value="VISA">VISA</option>
                    <option class="payement-opt" value="MASTER CARD">
                      MASTER CARD
                    </option>
                  </select>
                </div>
                <hr />
                <div class="payement-add-label-div">
                  <label for="payement-add-numero-card">Numéro de carte</label>
                </div>
                <div class="payement-add-input-div">
                  <input type="text" />
                </div>
                <div class="payement-add-label-div">
                  <label for="payement-add-date"
                    >Date d' expiration de la carte</label
                  >
                </div>
                <div class="payement-add-input-div">
                  <input name="payement-add-date" type="month" />
                </div>
                <div class="payement-add-label-div">
                  <label for="payement-add-numero-card">Numéro CVV</label>
                </div>
                <div class="payement-add-input-div">
                  <input type="number" />
                </div>
                <div class="payement-add-button-div">
                  <button class="payement-add-card-button">ajouter</button>
                </div>
              </div>
            </div>
            <div class="payement-cards-div">
              <div>
                <p></p>
              </div>
              <div>
                <p>{{this.user.first_name}}</p>
              </div>
              <div>
                <p>pipi</p>
              </div>
              <div>
                <p>pipi</p>
              </div>
              <div>
                <p>pipi</p>
              </div>
              <div>
                <p>pipi</p>
              </div>
              <div>
                <p>pipi</p>
              </div>
            </div>
          </div>
        </Tab>
        <Tab name="token">
          <div class="token">
            <md-card>
            <md-card-header style="display: flex; justify-content: space-between">
              <h1 id="name_restaurant">{{name}}</h1> <hr />
              <h2 class="title" id="token">{{token}}</h2>
            </md-card-header>

            <md-card-content>
              <md-list>
                <div class="phone">
                  <span>{{phone}}</span>
                </div>
              </md-list>
              <md-list>
                <div class="address">
                  <span>{{address}}</span>
                </div>
              </md-list>
              <md-button class="voir" v-on:click="$router.push(`/restaurant?id=${idRestaurant}`)">Voir le restaurant</md-button>
            </md-card-content>
            </md-card>
          </div>
        </Tab>
      </Tabs>
    </div>
    <footerTokEat/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import navbar from "../components/Navbar";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";
import footerTokEat from "@/components/Footer";
import UserServices from '../services/userServices'
import userServices from '../services/userServices';
export default {
  name: "Home",
  components: {
    Tab,
    Tabs,
    navbar,
    footerTokEat
  },
  data() {
    return {
      user:null,
      maxH: "0",
      isA: false,
      token: "0",
      idRestaurant: 0,
      name: "",
      phone: "",
      address: "",
      //tok: [],
    };
  },
  methods: {
    collapse() {
      if (this.isA === false) {
        this.maxH = "1000px";
        this.isA = true;
      } else if (this.isA === true) {
        this.maxH = "0px";
        this.isA = false;
      }
    },
    edit_name(){
      userServices.edit_name(this.user).then((response)=>{
        // this.user=response.data;
        console.log('VITAAAAA'+response.data);
      })
    }
  },
  computed: {
    computedHeight() {
      return this.maxH;
    },
  },
  async created(){
    const res = await UserServices.me()
    this.user = res.data
    // console.log(this.user)
  },

  async init_token(){
    let response = await axios.get(`http://localhost:8080/client-restaurant/${this.$route.query.id}`);
    this.token = response.data.token;
    this.idRestaurant = response.data.id_restaurant;
    //let idClient = response.data.id_client;

    response = await axios.get(`http://localhost:8080/restaurant?id=${this.idRestaurant}`);
    this.name = response.data.name;
    this.phone = response.data.phone;
    this.address = response.data.address;
  },
};
</script>

<style scoped>
/******************************************************************************************************* */
/*************************************** GENERAL CSS *************************************************** */
/******************************************************************************************************* */
/* #main-home{
  background-color: yellow;
} */

.md-toolbar{
  position: relative;
}
#home {
  /* background-color: rgb(184, 63, 63); */
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  height: 900px;
  width: 60%;
  position: relative;
  left: 20%;
  right: 20%;
  font-size: 17px;
  margin-bottom: 10px;
  margin-top: 40px;
  /* overflow: scroll; */
}
#home::-webkit-scrollbar{
  display: none;
}

::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 17px;
}

/******************************************************************************************************* */
/*************************************** PROFIL CSS *************************************************** */
/******************************************************************************************************* */
.profil {
  /* background-color: rgb(57, 128, 128); */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.profil-picture {
  /* background-color: aquamarine; */
  width: 33%;
  height: 300px;
  padding: 5px;
  text-align: center;
}
.profil-image {
  /* background-color: blue; */
  border-radius: 29071992px;
  width: 70%;
  height: 84%;
  margin-bottom: 25px;
}
.profil-content {
  /* background-color: rgb(50, 83, 72); */
  width: 67%;
  padding: 20px 40px 10px 40px;
  display: flex;
  flex-direction: column;
  line-height: 40px;
}
.profil-content input {
  height: 100%;
  width: 100%;
  border: solid;
  border-width: 1px;
  border-color: rgb(77, 112, 112);
  border-radius: 10px;
  padding-left: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 17px;
}
.profil-content select option {
  height: 100%;
  width: 100%;
  border: solid;
  border-width: 1px;
  border-color: rgb(77, 112, 112);
  border-radius: 10px;
  padding-left: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
.profil-content input:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}
.profil-input-div {
  margin-bottom: 20px;
}
.profil-but-div-password {
  margin-bottom: 20px;
}
.profil-but-password {
  height: 25px;
  background-color: #b7beb7;
  /* background: none; */
  border: none;
}
.profil-but-password:hover {
  cursor: pointer;
  background-color: #8f948f;
  color: #ffffff;
}
.profil-but-div-validate {
  /* background-color: rebeccapurple; */
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 75%;
}
.profil-but-validate {
  width: 100%;
  height: 40px;
  border-radius: 29071992px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #6db672;
  color: aliceblue;
  border: none;
}
.profil-but-validate:hover {
  cursor: pointer;
  background-color: #57915b;
}

.separator {
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 600;
}

/******************************************************************************************************* */
/*************************************** PAYEMENT CSS *************************************************** */
/******************************************************************************************************* */

.payement {
  /* background-color: rgb(168, 114, 168); */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.payement-add-card-div {
  /* background-color: cadetblue; */
  display: flex;
  width: 34%;
  height: auto;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  line-height: 30px;
}

.payement-add-card-div input {
  height: 40px;
  width: 100%;
  border: solid;
  border-width: 1px;
  border-color: rgb(77, 112, 112);
  border-radius: 10px;
  padding-left: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 17px;
}

.payement-add-card-div input:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}

.payement select {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  height: 40px;
  width: 100%;
  padding-left: 10px;
}

.payement select:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}

.payement-cards-div {
  display: flex;
  flex-direction: column;
  /* background-color: burlywood; */
  width: 66%;
  height: auto;
}

.payement-add-card-button-div {
  width: 100%;
}

.collapse {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 20px;
}

.active,
.collapse:hover {
  background-color: #555;
}

.collapse:after {
  content: "\002B";
  color: white;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2212";
}

.payement-add-card-content-form {
  background-color: #e9e8e8;
  width: 100%;
  padding: 0px 20px 0px 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.payement-separation-one {
  margin-bottom: 20px;
  border: none;
}

.payement-add-input-div {
  margin-bottom: 20px;
}
.payement-add-button-div {
  margin-bottom: 20px;
  width: 100%;
}

.payement-add-card-button {
  width: 100%;
  height: 40px;
  border-radius: 29071992px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #6db672;
  color: aliceblue;
  border: none;
}
.payement-add-card-button:hover {
  cursor: pointer;
  background-color: #57915b;
}
/******************************************************************************************************* */
/*************************************** AUTRES CSS *************************************************** */
/******************************************************************************************************* */

.autres {
  background-color: rgb(173, 134, 86);
  width: 100%;
  height: 100%;
}
</style>
