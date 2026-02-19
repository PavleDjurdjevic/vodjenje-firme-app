<template>
  <div class="login-container">
    <h1>Prijava u sistem</h1>

    <form @submit.prevent="prijava">
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Unesite email"
          required
        />
      </div>

      <div class="form-group">
        <label>Lozinka</label>
        <input
          v-model="lozinka"
          type="password"
          placeholder="Unesite lozinku"
          required
        />
      </div>

      <button type="submit">Prijavi se</button>
    </form>

    <p v-if="greska" class="error">{{ greska }}</p>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      lozinka: '',
      greska: '',
    };
  },
  methods: {
    async prijava() {
      this.greska = '';

      try {
        const res = await api.post('/api/korisnici/login', {
          email: this.email,
          lozinka: this.lozinka,
        });

        // očekujemo { message: '...', korisnik: { id, ime, email, uloga } }
        const korisnik = res.data.korisnik;

        // čuvamo korisnika u localStorage
        localStorage.setItem('user', JSON.stringify(korisnik));

        // prebacujemo korisnika na početnu stranicu (npr. zaposleni)
        this.$router.push('/zaposleni');
      } catch (err) {
        console.error('Greška pri prijavi:', err);
        this.greska = err.response?.data?.message || 'Neuspešna prijava. Proverite kredencijale.';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background: #0056b3;
}
.error {
  margin-top: 10px;
  color: #dc3545;
}
</style>
