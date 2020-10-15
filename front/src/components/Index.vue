<template>
  <div class="index">
    <md-toolbar md-elevation="1" class="md-transparent">
      <img src="../assets/logo.png" width="100" />
      <div class="nav-elements md-layout" style="margin-left: 9%">
        <div class="md-layout-item">
          <md-field>
            <label>Chercher un restaurant</label>
            <md-input></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-10">
          <md-button>Connexion</md-button>
        </div>
      </div>
    </md-toolbar>

    <div class="md-layout">
      <div class="md-layout-item sidebar md-size-15">
        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>

          <md-divider class="md-inset"></md-divider>

          <md-list-item>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" alt="People" />
            </md-avatar>

            <span class="md-list-item-text">Abbey Christansen</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
          </md-list-item>

          <md-list-item>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/1" alt="People" />
            </md-avatar>

            <span class="md-list-item-text">Alex Nelson</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
          </md-list-item>

          <md-list-item>
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/6" alt="People" />
            </md-avatar>

            <span class="md-list-item-text">Mary Johnson</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon>chat_bubble</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </div>

      <div class="md-layout-item sidebar" id="map"></div>
    </div>
  </div>
</template>

<script>
var L = window.L;
setTimeout(function () {
  var map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
}, 0);

export default {
  name: "Index",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.md-toolbar + .md-toolbar {
  margin-top: 16px;
}

.sidebar {
  height: 100%;
  border-right: 1px solid silver;
}

.nav-elements {
  flex: 1;
  text-align: right;
}
.md-layout {
  height: 89%;
}
.index {
  height: 100%;
}
</style>