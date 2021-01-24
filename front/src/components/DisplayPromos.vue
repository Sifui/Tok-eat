<template>
    <div>
        <createPromo @createPromo="createPromo"/>
        <div class="flexText" v-for="promo in promos" :key="promo.id">
            <h2>{{promo.name}}</h2>
            {{promo.percent}}% de remise<br>
            valable jusqu'au {{frenchDate(promo.date)}}
            <updatePromo :oldPromo="promo" @updatePromo="updatePromo"/>
            <deletePromo :data="promo" :deleteType="'promo'" @deletePromo="deletePromo"/>
        </div>
    </div>
</template>

<script>
import createPromo from './modals/CreatePromo.vue';
import deletePromo from './modals/DeleteConfirm.vue';
import updatePromo from './modals/UpdatePromo.vue';
export default {
    name:'DisplayPromos',
    props:{
        me:Object,
        promos:Array,
    },
    components: {
        createPromo,
        deletePromo,
        updatePromo
    },
    data(){
        return {
        }
    },
    computed: {
    },
    methods:{
        createPromo(promo)
        {
            this.$emit('createPromo',promo)
        },
        deletePromo(promo)
        {
            this.$emit('deletePromo',promo)
        },
        updatePromo(promo)
        {
            this.$emit('updatePromo',promo)
        },
        frenchDate(string)
        {
            const date = new Date(string)
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            return date.toLocaleDateString('fr-FR', options)
        }
    }
}
</script>

<style scoped>
.flexText{
    padding: 1em;
    flex-shrink: 4;
    border:1px solid black;
}
</style>