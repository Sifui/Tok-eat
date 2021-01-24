<template>
  <div class="container">
    <div class="menu">
      <div class="menu-content">
        <div class="menu-restaurant-info">
          <!-- <img src="../assets/resto.png" alt=""> -->
          <h4>Restaurant les guignols</h4>
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
          <div class="menu-button">
            <button v-on:click="func4">
              <i class="fas fa-calendar"></i> Emploie du temps
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
          <h1>Statistiques</h1>
        </div>
        <br />
        <div
          style="display: flex; justify-content: space-around; flex-wrap: wrap"
        >
          <div class="chart">
            <h1>Total des ventes par produit</h1>
            <line-chart :chart-data="dataTotalSales"></line-chart>
          </div>
          <div class="chart">
            <h1>Total mensuel des ventes par produit</h1>
            <line-chart :chart-data="dataTotalSalesPerMonth"></line-chart>
          </div>
        </div>
      </div>
      <div v-if="this.tab3">
        <div class="tab-title">
          <h2>Gestion des Promotions</h2>
        </div>
        <div>
          <p>tab3</p>
        </div>
      </div>
      <div v-if="this.tab4">
        <div class="tab-title">
          <h2>Gérer vos disponnibilités</h2>
        </div>
        <div>
          <p>tab4</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userServices from "../services/userServices";
import offerServices from "../services/offerServices";
import displayOffers from "../components/DisplayOffers";
import LineChart from "./LineChart.js";
import axios from "axios";
export default {
  name: "Informations",
  props: {},
  components: { displayOffers, LineChart },
  data() {
    return {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      action: "",
      me: {},
      offers: [],
      categories: [],
      dataTotalSales: null,
      dataTotalSalesPerMonth: null,
      totalSales: null,
      salesPerMonth: null,
    };
  },
  async created() {
    await this.createData();
  },
  async mounted() {
    //await this.fillData()
    await this.createData();

    this.totalSales = await axios.get(
      `http://localhost:8081/restaurants/${this.me.id}/sales`
    );
    this.salesPerMonth = await axios.get(
      `http://localhost:8081/restaurants/${this.me.id}/salesPerMonth`
    );

    this.totalSales = this.totalSales.data;
    this.salesPerMonth = this.salesPerMonth.data;

    this.fillTotalSales();
    this.fillTotalSalesPerMonth();
  },
  methods: {
    fillTotalSales() {
      let labels = [];
      let datasets = [
        {
          label: "Ventes",
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777216).toString(16),
          data: [],
        },
      ];

      for (const product of this.totalSales) {
        datasets[0].data.push(product.total_quantity);
        labels.push(product.name);
      }

      this.dataTotalSales = {
        labels,
        datasets,
      };
    },
    fillTotalSalesPerMonth() {
      let labels = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      let datasets = [
        {
          label: this.salesPerMonth[0].name,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777216).toString(16),
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ];
      let seen = {};
      seen[this.salesPerMonth[0].name] = 0;

      for (const sales of this.salesPerMonth) {
        if (seen[sales.name] >= 0) {
          datasets[seen[sales.name]].data[
            parseInt(sales.order_date.substr(5, 7)) - 1
          ] = sales.sum;
        } else {
          seen[sales.name] = datasets.length;
          datasets.push({
            label: sales.name,
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777216).toString(16),
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          });
          datasets[seen[sales.name]].data[
            parseInt(sales.order_date.substring(5, 7)) - 1
          ] = sales.sum;
        }
      }
      this.dataTotalSalesPerMonth = {
        labels,
        datasets,
      };
    },
    func1() {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = false;
    },
    func2() {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
      this.tab4 = false;
    },
    func3() {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
      this.tab4 = false;
    },
    func4() {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = false;
      this.tab4 = true;
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
.chart {
  width: 550px !important;
}
</style>