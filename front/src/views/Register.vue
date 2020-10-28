<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img class="logo" src="../assets/logo.png" />
        <!-- <div class="md-title font-title">Tok' eat</div> -->
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
              maxlength="30"
              v-model="client.lastName"
              @change="isClientNameValid"
            ></md-input>
            <span class="error" v-show="this.errorClientName"
              >Caractères non autorisés)
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
            ></md-input>
            <span class="error" v-show="this.errorClientFirstName"
              >Caractères non autorisés</span
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
            <md-input v-model="client.password" type="password"></md-input>
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
            <label>Nom </label>
            <md-input v-model="restaurant.name"></md-input>
          </md-field>
          <md-field>
            <label>E-mail</label>
            <md-input v-model="restaurant.email"></md-input>
          </md-field>
          <md-field>
            <label>Numéro</label>
            <md-input v-model="restaurant.phoneNumber"></md-input>
          </md-field>
          <md-field>
            <label>Adresse</label>
            <md-input v-model="restaurant.address"></md-input>
          </md-field>
          <md-field>
            <label>Description</label>
            <md-textarea v-model="restaurant.description"></md-textarea>
          </md-field>
          <md-field>
            <label>Logo du Restaurant</label>
            <md-file v-model="restaurant.image" />
          </md-field>
          <md-field md-has-password>
            <label>Mot de passe</label>
            <md-input v-model="restaurant.password" type="password"></md-input>
          </md-field>
        </div>
      </div>

      <div
        v-if="this.register.type === 'client'"
        class="actions md-layout md-alignment-center-space-between"
      >
        <md-button class="md-raised md-primary" type="submit" to="/"
          >ACCUEIL</md-button
        >
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
        <md-button class="md-raised md-primary" type="submit" to="/"
          >ACCUEIL</md-button
        >
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
  </div>
</template>

<script>
import userServices from "../services/userServices";
const regName = /^[^~"#{([|`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
const regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
const regPhoneNumber = /^(\+33|0|\+33 )[1-9]([-. ]?[0-9]{2}){4}( )*$/;
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
      errorClientImage: false,
      errorPasswordCheck: false,
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
        description: "",
        password: "",
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
        !this.restaurant.password
        ? true
        : false;
    },
  },
  methods: {
    clientRegistration() {
      // this.$router.push({ path: "home" });
      this.loading = true;
      userServices.register(this.client)
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
            this.$router.push({ path: "home" });
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    restaurantRegistration() {
      this.loading = true;
      userServices.register(this.restaurant)
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
            this.$router.push({ path: "home" });
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    isClientNameValid() {
      if (regName.test(this.client.lastName)) {
        this.errorClientName = false;
      } else {
        this.errorClientName = true;
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
    isClientPhoneNumberValid() {
      if (regPhoneNumber.test(this.client.phoneNumber)) {
        this.errorClientPhoneNumber = false;
      } else {
        this.errorClientPhoneNumber = true;
      }
    },
    isClientAdressValid() {
      if (regPhoneNumber.test(this.client.address)) {
        this.errorClientAddress = false;
      } else {
        this.errorClientAddress = true;
      }
    },
    isPasswordTheSame() {
      if (this.client.password === this.client.repassword) {
        this.errorPasswordCheck = false;
      } else {
        this.errorPasswordCheck = true;
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
  font-family: "Lato";
  font-weight: 700;
  display: block;
  height: 40px;
  outline: none;
  width: calc(100% - 24px);
  margin: auto;
  padding: 6px 12px 6px 12px;
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
    font-family: "Lato";
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
    // background: rgb(101, 222, 115);
    // background: linear-gradient(
    //   143deg,
    //   rgba(101, 222, 115, 1) 29%,
    //   rgba(69, 158, 63, 1) 75%
    // );
    background: rgb(90, 132, 167);
    background: linear-gradient(
      143deg,
      rgba(90, 132, 167, 1) 28%,
      rgba(63, 158, 109, 1) 62%
    );
    position: absolute;
    height: 100%;
    width: 100%;
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