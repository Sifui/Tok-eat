<template>
<nav>
     <img
          id="logo"
          src="../assets/logo.png"
          width="100"
          v-on:click="$router.push('/').catch(() => {})"
        />
    <md-speed-dial md-event="hover" md-direction="bottom">
              <md-speed-dial-target>
                <md-icon>perm_identity</md-icon>
              </md-speed-dial-target>

              <md-speed-dial-content>
                <md-button
                  class="md-icon-button"
                  v-on:click="$router.push('/profile')"
                >
                  <md-icon>account_circle</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  v-on:click="$router.push('/logout');$cookies.set('cart',{})"
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
    return {

    };
  },
};
</script>

<style scoped>

nav {
  position: fixed;
  background-color: white !important;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom:1px solid silver;
  width:100%;
  display: flex;
  flex-direction: row;
}
img{

  margin-right:auto
}
.md-speed-dial {
  margin-right: 20px;
  position: relative;
  top:15px
}
.md-speed-dial-content {
  position: absolute;
  top: 60px;
  left: 8px;
}
.md-button.md-theme-default.md-fab:not([disabled]) {
  background-color: white;
}
.md-icon.md-icon-font.md-theme-default {
  color: black !important;
}
</style>