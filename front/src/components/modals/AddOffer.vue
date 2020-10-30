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
                    <md-input v-model="offer.name" type="text"></md-input>
                </md-field>
                
                <md-field md-has-password>
                    <label>Prix</label>
                    <md-input v-model="offer.price" type="text"></md-input>
                </md-field>

                <span class="error" >
                    {{errorMessage}}
                </span>

            </div>
        </div>

        <div class="modal__footer">
            <slot name="footer"/>
                <button v-on:click="closeModal">Retour</button>
                <button class="rightCentredButton">Confirmer</button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name:'DisplayOffer',
    props:{
        me:Object,
        modals:Object
    },
    data(){
        return {
            errorMessage:null,
            offer:{
                name:null,
                price:null,
                description:null,
                image:null,
                idRestaurant:this.me.idRestaurant,
                idPromo:null
            }
        }
    },
    methods:{
        closeModal(){
            this.$parent.closeModal()
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


</style>