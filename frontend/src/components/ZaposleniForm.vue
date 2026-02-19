<template>
  <form @submit.prevent="sacuvajZaposlenog">
    <input v-model="zaposleni.zap_ime" placeholder="Ime" required />
    <input v-model="zaposleni.zap_prezime" placeholder="Prezime" required />

    <!-- Validacija emaila: type="email" + dodatna provera u JS -->
    <input
      v-model="zaposleni.zap_email"
      type="email"
      placeholder="Email"
      required
    />

    <!-- Validacija plate: type="number" + min="0" -->
    <input
      v-model.number="zaposleni.zap_plata"
      type="number"
      min="0"
      step="0.01"
      placeholder="Plata"
      required
    />

    <input
      v-model="zaposleni.zap_datum_zaposlenja"
      type="date"
      required
    />

    <!-- Dropdown za radno mesto, prikazuje i naziv odeljenja -->
    <select v-model.number="zaposleni.radno_mesto_id" required>
      <option disabled value="">Odaberite radno mesto</option>
      <option
        v-for="rm in radnaMesta"
        :key="rm.radno_mesto_id"
        :value="rm.radno_mesto_id"
      >
        {{ rm.radno_mesto_naziv }} – {{ getOdeljenjeNaziv(rm.odeljenje_id) }}
      </option>
    </select>

    <button type="submit">
      {{ zaposleni.zap_id ? 'Sačuvaj izmene' : 'Dodaj zaposlenog' }}
    </button>
    <button v-if="zaposleni.zap_id" type="button" @click="resetujFormu">
      Otkaži
    </button>

    <!-- prikaz poruke o grešci -->
    <p v-if="greska" class="error">{{ greska }}</p>
  </form>
</template>

<script>
import api from "../api";

export default {
  props: ['izabrani'],
  data() {
    return {
      zaposleni: this.izabrani
        ? { ...this.izabrani }
        : {
            zap_ime: '',
            zap_prezime: '',
            zap_email: '',
            zap_plata: '',
            zap_datum_zaposlenja: '',
            radno_mesto_id: '',
          },
      radnaMesta: [],
      odeljenja: [],
      greska: '', //  ovde smestam poruku validacije
    };
  },
  watch: {
    izabrani(novi) {
      this.zaposleni = novi
        ? { ...novi }
        : {
            zap_ime: '',
            zap_prezime: '',
            zap_email: '',
            zap_plata: '',
            zap_datum_zaposlenja: '',
            radno_mesto_id: '',
          };
      this.greska = '';
    },
  },
  computed: {
    odeljenjaMapa() {
      const mapa = {};
      this.odeljenja.forEach((o) => {
        mapa[o.odeljenje_id] = o.odeljenje_naziv;
      });
      return mapa;
    },
  },
  methods: {
    async sacuvajZaposlenog() {
      this.greska = '';

      // prvo radim lokalnu validaciju
      if (!this.validiraj()) {
        return;
      }

      try {
        if (this.zaposleni.zap_id) {
          await api.put(
            `/api/zaposleni/${this.zaposleni.zap_id}`,
            this.zaposleni
          );
        } else {
          await api.post(
            '/api/zaposleni',
            this.zaposleni
          );
        }
        this.$emit('osvezi-listu');
        this.resetujFormu();
      } catch (err) {
        console.error('Greška pri čuvanju zaposlenog:', err);
        this.greska = 'Došlo je do greške pri čuvanju zaposlenog.';
      }
    },
    resetujFormu() {
      this.$emit('resetuj-izmenu');
      this.zaposleni = {
        zap_ime: '',
        zap_prezime: '',
        zap_email: '',
        zap_plata: '',
        zap_datum_zaposlenja: '',
        radno_mesto_id: '',
      };
      this.greska = '';
    },
    async fetchRadnaMesta() {
      try {
        const res = await api.get('/api/radnaMesta');
        this.radnaMesta = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju radnih mesta za dropdown:', err);
      }
    },
    async fetchOdeljenja() {
      try {
        const res = await api.get('/api/odeljenja');
        this.odeljenja = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju odeljenja za dropdown:', err);
      }
    },
    getOdeljenjeNaziv(odeljenje_id) {
      return this.odeljenjaMapa[odeljenje_id] || `Odeljenje ${odeljenje_id}`;
    },
    validiraj() {
      // email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.zaposleni.zap_email)) {
        this.greska = 'Unesite ispravan email.';
        return false;
      }

      if (this.zaposleni.zap_plata < 0) {
        this.greska = 'Plata ne može biti negativna.';
        return false;
      }

      return true;
    },
  },
  mounted() {
    this.fetchRadnaMesta();
    this.fetchOdeljenja();
  },
};
</script>

<style scoped>
form { margin-bottom: 20px; }
input, select { margin-right: 10px; padding: 5px; }
button { padding: 6px 12px; background: #007bff; color: white; border: none; cursor: pointer; }
button:hover { background: #0056b3; }
button[type="button"] {
  background: #6c757d;
}
button[type="button"]:hover {
  background: #5a6268;
}
.error {
  margin-top: 10px;
  color: #dc3545;
}
</style>

