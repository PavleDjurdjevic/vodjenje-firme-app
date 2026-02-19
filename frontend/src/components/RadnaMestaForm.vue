<template>
  <form @submit.prevent="sacuvaj">
    <input
      v-model="radnoMesto.radno_mesto_naziv"
      placeholder="Naziv radnog mesta"
      required
    />

    <!-- Dropdown umesto ručnog unosa ID odeljenja -->
    <select v-model.number="radnoMesto.odeljenje_id" required>
      <option disabled value="">Odaberite odeljenje</option>
      <option
        v-for="o in odeljenja"
        :key="o.odeljenje_id"
        :value="o.odeljenje_id"
      >
        {{ o.odeljenje_naziv }}
      </option>
    </select>

    <button type="submit">
      {{ radnoMesto.radno_mesto_id ? 'Sačuvaj izmene' : 'Dodaj radno mesto' }}
    </button>

    <button
      v-if="radnoMesto.radno_mesto_id"
      type="button"
      @click="resetujFormu"
    >
      Otkaži
    </button>
  </form>
</template>

<script>
import api from "../api";

export default {
  props: ['izabrano'],
  data() {
    return {
      radnoMesto: this.izabrano
        ? { ...this.izabrano }
        : { radno_mesto_naziv: '', odeljenje_id: '' },
      odeljenja: [], // ⬅ lista odeljenja za dropdown
    };
  },
  watch: {
    izabrano(novo) {
      this.radnoMesto = novo
        ? { ...novo }
        : { radno_mesto_naziv: '', odeljenje_id: '' };
    },
  },
  methods: {
    async sacuvaj() {
      try {
        if (this.radnoMesto.radno_mesto_id) {
          // IZMENa
          await api.put(
            `/api/radnaMesta/${this.radnoMesto.radno_mesto_id}`,
            this.radnoMesto
          );
        } else {
          // DODAVANJE
          await api.post(
            '/api/radnaMesta',
            this.radnoMesto
          );
        }

        this.$emit('osvezi-listu');
        this.resetujFormu();
      } catch (err) {
        console.error('Greška pri čuvanju radnog mesta:', err);
      }
    },
    resetujFormu() {
      this.$emit('resetuj');
      this.radnoMesto = { radno_mesto_naziv: '', odeljenje_id: '' };
    },
    async fetchOdeljenja() {
      try {
        const res = await api.get('/api/odeljenja');
        this.odeljenja = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju odeljenja za dropdown:', err);
      }
    },
  },
  mounted() {
    this.fetchOdeljenja();
  },
};
</script>

<style scoped>
form { margin-bottom: 20px; }
input, select { margin-right: 10px; padding: 5px; }
button {
  padding: 6px 12px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover { background: #218838; }
button[type="button"] {
  background: #6c757d;
}
button[type="button"]:hover {
  background: #5a6268;
}
</style>
