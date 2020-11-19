<template>
  <transition name="fade">
    <div class="modal" v-if="modals.addCategory">
      <div class="modal__backdrop"/>

      <div class="modal__dialog">
        <div class="modal__header">
            <slot name="header"/>
        </div>

        <div class="modal__body">
            <slot name="body"/>
            <div class="form">
                <md-field>
                    <label for="name">Nom de la catégorie</label>
                    <md-input v-model="category.name" @change="isNameValid" type="text" id="name"></md-input>
                    <span class="error" v-show="this.categoryError.name">3 à 45 caractères</span>
                </md-field>
            </div>
        </div>

        <div class="modal__footer">
            <slot name="footer"/>
                <md-button v-on:click="closeModal">Retour</md-button>
                <md-button 
                class="rightCentredButton"
                :disabled="isDisabledOffer"
                @click="createCategory(category)"
                >
                  Confirmer
                </md-button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name:'AddCategory',
    props:{
        me:Object,
        modals:Object
    },
    data(){
        return {
            category:{
                name:null,

            },
            categoryError:{
              name:false,
            }
        }
    },
    computed:{
      isDisabledOffer() {
        return !this.category.name ||
        this.categoryError.name
        ? true
        : false;
      }
    },
    methods:{
        closeModal(){
          this.category = {
            name:null,
          }
          this.categoryError= {
            name:false,

          }
          this.$emit('close')
        },
        createCategory(category)
        {
            category.idRestaurant = this.me.id
            this.$emit('createCategory',category)
            this.closeModal()
        },
        isNameValid(){
          if (this.category.name.length > 2 && this.category.name.length < 46) {
            this.categoryError.name = false;
          } else {
            this.categoryError.name = true;
          }
        },
    }
}
</script>

<style lang="scss" scoped>
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
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 20px 20px 10px;
    }
    &__body {
      padding: 10px 20px 10px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    &__footer {
      padding: 10px 20px 20px;
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
  .rightCentredButton{
    float: right  
  }
  .error {
    color: red;
  }

</style>