<template>
  <div class="container mt-5">
    <h1>Class Members</h1>

    <div v-if="loading" class="text-center">
      <p>Loading class members...</p>
    </div>

    <div v-if="!loading && classMembers.length > 0">
      <div v-for="classMember in classMembers" :key="classMember.osztalyNev" class="mb-4">
        <h3>{{ classMember.osztalyNev }}</h3>
        <ul>
          <li v-for="name in classMember.nevek" :key="name">{{ name }}</li>
        </ul>
      </div>
    </div>

    <div v-if="!loading && classMembers.length === 0" class="text-center">
      <p>No class members found.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../helpers/baseUrls";

export default {
  data() {
    return {
      classMembers: [],
      loading: false,
    };
  },
  async created() {
    await this.fetchClassMembers();
  },
  methods: {
    async fetchClassMembers() {
      this.loading = true;
      try {
        const response = await axios.get(`${BASE_URL}/queryOsztalynevsorObj`);
        this.classMembers = response.data.data;
      } catch (error) {
        console.error("Error fetching class members:", error);
        alert("Failed to load class members.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}
</style>

  