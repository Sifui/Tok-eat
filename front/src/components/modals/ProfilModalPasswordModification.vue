<template>
  <transition name="fade">
    <div class="modal" v-if="modals.displayProfilModalPassword">
      <div class="modal__backdrop" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header">
            <h3>Modification de votre mot de passe</h3>
          </slot>
        </div>
        <hr />
        <div class="modal__body">
          <slot name="body" />
          <div class="form" v-if="!passwordChecked">
            <div class="label-div">
              <label>Veuillez saisir votre mot de passe actuel</label>
            </div>
            <div class="input-div">
              <input type="password" v-model="this.password"/>
            </div>
            <div class="label-div">
              <!-- <p class="error">Le mot de passe saisi est incorrecte</p> -->
            </div>
          </div>
          <div class="form" v-else>
            <div>
              <div class="label-div">
                <label for="">Veuillez saisir votre nouveau mot de passe</label>
              </div>
              <div class="input-div">
                <input type="password" />
              </div>
              <div class="label-div">
                <label for="">Confirmez votre nouveau mot de passe</label>
              </div>
              <div class="input-div">
                <input type="password" />
              </div>
              <div class="label-div">
                <p class="error" for="">Mot de passe différents</p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal__footer">
          <slot name="footer" />
          <md-button v-on:click="closeModal">annuler</md-button>
          <md-button class="rightCentredButton" v-if="!passwordChecked" @click="check_password" > Vérifier </md-button>
          <md-button class="rightCentredButton" v-else> Confirmer modification </md-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import UserServices from "@/services/userServices";
export default {
  name: "ProfilModalPasswordModification",
  props: {
    user: Object,
    modals: Object,
  },
  data() {
    return {
      passwordChecked: false,
      password:"",
    };
  },
  computed: {},
  methods: {
    closeModal() {
      this.$emit("close");
      this.$emit("reload");
    },
    check_password(){
      // console.log(this.user);
      UserServices.check_password(this.user).then((response)=>{
        this.passwordChecked=response.data
      })
    }
    // validate() {
    //   this.$emit("validate");
    //   this.$emit("close");
    // },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  &__dialog {
    position: relative;
    width: 600px;
    background-color: #ebebeb;
    border-radius: 5px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    width: 30px;
    height: 30px;
  }
  &__header {
    // display: flex;
    // align-items: flex-start;
    // justify-content: space-between;
    padding: 10px 0px 10px 20px;
    // background-color: aqua;
    text-align: center;
    text-transform: uppercase;
  }
  &__body {
    padding: 10px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    // align-items: stretch;
    overflow: auto;
    // background-color: #5589cc;
  }

  &__footer {
    padding: 10px 20px 20px;
  }
}
.label-div {
  margin-bottom: 20px;
}
.input-div {
  margin-bottom: 20px;
  height: 40px;
  //   background-color: rebeccapurple;
}
.input-div input {
  height: 100%;
  width: 100%;
  border: solid;
  padding-left: 3%;
  border-width: 1px;
  border-color: rgb(77, 112, 112);
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 17px;
}
.input-div input:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.rightCentredButton {
  float: right;
}
.error {
  color: red;
}
</style>