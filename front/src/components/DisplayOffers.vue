<template>
    <div >
        <displayOffer :modals="modals" :me="me" @close="closeModal"/>
        <addOffer :modals="modals" :me="me"  @close="closeModal"/>

        <check :modals="modals" :me="me"  @close="closeModal" @delete="deleteOffer"/>
        <div class="addOfferButton"><button  v-on:click="checkAddOffer()">Ajouter une offre</button></div>

        <!--<div v-for="category in categories" :key="category.id" class="flex">
            name: {{category.name}}     id: {{category.id}}
            <div v-for="offer in offersByCategory(category)" :key="offer.id"  class='border'>
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
        </div>-->
        <draggable v-model="listCategories" ghost-class="ghost" >
            <transition-group type ="transition" name="flip-list">
                <div class="sortable" :id="category.id" v-for="category in categories" :key="category.id">
                    name: {{category.name}}<br>
                    priority: {{category.priority}}
                    <!--<draggable v-model="offers" ghost-class="ghost" >
                        <transition-group type ="transition" name="flip-list">
                            <div class="sortable" :id="offer.id" v-for="offer in offersByCategory(category)" :key="offer.id">
                                name: {{offer.name}}<br>
                                priority: {{offer.priority}}
                            </div>
                        </transition-group>
                    </draggable>-->
                    <offersInDisplay :offers="offersByCategory(category)"/>  
                </div>
            </transition-group>
        </draggable>

        <addCategory :modals="modals" :me="me" @close="closeModal" @createCategory="createCategory" />
        <div class="addCategoryButton"><button  v-on:click="checkAddCategory()">Ajouter une catégorie</button></div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'
import displayOffer from "./modals/DisplayOffer";
import addOffer from "./modals/AddOffer";
import check from "./modals/Check";
import addCategory from "./modals/AddCategory";
import offersInDisplay from './offersInDisplay';

export default {
    name:'DisplayOffers',
    props:{
        me:Object,
        offers:Array,
        categories:Array
    },
    components: {
        draggable,
        displayOffer,
        check,
        addOffer,
        addCategory,
        offersInDisplay
    },
    data(){
        return {
            modals:{
                displayOffer:null,
                addOffer:null,
                deleteOffer:null,
                updateOffer:null,
                addCategory:null,
                deleteCategory:null,
                updateCategory:null,
                check:{
                    action:null
                }
            }
        }
    },
     computed: {
        listCategories: {
            get () {
                return this.categories 
            },
            set (categories) {
                this.$emit("orderCategory",categories)
            }
        }
    },
    methods:{
        offersByCategory(category)
        {
            let offers = []
            for(let offer of this.offers)
            {
                if(offer.idcategory === category.id)
                {
                    offers.push(offer)
                }
            }
            return offers
        },
        onEnd(evt)
        {
            console.log(evt)
        },
        displayOffer(offer)
        {
            this.modals.displayOffer = offer
        },
        checkAddOffer()
        {
            this.modals.addOffer = true
        },
        checkAddCategory()
        {
            this.modals.addCategory = true
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
            this.$emit("deleteOffer",offer)
        },
        createCategory(category)
        {
            category.priority = this.categories[this.categories.length-1].priority + 1
            this.$emit('createCategory',category)
        },
        closeModal(){
            this.modals = {
                displayOffer:null,
                addOffer:null,
                deletOffer:null,
                updateOffer:null,
                addCategory:null,
                deleteCategory:null,
                updateCategory:null,
                check:{
                    action:null
                }
            }
        }
    }
}
</script>

<style scoped>
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
    border:1px solid black;
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
.addOfferButton{
    padding: 10px 10px 10px 10px;
}
.addCategoryButton{
    padding: 10px 10px 10px 10px;
}
.sortable{
    width: 100%;
    background:white;
    padding: 1em;
    cursor: grab;
    margin-bottom: 2px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    border:1px solid black;
}
.flip-list-move{
    transition: transform 0.5s;
}
.ghost{
    border-left: 6px solid rgb(0, 183, 255);
    box-shadow: 10px 10px 5px -1px rgba(0,0,0,0.14);
    opacity: .7;
    
}

</style>