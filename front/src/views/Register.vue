<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img
          class="logo"
          src="../assets/logo.png"
          v-show="!this.register.type"
        />
        <!-- <div class="md-title font-title">Tok' eat</div> -->
        <span class="error" v-show="this.errorLog">{{ message }}</span>
        <div class="md-body-1"></div>
      </div>

      <div class="form">
        <md-field>
          <label for="type">S' inscrire en tant que</label>
          <md-select v-model="register.type" name="type" id="type">
            <md-option value="client">Client</md-option>
            <md-option value="restaurant">Restaurant</md-option>
          </md-select>
        </md-field>
        <div v-if="this.register.type === 'client'">
          <md-field>
            <label for="clientName">Nom</label>
            <md-input
              type="text"
              name="clientName"
              id="clientName"
              minlength="3"
              maxlength="30"
              v-model="client.lastName"
              @change="isClientNameValid"
              @input="isClientCharacterNameValid"
            ></md-input>
            <span class="error" v-show="this.errorClientName"
              >Caractères non autorisés)
            </span>
            <span class="error" v-show="this.errorClientCharacterName"
              >Caractères insuffisants
            </span>
          </md-field>
          <md-field>
            <label for="clientfirstName">Prénom</label>
            <md-input
              type="text"
              name="clientfirstName"
              id="clientfirstName"
              maxlength="30"
              v-model="client.firstName"
              @change="isClientFirstNameValid"
              @input="isClientFirstNameCharacterValid"
            ></md-input>
            <span class="error" v-show="this.errorClientFirstName"
              >Caractères non autorisés</span
            >
            <span class="error" v-show="this.errorClientCharacterFirstName"
              >Caractères insuffisants</span
            >
          </md-field>
          <md-field>
            <label>E-mail</label>
            <md-input
              type="email"
              name="clientMail"
              id="clientMail"
              v-model="client.email"
              @change="isClientMailValid"
            ></md-input>
            <span class="error" v-show="this.errorClientMail"
              >email invalide</span
            >
          </md-field>

          <md-field>
            <label for="clientPhone">Téléphone</label>
            <md-input
              name="clientPhone"
              id="clientPhone"
              v-model="client.phoneNumber"
              @change="isClientPhoneNumberValid"
            ></md-input>
            <span class="error" v-show="this.errorClientPhoneNumber"
              >numéro invalide</span
            >
          </md-field>
          <md-field>
            <label for="clientAddress">Adresse</label>
            <md-input
              type="text"
              name="clientAddress"
              id="clientAddress"
              v-model="client.address"
              @change="isClientAdressValid"
            ></md-input>
            <span class="error" v-show="this.errorClientAddress"
              >Caractères invalide</span
            >
          </md-field>
          <md-field md-has-password>
            <label for="clientPasseWord">Mot de passe</label>
            <md-input
              v-model="client.password"
              type="password"
              @change="isPasswordTheSame"
            ></md-input>
          </md-field>
          <span class="error" v-show="this.errorPasswordCheck"
            >Différents mot de passe</span
          >
          <md-field md-has-password>
            <label>Confirmez votre mot de passe</label>
            <md-input
              v-model="client.repassword"
              type="password"
              @change="isPasswordTheSame"
            ></md-input>
          </md-field>
        </div>
        <div v-show="this.register.type === 'restaurant'">
          <md-field>
            <label for="restaurantName">Nom </label>
            <md-input
              id="restaurantName"
              name="restaurantName"
              type="text"
              minlength="3"
              maxlength="30"
              v-model="restaurant.name"
              @change="isRestaurantNameValid"
              @input="isRestaurantNameCharacterValid"
            ></md-input>
            <span class="error" v-show="this.errorRestaurantName"
              >Caractères invalide</span
            >
            <span class="error" v-show="this.errorRestaurantNameCharacter"
              >Caractères insuffisants</span
            >
          </md-field>
          <md-field>
            <label for="restaurantEmail">E-mail</label>
            <md-input
              id="restaurantEmail"
              name="restaurantEmail"
              type="email"
              @change="isRestaurantMailValid"
              v-model="restaurant.email"
            ></md-input>
            <span class="error" v-show="this.errorRestaurantEmail"
              >email invalide</span
            >
          </md-field>
          <md-field>
            <label for="restaurantPhoneNumber">Numéro</label>
            <md-input
              id="restaurantPhoneNumber"
              name="restaurantPhoneNumber"
              @change="isRestaurantPhoneNumberValid"
              v-model="restaurant.phoneNumber"
            ></md-input>
            <span class="error" v-show="this.errorRestaurantPhoneNumber"
              >numéro invalide</span
            >
          </md-field>
          <md-field>
            <label for="restaurantAddress">Adresse</label>
            <md-input
              id="restaurantAddress"
              name="restaurantAddress"
              type="text"
              @change="isRestaurantAddressValid"
              v-model="restaurant.address"
            ></md-input>
            <span class="error" v-show="this.errorRestaurantAddress"
              >Adresse invalide</span
            >
          </md-field>
          <md-field>
            <label for="restaurantDescription">Description</label>
            <md-textarea
              id="restaurantDescription"
              name="restaurantDescription"
              maxlength="200"
              minlength="5"
              v-model="restaurant.description"
            ></md-textarea>
          </md-field>
          <md-field>
            <label for="restaurantImage">Logo du Restaurant</label>
            <md-file
              type="file"
              id="restaurantImage"
              name="restaurantImage"
              accept="image/x-png,image/gif,image/jpeg,image/tiff"
              v-model="restaurant.image"
              @change="isRestaurantImageValid"
            />
          </md-field>
          <span class="error" v-show="this.errorRestaurantImage"
            >Format de fichier invalide</span
          >
          <md-field md-has-password>
            <label>Mot de passe</label>
            <md-input
              v-model="restaurant.password"
              type="password"
              @change="isRestaurantPasswordTheSame"
            ></md-input>
          </md-field>
          <span class="error" v-show="this.errorRestaurantPasswordCheck"
            >Différents mot de passe</span
          >
          <md-field md-has-password>
            <label>Mot de passe</label>
            <md-input
              v-model="restaurant.repassword"
              type="password"
              @change="isRestaurantPasswordTheSame"
            ></md-input>
          </md-field>
        </div>
      </div>

      <div
        v-if="this.register.type === 'client'"
        class="actions md-layout md-alignment-center-space-between"
      >
        <a href="#">Mot de passe oublié?</a>
        <md-button
          class="md-raised md-primary"
          :disabled="isDisabledClient"
          @click="clientRegistration"
        >
          S' INSCRIRE</md-button
        >
      </div>

      <div
        v-if="this.register.type === 'restaurant'"
        class="actions md-layout md-alignment-center-space-between"
      >
        <a href="#">Mot de passe oublié?</a>
        <md-button
          class="md-raised md-primary"
          :disabled="isDisabledRestaurant"
          @click="restaurantRegistration"
        >
          S' INSCRIRE</md-button
        >
      </div>

      <!-- <md-button
          class="md-raised md-primary"
          type="submit"
          to='/'
          >Home page</md-button
      > -->

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>

      <!-- <md-dialog-alert
        :md-active.sync="errorLog"
        md-title="ERROR"
        md-content="this.message"
      /> -->
    </md-content>
    <div class="background" />
    <div class="background2" />
  </div>
