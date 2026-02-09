<template>
  <div class="container">
    <h1>Zaposleni</h1>

    <!-- Pretraga za sve ulogovane -->
    <div class="search-bar">
      <input
        v-model="searchTerm"
        placeholder="Pretraga po imenu, prezimenu ili email-u"
      />
    </div>

    <!-- Forma za dodavanje/izmenu samo za admina -->
    <ZaposleniForm
      v-if="isAdmin"
      @osvezi-listu="fetchZaposleni"
      :izabrani="izabrani"
      @resetuj-izmenu="izabrani = null"
    />

    <!-- Lista uvek vidljiva, ali se prikaz plata i akcija menja po ulozi -->
    <ZaposleniList
      :zaposleni="filtriraniZaposleni"
      :is-admin="isAdmin"
      :user="user"
      :radna-mesta-mapa="radnaMestaMapa"
      @obrisi="obrisiZaposlenog"
      @izmeni="izaberiZaposlenog"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ZaposleniList from '../components/ZaposleniList.vue';
import ZaposleniForm from '../components/ZaposleniForm.vue';

export default {
  components: { ZaposleniList, ZaposleniForm },
  data() {
    return {
      zaposleni: [],
      izabrani: null,
      user: null,
      searchTerm: '',
      radnaMesta: [], //  ovde čuvam radna mesta
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.uloga === 'admin';
    },
    filtriraniZaposleni() {
      if (!this.searchTerm) {
        return this.zaposleni;
      }

      const term = this.searchTerm.toLowerCase();

      return this.zaposleni.filter((z) => {
        return (
          (z.zap_ime && z.zap_ime.toLowerCase().includes(term)) ||
          (z.zap_prezime && z.zap_prezime.toLowerCase().includes(term)) ||
          (z.zap_email && z.zap_email.toLowerCase().includes(term))
        );
      });
    },
    // mapa: radno_mesto_id -> radno_mesto_naziv
    radnaMestaMapa() {
      const mapa = {};
      this.radnaMesta.forEach((rm) => {
        mapa[rm.radno_mesto_id] = rm.radno_mesto_naziv;
      });
      return mapa;
    },
  },
  methods: {
    ucitajUsera() {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    },
    async fetchZaposleni() {
      try {
        const res = await axios.get('http://localhost:3000/api/zaposleni');
        this.zaposleni = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju zaposlenih:', err);
      }
    },
    async fetchRadnaMesta() {
      try {
        const res = await axios.get('http://localhost:3000/api/radnaMesta');
        this.radnaMesta = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju radnih mesta (za prikaz naziva):', err);
      }
    },
    async obrisiZaposlenog(id) {
      if (!confirm('Da li ste sigurni da želite da obrišete zaposlenog?')) {
        return;
      }

      try {
        await axios.delete(`http://localhost:3000/api/zaposleni/${id}`);
        this.fetchZaposleni();
      } catch (err) {
        console.error('Greška pri brisanju zaposlenog:', err);
        alert(
          err.response?.data?.message ||
          'Greška pri brisanju zaposlenog.'
        );
      }
    },
    izaberiZaposlenog(zaposleni) {
      this.izabrani = { ...zaposleni };
    },
  },
  mounted() {
    this.ucitajUsera();
    this.fetchZaposleni();
    this.fetchRadnaMesta(); // ⬅ da bismo imali nazive radnih mesta u tabeli
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  margin-bottom: 15px;
}

.search-bar input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>





