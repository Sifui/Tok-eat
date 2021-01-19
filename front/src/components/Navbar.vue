<template>
  <md-toolbar v-bind:style='{background:transparent}' v-bind:md-elevation="Number(this.showSearchField)">
    <div class="flex-container" style="width: 100%; flex-wrap: no-wrap">
      <div class="flex-container" id="parent">
        <img
          id="logo"
        v-bind:src="require('../assets/' + logo)"
          width="100"
          v-on:click="$router.push('/').catch(() => {})"
        />
        <div class="nav-elements" v-bind:style="{ display: collapse }">
          <div id="navbar-search" style="flex:0.5">
            <md-field v-if="showSearchField">
              <label>Chercher un restaurant</label>
              <md-input
                v-model="query"
                v-on:keyup="fetchRestaurants"
                v-on:blur="removeSuggestions"
                autocomplete="off"
              ></md-input>
              <md-button v-on:click="redirectToRestaurant()"
                >Rechercher</md-button
              >
              <div id="search-result-container">
                <p
                  class="search-result"
                  v-on:click="updateInput(suggestion.name)"
                  v-for="(suggestion, index) in suggestions"
                  v-bind:key="index"
                >
                  {{ suggestion.name }}
                </p>
              </div>
            </md-field>
            
          </div>
            <!--<div style="flex:0.3">
             <md-field v-if="showSearchField">
              <label>Ville</label>
              <md-input
                autocomplete="off" 
              ></md-input>
             
             
            </md-field>
          </div>-->
          <div id="navbar-icons" v-if="!user">
            <md-button v-bind:class="{'text-white':!showSearchField}" class="nav-button" v-on:click="$router.push('/login')">Connexion</md-button>

            <md-button v-bind:class="{'text-white':!showSearchField}" class="nav-button" v-on:click="$router.push('/register')"
              >Inscription</md-button
            >
            <md-speed-dial md-event="hover" md-direction="bottom">
              <md-speed-dial-target v-on:click="openCart">
                <md-icon>shopping_cart</md-icon>
              </md-speed-dial-target>
            </md-speed-dial>
          </div>
          <div id="navbar-icons" v-else>
            <md-speed-dial v-if="user.type=='restaurant'" md-event="hover" md-direction="bottom">
              <md-speed-dial-target v-on:click="$router.push({path:'/reservations'})">
                <md-icon>book_online</md-icon>
              </md-speed-dial-target>
            </md-speed-dial>
            <md-speed-dial md-event="hover" md-direction="bottom">
              <md-speed-dial-target v-on:click="openCart">
                <md-icon>shopping_cart</md-icon>
              </md-speed-dial-target>
            </md-speed-dial>
            <md-speed-dial md-event="hover" md-direction="bottom">
              <md-speed-dial-target>
                <md-icon>perm_identity</md-icon>
              </md-speed-dial-target>

              <md-speed-dial-content>
                <md-button
                  class="md-icon-button"
                  v-on:click="$router.push('/profil')"
                >
                  <md-icon>account_circle</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  v-on:click="$router.push('/logout');$cookies.set('cart',{})"
                >
                  <md-icon>exit_to_app</md-icon>
                </md-button>
              </md-speed-dial-content>
            </md-speed-dial>
          </div>
        </div>
      </div>

      <div
        id="hamburger-wrapper"
        v-bind:style="{ 'align-self': hamburgerState }"
      >
        <md-button v-on:click="collapseNavbar"
          ><md-icon>menu</md-icon></md-button
        >
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",
  props: {
    restaurants: Array,
    display: Number,
    showSearchField: Boolean,

  },
  data() {
    return {
      user: null,
      query: "",
      suggestions: [],
      showCart: false,
      collapse: "flex",
      hamburgerState: "unset",
      windowWidth: window.innerWidth,
      transparent:'transparent !important',
      logo:'logo.png'
    };
  },
  methods: {
    collapseNavbar() {
      this.collapse = this.collapse == "flex" ? "none" : "flex";
      if (this.hamburgerState == "center") this.hamburgerState = "unset";
      else this.hamburgerState = "center";
    },
    openCart() {
      if (!this.display && this.showCart) {
        this.showCart = false;
      }
      if (!this.showCart) {
        this.$emit("showcart");
        this.showCart = true;
      } else {
        this.$emit("hidecart");
        this.showCart = false;
      }
    },
    fetchRestaurants() {
      if (this.query.trim().length === 0) return;
      axios
        .get(`http://localhost:8081/restaurants/trends/${this.query}`)
        .then((response) => {
          this.results = response.data;
          this.suggestions = this.results;
        });
    },
    removeSuggestions() {
      setTimeout(() => {
        this.suggestions = [];
      }, 100);
    },
    updateInput(text) {
      this.query = text;
      this.suggestions = [];
    },
    redirectToRestaurant() {
      this.query = this.query.trim();
      if (this.query.length === 0) return;
      // const search = this.restaurants.find((e) => e.name.toLowerCase() === this.query.toLowerCase())

      this.$router
        .push({ path: "search", query: { slug: this.query } })
        .catch(() => {});

      this.query = "";
      this.suggestions = [];
    },
  },
  created() {
    this.user = this.$store.state.user
     if (window.scrollY < 800 && this.$route.name == "display-restaurants") {
        this.transparent = 'transparent !important';
                                this.logo = 'logo_min8.png'


      } else {
        this.transparent = '';
                                this.logo = 'logo_min6.png'

      }
    window.onresize = () => {
      if (window.innerWidth > 900) {
        this.collapse = "flex";
        this.hamburgerState = "center";
      } else {
        if (this.windowWidth > 900) this.collapse = "none";
        if (this.collapse != "flex") this.hamburgerState = "center";
        else {
          this.hamburgerState = "unset";
        }
      }
      this.windowWidth = window.innerWidth;
    };
   
  },
  watch: {
    showSearchField(){
      if ( this.showSearchField){
        this.transparent = ''
                        this.logo = 'logo_min6.png'

    }
      else{
                this.transparent = 'transparent !important'
                    this.logo = 'logo_min8.png'

      }
    },
    
   
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
  padding-bottom: 10px;
  padding-top: 10px;
}

