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
  height:100%
}
body,html{
  background-color: white !important;
  height:100%

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
.flex-container
{
  display:flex;
}
.label{
  display:inline-block;
  padding:4px;
  font-size:12px;
  margin-bottom:10px;

}
.yellow{
  background-color: rgb(185, 248, 143);
}
</style>
