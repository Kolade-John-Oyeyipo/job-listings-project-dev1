<script setup>
  import { defineProps } from 'vue';

  defineProps ({
    title: {
      type: String,
      default: 'Learning Vue by Steps'
    },
    subTitle: {
      type: String,
      default: 'Crashing here and there, block by block'
    }
  });
</script>

<template>
  <section class="bg-gradient-to-t from-transparent to-green-800 py-20 mb-4 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p class="my-4 text-xl">
          {{ subTitle }}
        </p>
      </div>
    </div>
  </section>
</template>
