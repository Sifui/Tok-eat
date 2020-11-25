<template>
  <transition name="fade">
    <div class="modal" v-if="modals.displayModalModification">
      <div class="modal__backdrop" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header">
            <!-- <h3>validation</h3> -->
          </slot>
        </div>

        <div class="modal__body">
          <slot name="body" />
          <div class="form">
            <p>Voulez vous vraiment valider ces modifications?</p>
          </div>
        </div>

        <div class="modal__footer">
          <slot name="footer" />
          <div class="but-1">
            <button class="but-cancel" v-on:click="closeModal">Retour</button>
          </div>
          <div class="but-2">
            <button class="but-validation" @click="validate">
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ProfilModalValidateModification",
  props: {
    me: Object,
    modals: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeModal() {
      this.$emit("close");
      this.$emit("reload");
    },
    validate() {
      this.$emit("validate");
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.but-1 {
  width: 50%;
}
.but-2 {
  width: 50%;
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

.but-validation:hover {
  cursor: pointer;
  background-color: #57915b;
  width: 88%;
  height: 38px;
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
    background-color: #ffffff;
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
    text-align: center;
    // align-items: stretch;
    overflow: auto;
    // background-color: #5589cc;
  }
  &__footer {
    padding: 10px 50px 40px 50px;
    display: flex;
  }
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