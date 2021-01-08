<template>
  <div class="flex-container" style="max-width:500px;margin:auto;flex-direction:column">
    <div
      v-for="item in reservations"
      :key="item.id"
      style="border: 1px solid black; margin: 10px; padding: 20px;"
    >
      {{ item.id_client }}
      <div v-for="article in item" :key="article.id">
        {{ article.name }}
        {{ article.price }}€
      </div>
      <button type="button">Valider</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import userServices from "../services/userServices";
export default {
  name: "Reservations",
  props: {},
  components: {},
  data() {
    return {
      user: null,
      reservations: [[]],
    };
  },
  methods: {},
  async created() {
    this.user = await userServices.me();
    this.user = this.user.data;
    let result = await axios.get(
      `http://localhost:8081/ordered_products/restaurant/${this.user.id}`
    );
    const temp = result.data;
    let index = 0;
    this.reservations[index].push(temp[0]);
    for (let i = 1; i < temp.length; i++) {
      if (temp[i].id_basket != temp[i - 1].id_basket) {
        index++;
        this.reservations.push([]);
      }
      this.reservations[index].push(temp[i]);
    }
  },
};
</script>

<style>

</style>