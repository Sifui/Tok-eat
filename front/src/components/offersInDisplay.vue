<template>
  <div>
        <draggable v-model="listOffers" ghost-class="ghost" :group="{ name: 'offers', pull: 'clone' }">
            <transition-group type ="transition" name="flip-list">
                <div class="sortable" :id="offer.id" v-for="offer in listOffers" :key="offer.id">
                    {{offer.name}}<br>
                    {{offer.description}}<br>
                    {{offer.price}}€
                    <div class="flex">
                        <updateOffer :oldOffer="offer" @updateOffer="updateOffer"/>
                        <deleteOffer :data="offer" :deleteType="'offer'" @deleteOffer="deleteOffer"/>
                    </div>
                </div>
                <p v-if="listOffers.length==0" key="4711">Déplacer une offre ici</p>
            </transition-group>
        </draggable>
  </div>
</template>

<script>

import deleteOffer from './modals/DeleteConfirm.vue';
import updateOffer from './modals/UpdateOffer.vue';
import draggable from 'vuedraggable';
export default {
    name:'offersInDisplay',
    props:
    {
        offers:Array,
        category:Object
    },
    components: 
    {
        draggable,
        deleteOffer,
        updateOffer
    },
    data() {
        return {
            categorieStart:null
        };
    },
    computed: {
        listOffers: {
            get () {
                
                return this.offers 
            },
            set (offers) {
                let data = {
                    offers:offers,
                    category:this.category,
                }
                this.$emit("orderOffer",data)
            },
        }
    },
    methods:{
        deleteOffer(offer)
        {
            this.$emit("deleteOffer",offer)
        },
        updateOffer(offer)
        {
            this.$emit("updateOffer",offer)
        }
    }
}
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
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