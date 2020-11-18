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
  }

}
