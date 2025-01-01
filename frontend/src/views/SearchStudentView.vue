<template>
  <div>
    <div>
      <h1>Kommunisták keresése</h1>
    </div>
    <div class="d-flex" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="searchInput"
      />
      <button class="btn btn-outline-success" type="submit" @click="onClickSearch()">Search</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">classId</th>
          <th scope="col">Gender</th>
          <th scope="col">name</th>
          <th scope="col">Birth date</th>
          <th scope="col">Town</th>
          <th scope="col">Stipendium</th>
          <th scope="col">Average</th>
          <th scope="col">Class name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.osztalyid }}</td>
          <td>{{ row.nev }}</td>
          <td>{{ row.neme }}</td>
          <td>{{ row.szuletett }}</td>
          <td>{{ row.helyseg }}</td>
          <td>{{ row.osztondij }}</td>
          <td>{{ row.atlag }}</td>
          <td>{{ row.osztalynev }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../helpers/baseUrls";
export default {
  data() {
    return {
      urlApi: BASE_URL, // Base URL for the API
      rows: [],
      searchInput: null, 
      searchTerm: null,
    };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      const url = `${BASE_URL}/queryDiakKeres/${this.searchTerm}`;
      const headers = {
        Accept: "application/json",
      };
      const response = await axios.get(url, headers); // Make a GET request to fetch data
      this.rows = response.data.data;
      console.log("Response: ", this.rows);
    },
    onClickSearch(){
      this.searchTerm= this.searchInput;
      this.getStudents();
    }
  },
};
</script>

<style>
</style>