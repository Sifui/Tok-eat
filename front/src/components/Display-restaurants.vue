<template>
  <div>
      <div class="mainframe md-accent">
      <div class="md-layout">
        <div class="md-layout-item md-size-3">
          <div id="slogan">
            Decouvrez et reservez le meilleur restaurant grâce à Tok'eat
          </div>
        </div>
        <div class="md-layout-item md-size-3">
          <img
            src="https://c.tfstatic.com/w_689,h_538,c_fill,g_auto:subject,q_auto,f_auto/tf-product/homepage-hero/fr-FR"
            alt=""
          />
        </div>
      </div>
    </div>
    <h1 class="md-display-1">Les sélections Tok'eat</h1>

    <div class="container">
      <md-card v-for="(item, index) in restaurants" v-bind:key="index">
        <md-card-media >
          <img v-on:click="$router.push(`/restaurant?id=${item.id}`)"
            src="https://breathe-restaurant.com/wp-content/uploads/2019/12/brEAThe-archi-1.jpeg"
            alt="People"
          />
        </md-card-media>
        <md-card-header>
          <div class="md-title name">{{ item.name }}</div>
          <div class="md-subhead address">{{ item.address }}</div>
          <div class="md-subhead phone">{{ item.phone_number }}</div>
        </md-card-header>
      </md-card>
      <!--
      <div class="md-layout-item md-size-20">
        <div class="sidebar">
          <md-list>
            Filtres

            <md-list-item>
              <span class="md-list-item">
                <md-checkbox>Pays</md-checkbox>
              </span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item">
                <md-checkbox>Villes</md-checkbox>
              </span>
            </md-list-item>
          </md-list>
        </div>
      </div>
      
      <div class="md-layout-item" id="map">
        <div id="map"></div>
      </div>
      -->
    </div>
  </div>
</template>

<script>


export default {
    name:'Display-restaurants',
    props:{
        restaurants: Array
    },
    data(){
        return {
        }
    },
    methods:{
          
    }
}
</script>

<style scoped>
.container {
  width: 1000px;
  margin: auto;
  padding-top: 70px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap !important;
}
#slogan {
  color: #000;
  font-weight: 700;
  font-size: 2.125rem;
  line-height: 3.125rem;
  padding: 0 1rem;
  position: relative;
  top: 30%;
}

.name,
.address,
.phone {
  text-align: left;
}

.mainframe {
  padding-top: 11%;
  margin-right: 10%;
  margin-left: 10%;
}
.md-card {
  margin: 20px;
  flex: 0 0 25%;
}
::selection {
  background: #000 !important;
}
</style>