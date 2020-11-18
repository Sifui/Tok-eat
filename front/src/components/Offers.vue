<template>
  <div class="container">
    <div v-for="(item, index) in offers" v-bind:key="index">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Offers",
  props: {
    offers: {},
  },
  data() {
    return {
      offersClone: this.offers,
    };
  },
  methods: {},
  created() {
    if (!this.offers) {
      this.$router.go(-1);
    }
    console.log(this.offersClone);
  },
};
</script>

<style scoped>
.container {
  padding-top: 9%;
  max-width: 500px;
  min-width: 500px;
  margin: auto;
}
</style>