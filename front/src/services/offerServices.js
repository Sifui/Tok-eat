import http from "./http-com";
import axios from "axios"

export default {
    async getOfferByIdRestaurant(idRestaurant) {
      return http.get("/offer/" + idRestaurant);
    },
    async deleteOffer(offer) {
        let res = await axios({
            method: 'delete',
            url: 'http://localhost:8081/offer',
            data: {
              id: offer.id
            }
          })
        return res
      }
  }