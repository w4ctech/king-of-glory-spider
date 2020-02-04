import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/HeroInfo/:id',
    name: 'HeroInfo',
    component: () => import('../views/HeroInfo.vue')
  },
  {
    path: '/HeroInfo/',
    name: 'HeroInfo',
    component: () => import('../views/HeroInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
