<template>
  <md-toolbar md-elevation="4">
    <img
      id="logo"
      src="../assets/logo.png"
      width="100"
      v-on:click="$router.push('/').catch(()=>{})"
    />
    <div class="nav-elements md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label>Chercher un restaurant</label>
          <md-input
            v-model="query"
            id="search"
            v-on:keyup="fetchRestaurants"
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
      <div class="md-layout-item">
        <md-button class="nav-button" v-on:click="$router.push('/login')"
          >Connexion</md-button
        >

        <md-button class="nav-button" v-on:click="$router.push('/register')"
          >Inscription</md-button
        >
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
        restaurants: Array,

  },
  data() {
    return {
      query: "",
    suggestions: [],


    };
  },
  methods: {
    fetchRestaurants() {
      let cloneRestaurants = [...this.restaurants];
      cloneRestaurants = cloneRestaurants.map((e) => ({
        ...e,
        name: e.name.trim(),
      }));
      const exp = `^${this.query.trim().toLowerCase()}`;
      const regex = new RegExp(exp);
      this.suggestions = cloneRestaurants.filter((element) =>
        regex.test(element.name.toLowerCase())
      );
    },
    updateInput(text) {
      this.query = text;
      this.suggestions = [];
    },
    redirectToRestaurant(){
      const search = this.restaurants.find((e) => e.name.toLowerCase() === this.query.toLowerCase())
      if (search){
        this.$router.push(/*`/restaurant?id=${search.id}` */{path:'restaurant',query:{id:search.id}})
        this.query = ''
        this.suggestions = []
      }
    }
  },
  
};
</script>

<style>
.md-toolbar + .md-toolbar {
  margin-top: 16px;
}

.md-toolbar {
  position: fixed;
  background-color: white !important;
  z-index: 10000;
  padding-bottom: 10px;
  padding-top: 10px;
}

#logo:hover {
  cursor: pointer;
}
.nav-button {
  margin-top: 15px;
  margin-bottom: 15px;
}

.nav-elements.md-layout.md-gutter {
  flex: 1;
  text-align: right;
  margin-left: 10%;
}
p.search-result:hover {
  background-color: lightgrey;
  color: white;
  cursor: pointer;
}
</style>