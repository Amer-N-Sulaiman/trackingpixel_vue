import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateTP from '../views/CreateTP.vue'
import Opens from '../views/Opens.vue'
import Developer from '../views/Developer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateTP
  },
  {
    path: '/opens',
    name: 'Opens',
    component: Opens
  },
  {
    path: '/developer',
    name: 'Developer',
    component: Developer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  
  routes
})

export default router
