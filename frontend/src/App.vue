<template>
  <div id="app">
    <header>
      <h1>Upravljanje zaposlenima</h1>

      <div class="user-bar" v-if="user">
        <span>
          Ulogovan kao:
          <strong>{{ user.ime }}</strong>
          ({{ user.uloga }})
        </span>
        <button @click="logout">Odjava</button>
      </div>

      <div class="user-bar" v-else>
        <span>Niste ulogovani</span>
      </div>

      <!-- Navigacija prikazana samo ako je korisnik ulogovan -->
      <nav v-if="user">
        <!-- svi ulogovani (admin i obični korisnici) -->
        <router-link to="/zaposleni">Zaposleni</router-link>
        |
        <router-link to="/odsustva">Odsustva</router-link>

        <!-- samo admin -->
        <template v-if="user.uloga === 'admin'">
          |
          <router-link to="/radna-mesta">Radna mesta</router-link>
          |
          <router-link to="/odeljenja">Odeljenja</router-link>
        </template>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    ucitajUsera() {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    },
    logout() {
      localStorage.removeItem('user');
      this.ucitajUsera();
      this.$router.push('/login');
    },
  },
  created() {
    this.ucitajUsera();
  },
  watch: {
    // svaki put kad se promeni ruta, proverimo da li se promenio i user u localStorage
    $route() {
      this.ucitajUsera();
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}
#app {
  max-width: 800px;
  margin: 40px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
header {
  margin-bottom: 20px;
}
nav {
  margin-top: 10px;
  margin-bottom: 20px;
}
nav a {
  text-decoration: none;
  color: #007bff;
  margin-right: 10px;
}
nav a:hover {
  text-decoration: underline;
}
.user-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.user-bar button {
  padding: 4px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #dc3545;
  color: white;
}
.user-bar button:hover {
  background: #a71d2a;
}
</style>
