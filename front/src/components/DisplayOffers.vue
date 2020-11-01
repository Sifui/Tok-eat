<template>
    <div calss="flex">
        <div v-for="offer in offers" :key="offer.id" class="border">
            <div v-on:click="displayOffer()" class='offer'>
                {{offer.name}}<br>
                {{offer.price}} €<br>
                {{offer.description}}<br>
            </div>
            <div class='buttons'>
                <button>Modifier</button>
                <button v-on:click="deleteOffer(offer)">Supprimer</button>
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
    flex: 1 1 auto;
    border:1px solid black;
    width: 100%;
    text-align: center; 
}
.flex{
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
}
.offer{
    border:1px solid black;
    width: 80%;
    text-align: center;
}
.buttons{
    border:1px solid black;
    width: 20%;
    text-align: center;
}
button{
    height:100%;
    width: 50%;
}
</style>