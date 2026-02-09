<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Email</th>
        <th>Plata</th>
        <th>Datum zaposlenja</th>
        <th>Radno mesto</th>
        <th v-if="isAdmin">Akcije</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="z in zaposleni" :key="z.zap_id">
        <td>{{ z.zap_id }}</td>
        <td>{{ z.zap_ime }}</td>
        <td>{{ z.zap_prezime }}</td>
        <td>{{ z.zap_email }}</td>

        <!-- PLATA: admin vidi sve, običan korisnik vidi SAMO svoju -->
        <td>
          <span v-if="mozeVidetiPlatu(z)">
            {{ formatPlata(z.zap_plata) }}
          </span>
          <span v-else>
            —
          </span>
        </td>

        <!-- FORMATIRAN DATUM -->
        <td>{{ formatDatum(z.zap_datum_zaposlenja) }}</td>

        <!-- NAZIV RADNOG MESTA UMESTO ID -->
        <td>{{ radnoMestoNaziv(z.radno_mesto_id) }}</td>

        <td v-if="isAdmin">
          <button @click="$emit('izmeni', z)">Izmeni</button>
          <button @click="$emit('obrisi', z.zap_id)">Obriši</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["zaposleni", "isAdmin", "user", "radnaMestaMapa"],

  methods: {
    formatDatum(datum) {
      if (!datum) return "";
      const d = new Date(datum);
      return d.toLocaleDateString("sr-RS"); // DD.MM.YYYY.
    },
    formatPlata(iznos) {
      if (iznos === null || iznos === undefined) return "";
      return (
        Number(iznos).toLocaleString("sr-RS", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " RSD"
      );
    },
    radnoMestoNaziv(radno_mesto_id) {
      if (!this.radnaMestaMapa) return radno_mesto_id;
      return this.radnaMestaMapa[radno_mesto_id] || radno_mesto_id;
    },

    // ko sme da vidi platu u ovom redu
    mozeVidetiPlatu(z) {
      // admin vidi sve
      if (this.isAdmin) return true;

      // ako nema usera (ne bi smelo da se desi, ali da budem siguran)
      if (!this.user) return false;

      // običan korisnik vidi samo svoju platu (preko email-a)
      return this.user.email === z.zap_email;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
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
