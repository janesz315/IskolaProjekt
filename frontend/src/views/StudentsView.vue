<template>
  <div class="container mt-5">
    <h1>Students</h1>

    <!-- Students Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Class ID</th>
          <th>Birthdate</th>
          <th>City</th>
          <th>Scholarship</th>
          <th>Average</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.nev }}</td>
          <td>{{ student.neme ? "fiú" : "lány" }}</td>
          <td>{{ student.osztalyId }}</td>
          <td>{{ student.szuletett }}</td>
          <td>{{ student.helyseg }}</td>
          <td>{{ student.osztondij || "N/A" }}</td>
          <td>{{ student.atlag || "N/A" }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm"
              @click="openEditForm(student)"
            >
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteStudent(student.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add New Student -->
    <div class="mt-4">
      <h3>Add New Student</h3>
      <form @submit.prevent="addStudent">
        <div class="mb-3">
          <input
            type="text"
            v-model="newStudent.nev"
            class="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div class="mb-3">
          <select v-model="newStudent.neme" class="form-control" required>
            <option value="" disabled>Select Gender</option>
            <option :value="true">fiú</option>
            <option :value="false">lány</option>
          </select>
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="newStudent.osztalyId"
            class="form-control"
            placeholder="Class ID"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="date"
            v-model="newStudent.szuletett"
            class="form-control"
            placeholder="Birthdate"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            v-model="newStudent.helyseg"
            class="form-control"
            placeholder="City"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="newStudent.osztondij"
            class="form-control"
            placeholder="Scholarship (optional)"
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            step="0.1"
            v-model="newStudent.atlag"
            class="form-control"
            placeholder="Average (optional)"
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Student</button>
      </form>
    </div>

    <!-- Edit Student -->
    <div v-if="editingStudent" class="mt-4">
      <h3>Edit Student</h3>
      <form @submit.prevent="updateStudent">
        <div class="mb-3">
          <input
            type="text"
            v-model="editingStudent.nev"
            class="form-control"
            placeholder="Name"
          />
        </div>
        <div class="mb-3">
          <select v-model="editingStudent.neme" class="form-control">
            <option value="" disabled>Select Gender</option>
            <option :value="true">fiú</option>
            <option :value="false">lány</option>
          </select>
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="editingStudent.osztalyId"
            class="form-control"
            placeholder="Class ID"
          />
        </div>
        <div class="mb-3">
          <input
            type="date"
            v-model="editingStudent.szuletett"
            class="form-control"
            placeholder="Birthdate"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            v-model="editingStudent.helyseg"
            class="form-control"
            placeholder="City"
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="editingStudent.osztondij"
            class="form-control"
            placeholder="Scholarship"
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            step="0.1"
            v-model="editingStudent.atlag"
            class="form-control"
            placeholder="Average"
          />
        </div>
        <button type="submit" class="btn btn-success">Save Changes</button>
        <button
          type="button"
          class="btn btn-secondary ms-2"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../helpers/baseUrls";
import { useAuthStore } from "../stores/useAuthStore";

export default {
  data() {
    return {
      students: [],
      newStudent: {
        nev: "",
        neme: null,
        osztalyId: "",
        szuletett: "",
        helyseg: "",
        osztondij: "",
        atlag: "",
      },
      editingStudent: null,
      store: useAuthStore(),
    };
  },
  async created() {
    await this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get(`${BASE_URL}/diaks`);
        this.students = response.data.rows.map((student) => {
          const { created_at, updated_at, ...filteredStudent } = student;
          return filteredStudent;
        });
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
    async addStudent() {
  try {
    console.log("Sending data:", this.newStudent);
    const response = await axios.post(
      `${BASE_URL}/diaks`,
      this.newStudent,
      {
        headers: {
          Authorization: `Bearer ${this.store.token}`,
        },
      }
    );
    const { created_at, updated_at, ...newStudent } = response.data.rows;
    this.students.push(newStudent);
    this.resetNewStudent();
    alert("Student added successfully.");
  } catch (error) {
    console.error("Error adding student:", error);
    alert(`Failed to add student: ${error.response?.data?.message || error.message}`);
  }
},

    async deleteStudent(id) {
      if (confirm("Are you sure you want to delete this student?")) {
        try {
          await axios.delete(`${BASE_URL}/diaks/${id}`, {
            headers: {
              Authorization: `Bearer ${this.store.token}`,
            },
          });
          this.students = this.students.filter((student) => student.id !== id);
          alert("Student deleted successfully.");
        } catch (error) {
          console.error("Error deleting student:", error);
          alert("Failed to delete student.");
        }
      }
    },
    openEditForm(student) {
      this.editingStudent = { ...student };
    },
    async updateStudent() {
      try {
        const { id, ...changes } = this.editingStudent;
        await axios.patch(`${BASE_URL}/diaks/${id}`, changes, {
          headers: {
            Authorization: `Bearer ${this.store.token}`,
          },
        });
        await this.fetchStudents();
        this.cancelEdit();
        alert("Student updated successfully.");
      } catch (error) {
        console.error("Error updating student:", error);
        alert("Failed to update student.");
      }
    },
    cancelEdit() {
      this.editingStudent = null;
    },
    resetNewStudent() {
      this.newStudent = {
        nev: "",
        neme: null,
        osztalyId: "",
        szuletett: "",
        helyseg: "",
        osztondij: null,
        atlag: null,
      };
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
