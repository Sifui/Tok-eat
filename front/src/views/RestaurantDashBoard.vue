<template>
  <div>
    <displayOffers :me="me" :offers="offers" :categories="categories" @reload="creatData" @deleteOffer="deleteOffer" @createCategory="createCategory" @orderCategory="orderCategory"/>
  </div>
</template>

<script>
import userServices from "../services/userServices";
import offerServices from "../services/offerServices";
import displayOffers from "../components/DisplayOffers";

export default {
  name: "RestaurantDashBoard",
  props: {
  },
  data() {
    return {
      action:"",
      me:{},
      offers:[],
      categories:[]
    };
  },
  components: {
    displayOffers
  },
  created() {
    this.creatData()
  },
  methods:
  {
    async initMe()
    {
      let me = await userServices.me()
      this.me = me.data
    },
    async initOffers()
    {
      let offers = await offerServices.getOfferByIdRestaurant(this.me.id)
      this.offers = offers.data
    },
    async initCategories()
    {
      this.categories = (await offerServices.getCategoryByIdRestaurant(this.me.id)).data
    },
    async creatData()
    {
      await this.initMe()
      await this.initOffers()
      await this.initCategories()
    },
    async deleteOffer(offer)
    {
        await offerServices.deleteOffer(offer)
        this.creatData()
    },
    async createCategory(category)
    {
        await offerServices.creatCategory(category)
        this.creatData()
    },
    async orderCategory(categories)
    {
        categories.forEach((category,index) => {
            category.priority=index
        });
        await offerServices.updateCategories(categories)
        this.creatData()
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>