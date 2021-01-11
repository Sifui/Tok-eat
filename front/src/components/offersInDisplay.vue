<template>
  <div>
        <draggable v-model="offers" ghost-class="ghost" >
            <transition-group type ="transition" name="flip-list">
                <div class="sortable" :id="offer.id" v-for="offer in offers" :key="offer.id">
                    name: {{offer.name}}<br>
                    priority: {{offer.priority}}
                </div>
            </transition-group>
        </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name:'offersInDisplay',
    props:
    {
        offers:Array
    },
    components: 
    {
        draggable
    },
    data()
    {
        return {}
    }
}
</script>

<style lang="scss" scoped>

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