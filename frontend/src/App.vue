<template>
  <div class="container-fluid my-container">
    <div class="wrapper">
      <Menu />
    </div>

    <div class="my-border p-2">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router"

import Menu from "./components/Menu.vue";
export default {
  components: { Menu },
}
</script>

<style scoped>
</style>
