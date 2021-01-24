import http from "./http-com";
import axios from "axios";

export default {
    async getPromoByIdRestaurant() {
        return http.get("/promo");
    },
    async createPromo(promo) {
        return http.post("/promo", promo).res;
    },
    async deletePromo(promo) {
        let res = await axios({
            method: 'delete',
            url: 'http://localhost:8081/promo',
            data: {
              id:promo.id
            }
          })
        return res
      },
      async updatePromo(promo) {
        let res = await axios({
            method: 'put',
            url: 'http://localhost:8081/promo',
            data: {
                promo
            }
          })
        return res
      },
}