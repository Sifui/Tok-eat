<template>
  <div class="container">
    <div class="menu">
      <ul>
        <li><button v-on:click="func1">button 1</button></li>
        <li><button v-on:click="func2">button 2</button></li>
        <li><button v-on:click="func3">button 3</button></li>
      </ul>
    </div>
    <div class="informations">
      <div v-show="this.fafa">
      </div>
      <p v-show="this.papa">papa</p>
      <p v-show="this.caca">caca</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "Informations",
  props: {},
  components: {  },
  data() {
    return {
      fafa: true,
      papa: false,
      caca: false,
    };
  },
  created() {},
  methods: {
    func1() {
      this.fafa = true;
      this.papa = false;
      this.caca = false;
    },
    func2() {
      this.fafa = false;
      this.papa = true;
      this.caca = false;
    },
    func3() {
      this.fafa = false;
      this.papa = false;
      this.caca = true;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.menu {
  width: 20%;
  background-color: aqua;
}
.informations {
  width: 80%;
  background-color: blueviolet;
}
</style>