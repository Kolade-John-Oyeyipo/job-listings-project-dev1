<script setup>
  import BackButton from '@/components/BackButton.vue'
  import axios from 'axios';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import { reactive, onMounted } from 'vue';
  import { useRoute, RouterLink, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const id = route.params.id;
  const state = reactive({
    job: {},
    loading: true,
  });

  const deleteJob = async () => {
    try {
      const deletePrompt = window.confirm('Are you sure you want to delete?');
      if (deletePrompt) {
        await axios.delete(`/api/jobsServer/${id}`);
        toast.success('Job deleted Successfully')
        router.push('/jobs')
      }
    } catch(err) {
      console.log('error deleting job', err)
      toast.error("Couldn't Delete Job")
    }
  }

  function lag(){
    return new Promise (resolve => setTimeout(resolve, 2000))
  }

  onMounted( async () => {
    try{
      await lag(); //simulate server delay
      const response = await axios.get(`/api/jobs/`, { params: {id} });
      const jobData = await response.data;

      console.log(jobData)
      state.job = jobData

    } catch(err){
      console.log("error fetching the job:", err)
    } finally {
      state.loading = false;
    }
  })

</script>

<template>
  <BackButton />
  <section v-if="!state.loading" class="bg-gradient-to-b from-white to-green-100">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-seven w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ state.job.jobsServer }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-orange-700 mr-2 text-xl"></i>
              <p class="text-orange-700 font-bold">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="'/jobs/edit/' + state.job.id"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit Job
            </RouterLink>
            <button
              @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Loading State -->
  <div v-else class="text-center text-red-500 pb-85 pt-75 bg-gray-100">
    <PulseLoader /> Getting Job Data
  </div>
</template>