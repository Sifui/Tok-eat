<template>
    <div>
        <md-button class="md-primary md-raised" @click="display='offers'">Offres</md-button>
        <md-button class="md-primary md-raised" @click="display='promotions'">Promotions</md-button>
        <div v-if="display=='promotions'">
            <displayPromos
            :me="me"
            :promos="promos"
            @createPromo="createPromo"
            @deletePromo="deletePromo"
            @updatePromo="updatePromo"/>
        </div>
        <div v-else-if="display=='offers'">
            <displayOffers 
                :me="me" :offers="offers" 
                :categories="categories" 
                :promos="promos"
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
    </div>
</template>

<script>
import userServices from "../services/userServices";
import offerServices from "../services/offerServices";
import promotionServices from "../services/promotionServices";
import displayOffers from "../components/DisplayOffers";
import displayPromos from "../components/DisplayPromos";

export default {
  name: "RestaurantDashBoard",
  props: {
  },
  data() {
    return {
      action:"",
      display:"offers",
      me:{},
      offers:[],
      categories:[],
      promos:[]
    };
  },
  components: {
    displayOffers,
    displayPromos
  },
  created() {
    this.createData()
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
    async initPromos()
    {
        let promos = await promotionServices.getPromoByIdRestaurant()
        this.promos = promos.data
    },
    async initCategories()
    {
      this.categories = (await offerServices.getCategoryByIdRestaurant(this.me.id)).data
    },
    async createData()
    {
      await this.initMe()
      await this.initOffers()
      await this.initCategories()
      await this.initPromos()
    },
    async createOffer(offer)
    {
        await offerServices.createOffer(offer)
        this.createData()
    },
    async createPromo(promo)
    {
        promo.id_restaurant = this.me.id
        await promotionServices.createPromo(promo)
        this.createData()
    },
    async deleteOffer(offer)
    {
        await offerServices.deleteOffer(offer)
        this.createData()
    },
    async updateOffer(offer)
    {
        await offerServices.updateOffer(offer)
        this.createData()
    },
    async createCategory(category)
    {
        await offerServices.createCategory(category)
        this.createData()
    },
    async deleteCategory(category)
    {
        await offerServices.deleteCategory(category)
        this.createData()
    },
    async deletePromo(promo)
    {
        await promotionServices.deletePromo(promo)
        this.createData()
    },
    async updateCategory(category)
    {
        await offerServices.updateCategory(category)
        this.createData()
    },
    async updatePromo(promo)
    {
        await promotionServices.updatePromo(promo)
        this.createData()
    },
    async orderCategory(categories)
    {
        categories.forEach((category,index) => {
            category.priority=index
        });
        await offerServices.updateCategories(categories)
        this.createData()
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
    async orderOffer(data)
    {
        if(this.checkDiffCat(data.offers,data.category.id))
        {
            data.offers.forEach((offer,index) => {
                offer.priority = index
            });  
            await offerServices.updateOffers(data.offers)
            this.createData()
        }
        else{
            data.offers.forEach((offer,index) => {
                offer.priority = index
                offer.idcategory = data.category.id
            });
            await offerServices.updateOffers(data.offers)
            this.createData()
        }
    },
    checkDiffCat(offers,idCat){
        for(let offer of offers)
        {
            if(offer.idcategory != idCat)
            {
                return false
            }
        }
        return true
    }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin{
    margin-top: 250px;
}
</style>