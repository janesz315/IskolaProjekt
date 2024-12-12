<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Cards</h1>
      <!-- We choose how many cards we want to see -->
      <select
        class="form-select"
        style="width: 150px"
        aria-label="Default select example"
        v-model="howManyCards"
        @change="handleCardsChange"
      >
        <option
          v-for="(number, index) in howManyCardsArray"
          :key="index"
          :value="number"
        >
          {{ number }}
        </option>
      </select>
    </div>
    <!-- Visualising the cards with the component -->
    <div class="my-cards-height overflow-y-auto">
      <Cards :cards="cards"></Cards>
    </div>

    <!-- Pagination -->
    <div class="p-2">
      <Paginator :pagenumbers="pagenumbersArray"></Paginator>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cards from "@/components/Cards.vue";
import Paginator from "@/components/Paginator.vue";
export default {
  components: { Cards, Paginator },
  data() {
    return {
      urlApi: "http://localhost:8000/api",
      cards: [],
      currentPage: 1,
      howManyCards: 3,
      howManyCardsArray: [1, 2, 3, 4, 5, 6, 7, 10, 20],
      pagenumbersArray: [],
    };
  },
  async mounted() {
    await this.getClassRoster();
    await this.getPageNumbers();
  },
  methods: {
    async getClassRoster() {
      const url = `${this.urlApi}/queryOsztalynevsorLimit/${this.currentPage}/${this.howManyCards}`;
      const response = await axios.get(url);
      this.cards = response.data.data;
      console.log(this.cards);
    },

    async getPageNumbers() {
      const url = `${this.urlApi}/queryHanyOldalVan/${this.howManyCards}`;
      const response = await axios.get(url);
      this.howManyCards = response.data.data.oldalszam;
      this.pagenumbersArray = [];
      for (let i = 0; i < this.howManyCards; i++) {
        this.pagenumbersArray.push(i + 1);
      }
    },
    handleCardsChange() {
      this.getClassRoster();  // Fetch new cards based on selected number
      this.getPageNumbers();  // Recalculate page numbers based on new selection
    },
  },
};
</script>

<style>
.my-cards-height {
  height: calc(100vh - 300px);
}
</style>
