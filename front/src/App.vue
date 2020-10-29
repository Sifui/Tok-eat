<template>
  <div id="app">
  
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: 'Roboto' ;
}
body,html{
  background-color: white !important;

}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.title{
  font-weight:600;
  line-height: 1.25;
  
}
.centered{
  text-align: center;
}
.subheading{
    font-size: 1rem;
    font-weight: 300;
    font-style: normal;
    line-height: 1.375;
    margin-top:10px
}
.bold{
  font-weight: bold;
}
</style>
