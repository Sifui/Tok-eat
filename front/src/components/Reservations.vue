<template>
<div>
  <div v-if="render && reservations[0].length" class="flex-container" style="overflow:auto;max-width:500px;max-height:70vh;margin:auto;flex-direction:column">
    <div
      v-for="item in reservations"
      :key="item.id" v-bind:class="{success:item.validated}"
      style="border: 1px solid black; margin: 10px; padding: 20px;"
    >
      {{ item.id_client }}
      <div v-for="article in item" :key="article.id">
        {{article.quantity}}
        {{article.name}}
        {{article.price}}€
      </div>
      <button type="button" v-on:click="validateReservation(item);item.validated = true">Valider</button>
    </div>
  </div>
  <div v-else>
    Aucune reservation en cours...
  </div>
  </div>
</template>

<script>
import axios from "axios";
import userServices from "../services/userServices";
export default {
  name: "Reservations",
  props: {},
  components: {},
  data() {
    return {
      user: null,
      reservations: [[]],
      render:true
    };
  },
  methods: {
    async validateReservation(item){
        await axios.put(`http://localhost:8081/basket/${item[0].id_basket}`)
        this.$socket.emit('validation',{clientId:item[0].id_client,restaurantId:this.user.id})
        this.$forceUpdate();
        //this.reservations.splice(this.reservations.indexOf(item),1)
        //this.reservations.push([])
    },
    async refreshData(){
    this.reservations = [[]]

    this.user = await userServices.me();
    this.user = this.user.data;
    let result = await axios.get(
      `http://localhost:8081/ordered_products/restaurant/${this.user.id}`
    );
    const temp = result.data;
    if (!temp.length)
      return
    let index = 0;
    this.reservations[index].push(temp[0]);
    for (let i = 1; i < temp.length; i++) {
      if (temp[i].id_basket != temp[i - 1].id_basket) {
        index++;
        this.reservations.push([]);
      }
      this.reservations[index].push(temp[i]);
    }  
    }
  },
  async created() {
    
    this.refreshData()
  },
  sockets:{
    notification(){
      alert('une reservation a été passé chez vous !')
          this.refreshData()
     //  this.render = false;

        this.$nextTick(() => {
          // Add the component back in
        //  this.render = true;
        });

    }
  }
};
</script>

<style>
.success{
  background-color:green
}
</style>