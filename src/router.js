import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Home from './views/Home.vue'
import FormPage from './views/FormPage.vue'

Vue.use(Router);

export const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: Home
  },
  {
    path: '/form_page',
    name: 'form_page',
    meta: {
      title: 'Form',
    },
    component: FormPage
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About',
    },
    component: () => import('./views/About.vue')
  }
];

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home',
      component: Layout,
      children: routes,
    },
    {
      path: '*',
      redirect: '/home',
    }
  ]
});
