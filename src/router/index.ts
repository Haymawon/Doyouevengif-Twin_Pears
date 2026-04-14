import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Privacy from '../views/Privacy.vue'
import Post from '../views/Post.vue'

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: Home },
      { path: '/about', name: 'about', component: About },
      { path: '/contact', name: 'contact', component: Contact },
      { path: '/privacy', name: 'privacy', component: Privacy },
      { path: '/post/:slug', name: 'post', component: Post }
    ],
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.path.startsWith('/post/')) return { top: 0 }
      return { top: 0 }
    }
  })
}