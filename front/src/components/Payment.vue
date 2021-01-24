<template>
  <div style="margin:auto;max-width:500px;height:80vh">
      <h1>Paiement de votre réservation</h1>
      <h2>Prix: {{this.price}}€</h2>
      {{tokens}}
    <form id="payment-form">
      <div id="card-element">
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div id="card-errors" role="alert">{{ error }}</div>

      <md-button id="submit" class="md-primary" v-on:click="pay">Payer</md-button>
    </form>
  </div>
</template>

<script>
let Stripe = window.Stripe
import axios from "axios";
export default {
  name: "Payment",
  props: {
    defaultPrice: Number,
    defaultTokens: Number,
  },
  components: {},
  data() {
    return {
      price: this.defaultPrice,
      tokens: this.defaultTokens,
      card: null,
      clientSecret: null,
      error: "",
      stripe: null,
      paymentId: null
    };
  },
  methods: {
    pay() {
      this.stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.$store.state.user.name,
            },
          },
          receipt_email: this.$store.state.user.email,
        })
        .then( async (result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            this.message = result.error.message
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              const restaurantId = this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]].id
              let allTokens = await axios.get('http://localhost:8081/token'+restaurantId)
              allTokens = allTokens.data
              if(allTokens.tokens > 20)
              {
                await axios.post('http://localhost:8081/token',{restaurantId, tokens: -20, paymentId: this.paymentId})
              }
              await axios.post('http://localhost:8081/token',{restaurantId, tokens: this.tokens, paymentId: this.paymentId})
              this.$emit('clearcookie')
              this.$forceUpdate()
              this.$router.push({name:'PaymentSuccess'})
            }
          }
        });
    },
  },
  async created() {
    if (!this.tokens || !this.price) this.$router.push({ path: "/" });
    let currentBasket = null;
    try {
      currentBasket = await axios.get("http://localhost:8081/basket");
      currentBasket = currentBasket.data;
    } catch (err) {
      console.log(err);
      this.$router.push({ path: "/" });
      return;
    }
    const restaurantId = this.$cookies.get('cart')[Object.keys(this.$cookies.get('cart'))[0]].id
    if (!currentBasket.validation) this.$router.push({ path: "/" });
      let allTokens = await axios.get('http://localhost:8081/token'+restaurantId)
      allTokens = allTokens.data

      if(allTokens.tokens > 20)
      {
        this.price -= 10
        this.price = this.price.toFixed(2)
        console.log("-------------------------------")
        
        this.tokens = Math.floor(this.price / 10)
        if(this.price < 0)
        {
          this.price = 0
        }
        console.log(this.price)
      }
    let response = await axios.post("http://localhost:8081/secret", {
      amount: Math.ceil(this.price * 100),
    });
    this.clientSecret = response.data.clientSecret;
    this.stripe = Stripe(response.data.publicKey)
    console.log(response);
    this.paymentId = response.data.paymentId
    let elements = this.stripe.elements();
    const style = {
      base: {
        color: "#32325d",
      },
    };
    this.card = elements.create("card", { style: style });
    this.card.mount("#card-element");
    this.card.on("change", ({ error }) => {
      if (error) {
        this.error = error.message;
      } else {
        this.error = "";
      }
    });
  },
  mounted() {
    // Set up this.stripe.js and Elements to use in checkout form
    
   
  },
};
</script>

<style>
form {
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}
input {
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
}
.result-message {
  line-height: 22px;
  font-size: 16px;
}
.result-message a {
  color: rgb(89, 111, 214);
  font-weight: 600;
  text-decoration: none;
}
.hidden {
  display: none;
}
#card-error {
  color: rgb(105, 115, 134);
  text-align: left;
  font-size: 13px;
  line-height: 17px;
  margin-top: 12px;
}
#card-element {
  border-radius: 4px 4px 0 0;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  width: 100%;
  background: white;
}
</style>