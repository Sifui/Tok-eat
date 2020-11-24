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
  async edit_name(data) {
    return http.put("/edit_name", data);
  },
  async check_password(data) {
    return http.post("/check_password", data);
  },
  async validate_password(data) {
    return http.put("/edit_password", data);
  }
}
