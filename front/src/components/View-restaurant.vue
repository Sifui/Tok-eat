<template>
<div class="conteneur">
  <div id="preview">
    <h1 class="title" id="name"></h1>
  <div class="subheading"  id="address"></div>
   <div class="subheading" id="phone"></div>
       
    
    <div id="restaurant-image">
        <img
          src="https://breathe-restaurant.com/wp-content/uploads/2019/12/brEAThe-archi-1.jpeg"
          alt="People"
        />

    </div>

        
        <select
          name="notes"
          id="selection-note"
          v-on:change="grade = $event.target.value"
        >
          <option value="">--Choisir une note</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <textarea id="avis" v-model="feedback"> </textarea>
        <br />
        <button type="button" v-on:click="sendFeedback">Envoyer</button>
    <div class="display-feedbacks">   
      <div
        v-for="(item, index) in feedbacks"
        v-bind:key="index"
        class="feedback-container"
      >
        <div class="header">
          <div><img width="40" src="../assets/profil.jpg" alt="" /></div>
          <div class="metadata-wrapper">
            <div class="metadata">
              <div class="author">
                {{ item.first_name }} {{ item.last_name }}
              </div>
              <div class="date">{{ item.grade_date }}</div>
            </div>
            <div class="grade">{{ item.grade }}/5</div>
          </div>
        </div>
        <div class="feedback-content">
          <div>{{ item.feedback }}</div>
        </div>
      </div>
    </div>
    
  </div>
  <div id="description">

      <div>labels</div>
      <div style="display:flex;justify-content:space-between">
        <div> titre </div>
        <div> prix</div>
      </div>
      <div></div>
      <div></div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "View-restaurant",
  props: {},
  data() {
    return {
      grade: 1,
      feedback: "",
      feedbacks: [],
    };
  },
  methods: {
    sendFeedback() {
      if (this.grade && this.feedback.length > 0) {
        const idRestaurant = this.$route.query.id;
        axios.post("http://localhost:8081/client-restaurant", {
          id_client: 1,
          id_restaurant: idRestaurant,
          grade: this.grade,
          feedback: this.feedback,
        });
        this.feedbacks.push({  id_client: 1,
          id_restaurant: idRestaurant,
          grade: this.grade,
          feedback: this.feedback,})
      }
    },
  },
  created() {
    axios
      .get(`http://localhost:8081/restaurants/${this.$route.query.id}`)
      .then((response) => {
        const { data } = response;
        document.getElementById("name").innerText = data.name;

        document.getElementById("address").innerText = data.address;
        document.getElementById("phone").innerText = data.phone_number;
      })
      .catch(() => {});
    axios
      .get(`http://localhost:8081/client-restaurant/${this.$route.query.id}`)
      .then((response) => {
        console.log(response);

        this.feedbacks = [...response.data];
        console.log(this.feedbacks);
      })
      .catch(() => {});
  },
};
</script>

<style scoped>
.conteneur {
  display: flex;
  max-width: 1100px;
  padding-top: 11%;
  margin: auto;
}
.conteneur > div {
}
.feedback-container {
  border: 1px solid silver;
  padding: 30px;
   font-style: italic;
  padding-top: 20px;
}

.header {
  display: flex;
  flex-direction: row;
}

.grade {
  text-align: right !important;
    flex:1

}
.metadata-wrapper{
  display: flex;
  margin-left: 10px;
  flex:1;
  
}
#restaurant-image{
  margin-top:30px ;
}

#preview{
  flex:60%
}
#description{
  flex:40%
}
</style>