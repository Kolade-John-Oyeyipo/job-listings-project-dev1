<script setup>
  import JobListing from './JobListing.vue';
  import axios from 'axios';
  import {reactive, defineProps, onMounted} from 'vue';
  import { RouterLink } from 'vue-router';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  function lag(){
    return new Promise (resolve => setTimeout(resolve, 2000))
  }

  const props = defineProps ({
    limit: Number,
    showButton: {
      type: Boolean,
      default: true,
    },
    minHeight: {
      type: String,
      default: 'min-h-0'
    }
  })

  const state = reactive({
    jobs: [],
    loading: true,
  })

  onMounted(async () => {
    await lag(); //just to simulate the delay from fetching data
    try{
      const response = await axios.get('/api/jobs');
      const jobData = await response.data;
      
      state.jobs = jobData;
      // console.log(JSON.parse(JSON.stringify(state.jobs.jobsServer)));
    }catch(err){
      console.log("error fetching jobs", err)
    }finally{
      state.loading = false;
    }
  })



</script>

<template>
  <div class="bg-gradient-to-b fromtransparent to-green-200 pb-1">
  <!-- <h3 class="text-center text-5xl">Job Listings</h3> -->
  <section class="px-4 py-10">
    <div :class='["container-xl", "lg:container", "m-auto", props.minHeight]'>
      <h2 class="text-3xl font-bold text-center mb-4">
        Browse the job Listings
      </h2>
      <!-- show the loading spinnner if state.loading is true -->
      <div v-if="state.loading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>
      <!-- show the job listing if state.loading is false -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>

  </section>

  <section v-if="showButton" class="m-auto max-w-sm my-10 px-6" >
    <RouterLink 
    to="/jobs"
    class="block text-white bg-gray-900 text-center py-4 px-6 rounded-xl hover:bg-blue-600">
      View All Jobs
    </RouterLink>
  </section>
  </div>
  <!-- <li v-for="job in jobs" :key="jobs">{{ job.title }}</li> -->
</template>

