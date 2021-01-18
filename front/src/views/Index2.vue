<template>
  <div class="index" md-theme="black">
    <navbar  style="z-index: 6;"/>
    <router-view style="z-index:1;padding-bottom:5%;padding-top:10%"/>
    <footerTokEat style="z-index: 1" />
  </div>
</template>

<script>
import navbar from "../components/Navbar2";
import footerTokEat from "../components/Footer";
export default {
  name: "Index",
  props: {},
  components: { navbar, footerTokEat },
  data() {
    return {
      
    };
  },
  created() {
    this.user = this.$store.state.user
    this.$socket.emit('submitId',this.user.id)

  },
  methods: {
    
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