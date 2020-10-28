<template>
  <div id="app">
  
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family:arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
  font-weight:400;
  
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
</style>
