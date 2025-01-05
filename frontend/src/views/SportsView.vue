<template>
  <div class="container mt-5">
    <h1>Sports</h1>

    <!-- Sports Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in sports" :key="sport.id">
          <td>{{ sport.id }}</td>
          <td v-if="editingSport.id !== sport.id">{{ sport.sportNev }}</td>
          <td v-else>
            <input
              type="text"
              v-model="editingSport.sportNev"
              class="form-control"
            />
          </td>
          <td>
            <button
              v-if="editingSport.id === sport.id"
              class="btn btn-success btn-sm"
              @click="updateSport(sport.id)"
            >
              Save
            </button>
            <button
              v-if="editingSport.id === sport.id"
              class="btn btn-secondary btn-sm"
              @click="cancelEdit"
            >
              Cancel
            </button>
            <button
              v-else
              class="btn btn-warning btn-sm"
              @click="editSport(sport)"
            >
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteSport(sport.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add New Sport -->
    <div class="mt-4">
      <h3>Add New Sport</h3>
      <form @submit.prevent="addSport">
        <div class="mb-3">
          <input
            type="text"
            v-model="newSportName"
            class="form-control"
            placeholder="Enter sport name"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Sport</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../helpers/baseUrls"; // BASE_URL importálása
import { useAuthStore } from "../stores/useAuthStore"; // Auth store importálása

export default {
  data() {
    return {
      sports: [], // List of sports
      newSportName: "", // New sport name input
      editingSport: {}, // Object holding the sport being edited
      store: useAuthStore(), // Auth store elérhetővé tétele
    };
  },
  async created() {
    await this.fetchSports();
  },
  methods: {
    async fetchSports() {
      try {
        const response = await axios.get(`${BASE_URL}/sports`);
        this.sports = response.data.rows;
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    },
    async addSport() {
      try {
        const response = await axios.post(
          `${BASE_URL}/sports`,
          { sportNev: this.newSportName },
          {
            headers: {
              Authorization: `Bearer ${this.store.token}`,
            },
          }
        );
        this.sports.push(response.data.rows);
        this.newSportName = "";
        alert("Sport added successfully.");
      } catch (error) {
        console.error("Error adding sport:", error);
        alert("Failed to add sport.");
      }
    },
    editSport(sport) {
      this.editingSport = { ...sport };
    },
    cancelEdit() {
      this.editingSport = {};
    },
    async updateSport(id) {
      try {
        const response = await axios.patch(
          `${BASE_URL}/sports/${id}`,
          { sportNev: this.editingSport.sportNev },
          {
            headers: {
              Authorization: `Bearer ${this.store.token}`,
            },
          }
        );
        const updatedSport = response.data.row;
        this.sports = this.sports.map((sport) =>
          sport.id === id ? updatedSport : sport
        );
        this.cancelEdit();
        alert("Sport updated successfully.");
      } catch (error) {
        console.error("Error updating sport:", error);
        alert("Failed to update sport.");
      }
    },
    async deleteSport(id) {
      if (confirm("Are you sure you want to delete this sport?")) {
        try {
          await axios.delete(`${BASE_URL}/sports/${id}`, {
            headers: {
              Authorization: `Bearer ${this.store.token}`,
            },
          });
          this.sports = this.sports.filter((sport) => sport.id !== id);
          alert("Sport deleted successfully.");
        } catch (error) {
          console.error("Error deleting sport:", error);
          alert("Failed to delete sport.");
        }
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
.table th,
.table td {
  vertical-align: middle;
}
</style>
