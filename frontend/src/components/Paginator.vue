<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link">Previous</a>
      </li>
      <li class="page-item" v-for="number in pagenumbers" :key="number">
        <a class="page-link" href="#">{{ number }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pagenumbers"],
};
</script>

<style>
</style>