<template>
  <div class="container mt-5">
    <h1>Classes Management</h1>

    <!-- Add New Class -->
    <div class="mb-4">
      <h3>Add New Class</h3>
      <div class="d-flex">
        <input
          v-model="newClassName"
          type="text"
          class="form-control me-2"
          placeholder="Enter class name"
        />
        <button class="btn btn-primary" @click="addClass">Add</button>
      </div>
    </div>

    <!-- Classes Table -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Class Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classItem, index) in classes" :key="classItem.id">
          <td>{{ index + 1 }}</td>
          <td v-if="editingClassId !== classItem.id">{{ classItem.osztalyNev }}</td>
          <td v-else>
            <input
              v-model="editedClassName"
              type="text"
              class="form-control"
            />
          </td>
          <td>
            <button
              v-if="editingClassId !== classItem.id"
              class="btn btn-warning me-2"
              @click="startEdit(classItem.id, classItem.osztalyNev)"
            >
              Edit
            </button>
            <button
              v-else
              class="btn btn-success me-2"
              @click="updateClass(classItem.id)"
            >
              Save
            </button>
            <button
              v-if="editingClassId === classItem.id"
              class="btn btn-secondary me-2"
              @click="cancelEdit"
            >
              Cancel
            </button>
            <button
              class="btn btn-danger"
              @click="deleteClass(classItem.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../helpers/baseUrls";
import { useAuthStore } from "../stores/useAuthStore";

export default {
  data() {
    return {
      classes: [], // List of classes
      newClassName: "", // For creating a new class
      editingClassId: null, // Currently editing class ID
      editedClassName: "", // Edited class name
      store: useAuthStore(),
    };
  },
  async created() {
    await this.fetchClasses();
  },
  methods: {
    async fetchClasses() {
      try {
        const response = await axios.get(`${BASE_URL}/osztalies`, {
          headers: { Authorization: `Bearer ${this.store.token}` },
        });
        this.classes = response.data.data;
      } catch (error) {
        console.error("Error fetching classes:", error);
        alert("Failed to load classes.");
      }
    },
    async addClass() {
      if (!this.newClassName.trim()) {
        alert("Class name cannot be empty.");
        return;
      }

      try {
        await axios.post(
          `${BASE_URL}/osztalies`,
          { osztalyNev: this.newClassName },
          {
            headers: { Authorization: `Bearer ${this.store.token}` },
          }
        );
        alert("Class added successfully.");
        this.newClassName = "";
        await this.fetchClasses();
      } catch (error) {
        console.error("Error adding class:", error);
        alert("Failed to add class.");
      }
    },
    startEdit(id, name) {
      this.editingClassId = id;
      this.editedClassName = name;
    },
    cancelEdit() {
      this.editingClassId = null;
      this.editedClassName = "";
    },
    async updateClass(id) {
      if (!this.editedClassName.trim()) {
        alert("Class name cannot be empty.");
        return;
      }

      try {
        await axios.patch(
          `${BASE_URL}/osztalies/${id}`,
          { osztalyNev: this.editedClassName },
          {
            headers: { Authorization: `Bearer ${this.store.token}` },
          }
        );
        alert("Class updated successfully.");
        this.editingClassId = null;
        this.editedClassName = "";
        await this.fetchClasses();
      } catch (error) {
        console.error("Error updating class:", error);
        alert("Failed to update class.");
      }
    },
    async deleteClass(id) {
      if (!confirm("Are you sure you want to delete this class?")) return;

      try {
        await axios.delete(`${BASE_URL}/osztalies/${id}`, {
          headers: { Authorization: `Bearer ${this.store.token}` },
        });
        alert("Class deleted successfully.");
        await this.fetchClasses();
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class.");
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
.table {
  margin-top: 20px;
}
button {
  margin-right: 5px;
}
</style>
