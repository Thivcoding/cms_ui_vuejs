<template>
  <div class="w-full lg:px-24 md:px-12 py-10 px-4">
    <!-- Loading spinner -->
    <div v-if="loading" class="flex flex-col justify-center items-center h-64">
      <svg class="animate-spin h-12 w-12 text-yellow-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="bayon-regular text-gray-700">កំពុងបង្ហាញទិន្នន័យ...</p>
    </div>
    <!-- Articles sections -->
    <div v-else>
      <h1 class="pb-5 md:text-3xl text-2xl bayon-regular font-bold border-b-2 text-black border-gray-900">អត្ថបទក្នុងប្រភេទ៖ Economics</h1>
      <div class="flex flex-wrap gap-6 mt-8">
        <router-link
          v-for="(article , idx) in Article.slice(0,3)"
          :key="article.id"
          :to="`/article/${article.slug}`"
          class="lg:w-[32%] md:w-[48%] w-full group relative h-[300px] rounded-md overflow-hidden cursor-pointer"
          :data-aos="idx % 2 === 0 ? 'fade-up' : 'fade-down'"
          >
          <img class="w-full group-hover:scale-105 transition-all duration-300 h-full" :src="article.thumbnail" alt="">
          <div class="absolute bottom-0 w-full bg-black/40 left-0 z-30 p-3 py-4">
            <h1 class="text-white font-bold flex justify-between text-base mb-3">
              {{ article.created_at.split('T')[0] }}
            </h1>
            <h1 class="text-xl font-bold text-white">{{ article.title }}</h1>
          </div>
        </router-link>
      </div>

      <h1 class="py-5 pt-8 md:text-3xl text-2xl bayon-regular font-bold border-b-2 text-black border-gray-900">អត្ថបទក្នុងប្រភេទ៖ Technology</h1>
      <div class="flex flex-wrap gap-6 mt-8">
        <router-link
          v-for="(article , idx) in Article.slice(3,6)"
          :key="article.id"
          :to="`/article/${article.slug}`"
          class="lg:w-[32%] md:w-[48%] w-full group relative h-[300px] rounded-md overflow-hidden cursor-pointer"
          :data-aos="idx % 2 === 0 ? 'fade-up' : 'fade-down'"
        >
          <img class="w-full group-hover:scale-105 transition-all duration-300 h-full" :src="article.thumbnail" alt="">
          <div class="absolute bottom-0 w-full bg-black/40 left-0 z-30 p-3 py-4">
            <h1 class="text-white font-bold flex justify-between text-base mb-3">
              {{ article.created_at.split('T')[0] }}
            </h1>
            <h1 class="text-xl font-bold text-white">{{ article.title }}</h1>
          </div>
        </router-link>
      </div>

      <!-- Repeat the same for Culture, Law, Foreign Policy -->
      <h1 class="py-5 pt-8 md:text-3xl text-2xl bayon-regular font-bold border-b-2 text-black border-gray-900">អត្ថបទក្នុងប្រភេទ៖ Culture</h1>
      <div class="flex flex-wrap gap-6 mt-8">
        <router-link
          v-for="(article , idx) in Article.slice(6,9)"
          :key="article.id"
          :to="`/article/${article.slug}`"
          class="lg:w-[32%] md:w-[48%] w-full group relative h-[300px] rounded-md overflow-hidden cursor-pointer"
          :data-aos="idx % 2 === 0 ? 'fade-up' : 'fade-down'"
        >
          <img class="w-full group-hover:scale-105 transition-all duration-300 h-full" :src="article.thumbnail" alt="">
          <div class="absolute bottom-0 w-full bg-black/40 left-0 z-30 p-3 py-4">
            <h1 class="text-white font-bold flex justify-between text-base mb-3">
              {{ article.created_at.split('T')[0] }}
            </h1>
            <h1 class="text-xl font-bold text-white">{{ article.title }}</h1>
          </div>
        </router-link>
      </div>

      <h1 class="py-5 pt-8 md:text-3xl text-2xl bayon-regular font-bold border-b-2 text-black border-gray-900">អត្ថបទក្នុងប្រភេទ៖ Law</h1>
      <div class="flex flex-wrap gap-6 mt-8">
        <router-link
          v-for="(article , idx) in Article.slice(9,12)"
          :key="article.id"
          :to="`/article/${article.slug}`"
          class="lg:w-[32%] md:w-[48%] w-full group relative h-[300px] rounded-md overflow-hidden cursor-pointer"
          :data-aos="idx % 2 === 0 ? 'fade-up' : 'fade-down'"
        >
          <img class="w-full group-hover:scale-105 transition-all duration-300 h-full" :src="article.thumbnail" alt="">
          <div class="absolute bottom-0 w-full bg-black/40 left-0 z-30 p-3 py-4">
            <h1 class="text-white font-bold flex justify-between text-base mb-3">
              {{ article.created_at.split('T')[0] }}
            </h1>
            <h1 class="text-xl font-bold text-white">{{ article.title }}</h1>
          </div>
        </router-link>
      </div>

      <h1 class="py-5 pt-8 md:text-3xl text-2xl bayon-regular font-bold border-b-2 text-black border-gray-900">អត្ថបទក្នុងប្រភេទ៖ Foreign Policy</h1>
      <div class="flex flex-wrap gap-6 mt-8">
        <router-link
          v-for="(article , idx) in Article.slice(12,15)"
          :key="article.id"
          :to="`/article/${article.slug}`"
          class="lg:w-[32%] md:w-[48%] w-full group relative h-[300px] rounded-md overflow-hidden cursor-pointer"
          :data-aos="idx % 2 === 0 ? 'fade-up' : 'fade-down'"
        >
          <img class="w-full group-hover:scale-105 transition-all duration-300 h-full" :src="article.thumbnail" alt="">
          <div class="absolute bottom-0 w-full bg-black/40 left-0 z-30 p-3 py-4">
            <h1 class="text-white font-bold flex justify-between text-base mb-3">
              {{ article.created_at.split('T')[0] }}
            </h1>
            <h1 class="text-xl font-bold text-white">{{ article.title }}</h1>
          </div>
        </router-link>
      </div>
    </div>

        <!-- Modal Overlay -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center bg-black/60 z-50 bayon-regular"
        >
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 p-8 h-80  rounded-3xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 relative animate-scaleUp">
            <!-- Close button -->
            <button
              class="absolute top-3 cursor-pointer right-3 text-white text-2xl hover:text-gray-200 transition"
              @click="closeModal"
            >
              ×
            </button>

            <!-- Modal content -->
            <div class="text-center h-full flex flex-col justify-center items-center">
              <h2 class="text-3xl font-bold text-white mb-4 animate-bounce"> ស្វាគមន៍មកកាន់គេហទំព័រ! </h2>
              <p class="text-white/90 mb-6 text-lg">
                ទស្សនាអត្ថបទថ្មីៗ និងព័ត៌មានថ្មីៗពីសេដ្ឋកិច្ច, បច្ចេកវិទ្យា, វប្បធម៌ និងច្បាប់។
              </p>
              <button
                @click="closeModal"
                class="bg-white cursor-pointer text-blue-600 font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition transform"
              >
                ចាប់ផ្តើម
              </button>
            </div>
          </div>
        </div>
    </transition>
    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useArticleStore } from '../../store/article';
import { useRoute } from 'vue-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ArticleStore = useArticleStore();
const Article = ref([]);
const loading = ref(true);

// Modal state
const showModal = ref(false);
const route = useRoute();

onMounted(async () => {
  try {
    Article.value = await ArticleStore.fetchActicle();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
  // Show modal only on home page
  if (route.path === "/") {
    showModal.value = true;
  }
    // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
  });
});

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
/* Modal animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Scale-up animation for modal */
@keyframes scaleUp {
  0% { transform: scale(0.1); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scaleUp {
  animation: scaleUp .8s ease forwards;
}
</style>
