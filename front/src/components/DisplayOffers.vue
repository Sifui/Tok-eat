<template>
    <div calss="flex">
        <displayOffer :offer="modals.displayOffer" :me="me" @close="closeModal"/>
        <addOffer :modals="modals" :me="me"  @close="closeModal"/>

        <check :modals="modals" :me="me"  @close="closeModal" @delete="deleteOffer"/>
        <br><button v-on:click="checkAddOffer()">Ajouter une offre</button><br><br>

        <div v-for="offer in offers" :key="offer.id" class="border">
            <div v-on:click="displayOffer(offer)" class='offer'>
                {{offer.name}}<br>
                {{offer.price}} €<br>
                {{offer.description}}<br>
            </div>
            <div class='buttons'>
                <button class="buttonDeletAndUpdate">Modifier</button>
                <button v-on:click="checkDelete(offer)" class="buttonDeletAndUpdate">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import offerServices from "../services/offerServices";
import displayOffer from "./modals/DisplayOffer";
import addOffer from "./modals/AddOffer";
import check from "./modals/Check";

export default {
    name:'DisplayOffers',
    props:{
        me:Object,
        offers:Array
    },
    components: {
        displayOffer,
        check,
        addOffer
    },
    data(){
        return {
            modals:{
                displayOffer:null,
                addOffer:null,
                deleteOffer:null,
                updateOffer:null,
                check:{
                    action:null,
                    answer:false
                }
            }
        }
    },
    methods:{
        displayOffer(offer)
        {
            this.modals.displayOffer = offer
        },
        checkAddOffer()
        {
            this.modals.addOffer = true
        },
        checkDelete(offer)
        {
            this.modals.deleteOffer = offer
            this.modals.check.action = "delete"
        },
        checkUpdate(offer)
        {
            this.modals.updateOffer = offer
            this.modals.check.action = "update"
        },
        async deleteOffer(offer)
        {
            await offerServices.deleteOffer(offer)
            this.$emit("reload")
        },
        closeModal(){
            this.modals = {
                displayOffer:null,
                addOffer:null,
                deletOffer:null,
                updateOffer:null,
                check:{
                    action:null,
                    answer:false
                }
            }
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
.buttonDeletAndUpdate{
    height:100%;
    width: 50%;
}
</style>