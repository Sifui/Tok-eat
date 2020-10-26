import http from "./http-com";

class TutorialDataService {
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

  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new TutorialDataService();