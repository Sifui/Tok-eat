<template>
  <div class="footer">
    <div class="footer-ends">
        <div>
          <p>copyrights 2020</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0px 0 5px 25px;
}
.newsletter {
  margin: 0px 0 5px 100px;
}
.download {
  margin: 30px 0 5px 100px;
}
.download-image {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}
/* .download-image img {
  margin: 10px 0 10px 100px;
  width: 15%;
} */
.download-image a {
  margin: 15px 0 0px 100px;
  width: 15%;
}
.title {
  margin: 0px 0 5px 25px;
  /* font-family: "Lato", sans-serif; */
  font-size: 30px;
  font-weight: 300;
}
.logo img {
  width: 8%;
  margin-left: 15px;
  padding-bottom: 10px;
}
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
input[type="email"] {
  width: 50%;
  padding: 12px 20px;
  margin: 20px 0 10px 100px;
  /* border: 1px #ccc; */
  border: solid;
  border-width: 1px;
  border-color: rgb(77, 112, 112);
  border-radius: 10px;
}
input[type="email"]:focus {
  outline: none;
  box-shadow: var(--color-state-focus-shadow);
  box-shadow: 0 0 5px rgb(39, 122, 145);
  border: 1px solid rgba(39, 122, 145, 1);
}
button {
  width: 30%;
  padding: 12px 0 12px 0;
  margin: 15px 10px 5px 100px;
  background: #5c9e6a;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  border: none;
  border-radius: 10px;
}
button:hover {
  cursor: pointer;
  background-color: #57915b;
}
.footer {
  /* background-color: brown; */
  background-color: #393b3d;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  padding: 5px 0 5px 0;
}
.container {
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  margin: 0px 100px 0px 100px;
  /* width: 50px; */
}
.container .item-1 {
  margin: 0px 10px 0px 10px;
  width: 15%;
}
.container .item-1 p {
  display: flex;
  flex-direction: column;
  margin: 0px 5px 0px 5px;
  color: #d6d2d2;
}

.container .item-1 p span {
  margin: 8px 3px 2px 10px;
  padding: 8px 3px 2px 13px;
  text-align: left;
}
.footer-ends {
  /* background-color: bisque; */
  text-align: center;
}
.footer-ends p {
  /* background-color: bisque; */
  font-size: x-small;
}
.item-1 {
  order: 1;
  flex-grow: 1;
  /* background-color: rgb(155, 221, 177); */
}
.item-2 {
  order: 2;
  flex-grow: 2;
  /* background-color: rgb(48, 90, 90); */
}
.item-3 {
  order: 3;
  flex-grow: 1;
  /* background-color: rgb(50, 36, 99); */
  display: flex;
  flex-direction: column;
}
.links {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.links a {
  margin-top: 10px;
  color: #918f8f;
}
</style>
