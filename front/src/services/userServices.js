import http from "./http-com";

export default {
  async getAll() {
    return http.get("/users");
  },
  async findByEmail(email) {
    return http.post("/login", email);
  },
  async register(data) {
    return http.post("/register", data);
  },
  async me(){
    return http.get("/me");
  },
  async logout() {
    return http.post("/logout");
  },
  // async edit_name(data) {
  //   return http.put("/edit_name", data);
  // },
  async update_client_data(data) {
    return http.put("/update_client_data", data);
  },
  async update_restaurant_data(data) {
    return http.put("/update_restaurant_data", data);
  },
  async check_password(data) {
    return http.post("/check_password", data);
  },
  async check_restaurant_password(data) {
    return http.post("/check_restaurant_password", data);
  },
  async edit_password(data) {
    return http.put("/edit_password", data);
  },
  async edit_restaurant_password(data) {
    return http.put("/edit_restaurant_password", data);
  },
  async upload_profil_image(data) {
    return http.post("/upload_profil_image", data);
  },
  async upload_restaurant_profil_image(data) {
    return http.post("/upload_restaurant_profil_image", data);
  },

}
