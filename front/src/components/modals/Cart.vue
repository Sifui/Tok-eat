<template>
  <div id="cartModal" v-bind:style="{right:right}">
    <h1 class="title">Vos réservations ({{formatPrice(totalPrice)}} €)</h1>
    <div v-for="item in infos" v-bind:key="item.restaurantId" style="margin-bottom:40px;padding:20px;box-shadow: 0 0 4px 0 silver">
      <h2 class="subheading">{{ item.name }}</h2>
      <div class="item-description flex-container" v-for="offer in item.articles" v-bind:key="offer.id">
           <select disabled class="quantity-picker" v-on:change="updateCartInfos($event.target.value,item.id,item.articles.indexOf(offer))" v-if="render">
          <option  value="0">0</option>
            <template v-for="index in 100"> 
                <option v-if="index==offer.quantity" selected :value="index" v-bind:key="index">{{ index }}</option>
                <option v-else :value="index" v-bind:key="index">{{ index }}</option>
            </template>
        </select>
          <span class="offer-name"> {{ offer.name }}</span>  
          <span class="offer-price"> {{offer.price}}€</span>
      </div>
         <span align="center" v-if="pending" style="color:red">En attente</span> 
         <span align="center" v-else style="color:green">Validé</span>

    </div>
    <div class="centered" v-if="totalPrice != 0 && !pending">
      <md-button v-on:click="goToPayement"> Procéder au paiement</md-button>
    </div>
     <div class="centered" v-if="totalPrice != 0">
      <md-button v-on:click="clearCart()"> Annuler la réservation</md-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserServices from '../../services/userServices'
var stripe = window.Stripe('pk_test_51HvkwYLjW8CJv9Axomn1cYBMLuvJ6hVBb002isuzWJTJ7beBM347sA1AZhVi4skpiiHmrl3wL1OPQ2J0InSSSF01004lSOoVFE');

export default {
  name: "Cart",
  props: {
    display: Number,
    infos: Array,
    price:Number,
  },
  data() {
    return {
        totalPrice:0,
        zIndex:-1,
        right:'-520px',
        render:true,
        pending:true,
        user:null,
        basket:null
    }
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('session_id');
    if (myParam)
    {
      axios.post('http://localhost:8081/session-id',{sessionId:myParam}).then((response)=>{
        if (response.data.payment=="success")
        {
          this.$emit('clearcookie');
          window.location.href = "http://localhost:8080";
        }
      })
    }
      this.user = await UserServices.me()
      this.user = this.user.data
      let currentBasket = await axios.get(`http://localhost:8081/basket/${this.user.id}`)
      currentBasket = currentBasket.data
      if (currentBasket.validation)
        this.pending = false
      console.log(currentBasket)
      const infosKeys = Object.keys(this.infos)
      for ( let i = 0 ; i < infosKeys.length;i++)
      {
        this.$socket.emit('submitId',this.infos[i].id)
          const currentRestaurantArticles = this.infos[infosKeys[i]].articles
          for ( let j = 0; j < currentRestaurantArticles.length;j++)
              this.totalPrice += currentRestaurantArticles[j].quantity * currentRestaurantArticles[j].price
      }
      this.totalPrice = Math.round((this.totalPrice + Number.EPSILON) * 100) / 100
  },
  methods:{
   async goToPayement(){
      if ( !this.totalPrice)
        return

      if(!this.user){
        this.$router.push({ path: "/login" });
        return
      }
        axios.post('http://localhost:8081/payement',{cart:this.infos})
        .then((session) => stripe.redirectToCheckout({ sessionId: session.data.id }))
        .catch(()=>{
          console.log('error lors de la creation de la session de paiement')
        })
    },
      updateCartInfos(valeur,restaurant,offre)
      {
        let cart = this.$cookies.get('cart')
        this.totalPrice -= cart[restaurant]['articles'][offre]['price'] * cart[restaurant]['articles'][offre]['quantity']
        this.totalPrice += valeur * cart[restaurant]['articles'][offre]['price'] 
        this.totalPrice = Math.round((this.totalPrice + Number.EPSILON) * 100) / 100
        cart[restaurant]['articles'][offre]['quantity'] = valeur
        this.$cookies.set('cart',cart)
        this.$emit('updatecartinfos')
      },
      formatPrice(num)
      {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
      },
      clearCart(){
        this.$emit('clearcookie');
        this.totalPrice=0;
        this.pending = true
        //this.$socket.emit('cancel',{clientId:this.user.id,restaurantId:this.infos[Object.keys(this.infos)[0]].id})
      }
  },
  watch:{
    display(){
      if ( this.display){
        this.right = '0px'
      }
      else{
          this.right = '-520px'
      }
    },
    price(){
      this.totalPrice = this.price
    },
    infos(){
            this.pending = true

      this.render = false
         this.$nextTick(() => {
        this.render = true;
      });
      //this.updateCartInfos()
    },
   
  },
  sockets:{
    validation(id){
      if ( this.user.id != id)
        return
      console.log('votre panier a été validé')
      this.pending = false
    }
  }
  
};
</script>

<style scoped>
#cartModal {
  position: fixed;
  top: 100px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 30px;
  background-color: white;
  transition: right 0.5s ease;
  overflow: auto;
  max-height:85vh;
}
.item-description{
  font-family: UberMoveText-Medium;
  font-size:1.18em;
  margin: 10px 5px 10px 0;
}
.offer-name{
  margin-left:10px
}
.offer-price{
  margin-left:auto
}
</style>