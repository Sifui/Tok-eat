<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: UberMoveText-Bold;
  src: url(https://s3.amazonaws.com/uber-static/emails/2018/global/fonts/UberMove/UberMoveText-Bold.woff)
      format("woff"),
    url(https://s3.amazonaws.com/uber-static/emails/2018/global/fonts/UberMove/UberMoveText-Bold.ttf)
      format("truetype");
  font-weight: 400 !important;
  font-style: normal !important;
  mso-font-alt: "Arial";
}
:root{
  font-size:16px
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: UberMoveText-Bold;
  height: 100%;
}

body,
html {
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

.title {
  font-weight: 600;
  line-height: 1.25;
}
.centered {
  text-align: center;
}
.subheading {
  font-weight: 300;
  font-style: normal;
  line-height: 1.375;
  margin-top: 10px;
}
.bold {
  font-weight: bold;
}
.flex-container {
  display: flex;
}
.flex-wrap{
  flex-wrap: wrap;
}
.label {
  display: inline-block;
  padding: 4px;
  margin-bottom: 10px;
}
.yellow {
  background-color: rgb(185, 248, 143);
}

.background-green{
  background-color:green !important
}
div[class^='md'], div[class*=' md']{
    z-index: 1;
}
</style>