</template>

<script>
import userServices from "../services/userServices";
const regName = /^[^~"#{([|`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regAddress = /^[^~"#{([`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regPhoneNumber = /^(\+33|0|\+33 )[1-9]([-. ]?[0-9]{2}){4}( )*$/;
const regImage = /^[a-zA-Z0-9 -_]+\.(png|jpeg|jpg|gif|tiff)$/gm;
export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      loading: false,
      errorLog: false,
      errorClientName: false,
      errorClientFirstName: false,
      errorClientMail: false,
      errorClientPhoneNumber: false,
      errorClientAddress: false,
      errorPasswordCheck: false,
      errorRestaurantName: false,
      errorRestaurantEmail: false,
      errorRestaurantPhoneNumber: false,
      errorRestaurantAddress: false,
      errorRestaurantDescription: false,
      errorRestaurantImage: false,
      errorRestaurantPassword: false,
      errorRestaurantPasswordCheck: false,
      errorRestaurantNameCharacter: false,
      errorClientCharacterName: false,
      errorClientCharacterFirstName: false,
      message: "",
      register: {
        type: "",
      },
      client: {
        type: "client",
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        address: "",
        image: null,
        password: "",
        repassword: "",
      },
      restaurant: {
        type: "restaurant",
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        image: null,
        description: "",
        password: "",
        repassword: "",
      },
      entity: [],
    };
  },
  computed: {
    isDisabledClient() {
      return !this.client.lastName ||
        !this.client.firstName ||
        !this.client.email ||
        !this.client.phoneNumber ||
        !this.client.address ||
        !this.client.password ||
        this.errorClientName ||
        this.errorClientFirstName ||
        this.errorClientMail ||
        this.errorClientPhoneNumber ||
        this.errorClientAddress ||
        this.errorPasswordCheck
        ? true
        : false;
    },
    isDisabledRestaurant() {
      return !this.restaurant.name ||
        !this.restaurant.email ||
        !this.restaurant.phoneNumber ||
        !this.restaurant.address ||
        !this.restaurant.description ||
        !this.restaurant.password ||
        this.errorRestaurantName ||
        this.errorRestaurantEmail ||
        this.errorRestaurantPhoneNumber ||
        this.errorRestaurantAddress ||
        this.errorRestaurantDescription
        ? true
        : false;
    },
  },
  methods: {
    clientRegistration() {
      // this.$router.push({ path: "home" });
      this.loading = true;
      userServices
        .register(this.client)
        .then((response) => {
          this.entity = response.data;
          console.log(this.entity.user);
          if (this.entity.message) {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.message = this.entity.message;
            this.errorLog = true;
          } else {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.$router.push({ path: "/" });
          }
        })
        .catch((e) => {
          this.loading = false;
          this.entity = e.response.data;
          this.message = this.entity.message;
          this.errorLog = true;
        });
    },
    restaurantRegistration() {
      this.loading = true;
      userServices
        .register(this.restaurant)
        .then((response) => {
          this.entity = response.data;
          console.log(this.entity.user);
          if (this.entity.message) {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.message = this.entity.message;
            this.errorLog = true;
          } else {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.$router.push({ path: "/" });
          }
        })
        .catch((e) => {
          this.loading = false;
          this.entity = e.response.data;
          this.message = this.entity.message;
          this.errorLog = true;
        });
    },

    isClientNameValid() {
      if (regName.test(this.client.lastName)) {
        this.errorClientName = false;
      } else {
        this.errorClientName = true;
      }
    },
    isRestaurantNameValid() {
      if (regName.test(this.restaurant.name)) {
        this.errorRestaurantName = false;
      } else {
        this.errorRestaurantName = true;
      }
    },
    isRestaurantNameCharacterValid() {
      if (this.restaurant.name.length > 3) {
        this.errorRestaurantNameCharacter = false;
      } else {
        this.errorRestaurantNameCharacter = true;
      }
    },
    isClientCharacterNameValid() {
      if (this.client.lastName.length > 3) {
        this.errorClientCharacterName = false;
      } else {
        this.errorClientCharacterName = true;
      }
    },
    isClientFirstNameCharacterValid() {
      if (this.client.firstName.length > 3) {
        this.errorClientCharacterFirstName = false;
      } else {
        this.errorClientCharacterFirstName = true;
      }
    },
    isClientFirstNameValid() {
      if (regName.test(this.client.firstName)) {
        this.errorClientFirstName = false;
      } else {
        this.errorClientFirstName = true;
      }
    },
    isClientMailValid() {
      if (regMail.test(this.client.email)) {
        this.errorClientMail = false;
      } else {
        this.errorClientMail = true;
      }
    },
    isRestaurantMailValid() {
      if (regMail.test(this.restaurant.email)) {
        this.errorRestaurantEmail = false;
      } else {
        this.errorRestaurantEmail = true;
      }
    },
    isClientPhoneNumberValid() {
      if (regPhoneNumber.test(this.client.phoneNumber)) {
        this.errorClientPhoneNumber = false;
      } else {
        this.errorClientPhoneNumber = true;
      }
    },
    isRestaurantPhoneNumberValid() {
      if (regPhoneNumber.test(this.restaurant.phoneNumber)) {
        this.errorRestaurantPhoneNumber = false;
      } else {
        this.errorRestaurantPhoneNumber = true;
      }
    },
    isClientAdressValid() {
      if (regAddress.test(this.client.address)) {
        this.errorClientAddress = false;
      } else {
        this.errorClientAddress = true;
      }
    },
    isRestaurantAddressValid() {
      if (regAddress.test(this.restaurant.address)) {
        this.errorRestaurantAddress = false;
      } else {
        this.errorRestaurantAddress = true;
      }
    },
    isRestaurantImageValid() {
      if (
        regImage.test(
          document.getElementById("restaurantImage").value.substr(12)
        )
      ) {
        this.errorRestaurantImage = false;
        console.log("Ratesh is caca");
      } else {
        this.errorRestaurantImage = true;
        console.log("Ratesh is pipi");
      }
    },
    isPasswordTheSame() {
      if (this.client.password === this.client.repassword) {
        this.errorPasswordCheck = false;
      } else {
        this.errorPasswordCheck = true;
      }
    },
    isRestaurantPasswordTheSame() {
      if (this.restaurant.password === this.restaurant.repassword) {
        this.errorRestaurantPasswordCheck = false;
      } else {
        this.errorRestaurantPasswordCheck = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
md-input {
  border: none;
  background: #fff;
  font-weight: 700;
  display: block;
  height: 40px;
  outline: none;
  width: calc(100% - 24px);
  margin: auto;
  padding: 6px 12px 6px 12px;
}
.md-elevation-3 {
  margin-top: 125px;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 0px;
      max-width: 200px;
    }
  }
  .logo {
    border-radius: 2px;
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .font-title {
    color: #606d70;
    font-size: 275%;
    // font-weight: 300;
    // line-height: 58px;
    margin: 10px 0 0 0;
  }
  .form {
    margin-bottom: 60px;
  }
  // .back {
  //   background: url(../assets/computer.jpg);
  // }
  .background {
    background: rgb(90, 132, 167);
    background: linear-gradient(
      143deg,
      rgba(90, 132, 167, 1) 28%,
      rgba(63, 158, 109, 1) 62%
    );
    position: absolute;
    height: 105%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .background2 {
    background-image: url("../assets/restaurant.jpg");
    position: absolute;
    height: 105%;
    width: 100%;
    background-position: center;
    background-size: cover;
    opacity: 0.2;
    // position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 500px;
    position: relative;
    border-radius: 30px;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .error {
    color: red;
  }
}
</style>