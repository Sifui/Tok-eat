<template>
  <div style="height: 80vh">
    <div
      class="flex-container"
      style="overflow: auto; max-width: 500px; max-height: 70vh; margin: auto"
    >
      <div class="column">
        <div style="text-align: center">Reservations en cours</div>
        <div v-if="reservations[0].length">
          <div
            v-for="item in reservations"
            :key="item.id"
            v-bind:class="{
              success: item.validated == 'validated',
              cancel: item.validated == 'cancel',
            }"
            style="border: 1px solid black; margin: 10px; padding: 20px"
          >
            {{ item.id_client }}
            <div v-for="article in item" :key="article.id">
              {{ article.quantity }}
              {{ article.name }}
              {{ article.price }}€
            </div>
            <input type="text" v-model="message" v-if="!item.validated"/>
            <button
              v-if="!item.validated"
              type="button"
              v-on:click="
                cancelReservation(item);
                item.validated = 'cancel';
              "
            >
              Annuler
            </button>
            <button
              v-if="!item.validated"
              type="button"
              v-on:click="
                validateReservation(item);
                item.validated = 'validated';
              "
            >
              Valider
            </button>
            
          </div>
        </div>
      </div>
      <div class="column">
        <div style="text-align: center">Reservations annulées</div>
        <div
          v-for="item in cancellations"
          :key="item.id"
          style="border: 1px solid black; margin: 10px; padding: 20px"
          class="cancel"
        >
          {{ item.id_client }}
          <div v-for="article in item" :key="article.id">
            {{ article.quantity }}
            {{ article.name }}
            {{ article.price }}€
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Reservations",
  props: {},
  components: {},
  data() {
    return {
      user: null,
      reservations: [[]],
      render: true,
      cancellations: [],
      message:''
    };
  },
  methods: {
    async validateReservation(item){
        //await axios.put(`http://localhost:8081/basket/validate`)
        
        this.$socket.emit('validation',{clientId:item[0].id_client,restaurantId:this.user.id})
        this.$forceUpdate();
        //this.reservations.splice(this.reservations.indexOf(item),1)
        //this.reservations.push([])
    },
    async cancelReservation(item){
        if (!this.message)
        this.message = 'reservation annulée'
        this.$socket.emit('restaurantCancelledReservation',{clientId:item[0].id_client,restaurantId:this.user.id,message:this.message})
        this.$forceUpdate();
    },
    async refreshData(){
    this.reservations = [[]]
  console.log('resto',this.user.id)
    let result = await axios.get(
      `http://localhost:8081/ordered_products/restaurant`
    );
    const temp = result.data;
    console.log('temp',temp)
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
    },
  },

  async created() {
    this.user = this.$store.state.user;
    this.refreshData();
  },
  
  sockets: {
    notification() {
      console.log('reservation passé !!!')
      //alert('une reservation a été passé chez vous !')
      this.refreshData();
      //  this.render = false;

      this.$nextTick(() => {
        // Add the component back in
        //  this.render = true;
      });
    },
    cancelled(id){
      //this.refreshData()
      for (let i = 0; i < this.reservations.length; i++) {
        if (this.reservations[i][0].id_client == id) {
          this.reservations[i].validated = "cancel";
          this.$forceUpdate();
          this.cancellations.push(this.reservations[i]);
          this.reservations.splice(i, 1);
          if (!this.reservations.length) this.reservations.push([]);

          break;
        }
      }
    },
  },
};
</script>

<style>
.success {
  background-color: green;
}
.cancel {
  background-color: orange;
}
.column {
  padding: 10px;
  border: 1px solid black;
}
</style>