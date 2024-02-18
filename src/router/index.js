import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WeekForecast from '@/views/WeekForecast.vue'
import ErrorPage from '@/views/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/week',
    name: 'week',
    component: WeekForecast
  },
  {
    path: '*',
    name: 'error',
    component: ErrorPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
