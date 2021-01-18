<template>
  <div class="container">
    <div class="menu">
      <div class="menu-content">
        <div class="menu-restaurant-info">
          <!-- <img src="../assets/resto.png" alt=""> -->
          <h4>
            Restaurant les guignols
          </h4>
        </div>
        <div class="menu-buttons-div">
          <div class="menu-button">
            <button v-on:click="func1">
              <i class="fas fa-utensils"></i> Gestion des offres
            </button>
          </div>
          <div class="menu-button">
            <button v-on:click="func2">
              <i class="fas fa-chart-bar"></i> Graphes - Data
            </button>
          </div>
          <div class="menu-button">
            <button v-on:click="func3">
              <i class="fas fa-folder-open"></i> Gestion des Promotions
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="informations">
      <div v-if="this.tab1">
        <div class="tab-title">
          <h2>Gestion des offres</h2>
        </div>
        <displayOffers
          :me="me"
          :offers="offers"
          :categories="categories"
          @reload="createData"
          @createOffer="createOffer"
          @deleteOffer="deleteOffer"
          @orderOffer="orderOffer"
          @updateOffer="updateOffer"
          @createCategory="createCategory"
          @deleteCategory="deleteCategory"
          @orderCategory="orderCategory"
          @updateCategory="updateCategory"
        />
      </div>
      <div v-if="this.tab2">
        <div class="tab-title">
          <h2>Graphes - Data</h2>
        </div>
        <p>test</p>
      </div>
      <div v-if="this.tab3">
        <div class="tab-title">
          <h2>Gestion des Promotions</h2>
        </div>
        <div>
          <p>tab3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userServices from "../services/userServices";
import offerServices from "../services/offerServices";
import displayOffers from "../components/DisplayOffers";
export default {
  name: "Informations",
  props: {},
  components: { displayOffers },
  data() {
    return {
      tab1: true,
      tab2: false,
      tab3: false,
      action: "",
      me: {},
      offers: [],
      categories: [],
    };
  },
  created() {
    this.createData();
  },
  methods: {
    func1() {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
    },
    func2() {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
    },
    func3() {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
    },

    async initMe() {
      let me = await userServices.me();
      this.me = me.data;
    },
    async initOffers() {
      let offers = await offerServices.getOfferByIdRestaurant(this.me.id);
      this.offers = offers.data;
    },
    async initCategories() {
      this.categories = (
        await offerServices.getCategoryByIdRestaurant(this.me.id)
      ).data;
    },
    async createData() {
      await this.initMe();
      await this.initOffers();
      await this.initCategories();
    },
    async createOffer(offer) {
      await offerServices.createOffer(offer);
      this.createData();
    },
    async deleteOffer(offer) {
      await offerServices.deleteOffer(offer);
      this.createData();
    },
    async updateOffer(offer) {
      await offerServices.updateOffer(offer);
      this.createData();
    },
    async createCategory(category) {
      await offerServices.createCategory(category);
      this.createData();
    },
    async deleteCategory(category) {
      await offerServices.deleteCategory(category);
      this.createData();
    },
    async updateCategory(category) {
      await offerServices.updateCategory(category);
      this.createData();
    },
    async orderCategory(categories) {
      categories.forEach((category, index) => {
        category.priority = index;
      });
      await offerServices.updateCategories(categories);
      this.createData();
    },
    offersByCategory(category) {
      let offers = [];
      for (let offer of this.offers) {
        if (offer.idcategory === category.id) {
          offers.push(offer);
        }
      }
      return offers;
    },
    async orderOffer(data) {
      if (this.checkDiffCat(data.offers, data.category.id)) {
        data.offers.forEach((offer, index) => {
          offer.priority = index;
        });
        await offerServices.updateOffers(data.offers);
        this.createData();
      } else {
        data.offers.forEach((offer, index) => {
          offer.priority = index;
          offer.idcategory = data.category.id;
        });
        await offerServices.updateOffers(data.offers);
        this.createData();
      }
    },
    checkDiffCat(offers, idCat) {
      for (let offer of offers) {
        if (offer.idcategory != idCat) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.menu {
  width: 20%;
  /* background-color: aqua; */
}
.menu-content {
  display: flex;
  flex-direction: column;
  background-color: rgb(52, 158, 75);
  margin: 0px 10px 0px 10px;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  height: 100%;
}
.menu-restaurant-info {
  text-align: center;
  color: rgb(228, 228, 228);
  text-transform: uppercase;
  margin: 0px 0px 15px 0px;
  border-bottom: 1px solid silver;
}
.menu-buttons-div {
  margin: 10px 0px 5px 0px;
  display: flex;
  flex-direction: column;
}
.menu-button {
  background-color: black;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.menu-button button {
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  background-color: rgb(52, 158, 75);
  border: none;
  cursor: pointer;
  color: rgb(228, 228, 228);
  /* letter-spacing: 1px; */
  text-align: unset;
  padding-left: 5%;
}
.menu-button button:hover {
  background-color: rgb(114, 199, 132);
  cursor: pointer;
}

.informations {
  width: 80%;
  /* background-color: blueviolet; */
  height: auto;
  min-height: 800px;
  padding: 10px 20px 10px 20px;
}
.fas {
  margin-right: 15px;
}
.tab-title {
  /* background-color: aqua; */
  padding: 0px 0px 0px 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid silver;
}
</style>