<template>
  <transition name="fade">
    <div class="modal" v-if="modals.displayProfilModalPassword">
      <div class="modal__backdrop" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header">
            <h3>Modification du mot de passe</h3>
          </slot>
        </div>
        <div class="modal__body">
          <slot name="body" />
          <div class="form" v-if="!passwordChecked">
            <div class="label-div">
              <label>Veuillez saisir votre mot de passe actuel</label>
            </div>
            <div class="input-div">
              <input
                id="actualPassword"
                ref="actualPassword"
                type="password"
                v-model="password"
              />
            </div>
            <div class="label-div">
              <button @click="showPassword"  ><i class="fas fa-eye"></i> / <i class="fas fa-eye-slash"></i></button>
            </div>
            <div class="label-div">
              <p class="error" v-show="errorPasswordCheck">
                Le mot de passe saisi est incorrecte
              </p>
            </div>
          </div>
          <div class="form" v-else>
            <div>
              <div class="label-div">
                <label for="">Veuillez saisir votre nouveau mot de passe</label>
              </div>
              <div class="input-div">
                <input
                  id="newPassword"
                  ref="newPassword"
                  type="password"
                  v-model="newPassword"
                  @change="isPasswordTheSame"
                />
              </div>
              <div class="label-div">
                <label for="">Confirmez votre nouveau mot de passe</label>
              </div>
              <div class="input-div">
                <input
                  id="newPassword2"
                  ref="newPassword2"
                  type="password"
                  v-model="newPassword2"
                  @change="isPasswordTheSame"
                />
              </div>
              <div class="label-div">
                <button @click="showBothPasswords">cacher/montrer</button>
              </div>
              <div class="label-div">
                <p class="error" v-show="errorNewPasswordCheck">
                  Mot de passe différents
                </p>
                <p class="success" v-show="passwordChangedSuccess">
                  Votre mot de passe à été changer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal__footer">
          <slot name="footer" />
          <div class="but-1">
            <button
              class="but-cancel"
              v-on:click="closeModal"
              v-show="passwordChangedSuccess"
            >
              Terminer
            </button>
            <button
              class="but-cancel"
              v-on:click="closeModal"
              v-show="!passwordChangedSuccess"
            >
              annuler
            </button>
          </div>
          <div class="but-2">
            <button
              class="but-validation"
              v-show="!passwordChecked"
              @click="check_password"
            >
              Vérifier
            </button>
            <button
              class="but-validation"
              v-show="passwordChecked"
              @click="edit_password"
              :disabled="isDisabled"
            >
              modifier
            </button>
          </div>
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
      password: null,
      passwordChecked: false,
      errorPasswordCheck: false,
      newPassword: null,
      newPassword2: null,
      passwordChangedSuccess: false,
      errorNewPasswordCheck: false,
    };
  },
  computed: {
    isDisabled() {
      return this.passwordChangedSuccess ? true : false;
    },
  },
  methods: {
    closeModal() {
      this.password = null;
      this.passwordChecked = false;
      this.errorPasswordCheck = false;
      this.newPassword = null;
      this.newPassword2 = null;
      this.passwordChangedSuccess = false;
      this.errorNewPasswordCheck = false;
      this.$emit("close");
      this.$emit("reload");
    },
    check_password() {
      this.user.password = this.password;
      // console.log(this.user);
      UserServices.check_password(this.user).then((response) => {
        this.passwordChecked = response.data.password;
      });
      if (!this.passwordChecked) {
        this.errorPasswordCheck = true;
      } else {
        this.errorPasswordCheck = false;
      }
    },
    edit_password() {
      this.user.password = this.newPassword;
      // console.log(this.user);
      UserServices.edit_password(this.user).then((response) => {
        this.passwordChangedSuccess = response.data.password;
      });
    },
    isPasswordTheSame() {
      if (this.newPassword === this.newPassword2) {
        this.errorNewPasswordCheck = false;
      } else {
        this.errorNewPasswordCheck = true;
      }
    },
    showPassword() {
      if (this.$refs.actualPassword.type === "password") {
        this.$refs.actualPassword.type = "text";
      } else if (this.$refs.actualPassword.type === "text") {
        this.$refs.actualPassword.type = "password";
      }
    },
    showBothPasswords() {
      if (this.$refs.newPassword.type === "password" && this.$refs.newPassword2.type === "password") {
        this.$refs.newPassword.type = "text";
        this.$refs.newPassword2.type = "text";
      } else if (this.$refs.newPassword.type === "text" && this.$refs.newPassword2.type === "text") {
        this.$refs.newPassword.type = "password";
        this.$refs.newPassword2.type = "password";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.success {
  color: rgb(17, 141, 48);
}
.error {
  color: red;
}
.but-1 {
  width: 50%;
}
.but-2 {
  width: 50%;
}
.but-cancel {
  width: 90%;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #b94d45;
  color: aliceblue;
  border: none;
}
.but-cancel:hover {
  cursor: pointer;
  background-color: #a82b22;
  width: 88%;
  height: 38px;
}
.but-validation {
  margin-left: 10%;
  width: 90%;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #6db672;
  color: aliceblue;
  border: none;
}
.but-validation:disabled {
  margin-left: 10%;
  width: 90%;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: #8a928b;
  color: aliceblue;
  border: none;
}
.but-validation:hover {
  cursor: pointer;
  background-color: #57915b;
  width: 88%;
  height: 38px;
}
.but-validation:disabled:hover {
  cursor: pointer;
  background-color: #8a928b;
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
    margin-bottom: 10px;
  }
  &__body {
    padding: 10px 50px 10px 50px;
    display: flex;
    flex-direction: column;
    // align-items: stretch;
    overflow: auto;
    // background-color: #5589cc;
  }

  &__footer {
    padding: 10px 50px 40px 50px;
    display: flex;
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
</style>