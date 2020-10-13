<template>
  <div id="app">
    <Login msg="Test"/>
  </div>
</template>

<script>
import Login from './components/login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background: rgb(69, 158, 63);
}
</style>
