<template>
  <div class="min-h-screen p-12 bg-gray-100 flex justify-center items-center">
    
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex flex-col items-center">
      <svg class="animate-spin h-12 w-12 text-yellow-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="bayon-regular text-gray-700">កំពុងបង្ហាញទិន្នន័យ...</p>
    </div>

    <!-- About Us Content -->
    <div v-else class="flex flex-col items-center justify-center">
      <!-- Image -->
      <img
        src="../../assets/image/hokvanthiv.png"
        alt="About Us"
        class="w-[280px] rounded-md object-cover mb-6 shadow-lg"
      />

      <!-- Name -->
      <h1 class="text-3xl font-bold mb-4 bayon-regular text-black">ហុក វ៉ាន់ធីវ</h1>

      <!-- Description -->
      <p class="text-center text-gray-700 max-w-xl bayon-regular">
        សូមស្វាគមន៍មកកាន់ទំព័រអំពីយើង! នេះគឺជាទំព័រដែលបង្ហាញព័ត៌មានអំពីក្រុមហ៊ុន ឬ អ្នកជាមួយនឹងរូបថត និងព័ត៌មានមូលដ្ឋាន។
      </p>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)

// simulate fetch time (or use axios if fetching from API)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500) // simulate 1.5s loading
})
</script>

<style>
.bayon-regular {
  font-family: 'Bayon', sans-serif;
}
</style>
