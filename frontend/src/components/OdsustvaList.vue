<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Zaposleni</th>
        <th>Datum početka</th>
        <th>Datum kraja</th>
        <th>Tip</th>
        <th v-if="isAdmin">Akcije</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="o in odsustva" :key="o.odsustvo_id">
        <td>{{ o.odsustvo_id }}</td>

        <!-- IME + PREZIME UMESTO ID -->
        <td>{{ zaposleniNaziv(o.zap_id) }}</td>

        <!-- FORMATIRANI DATUMI -->
        <td>{{ formatDatum(o.odsustvo_datum_pocetka) }}</td>
        <td>{{ formatDatum(o.odsustvo_datum_kraja) }}</td>

        <td>{{ o.odsustvo_tip }}</td>

        <td v-if="isAdmin">
          <button @click="$emit('obrisi', o.odsustvo_id)">Obriši</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["odsustva", "isAdmin", "zaposleniMapa"],

  methods: {
    formatDatum(datum) {
      if (!datum) return "";
      const d = new Date(datum);
      return d.toLocaleDateString("sr-RS"); // DD.MM.YYYY.
    },
    zaposleniNaziv(zap_id) {
      if (!this.zaposleniMapa) return zap_id;
      return this.zaposleniMapa[zap_id] || zap_id;
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
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #a71d2a;
}
</style>

