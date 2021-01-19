<template>
  <div class="profil-restaurant-container">
    <div class="profil-title">
      <h3>Gestion du profil de votre restaurant</h3>
    </div>
    <div class="profil">
      <div class="profil-picture">
        <img
          class="profil-image"
          v-bind:src="restaurant.image"
          alt="profil-image"
        />
        <md-field>
          <label class="profil-input-image-label" for="profil-input-image"
            >Photo du profil</label
          >
          <md-file
            type="file"
            id="profil-input-image"
            ref="file"
            name="profil-input-image"
            accept="image/x-png,image/gif,image/jpeg,image/tiff"
            @change="onFileSelected"
          />
        </md-field>
        <div class="profil-picture-button-div">
          <button
            class="profil-picture-button-validate"
            @click="edit_profil_image"
          >
            modifier
          </button>
          <button
            class="profil-picture-button-cancel"
            @click="cancel_edit_profil_image"
          >
            annuler
          </button>
        </div>
      </div>
      <div class="profil-informations">
        <div class="profil-label-div">
          <label for="name"
            >Nom
            <span class="error-input" v-show="this.errorName"
              >Caractères non autorisés</span
            >
          </label>
        </div>
        <div class="profil-input-div">
          <input type="text" v-model="restaurant.name" @change="isNameValid" />
        </div>
        <div class="profil-label-div">
          <label for="adress"
            >Adresse
            <span class="error-input" v-show="this.errorAddress"
              >Caractères non autorisés</span
            >
          </label>
        </div>
        <div class="profil-input-div">
          <input
            type="text"
            v-model="restaurant.address"
            @change="isAdressValid"
          />
        </div>
        <div class="profil-label-div">
          <label for="number"
            >N° Téléphone
            <span class="error-input" v-show="errorPhoneNumber"
              >Numéro incorrecte</span
            >
          </label>
        </div>
        <div class="profil-input-div">
          <input
            type="text"
            v-model="restaurant.phone_number"
            @change="isPhoneNumberValid"
          />
        </div>
        <div class="profil-label-div-textarea">
          <label for="description"
            >Description
            <span class="error-input" v-show="this.errorDescription"
              >Caractères non autorisés</span
            >
          </label>
        </div>
        <div class="profil-input-div">
          <textarea
            v-model="restaurant.description"
            @change="isPhoneNumberValid"
          />
        </div>
        <p class="separator">Paramètres d' authentification</p>
        <div class="profil-label-div">
          <label for="email"
            >E-mail
            <span class="error-input" v-show="this.errorMail"
              >Email non valide</span
            >
          </label>
        </div>
        <div class="profil-input-div">
          <input
            type="email"
            v-model="restaurant.email"
            @change="isMailValid"
          />
        </div>
        <div class="profil-label-div-error" v-show="this.errorAlreadyUsedEmail">
          <span class="error-input">{{ errorAlreadyUsedEmailMessage }}</span>
        </div>
        <div class="profil-label-div">
          <label for="password">Mot de passe</label>
        </div>
        <div class="profil-but-div-password">
          <button
            class="profil-but-password"
            @click="displayModalPasswordModification"
          >
            <i class="fas fa-cog"></i>
            Modification du mot de passe
          </button>
        </div>
        <div class="profil-label-div-success" v-show="this.successMessage">
          <span class="success">
            Vos données ont été modifier avec succès
          </span>
        </div>
        <div class="profil-but-div-validate">
          <button
            class="profil-but-validate"
            @click="displayModalValidateModification"
            :disabled="isDisabled"
          >
            modifier
          </button>
        </div>
      </div>
    </div>
    <validateProfilModification
      :modals="modals"
      @validate="update_restaurant_data"
      @reload="reloadPage"
      @close="closeModal"
    />
    <ProfilModalPassword
      :restaurant="restaurant"
      :modals="modals"
      @close="closeModal"
    />
  </div>
</template>

<script>
// @ is an alias to /src

