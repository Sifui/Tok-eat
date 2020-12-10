<template>
    <div>
        <createCategory @createCategory="createCategory"/> 
        <draggable v-model="listCategories" ghost-class="ghost" >
            <transition-group type ="transition" name="flip-list">
                <div class="sortable" :id="category.id" v-for="category in listCategories" :key="category.id">
                    <h2  class="flex">
                        <div class="text">{{category.name}} </div> 
                        <updateCategory :oldCategory="category" @updateCategory="updateCategory"/>
                        <deleteCategory :data="category" :deleteType="'category'" @deleteCategory="deleteCategory"/>
                    </h2>
                    <offersInDisplay :offers="offersByCategory(category)" :category="category" @orderOffer="orderOffer" @deleteOffer="deleteOffer" @updateOffer="updateOffer"/>
                    <createOffer :category="category" @createOffer="createOffer"/>
                </div>
            </transition-group>
        </draggable>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

import createCategory from './modals/CreateCategory.vue';
import createOffer from './modals/CreateOffer.vue';
import deleteCategory from './modals/DeleteConfirm.vue';
import updateCategory from './modals/UpdateCategory.vue';

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
        offersInDisplay,
        createCategory,
        createOffer,
        deleteCategory,
        updateCategory
    },
    data(){
        return {
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
        offersByIdCategory(id)
        {
            let offers = []
            for(let offer of this.offers)
            {
                if(offer.idcategory === id)
                {
                    offers.push(offer)
                }
            }
            return offers
        },
        orderOffer(data){
            this.$emit("orderOffer",data)
        },
        createOffer(offer)
        {
            offer.priority = (this.offersByIdCategory(offer.idCategory).length)+1
            this.$emit("createOffer",offer)
        },
        deleteOffer(offer)
        {
            this.$emit("deleteOffer",offer)
        },
        updateOffer(offer)
        {
            this.$emit('updateOffer',offer)
        },
        createCategory(category)
        {
            category.idRestaurant = this.me.id
            if(this.categories.length === 0)
            {
                category.priority = 0
            }
            else
            {
                category.priority = this.categories[this.categories.length-1].priority + 1
            }

            this.$emit('createCategory',category)
        },
        deleteCategory(category)
        {
            this.$emit("deleteCategory",category)
        },
        updateCategory(category)
        {
            this.$emit('updateCategory',category)
        },
    }
}
</script>

<style scoped>
.Button{
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
.flex{
    display:flex
}
.text{
    text-align: center;
    line-height: 40px;
}
.margin{
    margin-top: 250px;
}

</style>