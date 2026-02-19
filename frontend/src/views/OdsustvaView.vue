<template>
  <div class="container">
    <h1>Odsustva</h1>

    <!-- Forma samo za ADMINA -->
    <OdsustvaForm
      v-if="isAdmin"
      @osvezi-listu="fetchOdsustva"
    />

    <!-- Info tekst za običnog korisnika -->
    <p v-if="!isAdmin">
      Prikazuju se samo vaša odsustva.
    </p>

    <!-- Lista odsustava za sve ulogovane (admin = sva, user = samo svoja) -->
    <OdsustvaList
      :odsustva="odsustva"
      :is-admin="isAdmin"
      :zaposleni-mapa="zaposleniMapa"
      @obrisi="obrisiOdsustvo"
    />
  </div>
</template>

<script>
import api from "../api";
import OdsustvaForm from '../components/OdsustvaForm.vue';
import OdsustvaList from '../components/OdsustvaList.vue';

export default {
  components: { OdsustvaForm, OdsustvaList },
  data() {
    return {
      odsustva: [],
      user: null,
      zaposleni: [], // ⬅ za mapiranje zap_id -> ime + prezime
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.uloga === 'admin';
    },
    // mapa: zap_id -> "Ime Prezime"
    zaposleniMapa() {
      const mapa = {};
      this.zaposleni.forEach((z) => {
        mapa[z.zap_id] = `${z.zap_ime} ${z.zap_prezime}`;
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
        const res = await api.get('/api/zaposleni');
        this.zaposleni = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju zaposlenih (za odsustva):', err);
      }
    },
    async fetchOdsustva() {
      if (!this.user) return;

      try {
        // admin – sva odsustva
        if (this.isAdmin) {
          const res = await api.get('/api/odsustva');
          this.odsustva = res.data;
          return;
        }

        // običan korisnik – šaljemo email kao query parametar
        const res = await api.get('/api/odsustva/moja', {
          params: { email: this.user.email },
        });
        this.odsustva = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju odsustava:', err);
      }
    },
    async obrisiOdsustvo(id) {
      if (!this.isAdmin) return; // dodatna zaštita na frontendu

      if (!confirm('Da li ste sigurni da želite da obrišete odsustvo?')) {
        return;
      }

      try {
        await api.delete(`/api/odsustva/${id}`);
        this.fetchOdsustva();
      } catch (err) {
        console.error('Greška pri brisanju odsustva:', err);
        alert('Greška pri brisanju odsustva.');
      }
    },
  },
  async mounted() {
    this.ucitajUsera();
    await this.fetchZaposleni(); // ⬅ da imamo imena za mapiranje
    this.fetchOdsustva();
  },
};
</script>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 20px; }
</style>


