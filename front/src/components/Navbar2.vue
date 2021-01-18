<template>
  <nav>
    <img
      id="logo"
      src="../assets/logo_min6.png"
      v-on:click="$router.push('/Index2').catch(() => {})"
    />
    <div class="vl"></div>
    <div class="title-div">
      <h3 v-on:click="$router.push('/Index2')">Dashboard</h3>
    </div>
    <md-speed-dial md-event="hover" md-direction="bottom">
      <md-speed-dial-target>
        <md-icon>perm_identity</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button
          class="md-icon-button"
          v-on:click="$router.push('/ProfilRestaurant')"
        >
          <md-icon>account_circle</md-icon>
        </md-button>

        <md-button
          class="md-icon-button"
          v-on:click="
            $router.push('/logout');
            $cookies.set('cart', {});
          "
        >
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </nav>
</template>

<script>
export default {
  name: "Navbar2",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  background-color: white !important;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid silver;
  width: 100%;
  display: flex;
  flex-direction: row;
}
img {
  margin-right: auto;
  /* background-color: aquamarine; */
  padding: 5px 5px 5px 5px;
  margin: 5px 40px 5px 5px;
  width: 10%;
  /* width: 6% ; */
  /* height: 50%; */
  cursor: pointer;
}
.title-div{
  width: 15%;
  /* background-color: bisque; */
  padding: 15px 0px 5px 40px;
  letter-spacing: 1px;
  /* text-align: center; */
  text-transform: uppercase;
  cursor: pointer;
}
.vl{
  border-left: 1px solid rgb(174, 177, 174);
  height: 50px;
  margin: 20px 0px 10px 0px;
}
.md-speed-dial {
  /* background-color: blue; */
  width: 5%;
  margin-left: 70%;
  /* margin-right: 20px; */
  position: relative;
  /* top: 10px; */
  /* margin: 5px 0px 5px 0px; */
  padding: 15px 5px 5px 5px;
  /* background-color: bisque; */
}
.md-speed-dial-content {
  position: absolute;
  top: 80px;
  left: 15px;
}
.md-button.md-theme-default.md-fab:not([disabled]) {
  background-color: white;
}
.md-icon.md-icon-font.md-theme-default {
  color: black !important;
}

@media screen and (max-width: 900px) {
  nav {
    position: sticky;
  }
}
</style>