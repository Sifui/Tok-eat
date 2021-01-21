<template>
  <article>
    <header class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index">
          <div
            class="nav-item"
            :class="{ 'is-active': tab.isActive }"
            @click="selectTab(tab)"
          >
            {{ tab.name }}
          </div>
        </li>
      </ul>
    </header>
    <section class="tabs-details">
      <slot></slot>
    </section>
  </article>
</template>

<script>
export default {
  data: () => {
    return {
      tabs: [],
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name;
      });
    },
  },
  created() {
    this.tabs = this.$children;
  },
};
</script>

<style scoped>
/* .tabs {
  border-bottom: 1px solid #fefefe;
  margin: 0 10px;
}
.tabs-details {
  padding: 10px;
} */
ul {
  display: flex;
  padding: 0;
  list-style: none;
  flex-wrap: nowrap;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  line-height: 50px;
}
ul li {
  width: 50%;
  text-align: center;
  padding-top: 10px;
}
ul li .nav-item {
  cursor: pointer;
}
ul li .nav-item:hover {
  color: #cc6a6a;
  border: solid;
  border-color: rgb(165, 41, 37);
  border-width: 1px;
}
.is-active {
  color: #ffffff;
  background-color: #7ccf81;
}
</style>