<template>
  <div class="notes">
    <md-card>
        <md-card-media >
          <img 
            src="https://breathe-restaurant.com/wp-content/uploads/2019/12/brEAThe-archi-1.jpeg"
            alt="People"
          />
        </md-card-media>
        <md-card-header>
          <div class="md-title name" id="name">a</div>
          <div class="md-subhead address" id="address">b</div>
          <div class="md-subhead phone" id="phone">c</div>
        </md-card-header>
      </md-card>
  </div>
</template>

<script>

import axios from "axios";

export default {
    name:'Restaurant',
    props:{},
    data(){
        return {

        }
    },
    created(){
        axios
      .get(`http://localhost:8081/restaurants/${this.$route.query.id}`)
      .then((response) => {
        const { data } = response;
        console.log(data)
        document.getElementById('name').innerText = data.name

                document.getElementById('address').innerText = data.address
                document.getElementById('phone').innerText = data.phone_number  

      })
      .catch(() => {
      });
    }
}
</script>

<style scoped>
.notes
{
    display: flex;
    width:500px;
      padding-top: 11%;
    margin:auto;

}
</style>