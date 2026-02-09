<template>
  <div class="container">
    <h1>Odeljenja</h1>

    <!-- Forma samo za admina -->
    <OdeljenjaForm
      v-if="isAdmin"
      :izabrano="izabrano"
      @osvezi-listu="fetchOdeljenja"
      @resetuj="izabrano = null"
    />

    <!-- Lista je uvek vidljiva adminu -->
    <OdeljenjaList
      :odeljenja="odeljenja"
      :is-admin="isAdmin"
      @izmeni="izaberi"
      @obrisi="obrisi"
    />
  </div>
</template>

<script>
import axios from 'axios';
import OdeljenjaForm from '../components/OdeljenjaForm.vue';
import OdeljenjaList from '../components/OdeljenjaList.vue';

export default {
  components: { OdeljenjaForm, OdeljenjaList },
  data() {
    return {
      odeljenja: [],
      izabrano: null,
      user: null,
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.uloga === 'admin';
    },
  },
  methods: {
    ucitajUsera() {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    },
    izaberi(odeljenje) {
      this.izabrano = { ...odeljenje };
    },
    async obrisi(id) {
      if (!confirm("Da li želite da obrišete odeljenje?")) return;
      try {
        await axios.delete(`http://localhost:3000/api/odeljenja/${id}`);
        this.fetchOdeljenja();
      } catch (err) {
        console.error("Greška pri brisanju:", err);
        alert(
          err.response?.data?.message ||
          'Greška pri brisanju odeljenja.'
        );
      }
    },
    async fetchOdeljenja() {
      try {
        const res = await axios.get('http://localhost:3000/api/odeljenja');
        this.odeljenja = res.data;
      } catch (err) {
        console.error("Greška:", err);
      }
    },
  },
  mounted() {
    this.ucitajUsera();
    this.fetchOdeljenja();
  }
};
</script>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 20px; }
</style>

