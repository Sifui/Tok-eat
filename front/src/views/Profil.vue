<template>
  <div id="main-home">
    <navbar />
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
                <label for="name"
                  >Nom
                  <span class="error-input" v-show="this.errorClientName"
                    >Caractères non autorisés</span
                  >
                </label>
              </div>
              <div class="profil-input-div">
                <input
                  type="text"
                  v-model="user.last_name"
                  @change="isClientNameValid"
                />
              </div>
              <div class="profil-label-div">
                <label for="first_name"
                  >Prénom
                  <span class="error-input" v-show="this.errorClientFirstName"
                    >Caractères non autorisés</span
                  >
                </label>
              </div>
              <div class="profil-input-div">
                <input
                  type="text"
                  v-model="user.first_name"
                  @change="isClientFirstNameValid"
                />
              </div>
              <div class="profil-label-div">
                <label for="address"
                  >Adresse
                  <span class="error-input" v-show="this.errorClientAddress"
                    >Caractères non autorisés</span
                  ></label
                >
              </div>
              <div class="profil-input-div">
                <input
                  type="text"
                  v-model="user.address"
                  @change="isClientAdressValid"
                />
              </div>
              <div class="profil-label-div">
                <label for="phone-number"
                  >N° téléphone
                  <span class="error-input" v-show="this.errorClientPhoneNumber"
                    >Caractères non autorisés</span
                  ></label
                >
              </div>
              <div class="profil-input-div">
                <input
                  type="text"
                  v-model="user.phone_number"
                  @change="isClientPhoneNumberValid"
                />
              </div>
              <p class="separator">Paramètres d' authentification</p>
              <div class="profil-label-div">
                <label for="email"
                  >E-mail
                  <span class="error-input" v-show="this.errorClientMail"
                    >Email non valide</span
                  ></label
                >
              </div>
              <div class="profil-input-div">
                <input
                  type="email"
                  v-model="user.email"
                  @change="isClientMailValid"
                />
              </div>
              <div class="profil-label-div">
                <label for="password">Mot de passe</label>
              </div>
              <div class="profil-but-div-password">
                <button class="profil-but-password">
                  Modification du mot de passe
                </button>
              </div>
              <div class="profil-but-div-validate">
                <button
                  class="profil-but-validate"
                  @click="displayModalValidateModification"
                  :disabled="isDisabledClient"
                >
                  modifier
                </button>
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
              <div class="all-card-div">
                <div class="card-div">
                  <div class="card-div-part-one">
                    <div class="card-puce">
                      <img src="../assets/puce.png" alt="puce-image" />
                    </div>
                    <div class="input-puce">
                      <input type="text" value="XXXX-XXXX-XXXX-1234" />
                    </div>
                  </div>
                  <div class="card-div-part-two">
                    <div class="card-type">
                      <img src="../assets/visa.jpg" alt="" />
                    </div>
                    <div class="card-label">
                      <label for="">CVV</label>
                    </div>
                    <div class="card-input-number">
                      <input type="number" value="230" />
                    </div>
                    <div class="card-label">
                      <label for="">expire</label>
                    </div>
                    <div class="card-input-date">
                      <input type="month" name="" id="" value="2023-08" />
                    </div>
                  </div>
                </div>
                <div class="buttons-card-div">
                  <div class="button-card-div-delete">
                    <button>Supprimer</button>
                  </div>
                  <div class="button-card-div-update">
                    <button>Modifier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab name="token">
        </Tab>
      </Tabs>
    </div>
    <validateProfilModification
      :modals="modals"
      @validate="edit_name"
      @reload="reloadPage"
      @close="closeModal"
    />
    <footerTokEat />
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "../components/Navbar";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";
import footerTokEat from "@/components/Footer";
import UserServices from "../services/userServices";
import validateProfilModification from "@/components/modals/validateProfilModification";
const regName = /^[^~"#{([|`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regAddress = /^[^~"#{([`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regPhoneNumber = /^(\+33|0|\+33 )[1-9]([-. ]?[0-9]{2}){4}( )*$/;
export default {
  name: "Home",
  components: {
    Tab,
    Tabs,
    navbar,
    footerTokEat,
    validateProfilModification,
  },
  data() {
    return {
      user: null,
      maxH: "0",
      isA: false,
      errorClientName: false,
      errorClientFirstName: false,
      errorClientAddress: false,
      errorClientPhoneNumber: false,
      errorClientMail: false,
      modals: {
        displayModalModification: null,
      },
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
    edit_name() {
      UserServices.edit_name(this.user).then((response) => {
        // this.user=response.data;
        console.log("VITAAAAA" + response.data);
      });
    },
    displayModalValidateModification() {
      this.modals.displayModalModification = true;
    },
    closeModal() {
      this.modals = {
        displayModalModification: null,
      };
    },
    reloadPage() {
      window.location.reload();
    },
    isClientNameValid() {
      if (regName.test(this.user.last_name)) {
        this.errorClientName = false;
      } else {
        this.errorClientName = true;
      }
    },
    isClientFirstNameValid() {
      if (regName.test(this.user.first_name)) {
        this.errorClientFirstName = false;
      } else {
        this.errorClientFirstName = true;
      }
    },
    isClientAdressValid() {
      if (regAddress.test(this.user.address)) {
        this.errorClientAddress = false;
      } else {
        this.errorClientAddress = true;
      }
    },
    isClientPhoneNumberValid() {
      if (regPhoneNumber.test(this.user.phone_number)) {
        this.errorClientPhoneNumber = false;
      } else {
        this.errorClientPhoneNumber = true;
      }
    },
    isClientMailValid() {
      if (regMail.test(this.user.email)) {
        this.errorClientMail = false;
        this.boxColorErrorFunction();
      } else {
        this.errorClientMail = true;
        this.boxColorErrorFunction();
      }
    },
  },
  computed: {
    computedHeight() {
      return this.maxH;
    },
    isDisabledClient() {
      return this.errorClientName ||
        this.errorClientFirstName ||
        this.errorClientMail ||
        this.errorClientPhoneNumber ||
        this.errorClientAddress
        ? true
        : false;
    },
  },
  async created() {
    const res = await UserServices.me();
    this.user = res.data;
    // console.log(this.user)
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
.error-input {
  color: red;
  text-align: right;
  margin-left: 50%;
}
.md-toolbar {
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
#home::-webkit-scrollbar {
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
  /* background-color: #b8dab8; */
  /* background: none; */
  border: none;
}
.profil-but-password:hover {
  cursor: pointer;
  background-color: #6db672;
  color: #000000;
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
.profil-but-validate:disabled {
  width: 100%;
  height: 40px;
  border-radius: 29071992px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #959b96;
  color: rgb(92, 50, 50);
  border: none;
}
.profil-but-validate:hover {
  cursor: pointer;
  background-color: #57915b;
}
.profil-but-validate:hover:disabled {
  cursor: pointer;
  background-color: #525252;
  color: #e78f8f;
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

.all-card-div {
  display: flex;
  /* background-color: #777; */
  padding: 1% 1% 1% 1%;
}

.card-div {
  background-color: #2140a5;
  width: 70%;
  height: 250px;
  display: flex;
  border-radius: 29px;
}
.card-div-part-one {
  /* background-color: #b7beb7; */
  padding-left: 2%;
  width: 70%;
  height: auto;
}
.card-puce {
  /* background-color: #b94242; */
  width: 17%;
  height: auto;
  margin-top: 24%;
  margin-left: 5%;
}
.input-puce {
  /* background-color: #d62a2a; */
  margin-top: 15%;
  height: 50px;
}
.input-puce input {
  height: 90%;
  width: 95%;
  border: hidden;
  color: #ffffff;
  background-color: #2140a5;
  text-align: center;
  font-size: 20px;
  /* font-weight:bold; */
  text-shadow: 1px 1px 1px #000;
  letter-spacing: 2px;
  font-family: "Farrington 7B";
}
.card-div-part-two {
  /* background-color: rgb(185, 160, 160); */
  width: 30%;
  height: auto;
  padding: 1%;
}
.card-type {
  /* background-color: #b94242; */
  width: 50%;
  margin-left: 35%;
  margin-bottom: 15%;
  margin-top: 10%;
}
.card-label {
  /* background-color: #b94242; */
  margin-bottom: 5%;
  margin-top: 25%;
  color: #b1a9a9;
}
.card-input-number {
  /* background-color: #b94242; */
  height: 10%;
}
.card-input-number input {
  color: #ffffff;
  letter-spacing: 1px;
  background-color: #2140a5;
  width: 100%;
  height: 100%;
  border: none;
}
.card-input-date {
  /* background-color: #b94242; */
  height: 15%;
}
.card-input-date input {
  color: #ffffff;
  background-color: #2140a5;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 15px;
}
.buttons-card-div {
  /* background-color: antiquewhite; */
  width: 30%;
  padding: 8% 2% 5% 2%;
  margin-left: 5px;
}
.button-card-div-update {
  /* background-color: rgb(250, 215, 239); */
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
}
.button-card-div-delete {
  /* background-color: rgb(250, 215, 239); */
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
}

.button-card-div-update button {
  width: 100%;
  height: 90%;
  border-radius: 29071992px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #6db672;
  color: aliceblue;
  border: none;
}

.button-card-div-update button:hover {
  cursor: pointer;
  background-color: #57915b;
}

.button-card-div-delete button {
  width: 100%;
  height: 90%;
  border-radius: 29071992px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #b94242;
  color: aliceblue;
  border: none;
}

.button-card-div-delete button:hover {
  cursor: pointer;
  background-color: #d62a2a;
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
