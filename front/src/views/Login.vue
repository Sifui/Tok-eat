<template>
  <div class="centered-container" v-on:keyup.enter="onEnter">
    <md-content class="md-elevation-3">
      <div class="title">
        <img
          class="logo"
          src="../assets/logo_min6.png"
          v-on:click="$router.push('/').catch(() => {})"
        />
        <!-- <div class="md-title font-title">Tok' eat</div> -->
        <div class="md-body-1"></div>
      </div>

      <div class="form">
        <md-field>
          <label for="LogEmail">E-mail</label>
          <md-input
            id="LogEmail"
            name="LogEmail"
            type="email"
            v-model="login.email"
            @change="isEmailValid"
            autofocus
          ></md-input>
          <!-- <span class="error" v-show="this.emailError"
            >Invalid email</span
          > -->
        </md-field>

        <md-field md-has-password>
          <label>Mot de Passe</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
        <span class="error" v-if="this.errorLog || this.emailError">
          Email ou mot de passe incorrecte
        </span>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="#">Mot de passe oublié?</a>
        <!-- <router-link to="/">Forget your password?</router-link> -->

        <md-button
          class="md-raised md-primary"
          type="submit"
          :disabled="isDisabled"
          @click="auth"
          >CONNEXION</md-button
        >
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>

      <!-- <md-dialog-alert
        :md-active.sync="errorLog"
        md-title="LOGIN ERROR"
        md-content="wrong <strong>email</strong> or <strong>password</strong>"
      /> -->
    </md-content>
    <div class="background" />
    <div class="background2" />
  </div>
</template>

<script>
import userServices from "../services/userServices";
const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      loading: false,
      errorLog: false,
      emailError: false,
      passwordError: null,

      // authButtonDisable : true,
      login: {
        email: "",
        password: "",
      },
      person: [],
    };
  },
  computed: {
    isDisabled() {
      return !this.login.email || !this.login.password ? true : false;
    },
  },
  methods: {
    async auth() {
      try {
        this.loading = true;
        const response = await userServices.findByEmail(this.login);

        this.person = response.data;
        if (this.person.user === false) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.errorLog = true;
        } else {
          setTimeout(() => {
            this.loading = false;
          }, 1000);

          const user = await userServices.me();
          await this.$store.dispatch("fetchUser");
          //this.$socket.open();
          console.log('TEST socket.open()')
          if (user.data.type === "client") {
            this.$router.push({ path: "/" });
          } else if (user.data.type === "restaurant") {
            this.$router.push({ path: "/Index2" });
          }
        }
      } catch (err) {
        this.loading = false;
      }
    },
    onEnter: function () {
      this.loading = true;
      userServices
        .findByEmail(this.login)
        .then(async (response) => {
          this.person = response.data;
          if (this.person.user === false) {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.errorLog = true;
          } else {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            const user = await userServices.me();
            if (user.data.type === "client") {
              this.$router.push({ path: "/" });
            } else if (user.data.type === "restaurant") {
              this.$router.push({ path: "/RestaurantDashBoard" });
            }
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    isEmailValid() {
      if (reg.test(this.login.email)) {
        // this.emailError = false;
        this.errorLog = false;
      } else {
        // this.emailError = true;
        this.errorLog = true;
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
.error {
  color: red;
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
    cursor: pointer;
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
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }

  .background2 {
    background-image: url("../assets/backgroundplat.jpg");
    position: absolute;
    height: 100%;
    width: 100%;
    // background-position: center;
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