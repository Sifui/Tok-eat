<template>
  <div>
    <displayOffers 
    :me="me" :offers="offers" 
    :categories="categories" 
    @reload="creatData" 
    @deleteOffer="deleteOffer" 
    @createCategory="createCategory" 
    @orderCategory="orderCategory"
    @orderOffer="orderOffer"
    />
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
    },
    offersByCategory(category)
    {
        let offers = []
        for(let offer of this.offers)
        {
            if(offer.idcategory === category.id)
            {
                offers.push(offer)
            }
        }
        return offers
    },
    deleteOffersByCat(category)
    {
        for(let i=0; i<this.offers.length; i++)
        {
            if(this.offers[i].idcategory === category.id)
            {
                this.offers.splice(i,1)
                i--
            }
        }
    },
    getCategorieById(id)
    {
        for(let category of this.categories)
        {
            if(category.id === id)
            {
                return category
            }
        }
    },
    getMoovingOffer(offers,category)
    {
        console.log(category)
        console.log(offers)
        for(let offer of this.offersByCategory(category))
        {

            if(offers.indexOf(offer) === -1)
            {
                return offer
            }
        }
    },
    orderOffer(data)
    {
        if(data.offers.length === this.offersByCategory(data.category).length)
        {
            console.log("same cat")
            this.deleteOffersByCat(data.category)
            data.offers.forEach((offer,index) => {
                offer.priority=index
            });
            for(let offer of data.offers)
            {
                this.offers.push(offer)
            }
        }
        else{
            console.log(data)
            console.log("not same cat")
            //console.log(this.getMoovingOffer(data.offers,data.category))
        }
    },

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>