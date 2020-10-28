import http from "./http-com";

class DataService {
  getAll() {
    return http.get("/users");
  }

  findByEmail(email) {
    return http.post("/login", email);
    // return http.post(`/login/${email}`);
  }

  register(data) {
    return http.post("/register", data);
  }
  
}

export default new DataService();