<script setup>
  import { RouterLink } from 'vue-router';

</script>

<template>
  <section>
    <div class="container m-auto py-4 px-6 bg-white">
      <RouterLink
        to="/jobs"
        class="text-red-500 hover:text-green-500 flex items-center">
        <i class="pi pi-arrow-circle-left mr-2"></i>Back to Job Listings
      </RouterLink>
    </div>
  </section>
</template>