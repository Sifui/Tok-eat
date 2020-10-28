<template>
  <div>
    <displayOffers :me="me" :offers="offers" />
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
      offers:[]
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
    async initOffer()
    {
      let offers = await offerServices.getOfferByIdRestaurant(this.me.id)
      this.offers = offers.data
    },
    async creatData()
    {
      await this.initMe()
      await this.initOffer()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>