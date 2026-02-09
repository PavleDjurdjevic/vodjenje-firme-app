<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Opis</th>
        <th v-if="isAdmin">Akcije</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="o in odeljenja" :key="o.odeljenje_id">
        <td>{{ o.odeljenje_id }}</td>
        <td>{{ o.odeljenje_naziv }}</td>
        <td>{{ o.odeljenje_opis }}</td>

        <td v-if="isAdmin">
          <button @click="$emit('izmeni', o)">Izmeni</button>
          <button @click="$emit('obrisi', o.odeljenje_id)">Obriši</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["odeljenja", "isAdmin"],
};
</script>
