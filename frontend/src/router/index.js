import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "@/stores/useAuthStore.js";

function checkIfNotLogged() {
  const storeAuth = useAuthStore();
  if (!storeAuth.user) {
    return "/login";
  } else {
    
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {title: (route) => 'Home'}
    },
    {
      path: '/cards/:currentPage/:howManyCards',
      name: 'cards',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardsView.vue'),
      meta: {title: (route) => `Cards/${route.params.currentPage}/${route.params.howManyCards}`}
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/Auth/Login.vue'),
      meta: {title: (route) => 'Login'}
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/Auth/SignUp.vue'),
      meta: {title: (route) => 'Sign up'}
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/Auth/Profile.vue'),
      meta: {title: (route) => 'My profile'}
    },
    {
      path: '/searchstudent',
      name: 'searchStudent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchStudentView.vue'),
      meta: {title: (route) => 'Look for a student'}
    },
    {
      path: '/sports',
      name: 'sports',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SportsView.vue'),
      beforeEnter: [checkIfNotLogged],
      meta: {title: (route) => 'Sports'}
    },
    {
      path: '/classes',
      name: 'classes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClassesView.vue'),
      beforeEnter: [checkIfNotLogged],
      meta: {title: (route) => 'Classes'}
    },
    {
      path: '/students',
      name: 'students',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StudentsView.vue'),
      beforeEnter: [checkIfNotLogged],
      meta: {title: (route) => 'Students'}
    },
    { path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: HomeView,
      meta: {title: (route) => 'Home'}
    },
  ],
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  document.title ="School - " + to.meta.title(to);
  next();
})

export default router
