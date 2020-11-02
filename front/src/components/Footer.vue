<template>
  <div class="footer">
    <!-- <p>pipi</p> -->
    <div class="container">
      <div class="item-1">
        <div class="logo">
          <h2 class="title">TOK-EAT</h2>
          <img src="../assets/logo-no-text.png" alt="missing" />
        </div>

        <p>
          <span>
            Aenean semper sapien arcu, ut sodales dolor elementum ut. Vivamus at
            neque elit. Nulla vel lorem vitae odio ullamcorper accumsan ac non
            risus. Sed mollis, nisl nec placerat blandit, erat urna blandit dui,
            in hendrerit tellus quam id arcu. Aenean lobortis bibendum nulla,
            nec tincidunt mi accumsan ultricies. Vivamus posuere tincidunt nisi
          </span>
          <span>
            Aenean semper sapien arcu, ut sodales dolor elementum ut. Vivamus at
            neque elit. Nulla vel lorem vitae odio ullamcorper accumsan ac non
            risus. Sed mollis, nisl nec placerat blandit, erat urna blandit dui,
            in hendrerit tellus quam id arcu. Aenean lobortis bibendum nulla,
            nec tincidunt mi accumsan ultricies. Vivamus posuere tincidunt nisi
          </span>
        </p>
      </div>
      <div class="item-2">
        <h3 class="newsletter">NEWSLETTER</h3>
        <div>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <button type="submit">ENVOYER</button>
        </div>
        <h3 class="download">Téléchargez notre application</h3>
        <div class="download-image">
          <a href="#"><img src="../assets/playstore.svg" alt="image" /></a>
          <a href="#"><img src="../assets/applestore.svg" alt="image" /></a>
        </div>
      </div>
      <div class="item-3">
        <h3>SUPPORTS</h3>
        <div class="links">
          <a href="#">À PROPOS DE NOUS</a>
          <a href="#">CONTACT</a>
          <a href="#">AIDES</a>
          <a href="#"> COOKIES </a>
          <a href="#">F A Q</a>
        </div>
      </div>
    </div>

    <div class="footer-ends">
      <div>
        <div></div>
        <div>
          <p>copyrights 2020</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
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
  font-family: "Great Vibes", cursive;
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
  border: 1px #ccc;
  border-radius: 4px;
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
}
.footer {
  /* background-color: brown; */
  background-color: #393b3d;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  padding: 30px 0 4px 0;
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
  font-family: "Verdana", sans-serif;
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
