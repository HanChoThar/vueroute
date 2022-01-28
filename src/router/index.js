import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Destination from '../views/Destinationshow.vue'
import NotFound from '../views/NotFound.vue'
import SourceData from '../../data/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import('@/views/Invoices.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/protected',
    name: 'Protected',
    component: () => import('@/views/Protected.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/destination/:id/:slug',
    name: 'Destination',
    component: Destination,
    props: route=> ({...route.params, id: parseInt(route.params.id)}),
    beforeEnter(to, from){
      const exitsId = SourceData.destinations.find(
        destination => destination.id === parseInt(to.params.id)
      )
      const exits = SourceData.destinations.find(
        destination => destination.slug === to.params.slug
      )
      if(!exits || !exitsId){
        return {
          name: 'NotFound',
          params: {pathMatch: to.path.split('/').slice(1)},
          query: to.query,
          hash: to.hash
        }
      }
    },
    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: route=> ({...route.params, id: parseInt(route.params.id)})
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'now-active',
  scrollBehavior(to, from , savedPosition){
    return savedPosition || new Promise ((resolve) => {
      setTimeout(() => resolve({top: 0, behavior: 'smooth'}), 300)
    })
  }
})

router.beforeEach((to, from) => {
  if(to.meta.requireAuth && !window.user) {
    return {name: 'Login', query: {redirect: to.fullPath}}
  }
})

export default router