import UserServices from "../services/userServices";
import validateProfilModification from "@/components/modals/ProfilModalValidateModification";
import ProfilModalPassword from "@/components/modals/ProfilRestaurantModalPasswordModification";
const regName = /^[^~"#{([|`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regAddress = /^[^~"#{([`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regPhoneNumber = /^(\+33|0|\+33 )[1-9]([-. ]?[0-9]{2}){4}( )*$/;
export default {
  name: "RestaurantProfil",
  components: { validateProfilModification, ProfilModalPassword },
  data() {
    return {
      restaurant: null,
      maxH: "0",
      isA: false,
      image: null,
      errorName: false,
      errorAddress: false,
      errorPhoneNumber: false,
      errorDescription: false,
      errorMail: false,
      errorAlreadyUsedEmail: false,
      errorAlreadyUsedEmailMessage: null,
      successMessage: false,
      modals: {
        displayModalModification: null,
        displayProfilModalPassword: null,
      },
    };
  },
  methods: {
    // collapse() {
    //   if (this.isA === false) {
    //     this.maxH = "1000px";
    //     this.isA = true;
    //   } else if (this.isA === true) {
    //     this.maxH = "0px";
    //     this.isA = false;
    //   }
    // },
    update_restaurant_data() {
      // console.log(this.restaurant);
      UserServices.update_restaurant_data(this.restaurant).then((response) => {
        console.log("zany ny response");
        console.log(response.data);
        if (response.data.message) {
          this.errorAlreadyUsedEmail = true;
          this.errorAlreadyUsedEmailMessage = response.data.message;
        } else {
          this.errorAlreadyUsedEmail = false;
          this.successMessage = true;
          setTimeout(function () {
            this.successMessage = false;
            console.log(this.successMessage);
            window.location.reload();
          }, 2500);
        }
      });
    },
    displayModalValidateModification() {
      this.modals.displayModalModification = true;
    },
    displayModalPasswordModification() {
      this.modals.displayProfilModalPassword = true;
    },
    closeModal() {
      this.modals = {
        displayModalModification: null,
        displayProfilModalPassword: null,
      };
    },
    reloadPage() {
      window.location.reload();
    },
    isNameValid() {
      if (regName.test(this.restaurant.name)) {
        this.errorName = false;
        console.log("false");
      } else {
        this.errorName = true;
        console.log("true");
      }
    },
    isAdressValid() {
      if (regAddress.test(this.restaurant.address)) {
        this.errorAddress = false;
      } else {
        this.errorAddress = true;
      }
    },
    isPhoneNumberValid() {
      if (regPhoneNumber.test(this.restaurant.phone_number)) {
        this.errorPhoneNumber = false;
      } else {
        this.errorPhoneNumber = true;
      }
    },
    isMailValid() {
      if (regMail.test(this.restaurant.email)) {
        this.errorMail = false;
        // this.boxColorErrorFunction();
      } else {
        this.errorMail = true;
        // this.boxColorErrorFunction();
      }
    },
    onFileSelected(event) {
      // console.log(event.target.files[0])
      this.image = event.target.files[0];
    },
    returnPromiseforImageURL() {
      let image = this.image;
      return new Promise((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function (e) {
          res(e.target.result);
        };
      });
    },

    async edit_profil_image() {
      // console.log(this.image)
      // console.log(this.image.name)
      let url = await this.returnPromiseforImageURL();
      // console.log(url);
      const data = {
        url,
        name: this.image.name,
        restaurant: this.restaurant,
      };
      // console.log('name==>');
      // console.log(data.name);
      UserServices.upload_restaurant_profil_image(data).then((response) => {
        // console.log(response.data);
        let url = "http://localhost:8081/profil-images/restaurant/";
        let imageName = response.data.image;
        let format = ".png";
        this.restaurant.image = url.concat(imageName, format);
        // console.log(this.restaurant.image);
      });
    },
    cancel_edit_profil_image() {
      this.reloadPage();
    },
  },
  computed: {
    // computedHeight() {
    //   return this.maxH;
    // },
    isDisabled() {
      return this.errorName ||
        this.errorMail ||
        this.errorPhoneNumber ||
        this.errorAddress ||
        this.errorDescription
        ? true
        : false;
    },
  },
  async created() {
    const res = await UserServices.me();
    let url = "http://localhost:8081/profil-images/restaurant/";
    let format = ".png";
    res.data.toBeDeletedImage = res.data.image;
    res.data.image = url.concat(res.data.image, format);
    this.restaurant = res.data;
    console.log("--");
    console.log(this.restaurant);
    console.log("--");
  },
};
</script>

<style scoped>
.error-input {
  color: red;
  text-align: right;
  margin-left: 50%;
}

.profil-restaurant-container {
  min-height: 800px;
  display: flex;
  /* background-color: black; */
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 17px;
}

.profil {
  background-color: rgb(255, 255, 255);
  width: 60%;
  margin: 1% 20% 0% 20%;
  padding: 15px 5px 5px 15px;
  /* height: auto; */
  min-height: 750px;
  display: flex;
}
.profil-title {
  background-color: #ffffff;
  width: 60%;
  margin: 0% 20% 0% 20%;
  text-align: center;
}
.profil-title h3 {
  /* background-color: #d62a2a; */
  text-transform: uppercase;
}
.profil-picture {
  /* background-color: aquamarine; */
  width: 33%;
  height: 300px;
  padding: 5px;
  margin-left: 1%;
  text-align: center;
}
.profil-image {
  /* background-color: blue; */
  border-radius: 29071992px;
  width: 70%;
  height: 84%;
  margin-bottom: 25px;
}
.profil-picture-button-div {
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.profil-picture-button-validate {
  width: 25%;
  height: 25px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #ffffff;
  color: #6db672;
  border-width: thin;
  border-color: #6db672;
  font-size: 70%;
  margin-right: 5%;
}
.profil-picture-button-validate:hover {
  width: 28%;
  height: 28px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #57915b;
  color: rgb(255, 255, 255);
  border: none;
  font-size: 70%;
  margin-right: 5%;
  cursor: pointer;
}
.profil-picture-button-cancel {
  width: 25%;
  height: 25px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #ffffff;
  color: #b94242;
  border-width: thin;
  border-color: #b94242;
  font-size: 70%;
  /* border-color: #0c0c0c; */
}
.profil-picture-button-cancel:hover {
  width: 28%;
  height: 28px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #d62a2a;
  color: rgb(255, 255, 255);
  border: none;
  font-size: 70%;
  cursor: pointer;
}
.profil-informations {
  /* background-color: #6db672; */
  width: 60%;
  margin-left: 4%;
  padding: 10px 10px 10px 30px;
}
.profil-label-div {
  margin: 15px 0px 10px 0px;
}
.profil-label-div-success {
  width: 100%;
  height: 45px;
  background-color: #afc0b162;
}
.profil-label-div-error {
  width: 100%;
  height: 45px;
  background-color: #afc0b162;
}
.profil-label-div-error .error {
  color: red;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: large;
}
.profil-label-div-success .success {
  color: #6db672;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: large;
  margin-left: 25%;
}
.profil-input-div {
  margin-bottom: 20px;
  /* background-color: #d62a2a; */
  /* line-height: 40px; */
  height: 40px;
}
.profil-label-div-textarea {
  margin-bottom: 20px;
}
.profil-informations input {
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
.profil-informations select option {
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
.profil-informations input:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}
.profil-informations textarea {
  height: 70px;
  width: 100%;
  border: solid;
  border-width: 1px;
  border-color: rgb(77, 112, 112);
  border-radius: 10px;
  padding-left: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 17px;
  min-height: 40px;
  max-height: 80px;
  min-width: 100%;
  max-width: 100%;
}
.profil-informations textarea:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}
.separator {
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 600;
  margin-top: 70px;
  margin-bottom: 30px;
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
  background-color: #dbd95f;
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
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #6db672;
  color: aliceblue;
  border: none;
}
.profil-but-validate:disabled {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #959b96;
  color: rgb(92, 50, 50);
  border: none;
}
.profil-but-validate:hover {
  cursor: pointer;
  background-color: #57915b;
  width: 98%;
  height: 38px;
}
.profil-but-validate:hover:disabled {
  cursor: pointer;
  background-color: #525252;
  color: #e78f8f;
}
</style>