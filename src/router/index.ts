// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue";
import NotFound from "@/views/NotFound.vue";
import LoggedUserDetail from "@/views/LoggedUserDetail.vue";
import FavoriteFonts from "@/views/FavoriteFonts.vue";
import CardEdit from "@/views/CardEdit.vue";

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
  },
  {
    path: '/favoriteFonts',
    component: FavoriteFonts,
    name: 'FavoriteFont',
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "NotFound"
  },
  {
    path: "/loggedUserDetail",
    component: LoggedUserDetail,
    name: "LoggedUserDetail",
    meta: { requiresAuth: true },
  },
  {
    path: "/:fontFamily",
    component: CardEdit,
    name: "CardEdit",
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      alert("You don't have access here!");
      next("/");
    }
  } else {
    next();
  }
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

export default router;
