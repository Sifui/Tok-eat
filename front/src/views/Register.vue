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
          <label for="type">Register as</label>
          <md-select v-model="register.type" name="type" id="type">
            <md-option value="client">Client</md-option>
            <md-option value="restaurant">Restaurant</md-option>
          </md-select>
        </md-field>
        <div v-if="this.register.type === 'client'">
          <md-field>
            <label>Name</label>
            <md-input v-model="client.lastName"></md-input>
          </md-field>
          <md-field>
            <label>Firstname</label>
            <md-input v-model="client.firstName"></md-input>
          </md-field>
          <md-field>
            <label>E-mail</label>
            <md-input v-model="client.email"></md-input>
          </md-field>
          <md-field>
            <label>Phone number</label>
            <md-input v-model="client.phoneNumber"></md-input>
          </md-field>
          <md-field>
            <label>Address</label>
            <md-input v-model="client.address"></md-input>
          </md-field>

          <md-field md-has-password>
            <label>Password</label>
            <md-input v-model="client.password" type="password"></md-input>
          </md-field>
          <md-field md-has-password>
            <label>Confirm your password</label>
            <md-input v-model="client.repassword" type="password"></md-input>
          </md-field>
        </div>
        <div v-if="this.register.type === 'restaurant'">
          <md-field>
            <label>Name</label>
            <md-input v-model="restaurant.name"></md-input>
          </md-field>
          <md-field>
            <label>E-mail</label>
            <md-input v-model="restaurant.email"></md-input>
          </md-field>
          <md-field>
            <label>Phone number</label>
            <md-input v-model="restaurant.phoneNumber"></md-input>
          </md-field>
          <md-field>
            <label>Address</label>
            <md-input v-model="restaurant.address"></md-input>
          </md-field>
          <md-field>
            <label>Description</label>
            <md-textarea v-model="restaurant.description"></md-textarea>
          </md-field>
          <md-field md-has-password>
            <label>Password</label>
            <md-input v-model="restaurant.password" type="password"></md-input>
          </md-field>
        </div>
      </div>

      <div
        v-if="this.register.type === 'client'"
        class="actions md-layout md-alignment-center-space-between"
      >
        <router-link to="/register">Forget your password?</router-link>
        <md-button
          class="md-raised md-primary"
          :disabled="isDisabledClient"
          @click="clientRegistration"
        >
          Sign in</md-button
        >
      </div>

      <div
        v-if="this.register.type === 'restaurant'"
        class="actions md-layout md-alignment-center-space-between"
      >
        <router-link to="/register">Forget your password?</router-link>
        <md-button
          class="md-raised md-primary"
          :disabled="isDisabledRestaurant"
          @click="restaurantRegistration"
        >
          Sign in</md-button
        >
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>

      <md-dialog-alert
        :md-active.sync="errorLog"
        md-title="ERROR"
        md-content="this.message"
      />
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import DataServices from "../services/data_services";
export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      loading: false,
      errorLog: false,
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
        password: "",
        repassword: "",
      },
      restaurant: {
        type: "restaurant",
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
        !this.client.password
        ? true
        : false;
    },
  },
  methods: {
    clientRegistration() {
      // this.$router.push({ path: "home" });
      this.loading = true;
      DataServices.register(this.client)
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
    background: rgb(101, 222, 115);
    background: linear-gradient(
      143deg,
      rgba(101, 222, 115, 1) 29%,
      rgba(69, 158, 63, 1) 75%
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
    max-width: 400px;
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
}
</style>