import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ZaposleniView from '../views/ZaposleniView.vue';
import RadnaMestaView from '../views/RadnaMestaView.vue';
import OdeljenjaView from '../views/OdeljenjaView.vue';
import OdsustvaView from '../views/OdsustvaView.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/', redirect: '/zaposleni' },

  // sve ove rute su dostupne SVIM ulogovanim korisnicima
  { path: '/zaposleni', component: ZaposleniView },
  { path: '/radna-mesta', component: RadnaMestaView },
  { path: '/odeljenja', component: OdeljenjaView },
  { path: '/odsustva', component: OdsustvaView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ['/login'];
  const authRequired = !publicRoutes.includes(to.path);

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ako ruta traži login (nije /login), a nema user-a → šutni na /login
  if (authRequired && !user) {
    return next('/login');
  }

  // ako je već ulogovan i ide na /login → vrati ga na /zaposleni
  if (to.path === '/login' && user) {
    return next('/zaposleni');
  }

  next();
});

export default router;
