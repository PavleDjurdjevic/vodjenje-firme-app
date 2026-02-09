<template>
  <form @submit.prevent="sacuvajOdsustvo">
    <!-- Dropdown umesto unosa ID zaposlenog -->
    <select v-model.number="novo.zap_id" required>
      <option disabled value="">Odaberite zaposlenog</option>
      <option
        v-for="z in zaposleniList"
        :key="z.zap_id"
        :value="z.zap_id"
      >
        {{ z.zap_ime }} {{ z.zap_prezime }} (ID: {{ z.zap_id }})
      </option>
    </select>

    <input
      v-model="novo.odsustvo_datum_pocetka"
      type="date"
      required
    />
    <input
      v-model="novo.odsustvo_datum_kraja"
      type="date"
      required
    />

    <select v-model="novo.odsustvo_tip" required>
      <option value="bolovanje">Bolovanje</option>
      <option value="odmor">Odmor</option>
      <option value="sluzbeni put">Službeni put</option>
      <option value="neplaceno">Neplaćeno</option>
    </select>

    <button type="submit">Dodaj odsustvo</button>

    <p v-if="greska" class="error">{{ greska }}</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      novo: {
        zap_id: '',
        odsustvo_datum_pocetka: '',
        odsustvo_datum_kraja: '',
        odsustvo_tip: '',
      },
      zaposleniList: [],
      greska: '', // ⬅ ovde čuvamo poruku o grešci
    };
  },
  methods: {
    async sacuvajOdsustvo() {
      this.greska = '';

      // validacija datuma: početak ne sme biti posle kraja
      if (!this.validirajDatume()) {
        return;
      }

      try {
        await axios.post("http://localhost:3000/api/odsustva", this.novo);
        this.$emit("osvezi-listu");
        this.novo = {
          zap_id: "",
          odsustvo_datum_pocetka: "",
          odsustvo_datum_kraja: "",
          odsustvo_tip: "",
        };
      } catch (err) {
        console.error("Greška pri dodavanju odsustva:", err);
        this.greska = 'Došlo je do greške pri čuvanju odsustva.';
      }
    },
    async fetchZaposleniList() {
      try {
        const res = await axios.get("http://localhost:3000/api/zaposleni");
        this.zaposleniList = res.data;
      } catch (err) {
        console.error("Greška pri dohvatanju zaposlenih za dropdown:", err);
      }
    },
    validirajDatume() {
      if (!this.novo.odsustvo_datum_pocetka || !this.novo.odsustvo_datum_kraja) {
        return true; // HTML required će ovo svakako uhvatiti
      }

      const start = new Date(this.novo.odsustvo_datum_pocetka);
      const end = new Date(this.novo.odsustvo_datum_kraja);

      if (start > end) {
        this.greska = 'Datum početka ne može biti posle datuma kraja.';
        return false;
      }

      return true;
    },
  },
  mounted() {
    this.fetchZaposleniList();
  },
};
</script>

<style scoped>
form { margin-bottom: 20px; }
input, select { margin-right: 10px; padding: 5px; }
button {
  padding: 6px 12px;
  background: #ffc107;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover { background: #e0a800; }
.error {
  margin-top: 10px;
  color: #dc3545;
}
</style>

