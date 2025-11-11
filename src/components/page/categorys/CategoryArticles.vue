<template>
  <div class="2xl:px-24 md:px-12 py-10 px-4">
    <!-- Page title -->
    <h2 class="md:text-3xl text-2xl text-black font-bold mb-6 bayon-regular">
      អត្ថបទក្នុងប្រភេទ៖ {{ categoryName }}
    </h2>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col justify-center items-center h-64">
      <svg class="animate-spin h-12 w-12 text-yellow-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="bayon-regular text-gray-700">កំពុងបង្ហាញទិន្នន័យ...</p>
    </div>

    <!-- Error state -->
    <p v-else-if="error" class="text-red-500 bayon-regular">{{ error }}</p>

    <!-- Articles list -->
    <div v-else-if="articles.length" class="flex flex-wrap 2xl:gap-6 xl:gap-5 lg:gap-4 max-lg:gap-7 max-md:gap-6 sm:gap-5">
      <router-link
        v-for="article in articles"
        :key="article.id"
        :to="`/article/${article.slug}`"
        class="lg:w-[32%] md:w-[48%] w-full group relative h-[300px] rounded-md shadow-sm shadow-black overflow-hidden cursor-pointer"
        data-aos="zoom-in"
      >
        <img
          class="w-full group-hover:scale-105 transition-all duration-300 h-full object-cover"
          :src="article.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'"
          alt="Article Image"
        />
        <div class="absolute bottom-0 w-full bg-black/40 left-0 z-30 p-3 py-4">
          <h1 class="text-white font-bold flex justify-between text-base mb-3">
            {{ article.created_at ? article.created_at.split('T')[0] : '---' }}
          </h1>
          <h1 class="text-xl font-bold text-white">
            {{ article.title || 'Untitled' }}
          </h1>
        </div>
      </router-link>
    </div>

    <!-- No articles -->
    <p v-else class="text-gray-400 bayon-regular">មិនមានអត្ថបទនៅក្នុងប្រភេទនេះទេ។</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'

const route = useRoute()
const articles = ref([])
const categoryName = ref('ប្រភេទមិនស្គាល់')
const loading = ref(true)
const error = ref(null)

const fetchData = async (id) => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
    articles.value = res.data.data?.articles || []
    categoryName.value = res.data.data?.name || 'ប្រភេទមិនស្គាល់'
  } catch (err) {
    console.error(err)
    error.value = 'មានបញ្ហាក្នុងការទាញទិន្នន័យ។'
  } finally {
    loading.value = false
    // Refresh AOS after data loaded
    AOS.refresh()
  }
}

// Initial fetch
onMounted(() => {
  fetchData(route.params.id)
  AOS.init({ duration: 1000, once: true }) // Initialize AOS
})

// Watch for route param changes
watch(() => route.params.id, (newId) => {
  fetchData(newId)
})
</script>

<style scoped>
/* Optional: smooth transition for AOS */
[data-aos] {
  transition-property: transform, opacity;
}
</style>
