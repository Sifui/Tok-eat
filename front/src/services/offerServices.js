import http from "./http-com";
import axios from "axios"

export default {
    async getOfferByIdRestaurant(idRestaurant) {
      return http.get("/offer/" + idRestaurant);
    },
    async getCategoryByIdRestaurant(idRestaurant) {
      return http.get("/category/" + idRestaurant);
    },
    async createCategory(category) {
      return http.post("/category", category).res;
    },
    async createOffer(offer) {
      return http.post("/offer", offer).res;
    },
    async deleteCategory(category) {
      console.log(category.id)
      let res = await axios({
          method: 'delete',
          url: 'http://localhost:8081/category',
          data: {
            id:category.id
          }
        })
      return res
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
      },
      async updateCategories(categories) {
        let res = await axios({
            method: 'put',
            url: 'http://localhost:8081/categories',
            data: {
                categories
            }
          })
        return res
      },
      async updateCategory(category) {
        let res = await axios({
            method: 'put',
            url: 'http://localhost:8081/category',
            data: {
                category
            }
          })
        return res
      },
      async updateOffer(offer) {
        let res = await axios({
            method: 'put',
            url: 'http://localhost:8081/offer',
            data: {
                offer
            }
          })
        return res
      }
  }