<template>
  <form @submit.prevent="sacuvaj">
    <input v-model="odeljenje.odeljenje_naziv" placeholder="Naziv" required />
    <input v-model="odeljenje.odeljenje_opis" placeholder="Opis (opciono)" />

    <button type="submit">
      {{ odeljenje.odeljenje_id ? "Sačuvaj izmene" : "Dodaj odeljenje" }}
    </button>

    <button
      v-if="odeljenje.odeljenje_id"
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
  props: ["izabrano"],
  data() {
    return {
      odeljenje: this.izabrano
        ? { ...this.izabrano }
        : { odeljenje_naziv: "", odeljenje_opis: "" },
    };
  },
  watch: {
    izabrano(n) {
      this.odeljenje = n
        ? { ...n }
        : { odeljenje_naziv: "", odeljenje_opis: "" };
    },
  },
  methods: {
    async sacuvaj() {
      try {
        if (this.odeljenje.odeljenje_id) {
          await api.put(
            `/api/odeljenja/${this.odeljenje.odeljenje_id}`,
            this.odeljenje
          );
        } else {
          await api.post("/api/odeljenja", this.odeljenje);
        }

        this.$emit("osvezi-listu");
        this.resetujFormu();
      } catch (err) {
        console.error("Greška pri čuvanju:", err);
      }
    },
    resetujFormu() {
      this.$emit("resetuj");
      this.odeljenje = { odeljenje_naziv: "", odeljenje_opis: "" };
    },
  },
};
</script>
