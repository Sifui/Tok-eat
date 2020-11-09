<template>
  <transition name="fade">
    <div class="modal" v-if="modals.addOffer">
      <div class="modal__backdrop"/>

      <div class="modal__dialog">
        <div class="modal__header">
            <slot name="header"/>
        </div>

        <div class="modal__body">
            <slot name="body"/>
            <div class="form">
                <md-field>
                    <label for="name">Nom de l'offre</label>
                    <md-input v-model="offer.name" @change="isNameValid" type="text" id="name"></md-input>
                    <span class="error" v-show="this.offerError.name">3 à 45 caractères</span>
                </md-field>
                
                <md-field>
                    <label for="price">Prix</label>
                    <md-input v-model="offer.price" @change="isPriceValid" type="number" min="0" max="9999" id="price"></md-input>
                    <span class="error" v-show="this.offerError.price">Prix invalide</span>
                </md-field>

                <md-field>
                    <label for="description">Description</label>
                    <md-textarea v-model="offer.description" @change="isDescriptionValid" type="text" id="description"></md-textarea>
                </md-field>
                <span class="error" v-show="this.offerError.description">3 à 500 caractères</span>
            </div>
        </div>

        <div class="modal__footer">
            <slot name="footer"/>
                <md-button v-on:click="closeModal">Retour</md-button>
                <md-button 
                class="rightCentredButton"
                :disabled="isDisabledOffer"
                @click="closeModal"
                >
                  Confirmer
                </md-button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
const regName = /^[^~"#{([|`^\])}=+-/*$£¤%µ!:;,?.§]*$/;
export default {
    name:'DisplayOffer',
    props:{
        me:Object,
        modals:Object
    },
    data(){
        return {
            offer:{
                name:null,
                price:null,
                description:null,
                image:null,
                idRestaurant:this.me.idRestaurant,
                idPromo:null
            },
            offerError:{
              name:false,
              price:false,
              description:false,
              image:false,
              idPromo:false
            }
        }
    },
    computed:{
      isDisabledOffer() {
        return !this.offer.name ||
        !this.offer.price ||
        !this.offer.description ||
        this.offerError.name ||
        this.offerError.price ||
        this.offerError.description
        ? true
        : false;
      }
    },
    methods:{
        closeModal(){
          this.offer = {
            name:null,
            price:null,
            description:null,
            image:null,
            idRestaurant:this.me.idRestaurant,
            idPromo:null
          }
          this.offerError= {
            name:false,
            price:false,
            description:false,
            image:false,
            idPromo:false
          }
          this.$emit('close')
        },
        isNameValid(){
          if (regName.test(this.offer.name) && this.offer.name.length > 2 && this.offer.name.length < 46) {
            this.offerError.name = false;
          } else {
            this.offerError.name = true;
          }
        },
        isPriceValid(){
          if (this.offer.price > 0 && this.offer.price < 9999) {
            this.offerError.price = false;
          } else {
            this.offerError.price = true;
          }
        },
        isDescriptionValid(){
          if (regName.test(this.offer.description) && this.offer.description.length > 2 && this.offer.description.length < 501) {
            this.offerError.description = false;
          } else {
            this.offerError.description = true;
          }
        }
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