<template>
  <div>
        <div v-for="offer in offers" :key="offer.id" class='border'>
            <div v-if="modal">
                
            </div>
            <div v-on:click="displayOffer()" class='border'>
                {{offer.name}}<br>
                {{offer.price}} €<br>
                {{offer.description}}<br>
            </div>
            <div class='border'>
                <button >Modifier</button>
                <button v-on:click="deleteOffer(offer)" >Supprimer</button>
            </div>
        </div>
  </div>
</template>

<script>
import offerServices from "../services/offerServices";

export default {
    name:'DisplayOffer',
    props:{
        me:Object,
        offers:Array
    },
    data(){
        return {
            modal:false
        }
    },
    methods:{
        displayOffer()
        {
            this.modal=true
        },
        /*hideOffer()
        {

        },*/
        async deleteOffer(offer)
        {
            await offerServices.deleteOffer(offer)
            this.$parent.creatData()
        }
    }
}
</script>

<style>
.border{
    display: flex;
    border:1px solid black;
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>