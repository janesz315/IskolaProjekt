<template>
  <nav aria-label="Pagination">
    <ul class="pagination">
      <!-- 'Previous' button -->
      <li class="page-item" :class="{ disabled: isPreviousDisabled }">
        <a class="page-link" href="#" @click.prevent="goToPreviousPage">Previous</a>
      </li>
      <!-- Buttons of the pages -->
      <li
        class="page-item"
        v-for="number in pagenumbers"
        :key="number"
        :class="{ active: currentPage === number }"
      >
        <a class="page-link" href="#" @click.prevent="goToPage(number)">{{number}}</a>
      </li>
      <!-- 'Next' button -->
      <li class="page-item" :class="{ disabled: isNextDisabled }">
        <a class="page-link" href="#" @click.prevent="goToNextPage">Next</a>
      </li>
    </ul>
  </nav>
</template>
  
  <script>
export default {
  props: [
    "pagenumbers",
    "currentPage",
    "isPreviousDisabled",
    "isNextDisabled",
  ],
  methods: {
    goToPage(page) {
      this.$emit("changePage", page); // Emit page-changed event to the parent component
    },
    goToPreviousPage() {
      this.$emit("previousPage"); // Emit previous-page event to the parent component
    },
    goToNextPage() {
      this.$emit("nextPage"); // Emit next-page event to the parent component
    },
  },
};
</script>
  
<style scoped></style>