<template>
  <md-toolbar md-elevation="1">
    <img
      id="logo"
      src="../assets/logo.png"
      width="100"
      v-on:click="$router.push('/').catch(()=>{})"
    />
    <div class="nav-elements md-layout md-gutter">
      <div class="md-layout-item" style="margin-right:auto;">
        <md-field>
          <label>Chercher un restaurant</label>
          <md-input
            v-model="query"
            id="search"
            v-on:keyup='fetchRestaurants'
            v-on:blur='removeSuggestions'
            autocomplete="off"

          ></md-input>
          <md-button v-on:click="redirectToRestaurant()">Rechercher</md-button>
          <div
            style="
              position: absolute;
              background-color: white;
              top: 60px;
              width: 100%;
            "
          >
            <p class="search-result"
              v-on:click="updateInput(suggestion.name)"
              style="padding: 10px; margin: 0"
              align="left"
              v-for="(suggestion, index) in suggestions"
              v-bind:key="index"
            >
              {{ suggestion.name }}
            </p>
          </div>
        </md-field>
      </div>
      <div class="md-layout-item" v-if='!user'>
        <md-button class="nav-button" v-on:click="$router.push('/login')"
          >Connexion</md-button
        >

        <md-button class="nav-button" v-on:click="$router.push('/register')"
          >Inscription</md-button
        >
      </div>
      
    </div>
     <div v-if="user">
            <md-speed-dial  md-event="hover" md-direction="bottom">
      <md-speed-dial-target>
        <md-icon >shopping_cart</md-icon>
      </md-speed-dial-target>

    </md-speed-dial> 
       <md-speed-dial  md-event="hover" md-direction="bottom" style="position:relative">
      <md-speed-dial-target >
        <md-icon>perm_identity</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content style="position:absolute;top:60px;left:8px">
        <md-button class="md-icon-button" v-on:click="$router.push('/profil')">
          <md-icon>account_circle</md-icon>
        </md-button>

        <md-button class="md-icon-button" v-on:click="$router.push('/logout')">
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial> 
    </div>
  </md-toolbar>
</template>

<script>
import axios from "axios";
import UserServices from '../services/userServices'
export default {
  name: "Navbar",
  props: {
        restaurants: Array,

  },
  data() {
    return {
      user: null,
      query: "",
      suggestions: [],
    };
  },
  methods: {
    fetchRestaurants() {
    if ( this.query.trim().length === 0)
      return
      axios
      .get(`http://localhost:8081/restaurants/trends/${this.query}`)
      .then((response) => {
        this.results = response.data;
        this.suggestions = this.results
      });
    },
    removeSuggestions(){
      setTimeout(()=>{this.suggestions = []},100)
    },
    updateInput(text) {
      this.query = text;
      this.suggestions = [];
    },
    redirectToRestaurant(){
      this.query = this.query.trim()
       if ( this.query.length === 0)
      return
     // const search = this.restaurants.find((e) => e.name.toLowerCase() === this.query.toLowerCase())
     
        this.$router.push({path:'search',query:{slug:this.query}}).catch(()=>{})

      
      this.query = ''
      this.suggestions = []
    }
  },
  async created(){
    
    const res = await UserServices.me()
    this.user = res.data
    if ( this.user)
    {
      document.getElementsByClassName("nav-elements md-layout md-gutter")[0].style.marginRight='auto'
      document.getElementsByClassName("nav-elements md-layout md-gutter")[0].style.flex = '0.7'
    }
  }

  
};
</script>

<style>
.md-toolbar + .md-toolbar {
  margin-top: 16px;
}

.md-toolbar {
  position: fixed;
  background-color: white !important;
  padding-bottom: 10px;
  padding-top: 10px;
  z-index:10000
}

#logo:hover {
  cursor: pointer;
}
.nav-button {
  margin-top: 15px;
  margin-bottom: 15px;
}

.nav-elements.md-layout.md-gutter {
  
  text-align: right;
  margin-left: 10%;
  flex:1
}
p.search-result:hover {
  background-color: lightgrey;
  color: white;
  cursor: pointer;
}
.md-speed-dial
{
  margin-right:20px 
}
.md-button.md-theme-default.md-fab:not([disabled]){
  background-color: white;
}
.md-icon.md-icon-font.md-theme-default
{
  color:black !important
}
@media screen and (max-width: 1000px) {
  
  .md-toolbar  {
    position:sticky
  }
}
</style>