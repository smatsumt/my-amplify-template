import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import Amplify, * as AmplifyModules from 'aws-amplify';
import { Auth } from 'aws-amplify';
import AmplifyStore from '@/store/';


import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(AmplifyModules);

getUser().then((user) => {
  if (user) {
    // router.push({path: '/'})
  }
})


function getUser() {
  return Auth.currentAuthenticatedUser().then((data) => {
    if (data && data.signInUserSession) {
      AmplifyStore.commit('setUser', data);
      return data;
    }
    // eslint-disable-next-line no-unused-vars
  }).catch((e) => {
    AmplifyStore.commit('setUser', null);
    return null
  });
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true},
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { requiresAuth: true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Home,
    meta: { requiresAuth: true},  // to redirect to /auth. Direct to /auth does not refresh top menu
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
