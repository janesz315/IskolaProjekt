<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container-fluid my-container">
    <div class="wrapper">
      <nav class="my-border p-4">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/kartyak">Kártyák</RouterLink>
      </nav>
    </div>

    <div class="my-border p-2">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
