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
          <select name="notes" id="selection-note" v-on:change="grade = $event.target.value;">
    <option value="">--Choisir une note</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>
  <br>
          <textarea id="avis" v-model="feedback"> </textarea>
          <br>
          <button type="button" v-on:click="sendFeedback">Envoyer</button>
        </md-card-header>
      </md-card>
      <div class="display-feedbacks">

          <div v-for="(item,index) in feedbacks" v-bind:key="index"></div>

  
      </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
    name:'Restaurant',
    props:{},
    data(){
        return {
          grade:1,
          feedback:'',
          feedbacks : []
        }
    },
    methods:{
        sendFeedback(){
            console.log(this.grade)
            if ( this.grade && this.feedback.length > 0)
            {
              const idRestaurant = this.$route.query.id
              console.log(idRestaurant)
              axios.post('http://localhost:8081/client-restaurant/feedback',{
                
                  'id_client': 1,
                  'id_restaurant': idRestaurant,
                  'grade':this.grade,
                  'feedback': this.feedback
                
              })
            }
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