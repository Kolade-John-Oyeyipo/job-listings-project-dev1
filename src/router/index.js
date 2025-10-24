import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFound from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/jobs',
      name: 'JobsView',
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: 'JobView',
      component: JobView,
    },
    {
      path: '/jobs/add',
      name: 'AddJobView',
      component: AddJobView,
    },
    {
      path: '/jobs/edit/:id',
      name: 'EditJobView',
      component: EditJobView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFoundView',
      component: NotFound,
    },
  ],
  scrollBehavior(){
    return { top: 0 } //to make sure we always return to the top on new page load
  }
})

export default router;