<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Cards</h1>
      <p class="m-0">
        $route
          .path:{{ $route.path }} |
          .name:{{ $route.name }} |
          .params:{{ $route.params }}
      </p>
      <!-- Dropdown to select how many cards to display per page -->
      <!-- v-model: Data binding to the howManyCards variable -->
      <!-- @change: Trigger change when a new value is selected  -->
      <select
        class="form-select"
        style="width: 150px"
        v-model="howManyCards"
        @change="getPageNumbers"
      >
        <!-- Loop through the array of options -->
        <option
          v-for="(number, index) in howManyCardsArray" :key="index" :value="number">
          {{ number }}
          <!-- Display each option value -->
        </option>
      </select>
    </div>

    <!-- Display the cards on the page -->
    <div class="my-cards-height overflow-y-auto">
      <Cards :cards="cards"></Cards>
    </div>

    <!-- Pagination Component -->

    <!-- pagenumbers: Pass the page numbers array to the Paginator -->
    <!-- currentPage: Pass the current page to the Paginator -->
    <!-- @changePage: Listen for page change events from the Paginator -->
    <!-- @previousPage: Listen for 'Previous' page change -->
    <!-- @nextPage: Listen for 'Next' page change -->
    <!-- isPreviousDisabled: Disable 'Previous' button if necessary -->
    <!-- isNextDisabled: Disable 'Next' button if necessary -->
    <div class="p-3">
      <Paginator
        :pagenumbers="pagenumbersArray"
        :currentPage="currentPage"        
        @changePage="handlePageChange"
        @previousPage="handlePreviousPage"
        @nextPage="handleNextPage"
        :isPreviousDisabled="currentPage === 1"
        :isNextDisabled="currentPage === totalPages"
      ></Paginator>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import Cards from "@/components/Cards.vue"; //Import the Cards component
import Paginator from "@/components/Paginator.vue"; // Import the Paginator component
import {BASE_URL} from '../helpers/baseUrls'
export default {
  components: { Cards, Paginator },
  data() {
    return {
      urlApi: BASE_URL, // Base URL for the API
      cards: [], // Array to hold the card data fetched from the API
      currentPage: this.$route.params.currentPage, // The current page that is displayed
      howManyCards: this.$route.params.howManyCards, // The number of cards displayed per page
      howManyCardsArray: [1, 2, 3, 4, 5, 6, 7, 10, 20], // The available options for how many cards per page
      pagenumbersArray: [], // Array to store the page numbers for pagination
      totalPages: 1, // Total number of pages (calculated based on the data)
    };
  },
  // Fetch data when the component is mounted
  async mounted() {
    this.howManyCardsCorrection();
    // await this.getClassRoster(); // Get the cards data
    await this.getPageNumbers(); // Get the total number of pages
  },
  watch:{
    $route: "routeChanged", 
  },
  methods: {
    // Fetch the list of cards based on the current page and number of cards per page
    async getClassRoster() {
      const url = `${this.urlApi}/queryOsztalynevsorLimit/${this.currentPage}/${this.howManyCards}`;
      const response = await axios.get(url); // Make a GET request to fetch data
      this.cards = response.data.data; // Assign the fetched data to the 'cards' array
    },
    // Fetch the total number of pages based on how many cards are displayed per page
    async getPageNumbers() {
      const url = `${this.urlApi}/queryHanyOldalVan/${this.howManyCards}`;
      const response = await axios.get(url); // Make a GET request to fetch the page number data
      this.totalPages = response.data.data.oldalszam; // Assign total number of pages to totalPages
      // this.pagenumbersArray = []; // Reset the page numbers array
      // Populate the page numbers array with the available page numbers
      this.pagenumbersArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      // for (let i = 0; i < this.totalPages; i++) {
      //   this.pagenumbersArray.push(i + 1); // Add page numbers starting from 1
      // }

      // If the current page exceeds the total pages, adjust to the last available page
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
        // this.currentPage = this.totalPages > 0 ? this.totalPages : 1; // Set the current page to the last available page or 1 if no pages
      }
      this.getClassRoster(); // Fetch the cards again with the updated page
      this.routerReplacer();
    },

    // Handle when a user clicks on a page number
    handlePageChange(page) {
      if (page !== this.currentPage) {
        this.currentPage = page; // Update the current page
        this.getClassRoster(); // Fetch the cards for the new page
      }
    },
    // Handle the "Previous" button click
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // Go to the previous page
        this.getClassRoster(); // Fetch the cards for the previous page
      }
    },
    // Handle the "Next" button click
    handleNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // Go to the next page
        this.getClassRoster(); // Fetch the cards for the next page
      }
    },
    routerReplacer(){
      const routeName = this.$route.name;
      this.$router.push({
        name: routeName,
        params: {
          currentPage: this.currentPage,
          howManyCards: this.howManyCards,
        },
      });
    },
    howManyCardsCorrection(){
      if (!this.howManyCardsArray.includes(this.howManyCards)) {
        this.howManyCards = this.howManyCardsArray.filter(x => x <= this.howManyCards).sort((a,b) => b-a)[0];
      }
    },
    routeChanged(){
      if (this.currentPage != this.$route.params.currentPage ) {
        this.currentPage= this.$route.params.currentPage; // The current page that is displayed
        
      }
      if (this.howManyCards != this.$route.params.howManyCards) {
        
        this.howManyCards= this.$route.params.howManyCards; // The number of cards displayed per page
      }
    }
  },
};
</script>
  
  <style>
.my-cards-height {
  height: calc(100vh - 300px); /* Set height for the card container */
}
</style>