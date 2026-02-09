<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Naziv radnog mesta</th>
        <th>Odeljenje</th>
        <th>Akcije</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rm in radnaMesta" :key="rm.radno_mesto_id">
        <td>{{ rm.radno_mesto_id }}</td>
        <td>{{ rm.radno_mesto_naziv }}</td>
        <td>{{ odeljenjeNaziv(rm.odeljenje_id) }}</td>
        <td>
          <button @click="$emit('izmeni', rm)">Izmeni</button>
          <button @click="$emit('obrisi', rm.radno_mesto_id)">Obriši</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["radnaMesta", "odeljenjaMapa"],
  methods: {
    odeljenjeNaziv(odeljenje_id) {
      if (!this.odeljenjaMapa) return odeljenje_id;
      return this.odeljenjaMapa[odeljenje_id] || odeljenje_id;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
button:last-child {
  background-color: #dc3545;
}
button:last-child:hover {
  background-color: #a71d2a;
}
</style>


