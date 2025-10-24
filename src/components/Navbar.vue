<script setup>
  import logo from '@/assets/img/company-logo.jpeg'
  import { RouterLink, useRoute } from 'vue-router';

  const isActiveLink = (routePath) => {
    const route = useRoute();
    /** route.path accesses the actual route path */
    /** routePath is passed in to the function for comparison */
    return route.path === routePath; //returns true or false
  }
</script>

<template>
<nav class="bg-green-800 border-b border-green-700">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between text-white">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" v-bind:src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-2xl font-bold ml-2">
              Vue Jobs
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class='[isActiveLink("/") ? "bg-green-900 hover:bg-green-700" : "bg-green-800 hover:bg-green-700", "hover:text-white", "rounded-md", "px-3", "py-2"]'>
                Home
              </RouterLink>
              <RouterLink
                to="/jobs"
                :class='[isActiveLink("/jobs") ? "bg-green-900 hover:bg-green-700" : "bg-green-800 hover:bg-green-700", "hover:text-white", "rounded-md", "px-3", "py-2"]'>
                Jobs
              </RouterLink>
              <RouterLink
                to="/jobs/add"
                :class='[isActiveLink("/jobs/add") ? "bg-green-900 hover:bg-green-700" : "bg-green-800 hover:bg-green-700", "hover:text-white", "rounded-md", "px-3", "py-2"]'>
                Add Job
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>