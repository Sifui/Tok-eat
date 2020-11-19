<template>
  <div class="index" md-theme="black">
    <navbar />
    <router-view style="padding-top:11%;padding-bottom:5%" />
    <footerTokEat />

  </div>
</template>

<script>

import navbar from "../components/Navbar";
import footerTokEat from "../components/Footer";
export default {
  name: "Index",
  props: {},
  components: { navbar , footerTokEat },
  data() {
    return {

    };
  },

  methods: {},

  created() {
   
  },
  watch: {
    async $route() {
      window.scrollTo(0,0)
    },
  },
};
</script>

<style lang="scss" scoped>
::selection {
  background: #000 !important;
}

.sidebar {
  height: 100%;
  border-right: 1px solid silver;
}
.sidebar > * {
  height: 100%;
}

.index {
  height: 100%;
}

</style>