#logo:hover {
  cursor: pointer;
}
#logo {
  margin-right: auto;
  /* background-color: aquamarine; */
  padding: 5px 5px 5px 5px;
  margin: 5px 40px 5px 5px;
  width: 170px;
  height: auto;
  /* width: 6% ; */
  /* height: 50%; */
  cursor: pointer;
}
.nav-button {
  margin-top: 15px;
  margin-bottom: 15px;
}
.text-white
{
  color:white !important
}
.nav-elements {
  text-align: right;
  margin-left: 10%;
  flex: 1;
}
#navbar-icons{
  padding: 10px 0 0 0;margin-left:auto
}

p.search-result:hover {
  background-color: lightgrey;
  color: white;
  cursor: pointer;
}
p.search-result {
  padding: 10px;
  margin: 0;
  text-align: left;
}
#search-result-container {
  position: absolute;
  background-color: white;
  top: 60px;
  width: 100%;
}
.md-speed-dial {
  margin-right: 20px;
  position: relative;
}
.md-speed-dial-content {
  position: absolute;
  top: 60px;
  left: 8px;
}
.md-button.md-theme-default.md-fab:not([disabled]) {
  background-color: white;
}
.md-icon.md-icon-font.md-theme-default {
  color: black !important;
}

#hamburger-wrapper {
  flex: 1;
  display: none;
  align-self: center;
}
#parent {
  flex-wrap: wrap;
  width: 100%;
}
@media screen and (max-width: 900px) {
  .md-toolbar {
    position: sticky;
  }
  #hamburger-wrapper {
    display: block;
    margin-left: auto;
  }
  .nav-elements {
    flex-direction: column;
    margin: 10px;
  }
  #parent {
    flex-direction: column;
  }
  button[type="button"],
  .md-speed-dial {
    display: block;
    color:black !important
  }
  #navbar-search {
    max-width: 300px;
  }
  #search-result-container {
    position: fixed;
    left: 60%;
  }
  #navbar-icons
  {
    margin-left:0;
    margin-right:auto
  }
}
</style>