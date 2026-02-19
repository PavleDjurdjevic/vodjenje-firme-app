<template>
  <div class="container">
    <h1>Radna mesta</h1>

    <!-- Forma za dodavanje / izmenu radnog mesta -->
    <RadnaMestaForm
      :izabrano="izabrano"
      @osvezi-listu="fetchRadnaMesta"
      @resetuj="izabrano = null"
    />

    <!-- Lista radnih mesta sa akcijama -->
    <RadnaMestaList
      :radnaMesta="radnaMesta"
      :odeljenja-mapa="odeljenjaMapa"
      @izmeni="izaberi"
      @obrisi="obrisi"
    />
  </div>
</template>

<script>
import api from "../api";
import RadnaMestaForm from '../components/RadnaMestaForm.vue';
import RadnaMestaList from '../components/RadnaMestaList.vue';

export default {
  components: { RadnaMestaForm, RadnaMestaList },
  data() {
    return {
      radnaMesta: [],
      izabrano: null,
      odeljenja: [], // ⬅ učitavamo odeljenja
    };
  },
  computed: {
    // mapa: odeljenje_id -> odeljenje_naziv
    odeljenjaMapa() {
      const mapa = {};
      this.odeljenja.forEach((o) => {
        mapa[o.odeljenje_id] = o.odeljenje_naziv;
      });
      return mapa;
    },
  },
  methods: {
    izaberi(radnoMesto) {
      this.izabrano = { ...radnoMesto };
    },
    async obrisi(id) {
      if (!confirm('Da li želite da obrišete radno mesto?')) return;

      try {
        await api.delete(`/api/radnaMesta/${id}`);
        this.fetchRadnaMesta();
      } catch (err) {
        console.error('Greška pri brisanju radnog mesta:', err);
        alert(
          err.response?.data?.message ||
          'Greška pri brisanju radnog mesta.'
        );
      }
    },
    async fetchRadnaMesta() {
      try {
        const res = await api.get('/api/radnaMesta');
        this.radnaMesta = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju radnih mesta:', err);
      }
    },
    async fetchOdeljenja() {
      try {
        const res = await api.get('/api/odeljenja');
        this.odeljenja = res.data;
      } catch (err) {
        console.error('Greška pri dohvatanju odeljenja (za radna mesta):', err);
      }
    },
  },
  mounted() {
    this.fetchRadnaMesta();
    this.fetchOdeljenja();
  },
};
</script>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 20px; }
</style>




