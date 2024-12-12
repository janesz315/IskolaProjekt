<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: isPreviousDisabled }">
        <a class="page-link" href="#" @click.prevent="goToPreviousPage"
          >Previous</a
        >
      </li>
      <li
        class="page-item"
        v-for="number in pagenumbers"
        :key="number"
        :class="{ active: currentPage === number }"
      >
        <a class="page-link" href="#" @click.prevent="goToPage(number)">{{
          number
        }}</a>
      </li>
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
    "totalPages",
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
  
  <style scoped>
</style>